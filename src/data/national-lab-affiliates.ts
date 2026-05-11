export type AffiliationModel =
  | "affiliate"
  | "api_marketplace"
  | "provider_account"
  | "enterprise_direct"
  | "regional_direct"
  | "retail_collection";

export type NationalLabAffiliationTarget = {
  id: string;
  company: string;
  model: AffiliationModel;
  priority: 1 | 2 | 3 | 4 | 5;
  timeline: string;
  entryPoint: string;
  whyItMatters: string;
  ask: string;
  requirements: string[];
  proofToBring: string[];
  productUnlock: string;
  sourceHref: string;
};

export const affiliationModelLabels: Record<AffiliationModel, string> = {
  affiliate: "Affiliate",
  api_marketplace: "API/marketplace",
  provider_account: "Provider account",
  enterprise_direct: "Enterprise direct",
  regional_direct: "Regional direct",
  retail_collection: "Retail collection",
};

export const nationalLabAffiliationTargets: NationalLabAffiliationTarget[] = [
  {
    id: "quest-health-affiliate",
    company: "Quest Health",
    model: "affiliate",
    priority: 1,
    timeline: "Now",
    entryPoint: "Quest Health affiliate application through Impact",
    whyItMatters:
      "Fastest legitimate Quest-branded relationship. It can validate demand, test messaging, and create revenue while direct ordering is still handled by Quest.",
    ask: "Apply as a health content/commerce affiliate, request tracking links, banners, allowed claims, category-level reporting, and permission to send customers into Quest Health panels.",
    requirements: [
      "Public website with compliant health copy",
      "Traffic source disclosure",
      "Affiliate terms review",
      "Clear explanation that purchase/result flow occurs on Quest Health",
    ],
    proofToBring: ["Domain live", "Brand positioning", "Catalog intent", "No misleading diagnostic or treatment claims"],
    productUnlock: "A compliant Quest-branded outbound path before Private Lab Test owns direct Quest ordering.",
    sourceHref: "https://www.questhealth.com/affiliate-program.html",
  },
  {
    id: "quest-health-api-scale",
    company: "Quest Health / Quest Diagnostics",
    model: "enterprise_direct",
    priority: 2,
    timeline: "After demand proof",
    entryPoint: "Quest Health partnerships or Quest Diagnostics business development",
    whyItMatters:
      "Quest states that Quest Health can support APIs for sales channels and partnerships at scale. This is the path to deeper co-branded or integrated ordering.",
    ask: "Request sales-channel API options, test catalog export, partner pricing, state coverage, clinical support model, result routing options, and brand-use rules.",
    requirements: [
      "Order volume by ZIP and panel",
      "Security/privacy review",
      "BAA/commercial terms if PHI is exchanged",
      "Support workflow for scheduling, cancellations, and result questions",
    ],
    proofToBring: ["Monthly qualified traffic", "Checkout attempts", "Top requested tests", "Abandoned ZIPs", "Support process"],
    productUnlock: "Deeper Quest ordering, 2,000+ PSC positioning, and possible co-branded national draw access.",
    sourceHref: "https://www.questhealth.com/affiliate-program.html",
  },
  {
    id: "labcorp-ondemand-partner",
    company: "Labcorp OnDemand / Labcorp",
    model: "enterprise_direct",
    priority: 2,
    timeline: "After API-network pilot",
    entryPoint: "Labcorp OnDemand/business development and provider services",
    whyItMatters:
      "Labcorp has national PSC density, consumer OnDemand ordering, and an existing home-draw path through Getlabs.",
    ask: "Request whether Labcorp supports affiliate, referral, marketplace, provider-account, or API ordering relationships for self-pay wellness panels.",
    requirements: [
      "Clinician ordering partner or Labcorp-approved consumer purchase flow",
      "State availability and order-validity rules",
      "Result delivery route",
      "No-insurance billing separation",
    ],
    proofToBring: ["Provider operations plan", "Patient intake flow", "Top requested panels", "Customer support scripts"],
    productUnlock: "Labcorp PSC and Getlabs collection coverage as a second national-lab brand.",
    sourceHref: "https://www.labcorp.com/patients/tests/how-labcorp-works",
  },
  {
    id: "ulta-quest-white-label",
    company: "Ulta Lab Tests",
    model: "api_marketplace",
    priority: 1,
    timeline: "Accepted - configure now",
    entryPoint: "Approved Ulta Lab Tests partner account",
    whyItMatters:
      "Fastest shortcut to live cash-pay ordering while deeper API and direct national-lab contracts mature.",
    ask: "Request the exact tracked/co-branded URL, panel-specific links, custom panel options, result access, available states, Quest test catalog, and API/embed options.",
    requirements: [
      "Tracked affiliate or co-branded URL",
      "Allowed claims and brand wording",
      "Confirmation of who is ordering provider of record",
      "Result ownership and export terms",
    ],
    proofToBring: ["Acceptance email", "Launch panels", "Domain and brand", "Projected order volume", "Support workflow"],
    productUnlock: "A real partner checkout path from Private Lab Test panel selection into Ulta's ordering flow.",
    sourceHref: "https://content.ultalabtests.com/static/documents/PharmacyServiceOfferingNCPA.pdf",
  },
  {
    id: "bioreference-direct-ny-nj",
    company: "BioReference Direct / BioReference Health",
    model: "regional_direct",
    priority: 2,
    timeline: "Now for NY/NJ",
    entryPoint: "BioReference Direct/business development",
    whyItMatters:
      "BioReference Direct launched a consumer-initiated platform for New York and New Jersey, two states that are often difficult for direct-access lab testing.",
    ask: "Request referral, affiliate, marketplace, or provider-ordering options for NY/NJ general wellness, men's health, women's health, and STI panels.",
    requirements: [
      "NY/NJ-specific terms",
      "Provider review model",
      "HIPAA-secure result flow",
      "State-specific copy review",
    ],
    proofToBring: ["NY/NJ demand", "Restricted-state routing plan", "Clinical oversight language", "Privacy posture"],
    productUnlock: "State-specific coverage in hard direct-access markets.",
    sourceHref: "https://www.bioreferencedirect.com/",
  },
  {
    id: "sonic-cpl-regional",
    company: "Sonic Healthcare USA divisions / CPL",
    model: "regional_direct",
    priority: 3,
    timeline: "Regional expansion",
    entryPoint: "Division-level sales/account managers",
    whyItMatters:
      "Sonic's federated regional structure can create local cash-pay pricing and draw-site relationships where national DTC paths are limited.",
    ask: "Ask each relevant Sonic division for cash-pay menu, PSC list, clinician-authorized requisition rules, SFTP/API/portal result options, and critical-value escalation.",
    requirements: ["Local lab manager contact", "CLIA/CAP verification", "Written cash menu", "Provider requisition acceptance"],
    proofToBring: ["Launch-state order intent", "Panel list", "Concierge workflow", "No-insurance payment model"],
    productUnlock: "Better local pricing and redundancy in launch states.",
    sourceHref: "https://pgms.sonichealthcareusa.com/common/divmap/default.aspx",
  },
  {
    id: "any-lab-test-now-retail",
    company: "Any Lab Test Now",
    model: "retail_collection",
    priority: 3,
    timeline: "Local market validation",
    entryPoint: "Corporate partnership or launch-market franchise owners",
    whyItMatters:
      "Retail direct-access locations can validate cash-pay demand and provide local collection paths in markets where franchise rules allow it.",
    ask: "Qualify corporate referral, co-marketing, franchise-level collection, or discounted menu opportunities by launch state.",
    requirements: ["State direct-access availability", "Corporate/franchise participation rules", "Draw/result workflow", "Cash pricing"],
    proofToBring: ["Local lead volume", "State-by-state demand", "Panel list", "Customer support plan"],
    productUnlock: "Retail collection and local cash-pay validation without waiting for national enterprise deals.",
    sourceHref: "https://www.anylabtestnow.com/franchise/",
  },
];

export const affiliationLadder = [
  {
    step: "1",
    title: "Affiliate/referral first",
    summary: "Use Quest Health or similar outbound affiliate programs to validate traffic and demand without handling PHI.",
  },
  {
    step: "2",
    title: "White-label/API marketplace",
    summary: "Use Junction, ORDRS, LabTestingAPI, or Ulta-style partners to own more of checkout while avoiding direct national-lab contracting delays.",
  },
  {
    step: "3",
    title: "Provider-account ordering",
    summary: "With a licensed clinician partner, qualify Quest/Labcorp provider portals or electronic ordering accounts for client-bill/cash-pay workflows.",
  },
  {
    step: "4",
    title: "Enterprise direct",
    summary: "Bring traffic, order, ZIP, support, and completion proof to Quest, Labcorp, and other national business-development teams.",
  },
  {
    step: "5",
    title: "Regional and retail redundancy",
    summary: "Use Sonic divisions, BioReference, regional CLIA labs, and retail lab storefronts to fill coverage and price gaps state by state.",
  },
];

export function getImmediateAffiliationTargets() {
  return nationalLabAffiliationTargets.filter(
    (target) => target.timeline.startsWith("Now") || target.timeline.startsWith("Accepted"),
  );
}
