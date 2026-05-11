export type OrderingPartnerId = "ulta-lab-tests" | "quest-health";

export type OrderingPartnerApprovalStatus = "approved" | "pending";

export type OrderingPartner = {
  id: OrderingPartnerId;
  name: string;
  shortName: string;
  defaultApprovalStatus: OrderingPartnerApprovalStatus;
  relationship: "affiliate" | "co_branded_portal" | "impact_affiliate";
  baseUrlEnv: string;
  panelUrlMapEnv: string;
  statusEnv: string;
  defaultPublicUrl: string;
  checkoutOwner: string;
  resultsOwner: string;
  supportedPanelIds: string[];
  ctaLabel: string;
  customerPromise: string;
  operatorNote: string;
  sourceHref: string;
};

export const orderingPartners: OrderingPartner[] = [
  {
    id: "ulta-lab-tests",
    name: "Ulta Lab Tests",
    shortName: "Ulta",
    defaultApprovalStatus: "approved",
    relationship: "co_branded_portal",
    baseUrlEnv: "ULTA_AFFILIATE_URL",
    panelUrlMapEnv: "ULTA_PANEL_URL_MAP",
    statusEnv: "ULTA_PARTNER_STATUS",
    defaultPublicUrl: "https://www.ultalabtests.com/",
    checkoutOwner: "Ulta Lab Tests",
    resultsOwner: "Ulta Lab Tests portal unless export/reporting is separately approved",
    supportedPanelIds: [
      "essential-wellness",
      "complete-wellness",
      "energy-check",
      "heart-metabolic",
      "hormone-baseline",
      "custom",
    ],
    ctaLabel: "Order through Ulta",
    customerPromise:
      "Finish the real lab purchase in the approved Ulta ordering flow while Private Lab Test guides panel selection.",
    operatorNote:
      "Use the exact affiliate, healthcare professional, or co-branded portal URL Ulta gave you. Add panel-specific URLs when Ulta creates custom panels.",
    sourceHref: "https://www.ultalabtests.com/healthcare-professional/whypartner",
  },
  {
    id: "quest-health",
    name: "Quest Health",
    shortName: "Quest",
    defaultApprovalStatus: "pending",
    relationship: "impact_affiliate",
    baseUrlEnv: "QUEST_AFFILIATE_URL",
    panelUrlMapEnv: "QUEST_PANEL_URL_MAP",
    statusEnv: "QUEST_PARTNER_STATUS",
    defaultPublicUrl: "https://www.questhealth.com/shop-tests",
    checkoutOwner: "Quest Health",
    resultsOwner: "Quest Health / Quest portal unless deeper partner terms allow export",
    supportedPanelIds: ["essential-wellness", "complete-wellness", "heart-metabolic", "custom"],
    ctaLabel: "Order through Quest",
    customerPromise:
      "Use Quest Health as a second approved checkout path once the Impact application and brand rules are approved.",
    operatorNote:
      "Do not turn on Quest links until Impact/Quest approval is confirmed and the tracking URL plus allowed wording are documented.",
    sourceHref: "https://www.questhealth.com/affiliate-program.html",
  },
];

export function getOrderingPartner(id: string) {
  return orderingPartners.find((partner) => partner.id === id);
}
