CREATE TABLE IF NOT EXISTS "folder" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"parentId" text,
	"ownerId" text NOT NULL,
	"createdAt" timestamp NOT NULL
);
