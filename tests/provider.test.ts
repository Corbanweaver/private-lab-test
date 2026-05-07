import { describe, expect, it } from "vitest";
import { getProviderAdapter, mockProvider } from "@/lib/provider";

describe("mock provider adapter", () => {
  it("syncs catalog counts", async () => {
    const result = await mockProvider.syncCatalog();
    expect(result.tests).toBeGreaterThan(0);
    expect(result.panels).toBeGreaterThan(0);
    expect(result.partners).toBeGreaterThan(0);
  });

  it("rejects blocked state orders", async () => {
    await expect(
      mockProvider.createOrder({ userId: "user-1", panelId: "complete-wellness", state: "NY" }),
    ).rejects.toThrow(/state/i);
  });

  it("authorizes and routes launch orders through the aggregator", async () => {
    const authorization = await mockProvider.authorizeOrder({
      userId: "user-1",
      panelId: "complete-wellness",
      state: "CO",
      total: 229,
    });
    const order = await mockProvider.createOrder({
      userId: "user-1",
      panelId: "complete-wellness",
      state: "CO",
      total: 229,
    });

    expect(authorization.status).toBe("approved");
    expect(order.partnerId).toBe("aggregator-api");
    expect(order.authorizationId).toContain("auth_CO");
  });

  it("can choose a regional adapter for direct partner contracts", async () => {
    const regionalProvider = getProviderAdapter("regional");
    const order = await regionalProvider.createOrder({
      userId: "user-1",
      panelId: "essential-wellness",
      state: "CO",
      total: 119,
    });

    expect(order.provider).toBe("Rocky Mountain Regional Labs");
  });
});
