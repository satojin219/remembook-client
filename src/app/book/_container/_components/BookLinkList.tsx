import type { Book } from "@/types/book";
import type { FC } from "react";
import Link from "next/link";
import { Menu, MenuItem, MenuItems } from "@headlessui/react";

type Props = {
  books: Book[];
};

export const BookLinkList: FC<Props> = ({ books }) => {
  return (
    <Menu>
      {books.map((book) => (
        <MenuItem key={book.id}>
          <Link href={`/book/${book.id}`} suppressHydrationWarning>
            <img
              src={book.imageSrc}
              alt={book.title}
              width={128}
              suppressHydrationWarning
            />
            <p suppressHydrationWarning>{book.title}</p>
            <p suppressHydrationWarning>著者： {book.authors.join(", ")}</p>
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );
};
