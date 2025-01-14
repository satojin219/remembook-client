"use server";

import { Suspense } from "react";
import { fetchSummariedBookList } from "./fetcher";
import { SummariedBookList } from "./_component/SummariedBook";

export const SummariesContainer = async () => {
  const summariedBooks = await fetchSummariedBookList();

  return (
    <>
      <Suspense fallback={<p>読み込み中...</p>}>
        <SummariedBookList books={summariedBooks.data?.books || []} />
      </Suspense>
    </>
  );
};
