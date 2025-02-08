import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
      { error: `Webhook error` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Payment successful for session: ", session.id);
      break;
    }
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("PaymentIntent was successful: ", paymentIntent.id);
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment failed: ", paymentIntent.id);
      break;
    }
    case "charge.succeeded": {
      const charge = event.data.object as Stripe.Charge;
      console.log("Charge succeeded: ", charge.id);
      break;
    }
    case "charge.failed": {
      const charge = event.data.object as Stripe.Charge;
      console.log("Charge failed: ", charge.id);
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      console.log("Charge refunded: ", charge.id);
      break;
    }
    case "charge.updated": {
      const charge = event.data.object as Stripe.Charge;
      console.log("Charge updated: ", charge.id);
      break;
    }
    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("Subscription created: ", subscription.id);
      break;
    }
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("Subscription updated: ", subscription.id);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("Subscription deleted: ", subscription.id);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
