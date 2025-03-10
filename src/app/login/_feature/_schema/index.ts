import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "メールアドレスは必須です" })
    .nonempty({ message: "メールアドレスを入力してください" })
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: z
    .string({ required_error: "パスワードは必須です" })
    .nonempty({ message: "パスワードを入力してください" })
    .min(8, { message: "パスワードは8文字以上で入力してください" }),
});
