"use server";

import { parseWithZod } from "@conform-to/zod";
import { loginSchema } from "../_schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type ErrorType, getErrorMessage } from "@/lib/error";

type LoginResponse = {
  accessToken: string;
  userId: string;
};

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
  try {
    const res = await fetch(`${process.env.REMEMBOOK_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }
    const user = (await res.json()) as LoginResponse;

    cookieStore.set("accessToken", user.accessToken, {
      maxAge: 24 * 24 * 60 * 60,
    });
    cookieStore.set("userId", user.userId, {
      maxAge: 24 * 24 * 60 * 60,
    });
    return redirect("/memo");
  } catch (e) {
    return submission.reply({
      formErrors: [getErrorMessage((e as ErrorType).error.code)],
    });
  }
}
