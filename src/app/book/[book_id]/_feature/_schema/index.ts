import { z } from "zod";

export const createMemoSchema = z.object({
  memo: z
    .string()
    .min(1, { message: "メモを入力してください" })
    .max(400, { message: "メモは400文字以内で入力してください" }),
});
