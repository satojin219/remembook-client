import { z } from "zod";

export const answerSchema = z.object({
  userAnswer: z.string().min(1, { message: "回答を入力してください" }).max(400, { message: "回答は400文字以内で入力してください" }),
})