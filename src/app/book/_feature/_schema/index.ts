import { z } from "zod";

export const searchBookSchema = z.object({
  searchWord: z.string().min(1,{ message: "検索ワードを入力してください" }),
});
