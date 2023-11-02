ALTER TABLE "document" RENAME COLUMN "userId" TO "authorId";--> statement-breakpoint
ALTER TABLE "document" DROP CONSTRAINT "document_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document" ADD CONSTRAINT "document_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
