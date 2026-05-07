import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getStripe, hasStripeConfig } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!hasStripeConfig() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true, mode: "mock" });
  }

  const body = await request.text();
  const headerStore = await headers();
  const signature = headerStore.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const stripe = getStripe();
  const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

  if (event.type === "checkout.session.completed") {
    // Production hook: mark order paid, submit provider order, and enqueue audit log.
  }

  return NextResponse.json({ received: true });
}
