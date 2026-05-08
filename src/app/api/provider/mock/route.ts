import { NextResponse } from "next/server";
import { getProviderAdapter } from "@/lib/provider";
import type { CollectionType, LabPartnerTier } from "@/lib/types";

function getTier(value: unknown): LabPartnerTier {
  return value === "regional" || value === "mobile" || value === "national" ? value : "aggregator";
}

function getCollectionType(value: unknown): CollectionType {
  return value === "mobile" || value === "kit" ? value : "walk_in";
}

export async function GET() {
  return NextResponse.json(await getProviderAdapter("aggregator").syncCatalog());
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    action?: string;
    zip?: string;
    state?: string;
    panelId?: string;
    testIds?: string[];
    tier?: LabPartnerTier;
    total?: number;
    collectionType?: CollectionType;
  };
  const provider = getProviderAdapter(getTier(body.tier));

  if (body.action === "locations") {
    return NextResponse.json(await provider.getLabLocations({ zip: body.zip ?? "80202" }));
  }

  if (body.action === "authorize") {
    return NextResponse.json(
      await provider.authorizeOrder({
        userId: "mock-user",
        panelId: body.panelId ?? "complete-wellness",
        state: body.state ?? "CO",
        total: body.total ?? 1,
      }),
    );
  }

  if (body.action === "quote") {
    return NextResponse.json(
      await provider.quoteOrder({
        panelId: body.panelId ?? "complete-wellness",
        testIds: body.testIds,
        state: body.state ?? "CO",
        zip: body.zip ?? "80202",
        collectionType: getCollectionType(body.collectionType),
      }),
    );
  }

  if (body.action === "order") {
    return NextResponse.json(
      await provider.createOrder({
        userId: "mock-user",
        panelId: body.panelId ?? "complete-wellness",
        testIds: body.testIds,
        state: body.state ?? "CO",
        zip: body.zip,
        total: body.total,
        collectionType: getCollectionType(body.collectionType),
      }),
    );
  }

  return NextResponse.json({ error: "Unsupported mock provider action." }, { status: 400 });
}
