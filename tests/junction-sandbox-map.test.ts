import { describe, expect, it } from "vitest";
import {
  junctionSandboxMappingWarnings,
  junctionSandboxTestsFromScreenshots,
  junctionScreenshotSandboxEnvValue,
  junctionScreenshotSandboxLabTestMap,
} from "@/data/junction-sandbox-map";
import { panels } from "@/data/catalog";

describe("Junction screenshot sandbox map", () => {
  it("keeps every app panel mapped for sandbox order-flow testing", () => {
    const panelIds = new Set(panels.map((panel) => panel.id));

    for (const panelId of panelIds) {
      expect(junctionScreenshotSandboxLabTestMap).toHaveProperty(panelId);
    }
  });

  it("preserves leading zero provider IDs as strings", () => {
    expect(junctionScreenshotSandboxLabTestMap.ferritin).toBe("004598");
    expect(junctionSandboxTestsFromScreenshots.some((test) => test.id === "004598")).toBe(true);
  });

  it("documents ambiguous and sandbox-only mapping risk", () => {
    expect(junctionSandboxMappingWarnings.join(" ")).toContain("Sandbox only");
    expect(junctionSandboxMappingWarnings.join(" ")).toContain("7325");
  });

  it("exports a compact env value for JUNCTION_LAB_TEST_MAP", () => {
    const parsed = JSON.parse(junctionScreenshotSandboxEnvValue) as typeof junctionScreenshotSandboxLabTestMap;

    expect(parsed["heart-metabolic"]).toEqual(["803570", "7116"]);
    expect(parsed["hormone-baseline"]).toEqual(["804466", "7325"]);
  });
});
