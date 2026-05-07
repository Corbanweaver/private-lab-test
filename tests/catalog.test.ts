import { describe, expect, it } from "vitest";
import {
  calculateCustomPanelPrice,
  calculatePanelRetail,
  checkStateEligibility,
  recommendPanels,
} from "@/lib/catalog";
import { getLabAccessRule, requestClinicianAuthorization, summarizeLabSupply } from "@/lib/lab-access";

describe("catalog pricing", () => {
  it("totals retail prices for selected tests", () => {
    expect(calculatePanelRetail(["cmp", "cbc", "lipids"])).toBe(80);
  });

  it("applies custom panel bundle discounts", () => {
    expect(calculateCustomPanelPrice(["cmp", "cbc"])).toBe(53);
    expect(calculateCustomPanelPrice(["cmp", "cbc", "lipids"])).toBe(72);
    expect(calculateCustomPanelPrice(["cmp", "cbc", "lipids", "a1c", "tsh", "vit-d"])).toBe(153);
  });
});

describe("state eligibility", () => {
  it("blocks conservative restricted states", () => {
    expect(checkStateEligibility("NY").eligible).toBe(false);
    expect(checkStateEligibility("co").eligible).toBe(true);
  });

  it("requires clinician authorization in launch states", () => {
    const result = checkStateEligibility("FL");

    expect(result.eligible).toBe(true);
    expect(result.requiresClinicianAuthorization).toBe(true);
    expect(getLabAccessRule("FL").mode).toBe("clinician_authorized");
  });
});

describe("panel recommendations", () => {
  it("ranks matching goals first", () => {
    const [first] = recommendPanels(["energy"]);
    expect(first.id).toBe("energy-check");
  });
});

describe("lab supply model", () => {
  it("summarizes partner coverage for admin dashboards", () => {
    const summary = summarizeLabSupply();

    expect(summary.partners).toBeGreaterThanOrEqual(4);
    expect(summary.verifiedPartners).toBeGreaterThanOrEqual(2);
    expect(summary.cashMenuCount).toBeGreaterThan(0);
  });

  it("blocks clinician authorization for unsupported states", () => {
    const authorization = requestClinicianAuthorization({
      panelId: "complete-wellness",
      state: "NY",
      total: 229,
    });

    expect(authorization.status).toBe("blocked");
  });
});
