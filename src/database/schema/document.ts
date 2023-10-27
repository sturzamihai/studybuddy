import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { createInsertSchema } from "drizzle-zod";

export const documents = pgTable("document", {
  id: text("id").notNull().primaryKey(),
  title: text("title").notNull(),
  content: text("content").default(""),
  createdAt: timestamp("createdAt", { mode: "date" }),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type Document = typeof documents.$inferSelect;
export type CreateDocumentDto = {
  id?: string;
} & typeof documents.$inferInsert;
export const createDocumentSchema = createInsertSchema(documents, {
  id: (schema) => schema.id.optional(),
});
