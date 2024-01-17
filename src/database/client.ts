import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}`;
const queryClient = postgres(connectionString);
const db = drizzle(queryClient);

export default db;
