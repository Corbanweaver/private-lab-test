import type {
  LabOutreachCadenceStep,
  LabOutreachCategory,
  LabOutreachScript,
  LabOutreachStage,
  LabOutreachTarget,
} from "@/lib/types";

export const outreachCategoryLabels: Record<LabOutreachCategory, string> = {
  api_network: "API network",
  national_lab: "National lab",
  regional_lab: "Regional lab",
  mobile_phlebotomy: "Mobile draw",
  specialty_lab: "Specialty lab",
  retail_collection: "Retail collection",
  data_connectivity: "Data connectivity",
};

export const outreachStageLabels: Record<LabOutreachStage, string> = {
  research: "Research",
  queued: "Queued",
  contacted: "Contacted",
  meeting_booked: "Meeting booked",
  packet_sent: "Packet sent",
  pricing_received: "Pricing received",
  contracting: "Contracting",
  integrating: "Integrating",
  active: "Active",
  not_fit: "Not fit",
};

export const stageTone: Record<LabOutreachStage, string> = {
  research: "bg-white text-[var(--muted)]",
  queued: "pill-info",
  contacted: "bg-[#fff8e7] text-[#6f4a00]",
  meeting_booked: "bg-[#eef6ff] text-[#15527c]",
  packet_sent: "bg-[#edf7f2] text-[var(--brand-dark)]",
  pricing_received: "bg-[#ecfbf7] text-[var(--brand-dark)]",
  contracting: "bg-[#fff1e8] text-[#7a3d10]",
  integrating: "bg-[#f0f2ff] text-[#2f3e8f]",
  active: "bg-[#e8f7ed] text-[#20552c]",
  not_fit: "bg-[#f4f4f0] text-[var(--muted)]",
};

