import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import Link from "next/link";
import SignInButton from "./SignInButton";
import { auth } from "@/configs/next-auth.config";
import TeamSwitcher from "./TeamSwitcher";
import { getUserTeams } from "@/services/user.service";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <nav className="bg-gray-100">
        <div className="container mx-auto flex items-center py-4 justify-between">
          <Link href="/">
            <h2 className="font-semibold">Study Buddy</h2>
          </Link>
          <SignInButton />
        </div>
      </nav>
    );
  }

  const teams = await getUserTeams(user.id);
  const fullTeams: typeof teams = [
    {
      id: "personal",
      name: user.name ?? "Personal",
      ownerId: user.id,
      createdAt: new Date(),
    },
    ...teams,
  ];

  return (
    <nav className="bg-white dark:bg-black border-b">
      <div className="container mx-auto flex items-center py-4 justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <h2 className="uppercase text-sm tracking-widest">Study Buddy</h2>
          </Link>
          <TeamSwitcher teams={fullTeams} />
        </div>

        <Avatar>
          <AvatarImage
            src={user.image ?? undefined}
            alt={user.name ?? undefined}
          />
          <AvatarFallback>
            {`${user.name?.charAt(0)}${user.name?.charAt(1)}`}
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
