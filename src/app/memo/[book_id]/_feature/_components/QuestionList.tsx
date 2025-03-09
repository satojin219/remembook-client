"use server";

import type { Question } from "@/types/question";
import Link from "next/link";
import type { FC } from "react";

type Props = {
  bookId: string;
  questions: Question[];
};

export const QuestionList: FC<Props> = async ({ bookId, questions }) => {
  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">まだメモがありません</p>
        <Link
          href={`/book/${bookId}`}
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          メモを作成する
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">メモ一覧</h2>
        <Link
          href={`/book/${bookId}`}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          新しいメモを作成
        </Link>
      </div>

      <div className="grid gap-4">
        {questions.map((question) => (
          <Link
            key={question.id}
            href={`/memo/${bookId}/question/${question.memoId}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 group">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {question.body}
                </p>
              </div>
              <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
