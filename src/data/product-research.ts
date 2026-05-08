import type { LucideIcon } from "lucide-react";
import {
  BadgeDollarSign,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  HeartPulse,
  LockKeyhole,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";

export type ProductResearchSource = {
  label: string;
  href: string;
  note: string;
};

export type TrustDriver = {
  id: string;
  title: string;
  priority: string;
  customerPromise: string;
  productMove: string;
  Icon: LucideIcon;
  sourceIds: string[];
};

export type CommonLabDemand = {
  testId: string;
  rank: number;
  label: string;
  customerReason: string;
  catalogSignal: string;
  nextProductMove: string;
};

export type NetworkExpansionPlay = {
  id: string;
  title: string;
  lane: string;
  priority: "Now" | "Next" | "Later";
  targetNames: string[];
  whyItMatters: string;
  ask: string;
  productUnlock: string;
  Icon: LucideIcon;
  sourceIds: string[];
};

export type PremiumUiPrinciple = {
  id: string;
  title: string;
  implementation: string;
};

export const productResearchSources: ProductResearchSource[] = [
  {
    label: "J.D. Power 2024 U.S. Telehealth Satisfaction Study",
    href: "https://www.jdpower.com/business/press-releases/2024-us-telehealth-satisfaction-study",
    note: "Ranks trust as the most important satisfaction factor and cites convenience, speed, and data-security concerns.",
  },
  {
    label: "HHS Telehealth Privacy for Patients",
    href: "https://telehealth.hhs.gov/patients/additional-resources/data-privacy",
    note: "Frames privacy and secure handling as basic expectations for online health services.",
  },
  {
    label: "Quest Health Shop Tests",
    href: "https://www.questhealth.com/shop-tests",
    note: "Shows best-seller demand for CBC, CMP, lipid panel, HbA1c, and broader health profiles.",
  },
  {
    label: "Labcorp OnDemand Products",
    href: "https://www.ondemand.labcorp.com/products?category_id=22",
    note: "Lists common cash-pay wellness tests including CMP, CBC, lipids, HbA1c, hs-CRP, vitamin D, and ferritin.",
  },
  {
    label: "Junction Lab Testing API",
    href: "https://docs.junction.com/lab/overview/introduction",
    note: "Supports lab ordering, physician networks, multiple collection modalities, webhooks, and results.",
  },
  {
    label: "ORDRS",
    href: "https://www.ordrs.io/",
    note: "Markets an API platform with physician oversight, 2,500+ locations, and a 3,000+ test menu.",
  },
  {
    label: "Getlabs Partners",
    href: "https://www.getlabs.com/partners",
    note: "Offers mobile phlebotomy, partner portal/API/link workflows, and home collection support.",
  },
  {
    label: "Health Gorilla Lab Network",
    href: "https://www.healthgorilla.com/home/markets/labs",
    note: "Offers electronic lab ordering and results retrieval across a national lab network.",
  },
  {
    label: "CMS CLIA",
    href: "https://www.cms.gov/medicare/quality/clinical-laboratory-improvement-amendments",
    note: "CMS regulates U.S. human-specimen laboratory testing through CLIA.",
  },
  {
    label: "HHS Online Tracking Guidance",
    href: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-online-tracking/index.html",
    note: "Highlights health-data obligations and risk when third-party tracking technologies are used.",
  },
  {
    label: "Function Health FAQ",
    href: "https://www.functionhealth.com/faqs/which-tests-are-included-with-a-function-membership",
    note: "Shows a premium benchmark: Quest collection, 100+ biomarkers, trend tracking, and a strong dashboard narrative.",
  },
];

export const trustDrivers: TrustDriver[] = [
  {
    id: "trust",
    title: "Trust before conversion",
    priority: "Highest",
    customerPromise: "Clear ordering path, serious privacy posture, and no surprise billing.",
    productMove: "Repeat privacy, no-insurance, provider-authorization, and result-release promises at each decision point.",
    Icon: ShieldCheck,
    sourceIds: ["jd-power-telehealth", "hhs-privacy"],
  },
  {
    id: "speed",
    title: "Fast access without chaos",
    priority: "High",
    customerPromise: "Choose the test, see collection options, and know what happens after payment.",
    productMove: "Keep the default checkout path short: panel, ZIP, basic intake, payment, requisition instructions.",
    Icon: CheckCircle2,
    sourceIds: ["jd-power-telehealth"],
  },
  {
    id: "price",
    title: "Cash price clarity",
    priority: "High",
    customerPromise: "The amount on the screen is the self-pay order price.",
    productMove: "Separate lab cost, draw fee, platform fee, and savings estimates whenever provider data is available.",
    Icon: BadgeDollarSign,
    sourceIds: ["labcorp-ondemand", "quest-health"],
  },
  {
    id: "support",
    title: "Human backup",
    priority: "Medium",
    customerPromise: "A real person can help with prep, scheduling, redraws, and confusing result timing.",
    productMove: "Keep concierge support visible for older adults, caregivers, and high-friction collection scenarios.",
    Icon: MessageCircle,
    sourceIds: ["jd-power-telehealth", "getlabs"],
  },
  {
    id: "privacy",
    title: "Privacy discipline",
    priority: "High",
    customerPromise: "Health data is not treated like ordinary marketing data.",
    productMove: "Avoid unnecessary tracking on health-intent pages and keep patient intake out of Stripe metadata.",
    Icon: LockKeyhole,
    sourceIds: ["hhs-tracking", "hhs-privacy"],
  },
];

export const commonLabDemand: CommonLabDemand[] = [
  {
    testId: "cmp",
    rank: 1,
    label: "Comprehensive Metabolic Panel",
    customerReason: "Baseline look at liver, kidney, electrolytes, proteins, and glucose context.",
    catalogSignal: "Best-seller and common wellness listing across major direct-access lab storefronts.",
    nextProductMove: "Make CMP the anchor test in every low-cost starter panel.",
  },
  {
    testId: "cbc",
    rank: 2,
    label: "Complete Blood Count",
    customerReason: "Screens blood cells, anemia signals, immune patterns, and platelet context.",
    catalogSignal: "Quest and Labcorp both position CBC as a common general-health test.",
    nextProductMove: "Keep CBC paired with CMP in baseline, energy, and hormone panels.",
  },
  {
    testId: "lipids",
    rank: 3,
    label: "Lipid Panel",
    customerReason: "Clear heart-health demand: cholesterol fractions and triglycerides.",
    catalogSignal: "Visible best-seller or core product in Quest, Labcorp, and direct-access menus.",
    nextProductMove: "Add optional ApoB and Lp(a) later for a premium heart upgrade.",
  },
  {
    testId: "a1c",
    rank: 4,
    label: "Hemoglobin A1c",
    customerReason: "Easy-to-understand blood sugar trend over time.",
    catalogSignal: "A frequent direct-access diabetes-risk product and part of cardiometabolic panels.",
    nextProductMove: "Bundle A1c with CMP and lipids in heart-metabolic flows.",
  },
  {
    testId: "tsh",
    rank: 5,
    label: "TSH",
    customerReason: "Simple thyroid screening with strong consumer demand around energy and metabolism.",
    catalogSignal: "Commonly packaged in annual wellness, energy, and thyroid storefront categories.",
    nextProductMove: "Offer TSH as baseline, then Free T4/Free T3/TPO as the upgrade.",
  },
  {
    testId: "vit-d",
    rank: 6,
    label: "Vitamin D, 25-Hydroxy",
    customerReason: "Popular nutrient marker with strong wellness demand.",
    catalogSignal: "Frequently visible in direct-access vitamin and nutrition menus.",
    nextProductMove: "Use vitamin D in Complete Wellness and Energy Check, not the lowest-cost starter.",
  },
  {
    testId: "ferritin",
    rank: 7,
    label: "Ferritin",
    customerReason: "Useful iron-storage marker for fatigue and blood-health conversations.",
    catalogSignal: "Appears in Labcorp OnDemand and regional direct-access menus.",
    nextProductMove: "Position ferritin as an energy upgrade with B12/folate.",
  },
  {
    testId: "hscrp",
    rank: 8,
    label: "High-Sensitivity CRP",
    customerReason: "Simple inflammation marker that customers recognize from heart-risk panels.",
    catalogSignal: "Commonly packaged in heart and inflammation direct-access panels.",
    nextProductMove: "Keep in Complete Wellness and Heart and Metabolic panels.",
  },
];

export const networkExpansionPlays: NetworkExpansionPlay[] = [
  {
    id: "junction-production-menu",
    title: "Finish the Junction production menu",
    lane: "API network",
    priority: "Now",
    targetNames: ["Junction"],
    whyItMatters: "This is the fastest route to real orders, requisitions, PSC lookup, webhooks, and structured results.",
    ask: "Request production or expanded sandbox IDs for CMP, CBC, lipids, A1c, TSH, vitamin D, B12/folate, hs-CRP, ferritin, thyroid, and hormones.",
    productUnlock: "Turns the current CMP-only sandbox mapping into real Complete Wellness and Essential Wellness orders.",
    Icon: ClipboardCheck,
    sourceIds: ["junction"],
  },
  {
    id: "ordrs-backup",
    title: "Open an ORDRS commercial track",
    lane: "API backup",
    priority: "Now",
    targetNames: ["ORDRS"],
    whyItMatters: "A second API network reduces platform risk and may offer broader menu or better location coverage.",
    ask: "Ask for sandbox, supported labs, state coverage, physician oversight terms, pricing, results payloads, and test menu export.",
    productUnlock: "Lets the app compare network availability and select the best provider by ZIP, panel, and price.",
    Icon: Building2,
    sourceIds: ["ordrs"],
  },
  {
    id: "getlabs-mobile",
    title: "Add home draw coverage",
    lane: "Mobile collection",
    priority: "Now",
    targetNames: ["Getlabs"],
    whyItMatters: "Home draw can win older adults and caregivers when the nearest clinic is too far or too hard to schedule.",
    ask: "Request ZIP coverage, patient-paid fee options, scheduling link/API, specimen handoff rules, and cancellation policy.",
    productUnlock: "Adds a premium checkout option for mobile collection without replacing the walk-in flow.",
    Icon: Truck,
    sourceIds: ["getlabs"],
  },
  {
    id: "health-gorilla-connectivity",
    title: "Qualify Health Gorilla",
    lane: "Connectivity",
    priority: "Next",
    targetNames: ["Health Gorilla"],
    whyItMatters: "FHIR lab ordering and result retrieval may matter once more clinician/provider workflows enter the product.",
    ask: "Confirm whether DTC cash-pay ordering is commercially appropriate, then request lab vendor coverage and workflow docs.",
    productUnlock: "Gives a higher-grade interoperability path for structured results and enterprise partners.",
    Icon: HeartPulse,
    sourceIds: ["health-gorilla"],
  },
  {
    id: "quest-labcorp-direct",
    title: "Build the national-lab proof packet",
    lane: "Enterprise labs",
    priority: "Next",
    targetNames: ["Quest Health", "Labcorp OnDemand", "Sonic Healthcare USA", "BioReference"],
    whyItMatters: "Direct relationships can improve brand trust, prices, and draw-site density after we prove demand.",
    ask: "Bring order volume, top requested tests, abandoned ZIPs, support tickets, and completion rates to partnership conversations.",
    productUnlock: "Creates leverage for lower prices, better locations, and recognizable lab names in checkout.",
    Icon: MapPin,
    sourceIds: ["quest-health", "labcorp-ondemand"],
  },
];

export const premiumUiPrinciples: PremiumUiPrinciple[] = [
  {
    id: "expensive-calm",
    title: "Quiet confidence beats medical clutter",
    implementation: "Use fewer competing cards, crisp steps, restrained color, dense but breathable tables, and strong alignment.",
  },
  {
    id: "proof-before-claims",
    title: "Proof points must sit near the CTA",
    implementation: "Put privacy, price, authorization, and clinic access directly beside order buttons.",
  },
  {
    id: "premium-dashboard",
    title: "The result dashboard sells the product",
    implementation: "Show trends, flags, review status, and next-step clarity before asking users to create an account.",
  },
  {
    id: "no-panic-health",
    title: "Health copy should lower cortisol",
    implementation: "Use educational language, avoid diagnosis claims, and make clinician discussion feel normal.",
  },
];

export function getSourceById(id: string) {
  const aliases: Record<string, string> = {
    "jd-power-telehealth": "J.D. Power 2024 U.S. Telehealth Satisfaction Study",
    "hhs-privacy": "HHS Telehealth Privacy for Patients",
    "quest-health": "Quest Health Shop Tests",
    "labcorp-ondemand": "Labcorp OnDemand Products",
    junction: "Junction Lab Testing API",
    ordrs: "ORDRS",
    getlabs: "Getlabs Partners",
    "health-gorilla": "Health Gorilla Lab Network",
    clia: "CMS CLIA",
    "hhs-tracking": "HHS Online Tracking Guidance",
    function: "Function Health FAQ",
  };

  return productResearchSources.find((source) => source.label === aliases[id]);
}
