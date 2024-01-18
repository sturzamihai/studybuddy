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
import { getDocumentAccessList } from "@/services/document.service";
import { getUserTeams } from "@/services/team.service";
import { User } from "next-auth";
import TeamList from "./TeamList";

export default async function ShareDocumentDialog({
  user,
  document,
  children,
}: {
  user: User;
  document: Document;
  children: React.ReactNode;
}) {
  const accessList = await getDocumentAccessList(document.id);
  const teamList = await getUserTeams(user.id);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share {document.title}</DialogTitle>
        </DialogHeader>
        <AddMemberCombobox document={document} />
        {accessList && <MemberList document={document} members={accessList} />}
        {teamList && <TeamList document={document} teams={teamList} />}
      </DialogContent>
    </Dialog>
  );
}
