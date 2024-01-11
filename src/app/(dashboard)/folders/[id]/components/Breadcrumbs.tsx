import { Folder } from "@/database/schema/folder";
import { Home } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export default function Breadcrumbs({ folders }: { folders: Folder[] }) {
  return (
    <div className="flex items-center gap-2">
       <Link href="/" className="px-4 py-2 -ml-4 hover:bg-gray-200 rounded-full">
        <Home className="w-5 h-5" />
       </Link>
       <span className="mx-1">/</span>
      {folders.map((folder, idx) => {
        return (
          <Fragment key={folder.id}>
            <Link
              href={`/folders/${folder.id}`}
              
              className="px-3 py-2 hover:bg-gray-200 rounded-full transition-all"
            >
              <span>{folder.name}</span>
            </Link>
            {idx < folders.length - 1 && <span className="mx-2">/</span>}
          </Fragment>
        );
      })}
    </div>
  );
}
