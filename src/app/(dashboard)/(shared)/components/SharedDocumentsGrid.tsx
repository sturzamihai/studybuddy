import { getSharedDocuments } from "@/services/document.service";
import { User } from "next-auth";
import DocumentCard from "@/app/(dashboard)/components/DocumentCard";
import { Document } from "@/database/schema/document";

export default async function SharedDocumentsGrid({
  documents,
}: {
  documents: Document[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        {documents.length == 0 && (
          <p className="text-gray-500">No shared documents.</p>
        )}
        {documents.map((document, idx) => (
          <DocumentCard document={document} key={idx} />
        ))}
      </div>
    </div>
  );
}
