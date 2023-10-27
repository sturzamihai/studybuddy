import db from "@/database/client";
import {
  CreateDocumentDto,
  Document,
  documents,
} from "@/database/schema/document";

export default class DocumentService {
  async createDocument(
    document: Omit<CreateDocumentDto, "id">
  ): Promise<Document> {
    const [newDocument] = await db
      .insert(documents)
      .values({
        ...document,
        id: crypto.randomUUID(),
      })
      .returning();

    return newDocument;
  }
}
