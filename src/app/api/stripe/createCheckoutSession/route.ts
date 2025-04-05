import "server-only";

import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export type CreateCheckoutSessionPayload = {
  amount: number;
};

const PER_COIN_PRICE = 50;

export async function POST(req: NextRequest) {
  const { amount } = (await req.json()) as CreateCheckoutSessionPayload;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: "remembookコイン",
            },
            unit_amount: PER_COIN_PRICE,
          },
          quantity: amount,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/charge?session_id={CHECKOUT_SESSION_ID}",`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/charge`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
