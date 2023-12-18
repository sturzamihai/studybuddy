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
import { useForm } from "react-hook-form";

export default function CreateFolderButton() {
  const form = useForm({
    defaultValues: {
      name: "",
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
        console.log("data");
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New folder</Button>
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
