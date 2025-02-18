"use client";

import type { APIResponse } from "@/types/common";
import type { FC } from "react";
import { useRef } from "react";
import type { CreateCheckoutLinkResponse } from "./_api/createCheckoutLink";

type Props = {
  createCheckoutLink: (
    amount: number
  ) => Promise<APIResponse<CreateCheckoutLinkResponse>>;
};

export const ChargePresentational: FC<Props> = ({ createCheckoutLink }) => {
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
          createCheckoutLink(Number(amount.current?.value)).then((res) => {
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
