import { orderingPartners, type OrderingPartner, type OrderingPartnerApprovalStatus } from "@/data/ordering-partners";

export type OrderingPartnerRuntime = OrderingPartner & {
  approvalStatus: OrderingPartnerApprovalStatus;
  configured: boolean;
  enabled: boolean;
  destinationUrl?: string;
  destinationSource?: "panel_map" | "base_url";
  missingEnv: string[];
};

type ReferralInput = {
  partnerId: string;
  panelId?: string;
  source?: string;
};

function readEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

function getApprovalStatus(partner: OrderingPartner): OrderingPartnerApprovalStatus {
  const value = readEnv(partner.statusEnv).toLowerCase();
  return value === "approved" ? "approved" : value === "pending" ? "pending" : partner.defaultApprovalStatus;
}

function parsePanelUrlMap(value: string): Record<string, string> {
  if (!value) return {};

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed)
        .filter((entry): entry is [string, string] => typeof entry[1] === "string")
        .map(([panelId, url]) => [panelId, url.trim()])
        .filter(([, url]) => url.startsWith("https://")),
    );
  } catch {
    return {};
  }
}

function getPartnerDestination(partner: OrderingPartner, panelId?: string) {
  const panelUrlMap = parsePanelUrlMap(readEnv(partner.panelUrlMapEnv));
  const panelUrl = panelId ? panelUrlMap[panelId] : undefined;
  const baseUrl = readEnv(partner.baseUrlEnv);

  if (panelUrl) {
    return { destinationUrl: panelUrl, destinationSource: "panel_map" as const };
  }

  if (baseUrl.startsWith("https://")) {
    return { destinationUrl: baseUrl, destinationSource: "base_url" as const };
  }

  return {};
}

export function getOrderingPartnerRuntimes(panelId?: string): OrderingPartnerRuntime[] {
  return orderingPartners.map((partner) => {
    const approvalStatus = getApprovalStatus(partner);
    const { destinationUrl, destinationSource } = getPartnerDestination(partner, panelId);
    const supportsPanel = !panelId || partner.supportedPanelIds.includes(panelId);
    const configured = Boolean(destinationUrl);
    const enabled = approvalStatus === "approved" && configured && supportsPanel;
    const missingEnv = configured ? [] : [partner.baseUrlEnv, partner.panelUrlMapEnv];

    return {
      ...partner,
      approvalStatus,
      configured,
      enabled,
      destinationUrl,
      destinationSource,
      missingEnv,
    };
  });
}

export function getConfiguredOrderingPartners(panelId?: string) {
  return getOrderingPartnerRuntimes(panelId).filter((partner) => partner.enabled);
}

export function buildPartnerReferralPath(input: ReferralInput) {
  const params = new URLSearchParams({
    partner: input.partnerId,
  });

  if (input.panelId) params.set("panel", input.panelId);
  if (input.source) params.set("source", input.source);

  return `/api/partners/referral?${params.toString()}`;
}

export function resolvePartnerReferralDestination(input: ReferralInput) {
  const partner = getOrderingPartnerRuntimes(input.panelId).find((item) => item.id === input.partnerId);
  if (!partner?.enabled || !partner.destinationUrl) return null;

  let destination: URL;
  try {
    destination = new URL(partner.destinationUrl);
  } catch {
    return null;
  }

  destination.searchParams.set("utm_source", "privatelabtest");
  destination.searchParams.set("utm_medium", "partner_referral");
  destination.searchParams.set("utm_campaign", input.panelId ?? "catalog");
  destination.searchParams.set("utm_content", input.source ?? "app");
  if (input.panelId) destination.searchParams.set("plt_panel", input.panelId);

  return destination.toString();
}
