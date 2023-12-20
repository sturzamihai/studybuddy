import db from "@/database/client";
import { CreateFolderDto, folders } from "@/database/schema/folder";
import { eq, isNull } from "drizzle-orm";

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

export async function getFolderById(id: string) {
  const queryResults = await db
    .select()
    .from(folders)
    .where(eq(folders.id, id));

  if (queryResults.length === 0) {
    return null;
  }

  const [folder] = queryResults; // as it can only be one
  return folder;
}

export async function getFoldersByOwner(ownerId: string) {
  const queryResult = await db
    .select()
    .from(folders)
    .where(eq(folders.ownerId, ownerId));

  return queryResult;
}

export async function getSubfoldersByParent(
  userId: string,
  parentId: string | null
) {
  const parentIdQuery = parentId
    ? eq(folders.parentId, parentId)
    : isNull(folders.parentId);

  const queryResult = await db
    .select()
    .from(folders)
    .where(eq(folders.ownerId, userId))
    .where(parentIdQuery);

  return queryResult;
}
