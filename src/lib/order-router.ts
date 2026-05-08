import { labNetworkRoutes, networkLocationDirectory } from "@/data/lab-network";
import { labPartners } from "@/data/lab-partners";
import { labTests, panels } from "@/data/catalog";
import { calculateCustomPanelPrice, calculatePanelRetail, checkStateEligibility } from "@/lib/catalog";
import { normalizeState } from "@/lib/lab-access";
import type { CollectionType, LabLocationOption, LabNetworkRoute, LabOrderQuote } from "@/lib/types";

type QuoteInput = {
  panelId?: string;
  testIds?: string[];
  state: string;
  zip: string;
  collectionType?: CollectionType;
};

const quoteIdPrefix = "quote";

function normalizeZip(zip: string) {
  return zip.replace(/\D/g, "").slice(0, 5);
}

function getPanelTestIds(input: Pick<QuoteInput, "panelId" | "testIds">) {
  if (input.panelId && input.panelId !== "custom") {
    const panel = panels.find((item) => item.id === input.panelId);
    return panel?.testIds ?? [];
  }

  return Array.from(new Set(input.testIds ?? [])).filter((testId) => labTests.some((test) => test.id === testId));
}

function getBasePanelPrice(panelId: string, testIds: string[]) {
  const panel = panels.find((item) => item.id === panelId);
  if (panel) return panel.price;
  return calculateCustomPanelPrice(testIds);
}

function getPartnerCost(route: LabNetworkRoute, testIds: string[]) {
  const partner = labPartners.find((item) => item.id === route.partnerId);
  const partnerMenu = new Map(partner?.cashPriceMenu.map((item) => [item.testId, item.price]) ?? []);
  const fallbackRetail = calculatePanelRetail(testIds);
  const cashMenuTotal = testIds.reduce((total, testId) => {
    const test = labTests.find((item) => item.id === testId);
    return total + (partnerMenu.get(testId) ?? Math.round((test?.price ?? 0) * route.priceMultiplier));
  }, 0);

  return cashMenuTotal || Math.round(fallbackRetail * route.priceMultiplier);
}

function zipDistanceMiles(inputZip: string, locationZip: string, sameState: boolean) {
  const inputPrefix = Number(inputZip.slice(0, 3));
  const locationPrefix = Number(locationZip.slice(0, 3));

  if (!inputZip || Number.isNaN(inputPrefix) || Number.isNaN(locationPrefix)) {
    return sameState ? 8.5 : 250;
  }

  const estimate = Math.abs(inputPrefix - locationPrefix) * 1.35 + Math.abs(Number(inputZip) - Number(locationZip)) / 9000;
  return Number((sameState ? Math.max(1.2, estimate) : estimate + 250).toFixed(1));
}

function getRouteLocations(route: LabNetworkRoute, state: string, zip: string, collectionType: CollectionType) {
  return networkLocationDirectory
    .filter((location) => location.routeId === route.id && location.collectionType === collectionType)
    .filter((location) => location.state === state || route.tier === "aggregator")
    .map((location): LabLocationOption => {
      const sameState = location.state === state;
      const distanceMiles = zipDistanceMiles(zip, location.zip, sameState);
      return {
        ...location,
        distanceMiles,
        drawFee: route.drawFee || location.drawFee,
      };
    })
    .sort((a, b) => a.distanceMiles - b.distanceMiles)
    .slice(0, 5);
}

function routeSupportsTests(route: LabNetworkRoute, testIds: string[]) {
  const partner = labPartners.find((item) => item.id === route.partnerId);
  if (!partner) return false;
  if (partner.tier === "aggregator" || route.tier === "national") return true;
  return testIds.every((testId) => partner.supportedTestIds.includes(testId));
}

function getEligibleRoutes(input: Required<Pick<QuoteInput, "state" | "zip">> & { collectionType: CollectionType; testIds: string[] }) {
  return labNetworkRoutes
    .filter((route) => route.status !== "candidate")
    .filter((route) => route.collectionTypes.includes(input.collectionType))
    .filter((route) => route.statesServed.includes(input.state))
    .filter((route) => !route.restrictedStates.includes(input.state))
    .filter((route) => routeSupportsTests(route, input.testIds))
    .map((route) => {
      const locations = getRouteLocations(route, input.state, input.zip, input.collectionType);
      return { route, locations };
    })
    .filter((entry) => entry.locations.length > 0);
}

function getFastingNotes(testIds: string[]) {
  return Array.from(
    new Set(
      testIds
        .map((testId) => labTests.find((test) => test.id === testId)?.fasting)
        .filter((note): note is string => Boolean(note)),
    ),
  );
}

