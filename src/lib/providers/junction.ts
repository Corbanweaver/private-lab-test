import { labTests, panels } from "@/data/catalog";
import { createOrderQuote, getNearestLabLocations } from "@/lib/order-router";
import type { ProviderAdapter } from "@/lib/provider";
import type {
  CollectionType,
  LabLocationOption,
  LabOrderQuote,
  LabPatientIntake,
  OrderStatus,
  ProviderOrder,
} from "@/lib/types";

type JunctionCollectionMethod = "walk_in_test" | "at_home_phlebotomy" | "testkit" | "on_site_collection";

type JunctionPatientInput = LabPatientIntake;

type JunctionLab = {
  id: number;
  slug: string;
  name: string;
  collection_methods?: string[];
};

type JunctionLabTest = {
  id: string;
  name: string;
  price?: number;
  status?: string;
  is_active?: boolean;
  method?: string;
  lab?: { slug?: string; name?: string };
  markers?: Array<{ name?: string; slug?: string }>;
};

type JunctionLabTestsResponse = JunctionLabTest[] | { lab_tests?: JunctionLabTest[] };

type JunctionOrder = {
  id: string;
  status?: string;
  sample_id?: string;
  lab_test?: { name?: string };
  order_transaction?: { id?: string; status?: string };
  last_event?: { status?: string };
};

type JunctionOrderResponse = {
  order?: JunctionOrder;
  status?: string;
  message?: string;
};

type JunctionUserResponse = {
  user_id?: string;
  userId?: string;
  id?: string;
};

type JunctionPscResponse = {
  patient_service_centers?: Array<{
    metadata?: {
      name?: string;
      first_line?: string;
      second_line?: string | null;
      city?: string;
      state?: string;
      zip_code?: string;
    };
    distance?: string | number;
  }>;
};

type MappedPanel = Record<string, string | string[]>;

const defaultBaseUrl = "https://api.sandbox.us.junction.com";
const supportedLabSlugs = ["quest", "quest-diagnostics", "labcorp", "bioreference"];

export class JunctionProviderError extends Error {
  constructor(
    message: string,
    public status: number,
    public body: string,
  ) {
    super(message);
    this.name = "JunctionProviderError";
  }
}

function getJunctionBaseUrl() {
  return (process.env.JUNCTION_BASE_URL || defaultBaseUrl).replace(/\/$/, "");
}

function getJunctionApiKey() {
  return process.env.JUNCTION_API_KEY?.trim();
}

export function isJunctionConfigured() {
  return Boolean(getJunctionApiKey());
}

export function isJunctionSandbox() {
  return /sandbox|tryvital/i.test(getJunctionBaseUrl());
}

export function isLiveProviderWriteAllowed() {
  return isJunctionSandbox() || process.env.LAB_PROVIDER_ORDER_WRITES === "enabled";
}

function getIdempotencyKey(input: { userId: string; panelId: string; state: string; zip?: string }) {
  return `plt-${input.userId}-${input.panelId}-${input.state}-${input.zip ?? "nozip"}`.replace(/[^a-zA-Z0-9-_]/g, "-");
}

async function junctionFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const apiKey = getJunctionApiKey();
  if (!apiKey) {
    throw new Error("Junction is not configured. Add JUNCTION_API_KEY to enable live lab connectivity.");
  }

  const response = await fetch(`${getJunctionBaseUrl()}${path}`, {
    ...init,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-vital-api-key": apiKey,
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new JunctionProviderError(`Junction API ${response.status}: ${text || response.statusText}`, response.status, text);
  }

  return (await response.json()) as T;
}

async function junctionFetchBinary(path: string) {
  const apiKey = getJunctionApiKey();
  if (!apiKey) {
    throw new Error("Junction is not configured. Add JUNCTION_API_KEY to enable live lab connectivity.");
  }

  const response = await fetch(`${getJunctionBaseUrl()}${path}`, {
    headers: {
      accept: "application/pdf",
      "x-vital-api-key": apiKey,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new JunctionProviderError(`Junction PDF ${response.status}: ${text || response.statusText}`, response.status, text);
  }

  return response;
}

function parseLabTestMap(): MappedPanel {
  const raw = process.env.JUNCTION_LAB_TEST_MAP;
  if (!raw) return {};

  const candidates = [raw, raw.replace(/\\"/g, '"')];
  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as MappedPanel;
      }
    } catch {
      // Try the next normalizer below.
    }
  }

  try {
    const parsed = JSON.parse(JSON.parse(raw) as string) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as MappedPanel;
    }
  } catch {
    const loose = parseLooseLabTestMap(raw);
    if (loose) return loose;
    throw new Error("JUNCTION_LAB_TEST_MAP must be valid JSON.");
  }

  throw new Error("JUNCTION_LAB_TEST_MAP must be a JSON object.");
}

