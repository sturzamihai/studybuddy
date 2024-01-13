ALTER TABLE "document" ADD COLUMN "folderId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document" ADD CONSTRAINT "document_folderId_folder_id_fk" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
