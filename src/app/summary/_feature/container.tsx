"use server";

import { Suspense } from "react";
import { fetchSummariedBookList } from "./_api";
import { SummariedBookList } from "./_component";
import { SummariesPresentational } from "./presentational";

export const SummariesContainer = async () => {
  const summariedBooks = await fetchSummariedBookList();

  return (
    <>
      <Suspense fallback={<p>読み込み中...</p>}>
        <SummariedBookList books={summariedBooks.data?.books || []} />
      </Suspense>
      <SummariesPresentational />
    </>
  );
};
