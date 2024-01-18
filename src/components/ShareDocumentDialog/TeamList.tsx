import { Document } from "@/database/schema/document";
import { getUserTeams } from "@/services/team.service";
import { Users } from "lucide-react";
import { User } from "next-auth";
import { Button } from "../ui/Button";
import { Team } from "@/database/schema/user";
import { teamHasDocumentAccess } from "@/services/document.service";
import TeamShareButton from "./TeamShareButton";

export default async function TeamList({
  document,
  teams,
}: {
  document: Document;
  teams: Team[];
}) {
  return (
    <div className="mt-3 flex flex-col gap-2">
      <p className="text-sm text-gray-500">Share with teams</p>
      {teams.map(async (team, idx) => {
        const hasAccess = await teamHasDocumentAccess(document.id, team.id);
        
        return (
          <div
            key={idx}
            className="py-2 flex items-center justify-between border-b"
          >
            <p className="flex items-center gap-2">
              <Users className="w-4 h-4 mr-2" />
              {team.name}
            </p>
            <TeamShareButton
              team={team}
              document={document}
              shared={hasAccess}
            />
          </div>
        );
      })}
    </div>
  );
}
