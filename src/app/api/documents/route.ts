import { auth } from "@/configs/next-auth.config";
import { createDocumentSchema } from "@/database/schema/document";
import { createDocument } from "@/services/document.service";
import formatError from "@/utils/formatError";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const validatedBody = createDocumentSchema.safeParse({
    ...body,
    authorId: session.user.id,
  });

  if (!validatedBody.success) {
    return Response.json(formatError(validatedBody.error), { status: 400 });
  } else {
    const newDocument = await createDocument(validatedBody.data);

    return Response.json(newDocument, { status: 200 });
  }
}
