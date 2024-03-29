import { Folder } from "@/database/schema/folder";
import { User } from "next-auth";
import DocumentCard from "./DocumentCard";
import { getDocumentsByFolder } from "@/services/document.service";
import CreateDocumentButton from "./CreateDocumenButton";

export default async function DocumentGrid({
  user,
  folder = null,
}: {
  user: User;
  folder?: Folder | null;
}) {
  const documents = await getDocumentsByFolder(user.id, folder?.id || null);

  if (!documents || documents.length === 0) {
    return (
      <div>
        <h3 className="font-medium mb-2">Documents</h3>
        <p className="mb-2">No documents found.</p>
        <CreateDocumentButton folder={folder} />
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-medium mb-2">Documents</h3>
      <div className="flex items-center gap-2">
        {documents.map((document, idx) => (
          <DocumentCard document={document} key={idx} />
        ))}
        <CreateDocumentButton folder={folder} />
      </div>
    </div>
  );
}
