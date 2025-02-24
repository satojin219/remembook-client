import type { Book } from "@/types/book";
import type { APIResponse } from "@/types/common";
import { type ErrorType, getErrorMessage } from "../error";

export async function getBook(bookId: string): Promise<APIResponse<Book>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/book/${bookId}`
    );

    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }

    const book = (await res.json()) as Book;

    return { ok: true, data: book };
  } catch (e) {
    return {
      ok: false,
      errorMessage: getErrorMessage((e as ErrorType).error.code),
    };
  }
}
