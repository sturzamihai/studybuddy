"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Document } from "@/database/schema/document";
import { Check, Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TitleEditor({ document }: { document: Document }) {
  const [isEditor, setIsEditor] = useState(false);
  const [title, setTitle] = useState(document.title);
  const router = useRouter();

  const updateDocumentTitle = async () => {
    await fetch(`/api/documents/${document.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }).then(() => {
      setIsEditor(false);
      router.refresh();
    });
  };

  if (isEditor) {
    return (
      <div className="flex items-center group">
        <Input
          className="bg-white/50 text-2xl font-semibold py-1 px-2 rounded-md w-auto rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:outline-none"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          variant={"outline"}
          className="border-l-0 rounded-l-none bg-white/50 hover:bg-white/75"
          onClick={updateDocumentTitle}
        >
          <Check className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditor(true)}
      className="text-2xl font-semibold py-1 px-2 -ml-2 hover:bg-gray-100/50 rounded-md transition-all flex items-center gap-2 group text-white"
    >
      <h2>{document.title}</h2>
      <Pen className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
    </div>
  );
}
