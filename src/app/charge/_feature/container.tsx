"use server";

import Stripe from "stripe";
import { createCheckoutLink } from "./_api/createCheckoutLink";
import { ChargePresentational } from "./presentational";
import { addCoin } from "./_api/addCoin";
import { redirect } from "next/navigation";

type Props = {
  sessionId: string | undefined;
};
const PER_COIN_PRICE = 50;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const ChargeContainer = async ({ sessionId }: Props) => {
  if (sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const res = await addCoin(
      (session.amount_total || 0) / PER_COIN_PRICE,
      sessionId
    );
    if(res.ok) {
      redirect("/memo");
    }
  }
  return <ChargePresentational createCheckoutLink={createCheckoutLink} />;
};
