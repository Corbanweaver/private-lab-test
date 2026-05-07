import { labTests, panels } from "@/data/catalog";
import { labPartners } from "@/data/lab-partners";
import { checkStateEligibility } from "@/lib/catalog";
import { getPreferredPartner, requestClinicianAuthorization } from "@/lib/lab-access";
import type { LabPartnerTier, OrderStatus, ProviderOrder } from "@/lib/types";

export type ProviderAdapter = {
  id: string;
  tier: LabPartnerTier;
  syncCatalog: () => Promise<{ tests: number; panels: number; partners: number; syncedAt: string }>;
  checkEligibility: (input: { state: string; zip?: string }) => Promise<ReturnType<typeof checkStateEligibility>>;
  authorizeOrder: (input: { userId: string; panelId: string; state: string; total: number }) => Promise<ReturnType<typeof requestClinicianAuthorization>>;
  createOrder: (input: { userId: string; panelId: string; state: string; zip?: string; total?: number }) => Promise<ProviderOrder>;
  getLabLocations: (input: { zip: string }) => Promise<Array<{ id: string; name: string; distance: string; address: string }>>;
  getRequisition: (orderId: string) => Promise<{ orderId: string; url: string; expiresAt: string }>;
  ingestResults: (orderId: string) => Promise<{ orderId: string; status: OrderStatus; receivedAt: string }>;
  getOrderStatus: (orderId: string) => Promise<{ orderId: string; status: OrderStatus }>;
};

function createPartnerAdapter(tier: LabPartnerTier): ProviderAdapter {
  return {
    id: `${tier}-provider`,
    tier,
    async syncCatalog() {
      const activePartners = labPartners.filter((partner) => partner.tier === tier || tier === "aggregator");
      return {
        tests: labTests.length,
        panels: panels.length,
        syncedAt: new Date().toISOString(),
        partners: activePartners.length,
      };
    },
    async checkEligibility({ state }) {
      return checkStateEligibility(state);
    },
    async authorizeOrder({ panelId, state, total, userId }) {
      return requestClinicianAuthorization({ panelId, state, total, userId });
    },
    async createOrder({ panelId, state, zip = "80202", total = 1 }) {
      const eligibility = checkStateEligibility(state);
      if (!eligibility.eligible) {
        throw new Error(eligibility.message);
      }

      const authorization = requestClinicianAuthorization({ panelId, state, total });
      if (authorization.status !== "approved") {
        throw new Error(authorization.reason);
      }

      const partner = getPreferredPartner(state, tier);
      const location =
        partner.drawLocations.find((drawLocation) => drawLocation.zip === zip) ??
        partner.drawLocations.find((drawLocation) => drawLocation.state === eligibility.state) ??
        partner.drawLocations[0];

      return {
        id: `${partner.id}_${panelId}_${Date.now()}`,
        orderNumber: `PLT-${Math.floor(10000 + Math.random() * 89999)}`,
        status: "lab_order_ready",
        provider: partner.name,
        partnerId: partner.id,
        authorizationId: authorization.id,
        labLocationName: location?.name ?? "Partner lab location",
        requisitionUrl: "/dashboard/orders",
        appointmentUrl: `/orders?partner=${partner.id}`,
      };
    },
    async getLabLocations({ zip }) {
      return labPartners
        .filter((partner) => partner.tier === tier || tier === "aggregator")
        .flatMap((partner) =>
          partner.drawLocations.map((location, index) => ({
            id: location.id,
            name: location.name,
            distance: `${(index + 1) * 1.7} mi`,
            address: location.zip === zip ? location.address : `${location.address} (${partner.name})`,
          })),
        )
        .slice(0, 4);
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
}

export const providerAdapters: Record<LabPartnerTier, ProviderAdapter> = {
  aggregator: createPartnerAdapter("aggregator"),
  regional: createPartnerAdapter("regional"),
  mobile: createPartnerAdapter("mobile"),
  national: createPartnerAdapter("national"),
};

export function getProviderAdapter(tier: LabPartnerTier = "aggregator") {
  return providerAdapters[tier];
}

export const mockProvider = providerAdapters.aggregator;
