import Editor from "@/components/Editor";
import { Document } from "@/database/schema/document";
import DocumentService from "@/services/document.service";
import { notFound } from "next/navigation";

export default async function DocumentPage({
  params,
}: {
  params: { id: string };
}) {
  const documentService = new DocumentService();
  const document = await documentService.getDocument(params.id);

  if (!document) {
    notFound();
  }

  return (
    <main className="container mx-auto py-4">
      <div className="mb-2">
        <h2 className="text-2xl font-semibold">{document.title}</h2>
        <p className="text-sm font-light">Created at: 1 Ian 1900</p>
      </div>
      <Editor />
    </main>
  );
}
