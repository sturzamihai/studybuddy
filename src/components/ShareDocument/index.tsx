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
import AddMemberCombobox from "./AddMemberCombobox";
import { getDocumentAccessList } from "@/services/document.service";
import MemberList from "./MemberList";

export default async function ShareDocumentDialog({
  document,
}: {
  document: Document;
}) {
  const accessList = await getDocumentAccessList(document.id);
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
        </DialogHeader>
        <AddMemberCombobox document={document} />
        {accessList && <MemberList document={document} members={accessList} />}
      </DialogContent>
    </Dialog>
  );
}
