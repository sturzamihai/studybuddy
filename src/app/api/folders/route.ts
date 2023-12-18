import { auth } from "@/configs/next-auth.config";
import { createFolderSchema } from "@/database/schema/folder";
import { createFolder, getFoldersByOwner } from "@/services/folder.service";
import formatError from "@/utils/formatError";

export async function POST(req: Request) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const validatedBody = createFolderSchema.safeParse({
    ...body,
    ownerId: user.id,
  });

  if (!validatedBody.success) {
    return Response.json(formatError(validatedBody.error), { status: 400 });
  }

  const newFolder = await createFolder(validatedBody.data);
  return Response.json(newFolder, { status: 200 });
}

export async function GET(req: Request) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const folders = await getFoldersByOwner(user.id);
  return Response.json(folders, { status: 200 });
}
