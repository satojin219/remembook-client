"use server";

import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signupSchema } from "./_schema";

export async function signup(_prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: signupSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const cookieStore = await cookies();
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      cookieStore.set("accessToken", data.accessToken, {
        maxAge: 3 * 24 * 60 * 60,
      });
    });

  return redirect("/books");
}
