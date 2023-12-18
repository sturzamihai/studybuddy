import { ContextMenu } from "@/components/ui/ContextMenu";
import { Card } from "@/components/ui/Card";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/ContextMenu";
import { File } from "lucide-react";
import Link from "next/link";

export default function DocumentCard({ document }: { document: any }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link href={`/d/${document.id}`}>
          <Card className="flex items-center gap-2 p-2">
            <File className="w-5 h-5" />
            <p className="font-medium mt-0">{document.title}</p>
          </Card>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Share</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
