import { z } from "zod";
export default function validateSchema(schema: z.Schema, data: any) {
  return schema.parse(data);
}
