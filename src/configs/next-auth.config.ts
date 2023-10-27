import db from "@/database/client";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const nextAuthConfig: NextAuthConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(nextAuthConfig);
