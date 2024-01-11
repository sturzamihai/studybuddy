"use client";

import {
  Editor as EditorClass,
  EditorContent,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDebouncedCallback } from "use-debounce";
import Placeholder from "@tiptap/extension-placeholder";
import "@/styles/tiptap.css";
import SlashCommands, { CommandItem } from "./extensions/slash-commands";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

export default function Editor({
  content,
  onDebouncedUpdate = () => {},
  debounceDuration = 750,
}: {
  content?: JSONContent | string;
  onDebouncedUpdate?: (editor: EditorClass) => void;
  debounceDuration?: number;
}) {
  const editor = useEditor({
    content: content,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          return `Start typing... or press '/' for a list of commands`;
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "not-prose pl-2",
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: "flex items-start gap-2",
        },
        nested: true,
      }),
      Table,
      TableHeader,
      TableRow,
      TableCell,
      SlashCommands.configure({
        suggestion: {
          items: (): CommandItem[] => [
            {
              title: "Heading 1",
              icon: (
                <p>
                  H<sub>1</sub>
                </p>
              ),
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setNode("heading", { level: 1 })
                  .run();
              },
            },
            {
              title: "Heading 2",
              icon: (
                <p>
                  H<sub>2</sub>
                </p>
              ),
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setNode("heading", { level: 2 })
                  .run();
              },
            },
            {
              title: "Heading 3",
              icon: (
                <p>
                  H<sub>3</sub>
                </p>
              ),
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setNode("heading", { level: 3 })
                  .run();
              },
            },
            {
              title: "Bullet List",
              icon: <p>•</p>,
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleBulletList()
                  .run();
              },
            },
            {
              title: "Task List",
              icon: <p>☐</p>,
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleTaskList()
                  .run();
              },
            },
          ],
        },
      }),
    ],
    onUpdate: (editor) => {
      debouncedUpdates(editor);
    },
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none w-full h-full`,
      },
    },
  });

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    onDebouncedUpdate(editor);
  }, debounceDuration);

  return <EditorContent editor={editor} />;
}
