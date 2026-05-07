import { NextResponse } from "next/server";
import { checkStateEligibility } from "@/lib/catalog";
import { hasStripeConfig, getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const formData = await request.formData();
  const panelId = String(formData.get("panelId") ?? "complete-wellness");
  const amount = Number(formData.get("amount") ?? 0);
  const state = String(formData.get("state") ?? "");
  const eligibility = checkStateEligibility(state);

  if (!eligibility.eligible) {
    return NextResponse.json({ error: eligibility.message }, { status: 400 });
  }

  if (!hasStripeConfig()) {
    return NextResponse.redirect(new URL(`/checkout?mock=1&panel=${panelId}`, request.url), 303);
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
          unit_amount: Math.max(amount, 1) * 100,
          product_data: {
            name: panelId === "custom" ? "Custom blood work panel" : `Lab panel: ${panelId}`,
          },
        },
      },
    ],
    metadata: {
      panelId,
      state: eligibility.state,
    },
  });

  return NextResponse.redirect(session.url ?? new URL("/checkout", request.url), 303);
}
