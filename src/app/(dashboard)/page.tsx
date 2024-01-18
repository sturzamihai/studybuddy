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
    <main className="min-h-[80vh]">
      <div className="pt-32 pb-10 bg-gradient-to-br from-yellow-400 to-orange-400 shadow-md dark:from-yellow-600 dark:to-orange-700">
        <div className="container mx-auto">
          <h1 className="text-xl font-medium text-gray-800 dark:text-gray-200">
            Welcome, <span className="text-2xl font-semibold">{user.name}</span>
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-5 container mx-auto">
        <FolderGrid user={user} />
        <DocumentGrid user={user} />
      </div>
    </main>
  );
}
