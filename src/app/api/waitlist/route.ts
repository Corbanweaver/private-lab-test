import { NextResponse } from "next/server";
import { buildGrowthEvent, postGrowthEvent } from "@/lib/growth-events";
import { notifyWaitlistLead, storeWaitlistLead, validateWaitlistLead } from "@/lib/waitlist";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const validation = validateWaitlistLead(body);

  if (!validation.ok) {
    return NextResponse.json({ accepted: false, error: validation.error }, { status: 400 });
  }

  const lead = validation.lead;
  const [storage, notification, analytics] = await Promise.all([
    storeWaitlistLead(lead),
    notifyWaitlistLead(lead),
    postGrowthEvent(
      buildGrowthEvent({
        event: "waitlist_joined",
        anonymousId: "anonymous",
        properties: {
          panel_id: lead.panelId ?? "unknown",
          state: lead.state ?? "unknown",
          source: lead.source,
          interest: lead.interest ?? "unknown",
        },
      }),
    ),
  ]);

  const captured = storage.stored || notification.sent;

  return NextResponse.json(
    {
      accepted: captured,
      storage,
      notification,
      analytics,
      message: captured
        ? "You are on the waitlist."
        : "Waitlist capture is not configured yet. Please try again later.",
    },
    { status: captured ? 202 : 503 },
  );
}
