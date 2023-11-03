import { auth } from "@/configs/next-auth.config";
import { createDocumentSchema } from "@/database/schema/document";
import { createDocument } from "@/services/document.service";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const body = await request.json();

  // TODO: actually handle validation errors
  const validatedBody = createDocumentSchema.parse({
    ...body,
    authorId: session.user.id,
  });
  const newDocument = await createDocument(validatedBody);

  return Response.json(newDocument, { status: 200 });
}
