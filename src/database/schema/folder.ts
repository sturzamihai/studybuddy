import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const folders = pgTable("folder", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  parentId: text("parentId"),
  ownerId: text("ownerId").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
});

export type Folder = typeof folders.$inferSelect;
export type CreateFolderDto = Omit<
  typeof folders.$inferInsert,
  "id" | "createdAt"
>;
export const createFolderSchema = z.object({
  name: z.string(),
  parentId: z.string().optional(),
  ownerId: z.string(),
});
