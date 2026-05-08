import { describe, expect, it } from "vitest";
import {
  affiliationLadder,
  affiliationModelLabels,
  getImmediateAffiliationTargets,
  nationalLabAffiliationTargets,
} from "@/data/national-lab-affiliates";

describe("national lab affiliation plan", () => {
  it("starts with affiliate and white-label paths that can move now", () => {
    const immediateIds = getImmediateAffiliationTargets().map((target) => target.id);

    expect(immediateIds).toEqual(["quest-health-affiliate", "ulta-quest-white-label", "bioreference-direct-ny-nj"]);
  });

  it("keeps the Quest path honest before direct ordering is signed", () => {
    const questAffiliate = nationalLabAffiliationTargets.find((target) => target.id === "quest-health-affiliate");
    const questEnterprise = nationalLabAffiliationTargets.find((target) => target.id === "quest-health-api-scale");

    expect(questAffiliate?.model).toBe("affiliate");
    expect(questEnterprise?.timeline).toBe("After demand proof");
    expect(questAffiliate?.requirements.join(" ")).toContain("Quest Health");
  });

  it("documents every target with proof, requirements, and official sources", () => {
    expect(nationalLabAffiliationTargets.length).toBeGreaterThanOrEqual(7);
    expect(nationalLabAffiliationTargets.every((target) => target.requirements.length > 0)).toBe(true);
    expect(nationalLabAffiliationTargets.every((target) => target.proofToBring.length > 0)).toBe(true);
    expect(nationalLabAffiliationTargets.every((target) => target.sourceHref.startsWith("https://"))).toBe(true);
  });

  it("keeps the operating ladder ordered from lowest-friction to enterprise", () => {
    expect(affiliationLadder.map((item) => item.title)).toEqual([
      "Affiliate/referral first",
      "White-label/API marketplace",
      "Provider-account ordering",
      "Enterprise direct",
      "Regional and retail redundancy",
    ]);
    expect(affiliationModelLabels.enterprise_direct).toBe("Enterprise direct");
  });
});
