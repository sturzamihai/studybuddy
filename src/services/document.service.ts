import db from "@/database/client";
import {
  CreateDocumentDto,
  Document,
  UpdateDocumentDto,
  documents,
} from "@/database/schema/document";
import { folders } from "@/database/schema/folder";
import { eq, isNull } from "drizzle-orm";

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

export async function getDocumentsByFolder(
  authorId: string,
  folderId: string | null
): Promise<Document[]> {
  const folderIdQuery = folderId ? eq(documents.folderId, folderId) : isNull(documents.folderId);

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
    .where(eq(folders.ownerId, authorId))
    .where(folderIdQuery)

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
