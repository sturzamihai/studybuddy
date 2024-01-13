"use client";

import { Document } from "@/database/schema/document";
import { Crown, X } from "lucide-react";
import { User } from "next-auth";
import { Button } from "../ui/Button";

export default function MemberList({
  document,
  members,
}: {
  document: Document;
  members: Partial<User>[];
}) {
  const removeMember = async (member: Partial<User>) => {
    await fetch(`/api/documents/${document.id}/sharing/${member.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
            {member.id == document.authorId && (
              <Crown className="w-4 h-4" />
            )}
          </p>
          {member.id != document.authorId && (
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
