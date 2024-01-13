import { notFound } from "next/navigation";
import DocumentEditor from "./components/DocumentEditor";
import {
  getDocumentById,
  hasDocumentAccess,
} from "@/services/document.service";
import TitleEditor from "./components/TitleEditor";
import ShareDocumentDialog from "@/components/ShareDocument";
import Link from "next/link";
import { auth } from "@/configs/next-auth.config";

export default async function DocumentPage({
  params,
}: {
  params: { id: string };
}) {
  const document = await getDocumentById(params.id);

  if (!document) {
    notFound();
  }

  const session = await auth();
  const user = session?.user;

  if (!user || !(await hasDocumentAccess(document.id, user.id))) {
    notFound();
  }

  return (
    <main>
      <div className="pb-72 bg-gradient-to-br from-blue-400 to-purple-500 px-2">
        <div className="max-w-7xl mx-auto pt-10 pb-2 flex justify-between items-center">
          <div>
            <Link
              href={document.folderId ? `/folders/${document.folderId}` : "/"}
            >
              <p className="uppercase text-xs tracking-widest text-white">
                StudyBuddy
              </p>
            </Link>
            <TitleEditor document={document} />
          </div>
          <ShareDocumentDialog document={document} />
        </div>
      </div>
      <div className="-mt-60">
        <DocumentEditor document={document} />
      </div>
    </main>
  );
}
