"use client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { useRouter } from "next/navigation";
import { Team, User } from "@/database/schema/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import TeamMemberList from "./TeamMemberList";

export default function AddTeamMemberDialog({
  team,
  members,
  children,
}: {
  team: Team;
  members: Partial<User>[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      invitedEmail: "",
    },
  });

  const addMember = form.handleSubmit((data) => {
    fetch(`/api/teams/${team.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invitedEmail: data.invitedEmail }),
    }).then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      form.reset();
      router.refresh();
    });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to {team.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Add people to your team</p>
          <Form {...form}>
            <form onSubmit={addMember} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="invitedEmail"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button>
                Add
                <Plus className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </Form>
          <TeamMemberList team={team} members={members} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
