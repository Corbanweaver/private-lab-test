import { NextResponse } from "next/server";
import { buildGrowthEvent, isGrowthEventName, postGrowthEvent } from "@/lib/growth-events";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    event?: unknown;
    userId?: string;
    anonymousId?: string;
    properties?: Record<string, unknown>;
  } | null;

  if (!body || !isGrowthEventName(body.event)) {
    return NextResponse.json({ accepted: false, error: "Unknown growth event" }, { status: 400 });
  }

  const payload = buildGrowthEvent({
    event: body.event,
    userId: body.userId,
    anonymousId: body.anonymousId,
    properties: body.properties,
  });
  const delivery = await postGrowthEvent(payload);

  return NextResponse.json({ accepted: true, payload, delivery }, { status: 202 });
}
