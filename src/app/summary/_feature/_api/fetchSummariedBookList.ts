"use server";

import type { SummariedBookItem } from "@/types/book";
import type { APIResponse } from "@/types/common";
import { cookies } from "next/headers";

export type FetchSummariedBookResponse = {
  books: SummariedBookItem[];
};

export const fetchSummariedBookList = async (): Promise<
  APIResponse<FetchSummariedBookResponse>
> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return { ok: false, errorMessage: "ログインしてください。" };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REMEMBOOK_API_URL}/api/v1/books`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
          credentials: "include",
        },
      }
    );

    const summaries = (await response.json()) as FetchSummariedBookResponse;
    console.log("summaries", summaries);
    return { ok: true, data: summaries };
  } catch (error) {
    console.error("Get summaries failed:", error);
    return { ok: false, errorMessage: "要約の取得に失敗しました。" };
  }
};
