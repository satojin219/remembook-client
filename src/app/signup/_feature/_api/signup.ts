"use server";

import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signupSchema } from "../_schema";
import { type ErrorType, getErrorMessage } from "@/lib/error";

type SignupResponse = {
  accessToken: string;
  userId: string;
};

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
  try {
    const res = await fetch(`${process.env.REMEMBOOK_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }
    const user = (await res.json()) as SignupResponse;

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
