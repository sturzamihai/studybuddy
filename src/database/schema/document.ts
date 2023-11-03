import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const documents = pgTable("document", {
  id: text("id").notNull().primaryKey(),
  title: text("title").notNull(),
  content: text("content").default(""),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type Document = typeof documents.$inferSelect;
export type CreateDocumentDto = Omit<
  typeof documents.$inferInsert,
  "id" | "createdAt" | "updatedAt"
>;
export const createDocumentSchema = createInsertSchema(documents, {
  id: z.any(),
  createdAt: z.any(),
  updatedAt: z.any(),
});

export const documentsRelation = relations(documents, ({ one }) => ({
  author: one(users, {
    fields: [documents.authorId],
    references: [users.id],
  }),
}));
