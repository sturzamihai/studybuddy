import { auth } from "@/configs/next-auth.config";
import {
  getDocumentAttachment,
  hasDocumentAccess,
} from "@/services/document.service";
import { createReadStream, readFileSync, statSync } from "fs";

export async function GET(
  request: Request,
  { params }: { params: { id: string; aid: string } }
) {
  const session = await auth();
  const user = session?.user;

  if (!user || !(await hasDocumentAccess(params.id, user.id))) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const attachment = await getDocumentAttachment(params.id, params.aid);

  const stat = statSync(attachment.path);

  const readStream = readFileSync(attachment.path);
  const headers = new Headers({
    "Content-Type": "application/octet-stream",
    "Content-Length": stat.size.toString(),
    "Content-Disposition": `attachment; filename="${attachment.path
      .split("/")
      .pop()}"`,
  });

  return new Response(readStream, { headers });
}
