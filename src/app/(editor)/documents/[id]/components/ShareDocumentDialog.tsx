import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Document } from "@/database/schema/document";
import { Share } from "lucide-react";

export default function ShareDocumentDialog({
  document,
}: {
  document: Document;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          <p>Share</p>
          <Share className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share {document.title}</DialogTitle>
          <DialogDescription>
            Sharing dialog
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
