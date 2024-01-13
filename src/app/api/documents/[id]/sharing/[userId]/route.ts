import { auth } from "@/configs/next-auth.config";
import {
  hasDocumentAccess,
  removeDocumentAccess,
} from "@/services/document.service";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string, userId: string } }
) {
  const session = await auth();
  const user = session?.user;

  if (!user || !(await hasDocumentAccess(params.id, user.id))) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const { userId, id } = params;
  await removeDocumentAccess(id, userId);
  return Response.json(
    { message: "Successfully removed access" },
    { status: 200 }
  );
}
