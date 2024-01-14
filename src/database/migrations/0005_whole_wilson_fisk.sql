CREATE TABLE IF NOT EXISTS "document_attachment" (
	"id" text PRIMARY KEY NOT NULL,
	"documentId" text NOT NULL,
	"attachmentPath" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_attachment" ADD CONSTRAINT "document_attachment_documentId_document_id_fk" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
