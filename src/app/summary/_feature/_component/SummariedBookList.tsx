"use server";

import type { SummariedBookItem } from "@/types/book";
import Link from "next/link";
import type { FC } from "react";

type Props = {
  books: SummariedBookItem[];
};

export const SummariedBookList: FC<Props> = async ({ books }) => {
  return (
    <>
      {books.map((book) => (
        <Link key={book.id} href={`/summary/${book.id}`}>
          <div key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.author.join(", ")}</p>
            <img src={book.imageUrl} alt={book.title} />
          </div>
        </Link>
      ))}
    </>
  );
};
