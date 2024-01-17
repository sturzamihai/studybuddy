import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Document } from "@/database/schema/document";
import AddMemberCombobox from "./AddMemberCombobox";
import MemberList from "./MemberList";
import { useEffect, useState } from "react";
import { User } from "@/database/schema/user";
import { Loader2 } from "lucide-react";
import { getDocumentAccessList } from "@/services/document.service";

export default async function ShareDocumentDialog({
  document,
  children,
}: {
  document: Document;
  children: React.ReactNode;
}) {
  const accessList = await getDocumentAccessList(document.id);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
