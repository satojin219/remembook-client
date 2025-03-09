"use server";

import { Suspense } from "react";
import { fetchNotedBookList } from "./_api";
import { NotedBookList } from "./_component";
import { NotedPresentational } from "./presentational";

export const NotedContainer = async () => {
  const notedBooks = await fetchNotedBookList();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">メモした本</h1>
      </div>

      <Suspense
        fallback={
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">読み込み中...</p>
          </div>
        }>
        <NotedBookList books={notedBooks.data?.books || []} />
      </Suspense>

      <NotedPresentational />
    </div>
  );
};
