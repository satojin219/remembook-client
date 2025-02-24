"use server";

import { type ErrorType, getErrorMessage } from "@/lib/error";
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
    const res = await fetch(
      `${process.env.REMEMBOOK_API_URL}/api/v1/memo/${memoId}/question`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
          credentials: "include",
        },
      }
    );
    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }
    const question = (await res.json()) as Question;

    return { ok: true, data: question };
  } catch (e) {
    return {
      ok: false,
      errorMessage: getErrorMessage((e as ErrorType).error.code),
    };
  }
};
