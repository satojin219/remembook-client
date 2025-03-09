import type { APIResponse } from "@/types/common";
import { type ErrorType, getErrorMessage } from "../error";
import type { User } from "@/types/user";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function getMe(): Promise<APIResponse<User>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return redirect("/login");
  }

  try {
    const res = await fetch(`${process.env.REMEMBOOK_API_URL}/api/v1/user/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`,
        credentials: "include",
      },
      cache: "no-store"
    });
    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }

    const user = (await res.json()) as User;

    return { ok: true, data: user };
  } catch (e) {
    return {
      ok: false,
      errorMessage: getErrorMessage((e as ErrorType).error.code),
    };
  }
}
