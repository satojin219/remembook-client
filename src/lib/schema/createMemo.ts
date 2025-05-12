import { z } from "zod";

export const createMemoSchema = z.object({
  memo: z
    .string({ required_error: "メモを入力してください" })
    .max(400, { message: "メモは400文字以内で入力してください" }),
});
