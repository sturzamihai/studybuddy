"use client";

import { Crown, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Team, User } from "@/database/schema/user";
import { useRouter } from "next/navigation";

export default function TeamMemberList({
  team,
  members,
}: {
  team: Team;
  members: Partial<User>[];
}) {
  const router = useRouter();
  const removeMember = async (member: Partial<User>) => {
    await fetch(`/api/teams/${team.id}/${member.id}`, {
      method: "DELETE",
    });

    router.refresh();
  };

  return (
    <div className="mt-3 flex flex-col gap-2">
      <p className="text-sm text-gray-500">People with access</p>
      {members.map((member, idx) => (
        <div
          key={idx}
          className="py-2 flex items-center justify-between border-b"
        >
          <p className="flex items-center gap-2">
            {member.name}{" "}
            {member.id == team.ownerId && <Crown className="w-4 h-4" />}
          </p>
          {member.id != team.ownerId && (
            <Button
              variant={"ghost"}
              size="icon"
              onClick={() => removeMember(member)}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
