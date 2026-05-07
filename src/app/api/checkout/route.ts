import { NextResponse } from "next/server";
import { checkStateEligibility } from "@/lib/catalog";
import { getPreferredPartner } from "@/lib/lab-access";
import { getProviderAdapter } from "@/lib/provider";
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

  const provider = getProviderAdapter("aggregator");
  const authorization = await provider.authorizeOrder({
    userId: "checkout-user",
    panelId,
    state: eligibility.state,
    total: amount,
  });

  if (authorization.status !== "approved") {
    return NextResponse.json({ error: authorization.reason }, { status: 400 });
  }

  const partner = getPreferredPartner(eligibility.state, "aggregator");

  if (!hasStripeConfig()) {
    return NextResponse.redirect(
      new URL(`/checkout?mock=1&panel=${panelId}&auth=${authorization.id}&partner=${partner.id}`, request.url),
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
      authorizationId: authorization.id,
      partnerId: partner.id,
      paymentModel: "cash_pay_only",
    },
  });

  return NextResponse.redirect(session.url ?? new URL("/checkout", request.url), 303);
}
