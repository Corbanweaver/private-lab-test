import { describe, expect, it } from "vitest";
import { labTests } from "@/data/catalog";
import { commonLabDemand, networkExpansionPlays, productResearchSources, trustDrivers } from "@/data/product-research";

describe("product research model", () => {
  it("keeps common-demand tests mapped to real catalog items", () => {
    const catalogIds = new Set(labTests.map((test) => test.id));

    expect(commonLabDemand.length).toBeGreaterThanOrEqual(6);
    expect(commonLabDemand.every((item) => catalogIds.has(item.testId))).toBe(true);
  });

  it("prioritizes the core low-cost wellness markers", () => {
    const topFive = commonLabDemand.slice(0, 5).map((item) => item.testId);

    expect(topFive).toEqual(["cmp", "cbc", "lipids", "a1c", "tsh"]);
  });

  it("keeps immediate network work focused on real ordering coverage", () => {
    const nowPlays = networkExpansionPlays.filter((play) => play.priority === "Now");

    expect(nowPlays.map((play) => play.id)).toEqual(["junction-production-menu", "ordrs-backup", "getlabs-mobile"]);
  });

  it("tracks source-backed trust and privacy decisions", () => {
    expect(trustDrivers.some((driver) => driver.id === "privacy")).toBe(true);
    expect(productResearchSources.length).toBeGreaterThanOrEqual(8);
  });
});
