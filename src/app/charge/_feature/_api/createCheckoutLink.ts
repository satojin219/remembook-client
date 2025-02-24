"use server";

import { type ErrorType, getErrorMessage } from "@/lib/error";
import type { APIResponse } from "@/types/common";
import { cookies } from "next/headers";

export type CreateCheckoutLinkResponse = {
  url: string;
};

export const createCheckoutLink = async (
  amount: number
): Promise<APIResponse<CreateCheckoutLinkResponse>> => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");
  if (!userId) {
    return { ok: false, errorMessage: "Unauthorized" };
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stripe/createCheckoutSession`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, userId: userId.value }),
      }
    );
    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorType;
      throw errorResponse;
    }
    return {
      ok: true,
      data: res.json() as unknown as CreateCheckoutLinkResponse,
    };
  } catch (e) {
    return {
      ok: false,
      errorMessage: getErrorMessage((e as ErrorType).error.code),
    };
  }
};
