"use server";

import type { Question } from "@/types/question";
import Link from "next/link";
import type { FC } from "react";

type Props = {
  questions: Question[];
};

export const QuestionList: FC<Props> = async ({ questions }) => {
  return (
    <>
      {questions.map((question, index) => {
        return (
          <Link key={question.id} href={`/${question.id}`}>
            {question.body}
          </Link>
        );
      })}
    </>
  );
};
