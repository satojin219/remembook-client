"use server";

import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { changeEmailSchema } from "../_schema";
import { type ErrorType, getErrorMessage } from "@/lib/error";

export async function changeEmail(_prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: changeEmailSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const oldEmail = formData.get("oldEmail");
  const newEmail = formData.get("newEmail");

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.REMEMBOOK_API_URL}/auth/change_email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          oldEmail,
          newEmail,
        }),
      }
    );

    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }
  } catch (e) {
    return submission.reply({
      formErrors: [getErrorMessage((e as ErrorType).error.code)],
    });
  }
  redirect("/settings");
}
