import db from "@/database/client";
import { CreateTeamDto, teamMembers, teams } from "@/database/schema/user";
import notNull from "@/utils/nonNull";
import { and, eq } from "drizzle-orm";
import { getUserById } from "./user.service";

export async function getUserTeams(userId: string) {
  const ownedTeams = await db
    .select()
    .from(teams)
    .where(eq(teams.ownerId, userId));

  const memberRelation = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.userId, userId));

  const memberTeams = await Promise.all(
    memberRelation.map(async (relation) => {
      const team = await getTeamById(relation.teamId);
      return team;
    })
  );
  const nonNullMemberTeams = memberTeams.filter(notNull);

  return [...ownedTeams, ...nonNullMemberTeams];
}

export async function createTeam(team: CreateTeamDto) {
  const [newTeam] = await db
    .insert(teams)
    .values({
      ...team,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    })
    .returning();

  return newTeam;
}

export async function getTeamById(id: string) {
  const queryResults = await db.select().from(teams).where(eq(teams.id, id));

  if (queryResults.length === 0) {
    return null;
  }

  const [team] = queryResults; // as it can only be one
  return team;
}

export async function addTeamMember(teamId: string, userId: string) {
  const teamExists = await getTeamById(teamId);
  const userExists = await getUserById(userId);

  if (!teamExists || !userExists) {
    throw new Error("Team or user does not exist");
  }

  await db.insert(teamMembers).values({
    teamId,
    userId,
  });
}

export async function getTeamMembers(teamId: string) {
  const team = await getTeamById(teamId);

  if (!team) {
    return null;
  }

  const owner = await getUserById(team.ownerId);

  const membersRelations = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.teamId, teamId));

  const members = await Promise.all(
    membersRelations
      .map(async (member) => {
        const user = await getUserById(member.userId);
        return user;
      })
      .filter((user) => user !== null)
  );

  return [owner, ...members];
}

export async function isTeamMember(teamId: string, userId: string) {
  const memberRelation = await db
    .select()
    .from(teamMembers)
    .where(and(eq(teamMembers.teamId, teamId), eq(teamMembers.userId, userId)));

  return memberRelation.length > 0;
}
