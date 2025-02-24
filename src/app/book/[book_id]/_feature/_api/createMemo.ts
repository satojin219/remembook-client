"use server";

import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createMemoSchema } from "../_schema";
import type { Book } from "@/types/book";
import { type ErrorType, getErrorMessage } from "@/lib/error";

export async function createMemo(
  book: Book,
  _prevState: unknown,
  formData: FormData
) {
  const submission = parseWithZod(formData, {
    schema: createMemoSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const memo = formData.get("memo");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return redirect("/login");
  }
  try {
    const res = await fetch(`${process.env.REMEMBOOK_API_URL}/api/v1/memo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`,
        credentials: "include",
      },
      body: JSON.stringify({
        body: memo,
        title: book.title,
        author: book.authors,
        imageUrl: book.imageSrc,
        googleBooksId: book.id,
      }),
    });
    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }
    return redirect("/memo");
  } catch (e) {
    return submission.reply({
      formErrors: [getErrorMessage((e as ErrorType).error.code)],
    });
  }
}
