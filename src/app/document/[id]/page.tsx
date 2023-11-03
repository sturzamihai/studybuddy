"use client"

import Editor from "@/components/Editor";
import { getDocumentById } from "@/services/document.service";
import formatDate from "@/utils/formatDate";
import useDocument from "@/utils/useDocument";
import { Editor as EditorClass } from "@tiptap/react";
import { not } from "drizzle-orm";
import { notFound } from "next/navigation";

export default function DocumentPage({
  params,
}: {
  params: { id: string };
}) {
  const { document, isLoading, error } = useDocument(params.id);

  if(isLoading) return <div>Loading...</div>
  if(error) notFound();
  if(!document && !isLoading) notFound();

  const updateDocumentContent = async (editor: EditorClass) => {
    const content = editor.getJSON();
    
    await fetch(`/api/documents/${document.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
  };

  return (
    <main className="container mx-auto py-4">
      <div className="mb-2">
        <h2 className="text-2xl font-semibold">{document.title}</h2>
        <p className="text-sm font-light">
          Created at: {document.createdAt.toLocaleString()}
        </p>
      </div>
      <Editor content={document.content} onDebouncedUpdate={updateDocumentContent} />
    </main>
  );
}
