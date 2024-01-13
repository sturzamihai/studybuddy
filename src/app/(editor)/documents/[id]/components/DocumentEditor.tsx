"use client"

import Editor from "@/components/Editor";
import { Document } from "@/database/schema/document";
import { Editor as EditorClass } from "@tiptap/react";
import { useState } from "react";

export default function DocumentEditor({ document }: { document: Document }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateDocumentContent = async (editor: EditorClass) => {
    const content = editor.getJSON();
    setIsUpdating(true);

    await fetch(`/api/documents/${document.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    }).then(() => {
      setIsUpdating(false);
    });
  };

  return (
    <div className="max-w-7xl min-h-screen md:rounded mx-auto bg-white p-10 md:p-16 shadow">
      <Editor
        content={document.content as string}
        onDebouncedUpdate={updateDocumentContent}
      />
    </div>
  );
}
