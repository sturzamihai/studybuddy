import { Editor, Extension, Range, ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { ReactNode, useCallback } from "react";
import tippy from "tippy.js";

export type CommandItem = {
  title: string;
  description?: string;
  icon: ReactNode;
  command: ({ editor, range }: CommandFunctionArgs) => void;
};

type CommandFunctionArgs = {
  editor: Editor;
  range: Range;
};

function CommandList({
  items,
  editor,
  range,
}: {
  items: CommandItem[];
  editor: Editor;
  range: Range;
}) {
  const runCommand = useCallback(
    (index: number) => {
      const selectedItem = items[index];

      if (selectedItem) {
        selectedItem.command({ editor, range });
      }
    },
    [editor, items, range]
  );

  return items.length > 0 ? (
    <div className="z-50 h-auto max-h-[300px] flex flex-col gap-1 overflow-y-auto bg-white p-2 rounded-md border border-gray-100 shadow-lg">
      {items.map((item, idx) => (
        <button
          key={idx}
          className="hover:bg-gray-100 w-full rounded-md px-2 py-3 flex text-left items-center gap-2"
          onClick={() => runCommand(idx)}
        >
          {item.icon}
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-xs text-gray-500">{item.description}</p>
          </div>
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
