import db from "@/database/client";
import {
  CreateDocumentDto,
  Document,
  documents,
} from "@/database/schema/document";
import { eq } from "drizzle-orm";

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
