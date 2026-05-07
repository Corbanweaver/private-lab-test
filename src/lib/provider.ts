import { labTests, panels } from "@/data/catalog";
import { checkStateEligibility } from "@/lib/catalog";
import type { OrderStatus, ProviderOrder } from "@/lib/types";

export type ProviderAdapter = {
  syncCatalog: () => Promise<{ tests: number; panels: number; syncedAt: string }>;
  checkEligibility: (input: { state: string; zip?: string }) => Promise<ReturnType<typeof checkStateEligibility>>;
  createOrder: (input: { userId: string; panelId: string; state: string }) => Promise<ProviderOrder>;
  getLabLocations: (input: { zip: string }) => Promise<Array<{ id: string; name: string; distance: string; address: string }>>;
  getRequisition: (orderId: string) => Promise<{ orderId: string; url: string; expiresAt: string }>;
  ingestResults: (orderId: string) => Promise<{ orderId: string; status: OrderStatus; receivedAt: string }>;
  getOrderStatus: (orderId: string) => Promise<{ orderId: string; status: OrderStatus }>;
};

export const mockProvider: ProviderAdapter = {
  async syncCatalog() {
    return {
      tests: labTests.length,
      panels: panels.length,
      syncedAt: new Date().toISOString(),
    };
  },
  async checkEligibility({ state }) {
    return checkStateEligibility(state);
  },
  async createOrder({ panelId, state }) {
    const eligibility = checkStateEligibility(state);
    if (!eligibility.eligible) {
      throw new Error(eligibility.message);
    }

    return {
      id: `mock_${panelId}_${Date.now()}`,
      orderNumber: `PLT-${Math.floor(10000 + Math.random() * 89999)}`,
      status: "lab_order_ready",
      provider: "Mock National Lab Network",
      requisitionUrl: "/dashboard/orders",
      appointmentUrl: "https://www.questdiagnostics.com/locations/search",
    };
  },
  async getLabLocations({ zip }) {
    return [
      {
        id: "loc-1",
        name: "Mock Diagnostics Patient Center",
        distance: "1.8 mi",
        address: `${zip} Wellness Parkway`,
      },
      {
        id: "loc-2",
        name: "Partner Lab Draw Station",
        distance: "4.2 mi",
        address: `${zip} Market Street`,
      },
    ];
  },
  async getRequisition(orderId) {
    return {
      orderId,
      url: "/dashboard/orders",
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    };
  },
  async ingestResults(orderId) {
    return {
      orderId,
      status: "results_received",
      receivedAt: new Date().toISOString(),
    };
  },
  async getOrderStatus(orderId) {
    return {
      orderId,
      status: "lab_order_ready",
    };
  },
};
