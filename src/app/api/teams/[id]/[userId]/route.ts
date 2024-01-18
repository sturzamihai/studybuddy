import { auth } from "@/configs/next-auth.config";
import { isTeamMember, removeTeamMember } from "@/services/team.service";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; userId: string } }
) {
  const session = await auth();
  const user = session?.user;

  if (
    !user ||
    !(await isTeamMember(params.id, user.id)) ||
    params.userId === user.id
  ) {
    return Response.json("Unauthorized", {
      status: 401,
    });
  }

  

  await removeTeamMember(params.id, params.userId);

  return Response.json({ message: "Team access removed" }, { status: 200 });
}
