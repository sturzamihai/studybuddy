CREATE TABLE IF NOT EXISTS "document_sharing" (
	"documentId" text NOT NULL,
	"userId" text NOT NULL,
	CONSTRAINT document_sharing_documentId_userId PRIMARY KEY("documentId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "folder_sharing" (
	"folderId" text NOT NULL,
	"userId" text NOT NULL,
	CONSTRAINT folder_sharing_folderId_userId PRIMARY KEY("folderId","userId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_sharing" ADD CONSTRAINT "document_sharing_documentId_document_id_fk" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_sharing" ADD CONSTRAINT "document_sharing_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folder_sharing" ADD CONSTRAINT "folder_sharing_folderId_folder_id_fk" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folder_sharing" ADD CONSTRAINT "folder_sharing_userId_folder_id_fk" FOREIGN KEY ("userId") REFERENCES "folder"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
