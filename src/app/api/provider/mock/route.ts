import { NextResponse } from "next/server";
import { mockProvider } from "@/lib/provider";

export async function GET() {
  return NextResponse.json(await mockProvider.syncCatalog());
}

export async function POST(request: Request) {
  const body = (await request.json()) as { action?: string; zip?: string; state?: string; panelId?: string };

  if (body.action === "locations") {
    return NextResponse.json(await mockProvider.getLabLocations({ zip: body.zip ?? "80202" }));
  }

  if (body.action === "order") {
    return NextResponse.json(
      await mockProvider.createOrder({
        userId: "mock-user",
        panelId: body.panelId ?? "complete-wellness",
        state: body.state ?? "CO",
      }),
    );
  }

  return NextResponse.json({ error: "Unsupported mock provider action." }, { status: 400 });
}
