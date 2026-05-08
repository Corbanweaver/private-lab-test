import { NextResponse } from "next/server";
import { checkStateEligibility } from "@/lib/catalog";
import { createOrderQuote } from "@/lib/order-router";

export async function POST(request: Request) {
  const body = (await request.json()) as { state?: string; zip?: string; panelId?: string };
  const eligibility = checkStateEligibility(body.state ?? "");

  if (body.zip) {
    const quote = createOrderQuote({
      panelId: body.panelId ?? "complete-wellness",
      state: body.state ?? "",
      zip: body.zip,
    });

    return NextResponse.json({ ...eligibility, quote });
  }

  return NextResponse.json(eligibility);
}
