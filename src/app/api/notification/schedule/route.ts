import type { sendQuestionTask } from "@/trigger/sendQuestion";
import { tasks } from "@trigger.dev/sdk/v3";
import { NextResponse, type NextRequest } from "next/server";
import { date } from "zod";

export const runtime = "edge";

type SendQuestionPayload = {
  userId: string;
  bookId: string;
  memoId: string;
  body: string;
  score: number;
};

export async function POST(req: NextRequest) {
  const { userId, bookId, memoId, body, score } =
    (await req.json()) as SendQuestionPayload;
  const delay = score >= 80 ? 7 : score >= 50 ? 3 : 1;

  try {
    const result = await sendQuestion({
      userId,
      bookId,
      memoId,
      body,
      delay,
    });

    return NextResponse.json({ ok: true, date: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error }, { status: 500 });
  }
}

const sendQuestion = async (
  payload: Omit<SendQuestionPayload, "score"> & { delay: number }
) => {
  const { userId, bookId, memoId, body, delay } = payload;

  try {
    const result = await tasks.trigger<typeof sendQuestionTask>(
      "send-question-task",
      {
        userId,
        bookId,
        memoId,
        body,
      },
      { delay: `${24 * delay}h` }
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error("Failed to trigger send-question-task:", error);
    throw error;
  }
};
