import db from "@/database/client";
import { CreateFolderDto, folders } from "@/database/schema/folder";
import { eq } from "drizzle-orm";

export async function createFolder(folder: CreateFolderDto) {
  const [newFolder] = await db
    .insert(folders)
    .values({
      ...folder,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    })
    .returning();

  return newFolder;
}

export async function getFoldersByOwner(ownerId : string) {
    const queryResult = await db
    .select()
    .from(folders)
    .where(eq(folders.ownerId, ownerId));

  return queryResult;
}