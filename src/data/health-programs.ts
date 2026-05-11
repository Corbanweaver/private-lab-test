import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BadgeDollarSign,
  Bot,
  CalendarClock,
  FileText,
  HeartPulse,
  MessageCircle,
  Repeat2,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserCheck,
  UserRound,
} from "lucide-react";

export type ProgramStage = "live_lab_path" | "next_subscription" | "future_clinical_track";

export type HealthProgram = {
  id: string;
  title: string;
  subtitle: string;
  stage: ProgramStage;
  primaryPanelId: string;
  priceAnchor: string;
  cadence: string;
  description: string;
  demandSignal: string;
  conversionPath: string;
  includes: string[];
  futureExpansion: string[];
  safeguards: string[];
  Icon: LucideIcon;
};

export type ScaleBenchmark = {
  company: string;
  category: string;
  lesson: string;
  borrow: string;
  avoid: string;
  sourceHref: string;
};

export type MembershipConcept = {
  id: string;
  title: string;
  status: "design_next" | "future";
  value: string;
  customerMoment: string;
  operationalNeed: string;
};

export type CareLayerStage = "live_now" | "requires_clinician_network" | "future_treatment";

export type TelehealthCareLayer = {
  id: string;
  title: string;
  stage: CareLayerStage;
  customerPromise: string;
  whatItCanDo: string[];
  whatItMustNotDo: string[];
  operationalRequirements: string[];
  Icon: LucideIcon;
};

export type RetentionLoop = {
  id: string;
  title: string;
  trigger: string;
  customerValue: string;
  businessValue: string;
  productMoves: string[];
  guardrail: string;
  Icon: LucideIcon;
};

export type SubscriptionTier = {
  id: string;
  title: string;
  status: "design_next" | "requires_clinical_ops" | "future";
  positioning: string;
  cadence: string;
  pricePosture: string;
  includes: string[];
  safeguards: string[];
};

export const programStageLabels: Record<ProgramStage, string> = {
  live_lab_path: "Labs now",
  next_subscription: "Next",
  future_clinical_track: "Future clinical track",
};

export const careLayerStageLabels: Record<CareLayerStage, string> = {
  live_now: "Can build now",
  requires_clinician_network: "Needs clinician network",
  future_treatment: "Future treatment path",
};

