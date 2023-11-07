import { Editor, Extension, Range, ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { ReactNode } from "react";
import tippy from "tippy.js";

type CommandItem = {
  title: string;
  description: string;
  icon: ReactNode;
  command: ({ editor, range }: CommandFunctionArgs) => void;
};

type CommandFunctionArgs = {
  editor: Editor;
  range: Range;
};

function CommandList({
  items,
  command,
  editor,
  range,
}: {
  items: CommandItem[];
  command: any;
  editor: Editor;
  range: Range;
}) {
  return items.length > 0 ? (
    <div className="z-50 h-auto max-h-[300px] overflow-y-auto bg-white px-2 py-3 rounded-md">
      {items.map((item, idx) => (
        <button key={idx} className="hover:bg-gray-100 rounded-md px-2 py-3">
          <div>{item.title}</div>
          <div>{item.description}</div>
        </button>
      ))}
    </div>
  ) : null;
}

function renderCommands() {
  let component: ReactRenderer | null = null;
  let popup: any | null = null;

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      });

      // @ts-ignore
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props);

      popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
    },
    onExit: () => {
      popup && popup[0].destroy();
      component?.destroy();
      component = null;
      popup = null;
    },
  };
}

const SlashCommands = Extension.create({
  name: "slash-commands",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({
          editor,
          range,
          item,
        }: {
          editor: Editor;
          range: Range;
          item: CommandItem;
        }) => {
          item.command({ editor, range });
        },
        render: renderCommands,
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default SlashCommands;
