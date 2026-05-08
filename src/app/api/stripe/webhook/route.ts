import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  findCheckoutIntentByStripeSession,
  markCheckoutIntentPaid,
  markCheckoutIntentProviderError,
  markCheckoutIntentSubmitted,
} from "@/lib/checkout-intents";
import { getProviderAdapter } from "@/lib/provider";
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
    const session = event.data.object as Stripe.Checkout.Session;
    const checkoutIntent = await findCheckoutIntentByStripeSession(session.id);

    if (checkoutIntent) {
      const paymentIntentId = typeof session.payment_intent === "string" ? session.payment_intent : null;
      await markCheckoutIntentPaid({ checkoutIntentId: checkoutIntent.id, paymentIntentId });

      try {
        const provider = getProviderAdapter();
        const order = await provider.createOrder({
          userId: checkoutIntent.id,
          panelId: checkoutIntent.panel_id,
          testIds: checkoutIntent.test_ids,
          state: checkoutIntent.state,
          zip: checkoutIntent.zip,
          total: checkoutIntent.amount_cents / 100,
          collectionType: checkoutIntent.collection_type,
          patient: checkoutIntent.patient_intake,
        });

        await markCheckoutIntentSubmitted({ checkoutIntentId: checkoutIntent.id, order });
      } catch (error) {
        await markCheckoutIntentProviderError({
          checkoutIntentId: checkoutIntent.id,
          errorMessage: error instanceof Error ? error.message : "Unknown provider submission error.",
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