export const healthPrograms: HealthProgram[] = [
  {
    id: "whole-body-baseline",
    title: "Whole Body Baseline",
    subtitle: "The annual private lab check",
    stage: "live_lab_path",
    primaryPanelId: "complete-wellness",
    priceAnchor: "Waitlist signal, pricing before launch",
    cadence: "Annual baseline with optional 6-month retest",
    description:
      "The broad starting point for customers who want a clear picture without choosing every marker one by one.",
    demandSignal: "Private MD Labs-style buyers want speed, privacy, broad panels, and immediate lab instructions.",
    conversionPath: "Homepage -> Complete Wellness -> waitlist -> launch invite -> result dashboard.",
    includes: ["CMP", "CBC", "Lipids", "A1c", "TSH", "Vitamin D", "B12/folate", "hs-CRP", "Ferritin"],
    futureExpansion: ["Personal trend report", "Annual membership reminder", "Optional clinician review add-on"],
    safeguards: ["Educational insights only", "No diagnosis claims", "Critical values routed to the ordering clinician"],
    Icon: ShieldCheck,
  },
  {
    id: "weight-metabolic",
    title: "Weight and Metabolic",
    subtitle: "Labs-first metabolic program",
    stage: "next_subscription",
    primaryPanelId: "heart-metabolic",
    priceAnchor: "Waitlist signal, pricing before launch",
    cadence: "Baseline, 12-week follow-up, then 6-month trend",
    description:
      "A MEDVi/Hims-style demand lane, but anchored on lab visibility before any future clinical treatment partner is introduced.",
    demandSignal: "GLP-1 and weight-loss telehealth demand is massive, but customers need safety labs and transparent follow-up.",
    conversionPath: "Weight landing page -> metabolic labs -> trend dashboard -> future licensed-provider review if eligible.",
    includes: ["CMP", "Lipids", "A1c", "hs-CRP", "TSH"],
    futureExpansion: ["Medication-safety lab cadence", "Nutrition coaching partner", "Licensed clinician treatment referral"],
    safeguards: ["No prescription workflow until partner clinician operations are contracted", "Clear eligibility screen", "Follow-up lab reminders"],
    Icon: Activity,
  },
  {
    id: "mens-hormone",
    title: "Men's Hormone Baseline",
    subtitle: "Private hormone screening without awkwardness",
    stage: "live_lab_path",
    primaryPanelId: "hormone-baseline",
    priceAnchor: "Waitlist signal, pricing before launch",
    cadence: "Morning baseline, then retest if a clinician recommends it",
    description:
      "A Hims-like entry point for men who want private testosterone, estradiol, thyroid, and safety markers in one place.",
    demandSignal: "Men's health brands scale by making stigmatized questions easy to start online.",
    conversionPath: "Hormone program -> morning draw instructions -> result trends -> discuss with clinician.",
    includes: ["Total/free testosterone", "Estradiol", "Thyroid markers", "CMP", "CBC"],
    futureExpansion: ["SHBG and prolactin upgrades", "Fertility-adjacent panel", "Licensed men's health consult partner"],
    safeguards: ["No testosterone treatment claims", "Morning-draw education", "Abnormal results require clinician discussion"],
    Icon: UserRound,
  },
  {
    id: "womens-hormone",
    title: "Women's Hormone and Energy",
    subtitle: "Built for fatigue, cycle, and hormone conversations",
    stage: "future_clinical_track",
    primaryPanelId: "energy-check",
    priceAnchor: "Waitlist signal, pricing before launch",
    cadence: "Baseline now, cycle-timed add-ons later",
    description:
      "A Hers-style expansion lane that starts with energy, thyroid, nutrients, and iron before adding more cycle-specific testing.",
    demandSignal: "Women's health is a major digital-health growth area, and customers need clear non-dismissive lab access.",
    conversionPath: "Energy panel -> optional cycle context -> result education -> clinician discussion prompts.",
    includes: ["Thyroid expanded", "Vitamin D", "B12/folate", "Ferritin", "CMP", "CBC"],
    futureExpansion: ["Cycle-timed hormones", "Perimenopause panel", "Specialty lab partner menu"],
    safeguards: ["No fertility or menopause diagnosis claims", "Cycle timing disclaimers", "Escalation for critical abnormalities"],
    Icon: Sparkles,
  },
  {
    id: "heart-longevity",
    title: "Heart and Longevity",
    subtitle: "Affordable prevention markers",
    stage: "next_subscription",
    primaryPanelId: "heart-metabolic",
    priceAnchor: "Waitlist signal, pricing before launch",
    cadence: "Baseline and 6-month trend",
    description:
      "A premium longevity entry point that stays practical: heart, glucose, inflammation, and chemistry before expensive advanced diagnostics.",
    demandSignal: "Premium biomarker brands sell long-term tracking; customers still need a low-cost first rung.",
    conversionPath: "Heart panel -> trend dashboard -> advanced add-ons when partner menu supports them.",
    includes: ["Lipids", "A1c", "hs-CRP", "CMP"],
    futureExpansion: ["ApoB", "Lp(a)", "insulin", "advanced cardiometabolic partner panel"],
    safeguards: ["Risk education without treatment recommendations", "Clinician discussion prompts", "Trend-first reporting"],
    Icon: HeartPulse,
  },
  {
    id: "membership-tracking",
    title: "Private Lab Pass",
    subtitle: "The recurring engine",
    stage: "future_clinical_track",
    primaryPanelId: "complete-wellness",
    priceAnchor: "Membership design, not live pricing",
    cadence: "Annual or twice-yearly labs",
    description:
      "The Hims-style business model for labs: recurring testing, reminders, dashboards, support, and optional specialist pathways.",
    demandSignal: "Recurring plans can turn one-time lab shoppers into long-term private-health members.",
    conversionPath: "One-time order -> result dashboard -> retest reminder -> annual membership offer.",
    includes: ["Retest reminders", "Trend dashboard", "Priority support", "Member-only add-on pricing"],
    futureExpansion: ["Family/caregiver account", "Employer or creator affiliate channel", "Advanced diagnostics marketplace"],
    safeguards: ["No subscription lock-in surprises", "Clear cancellation", "Privacy-first analytics"],
    Icon: CalendarClock,
  },
];

