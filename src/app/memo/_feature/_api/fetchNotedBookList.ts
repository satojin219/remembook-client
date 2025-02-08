"use server";

import type { NotedBookItem } from "@/types/book";
import type { APIResponse } from "@/types/common";
import { cookies } from "next/headers";

export type FetchNotedBookResponse = {
  books: NotedBookItem[];
};

export const fetchNotedBookList = async (): Promise<
  APIResponse<FetchNotedBookResponse>
> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return { ok: false, errorMessage: "ログインしてください。" };
  }
  try {
    const response = await fetch(
      `${process.env.REMEMBOOK_API_URL}/api/v1/books`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
          credentials: "include",
        },
      }
    );

    const notes = (await response.json()) as FetchNotedBookResponse;
    return { ok: true, data: notes };
  } catch (error) {
    console.error("Get notes failed:", error);
    return { ok: false, errorMessage: "ノートの取得に失敗しました。" };
  }
};
