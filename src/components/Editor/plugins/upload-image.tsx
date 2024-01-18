import { DocumentAttachment } from "@/database/schema/document";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";

const uploadKey = new PluginKey("upload-image");

const UploadImagesPlugin = () =>
  new Plugin({
    key: uploadKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        set = set.map(tr.mapping, tr.doc);

        const action = tr.getMeta(uploadKey);
        if (action && action.add) {
          const { id, pos, src } = action.add;

          const placeholder = document.createElement("div");
          placeholder.setAttribute("class", "img-placeholder");
          const image = document.createElement("img");
          image.setAttribute(
            "class",
            "opacity-40 rounded-lg border border-stone-200 animate-pulse"
          );
          image.src = src;
          placeholder.appendChild(image);
          const deco = Decoration.widget(pos + 1, placeholder, {
            id,
          });
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(
            set.find(
              undefined,
              undefined,
              (spec) => spec.id == action.remove.id
            )
          );
        }
        return set;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });

export default UploadImagesPlugin;

function findPlaceholder(state: EditorState, id: {}) {
  const decos = uploadKey.getState(state);
  const found = decos.find(null, null, (spec: any) => spec.id == id);
  return found.length ? found[0].from : null;
}

export function startDocumentUpload(
  documentId: string,
  file: File,
  view: EditorView,
  pos: number
) {
  if (file.size / 1024 / 1024 > 20) {
    console.error("File is too big.");
    return;
  }

  const id = {};

  if (file.type.includes("image/")) {
    const tr = view.state.tr;
    if (!tr.selection.empty) tr.deleteSelection();

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      tr.setMeta(uploadKey, {
        add: {
          id,
          pos,
          src: reader.result,
        },
      });
      view.dispatch(tr);
    };
  }

  handleDocumentUpload(documentId, file).then((attachment) => {
    const documentSrc = `/api/documents/${documentId}/attachments/${attachment.id}`;

    if (!isImageDocument(attachment.path)) {
      return;
    }

    const { schema } = view.state;

    let pos = findPlaceholder(view.state, id);
    if (pos == null) return;

    const node = schema.nodes.image.create({ src: documentSrc });
    const transaction = view.state.tr
      .replaceWith(pos, pos, node)
      .setMeta(uploadKey, { remove: { id } });
    view.dispatch(transaction);
  });
}

function isImageDocument(path: string) {
  const ext = path.split(".").pop();
  if (!ext) return false;

  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  return imageExtensions.includes(ext);
}

export async function handleDocumentUpload(documentId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`/api/documents/${documentId}/attachments`, {
    method: "POST",
    body: formData,
  });

  if (res.status !== 200) {
    throw new Error("Failed to upload image");
  }

  const data = (await res.json()) as DocumentAttachment;
  return data;
}
