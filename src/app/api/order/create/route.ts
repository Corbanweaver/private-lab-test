import { NextResponse } from "next/server";
import { createOrderQuote } from "@/lib/order-router";
import { getProviderAdapter } from "@/lib/provider";
import type { CollectionType } from "@/lib/types";

function getCollectionType(value: unknown): CollectionType {
  return value === "mobile" || value === "kit" ? value : "walk_in";
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    panelId?: string;
    testIds?: string[];
    state?: string;
    zip?: string;
    collectionType?: CollectionType;
    userId?: string;
  };

  const quote = createOrderQuote({
    panelId: body.panelId,
    testIds: body.testIds,
    state: body.state ?? "",
    zip: body.zip ?? "",
    collectionType: getCollectionType(body.collectionType),
  });

  if (!quote.available) {
    return NextResponse.json({ error: quote.unavailableReason ?? quote.customerMessage, quote }, { status: 400 });
  }

  const provider = getProviderAdapter();
  const order = await provider.createOrder({
    userId: body.userId ?? "self-pay-customer",
    panelId: quote.panelId,
    testIds: quote.testIds,
    state: quote.state,
    zip: quote.zip,
    total: quote.total,
    collectionType: quote.collectionType,
  });

  return NextResponse.json({ quote, order });
}
