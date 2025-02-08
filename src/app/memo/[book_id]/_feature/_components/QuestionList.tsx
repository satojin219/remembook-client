"use server";

import type { Question } from "@/types/question";
import Link from "next/link";
import type { FC } from "react";

type Props = {
  bookId: string;
  questions: Question[];
};

export const QuestionList: FC<Props> = async ({ bookId,questions }) => {
  return (
    <>
      {questions.map((question, index) => {
        return (
          <Link key={question.id} href={`/memo/${bookId}/question/${question.memoId}`}>
            {question.body}
          </Link>
        );
      })}
    </>
  );
};
