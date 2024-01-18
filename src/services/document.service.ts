import db from "@/database/client";
import {
  CreateDocumentDto,
  Document,
  DocumentAttachment,
  UpdateDocumentDto,
  documentAttachments,
  documentSharing,
  documentTeamSharing,
  documents,
} from "@/database/schema/document";
import { folders } from "@/database/schema/folder";
import { and, eq, isNull } from "drizzle-orm";
import { getUserById } from "./user.service";
import notNull from "@/utils/nonNull";
import { teamMembers } from "@/database/schema/user";

export async function createDocument(
  document: Omit<CreateDocumentDto, "id">
): Promise<Document> {
  const [newDocument] = await db
    .insert(documents)
    .values({
      ...document,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return newDocument;
}

export async function getDocumentById(id: string): Promise<Document | null> {
  const queryResults = await db
    .select()
    .from(documents)
    .where(eq(documents.id, id));

  if (queryResults.length === 0) {
    return null;
  }

  const [document] = queryResults; // as it can only be one
  return document;
}

export async function getDocumentsByAuthor(
  authorId: string
): Promise<Document[]> {
  const queryResult = await db
    .select()
    .from(documents)
    .where(eq(documents.authorId, authorId));

  return queryResult;
}

export async function getSharedDocuments(userId: string): Promise<Document[]> {
  const queryResult = await db
    .select({
      id: documents.id,
      title: documents.title,
      content: documents.content,
      createdAt: documents.createdAt,
      updatedAt: documents.updatedAt,
      authorId: documents.authorId,
      folderId: documents.folderId,
    })
    .from(documents)
    .leftJoin(documentSharing, eq(documents.id, documentSharing.documentId))
    .where(eq(documentSharing.userId, userId));

  return queryResult;
}

export async function getSharedDocumentsByTeam(
  teamId: string
): Promise<Document[]> {
  const queryResult = await db
    .select({
      id: documents.id,
      title: documents.title,
      content: documents.content,
      createdAt: documents.createdAt,
      updatedAt: documents.updatedAt,
      authorId: documents.authorId,
      folderId: documents.folderId,
    })
    .from(documents)
    .leftJoin(
      documentTeamSharing,
      eq(documents.id, documentTeamSharing.documentId)
    )
    .where(eq(documentTeamSharing.teamId, teamId));

  return queryResult;
}

export async function getDocumentsByFolder(
  authorId: string,
  folderId: string | null
): Promise<Document[]> {
  const folderIdQuery = folderId
    ? eq(documents.folderId, folderId)
    : isNull(documents.folderId);

  const queryResult = await db
    .select({
      id: documents.id,
      title: documents.title,
      content: documents.content,
      createdAt: documents.createdAt,
      updatedAt: documents.updatedAt,
      authorId: documents.authorId,
      folderId: documents.folderId,
    })
    .from(documents)
    .leftJoin(folders, eq(folders.id, documents.folderId))
    .where(and(eq(documents.authorId, authorId), folderIdQuery));

  return queryResult;
}

export async function updateDocument(
  id: string,
  document: UpdateDocumentDto
): Promise<Document> {
  const [updatedDocument] = await db
    .update(documents)
    .set({
      ...document,
      updatedAt: new Date(),
    })
    .where(eq(documents.id, id))
    .returning();

  return updatedDocument;
}

export async function shareDocument(
  documentId: string,
  userId: string
): Promise<void> {
  await db.insert(documentSharing).values({
    documentId,
    userId,
  });
}

export async function shareDocumentWithTeam(
  documentId: string,
  teamId: string
): Promise<void> {
  await db.insert(documentTeamSharing).values({
    documentId,
    teamId,
  });
}

export async function removeDocumentAccess(
  documentId: string,
  userId: string
): Promise<void> {
  await db
    .delete(documentSharing)
    .where(
      and(
        eq(documentSharing.documentId, documentId),
        eq(documentSharing.userId, userId)
      )
    );
}

export async function removeDocumentAccessFromTeam(
  documentId: string,
  teamId: string
): Promise<void> {
  await db
    .delete(documentTeamSharing)
    .where(
      and(
        eq(documentTeamSharing.documentId, documentId),
        eq(documentTeamSharing.teamId, teamId)
      )
    );
}

export async function addDocumentAttachment(
  documentId: string,
  file: File,
  path: string
): Promise<DocumentAttachment> {
  const [newAttachment] = await db
    .insert(documentAttachments)
    .values({
      id: crypto.randomUUID(),
      documentId,
      path,
      originalFileName: file.name,
      size: file.size,
      createdAt: new Date(),
    })
    .returning();

  return newAttachment;
}

export async function getDocumentAttachment(
  documentId: string,
  attachmentId: string
) {
  const [attachment] = await db
    .select()
    .from(documentAttachments)
    .where(
      and(
        eq(documentAttachments.documentId, documentId),
        eq(documentAttachments.id, attachmentId)
      )
    );

  return attachment;
}

export async function getDocumentAttachments(documentId: string) {
  const attachments = await db
    .select()
    .from(documentAttachments)
    .where(eq(documentAttachments.documentId, documentId));

  return attachments;
}

export async function hasDocumentAccessByTeam(
  documentId: string,
  userId: string
) {
  const document = await getDocumentById(documentId);

  if (!document) return false;

  const teamAccess = await db
    .select()
    .from(documentTeamSharing)
    .where(eq(documentTeamSharing.documentId, documentId));

  const teamIds = teamAccess.map((access) => access.teamId);

  const userTeams = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.userId, userId));

  const userTeamIds = userTeams.map((team) => team.teamId);

  const hasAccess = teamIds.some((id) => userTeamIds.includes(id));

  return hasAccess;
}

export async function hasDocumentAccess(
  documentId: string,
  userId: string
): Promise<boolean> {
  const document = await getDocumentById(documentId);

  if (!document) return false;

  if (document.authorId === userId) {
    return true;
  }

  const memberAccess = await db
    .select()
    .from(documentSharing)
    .where(
      and(
        eq(documentSharing.documentId, documentId),
        eq(documentSharing.userId, userId)
      )
    );

  return (
    memberAccess.length > 0 ||
    (await hasDocumentAccessByTeam(documentId, userId))
  );
}

export async function teamHasDocumentAccess(
  documentId: string,
  teamId: string
): Promise<boolean> {
  const document = await getDocumentById(documentId);

  if (!document) return false;

  const memberAccess = await db
    .select()
    .from(documentTeamSharing)
    .where(
      and(
        eq(documentTeamSharing.documentId, documentId),
        eq(documentTeamSharing.teamId, teamId)
      )
    );

  return memberAccess.length > 0;
}

export async function getDocumentAccessList(documentId: string) {
  const document = await getDocumentById(documentId);

  if (!document) {
    return null;
  }

  const sharingList = await db
    .select()
    .from(documentSharing)
    .where(eq(documentSharing.documentId, documentId));
  const accessList = [
    ...sharingList,
    { documentId: document.id, userId: document.authorId },
  ];

  const memberList = await Promise.all(
    accessList.map(async (access) => {
      const user = await getUserById(access.userId);
      return user;
    })
  );
  const nonNullMemberList = memberList.filter(notNull);

  return nonNullMemberList;
}
