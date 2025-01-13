import type { Book } from "@/types/book";

export async function fetchBook(bookId: string): Promise<Book> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/book/${bookId}`
  );

  if (res.status !== 200) {
    throw new Error("Failed to fetch book data");
  }

  return res.json() as Promise<Book>;
}
