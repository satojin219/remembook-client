"use client";

import type { APIResponse } from "@/types/common";
import type { FC } from "react";
import { useRef } from "react";
import type { BuyCoinResponse } from "./_api/buyCoin";

type Props = {
  buyCoin: (amount: number) => Promise<APIResponse<BuyCoinResponse>>;
};

export const BillingPresentational: FC<Props> = ({ buyCoin }) => {
  const amount = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="number"
        ref={amount}
        placeholder="購入するコインの数"
        min={1}
      />
      <button
        type="button"
        onClick={() =>
          buyCoin(Number(amount.current?.value)).then((res) => {
            const stripeUrl = res.data?.url;
            console.log("stripeUrl", stripeUrl);
            if (!stripeUrl) {
              return;
            }
            window.location.href = stripeUrl;
          })
        }>
        コインを購入する
      </button>
    </>
  );
};
