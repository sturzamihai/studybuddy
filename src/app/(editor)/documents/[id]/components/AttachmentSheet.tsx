import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { Archive } from "lucide-react";
import AttachmentCard from "./AttachmentCard";
import { Document, DocumentAttachment } from "@/database/schema/document";

export default function AttachmentGrid({
  document,
  attachments,
}: {
  document: Document;
  attachments: DocumentAttachment[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"secondary"}>
          Attachments
          <Archive className="w-4 h-4 ml-2" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-4">
          <SheetTitle>Attachments</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center flex-wrap gap-2">
          {attachments.map((attachment) => (
            <AttachmentCard
              key={attachment.id}
              document={document}
              attachment={attachment}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
