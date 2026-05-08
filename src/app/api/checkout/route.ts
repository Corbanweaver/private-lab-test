import { NextResponse } from "next/server";
import { createOrderQuote } from "@/lib/order-router";
import { hasStripeConfig, getStripe } from "@/lib/stripe";

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
  const quote = createOrderQuote({
    panelId,
    testIds,
    state,
    zip,
    collectionType: collectionType === "mobile" || collectionType === "kit" ? collectionType : "walk_in",
  });

  if (!quote.available) {
    return NextResponse.json({ error: quote.unavailableReason ?? quote.customerMessage, quote }, { status: 400 });
  }

  if (!hasStripeConfig()) {
    return NextResponse.redirect(
      new URL(
        `/checkout?mock=1&panel=${panelId}&quote=${quote.id}&partner=${quote.partnerId}&location=${quote.selectedLocation?.id}&mode=${quote.orderMode}`,
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
      paymentModel: "cash_pay_only",
    },
  });

  return NextResponse.redirect(session.url ?? new URL("/checkout", request.url), 303);
}
