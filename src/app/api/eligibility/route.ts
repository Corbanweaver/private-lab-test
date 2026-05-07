import { NextResponse } from "next/server";
import { checkStateEligibility } from "@/lib/catalog";

export async function POST(request: Request) {
  const body = (await request.json()) as { state?: string };
  return NextResponse.json(checkStateEligibility(body.state ?? ""));
}
