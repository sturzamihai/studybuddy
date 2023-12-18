"use client";

import Editor from "@/components/Editor";
import useDocument from "@/utils/useDocument";
import { Editor as EditorClass } from "@tiptap/react";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function DocumentPage({ params }: { params: { id: string } }) {
  const { document, isLoading, error } = useDocument(params.id);
  const [isUpdating, setIsUpdating] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) notFound();
  if (!document && !isLoading) notFound();

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
    <main>
      <div className="container mx-auto py-2 px-2 flex justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-semibold py-1 px-2 hover:bg-gray-100 rounded-md transition-all flex items-center gap-2 group">
            <h2>{document.title}</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
          </div>
          {isUpdating && (
            <p className="text-sm text-gray-500 ml-2 animate-pulse">Saving...</p>
          )}
        </div>
        <button className="py-1 px-2 bg-blue-500 rounded-md flex items-center gap-2 text-white">
          <p>Share</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
      <div className="bg-gray-400 py-4 px-2">
        <div className="max-w-7xl min-h-screen rounded mx-auto bg-white p-3">
          <Editor
            content={document.content}
            onDebouncedUpdate={updateDocumentContent}
          />
        </div>
      </div>
    </main>
  );
}
