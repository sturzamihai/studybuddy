import { auth } from "@/configs/next-auth.config";
import { redirect } from "next/navigation";
import FolderGrid from "./components/FolderGrid";
import DocumentGrid from "./components/DocumentGrid";

export default async function Dashboard() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="container mx-auto my-5">
      <h1 className="text-2xl">Welcome {user.name}</h1>
      <div className="flex flex-col gap-6 my-4">
        <FolderGrid user={user} />
        <DocumentGrid user={user} />
      </div>
    </main>
  );
}