export const outreachTargets: LabOutreachTarget[] = [
  {
    id: "junction",
    name: "Junction",
    category: "api_network",
    priority: 1,
    stage: "queued",
    website: "https://www.junction.com/",
    statesFocus: ["National", "NY", "NJ", "RI"],
    relationshipType: "White-label lab ordering API with collection and results workflows",
    whyTarget:
      "Best first call for instant breadth because the platform is built for digital health companies that need lab ordering infrastructure.",
    ask: "Request sandbox access, launch-state coverage, test menu, cash-pay pricing, physician network terms, requisition flow, and result payload examples.",
    nextStep: "Submit partner inquiry and book a technical discovery call.",
    evidenceNeeded: [
      "State coverage matrix",
      "Cash-pay test menu",
      "Physician authorization terms",
      "Sample requisition and result payload",
    ],
    sourceNote:
      "Official Junction materials position it as nationwide lab testing infrastructure for walk-in, kit, and mobile collection.",
  },
  {
    id: "labtestingapi",
    name: "LabTestingAPI",
    category: "api_network",
    priority: 1,
    stage: "queued",
    website: "https://www.labtestingapi.com/",
    statesFocus: ["National"],
    relationshipType: "Direct lab purchasing and ordering API candidate",
    whyTarget:
      "The model matches Private Lab Test closely: online ordering, prepaid wellness tests, and a replacement candidate for the mock provider adapter.",
    ask: "Request API docs, partner pricing, state exclusions, supported draw networks, and webhook or result delivery options.",
    nextStep: "Use the business contact path to ask for API partnership access.",
    evidenceNeeded: ["API access terms", "Restricted-state list", "Panel pricing", "Result delivery method"],
    sourceNote: "Official LabTestingAPI pages describe a direct lab testing service and API-oriented ordering model.",
  },
  {
    id: "ordrs",
    name: "ORDRS",
    category: "api_network",
    priority: 1,
    stage: "queued",
    website: "https://www.ordrs.io/",
    statesFocus: ["National"],
    relationshipType: "API-driven ordering, specimen collection, and results delivery",
    whyTarget:
      "Strong fit for an MVP that needs to support many collection modes without separate lab-by-lab integration work.",
    ask: "Request marketplace pricing, supported labs, collection methods, critical-result process, and API onboarding requirements.",
    nextStep: "Send founder note and request a demo for care-driven organizations.",
    evidenceNeeded: ["Supported lab list", "Specimen collection options", "Critical result escalation", "API authentication model"],
    sourceNote: "ORDRS presents itself as software and API for lab ordering, specimen collection, and result delivery.",
  },
  {
    id: "health-gorilla",
    name: "Health Gorilla Lab Network",
    category: "data_connectivity",
    priority: 2,
    stage: "research",
    website: "https://www.healthgorilla.com/home/markets/labs",
    statesFocus: ["National"],
    relationshipType: "FHIR-based lab ordering and result retrieval network",
    whyTarget:
      "Useful if Private Lab Test needs enterprise-grade ordering connectivity, structured results, or downstream diagnostic vendor access.",
    ask: "Confirm whether consumer cash-pay lab ordering is a fit, then request FHIR workflow, vendor coverage, and pricing model.",
    nextStep: "Qualify fit before spending integration time.",
    evidenceNeeded: ["Qualified provider requirements", "Connected lab list", "FHIR requisition flow", "Commercial terms"],
    sourceNote:
      "Official Health Gorilla materials describe APIs for centralized lab ordering and results retrieval.",
  },
  {
    id: "getlabs",
    name: "Getlabs",
    category: "mobile_phlebotomy",
    priority: 1,
    stage: "queued",
    website: "https://www.getlabs.com/partners",
    statesFocus: ["National", "CO", "TX", "FL", "CA"],
    relationshipType: "At-home and office phlebotomy collection partner",
    whyTarget:
      "Critical for older adults, people without easy transportation, and assisted-living use cases where draw completion matters more than storefront density.",
    ask: "Request partner coverage, scheduling API or referral workflow, fees, specimen handling rules, and lab drop-off options.",
    nextStep: "Submit partner inquiry and ask for launch-market coverage.",
    evidenceNeeded: ["Coverage by ZIP", "Collection fee schedule", "Preferred lab drop-off rules", "Cancellation and recollection policy"],
    sourceNote:
      "Official Getlabs partner materials describe mobile phlebotomy collection for healthcare organizations and lab partners.",
  },
  {
    id: "quest-health",
    name: "Quest Health / Quest Diagnostics",
    category: "national_lab",
    priority: 2,
    stage: "research",
    website: "https://www.questhealth.com/affiliate-program.html",
    statesFocus: ["National"],
    relationshipType: "National draw network, affiliate, and scaled partnership track",
    whyTarget:
      "Quest brand trust and draw-site density can unlock a better consumer experience once Private Lab Test has volume proof.",
    ask: "Start with affiliate or partnership team, then qualify API, patient service center rules, and cash-pay collaboration options.",
    nextStep: "Collect volume proof metrics, then contact Quest Health partnership channel.",
    evidenceNeeded: ["Partnership eligibility", "Supported sales channels", "Ordering workflow", "Result routing constraints"],
    sourceNote:
      "Quest Health describes direct-to-consumer lab tests and partnership channels for sales and API-supported scale.",
  },
  {
    id: "labcorp-ondemand",
    name: "Labcorp OnDemand / Labcorp",
    category: "national_lab",
    priority: 2,
    stage: "research",
    website: "https://www.ondemand.labcorp.com/",
    statesFocus: ["National"],
    relationshipType: "National reference lab and consumer testing benchmark",
    whyTarget:
      "Labcorp is a known draw network and direct-to-consumer benchmark; a direct relationship may become easier after order volume exists.",
    ask: "Map affiliate, enterprise, or provider ordering options and confirm whether third-party marketplace orders are allowed.",
    nextStep: "Document requirements and approach after API-network pilot proves demand.",
    evidenceNeeded: ["Business development contact", "Consumer order limitations", "Cash-pay menu", "Result-routing options"],
    sourceNote:
      "Labcorp OnDemand lets consumers purchase tests online with authorized healthcare professional ordering built into the workflow.",
  },
  {
    id: "sonic-healthcare-usa",
    name: "Sonic Healthcare USA divisions",
    category: "regional_lab",
    priority: 2,
    stage: "research",
    website: "https://pgms.sonichealthcareusa.com/common/divmap/default.aspx",
    statesFocus: ["TX", "FL", "NY", "RI", "CA"],
    relationshipType: "Regional division relationships with local patient service centers",
    whyTarget:
      "Regional divisions can sometimes move faster than a single national enterprise channel and may offer better local cash pricing.",
    ask: "Identify division contacts by launch state and request cash-pay menu, PSC list, and electronic result options.",
    nextStep: "Build a division-by-division contact sheet for CO, TX, FL, and CA first.",
    evidenceNeeded: ["Division coverage map", "Local PSC list", "Cash-pay pricing", "Portal or SFTP result process"],
    sourceNote:
      "Sonic Healthcare USA publishes a division map that can guide regional outreach by geography.",
  },
  {
    id: "any-lab-test-now",
    name: "Any Lab Test Now",
    category: "retail_collection",
    priority: 3,
    stage: "research",
    website: "https://www.anylabtestnow.com/franchise/about-us/",
    statesFocus: ["National", "GA", "TX", "FL", "AZ"],
    relationshipType: "Retail storefront and local franchise relationship candidate",
    whyTarget:
      "Useful for cash-pay demand validation and local collection partnerships in markets where storefront access matters.",
    ask: "Qualify whether corporate or franchise locations can accept Private Lab Test requisitions and negotiated pricing.",
    nextStep: "Contact corporate first, then test one launch-market franchise conversation.",
    evidenceNeeded: ["Corporate partnership path", "Franchise participation rules", "Draw fee", "Result-routing workflow"],
    sourceNote:
      "Official franchise materials describe a large U.S. retail lab testing location footprint.",
  },
  {
    id: "bioreference",
    name: "BioReference Health / BioReference Direct",
    category: "regional_lab",
    priority: 3,
    stage: "research",
    website: "https://www.bioreference.com/",
    statesFocus: ["NY", "NJ", "FL"],
    relationshipType: "Regional reference lab and state-specific direct testing signal",
    whyTarget:
      "Worth mapping for New York and New Jersey because those states often require extra diligence and BioReference has state-specific consumer testing activity.",
    ask: "Confirm provider requisition requirements, Direct availability, PSC rules, and whether marketplace ordering is possible.",
    nextStep: "Research state-specific ordering path before outreach.",
    evidenceNeeded: ["Provider requisition requirement", "Direct testing state limits", "PSC coverage", "Result portal options"],
    sourceNote:
      "BioReference public materials describe patient service centers and BioReference Direct availability in NY and NJ.",
  },
  {
    id: "rupa-health",
    name: "Rupa Health / Fullscript",
    category: "specialty_lab",
    priority: 3,
    stage: "research",
    website: "https://www.rupahealth.com/",
    statesFocus: ["National"],
    relationshipType: "Specialty lab marketplace and practitioner ordering benchmark",
    whyTarget:
      "Not a pure consumer lab API fit, but useful for specialty panels, physician-services benchmarking, and partner packaging ideas.",
    ask: "Qualify whether Private Lab Test can participate through a practitioner or physician-services model.",
    nextStep: "Map specialty panel options and compare against API-network capabilities.",
    evidenceNeeded: ["Practitioner requirements", "Physician services rules", "Lab company list", "Cash-pay patient flow"],
    sourceNote:
      "Rupa positions itself as a centralized ordering platform for practitioners and specialty lab companies.",
  },
  {
    id: "vibrant-america",
    name: "Vibrant America",
    category: "specialty_lab",
    priority: 3,
    stage: "research",
    website: "https://www.vibrant-america.com/",
    statesFocus: ["CA", "National"],
    relationshipType: "Specialty wellness and advanced diagnostic lab candidate",
    whyTarget:
      "Potential future partner for differentiated panels after the core low-cost wellness catalog is working.",
    ask: "Request provider account requirements, cash pricing, specimen logistics, and whether consumer-facing ordering is permitted.",
    nextStep: "Save for specialty-panel phase after core coverage is live.",
    evidenceNeeded: ["Provider account terms", "Specimen kit logistics", "State restrictions", "Result format"],
    sourceNote:
      "Vibrant America describes a CLIA and CAP-certified California laboratory with clinically relevant testing options.",
  },
  {
    id: "access-medical-labs",
    name: "Access Medical Labs via Evexia Diagnostics",
    category: "specialty_lab",
    priority: 4,
    stage: "research",
    website: "https://www.evexiadiagnostics.com/diagnostic-testing/laboratory-partners/access-medical-labs/",
    statesFocus: ["National"],
    relationshipType: "Specialty lab partner through practitioner distribution",
    whyTarget:
      "A useful lead for specialty expansion, but likely requires practitioner-facing workflows and careful compliance review.",
    ask: "Confirm whether Private Lab Test can use a partner clinician workflow and what panels fit general wellness positioning.",
    nextStep: "Revisit after clinician review and specialty panel policy are documented.",
    evidenceNeeded: ["Ordering eligibility", "Cash price schedule", "Specimen collection workflow", "Panel restrictions"],
    sourceNote:
      "Evexia lists Access Medical Labs as a laboratory partner with full-spectrum testing for providers.",
  },
  {
    id: "regional-clia-sweep",
    name: "Regional CLIA lab sweep",
    category: "regional_lab",
    priority: 1,
    stage: "queued",
    website: "https://www.cms.gov/medicare/quality/clinical-laboratory-improvement-amendments",
    statesFocus: ["CO", "TX", "FL", "CA", "GA", "NC"],
    relationshipType: "State-by-state independent laboratory pipeline",
    whyTarget:
      "This is the volume play: build a spreadsheet from state CLIA directories, hospital outreach pages, and local lab managers to find cheaper cash menus.",
    ask: "Ask each lab for cash-pay menu, draw-site options, provider requisition process, result delivery, and critical-value policy.",
    nextStep: "Create 25 lab leads per launch state and work them in two-call sequences.",
    evidenceNeeded: ["CLIA certificate", "Cash-pay menu", "Accepted requisitions", "Result delivery process"],
    sourceNote:
      "CMS CLIA resources provide the compliance starting point for verifying lab certification before any relationship goes live.",
  },
];

