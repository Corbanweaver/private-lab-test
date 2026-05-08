import type { LucideIcon } from "lucide-react";
import { Activity, CalendarClock, HeartPulse, ShieldCheck, Sparkles, UserRound } from "lucide-react";

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

export const programStageLabels: Record<ProgramStage, string> = {
  live_lab_path: "Labs now",
  next_subscription: "Next",
  future_clinical_track: "Future clinical track",
};

export const healthPrograms: HealthProgram[] = [
  {
    id: "whole-body-baseline",
    title: "Whole Body Baseline",
    subtitle: "The annual private lab check",
    stage: "live_lab_path",
    primaryPanelId: "complete-wellness",
    priceAnchor: "$229 self-pay panel",
    cadence: "Annual baseline with optional 6-month retest",
    description:
      "The broad starting point for customers who want a clear picture without choosing every marker one by one.",
    demandSignal: "Private MD Labs-style buyers want speed, privacy, broad panels, and immediate lab instructions.",
    conversionPath: "Homepage -> Complete Wellness -> ZIP -> checkout -> result dashboard.",
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
    priceAnchor: "$139 starter panel",
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
    priceAnchor: "$219 self-pay panel",
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
    priceAnchor: "$189 starting panel",
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
    priceAnchor: "$139 starter panel",
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
    sourceHref: "https://www.functionhealth.com/faqs/which-tests-are-included-with-a-function-membership",
  },
];

export function getLiveProgramTracks() {
  return healthPrograms.filter((program) => program.stage === "live_lab_path");
}

export function getNextProgramTracks() {
  return healthPrograms.filter((program) => program.stage !== "live_lab_path");
}
