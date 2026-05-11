import { afterEach, describe, expect, it } from "vitest";
import {
  getConfiguredOrderingPartners,
  getOrderingPartnerRuntimes,
  resolvePartnerReferralDestination,
} from "@/lib/partner-referrals";

const envKeys = [
  "ULTA_PARTNER_STATUS",
  "ULTA_AFFILIATE_URL",
  "ULTA_PANEL_URL_MAP",
  "QUEST_PARTNER_STATUS",
  "QUEST_AFFILIATE_URL",
  "QUEST_PANEL_URL_MAP",
] as const;

const originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));

afterEach(() => {
  for (const key of envKeys) {
    const original = originalEnv[key];
    if (original === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = original;
    }
  }
});

describe("partner referral routing", () => {
  it("keeps Ulta approved but disabled until a tracked URL is configured", () => {
    delete process.env.ULTA_AFFILIATE_URL;
    delete process.env.ULTA_PANEL_URL_MAP;

    const ulta = getOrderingPartnerRuntimes("complete-wellness").find((partner) => partner.id === "ulta-lab-tests");

    expect(ulta?.approvalStatus).toBe("approved");
    expect(ulta?.configured).toBe(false);
    expect(ulta?.enabled).toBe(false);
  });

  it("routes Ulta through the configured affiliate URL with non-PHI tracking params", () => {
    process.env.ULTA_AFFILIATE_URL = "https://example.com/ulta?affiliate=plt";

    const [ulta] = getConfiguredOrderingPartners("complete-wellness");
    const destination = resolvePartnerReferralDestination({
      partnerId: "ulta-lab-tests",
      panelId: "complete-wellness",
      source: "cart",
    });

    expect(ulta.id).toBe("ulta-lab-tests");
    expect(destination).toContain("affiliate=plt");
    expect(destination).toContain("utm_source=privatelabtest");
    expect(destination).toContain("plt_panel=complete-wellness");
  });

  it("lets Quest run next to Ulta only after Quest is approved", () => {
    process.env.ULTA_AFFILIATE_URL = "https://example.com/ulta";
    process.env.QUEST_AFFILIATE_URL = "https://example.com/quest";

    expect(getConfiguredOrderingPartners("complete-wellness").map((partner) => partner.id)).toEqual([
      "ulta-lab-tests",
    ]);

    process.env.QUEST_PARTNER_STATUS = "approved";

    expect(getConfiguredOrderingPartners("complete-wellness").map((partner) => partner.id)).toEqual([
      "ulta-lab-tests",
      "quest-health",
    ]);
  });

  it("uses panel-specific partner URLs when they are configured", () => {
    process.env.ULTA_AFFILIATE_URL = "https://example.com/ulta";
    process.env.ULTA_PANEL_URL_MAP = JSON.stringify({
      "heart-metabolic": "https://example.com/ulta/heart",
    });

    const destination = resolvePartnerReferralDestination({
      partnerId: "ulta-lab-tests",
      panelId: "heart-metabolic",
      source: "programs",
    });

    expect(destination?.startsWith("https://example.com/ulta/heart?")).toBe(true);
    expect(destination).toContain("utm_content=programs");
  });
});
