import { ZodError, z } from "zod";

export default function formatError(errors: ZodError) {
  return errors.issues.reduce<{ field: string; message: string }[]>(
    (acc, issue) => {
      acc.push({
        field: issue.path[0].toString(),
        message: issue.message,
      });

      return acc;
    },
    []
  );
}
