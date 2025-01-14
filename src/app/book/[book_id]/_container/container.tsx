"use server";

import { Suspense } from "react";

import { BookDetailPresentational } from "./presentational";
import { BookInfo } from "@/components/BookInfo";
import { createSummary } from "./action";
import { fetchBook } from "@/lib/fetchBook";

type Props = {
  bookId: string;
};

export const BookDetailContainer: React.FC<Props> = async ({ bookId }) => {
  const book = await fetchBook(bookId);

  return (
    <div>
      <Suspense fallback={<p>読み込み中...</p>}>
        <BookInfo key={bookId} book={book.data} />
      </Suspense>
      <BookDetailPresentational
        book={book.data}
        createSummary={createSummary}
      />
    </div>
  );
};
