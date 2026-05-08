import { NextResponse } from "next/server";
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
  };

  const provider = getProviderAdapter();
  const quote = await provider.quoteOrder({
    panelId: body.panelId ?? "complete-wellness",
    testIds: body.testIds,
    state: body.state ?? "",
    zip: body.zip ?? "",
    collectionType: getCollectionType(body.collectionType),
  });

  return NextResponse.json(quote, { status: quote.available ? 200 : 400 });
}
