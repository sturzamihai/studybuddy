import { auth } from "@/configs/next-auth.config";
import { updateDocumentSchema } from "@/database/schema/document";
import {
  getDocumentById,
  hasDocumentAccess,
  updateDocument,
} from "@/services/document.service";
import formatError from "@/utils/formatError";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const user = session?.user;

  if (!user || !(await hasDocumentAccess(params.id, user.id))) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const validatedBody = updateDocumentSchema.safeParse(body);

  if (!validatedBody.success) {
    return Response.json(formatError(validatedBody.error), { status: 400 });
  }

  const document = await updateDocument(params.id, validatedBody.data);
  return Response.json(document, { status: 200 });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const user = session?.user;

  if (!user || !(await hasDocumentAccess(params.id, user.id))) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const document = await getDocumentById(params.id);

  if (!document) {
    return Response.json("Not found", { status: 404 });
  }

  return Response.json(document, { status: 200 });
}
