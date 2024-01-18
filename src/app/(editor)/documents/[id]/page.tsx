import { notFound } from "next/navigation";
import DocumentEditor from "./components/DocumentEditor";
import {
  getDocumentAttachments,
  getDocumentById,
  hasDocumentAccess,
} from "@/services/document.service";
import TitleEditor from "./components/TitleEditor";
import ShareDocumentDialog from "@/components/ShareDocumentDialog";
import Link from "next/link";
import { auth } from "@/configs/next-auth.config";
import AttachmentSheet from "./components/AttachmentSheet";
import { Button } from "@/components/ui/Button";
import { Home, Share } from "lucide-react";

export default async function DocumentPage({
  params,
}: {
  params: { id: string };
}) {
  const document = await getDocumentById(params.id);
  const attachments = await getDocumentAttachments(params.id);

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
        <div className="container mx-auto pt-10 pb-2 flex justify-between items-center">
          <div>
            <Link
              href={document.folderId ? `/folders/${document.folderId}` : "/"}
              className="flex items-center gap-2 text-white"
            >
              <Home className="w-4 h-4" />
              <p className="uppercase text-sm tracking-widest font-mono">
                StudyBuddy
              </p>
            </Link>
            <TitleEditor document={document} />
          </div>
          <div className="flex items-center gap-2">
            <AttachmentSheet document={document} attachments={attachments} />
            <ShareDocumentDialog user={user} document={document}>
              <Button variant={"secondary"}>
                <p>Share</p>
                <Share className="w-4 h-4 ml-2" />
              </Button>
            </ShareDocumentDialog>
          </div>
        </div>
      </div>
      <div className="-mt-60">
        <DocumentEditor document={document} />
      </div>
    </main>
  );
}
