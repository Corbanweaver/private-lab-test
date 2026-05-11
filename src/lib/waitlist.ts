import { isEmailAddress, sendResendEmail, type ResendEmailResult } from "@/lib/email";
import { createSupabaseServiceClient, hasSupabaseServiceConfig } from "@/lib/supabase";

export type WaitlistLead = {
  email: string;
  firstName?: string;
  zip?: string;
  state?: string;
  panelId?: string;
  interest?: string;
  source: string;
};

export type WaitlistValidationResult =
  | { ok: true; lead: WaitlistLead }
  | { ok: false; error: string };

export type WaitlistStorageResult = {
  stored: boolean;
  destination: "supabase" | "none";
  reason?: string;
};

export type WaitlistNotificationResult =
  | { sent: true; delivery: ResendEmailResult }
  | { sent: false; reason: string };

const maxTextLength = 120;

function cleanText(value: unknown, maxLength = maxTextLength) {
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim().replace(/\s+/g, " ");
  return cleaned ? cleaned.slice(0, maxLength) : undefined;
}

function normalizeZip(value: unknown) {
  if (typeof value !== "string") return undefined;
  const digits = value.replace(/\D/g, "").slice(0, 5);
  return digits.length === 5 ? digits : undefined;
}

function normalizeState(value: unknown) {
  const cleaned = cleanText(value, 2)?.toUpperCase();
  return cleaned && /^[A-Z]{2}$/.test(cleaned) ? cleaned : undefined;
}

export function validateWaitlistLead(input: Record<string, unknown> | null | undefined): WaitlistValidationResult {
  const email = cleanText(input?.email, 254)?.toLowerCase();

  if (!email || !isEmailAddress(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  return {
    ok: true,
    lead: {
      email,
      firstName: cleanText(input?.firstName, 80),
      zip: normalizeZip(input?.zip),
      state: normalizeState(input?.state),
      panelId: cleanText(input?.panelId, 80),
      interest: cleanText(input?.interest, 140),
      source: cleanText(input?.source, 80) ?? "site",
    },
  };
}

export function getWaitlistNotifyRecipient(env: Record<string, string | undefined> = process.env) {
  const recipient = cleanText(env.WAITLIST_NOTIFY_TO, 254);
  return recipient && isEmailAddress(recipient) ? recipient : undefined;
}

export function buildWaitlistNotificationEmail(lead: WaitlistLead, to: string) {
  const location = [lead.state, lead.zip].filter(Boolean).join(" ");
  const rows = [
    ["Email", lead.email],
    ["First name", lead.firstName],
    ["Panel", lead.panelId],
    ["Interest", lead.interest],
    ["Location", location || undefined],
    ["Source", lead.source],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;color:#5f6b66;border-bottom:1px solid #e5ebe8;">${label}</td>
          <td style="padding:8px 12px;color:#101615;border-bottom:1px solid #e5ebe8;font-weight:600;">${value}</td>
        </tr>
      `,
    )
    .join("");

  return {
    to,
    subject: "New Private Lab Test waitlist signup",
    text: `New Private Lab Test waitlist signup\n\n${text}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:24px;color:#101615;">
        <p style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#147267;font-weight:700;">Private Lab Test</p>
        <h1 style="font-size:24px;line-height:1.25;margin:0 0 12px;">New waitlist signup</h1>
        <p style="font-size:15px;line-height:1.6;color:#5f6b66;margin:0 0 18px;">This is a launch-interest lead. No DOB, address, symptoms, or lab results were collected.</p>
        <table style="width:100%;border-collapse:collapse;background:#f8faf7;border:1px solid #e5ebe8;border-radius:8px;overflow:hidden;">
          ${htmlRows}
        </table>
      </div>
    `,
    idempotencyKey: `private-lab-test-waitlist-${lead.email}-${new Date().toISOString().slice(0, 10)}`,
  };
}

export async function storeWaitlistLead(lead: WaitlistLead): Promise<WaitlistStorageResult> {
  if (!hasSupabaseServiceConfig()) {
    return {
      stored: false,
      destination: "none",
      reason: "Supabase service config is not available.",
    };
  }

  try {
    const supabase = createSupabaseServiceClient();
    const { error } = await supabase.from("waitlist_leads").upsert(
      {
        email: lead.email,
        first_name: lead.firstName ?? null,
        zip: lead.zip ?? null,
        state: lead.state ?? null,
        panel_id: lead.panelId ?? null,
        interest: lead.interest ?? null,
        source: lead.source,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email" },
    );

    if (error) {
      return { stored: false, destination: "supabase", reason: error.message };
    }

    return { stored: true, destination: "supabase" };
  } catch (error) {
    return {
      stored: false,
      destination: "supabase",
      reason: error instanceof Error ? error.message : "Unknown Supabase waitlist error.",
    };
  }
}

export async function notifyWaitlistLead(lead: WaitlistLead): Promise<WaitlistNotificationResult> {
  const recipient = getWaitlistNotifyRecipient();

  if (!recipient) {
    return { sent: false, reason: "WAITLIST_NOTIFY_TO is not configured." };
  }

  try {
    const template = buildWaitlistNotificationEmail(lead, recipient);
    const delivery = await sendResendEmail(template);
    return { sent: true, delivery };
  } catch (error) {
    return {
      sent: false,
      reason: error instanceof Error ? error.message : "Unknown waitlist notification error.",
    };
  }
}
