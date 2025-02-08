import type { APIResponse } from "@/types/common";

export type CheckPaymentStatusResponse = {
  status: string;
};

export const checkPaymentStatus = async (
  id: string
): Promise<APIResponse<CheckPaymentStatusResponse>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/paypay/checkPaymentStatus`,
      {
        method: "POST",
        body: JSON.stringify({ id }),
      }
    );
    return { ok: true, data: await response.json() };
  } catch (error) {
    return { ok: false, errorMessage: "Failed to check payment status" };
  }
};
