"use server";

import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createMemoSchema } from "../_schema";
import type { Book } from "@/types/book";

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
  await fetch(`${process.env.REMEMBOOK_API_URL}/api/v1/memo`, {
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
  }).catch((e) => {
    console.error(e);
  });

  return redirect("/memo");
}
