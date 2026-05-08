import { describe, expect, it } from "vitest";
import { createOrderQuote } from "@/lib/order-router";
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
      mockProvider.createOrder({ userId: "user-1", panelId: "complete-wellness", state: "AZ" }),
    ).rejects.toThrow(/Arizona|available/i);
  });

  it("quotes nearest clinics without customer review steps", () => {
    const quote = createOrderQuote({
      panelId: "complete-wellness",
      state: "CO",
      zip: "80202",
    });

    expect(quote.available).toBe(true);
    expect(quote.selectedLocation?.state).toBe("CO");
    expect(quote.authorizationIncluded).toBe(true);
    expect(quote.customerMessage).toMatch(/No doctor visit/i);
  });

  it("supports NY through a provider-authorization network route", () => {
    const quote = createOrderQuote({
      panelId: "essential-wellness",
      state: "NY",
      zip: "10018",
    });

    expect(quote.available).toBe(true);
    expect(quote.orderMode).toBe("provider_authorization_included");
    expect(quote.selectedLocation?.state).toBe("NY");
  });

  it("keeps mobile collection type through order creation", async () => {
    const order = await mockProvider.createOrder({
      userId: "user-1",
      panelId: "essential-wellness",
      state: "CO",
      zip: "80202",
      collectionType: "mobile",
      total: 210,
    });

    expect(order.locationId).toBe("denver-mobile-draw");
    expect(order.labLocationName).toContain("Mobile Blood Draw");
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
    expect(order.orderMode).toBe("provider_authorization_included");
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
