import { NextResponse } from "next/server";
import { generateAiConciergeResponse } from "@/lib/ai-concierge";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { message?: unknown; goals?: unknown } | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message : "";
  const goals = Array.isArray(body.goals) ? body.goals.filter((goal): goal is string => typeof goal === "string") : [];

  if (message.length > 2000) {
    return NextResponse.json({ error: "Message is too long" }, { status: 400 });
  }

  const result = await generateAiConciergeResponse({ message, goals });

  return NextResponse.json(result);
}
