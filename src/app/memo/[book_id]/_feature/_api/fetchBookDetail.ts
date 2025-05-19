"use server";

import { type ErrorType, getErrorMessage } from "@/lib/error";
import type { APIResponse } from "@/types/common";
import type { Question } from "@/types/question";
import { cookies } from "next/headers";

export type FetchBookDetailResponse = {
  book: {
    id: string;
    googleBooksId: string;
  };
  questions: Question[];
};

export const fetchBookDetail = async (
  bookId: string
): Promise<APIResponse<FetchBookDetailResponse>> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return { ok: false, errorMessage: "ログインしてください。" };
  }
  try {
    const res = await fetch(
      `${process.env.REMEMBOOK_API_URL}/api/v1/books/${bookId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
          credentials: "include",
        },
        next: {
          tags: [`book-${bookId}`],
        },
      }
    );

    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }
    const summary = (await res.json()) as FetchBookDetailResponse;

    return { ok: true, data: summary };
  } catch (e) {
    return {
      ok: false,
      errorMessage: getErrorMessage((e as ErrorType).error.code),
    };
  }
};
