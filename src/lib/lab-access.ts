import { labAccessRules, labPartners } from "@/data/lab-partners";
import type { ClinicianAuthorization, LabAccessRule, LabPartner, LabPartnerTier } from "@/lib/types";

const defaultAccessRule: LabAccessRule = {
  state: "US",
  mode: "clinician_authorized",
  partnerIds: ["aggregator-api"],
  note: "Default to provider authorization included with aggregator routing while state policy is reviewed.",
};

export function normalizeState(state: string) {
  return state.trim().toUpperCase().slice(0, 2);
}

export function getLabAccessRule(state: string) {
  const normalized = normalizeState(state);
  return labAccessRules.find((rule) => rule.state === normalized) ?? { ...defaultAccessRule, state: normalized || "US" };
}

export function getPartnersForState(state: string) {
  const rule = getLabAccessRule(state);
  return rule.partnerIds
    .map((partnerId) => labPartners.find((partner) => partner.id === partnerId))
    .filter((partner): partner is LabPartner => Boolean(partner));
}

export function getPreferredPartner(state: string, preferredTier: LabPartnerTier = "aggregator") {
  const partners = getPartnersForState(state);
  return partners.find((partner) => partner.tier === preferredTier) ?? partners[0] ?? labPartners[0];
}

export function summarizeLabSupply() {
  const verifiedPartners = labPartners.filter((partner) => partner.cliaStatus === "verified");
  const states = new Set(labPartners.flatMap((partner) => partner.statesServed));
  const cashMenuCount = labPartners.reduce((total, partner) => total + partner.cashPriceMenu.length, 0);

  return {
    partners: labPartners.length,
    verifiedPartners: verifiedPartners.length,
    states: states.size,
    cashMenuCount,
  };
}

export function requestClinicianAuthorization(input: {
  panelId: string;
  state: string;
  total: number;
  userId?: string;
}): ClinicianAuthorization {
  const access = getLabAccessRule(input.state);
  const state = normalizeState(input.state);

  if (access.mode === "blocked") {
    return {
      id: `auth_blocked_${state || "unknown"}`,
      status: "blocked",
      reviewer: "Clinical operations",
      reason: access.note,
      authorizedAt: new Date().toISOString(),
      requiredFollowUp: "Notify the customer that ordering is not available in this state yet.",
    };
  }

  if (input.total <= 0) {
    return {
      id: `auth_review_${state || "unknown"}`,
      status: "manual_review",
      reviewer: "Clinical operations",
      reason: "Order cannot be created until a valid prepaid cash amount is provided.",
      authorizedAt: new Date().toISOString(),
      requiredFollowUp: "Collect payment before creating a lab order.",
    };
  }

  return {
    id: `auth_${state}_${input.panelId}_${Math.abs(Math.round(input.total * 100))}`,
    status: "approved",
    reviewer: "Provider authorization network",
    reason: "Provider authorization is included automatically for this cash-pay wellness order.",
    authorizedAt: new Date().toISOString(),
    requiredFollowUp: "Abnormal or critical results should be discussed with a qualified clinician.",
  };
}
