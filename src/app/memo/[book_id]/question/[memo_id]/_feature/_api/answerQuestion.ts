"use server";

import { parseWithZod } from "@conform-to/zod";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { answerSchema } from "../_schema";
import type { APIResponse } from "@/types/common";
import { type ErrorType, getErrorMessage } from "@/lib/error";
import { revalidateTag } from "next/cache";

export type AnswerResponse = {
  score: number;
  userAnswer: string;
  memo: string;
};

type Identifiers = {
  memoId: string;
  questionId: string;
};

export async function answerQuestion(
  identifiers: Identifiers,
  prevState: unknown,
  formData: FormData
): Promise<APIResponse<AnswerResponse>> {
  const submission = parseWithZod(formData, {
    schema: answerSchema,
  });
  if (submission.status !== "success") {
    return { ok: false, submission: submission.reply() };
  }

  const userAnswer = formData.get("userAnswer");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return redirect("/login");
  }

  try {
    const res = await fetch(
      `${process.env.REMEMBOOK_API_URL}/api/v1/memo/${identifiers.memoId}/answer/${identifiers.questionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
          credentials: "include",
        },
        body: JSON.stringify({
          userAnswer,
        }),
      }
    );
    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }
    const answer = (await res.json()) as AnswerResponse;

    // @note: getMeのキャッシュを更新し、コインを更新
    revalidateTag("getMe");

    return { ok: true, data: answer };
  } catch (e) {
    return {
      ok: false,
      errorMessage: getErrorMessage((e as ErrorType).error.code),
    };
  }
}
