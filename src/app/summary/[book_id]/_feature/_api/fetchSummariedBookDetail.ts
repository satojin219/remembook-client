"use server";

import type { APIResponse } from "@/types/common";
import type { Question } from "@/types/question";
import { cookies } from "next/headers";

export type FetchSummariedBookDetailResponse = {
  book: {
    id: string;
    googleBooksId: string;
  };
  questions: Question[];
};

export const fetchSummariedBookDetail = async (
  bookId: string
): Promise<APIResponse<FetchSummariedBookDetailResponse>> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return { ok: false, errorMessage: "ログインしてください。" };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REMEMBOOK_API_URL}/api/v1/books/${bookId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
          credentials: "include",
        },
      }
    );

    const summary = (await response.json()) as FetchSummariedBookDetailResponse;

    return { ok: true, data: summary };
  } catch (error) {
    console.error("Get summaries failed:", error);
    return { ok: false, errorMessage: "要約の取得に失敗しました。" };
  }
};
