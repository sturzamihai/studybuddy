import { auth } from "@/configs/next-auth.config";
import {
  hasDocumentAccess,
  removeDocumentAccessFromTeam,
} from "@/services/document.service";
import { isTeamMember } from "@/services/team.service";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
      teamId: string;
    };
  }
) {
  const session = await auth();
  const user = session?.user;

  if (
    !user ||
    !(await hasDocumentAccess(params.id, user.id)) ||
    !(await isTeamMember(params.teamId, user.id))
  ) {
    return Response.json("Unauthorized", {
      status: 401,
    });
  }

  await removeDocumentAccessFromTeam(params.id, params.teamId);

  return Response.json(
    { message: "Document access removed from team" },
    { status: 200 }
  );
}
