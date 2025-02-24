"use server";
import { type ErrorType, getErrorMessage } from "@/lib/error";
import type { APIResponse } from "@/types/common";
import { cookies } from "next/headers";

export const scheduleNotification = async (
  userId: string,
  bookId: string,
  memoId: string,
  body: string,
  score: number
): Promise<APIResponse<void>> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return { ok: false, errorMessage: "ログインしてください。" };
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notification/schedule`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          bookId,
          memoId,
          body,
          score,
        }),
      }
    );
    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      errorMessage: getErrorMessage((e as ErrorType).error.code),
    };
  }
};
