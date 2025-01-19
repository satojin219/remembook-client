"use server";
import type { APIResponse } from "@/types/common";
import { cookies } from "next/headers";

export const sendMessage = async (
  userId: string,
  bookId: string,
  summaryId: string,
  body: string,
  score: number
): Promise<APIResponse<void>> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return { ok: false, errorMessage: "ログインしてください。" };
  }
  try {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notification/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        bookId,
        summaryId,
        body,
        score,
      }),
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, errorMessage: "Failed to send message." };
  }
};
