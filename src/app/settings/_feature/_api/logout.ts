"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type ErrorType, getErrorMessage } from "@/lib/error";

export async function logout() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.REMEMBOOK_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }

    cookieStore.delete("accessToken");
    cookieStore.delete("userId");
  } catch (e) {
    throw new Error(getErrorMessage((e as ErrorType).error.code));
  }
  redirect("/login");
}
