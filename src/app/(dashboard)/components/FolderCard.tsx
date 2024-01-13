import { Folder } from "@/database/schema/folder";
import { ContextMenu } from "@/components/ui/ContextMenu";
import { Card } from "@/components/ui/Card";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/ContextMenu";
import { Folder as FolderIcon } from "lucide-react";
import Link from "next/link";

export default function FolderCard({ folder }: { folder: Folder }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link href={`/folders/${folder.id}`}>
          <Card className="flex items-center gap-2 p-2">
            <FolderIcon className="w-5 h-5" />
            <p className="font-medium mt-0">{folder.name}</p>
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
