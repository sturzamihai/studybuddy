import db from "@/database/client";
import {
  CreateDocumentDto,
  Document,
  documents,
} from "@/database/schema/document";
import { eq } from "drizzle-orm";

export default class DocumentService {
  async createDocument(
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
  async getDocument(id: string): Promise<Document | null> {
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
}
