import "server-only";

import type { Book } from "@/types/book";
import type { GoogleBooksApiResponse } from "@/types/googleBook";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const searchWord = req.nextUrl.searchParams.get("searchWord");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}?q=${encodeURIComponent(
      searchWord || ""
    )}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
  )
    .then(async (res) => {
      const jsonResponse =
        (await res.json()) as unknown as GoogleBooksApiResponse;

      const books: Book[] =
        jsonResponse.items?.map((item) => {
          const volumeInfo = item.volumeInfo;

          return {
            id: item.id,
            title: volumeInfo.title || "No title",
            authors: volumeInfo.authors || ["Unknown Author"],
            publisher: volumeInfo.publisher || "Unknown Publisher",
            publishedDate: volumeInfo.publishedDate || "Unknown Date",
            description: volumeInfo.description || "No description available",
            imageSrc:
              volumeInfo.imageLinks?.thumbnail ||
              "https://via.placeholder.com/128x192?text=No+Image",
            linkSrc: volumeInfo.infoLink || "#",
          };
        }) || [];
      return books;
    })
    .catch((error) => {
      console.error(error);
      return NextResponse.json(error, { status: 500 });
    });
  return NextResponse.json(response, { status: 200 });
}