export const outreachCadence: LabOutreachCadenceStep[] = [
  {
    label: "Days 1-3",
    title: "Get one API-network call booked",
    goal: "Find the fastest path to national coverage while the product is still early.",
    actions: [
      "Send founder emails to Junction, LabTestingAPI, and ORDRS.",
      "Ask each for a sandbox, state matrix, price menu, and physician authorization terms.",
      "Score each partner on coverage, price, result format, and launch speed.",
    ],
  },
  {
    label: "Days 4-10",
    title: "Add draw access for older adults",
    goal: "Make home draw and easy collection a product advantage, not an afterthought.",
    actions: [
      "Contact Getlabs and one local mobile phlebotomy group per launch state.",
      "Confirm specimen handling, cancellation rules, lab drop-off rules, and recollection policy.",
      "Document ZIP-level coverage and draw fees before showing any option to customers.",
    ],
  },
  {
    label: "Days 11-20",
    title: "Build the regional cash-price bench",
    goal: "Create leverage by collecting real cash-pay menus from independent labs.",
    actions: [
      "Research 25 CLIA labs per launch state and rank by patient service center access.",
      "Run a two-email, one-call sequence asking for cash-pay pricing and result delivery.",
      "Push promising labs into pricing_received or contracting stages.",
    ],
  },
  {
    label: "Days 21-30",
    title: "Turn proof into bigger partnerships",
    goal: "Use real demand data to approach national labs without sounding hypothetical.",
    actions: [
      "Package order volume, abandoned ZIPs, requested tests, and support tickets into a one-page proof memo.",
      "Approach Quest, Labcorp, Sonic divisions, and BioReference with specific market demand.",
      "Prioritize the partner that reduces price or increases collection access the most.",
    ],
  },
];

