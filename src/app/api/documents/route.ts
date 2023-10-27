import { auth } from "@/configs/next-auth.config";
import { createDocumentSchema } from "@/database/schema/document";
import DocumentService from "@/services/document.service";

const documentService = new DocumentService();

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const body = await request.json();

  const validatedBody = createDocumentSchema.parse({
    ...body,
    userId: session.user.id,
  });
  const newDocument = await documentService.createDocument(validatedBody);

  return Response.json(newDocument, { status: 200 });
}
