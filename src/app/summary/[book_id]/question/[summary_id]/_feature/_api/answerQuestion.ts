"use server";

import { parseWithZod } from "@conform-to/zod";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { answerSchema } from "../_schema";
import type { APIResponse } from "@/types/common";

export type AnswerResponse = {
  score: number;
  userAnswer: string;
  summary: string;
};

type Identifiers = {
  summaryId: string;
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
    const result = await fetch(
      `${process.env.REMEMBOOK_API_URL}/api/v1/summary/${identifiers.summaryId}/answer/${identifiers.questionId}`,
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

    const answer = (await result.json()) as AnswerResponse;
    return { ok: true, data: answer };
  } catch (error) {
    console.error("Answer failed:", error);
    return { ok: false, errorMessage: "回答に失敗しました。" };
  }
}