export const membershipConcepts: MembershipConcept[] = [
  {
    id: "annual-pass",
    title: "Annual Lab Pass",
    status: "design_next",
    value: "One broad baseline panel per year, stored results, trend view, and reminder flow.",
    customerMoment: "For people who want one private annual check without a traditional appointment.",
    operationalNeed: "Provider menu mapping, result ingestion, renewal emails, and account billing logic.",
  },
  {
    id: "metabolic-followup",
    title: "Metabolic Follow-Up",
    status: "design_next",
    value: "Baseline plus 12-week retest for A1c, lipids, CMP, and inflammation markers.",
    customerMoment: "For weight, nutrition, GLP-1, or lifestyle-change tracking.",
    operationalNeed: "Provider retest packages, clinician-review option, and reminder scheduling.",
  },
  {
    id: "family-care",
    title: "Family Caregiver View",
    status: "future",
    value: "Permissioned sharing for an adult child, spouse, or care partner.",
    customerMoment: "For older adults who want help coordinating appointments and results.",
    operationalNeed: "Granular consent, audit log, secure sharing, and support workflows.",
  },
];

export const telehealthCareLayers: TelehealthCareLayer[] = [
  {
    id: "education-layer",
    title: "Educational lab insights",
    stage: "live_now",
    customerPromise: "Help people understand what each marker generally means and what changed over time.",
    whatItCanDo: [
      "Explain markers in plain language",
      "Show high, low, normal, and trend direction",
      "Suggest questions to ask a clinician",
      "Point users to repeat testing cadence when appropriate",
    ],
    whatItMustNotDo: [
      "Diagnose a condition",
      "Tell a user to start, stop, or change medication",
      "Replace urgent care or a licensed clinician",
    ],
    operationalRequirements: ["Reviewed educational content library", "Result flag rules", "Escalation copy for urgent symptoms"],
    Icon: Bot,
  },
  {
    id: "care-navigation",
    title: "Care navigation and support",
    stage: "live_now",
    customerPromise: "Make the lab order feel handled: prep, fasting, locations, redraws, timing, and result-release help.",
    whatItCanDo: [
      "Help users choose collection times",
      "Explain fasting and preparation notes",
      "Track requisition and result timing",
      "Route support tickets for redraws or missing results",
    ],
    whatItMustNotDo: ["Give clinical interpretation", "Make triage decisions without clinician protocol"],
    operationalRequirements: ["Support macros", "Provider order-status hooks", "Non-PHI analytics for funnel friction"],
    Icon: MessageCircle,
  },
  {
    id: "clinician-review",
    title: "Licensed clinician result review",
    stage: "requires_clinician_network",
    customerPromise: "Give customers a real medical interpretation option after results are ready.",
    whatItCanDo: [
      "Review abnormal or confusing results",
      "Recommend follow-up labs or primary-care follow-up",
      "Document clinician notes in the account",
      "Handle critical-value workflows through the ordering provider",
    ],
    whatItMustNotDo: ["Run as AI-only medical advice", "Ignore state licensure or scope-of-practice rules"],
    operationalRequirements: ["Clinician network", "State matching", "Clinical protocols", "Audit logs", "Malpractice and BAA review"],
    Icon: Stethoscope,
  },
  {
    id: "telehealth-consult",
    title: "Telehealth consult add-on",
    stage: "requires_clinician_network",
    customerPromise: "Let members book a focused visit when labs create a real question.",
    whatItCanDo: [
      "Offer asynchronous or video visits where allowed",
      "Collect symptom/context intake",
      "Create a care note and next-step plan",
    ],
    whatItMustNotDo: ["Use one national workflow without state checks", "Hide clinician identity or consent details"],
    operationalRequirements: ["Scheduling", "Consent", "Provider licensure by patient location", "Secure messaging"],
    Icon: UserCheck,
  },
  {
    id: "treatment-pathways",
    title: "Labs-informed treatment pathways",
    stage: "future_treatment",
    customerPromise: "Only introduce treatment where a licensed partner can own medical decision-making.",
    whatItCanDo: [
      "Refer eligible users to metabolic, thyroid, hormone, or primary-care partners",
      "Use labs to make visits safer and more useful",
      "Support ongoing lab monitoring if a clinician orders it",
    ],
    whatItMustNotDo: ["Auto-prescribe from lab results", "Market diagnosis or treatment before clinical operations exist"],
    operationalRequirements: ["Treatment partner contracts", "State-by-state protocols", "Pharmacy/payment/refund policies"],
    Icon: HeartPulse,
  },
];

