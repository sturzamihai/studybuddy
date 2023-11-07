"use client";

import { useRouter } from "next/navigation";

export default function CreateDocumentButton() {
  const router = useRouter();

  const createDocument = async () => {
    await fetch("/api/documents", {
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

        router.push(`/document/${data.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
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
