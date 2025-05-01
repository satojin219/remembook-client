"use server";

import { type ErrorType, getErrorMessage } from "@/lib/error";
import type { APIResponse } from "@/types/common";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    const res = await fetch(`${process.env.REMEMBOOK_API_URL}/api/v1/coin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`,
      },
      body: JSON.stringify({ amount, sessionId, coinType: "Paid" }),
    });

    // if (!res.ok) {
    //   const errorResponse = (await res.json()) as ErrorType;
    //   throw errorResponse;
    // }
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tag: "getMe",
      }),
    });

    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      errorMessage: getErrorMessage((e as ErrorType).error.code),
    };
  }
};
