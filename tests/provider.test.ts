import { describe, expect, it } from "vitest";
import { mockProvider } from "@/lib/provider";

describe("mock provider adapter", () => {
  it("syncs catalog counts", async () => {
    const result = await mockProvider.syncCatalog();
    expect(result.tests).toBeGreaterThan(0);
    expect(result.panels).toBeGreaterThan(0);
  });

  it("rejects blocked state orders", async () => {
    await expect(
      mockProvider.createOrder({ userId: "user-1", panelId: "complete-wellness", state: "NY" }),
    ).rejects.toThrow(/not available/i);
  });
});
