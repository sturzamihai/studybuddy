import db from "@/database/client";
import { users } from "@/database/schema/user";
import { eq } from "drizzle-orm";

export async function getUserById(id: string, includeEmail = false) {
  const queryResults = await db
    .select({
      id: users.id,
      name: users.name,
      image: users.image,
      ...(includeEmail ? { email: users.email } : {}),
    })
    .from(users)
    .where(eq(users.id, id));

  if (queryResults.length === 0) {
    return null;
  }

  const [user] = queryResults; // as it can only be one
  return user;
}

export async function getUserByEmail(email: string) {
  const queryResults = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (queryResults.length === 0) {
    return null;
  }

  const [user] = queryResults; // as it can only be one
  return user;
}
