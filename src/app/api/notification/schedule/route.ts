import type { sendQuestionTask } from "@/trigger/sendQuestion";
import { tasks } from "@trigger.dev/sdk/v3";
import { NextResponse, type NextRequest } from "next/server";

type SendQuestionPayload = {
  userId: string;
  bookId: string;
  summaryId: string;
  body: string;
  score: number;
};

export async function POST(req: NextRequest) {
  const { userId, bookId, summaryId, body, score } =
    (await req.json()) as SendQuestionPayload;
  const delay = score >= 80 ? 7 : score >= 50 ? 3 : 1;
  
  try {
    sendQuestion({
      userId,
      bookId,
      summaryId,
      body,
      delay,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

const sendQuestion = (
  payload: Omit<SendQuestionPayload, "score"> & { delay: number }
) => {
  const { userId, bookId, summaryId, body, delay } = payload;
  const delayDate = new Date(
    Date.now() + 24 * delay * 60 * 60 * 1000
  ).toISOString();
  tasks.trigger<typeof sendQuestionTask>(
    "send-question-task",
    {
      userId,
      bookId,
      summaryId,
      body,
    },
    { delay: delayDate }
  );
};
