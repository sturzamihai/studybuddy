import { auth } from "@/configs/next-auth.config";
import { notFound, redirect } from "next/navigation";
import CreateDocumentButton from "../../components/CreateDocumenButton";
import CreateFolderButton from "../../components/CreateFolderButton";
import DocumentGrid from "../../components/DocumentGrid";
import FolderGrid from "../../components/FolderGrid";
import { getFolderById } from "@/services/folder.service";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const folder = await getFolderById(params.id);

  if (!folder) {
    notFound();
  }

  return {
    title: `${folder.name} | Study Buddy`,
  };
}

export default async function FolderPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin");
  }

  const folder = await getFolderById(params.id);

  if (!folder || folder.ownerId !== user.id) {
    notFound();
  }

  return (
    <main className="container mx-auto my-5">
      <div>Breadcrumbs</div>
      <div className="flex flex-col gap-6 my-4">
        <FolderGrid user={user} folder={folder} />
        <DocumentGrid user={user} folder={folder} />
      </div>
    </main>
  );
}
