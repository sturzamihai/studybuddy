import { Folder } from "@/database/schema/folder";
import {
  getFoldersByOwner,
  getSubfoldersByParent,
} from "@/services/folder.service";
import { User } from "next-auth/types";
import FolderCard from "./FolderCard";
import CreateFolderButton from "./CreateFolderButton";

export default async function FolderGrid({
  user,
  folder = null,
}: {
  user: User;
  folder?: Folder | null;
}) {
  const folders = await getSubfoldersByParent(user.id, folder?.id || null);

  if (!folders || folders.length === 0) {
    return (
      <div>
        <h3 className="font-medium mb-2">Folders</h3>
        <small>No folders found.</small>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-medium mb-2">Folders</h3>
      <div className="flex items-center gap-2">
        {folders.map((folder, idx) => (
          <FolderCard folder={folder} key={idx} />
        ))}
        <CreateFolderButton folder={folder} />
      </div>
    </div>
  );
}
