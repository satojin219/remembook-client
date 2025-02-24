"use server";

import { type FC, Suspense } from "react";
import { fetchBookDetail } from "./_api";

import { BookInfo } from "@/components";
import { QuestionList } from "./_components";
import { getBook } from "@/lib/api";

type Props = {
  bookId: string;
};

export const MemoContainer: FC<Props> = async ({ bookId }) => {
  const memo = await fetchBookDetail(bookId);
  const book = await getBook(memo.data?.book.googleBooksId || "");
  return (
    <>
      <Suspense fallback={<p>読み込み中...</p>}>
        <BookInfo book={book.data} />
      </Suspense>
      <Suspense fallback={<p>読み込み中...</p>}>
        <QuestionList
          bookId={book.data?.id || ""}
          questions={memo.data?.questions || []}
        />
      </Suspense>
    </>
  );
};
