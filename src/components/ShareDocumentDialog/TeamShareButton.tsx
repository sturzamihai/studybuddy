"use client";

import { Document } from "@/database/schema/document";
import { Team } from "@/database/schema/user";
import { Button } from "../ui/Button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TeamShareButton({
  document,
  team,
  shared,
}: {
  document: Document;
  team: Team;
  shared: boolean;
}) {
  const router = useRouter();

  const addTeam = async () => {
    const res = await fetch(`/api/documents/${document.id}/team-sharing`, {
      method: "POST",
      body: JSON.stringify({
        invitedTeam: team.id,
      }),
    });

    if (!res.ok) {
      throw new Error("Error sharing document");
    }

    router.refresh();
  };

  const removeTeam = async () => {
    const res = await fetch(
      `/api/documents/${document.id}/team-sharing/${team.id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Error removing sharing");
    }

    router.refresh();
  };

  return (
    <>
      {shared ? (
        <Button variant={"ghost"} size="icon" onClick={removeTeam}>
          <X className="w-4 h-4" />
        </Button>
      ) : (
        <Button size={"sm"} variant={"ghost"} onClick={addTeam}>
          Share
        </Button>
      )}
    </>
  );
}
