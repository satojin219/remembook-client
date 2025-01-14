import type { Book } from "@/types/book";
import type { APIResponse } from "@/types/common";

export async function fetchBook(bookId: string): Promise<APIResponse<Book>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/book/${bookId}`
    );

    if (!response.ok) {
      throw new Error("サーバーエラーにより本の取得に失敗しました。");
    }

    const book = (await response.json()) as Book;

    return { ok: true, data: book };
  } catch (error) {
    console.error("Fetch book failed:", error);
    return { ok: false, errorMessage: "本の取得に失敗しました。" };
  }
}
