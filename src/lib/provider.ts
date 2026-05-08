import { labTests, panels } from "@/data/catalog";
import { labPartners } from "@/data/lab-partners";
import { checkStateEligibility } from "@/lib/catalog";
import { getPreferredPartner, requestClinicianAuthorization } from "@/lib/lab-access";
import { createOrderQuote, getNearestLabLocations } from "@/lib/order-router";
import type { CollectionType, LabOrderQuote, LabPartnerTier, OrderStatus, ProviderOrder } from "@/lib/types";

export type ProviderAdapter = {
  id: string;
  tier: LabPartnerTier;
  syncCatalog: () => Promise<{ tests: number; panels: number; partners: number; syncedAt: string }>;
  checkEligibility: (input: { state: string; zip?: string }) => Promise<ReturnType<typeof checkStateEligibility>>;
  authorizeOrder: (input: { userId: string; panelId: string; state: string; total: number }) => Promise<ReturnType<typeof requestClinicianAuthorization>>;
  quoteOrder: (input: {
    panelId: string;
    testIds?: string[];
    state: string;
    zip: string;
    collectionType?: CollectionType;
  }) => Promise<LabOrderQuote>;
  createOrder: (input: {
    userId: string;
    panelId: string;
    testIds?: string[];
    state: string;
    zip?: string;
    total?: number;
    collectionType?: CollectionType;
  }) => Promise<ProviderOrder>;
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
    async quoteOrder({ panelId, testIds, state, zip, collectionType }) {
      return createOrderQuote({ panelId, testIds, state, zip, collectionType });
    },
    async createOrder({ panelId, testIds, state, zip = "80202", total = 1, collectionType }) {
      const quote = createOrderQuote({ panelId, testIds, state, zip, collectionType });
      if (!quote.available) {
        throw new Error(quote.unavailableReason ?? quote.customerMessage);
      }

      const authorization = requestClinicianAuthorization({ panelId, state, total });
      if (authorization.status !== "approved") {
        throw new Error(authorization.reason);
      }

      const partner = labPartners.find((item) => item.id === quote.partnerId) ?? getPreferredPartner(state, tier);
      const location = quote.selectedLocation;

      return {
        id: `${partner.id}_${panelId}_${Date.now()}`,
        orderNumber: `PLT-${Math.floor(10000 + Math.random() * 89999)}`,
        status: "lab_order_ready",
        provider: partner.name,
        partnerId: partner.id,
        authorizationId: authorization.id,
        orderMode: quote.orderMode === "blocked" ? "provider_authorization_included" : quote.orderMode,
        locationId: location?.id ?? "nearest-lab",
        labLocationName: location?.name ?? "Partner lab location",
        requisitionUrl: "/dashboard/orders",
        appointmentUrl: `/orders?partner=${partner.id}&location=${location?.id ?? "nearest-lab"}`,
      };
    },
    async getLabLocations({ zip }) {
      return getNearestLabLocations({ zip, state: "CO" })
        .filter((location) => {
          const partner = labPartners.find((item) => item.id === location.partnerId);
          return partner?.tier === tier || tier === "aggregator";
        })
        .map((location) => ({
          id: location.id,
          name: location.name,
          distance: `${location.distanceMiles.toFixed(1)} mi`,
          address: location.address,
        }))
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
