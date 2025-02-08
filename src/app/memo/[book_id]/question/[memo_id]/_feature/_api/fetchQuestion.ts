"use server";

import type { APIResponse } from "@/types/common";
import type { Question } from "@/types/question";
import { cookies } from "next/headers";

export const fetchQuestion = async (
  memoId: string
): Promise<APIResponse<Question>> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return { ok: false, errorMessage: "ログインしてください。" };
  }
  try {
    const response = await fetch(
      `${process.env.REMEMBOOK_API_URL}/api/v1/memo/${memoId}/question`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
          credentials: "include",
        },
      }
    );

    const question = (await response.json()) as Question;

    return { ok: true, data: question };
  } catch (error) {
    console.error("Get question failed:", error);
    return { ok: false, errorMessage: "質問の取得に失敗しました。" };
  }
};
