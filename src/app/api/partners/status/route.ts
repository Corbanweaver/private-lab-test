import { NextResponse } from "next/server";
import { getOrderingPartnerRuntimes } from "@/lib/partner-referrals";

export function GET() {
  return NextResponse.json({
    partners: getOrderingPartnerRuntimes().map((partner) => ({
      id: partner.id,
      name: partner.name,
      approvalStatus: partner.approvalStatus,
      configured: partner.configured,
      enabled: partner.enabled,
      relationship: partner.relationship,
      missingEnv: partner.missingEnv,
      source: partner.sourceHref,
    })),
  });
}
