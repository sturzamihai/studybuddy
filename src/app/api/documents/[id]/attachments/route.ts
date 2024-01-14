import { addDocumentAttachment } from "@/services/document.service";
import { writeFile } from "fs/promises";
import { NextRequest } from "next/server";

export default async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return Response.json("File not found", { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileExtension = file.name.split(".").pop();
  const path = `${process.env.UPLOAD_DIR}/${
    params.id
  }/${crypto.randomUUID()}.${fileExtension}`;
  await writeFile(path, buffer);

  const attachment = await addDocumentAttachment(params.id, path);

  return Response.json(attachment, { status: 200 });
}
