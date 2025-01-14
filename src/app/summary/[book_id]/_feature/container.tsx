"use server";

import { type FC, Suspense } from "react";
import { fetchSummariedBookDetail } from "./_api";
import { fetchBook } from "@/lib";
import { BookInfo } from "@/components";
import { QuestionList } from "./_components";

type Props = {
  bookId: string;
};

export const SummaryContainer: FC<Props> = async ({ bookId }) => {
  const summary = await fetchSummariedBookDetail(bookId);
  const book = await fetchBook(summary.data?.book.googleBooksId || "");
  return (
    <>
      <Suspense fallback={<p>読み込み中...</p>}>
        <BookInfo book={book.data} />
      </Suspense>
      <Suspense fallback={<p>読み込み中...</p>}>
        <QuestionList
          bookId={book.data?.id || ""}
          questions={summary.data?.questions || []}
        />
      </Suspense>
    </>
  );
};
