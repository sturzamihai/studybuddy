"use client";

import { Editor as EditorClass, EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDebouncedCallback } from "use-debounce";

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
    extensions: [StarterKit],
    onUpdate: (editor) => {
      debouncedUpdates(editor);
    }
  });

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    onDebouncedUpdate(editor);
  }, debounceDuration);

  return <EditorContent editor={editor}/>;
}
