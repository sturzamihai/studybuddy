"use client";
import { Document } from "@/database/schema/document";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "../ui/Command";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/Form";

export default function AddMemberCombobox({
  document,
}: {
  document: Document;
}) {
  const form = useForm({
    defaultValues: {
      invitedEmail: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    fetch(`/api/documents/${document.id}/sharing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invitedEmail: data.invitedEmail }),
    }).then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        console.error(data);
      }

      form.reset();
    });
  });

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-500">
        Add people to collaborate with by inserting their email
      </p>
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex items-center gap-2">
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
    </div>
  );
}
