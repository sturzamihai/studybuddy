"use client";
import * as Avatar from "@radix-ui/react-avatar";
import { signIn, useSession } from "next-auth/react";

export default function Navbar() {
  const session = useSession();

  return (
    <nav className="bg-gray-100">
      <div className="container mx-auto flex items-center py-4 justify-between">
        <h2 className="font-semibold">Study Buddy</h2>

        {session.status === "authenticated" ? (
          <Avatar.Root className="inline-flex h-[35px] w-[35px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
            <Avatar.Image
            className="h-full w-full object-cover rounded-[inherit]"
              src={session.data.user?.image}
              alt={session.data.user?.name}
            />
            <Avatar.Fallback
              className="leading-1 flex h-full w-full items-center justify-center"
            >
              {`${session.data.user?.name?.charAt(
                0
              )}${session.data.user?.name?.charAt(1)}`}
            </Avatar.Fallback>
          </Avatar.Root>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-all font-medium flex items-center gap-2"
          >
            <span>Sign in with</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path>
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
}