export const partnerQualificationChecklist = [
  "CLIA certificate verified and state availability documented",
  "Cash-pay menu provided in writing with draw fees separated from lab fees",
  "Ordering model supports clinician authorization and no insurance billing",
  "Requisition process is clear enough for a patient and concierge to follow",
  "Results can be delivered by API, SFTP, portal export, or secure PDF",
  "Critical values route to the ordering clinician before customer release",
  "Patient service centers or mobile draw coverage are mapped by ZIP",
  "BAA, privacy, security, and audit-log requirements are understood",
];

export const weeklyOutreachKpis = [
  "50 new lab leads researched",
  "25 first-touch emails sent",
  "10 phone calls or form submissions completed",
  "5 partner packets sent",
  "2 pricing menus received",
  "1 technical or contracting call booked",
];

export const outreachScripts: LabOutreachScript[] = [
  {
    id: "founder-email",
    channel: "email",
    title: "Founder partnership email",
    subject: "Cash-pay lab orders with prepared patients",
    body: "Hi {{name}}, I am building Private Lab Test, a cash-pay wellness lab marketplace for people who want transparent prices, clinician-authorized orders, and clear result access. We are looking for lab partners that can support prepaid orders, reliable collection, and secure result delivery. Could we schedule 20 minutes to learn your cash-pay menu, state coverage, requisition process, and result workflow?",
  },
  {
    id: "pricing-followup",
    channel: "email",
    title: "Pricing follow-up",
    subject: "Quick pricing checklist for Private Lab Test",
    body: "Thanks for taking a look. The fastest way for us to evaluate fit is a written menu for CBC, CMP, lipid panel, A1c, TSH, vitamin D, B12, hsCRP, ferritin, and common hormone tests, plus any draw fees, state restrictions, and result delivery options. We can start with a narrow launch-state pilot if that is easier.",
  },
  {
    id: "phone-opener",
    channel: "phone",
    title: "Lab manager call opener",
    body: "I am calling from Private Lab Test. We send prepaid cash-pay wellness lab orders and are looking for reliable collection and result partners. Who handles provider or business relationships for cash-pay lab accounts?",
  },
  {
    id: "form-message",
    channel: "form",
    title: "Contact form note",
    body: "Private Lab Test is evaluating lab partners for prepaid wellness panels. We need state coverage, patient service center or mobile collection options, cash-pay pricing, requisition workflow, result delivery format, and critical-value escalation policy. Please route this to business development or lab operations.",
  },
];

export function summarizeOutreachTargets() {
  const states = new Set(
    outreachTargets.flatMap((target) => target.statesFocus.filter((state) => state !== "National")),
  );
  const categories = new Set(outreachTargets.map((target) => target.category));
  const priorityTargets = outreachTargets.filter((target) => target.priority <= 2).length;
  const readyToContact = outreachTargets.filter((target) => target.stage === "queued").length;

  return {
    targets: outreachTargets.length,
    categories: categories.size,
    states: states.size,
    priorityTargets,
    readyToContact,
  };
}
