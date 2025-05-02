import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import type { ErrorType } from "./lib/error";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // /book/[id]のパターンにマッチするかチェック
  const bookMatch = path.match(/^\/book\/([^\/]+)$/);
  if (bookMatch) {
    const googleBooksId = bookMatch[1];

    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get("accessToken");

      if (!accessToken) {
        throw new Error("accessToken is not found");
      }

      // APIにリクエストを送信
      const response = await fetch(
        `${process.env.REMEMBOOK_API_URL}/api/v1/books/check/${googleBooksId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );

      if (!response.ok) {
        const errorResponse = (await response.json()) as ErrorType;
        throw new Error(errorResponse.error.message);
      }

      // レスポンスが空でない場合のみJSONとしてパースを試みる
      const bookId = (await response.json()) as { book_id: string };
      if (!bookId) {
        return NextResponse.next();
      }

      // book_idが存在する場合は/memo/[book_id]にリダイレクト
      if (bookId) {
        return NextResponse.redirect(new URL(`/memo/${bookId}`, request.url));
      }

      // book_idが存在しない場合やパースに失敗した場合は元のURLのまま
      return NextResponse.next();
    } catch (error) {
      // エラーが発生した場合は元のURLのまま
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/book/:path*",
};
