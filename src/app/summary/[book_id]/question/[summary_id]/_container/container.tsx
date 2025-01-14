import type { FC } from "react";
import { QuestionPresentational } from "./presentational";
import { fetchQuestion } from "./fetcher";
import { answerQuestion } from "./action";

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
  
  return (
    <QuestionPresentational
      question={question.data}
      answerQuestion={answerQuestionWithIds}
    />
  );
};
