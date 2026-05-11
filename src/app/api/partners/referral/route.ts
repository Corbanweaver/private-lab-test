import { NextRequest, NextResponse } from "next/server";
import { resolvePartnerReferralDestination } from "@/lib/partner-referrals";

export function GET(request: NextRequest) {
  const partnerId = request.nextUrl.searchParams.get("partner") ?? "";
  const panelId = request.nextUrl.searchParams.get("panel") ?? undefined;
  const source = request.nextUrl.searchParams.get("source") ?? undefined;
  if (process.env.PARTNER_REFERRALS_MODE !== "enabled") {
    const fallback = new URL("/partners/order", request.url);
    if (partnerId) fallback.searchParams.set("missing", partnerId);
    if (panelId) fallback.searchParams.set("panel", panelId);
    return NextResponse.redirect(fallback, 302);
  }

  const destination = resolvePartnerReferralDestination({ partnerId, panelId, source });

  if (!destination) {
    const fallback = new URL("/partners/order", request.url);
    if (partnerId) fallback.searchParams.set("missing", partnerId);
    if (panelId) fallback.searchParams.set("panel", panelId);
    return NextResponse.redirect(fallback, 302);
  }

  return NextResponse.redirect(destination, 302);
}
