"use server";

import type { APIResponse } from "@/types/common";

export type BuyCoinResponse = {
  url: string;
};

export const buyCoin = async (
  amount: number
): Promise<APIResponse<BuyCoinResponse>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stripe/createCheckoutSession`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    }
  ).then((res) => res.json() as unknown as BuyCoinResponse);

  console.log("response", response);

  return {
    ok: true,
    data: response,
  };
};
