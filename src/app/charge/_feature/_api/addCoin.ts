"use server";

import { type ErrorType, getErrorMessage } from "@/lib/error";
import type { APIResponse } from "@/types/common";
import { cookies } from "next/headers";

export const addCoin = async (
  amount: number,
  sessionId: string
): Promise<APIResponse> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return { ok: false, errorMessage: "Unauthorized" };
  }

  try {
    const res = await fetch(
      `${process.env.REMEMBOOK_API_URL}/api/v1/user/charge`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.value}`,
        },
        body: JSON.stringify({ amount, sessionId }),
      }
    );

    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }

    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      errorMessage: getErrorMessage((e as ErrorType).error.code),
    };
  }
};
