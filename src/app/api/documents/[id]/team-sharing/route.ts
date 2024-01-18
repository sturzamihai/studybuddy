import { auth } from "@/configs/next-auth.config";
import {
  hasDocumentAccess,
  shareDocumentWithTeam,
} from "@/services/document.service";
import { isTeamMember } from "@/services/team.service";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const session = await auth();
  const user = session?.user;

  const body = await request.json();
  const { invitedTeam } = body;

  if (
    !user ||
    !(await hasDocumentAccess(params.id, user.id)) ||
    !(await isTeamMember(invitedTeam, user.id))
  ) {
    return Response.json("Unauthorized", { status: 401 });
  }

  await shareDocumentWithTeam(params.id, invitedTeam);

  return Response.json(
    { message: "Document shared with team" },
    { status: 200 }
  );
}
