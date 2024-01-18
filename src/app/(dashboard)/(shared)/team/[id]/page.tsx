import { auth } from "@/configs/next-auth.config";
import {
  getTeamById,
  getTeamMembers,
  isTeamMember,
} from "@/services/team.service";
import { UserRoundPlus, Users } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import SharedDocumentsGrid from "../../components/SharedDocumentsGrid";
import { getSharedDocumentsByTeam } from "@/services/document.service";
import AddTeamMemberDialog from "./components/AddTeamMemberDialog";
import { Button } from "@/components/ui/Button";

export default async function TeamPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin");
  }

  const team = await getTeamById(params.id);

  if (!team || !(await isTeamMember(params.id, user.id))) {
    notFound();
  }

  const members = await getTeamMembers(team.id);
  const documents = await getSharedDocumentsByTeam(team.id);

  return (
    <main className="min-h-[80vh]">
      <div className="pt-32 pb-10 bg-gradient-to-br from-pink-600 to-purple-500 shadow-md dark:from-yellow-600 dark:to-orange-700">
        <div className="container mx-auto  text-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users />
            <h1 className="text-2xl font-semibold">{team.name}</h1>
          </div>
          <AddTeamMemberDialog team={team} members={members ?? []}>
            <Button variant="secondary">
              <UserRoundPlus className="w-4 h-4 mr-2" />
              Add member
            </Button>
          </AddTeamMemberDialog>
        </div>
      </div>
      <div className="container mx-auto mt-5">
        <h3 className="font-medium mb-2">Documents</h3>
        <SharedDocumentsGrid documents={documents} />
      </div>
    </main>
  );
}
