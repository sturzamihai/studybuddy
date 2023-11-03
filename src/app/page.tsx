import { auth } from "@/configs/next-auth.config";
import CreateDocumentButton from "./CreateDocumenButton";
import { getDocumentsByAuthor } from "@/services/document.service";
import { Document } from "@/database/schema/document";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Homepage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const documents = await getDocumentsByAuthor(session.user.id);

  return (
    <main className="container mx-auto my-5">
      <h1 className="text-2xl">Welcome {session.user.name}</h1>
      <div className="flex items-center">
        <CreateDocumentButton />
      </div>
      <div className="flex items-center gap-2 my-4">
        {documents.map((document: Document, idx) => (
          <Link href={`/document/${document.id}`} key={idx}>
            <div className="p-4 border border-gray-300 rounded-md">
              <h2>{document.title}</h2>
              <p>{document.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
