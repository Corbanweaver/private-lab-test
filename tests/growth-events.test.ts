import { describe, expect, it } from "vitest";
import {
  buildGrowthEvent,
  getPostHogConfig,
  isGrowthEventName,
  sanitizeGrowthProperties,
} from "@/lib/growth-events";

describe("growth event privacy", () => {
  it("accepts only known event names", () => {
    expect(isGrowthEventName("zip_checked")).toBe(true);
    expect(isGrowthEventName("result_value_uploaded")).toBe(false);
  });

  it("strips sensitive and unapproved fields before analytics delivery", () => {
    const sanitized = sanitizeGrowthProperties("zip_checked", {
      state: "CO",
      available: true,
      zip: "80202",
      email: "jane@example.com",
      biomarker: "LDL",
      source: "cart",
      unknown: "drop this",
    });

    expect(sanitized).toEqual({
      state: "CO",
      available: true,
      source: "cart",
    });
  });

  it("builds a non-PHI event envelope", () => {
    const payload = buildGrowthEvent({
      event: "checkout_started",
      anonymousId: "anon-1",
      properties: {
        panel_id: "complete-wellness",
        state: "CO",
        phone: "303-555-1212",
      },
    });

    expect(payload.distinctId).toBe("anon-1");
    expect(payload.properties).toEqual({
      panel_id: "complete-wellness",
      state: "CO",
      app: "private-lab-test",
    });
  });

  it("does not forward obvious PII as the analytics identifier", () => {
    const payload = buildGrowthEvent({
      event: "catalog_search",
      userId: "jane@example.com",
      anonymousId: "303-555-1212",
      properties: { query_length: 5 },
    });

    expect(payload.distinctId).toBe("anonymous");
  });

  it("defaults PostHog to disabled without an API key", () => {
    const config = getPostHogConfig({});

    expect(config.configured).toBe(false);
    expect(config.host).toBe("https://us.i.posthog.com");
  });
});
