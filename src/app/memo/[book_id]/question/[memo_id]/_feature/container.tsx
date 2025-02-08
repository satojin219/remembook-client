import type { FC } from "react";
import { QuestionPresentational } from "./presentational";
import { fetchQuestion, answerQuestion } from "./_api";
import { scheduleNotification } from "./_api/scheduleNotification";
import { cookies } from "next/headers";

type Props = {
  memoId: string;
};

export const QuestionContainer: FC<Props> = async ({ memoId }) => {
  const question = await fetchQuestion(memoId);

  if (!question.data) {
    return null;
  }
  const answerQuestionWithIds = answerQuestion.bind(null, {
    questionId: question.data.id,
    memoId,
  });
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  return (
    <QuestionPresentational
      question={question.data}
      answerQuestion={answerQuestionWithIds}
      scheduleNotification={scheduleNotification}
      userId={userId || ""}
    />
  );
};
