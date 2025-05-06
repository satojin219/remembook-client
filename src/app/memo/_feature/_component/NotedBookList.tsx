"use server";

import type { NotedBookItem } from "@/types/book";
import Link from "next/link";
import Image from "next/image";
import type { FC } from "react";

type Props = {
  books: NotedBookItem[];
};

export const NotedBookList: FC<Props> = async ({ books }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">メモした本がありません</p>
        <Link
          href="/book"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          本を探す
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {books.map((book) => (
        <Link
          key={book.id}
          href={`/memo/${book.id}`}
          className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-3">
          <div className="flex justify-center mb-3 bg-gray-50 rounded-md overflow-hidden">
            <Image
              src={book.imageUrl}
              alt=""
              width={120}
              height={174}
              className="object-contain w-auto h-[174px] group-hover:scale-105 transition-transform duration-300"
              sizes="120px"
              unoptimized
            />
          </div>
          <div className="space-y-1">
            <h2 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
              {book.title}
            </h2>
            <p className="text-xs text-gray-600 line-clamp-1">
              著者：{book.author.join(", ")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
