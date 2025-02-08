"use server";

import { Suspense } from "react";
import { fetchNotedBookList } from "./_api";
import { NotedBookList } from "./_component";
import { NotedPresentational } from "./presentational";

export const NotedContainer = async () => {
  const notedBooks = await fetchNotedBookList();

  return (
    <>
      <Suspense fallback={<p>読み込み中...</p>}>
        <NotedBookList books={notedBooks.data?.books || []} />
      </Suspense>
      <NotedPresentational />
    </>
  );
};
