"server only";

import type { Book } from "@/types/book";
import { parseWithZod } from "@conform-to/zod";
import { searchBookSchema } from "./_schema";
import type { ServerActionResponse } from "@/types/common";

export const searchBook = async (
  prevState: unknown,
  formData: FormData
): Promise<ServerActionResponse<Book[]>> => {
  const submission = parseWithZod(formData, { schema: searchBookSchema });
  if (submission.status !== "success") {
    return { ok: false, submission: submission.reply() };
  }
  const searchWord = formData.get("searchWord") as string;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/book?searchWord=${searchWord}`
    ).then((res) => res.json() as unknown as Book[]);

    return { ok: true, data: response };
  } catch (error) {
    return { ok: false, errorMessage: "本の取得に失敗しました。" };
  }
};
