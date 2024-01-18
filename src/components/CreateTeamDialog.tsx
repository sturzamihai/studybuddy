"use client";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateTeamDialog({
  open = false,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(open);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const createTeam = form.handleSubmit((data) => {
    fetch("/api/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error creating folder");
        }

        setIsOpen(false);
        router.refresh();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  useEffect(() => {
    if(onOpenChange)
        onOpenChange(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={createTeam}>
            <DialogHeader>
              <DialogTitle>Create team</DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Input {...field} placeholder="Team name" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button variant={"ghost"}>Cancel</Button>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