export const retentionLoops: RetentionLoop[] = [
  {
    id: "result-release-loop",
    title: "Result-release moment",
    trigger: "Results received and released",
    customerValue: "The user immediately sees what changed, what is out of range, and what is worth discussing.",
    businessValue: "Turns the first order into an account habit instead of a PDF download.",
    productMoves: ["Email/SMS result-ready notice", "Marker summary", "Trend snapshot", "Clinician-review CTA"],
    guardrail: "Keep the summary educational until a clinician review is purchased or included.",
    Icon: FileText,
  },
  {
    id: "abnormal-followup-loop",
    title: "Out-of-range follow-up",
    trigger: "Any abnormal flag or user concern",
    customerValue: "The platform gives a calm next step instead of making the customer search the internet alone.",
    businessValue: "Creates a natural clinician-review upsell with real value.",
    productMoves: ["Explain the flag", "Show urgency language", "Offer review", "Capture follow-up outcome"],
    guardrail: "Urgent symptoms and critical values must route to clinician/emergency instructions.",
    Icon: Stethoscope,
  },
  {
    id: "retest-cadence-loop",
    title: "Retest rhythm",
    trigger: "30, 90, 180, and 365 days after key panels",
    customerValue: "People know when to retest and can compare progress without rebuilding the order.",
    businessValue: "Creates subscription renewals and repeat lab orders without spam.",
    productMoves: ["Personalized retest reminders", "One-click reorder", "Program progress page"],
    guardrail: "Let users pause reminders and avoid fear-based copy.",
    Icon: Repeat2,
  },
  {
    id: "program-progress-loop",
    title: "Program progress",
    trigger: "User joins metabolic, hormone, heart, or baseline track",
    customerValue: "Labs become a story: baseline, intervention, retest, trend.",
    businessValue: "Turns commodity tests into named programs with higher retention.",
    productMoves: ["Program timeline", "Milestone emails", "Next-panel recommendation", "Support check-ins"],
    guardrail: "Do not imply treatment success from labs alone.",
    Icon: Activity,
  },
  {
    id: "member-savings-loop",
    title: "Member savings and priority support",
    trigger: "Second purchase intent or annual renewal window",
    customerValue: "A membership feels financially sensible, not like a trap.",
    businessValue: "Increases repeat revenue while protecting trust.",
    productMoves: ["Member price comparison", "Priority support", "Clear renewal notice", "Easy cancellation"],
    guardrail: "No surprise auto-renewals or confusing cancellation paths.",
    Icon: BadgeDollarSign,
  },
];

