import { describe, expect, it } from "vitest";
import {
  aiGrowthSprints,
  aiGrowthStackTools,
  aiOperatingPrinciples,
  getAiGrowthToolReadiness,
  getPriorityAiGrowthTools,
} from "@/data/ai-growth-stack";

describe("ai growth stack plan", () => {
  it("prioritizes the tools that make the lab product scale", () => {
    const priorityIds = getPriorityAiGrowthTools().map((tool) => tool.id);

    expect(priorityIds).toEqual([
      "openai-concierge",
      "posthog-product-os",
      "customerio-lifecycle",
      "twilio-messaging",
      "clay-apollo-lab-acquisition",
      "vanta-drata-compliance",
      "v0-cursor-figma-ui",
    ]);
  });

  it("keeps live AI behind explicit healthcare privacy gating", () => {
    const openai = aiGrowthStackTools.find((tool) => tool.id === "openai-concierge");

    expect(openai?.stage).toBe("needs_baa");
    expect(openai?.envVars).toContain("OPENAI_HEALTHCARE_BAA_ACK");
    expect(openai?.guardrails.join(" ")).toContain("No diagnosis");
  });

  it("builds from instrumentation to concierge to lifecycle and compliance", () => {
    expect(aiGrowthSprints.map((sprint) => sprint.id)).toEqual([
      "instrument-first-funnel",
      "concierge-mvp",
      "lifecycle-engine",
      "lab-acquisition-machine",
      "trust-readiness",
    ]);
    expect(aiOperatingPrinciples.some((principle) => principle.id === "phi-minimization")).toBe(true);
  });

  it("reports env readiness without exposing secret values", () => {
    const readiness = getAiGrowthToolReadiness({
      OPENAI_API_KEY: "set",
      OPENAI_MODEL: "set",
      AI_CONCIERGE_MODE: "live",
      OPENAI_HEALTHCARE_BAA_ACK: undefined,
    });
    const openai = readiness.find((tool) => tool.id === "openai-concierge");

    expect(openai?.ready).toBe(false);
    expect(openai?.configured).toBe(3);
    expect(openai?.missing).toEqual(["OPENAI_HEALTHCARE_BAA_ACK"]);
  });
});
