ALTER TABLE "team_members" RENAME TO "team_member";--> statement-breakpoint
ALTER TABLE "team_member" DROP CONSTRAINT "team_members_teamId_team_id_fk";
--> statement-breakpoint
ALTER TABLE "team_member" DROP CONSTRAINT "team_members_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_member" ADD CONSTRAINT "team_member_teamId_team_id_fk" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_member" ADD CONSTRAINT "team_member_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
