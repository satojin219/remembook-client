"use server";

import { Suspense } from "react";
import { BookDetailPresentational } from "./presentational";
import { BookInfo } from "@/components/BookInfo";
import { createMemo } from "@/lib/api/createMemo";
import { getBook } from "@/lib/api";

type Props = {
  bookId: string;
};

export const BookDetailContainer: React.FC<Props> = async ({ bookId }) => {
  const book = await getBook(bookId);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Suspense
        fallback={
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">読み込み中...</p>
          </div>
        }>
        <BookInfo key={bookId} book={book.data} />
      </Suspense>
      <BookDetailPresentational book={book.data} createMemo={createMemo} />
    </div>
  );
};
