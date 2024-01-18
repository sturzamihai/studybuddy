import { auth } from "@/configs/next-auth.config";
import { addTeamMember, isTeamMember } from "@/services/team.service";
import { getUserByEmail } from "@/services/user.service";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const user = session?.user;

  if (!user || !isTeamMember(params.id, user.id)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const { invitedEmail } = body;

  if (!invitedEmail) {
    return new Response("Missing email", { status: 400 });
  }

  const searchedUser = await getUserByEmail(invitedEmail);

  if (!searchedUser) {
    return new Response("User not found", { status: 404 });
  }

  await addTeamMember(params.id, searchedUser.id);

  return new Response("Team member added", { status: 200 });
}
