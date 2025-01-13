import { z } from "zod";

export const createSummarySchema = z.object({
  summary: z.string().min(1, { message: "要約を入力してください" }).max(400, { message: "要約は400文字以内で入力してください" }),
})