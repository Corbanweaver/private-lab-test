import { describe, expect, it } from "vitest";
import {
  calculateCustomPanelPrice,
  calculatePanelRetail,
  checkStateEligibility,
  recommendPanels,
} from "@/lib/catalog";

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
});

describe("panel recommendations", () => {
  it("ranks matching goals first", () => {
    const [first] = recommendPanels(["energy"]);
    expect(first.id).toBe("energy-check");
  });
});
