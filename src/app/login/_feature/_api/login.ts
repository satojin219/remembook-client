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
    const data = (await res.json()) as LoginResponse | ErrorType;
    if ("error" in data) {
      throw data;
    }

    cookieStore.set("accessToken", data.accessToken, {
      maxAge: 24 * 24 * 60 * 60,
    });
    cookieStore.set("userId", data.userId, {
      maxAge: 24 * 24 * 60 * 60,
    });
  } catch (e) {
    console.log(e);
    return submission.reply({
      formErrors: [getErrorMessage((e as ErrorType).error.code)],
    });
  }
  //**
  // @note try-catch内にredirectを書くとエラーが発生するので、外のブロックで実行する
  // @link https://nextjs.org/docs/app/building-your-application/routing/redirecting#:~:text=redirect%20internally%20throws%20an%20error%20so%20it%20should%20be%20called%20outside%20of%20try/catch%20blocks.
  //  */
  redirect("/memo");
}
