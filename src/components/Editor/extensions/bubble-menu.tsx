import { Button } from "@/components/ui/Button";
import twx from "@/utils/twx";
import { BubbleMenu, BubbleMenuProps, isNodeSelection } from "@tiptap/react";
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  LucideIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from "lucide-react";
import { FC } from "react";

type BubbleMenuItem = {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: LucideIcon;
};
type EditorBubbleMenuProps = Omit<BubbleMenuProps, "children">;
export default function EditorBubbleMenu(props: EditorBubbleMenuProps) {
  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ state, editor }) => {
      const { selection } = state;
      const { empty } = selection;

      return !(editor.isActive("image") || empty || isNodeSelection(selection));
    },
    tippyOptions: {
      moveTransition: "transform 0.2s ease-out",
    },
  };

  const formattingCommands: BubbleMenuItem[] = [
    {
      name: "bold",
      isActive: () => props.editor?.isActive("bold") ?? false,
      command: () => props.editor?.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: () => props.editor?.isActive("italic") ?? false,
      command: () => props.editor?.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: () => props.editor?.isActive("underline") ?? false,
      command: () => props.editor?.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strikethrough",
      isActive: () => props.editor?.isActive("strikethrough") ?? false,
      command: () => props.editor?.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: "code",
      isActive: () => props.editor?.isActive("code") ?? false,
      command: () => props.editor?.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
    {
      name: "superscript",
      isActive: () => props.editor?.isActive("superscript") ?? false,
      command: () => props.editor?.chain().focus().toggleSuperscript().run(),
      icon: SuperscriptIcon,
    },
    {
      name: "subscript",
      isActive: () => props.editor?.isActive("subscript") ?? false,
      command: () => props.editor?.chain().focus().toggleSubscript().run(),
      icon: SubscriptIcon,
    },
  ];

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="flex w-fit divide-x divide-gray-200 rounded border border-gray-200 bg-white shadow"
    >
      <div className="flex items-center">
        {formattingCommands.map((command, idx) => (
          <Button key={idx} variant={"ghost"} onClick={command.command}>
            <command.icon
              className={twx(
                "w-4 h-4",
                command.isActive() ? "text-blue-500" : "text-gray-500"
              )}
            />
          </Button>
        ))}
      </div>
    </BubbleMenu>
  );
}
