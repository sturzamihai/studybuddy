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
import { Folder } from "@/database/schema/folder";
import { FolderPlus } from "lucide-react";
import { useForm } from "react-hook-form";

export default function CreateFolderButton({
  folder = null,
}: {
  folder?: Folder | null;
}) {
  const form = useForm({
    defaultValues: {
      name: "",
      parentId: folder?.id || null,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    fetch("/api/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        return res.json();
      })
      .then((data) => {
        // TODO
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="border-dashed">
          <FolderPlus className="w-5 h-5 mr-2" />
          New folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Create folder</DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Input {...field} placeholder="Folder name" />
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
