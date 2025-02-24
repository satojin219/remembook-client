"use server";

import { type ErrorType, getErrorMessage } from "@/lib/error";
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
    const res = await fetch(`${process.env.REMEMBOOK_API_URL}/api/v1/books`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`,
        credentials: "include",
      },
    });

    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }

    const notes = (await res.json()) as FetchNotedBookResponse;
    return { ok: true, data: notes };
  } catch (e) {
    return {
      ok: false,
      errorMessage: getErrorMessage((e as ErrorType).error.code),
    };
  }
};
