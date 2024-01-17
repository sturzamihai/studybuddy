import { ContextMenu } from "@/components/ui/ContextMenu";
import { Card } from "@/components/ui/Card";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/ContextMenu";
import { File } from "lucide-react";
import Link from "next/link";
import { Document } from "@/database/schema/document";
import ShareDocumentDialog from "@/components/ShareDocument";
import { useState } from "react";

export default function DocumentCard({ document }: { document: Document }) {
  return (
    <Link href={`/documents/${document.id}`}>
      <Card className="flex items-center gap-2 p-2">
        <File className="w-5 h-5" />
        <p className="font-medium mt-0">{document.title}</p>
      </Card>
    </Link>
  );
}
