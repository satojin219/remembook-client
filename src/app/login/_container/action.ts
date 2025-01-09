"use server";

import { parseWithZod } from "@conform-to/zod";
import { loginSchema } from "./_schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const email = formData.get("email");
  const password = formData.get("password");
  const cookieStore = await cookies();
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      cookieStore.set("accessToken", data.accessToken);
    });

  return redirect("/books");
}
