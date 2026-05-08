export type GrowthEventName =
  | "catalog_search"
  | "panel_viewed"
  | "zip_checked"
  | "checkout_started"
  | "checkout_completed"
  | "results_ready"
  | "retest_reminder_due"
  | "partner_outreach_sent";

export type GrowthEventPayload = {
  event: GrowthEventName;
  distinctId: string;
  properties: Record<string, string | number | boolean>;
};

export type GrowthEventInput = {
  event: GrowthEventName;
  userId?: string;
  anonymousId?: string;
  properties?: Record<string, unknown>;
};

const allowedEventProperties: Record<GrowthEventName, string[]> = {
  catalog_search: ["query_length", "category", "result_count", "source"],
  panel_viewed: ["panel_id", "panel_goal", "price", "source"],
  zip_checked: ["state", "available", "collection_type", "source"],
  checkout_started: ["panel_id", "state", "collection_type", "source"],
  checkout_completed: ["panel_id", "state", "collection_type", "total", "source"],
  results_ready: ["panel_id", "state", "source"],
  retest_reminder_due: ["program_id", "panel_id", "days_since_order", "source"],
  partner_outreach_sent: ["target_id", "category", "state_focus", "source"],
};

const sensitiveFieldPatterns = [
  /name/i,
  /email/i,
  /phone/i,
  /dob/i,
  /birth/i,
  /address/i,
  /zip/i,
  /result/i,
  /biomarker/i,
  /diagnosis/i,
  /medication/i,
  /symptom/i,
  /note/i,
  /message/i,
];

export function isGrowthEventName(value: unknown): value is GrowthEventName {
  return (
    value === "catalog_search" ||
    value === "panel_viewed" ||
    value === "zip_checked" ||
    value === "checkout_started" ||
    value === "checkout_completed" ||
    value === "results_ready" ||
    value === "retest_reminder_due" ||
    value === "partner_outreach_sent"
  );
}

function isPrimitiveEventValue(value: unknown): value is string | number | boolean {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}

function isSensitiveField(field: string) {
  return sensitiveFieldPatterns.some((pattern) => pattern.test(field));
}

function isSafeDistinctId(value: string | undefined): value is string {
  if (!value) return false;
  if (value.includes("@")) return false;
  if (value.replace(/\D/g, "").length >= 10) return false;
  return /^[a-zA-Z0-9_-]{1,80}$/.test(value);
}

function normalizeDistinctId(userId?: string, anonymousId?: string) {
  if (isSafeDistinctId(userId)) return userId;
  if (isSafeDistinctId(anonymousId)) return anonymousId;
  return "anonymous";
}

export function sanitizeGrowthProperties(event: GrowthEventName, properties: Record<string, unknown> = {}) {
  const allowed = new Set(allowedEventProperties[event]);
  const sanitized: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(properties)) {
    if (!allowed.has(key) || isSensitiveField(key) || !isPrimitiveEventValue(value)) continue;
    sanitized[key] = typeof value === "string" ? value.slice(0, 120) : value;
  }

  return sanitized;
}

export function buildGrowthEvent({ event, userId, anonymousId, properties }: GrowthEventInput): GrowthEventPayload {
  return {
    event,
    distinctId: normalizeDistinctId(userId, anonymousId),
    properties: {
      ...sanitizeGrowthProperties(event, properties),
      app: "private-lab-test",
    },
  };
}

export function getPostHogConfig(env: Record<string, string | undefined> = process.env) {
  const apiKey = env.POSTHOG_PROJECT_API_KEY;
  const host = env.POSTHOG_HOST || "https://us.i.posthog.com";

  return {
    configured: Boolean(apiKey),
    apiKey,
    host: host.replace(/\/$/, ""),
  };
}

export async function postGrowthEvent(payload: GrowthEventPayload) {
  const config = getPostHogConfig();

  if (!config.configured || !config.apiKey) {
    return {
      delivered: false,
      destination: "none",
      reason: "POSTHOG_PROJECT_API_KEY is not configured",
    };
  }

  const response = await fetch(`${config.host}/capture/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: config.apiKey,
      event: payload.event,
      distinct_id: payload.distinctId,
      properties: payload.properties,
    }),
  });

  return {
    delivered: response.ok,
    destination: "posthog",
    status: response.status,
  };
}
