import { auth } from "@/configs/next-auth.config";
import SharedDocumentsGrid from "../components/SharedDocumentsGrid";
import { redirect } from "next/navigation";
import { getSharedDocuments } from "@/services/document.service";

export default async function SharedWithMePage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin");
  }

  const documents = await getSharedDocuments(user.id);

  return (
    <main className="container mx-auto pt-32 min-h-[80vh]">
      <h1 className="text-2xl mb-4">Shared with me</h1>
      <SharedDocumentsGrid documents={documents} />
    </main>
  );
}