export const subscriptionTiers: SubscriptionTier[] = [
  {
    id: "lab-pass-basic",
    title: "Lab Pass Basic",
    status: "design_next",
    positioning: "The simple annual private-health check.",
    cadence: "One broad baseline panel per year with retest reminders.",
    pricePosture: "Design pricing after real provider costs and affiliate economics are known.",
    includes: ["Annual baseline panel", "Private results dashboard", "Educational insights", "Email/SMS reminders", "Support"],
    safeguards: ["No diagnosis claims", "Clear renewal notice", "Easy cancellation", "No hidden insurance billing"],
  },
  {
    id: "lab-pass-plus",
    title: "Lab Pass Plus",
    status: "requires_clinical_ops",
    positioning: "For people who want labs plus a real interpretation path.",
    cadence: "One or two panels per year plus clinician result review when available.",
    pricePosture: "Bundle only after clinician review cost, state coverage, and support load are known.",
    includes: ["Everything in Basic", "Clinician result-review credit", "Priority support", "Follow-up lab suggestions"],
    safeguards: ["Clinician review only where licensed", "No AI-only medical advice", "Clear scope of service"],
  },
  {
    id: "metabolic-membership",
    title: "Metabolic Tracking",
    status: "requires_clinical_ops",
    positioning: "The MEDVi/Hims-style lane, but labs-first and clinically restrained.",
    cadence: "Baseline, 12-week follow-up, then 6-month monitoring.",
    pricePosture: "Separate lab membership from any future prescription/treatment partner fees.",
    includes: ["CMP", "A1c", "Lipids", "hs-CRP", "Program timeline", "Optional clinician consult"],
    safeguards: ["No prescription workflow without partner clinician", "No medication claims", "State eligibility checks"],
  },
  {
    id: "family-care",
    title: "Family Care",
    status: "future",
    positioning: "Permissioned support for adults helping a parent, spouse, or partner.",
    cadence: "Annual panel plus shared reminders and support tasks.",
    pricePosture: "Launch only after consent, audit-log, and support workflows are ready.",
    includes: ["Shared result access", "Caregiver reminders", "Visit prep", "Support escalation"],
    safeguards: ["Granular consent", "Revocable access", "Audit logs", "No access without account permission"],
  },
];

export const scaleBenchmarks: ScaleBenchmark[] = [
  {
    company: "Private MD Labs",
    category: "Fast direct lab ordering",
    lesson: "Speed and catalog depth matter. Customers want to order, pick a lab, and receive instructions quickly.",
    borrow: "Large catalog search, instant lab instructions, low-friction checkout, recurring retest prompts.",
    avoid: "Becoming only a commodity test list without dashboard, membership, or care pathways.",
    sourceHref: "https://www.privatemdlabs.com/lab_process.php",
  },
  {
    company: "Hims & Hers",
    category: "Consumer health platform",
    lesson: "The bigger business is recurring personalized care, not just one transaction.",
    borrow: "Programs, subscriptions, strong brand trust, app follow-through, biomarker trends, and eligible treatment paths.",
    avoid: "Prescription expansion before clinical operations, safety review, and regulatory posture are ready.",
    sourceHref: "https://www.hims.com/labs",
  },
  {
    company: "MEDVi",
    category: "Narrow high-demand program",
    lesson: "A simple self-pay program around one urgent customer desire can scale fast.",
    borrow: "Clear price framing, simple intake, messaging support, and a tight metabolic/weight-loss entry path.",
    avoid: "Price confusion, subscription surprise, or medication claims outside licensed clinician review.",
    sourceHref: "https://glp1.medvi.org/",
  },
  {
    company: "Function Health",
    category: "Premium biomarker membership",
    lesson: "People will pay for a polished longitudinal dashboard when the biomarkers feel comprehensive and actionable.",
    borrow: "Whole-body positioning, trend tracking, premium result experience, and annual or semiannual testing cadence.",
    avoid: "Overwhelming first-time users with too many markers before the core menu is reliable.",
    sourceHref: "https://www.functionhealth.com/",
  },
  {
    company: "Superpower",
    category: "Aggressive biomarker membership",
    lesson: "A lower-priced, AI-forward membership can make premium biomarker testing feel mainstream.",
    borrow: "Simple membership pitch, personalized dashboard, repeated testing, and a strong consumer-health identity.",
    avoid: "Letting AI copy sound like medical advice before clinician coverage and safety review exist.",
    sourceHref: "https://superpower.com/",
  },
];

export function getLiveProgramTracks() {
  return healthPrograms.filter((program) => program.stage === "live_lab_path");
}

export function getNextProgramTracks() {
  return healthPrograms.filter((program) => program.stage !== "live_lab_path");
}