export function createOrderQuote(input: QuoteInput): LabOrderQuote {
  const state = normalizeState(input.state);
  const zip = normalizeZip(input.zip);
  const collectionType = input.collectionType ?? "walk_in";
  const panelId = input.panelId ?? "complete-wellness";
  const testIds = getPanelTestIds({ panelId, testIds: input.testIds });
  const eligibility = checkStateEligibility(state);
  const basePrice = getBasePanelPrice(panelId, testIds);

  if (!zip || zip.length !== 5) {
    return {
      id: `${quoteIdPrefix}_${state || "US"}_invalid_zip`,
      available: false,
      panelId,
      testIds,
      state,
      zip,
      orderMode: "blocked",
      authorizationIncluded: false,
      collectionType,
      locationOptions: [],
      subtotal: 0,
      drawFee: 0,
      total: 0,
      estimatedSavings: 0,
      turnaround: "Unavailable",
      fastingNotes: getFastingNotes(testIds),
      customerMessage: "Enter a valid 5-digit ZIP code to find nearby labs.",
      unavailableReason: "A valid 5-digit ZIP code is required.",
    };
  }

  if (!eligibility.eligible || testIds.length === 0) {
    return {
      id: `${quoteIdPrefix}_${state || "US"}_unavailable`,
      available: false,
      panelId,
      testIds,
      state,
      zip,
      orderMode: "blocked",
      authorizationIncluded: false,
      collectionType,
      locationOptions: [],
      subtotal: 0,
      drawFee: 0,
      total: 0,
      estimatedSavings: 0,
      turnaround: "Unavailable",
      fastingNotes: getFastingNotes(testIds),
      customerMessage: eligibility.message,
      unavailableReason: testIds.length === 0 ? "No valid tests were selected." : eligibility.message,
    };
  }

  const eligibleRoutes = getEligibleRoutes({ state, zip, collectionType, testIds });

  if (eligibleRoutes.length === 0) {
    return {
      id: `${quoteIdPrefix}_${state}_${zip}_no_route`,
      available: false,
      panelId,
      testIds,
      state,
      zip,
      orderMode: "blocked",
      authorizationIncluded: false,
      collectionType,
      locationOptions: [],
      subtotal: 0,
      drawFee: 0,
      total: 0,
      estimatedSavings: 0,
      turnaround: "Unavailable",
      fastingNotes: getFastingNotes(testIds),
      customerMessage: "We do not have a lab route for this test and ZIP yet.",
      unavailableReason: "No provider route matched this state, ZIP, collection type, and test selection.",
    };
  }

  const ranked = eligibleRoutes
    .map(({ route, locations }) => {
      const selectedLocation = locations[0];
      const partnerCost = getPartnerCost(route, testIds);
      const subtotal = Math.max(1, Math.min(basePrice, Math.round(partnerCost + route.platformFee)));
      const drawFee = route.drawFee || selectedLocation.drawFee;
      const total = subtotal + drawFee;
      const distancePenalty = selectedLocation.distanceMiles * 0.28;
      const statusPenalty = route.status === "contracting" ? 35 : 0;

      return {
        route,
        locations,
        selectedLocation,
        subtotal,
        drawFee,
        total,
        score: total + distancePenalty + route.priority + statusPenalty,
      };
    })
    .sort((a, b) => a.score - b.score);

  const best = ranked[0];
  const partner = labPartners.find((item) => item.id === best.route.partnerId);
  const allLocations = ranked.flatMap((entry) => entry.locations).sort((a, b) => a.distanceMiles - b.distanceMiles);

  return {
    id: `${quoteIdPrefix}_${state}_${zip}_${panelId}_${best.route.id}`,
    available: true,
    panelId,
    testIds,
    state,
    zip,
    orderMode: best.route.orderMode,
    authorizationIncluded: best.route.orderMode === "provider_authorization_included",
    collectionType,
    partnerId: best.route.partnerId,
    partnerName: partner?.name ?? best.route.name,
    routeId: best.route.id,
    networkName: best.route.name,
    locationOptions: allLocations.slice(0, 5),
    selectedLocation: best.selectedLocation,
    subtotal: best.subtotal,
    drawFee: best.drawFee,
    total: best.total,
    estimatedSavings: Math.max(0, calculatePanelRetail(testIds) - best.total),
    turnaround: best.route.turnaround,
    fastingNotes: getFastingNotes(testIds),
    customerMessage:
      best.route.orderMode === "provider_authorization_included"
        ? "No doctor visit or insurance needed. Provider authorization is included automatically where required."
        : "No doctor visit or insurance needed. This route supports direct-access lab ordering.",
  };
}

export function getNearestLabLocations(input: { zip: string; state: string; collectionType?: CollectionType }) {
  const state = normalizeState(input.state);
  const zip = normalizeZip(input.zip);
  const collectionType = input.collectionType ?? "walk_in";

  return networkLocationDirectory
    .filter((location) => location.collectionType === collectionType)
    .map((location) => ({
      ...location,
      distanceMiles: zipDistanceMiles(zip, location.zip, location.state === state),
    }))
    .sort((a, b) => a.distanceMiles - b.distanceMiles)
    .slice(0, 10);
}
