import type { ConciergeTask, LabAccessRule, LabPartner } from "@/lib/types";

export const labPartners: LabPartner[] = [
  {
    id: "aggregator-api",
    name: "Aggregator API Network",
    tier: "aggregator",
    cliaStatus: "verified",
    statesServed: ["CO", "TX", "FL", "CA", "GA", "NC", "NY", "NJ", "RI"],
    cashPriceMenu: [
      { testId: "cmp", price: 24 },
      { testId: "cbc", price: 21 },
      { testId: "lipids", price: 24 },
      { testId: "a1c", price: 22 },
      { testId: "tsh", price: 28 },
    ],
    drawLocations: [
      {
        id: "agg-denver-1",
        name: "Aggregator Draw Center - Denver",
        state: "CO",
        zip: "80202",
        address: "1420 Market Street, Denver, CO",
      },
      {
        id: "agg-dallas-1",
        name: "Aggregator Draw Center - Dallas",
        state: "TX",
        zip: "75201",
        address: "1910 Commerce Street, Dallas, TX",
      },
    ],
    supportedTestIds: ["cmp", "cbc", "lipids", "a1c", "tsh", "vit-d", "b12-folate", "hscrp", "ferritin"],
    orderWorkflow: "API order submission after clinician authorization and prepaid checkout.",
    requisitionProcess: "PDF requisition generated immediately with draw-site instructions.",
    resultDelivery: "api",
    turnaround: "1-3 days for common wellness panels",
    criticalResultPolicy: "Critical values are escalated to the ordering clinician and concierge queue.",
    contact: {
      name: "Partner Success",
      title: "Aggregator onboarding",
      email: "partners@aggregator.example",
    },
    strengths: ["Fastest national coverage", "Electronic results", "Best launch path"],
  },
  {
    id: "rocky-mountain-labs",
    name: "Rocky Mountain Regional Labs",
    tier: "regional",
    cliaStatus: "verified",
    statesServed: ["CO", "WY", "UT", "NM"],
    cashPriceMenu: [
      { testId: "cmp", price: 22 },
      { testId: "cbc", price: 19 },
      { testId: "lipids", price: 23 },
      { testId: "a1c", price: 21 },
      { testId: "vit-d", price: 44 },
    ],
    drawLocations: [
      {
        id: "rml-lakewood-1",
        name: "Rocky Mountain Patient Center",
        state: "CO",
        zip: "80226",
        address: "88 Union Boulevard, Lakewood, CO",
      },
    ],
    supportedTestIds: ["cmp", "cbc", "lipids", "a1c", "tsh", "vit-d", "ferritin"],
    orderWorkflow: "Portal order with weekly cash-pay reconciliation.",
    requisitionProcess: "Concierge uploads requisition and confirms appointment readiness.",
    resultDelivery: "sftp",
    turnaround: "1-4 days",
    criticalResultPolicy: "Phone call to ordering clinician within one hour plus written notice.",
    contact: {
      name: "Dana Morales",
      title: "Outreach lab manager",
      email: "dana@rockymountainlabs.example",
    },
    strengths: ["Better regional pricing", "Flexible cash-pay menu", "Senior-friendly draw sites"],
  },
  {
    id: "home-draw-concierge",
    name: "Home Draw Concierge Network",
    tier: "mobile",
    cliaStatus: "pending",
    statesServed: ["CO", "TX", "FL"],
    cashPriceMenu: [
      { testId: "cmp", price: 34 },
      { testId: "cbc", price: 31 },
      { testId: "lipids", price: 35 },
      { testId: "a1c", price: 32 },
    ],
    drawLocations: [
      {
        id: "mobile-co",
        name: "In-home draw team",
        state: "CO",
        zip: "80202",
        address: "Mobile service within 25 miles of Denver, CO",
      },
    ],
    supportedTestIds: ["cmp", "cbc", "lipids", "a1c", "tsh"],
    orderWorkflow: "Concierge schedules mobile phlebotomy after payment and authorization.",
    requisitionProcess: "Mobile phlebotomist receives requisition packet before visit.",
    resultDelivery: "manual_pdf",
    turnaround: "2-5 days",
    criticalResultPolicy: "Ordering clinician receives immediate phone escalation from partner lab.",
    contact: {
      name: "Mobile Intake",
      title: "Scheduling lead",
      email: "intake@homedraw.example",
    },
    strengths: ["Best for limited mobility", "Phone-first scheduling", "Family assurance"],
  },
  {
    id: "national-reference",
    name: "National Reference Lab Track",
    tier: "national",
    cliaStatus: "pending",
    statesServed: ["CO", "TX", "FL", "CA", "GA", "NC", "NY", "NJ", "RI"],
    cashPriceMenu: [
      { testId: "cmp", price: 29 },
      { testId: "cbc", price: 24 },
      { testId: "lipids", price: 27 },
      { testId: "a1c", price: 26 },
      { testId: "tsh", price: 32 },
    ],
    drawLocations: [
      {
        id: "national-later",
        name: "National patient service centers",
        state: "CO",
        zip: "80202",
        address: "Enterprise relationship targeted after launch volume.",
      },
    ],
    supportedTestIds: ["cmp", "cbc", "lipids", "a1c", "tsh", "vit-d", "b12-folate", "hscrp", "ferritin"],
    orderWorkflow: "Enterprise interface or portal relationship after aggregator volume proof.",
    requisitionProcess: "Bi-directional interface target for requisitions and results.",
    resultDelivery: "portal",
    turnaround: "1-5 days",
    criticalResultPolicy: "Follow national lab critical result policy with clinician escalation.",
    contact: {
      name: "Enterprise partnerships",
      title: "National lab outreach",
      email: "enterprise@nationallab.example",
    },
    strengths: ["Recognizable brand trust", "Large draw network", "Enterprise scale"],
  },
];

