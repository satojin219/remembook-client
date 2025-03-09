import type { Book } from "@/types/book";
import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  books: Book[];
};

export const BookLinkList: FC<Props> = ({ books }) => {
  if (books.length === 0) {
    return (
      <p className="text-center text-gray-600 py-12">
        検索結果が見つかりませんでした。別のキーワードで試してみてください。
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {books.map((book) => (
        <Link
          href={`/book/${book.id}`}
          key={book.id}
          className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
          aria-label={`${book.title} - ${book.authors.join(", ")} 著`}>
          <div className="relative mb-4 bg-gray-50 rounded-md overflow-hidden">
            <div className="w-full h-[280px] sm:h-[320px] flex items-center justify-center">
              <Image
                src={book.imageSrc}
                alt=""
                width={180}
                height={260}
                className="object-contain w-auto h-full group-hover:scale-105 transition-transform duration-300"
                sizes="180px"
              />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-1">
              著者：{book.authors.join(", ")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
