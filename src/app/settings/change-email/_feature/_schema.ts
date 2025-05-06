import { z } from "zod";

export const changeEmailSchema = z.object({
  oldEmail: z.string().email("有効なメールアドレスを入力してください"),
  newEmail: z.string().email("有効なメールアドレスを入力してください"),
});
