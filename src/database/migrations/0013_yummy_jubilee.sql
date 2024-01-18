CREATE TABLE IF NOT EXISTS "document_team_sharing" (
	"documentId" text NOT NULL,
	"teamId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_team_sharing" ADD CONSTRAINT "document_team_sharing_documentId_document_id_fk" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_team_sharing" ADD CONSTRAINT "document_team_sharing_teamId_team_id_fk" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
