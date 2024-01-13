import {
  timestamp,
  pgTable,
  text,
  json,
  primaryKey,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { folders } from "./folder";

export const documents = pgTable("document", {
  id: text("id").notNull().primaryKey(),
  title: text("title").notNull(),
  content: json("content"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  folderId: text("folderId").references(() => folders.id, {
    onDelete: "cascade",
  }),
});

export type Document = typeof documents.$inferSelect;
export type CreateDocumentDto = Omit<
  typeof documents.$inferInsert,
  "id" | "createdAt" | "updatedAt"
>;
export type UpdateDocumentDto = Partial<
  Pick<CreateDocumentDto, "title" | "content">
>;

export const updateDocumentSchema = z.object({
  title: z.string().optional(),
  content: z.unknown().optional(),
});

export const createDocumentSchema = createInsertSchema(documents, {
  id: z.any(),
  createdAt: z.any(),
  updatedAt: z.any(),
});

export const documentSharing = pgTable(
  "document_sharing",
  {
    documentId: text("documentId")
      .notNull()
      .references(() => documents.id, {
        onDelete: "cascade",
      }),
    userId: text("userId")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
  },
  (t) => ({
    pk: primaryKey(t.documentId, t.userId),
  })
);
