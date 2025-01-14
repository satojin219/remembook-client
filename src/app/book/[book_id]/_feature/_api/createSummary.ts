"use server";

import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSummarySchema } from "../_schema";
import type { Book } from "@/types/book";

export async function createSummary(
  book: Book,
  _prevState: unknown,
  formData: FormData
) {
  const submission = parseWithZod(formData, {
    schema: createSummarySchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const summary = formData.get("summary");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return redirect("/login");
  }
  await fetch(`${process.env.NEXT_PUBLIC_REMEMBOOK_API_URL}/api/v1/summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.value}`,
      credentials: "include",
    },
    body: JSON.stringify({
      body: summary,
      title: book.title,
      author: book.authors,
      imageUrl: book.imageSrc,
      googleBooksId: book.id,
    }),
  }).catch((e) => {
    console.error(e);
  });

  return redirect("/summary");
}
