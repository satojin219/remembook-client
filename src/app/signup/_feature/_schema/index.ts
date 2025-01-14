import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "ユーザー名を入力してください" })
    .max(16, { message: "ユーザー名は16文字以下で入力してください" }),
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" }),
});
