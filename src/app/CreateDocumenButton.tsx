"use client";

import type { Document } from "@/database/schema/document";
import { redirect } from "next/navigation";

export default function CreateDocumentButton() {
  const createDocument = async () => {
    const newDocument = await fetch("/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New Document",
      }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }

        return data;
      })
      .catch((err) => {
        console.error(err);
      });


      // TODO: not working ?
      //redirect(`/documents/${newDocument.id}`);
  };

  return (
    <button
      onClick={createDocument}
      className="bg-gray-300 py-2 px-4 rounded-md"
    >
      Create new document
    </button>
  );
}
