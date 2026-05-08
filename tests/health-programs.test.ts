import { describe, expect, it } from "vitest";
import { panels } from "@/data/catalog";
import { healthPrograms, membershipConcepts, scaleBenchmarks } from "@/data/health-programs";

describe("health program model", () => {
  it("anchors every program to a real panel", () => {
    const panelIds = new Set(panels.map((panel) => panel.id));

    expect(healthPrograms.length).toBeGreaterThanOrEqual(6);
    expect(healthPrograms.every((program) => panelIds.has(program.primaryPanelId))).toBe(true);
  });

  it("keeps prescription-like expansion behind future clinical tracks", () => {
    const weightProgram = healthPrograms.find((program) => program.id === "weight-metabolic");

    expect(weightProgram?.stage).toBe("next_subscription");
    expect(weightProgram?.safeguards.join(" ")).toContain("No prescription workflow");
  });

  it("models recurring membership without live pricing promises", () => {
    const labPass = healthPrograms.find((program) => program.id === "membership-tracking");

    expect(labPass?.priceAnchor).toContain("not live pricing");
    expect(membershipConcepts.some((concept) => concept.id === "annual-pass")).toBe(true);
  });

  it("captures the core companies this product should learn from", () => {
    const companies = scaleBenchmarks.map((benchmark) => benchmark.company);

    expect(companies).toEqual(["Private MD Labs", "Hims & Hers", "MEDVi", "Function Health"]);
  });
});
