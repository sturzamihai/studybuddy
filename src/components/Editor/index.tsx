"use client";

import {
  Editor as EditorClass,
  EditorContent,
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
import TiptapImage from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import UploadImagesPlugin, { startDocumentUpload } from "./plugins/upload-image";
import EditorBubbleMenu from "./extensions/bubble-menu";
import TiptapUnderline from "@tiptap/extension-underline";
import TiptapSubscript from "@tiptap/extension-subscript";
import TiptapSuperscript from "@tiptap/extension-superscript";
import Iframe from "./extensions/iframe";
import { Document } from "@/database/schema/document";

export default function Editor({
  document,
  onDebouncedUpdate = () => {},
  debounceDuration = 750,
}: {
  document?: Document
  onDebouncedUpdate?: (editor: EditorClass) => void;
  debounceDuration?: number;
}) {
  const editor = useEditor({
    content: document?.content ? document.content as string : null,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc list-outside leading-3 -mt-2",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal list-outside leading-3 -mt-2",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "leading-normal -mb-2",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-gray-700",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class:
              "rounded-sm bg-gray-100 p-5 font-mono font-medium text-gray-800",
          },
        },
        code: {
          HTMLAttributes: {
            class:
              "rounded-md bg-gray-200 px-1.5 py-1 font-mono font-medium text-gray-800",
            spellcheck: "false",
          },
        },
        horizontalRule: false,
        dropcursor: {
          color: "#DBEAFE",
          width: 4,
        },
      }),
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
      TiptapImage.extend({
        addProseMirrorPlugins() {
          return [UploadImagesPlugin()];
        },
      }).configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-md border border-gray-200",
        },
      }),
      TiptapSuperscript,
      TiptapSubscript,
      TiptapUnderline,
      Color,
      TextStyle,
      Table,
      TableHeader,
      TableRow,
      TableCell,
      Iframe,
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
        class: `prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none`,
      },
      handleDrop: (view, event, _slice, moved) => {
        if(!document) return false;

        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files[0]
        ) {
          event.preventDefault();
          const file = event.dataTransfer.files[0];
          const coordinates = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });

          // here we deduct 1 from the pos or else the image will create an extra node
          startDocumentUpload(document?.id, file, view, coordinates?.pos || 0 - 1);
          return true;
        }
        return false;
      },
    },
    autofocus: "end",
  });

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    onDebouncedUpdate(editor);
  }, debounceDuration);

  return (
    <div>
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
