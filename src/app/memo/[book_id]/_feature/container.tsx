"use server";

import { type FC, Suspense } from "react";
import { fetchBookDetail } from "./_api";
import { BookInfo } from "@/components";
import { QuestionList } from "./_components";
import { getBook } from "@/lib/api";
import { createMemo } from "@/lib/api/createMemo";
import { MemoPresentational } from "./presentational";

type Props = {
  bookId: string;
};

export const MemoContainer: FC<Props> = async ({ bookId }) => {
  console.log(bookId);
  const memo = await fetchBookDetail(bookId);
  const book = await getBook(memo.data?.book.googleBooksId || "");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Suspense
          fallback={
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-600">本の情報を読み込み中...</p>
            </div>
          }>
          <BookInfo book={book.data} />
        </Suspense>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Suspense
            fallback={
              <div className="text-center py-8">
                <div className="animate-spin h-6 w-6 border-3 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-gray-600">メモを読み込み中...</p>
              </div>
            }>
            <QuestionList
              bookId={book.data?.id || ""}
              questions={memo.data?.questions || []}
            />
            <MemoPresentational book={book.data} createMemo={createMemo} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
