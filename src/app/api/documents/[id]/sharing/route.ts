import { auth } from "@/configs/next-auth.config";
import {
  getDocumentAccessList,
  hasDocumentAccess,
  shareDocument,
} from "@/services/document.service";
import { getUserByEmail } from "@/services/user.service";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const user = session?.user;

  if (!user || !(await hasDocumentAccess(params.id, user.id))) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const accessList = await getDocumentAccessList(params.id);

  if (!accessList) {
    return Response.json("Not found", { status: 404 });
  }

  return Response.json(accessList, { status: 200 });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const user = session?.user;

  if (!user || !(await hasDocumentAccess(params.id, user.id))) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const { invitedEmail } = body;

  if (!invitedEmail) {
    return Response.json(
      { message: "Please provide a valid email" },
      { status: 400 }
    );
  }

  const invitedUser = await getUserByEmail(invitedEmail);

  if (!invitedUser) {
    return Response.json(
      { message: "Provided email is not yet registered" },
      {
        status: 400,
      }
    );
  }

  await shareDocument(params.id, invitedUser.id);

  return Response.json({ message: "Shared document" }, { status: 200 });
}
