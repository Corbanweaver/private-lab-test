import { NextResponse } from "next/server";
import {
  buildResendTestEmail,
  EmailConfigError,
  EmailSendError,
  getResendConfigStatus,
  resolveEmailTestRecipient,
  sendResendEmail,
} from "@/lib/email";

export async function GET() {
  return NextResponse.json(getResendConfigStatus());
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { to?: unknown };
  const requestedRecipient = typeof body.to === "string" ? body.to : undefined;
  const recipient = resolveEmailTestRecipient(requestedRecipient);
  const template = buildResendTestEmail(recipient);

  try {
    const delivery = await sendResendEmail(template);
    return NextResponse.json(
      {
        sent: true,
        to: recipient,
        delivery,
      },
      { status: 202 },
    );
  } catch (error) {
    if (error instanceof EmailConfigError) {
      return NextResponse.json({ sent: false, error: error.message, config: getResendConfigStatus() }, { status: 503 });
    }

    if (error instanceof EmailSendError) {
      return NextResponse.json({ sent: false, error: error.message, status: error.status }, { status: 502 });
    }

    return NextResponse.json({ sent: false, error: "Unknown email delivery error." }, { status: 500 });
  }
}
