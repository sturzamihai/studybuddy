import { auth } from "@/configs/next-auth.config";
import CreateDocumentButton from "./CreateDocumenButton";

export default async function Homepage() {
  const session = await auth();

  return (
    <main className="container mx-auto my-5">
      <h1 className="text-2xl">Welcome {session?.user?.name}</h1>
      <div className="flex items-center">
        <CreateDocumentButton />
      </div>
    </main>
  );
}
