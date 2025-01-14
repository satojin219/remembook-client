"use server";

import { type FC, Suspense } from "react";
import { fetchSummariedBookDetail } from "../fetcher";
import { fetchBook } from "@/lib/fetchBook";
import { BookInfo } from "@/components/BookInfo";
import { QuestionList } from "./_components/QuestionList";

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
        <QuestionList questions={summary.data?.questions || []} />
      </Suspense>
    </>
  );
};