export const labAccessRules: LabAccessRule[] = [
  {
    state: "CO",
    mode: "clinician_authorized",
    partnerIds: ["aggregator-api", "rocky-mountain-labs", "home-draw-concierge"],
    note: "Launch state with clinician authorization and regional backup.",
  },
  {
    state: "TX",
    mode: "clinician_authorized",
    partnerIds: ["aggregator-api", "home-draw-concierge"],
    note: "Aggregator-first launch state with mobile draw opportunity.",
  },
  {
    state: "FL",
    mode: "clinician_authorized",
    partnerIds: ["aggregator-api", "home-draw-concierge"],
    note: "Senior-heavy launch state; concierge scheduling is a priority.",
  },
  {
    state: "CA",
    mode: "clinician_authorized",
    partnerIds: ["aggregator-api", "national-reference"],
    note: "Supported through clinician authorization and aggregator routing.",
  },
  {
    state: "AZ",
    mode: "blocked",
    partnerIds: [],
    note: "Hold until Arizona ordering rules and partner coverage are confirmed.",
  },
  {
    state: "NY",
    mode: "clinician_authorized",
    partnerIds: ["aggregator-api", "national-reference"],
    note: "Available only through a provider-authorization network that supports New York-specific lab rules.",
  },
  {
    state: "NJ",
    mode: "clinician_authorized",
    partnerIds: ["aggregator-api", "national-reference"],
    note: "Available only through a provider-authorization network that supports New Jersey-specific lab rules.",
  },
  {
    state: "RI",
    mode: "clinician_authorized",
    partnerIds: ["aggregator-api", "national-reference"],
    note: "Available only through a provider-authorization network that supports Rhode Island-specific lab rules.",
  },
];

export const outreachWaves = [
  {
    label: "Wave 1",
    title: "Aggregator/API partner",
    goal: "Fast national reach with electronic ordering, requisitions, and result delivery.",
    target: "Book one integration call and confirm launch-state coverage.",
  },
  {
    label: "Wave 2",
    title: "Regional independent labs",
    goal: "Win better cash pricing and local draw-site relationships in senior-heavy states.",
    target: "Open 10-20 conversations and collect at least two written cash menus.",
  },
  {
    label: "Wave 3",
    title: "Mobile phlebotomy",
    goal: "Serve older adults who need home or assisted-living blood draws.",
    target: "Validate scheduling, specimen handling, and escalation workflow.",
  },
  {
    label: "Wave 4",
    title: "National labs",
    goal: "Approach Quest/Labcorp-style enterprise teams after volume proof.",
    target: "Use order volume, completion rate, and support metrics as proof.",
  },
];

export const partnerPacketNeeds = [
  "Test menu and supported biomarkers",
  "Written cash prices",
  "Draw locations and appointment rules",
  "Ordering and requisition workflow",
  "Result delivery method",
  "Critical result escalation policy",
  "CLIA status and state coverage",
  "Partner contact for operations",
];

export const customerTrustFeatures = [
  "Provider authorization included where required",
  "Prepaid cash price",
  "No insurance or Medicare billing",
  "A real person can help schedule",
  "Private sharing with a loved one",
];

export const conciergeTasks: ConciergeTask[] = [
  {
    id: "scheduled",
    status: "scheduled",
    label: "Appointment scheduled",
    owner: "concierge",
    copy: "A real person confirms the lab location, fasting needs, and appointment time.",
  },
  {
    id: "draw-completed",
    status: "draw_completed",
    label: "Draw completed",
    owner: "lab",
    copy: "Partner lab confirms the blood draw or specimen collection was completed.",
  },
  {
    id: "results-ready",
    status: "results_ready",
    label: "Results ready",
    owner: "family",
    copy: "Results are ready with plain-language notes and next-step guidance.",
  },
];
