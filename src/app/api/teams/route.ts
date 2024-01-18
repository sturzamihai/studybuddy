import { auth } from "@/configs/next-auth.config";
import { createTeamSchema } from "@/database/schema/user";
import { createTeam, getUserTeams } from "@/services/team.service";
import formatError from "@/utils/formatError";

export async function POST(request: Request) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const validatedBody = createTeamSchema.safeParse({
    ...body,
    ownerId: user.id,
  });

  if (!validatedBody.success) {
    return Response.json(formatError(validatedBody.error), { status: 400 });
  }

  const newTeam = await createTeam(validatedBody.data);
  return Response.json(newTeam, { status: 200 });
}

export async function GET(request: Request) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const teams = await getUserTeams(user.id);

  return Response.json(teams, { status: 200 });
}
