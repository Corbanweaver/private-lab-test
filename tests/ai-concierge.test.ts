import { describe, expect, it } from "vitest";
import {
  getRulesBasedConciergeResponse,
  inferConciergeGoals,
  isLiveConciergeEnabled,
  redactConciergeText,
} from "@/lib/ai-concierge";

describe("ai concierge guardrails", () => {
  it("recommends the energy panel for fatigue and thyroid questions", () => {
    const response = getRulesBasedConciergeResponse({
      message: "I feel tired and want thyroid, vitamin, B12, and iron labs.",
    });

    expect(response.mode).toBe("rules");
    expect(response.recommendedPanels[0].id).toBe("energy-check");
    expect(response.safetyNotes.join(" ")).toContain("does not diagnose");
  });

  it("routes metabolic and cholesterol intent toward the heart panel", () => {
    const goals = inferConciergeGoals({ message: "I want weight, glucose, cholesterol, and A1C labs." });
    const response = getRulesBasedConciergeResponse({ goals });

    expect(goals).toContain("heart");
    expect(response.recommendedPanels[0].id).toBe("heart-metabolic");
  });

  it("redacts obvious identifiers before live model calls", () => {
    const redacted = redactConciergeText("My email is jane@example.com, phone is 303-555-1212, DOB 1/2/1980.");

    expect(redacted).not.toContain("jane@example.com");
    expect(redacted).not.toContain("303-555-1212");
    expect(redacted).not.toContain("1/2/1980");
    expect(redacted).toContain("[email]");
  });

  it("requires BAA acknowledgement before live AI mode", () => {
    expect(
      isLiveConciergeEnabled({
        AI_CONCIERGE_MODE: "live",
        OPENAI_API_KEY: "set",
        OPENAI_MODEL: "set",
        OPENAI_HEALTHCARE_BAA_ACK: undefined,
      }),
    ).toBe(false);
    expect(
      isLiveConciergeEnabled({
        AI_CONCIERGE_MODE: "live",
        OPENAI_API_KEY: "set",
        OPENAI_MODEL: "set",
        OPENAI_HEALTHCARE_BAA_ACK: "true",
      }),
    ).toBe(true);
  });
});
