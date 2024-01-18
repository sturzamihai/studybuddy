import { auth } from "@/configs/next-auth.config";
import {
  addDocumentAttachment,
  getDocumentAttachments,
  hasDocumentAccess,
} from "@/services/document.service";
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const user = session?.user;

  if (!user || !(await hasDocumentAccess(params.id, user.id))) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    return Response.json("File not found", { status: 400 });
  }

  const hasUserDir = existsSync(`${process.env.UPLOAD_DIR}/${params.id}`);
  if (!hasUserDir) {
    await mkdir(`${process.env.UPLOAD_DIR}/${params.id}`, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileExtension = file.name.split(".").pop();
  const path = `${process.env.UPLOAD_DIR}/${
    params.id
  }/${crypto.randomUUID()}.${fileExtension}`;
  await writeFile(path, buffer);

  const attachment = await addDocumentAttachment(params.id, file, path);

  return Response.json(attachment, { status: 200 });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const user = session?.user;

  if (!user || !(await hasDocumentAccess(params.id, user.id))) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const attachments = await getDocumentAttachments(params.id);

  return Response.json(attachments, { status: 200 });
}
