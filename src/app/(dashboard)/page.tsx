import { auth } from "@/configs/next-auth.config";
import CreateDocumentButton from "./components/CreateDocumenButton";
import { getDocumentsByAuthor } from "@/services/document.service";
import { Document } from "@/database/schema/document";
import { redirect } from "next/navigation";
import DocumentCard from "./components/DocumentCard";
import CreateFolderButton from "./components/CreateFolderButton";
import FolderCard from "./components/FolderCard";
import { getFoldersByOwner } from "@/services/folder.service";

export default async function Homepage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin");
  }

  const documents = await getDocumentsByAuthor(user.id);
  const folders = await getFoldersByOwner(user.id);

  return (
    <main className="container mx-auto my-5">
      <h1 className="text-2xl">Welcome {user.name}</h1>
      <div className="flex items-center gap-2">
        <CreateDocumentButton />
        <CreateFolderButton />
      </div>
      <div className="flex items-center gap-2 my-4">
        {folders.map((folder: any, idx: number) => (
          <FolderCard folder={folder} key={idx} />
        ))}
        {documents.map((document: Document, idx) => (
          <DocumentCard document={document} key={idx} />
        ))}
      </div>
    </main>
  );
}
