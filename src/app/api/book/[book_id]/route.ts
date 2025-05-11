import "server-only";

import type { Book } from "@/types/book";
import type { GoogleBooksApiResponseById } from "@/types/googleBook";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

type Params = {
  book_id: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { book_id } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}/${book_id}?key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );

    if (response.status === 429) {
      return NextResponse.json(
        { errorMessage: "Too Many Requests" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse =
      (await response.json()) as unknown as GoogleBooksApiResponseById;
    const book: Book = {
      id: jsonResponse.id,
      title: jsonResponse.volumeInfo.title || "No title",
      authors: jsonResponse.volumeInfo.authors || ["Unknown Author"],
      publisher: jsonResponse.volumeInfo.publisher || "Unknown Publisher",
      publishedDate: jsonResponse.volumeInfo.publishedDate || "Unknown Date",
      description:
        jsonResponse.volumeInfo.description || "No description available",
      imageSrc:
        jsonResponse.volumeInfo.imageLinks?.thumbnail ||
        "https://via.placeholder.com/128x192?text=No+Image",
      linkSrc: jsonResponse.volumeInfo.infoLink || "#",
    };

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { errorMessage: "本の取得に失敗しました。" },
      { status: 500 }
    );
  }
}
