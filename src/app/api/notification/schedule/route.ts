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

const sendQuestion = async (
  payload: Omit<SendQuestionPayload, "score"> & { delay: number }
) => {
  const { userId, bookId, summaryId, body, delay } = payload;
  const date = `${1 * delay}m`;
  console.log("Sending question in", date);
  await tasks
    .trigger<typeof sendQuestionTask>(
      "send-question-task",
      {
        userId,
        bookId,
        summaryId,
        body,
      },
      { delay: date }
    )
    .then((res) => console.log("Task response", res))
    .catch((err) => console.error("Task error", err));
};
