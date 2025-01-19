import type { FC } from "react";
import { QuestionPresentational } from "./presentational";
import { fetchQuestion, answerQuestion } from "./_api";
import { sendMessage } from "./_api/sendMessage";
import { cookies } from "next/headers";

type Props = {
  summaryId: string;
};

export const QuestionContainer: FC<Props> = async ({ summaryId }) => {
  const question = await fetchQuestion(summaryId);

  if (!question.data) {
    return null;
  }
  const answerQuestionWithIds = answerQuestion.bind(null, {
    questionId: question.data.id,
    summaryId,
  });
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  return (
    <QuestionPresentational
      question={question.data}
      answerQuestion={answerQuestionWithIds}
      sendMessage={sendMessage}
      userId={userId || ""}
    />
  );
};
