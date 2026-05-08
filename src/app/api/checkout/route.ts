import { NextResponse } from "next/server";
import { attachStripeSessionToCheckoutIntent, createCheckoutIntent } from "@/lib/checkout-intents";
import { getProviderAdapter } from "@/lib/provider";
import { isJunctionSandbox } from "@/lib/providers/junction";
import { hasStripeConfig, getStripe } from "@/lib/stripe";
import { hasSupabaseServiceConfig } from "@/lib/supabase";
import type { LabPatientIntake } from "@/lib/types";

function getPatientIntake(formData: FormData, fallback: { state: string; zip: string }): LabPatientIntake {
  const value = (key: string) => String(formData.get(key) ?? "").trim();
  const gender = value("gender").toLowerCase();

  return {
    firstName: value("firstName"),
    lastName: value("lastName"),
    email: value("email"),
    phone: value("phone"),
    dob: value("dob"),
    gender: gender === "female" ? "female" : gender === "male" ? "male" : undefined,
    addressLine1: value("addressLine1"),
    addressLine2: value("addressLine2"),
    city: value("city"),
    state: fallback.state,
    zip: fallback.zip,
  };
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const panelId = String(formData.get("panelId") ?? "complete-wellness");
  const testIds = String(formData.get("testIds") ?? "")
    .split(",")
    .map((testId) => testId.trim())
    .filter(Boolean);
  const state = String(formData.get("state") ?? "");
  const zip = String(formData.get("zip") ?? "");
  const collectionType = String(formData.get("collectionType") ?? "walk_in");
  const provider = getProviderAdapter();
  const quote = await provider.quoteOrder({
    panelId,
    testIds,
    state,
    zip,
    collectionType: collectionType === "mobile" || collectionType === "kit" ? collectionType : "walk_in",
  });

  if (!quote.available) {
    return NextResponse.json({ error: quote.unavailableReason ?? quote.customerMessage, quote }, { status: 400 });
  }

  if (process.env.LAB_PROVIDER === "junction" && hasStripeConfig() && !hasSupabaseServiceConfig()) {
    return NextResponse.json(
      {
        error:
          "Live lab orders need SUPABASE_SERVICE_ROLE_KEY so the webhook can submit the provider order after payment without exposing patient intake to Stripe.",
      },
      { status: 500 },
    );
  }

  const patient = getPatientIntake(formData, { state: quote.state, zip: quote.zip });
  const checkoutIntentId = await createCheckoutIntent({ quote, patient });

  const forceMockCheckout =
    process.env.LAB_PROVIDER === "junction" &&
    isJunctionSandbox() &&
    process.env.LAB_PROVIDER_SANDBOX_CHECKOUT !== "enabled";

  if (!hasStripeConfig() || forceMockCheckout) {
    return NextResponse.redirect(
      new URL(
        `/checkout?mock=1&panel=${panelId}&quote=${quote.id}&partner=${quote.partnerId}&location=${quote.selectedLocation?.id}&mode=${quote.orderMode}&checkout=${checkoutIntentId ?? ""}`,
        request.url,
      ),
      303,
    );
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: new URL("/orders?paid=1", request.url).toString(),
    cancel_url: new URL("/cart", request.url).toString(),
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.max(quote.total, 1) * 100,
          product_data: {
            name: panelId === "custom" ? "Custom blood work panel" : `Lab panel: ${panelId}`,
          },
        },
      },
    ],
    metadata: {
      panelId,
      state: quote.state,
      zip: quote.zip,
      quoteId: quote.id,
      orderMode: quote.orderMode,
      partnerId: quote.partnerId ?? "",
      routeId: quote.routeId ?? "",
      locationId: quote.selectedLocation?.id ?? "",
      checkoutIntentId: checkoutIntentId ?? "",
      paymentModel: "cash_pay_only",
    },
  });

  if (checkoutIntentId) {
    await attachStripeSessionToCheckoutIntent({
      checkoutIntentId,
      stripeSessionId: session.id,
      paymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
    });
  }

  return NextResponse.redirect(session.url ?? new URL("/checkout", request.url), 303);
}