function parseLooseLabTestMap(raw: string): MappedPanel | null {
  const trimmed = raw.trim().replace(/^"|"$/g, "");
  if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) return null;

  const output: MappedPanel = {};
  const body = trimmed.slice(1, -1);
  const pairs = body.match(/[^,\[\]]+:\[[^\]]+\]|[^,]+:[^,]+/g) ?? [];

  for (const pair of pairs) {
    const separator = pair.indexOf(":");
    if (separator < 0) return null;

    const key = pair.slice(0, separator).trim().replace(/^["']|["']$/g, "");
    const value = pair.slice(separator + 1).trim();
    if (!key || !value) return null;

    if (value.startsWith("[") && value.endsWith("]")) {
      output[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      output[key] = value.replace(/^["']|["']$/g, "");
    }
  }

  return Object.keys(output).length ? output : null;
}

function resolveMappedLabTestIds(panelId: string, testIds: string[]) {
  const mapping = parseLabTestMap();
  const panelMapping = mapping[panelId];
  if (panelMapping) {
    return Array.isArray(panelMapping) ? panelMapping : [panelMapping];
  }

  const mapped = testIds.flatMap((testId) => {
    const value = mapping[testId];
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  });

  if (mapped.length === 0) {
    throw new Error(
      "No Junction lab test mapping found. Set JUNCTION_LAB_TEST_MAP with panel/test IDs mapped to Junction lab_test IDs.",
    );
  }

  return Array.from(new Set(mapped));
}

function mapCollectionType(collectionType: CollectionType): JunctionCollectionMethod {
  if (collectionType === "mobile") return "at_home_phlebotomy";
  if (collectionType === "kit") return "testkit";
  return "walk_in_test";
}

function normalizePhone(phone?: string) {
  const digits = phone?.replace(/\D/g, "") ?? "";
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return phone;
}

function requirePatient(input?: JunctionPatientInput, fallback?: { state: string; zip?: string }) {
  const allowPlaceholder = isJunctionSandbox() && process.env.JUNCTION_ALLOW_SANDBOX_PLACEHOLDERS === "true";
  const patient = input ?? {};

  if (allowPlaceholder) {
    return {
      firstName: patient.firstName || "Sandbox",
      lastName: patient.lastName || "Patient",
      email: patient.email || "sandbox@privatelabtest.com",
      phone: normalizePhone(patient.phone) || "+15555550100",
      dob: patient.dob || "1985-01-01",
      gender: patient.gender || "male",
      addressLine1: patient.addressLine1 || "123 Test Street",
      addressLine2: patient.addressLine2,
      city: patient.city || "Denver",
      state: patient.state || fallback?.state || "CO",
      zip: patient.zip || fallback?.zip || "80202",
    };
  }

  const missing = [
    ["firstName", patient.firstName],
    ["lastName", patient.lastName],
    ["email", patient.email],
    ["phone", patient.phone],
    ["dob", patient.dob],
    ["gender", patient.gender],
    ["addressLine1", patient.addressLine1],
    ["city", patient.city],
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) {
    throw new Error(`Live lab ordering needs these basic intake fields: ${missing.join(", ")}.`);
  }

  return {
    firstName: patient.firstName!,
    lastName: patient.lastName!,
    email: patient.email!,
    phone: normalizePhone(patient.phone)!,
    dob: patient.dob!,
    gender: patient.gender!,
    addressLine1: patient.addressLine1!,
    addressLine2: patient.addressLine2,
    city: patient.city!,
    state: patient.state || fallback?.state || "",
    zip: patient.zip || fallback?.zip || "",
  };
}

function mapJunctionStatus(status?: string): OrderStatus {
  const value = status?.toLowerCase() ?? "";
  if (value.includes("completed") || value.includes("result")) return "results_received";
  if (value.includes("collected") || value.includes("sample")) return "collected";
  if (value.includes("requisition") || value.includes("ordered") || value.includes("collecting")) return "lab_order_ready";
  if (value.includes("received")) return "submitted_to_provider";
  return "submitted_to_provider";
}

function toLocationOption(item: NonNullable<JunctionPscResponse["patient_service_centers"]>[number], index: number, zip: string): LabLocationOption {
  const metadata = item.metadata ?? {};
  const address = [metadata.first_line, metadata.second_line, metadata.city, metadata.state, metadata.zip_code]
    .filter(Boolean)
    .join(", ");

  return {
    id: `junction-psc-${metadata.zip_code ?? zip}-${index}`,
    routeId: "junction-live",
    partnerId: "junction-live",
    name: metadata.name || "Patient service center",
    address,
    state: metadata.state || "",
    zip: metadata.zip_code || zip,
    collectionType: "walk_in",
    distanceMiles: Number(item.distance ?? 0),
    drawFee: 0,
    appointmentRequired: true,
  };
}

async function getAvailableLabs() {
  return junctionFetch<JunctionLab[]>("/v3/lab_tests/labs");
}

async function getAvailableLabTests() {
  const response = await junctionFetch<JunctionLabTestsResponse>("/v3/lab_tests/?generation_method=all&status=active");
  return Array.isArray(response) ? response : response.lab_tests ?? [];
}

async function createJunctionUser(clientUserId: string) {
  const response = await junctionFetch<JunctionUserResponse>("/v2/user/", {
    method: "POST",
    body: JSON.stringify({ client_user_id: clientUserId }),
  });

  const userId = response.user_id ?? response.userId ?? response.id;
  if (!userId) {
    throw new Error("Junction user creation did not return a user id.");
  }
  return userId;
}

async function getJunctionLocations(zip: string) {
  const labs = await getAvailableLabs();
  const candidateLabs = labs.filter((lab) => supportedLabSlugs.some((slug) => lab.slug.toLowerCase().includes(slug)));
  const locations = await Promise.all(
    candidateLabs.slice(0, 4).map(async (lab) => {
      try {
        const psc = await junctionFetch<JunctionPscResponse>(
          `/v3/order/psc/info?zip_code=${encodeURIComponent(zip)}&lab_id=${lab.id}&radius=25`,
        );
        return (psc.patient_service_centers ?? []).map((item, index) => toLocationOption(item, index, zip));
      } catch {
        return [];
      }
    }),
  );

  return locations.flat().sort((a, b) => a.distanceMiles - b.distanceMiles).slice(0, 10);
}

async function createJunctionOrder(input: Parameters<ProviderAdapter["createOrder"]>[0] & { patient?: JunctionPatientInput }) {
  if (!isLiveProviderWriteAllowed()) {
    throw new Error("Live provider order writes are disabled. Enable LAB_PROVIDER_ORDER_WRITES only after payment/webhook is wired.");
  }

  const quote = createOrderQuote({
    panelId: input.panelId,
    testIds: input.testIds,
    state: input.state,
    zip: input.zip ?? "",
    collectionType: input.collectionType,
  });
  if (!quote.available) {
    throw new Error(quote.unavailableReason ?? quote.customerMessage);
  }

  const patient = requirePatient(input.patient, { state: quote.state, zip: quote.zip });
  const labTestIds = resolveMappedLabTestIds(input.panelId, quote.testIds);
  const userId = await createJunctionUser(input.userId);
  const body = {
    user_id: userId,
    patient_details: {
      first_name: patient.firstName,
      last_name: patient.lastName,
      dob: patient.dob,
      gender: patient.gender,
      phone_number: patient.phone,
      email: patient.email,
    },
    patient_address: {
      receiver_name: `${patient.firstName} ${patient.lastName}`,
      first_line: patient.addressLine1,
      second_line: patient.addressLine2 || undefined,
      city: patient.city,
      state: patient.state,
      zip: patient.zip,
      country: "US",
      phone_number: patient.phone,
    },
    order_set: {
      lab_test_ids: labTestIds,
    },
    collection_method: mapCollectionType(quote.collectionType),
    billing_type: "client_bill",
    passthrough: JSON.stringify({
      privateLabTestUserId: input.userId,
      panelId: input.panelId,
      quoteId: quote.id,
      routeId: quote.routeId,
    }),
  };

  const response = await junctionFetch<JunctionOrderResponse>("/v3/order/", {
    method: "POST",
    headers: {
      "X-Idempotency-Key": getIdempotencyKey({
        userId: input.userId,
        panelId: input.panelId,
        state: quote.state,
        zip: quote.zip,
      }),
    },
    body: JSON.stringify(body),
  });
  const order = response.order;
  if (!order?.id) {
    throw new Error(response.message || "Junction did not return an order id.");
  }

  return {
    id: order.id,
    orderNumber: order.sample_id || `JUNC-${order.id.slice(0, 8)}`,
    status: mapJunctionStatus(order.last_event?.status ?? order.status),
    provider: order.lab_test?.name || "Junction Lab Network",
    partnerId: "junction-live",
    authorizationId: `junction_${order.id}`,
    orderMode: "provider_authorization_included",
    locationId: quote.selectedLocation?.id ?? "junction-psc",
    labLocationName: quote.selectedLocation?.name ?? "Patient service center",
    requisitionUrl: `/api/provider/live/requisition?orderId=${order.id}`,
    appointmentUrl: `/orders?provider=junction&order=${order.id}`,
  } satisfies ProviderOrder;
}

export async function getJunctionRequisitionPdf(orderId: string) {
  return junctionFetchBinary(`/v3/order/${encodeURIComponent(orderId)}/requisition/pdf`);
}

export async function getJunctionCatalogPreview() {
  const tests = await getAvailableLabTests();
  return tests.map((test) => ({
    id: test.id,
    name: test.name,
    method: test.method,
    price: test.price,
    status: test.status,
    active: test.is_active,
    lab: test.lab?.name ?? test.lab?.slug,
    markers: test.markers?.map((marker) => marker.slug || marker.name).filter(Boolean).slice(0, 12) ?? [],
  }));
}

export const junctionProvider: ProviderAdapter = {
  id: "junction-live",
  tier: "aggregator",
  async syncCatalog() {
    const tests = await getAvailableLabTests();
    const labs = new Set(tests.map((test) => test.lab?.slug).filter(Boolean));
    return {
      tests: tests.length,
      panels: panels.length,
      partners: labs.size,
      syncedAt: new Date().toISOString(),
    };
  },
  async checkEligibility({ state, zip }) {
    const quote = createOrderQuote({ panelId: "complete-wellness", state, zip: zip ?? "00000" });
    return {
      state: quote.state,
      eligible: quote.available,
      message: quote.customerMessage,
      accessMode: quote.authorizationIncluded ? "clinician_authorized" : "direct_access",
      requiresClinicianAuthorization: quote.authorizationIncluded,
    };
  },
  async authorizeOrder({ panelId, state, total }) {
    return {
      id: `junction_auth_${state}_${panelId}_${Math.round(total * 100)}`,
      status: "approved",
      reviewer: "Junction physician network",
      reason: "Provider authorization is handled through the configured lab API network.",
      authorizedAt: new Date().toISOString(),
      requiredFollowUp: "Critical results follow the provider network escalation policy.",
    };
  },
  async quoteOrder(input) {
    const quote = createOrderQuote(input);
    if (!quote.available || !isJunctionConfigured()) return quote;

    try {
      const locations = await getJunctionLocations(quote.zip);
      if (!locations.length) return quote;
      return {
        ...quote,
        partnerId: "junction-live",
        partnerName: "Junction Lab Network",
        routeId: "junction-live",
        networkName: "Live Junction lab network",
        locationOptions: locations,
        selectedLocation: locations[0],
        customerMessage: "Live lab network available. Provider authorization and requisition generation are handled after payment.",
      } satisfies LabOrderQuote;
    } catch {
      return quote;
    }
  },
  createOrder: createJunctionOrder,
  async getLabLocations({ zip }) {
    if (!isJunctionConfigured()) {
      return getNearestLabLocations({ zip, state: "CO" }).map((location) => ({
        id: location.id,
        name: location.name,
        distance: `${location.distanceMiles.toFixed(1)} mi`,
        address: location.address,
      }));
    }

    const locations = await getJunctionLocations(zip);
    return locations.map((location) => ({
      id: location.id,
      name: location.name,
      distance: `${location.distanceMiles.toFixed(1)} mi`,
      address: location.address,
    }));
  },
  async getRequisition(orderId) {
    return {
      orderId,
      url: `/api/provider/live/requisition?orderId=${encodeURIComponent(orderId)}`,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    };
  },
  async ingestResults(orderId) {
    const result = await junctionFetch<{ metadata?: { status?: string } }>(`/v3/order/${encodeURIComponent(orderId)}/result`);
    return {
      orderId,
      status: result.metadata?.status === "final" ? "results_received" : "collected",
      receivedAt: new Date().toISOString(),
    };
  },
  async getOrderStatus(orderId) {
    const response = await junctionFetch<{ order?: JunctionOrder }>(`/v3/order/${encodeURIComponent(orderId)}`);
    return {
      orderId,
      status: mapJunctionStatus(response.order?.last_event?.status ?? response.order?.status),
    };
  },
};

export const junctionTestMapHelp = labTests.map((test) => `"${test.id}": "<junction lab_test_id>"`).join(", ");
