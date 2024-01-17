import { Document, DocumentAttachment } from "@/database/schema/document";
import { Paperclip } from "lucide-react";
import Link from "next/link";

export default function AttachmentCard({
  document,
  attachment,
}: {
  document: Document;
  attachment: DocumentAttachment;
}) {
  const roundedSize = (
    Math.round((attachment.size / 1024 / 1024) * 100) / 100
  ).toFixed(2);

  return (
    <Link
      href={`/api/documents/${document.id}/attachments/${attachment.id}`}
      className="p-3 bg-gray-50 bg-opacity-25 border border-gray-200 flex items-center rounded-md gap-2 w-full"
    >
      <Paperclip />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{attachment.originalFileName}</p>
        <p className="text-xs text-gray-500">{roundedSize} MB</p>
      </div>
    </Link>
  );
}
