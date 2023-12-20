"use client";

import { Button } from "@/components/ui/Button";
import { Folder } from "@/database/schema/folder";
import { useRouter } from "next/navigation";

export default function CreateDocumentButton({
  folder = null,
}: {
  folder?: Folder | null;
}) {
  const router = useRouter();

  const createDocument = async () => {
    await fetch("/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New Document",
        folderId: folder?.id || null,
      }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }

        router.push(`/documents/${data.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Button
      onClick={createDocument}
    >
      Create new document
    </Button>
  );
}
