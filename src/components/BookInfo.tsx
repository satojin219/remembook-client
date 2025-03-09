"use server";

import type { Book } from "@/types/book";
import Image from "next/image";
import type { FC } from "react";

type Props = {
  book: Book | undefined;
};

export const BookInfo: FC<Props> = async ({ book }) => {
  if (!book) {
    return null;
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 画像セクション */}
        <div className="relative aspect-[3/4] w-full max-w-sm mx-auto md:mx-0">
          <Image
            src={book.imageSrc}
            alt=""
            width={180}
            height={260}
            className="object-contain w-auto h-full group-hover:scale-105 transition-transform duration-300"
            sizes="180px"
          />
        </div>

        {/* 情報セクション */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {book.title}
          </h1>

          <div className="space-y-2 text-gray-600">
            <p className="flex items-center gap-2">
              <span className="font-medium">著者:</span>
              <span>{book.authors.join(", ")}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium">出版社:</span>
              <span>{book.publisher}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium">発行日:</span>
              <span>{book.publishedDate}</span>
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">概要</h2>
            <p className="text-gray-600 leading-relaxed">{book.description}</p>
          </div>

          <a
            href={book.linkSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            詳細を見る
          </a>
        </div>
      </div>
    </div>
  );
};
