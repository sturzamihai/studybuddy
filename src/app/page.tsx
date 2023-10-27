import { auth } from "@/configs/next-auth.config";

export default async function Home() {
  const session = await auth();

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-2xl">Welcome {session?.user?.name}</h1>
    </div>
  );
}
