"use server";

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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stripe/createCheckoutSession`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, userId: userId.value }),
    }
  ).then((res) => res.json() as unknown as CreateCheckoutLinkResponse);

  console.log("response", response);

  return {
    ok: true,
    data: response,
  };
};
