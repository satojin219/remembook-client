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
    <div>
      <h1>{book.title}</h1>
      <p>著者: {book.authors.join(", ")}</p>
      <p>出版社: {book.publisher}</p>
      <p>発行日: {book.publishedDate}</p>
      <p>{book.description}</p>
      <div className="relative w-64 h-64">
        <Image src={book.imageSrc} alt={book.title} fill objectFit="contain" />
      </div>
      <a href={book.linkSrc}>詳細リンク</a>
    </div>
  );
};
