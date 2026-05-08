import type { LucideIcon } from "lucide-react";
import {
  Bot,
  ChartNoAxesCombined,
  ClipboardCheck,
  DatabaseZap,
  FileSearch,
  MessageSquareText,
  Palette,
  ShieldCheck,
  Siren,
  Sparkles,
} from "lucide-react";

export type AiGrowthLane =
  | "concierge"
  | "analytics"
  | "lifecycle"
  | "communications"
  | "partner_acquisition"
  | "compliance"
  | "ui";

export type AiGrowthStage = "scaffolded" | "connect_account" | "needs_baa" | "future_scale";

export type AiGrowthTool = {
  id: string;
  name: string;
  lane: AiGrowthLane;
  stage: AiGrowthStage;
  priority: 1 | 2 | 3 | 4 | 5;
  role: string;
  firstUse: string;
  implementation: string;
  envVars: string[];
  beforePhi: string[];
  guardrails: string[];
  sourceHref: string;
  Icon: LucideIcon;
};

export type AiGrowthSprint = {
  id: string;
  title: string;
  timing: string;
  goal: string;
  tools: string[];
  acceptance: string[];
};

export type AiOperatingPrinciple = {
  id: string;
  title: string;
  policy: string;
};

export const aiGrowthLaneLabels: Record<AiGrowthLane, string> = {
  concierge: "AI concierge",
  analytics: "Product analytics",
  lifecycle: "Lifecycle automation",
  communications: "SMS/support",
  partner_acquisition: "Lab acquisition",
  compliance: "Compliance/trust",
  ui: "Premium UI",
};

export const aiGrowthStageLabels: Record<AiGrowthStage, string> = {
  scaffolded: "Scaffolded",
  connect_account: "Connect account",
  needs_baa: "Needs BAA/privacy review",
  future_scale: "Future scale",
};

export const aiGrowthStackTools: AiGrowthTool[] = [
  {
    id: "openai-concierge",
    name: "OpenAI API concierge",
    lane: "concierge",
    stage: "needs_baa",
    priority: 1,
    role: "A lab-ordering guide that explains panels, prep, and results in plain English without diagnosing.",
    firstUse: "Panel recommendation, fasting education, result-prep education, and clinician-escalation prompts.",
    implementation:
      "Use deterministic recommendations first. Enable live model responses only when OPENAI_API_KEY, OPENAI_MODEL, AI_CONCIERGE_MODE=live, and OPENAI_HEALTHCARE_BAA_ACK=true are present.",
    envVars: ["OPENAI_API_KEY", "OPENAI_MODEL", "AI_CONCIERGE_MODE", "OPENAI_HEALTHCARE_BAA_ACK"],
    beforePhi: ["Executed BAA", "Zero-retention eligible setup", "Prompt logs disabled", "Safety/eval review"],
    guardrails: ["No diagnosis", "No treatment plans", "No medication advice", "Educational language only"],
    sourceHref: "https://platform.openai.com/docs/guides/text",
    Icon: Bot,
  },
  {
    id: "posthog-product-os",
    name: "PostHog",
    lane: "analytics",
    stage: "connect_account",
    priority: 1,
    role: "Shows where people drop in quiz, ZIP, checkout, account creation, and result viewing.",
    firstUse: "Capture non-PHI funnel events through the server-side growth event endpoint.",
    implementation:
      "Set POSTHOG_PROJECT_API_KEY and POSTHOG_HOST. Keep health details, names, emails, phone numbers, ZIPs, and result values out of analytics events.",
    envVars: ["POSTHOG_PROJECT_API_KEY", "POSTHOG_HOST"],
    beforePhi: ["Analytics tracking inventory", "PHI minimization policy", "Authenticated-page tracking review"],
    guardrails: ["No result data", "No intake fields", "No raw ZIP on health-intent events", "Server-side sanitization"],
    sourceHref: "https://posthog.com/",
    Icon: ChartNoAxesCombined,
  },
  {
    id: "customerio-lifecycle",
    name: "Customer.io or Resend lifecycle",
    lane: "lifecycle",
    stage: "connect_account",
    priority: 2,
    role: "Turns one order into a relationship with onboarding, order updates, result reminders, and retest flows.",
    firstUse: "Abandoned checkout, requisition ready, results ready, 12-week retest, and annual panel reminders.",
    implementation:
      "Start with transactional Resend email if simple. Move to Customer.io when segmentation, journeys, and SMS branching matter.",
    envVars: ["CUSTOMERIO_SITE_ID", "CUSTOMERIO_API_KEY", "RESEND_API_KEY"],
    beforePhi: ["Consent language", "Messaging preference center", "BAA/vendor review if PHI enters messages"],
    guardrails: ["No lab values in email subject", "No sensitive panel names in marketing", "Clear unsubscribe/preferences"],
    sourceHref: "https://customer.io/",
    Icon: MessageSquareText,
  },
  {
    id: "twilio-messaging",
    name: "Twilio messaging",
    lane: "communications",
    stage: "connect_account",
    priority: 2,
    role: "SMS/WhatsApp updates for order instructions, appointment reminders, and concierge support.",
    firstUse: "Requisition ready, fasting reminder, location instructions, result-ready notification.",
    implementation: "Use message templates that say an update is ready in the portal instead of exposing health details.",
    envVars: ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_MESSAGING_SERVICE_SID"],
    beforePhi: ["A2P 10DLC setup", "Consent capture", "BAA/compliance review", "Template approval"],
    guardrails: ["No biomarkers in SMS", "No diagnosis language", "Portal link for sensitive details"],
    sourceHref: "https://www.twilio.com/docs/sms",
    Icon: Sparkles,
  },
  {
    id: "clay-apollo-lab-acquisition",
    name: "Clay + Apollo",
    lane: "partner_acquisition",
    stage: "connect_account",
    priority: 1,
    role: "Builds the lab-partner machine: find CLIA labs, enrich contacts, score fit, and draft outreach.",
    firstUse: "Create weekly lead lists for regional labs, mobile phlebotomy, and partner BD contacts.",
    implementation:
      "Use CMS CLIA lookup, lab websites, LinkedIn/company enrichment, and outreach scoring before human review.",
    envVars: ["CLAY_API_KEY", "APOLLO_API_KEY"],
    beforePhi: ["No patient data in outbound tools", "Human review of generated outreach", "Opt-out honoring"],
    guardrails: ["No fake partnership claims", "No patient examples", "No scraping behind logins"],
    sourceHref: "https://www.clay.com/clay-for-sales",
    Icon: FileSearch,
  },
  {
    id: "firecrawl-apify-research",
    name: "Firecrawl/Apify research jobs",
    lane: "partner_acquisition",
    stage: "future_scale",
    priority: 3,
    role: "Keeps the lab network database fresh by monitoring clinic pages, price pages, and coverage pages.",
    firstUse: "Weekly crawl for new regional lab locations, cash-pay menus, and contact forms.",
    implementation: "Run scheduled research jobs into a reviewed partner queue before anything changes in checkout.",
    envVars: ["FIRECRAWL_API_KEY", "APIFY_TOKEN"],
    beforePhi: ["Robots/terms review", "Source attribution", "Manual verification before publishing"],
    guardrails: ["Do not automate orders", "Do not copy competitor text", "Flag stale price data"],
    sourceHref: "https://qcor.cms.gov/CLIA_Lab_Lookup",
    Icon: DatabaseZap,
  },
  {
    id: "vanta-drata-compliance",
    name: "Vanta or Drata",
    lane: "compliance",
    stage: "connect_account",
    priority: 2,
    role: "Creates a living trust program for HIPAA, SOC 2, vendor review, access control, and evidence.",
    firstUse: "Vendor inventory, policies, employee training, access reviews, and audit evidence.",
    implementation: "Start before real result PDFs and AI PHI processing become a material part of the app.",
    envVars: [],
    beforePhi: ["Risk assessment", "Vendor inventory", "Incident policy", "Access-review cadence"],
    guardrails: ["No 'HIPAA certified' claim", "Document scope honestly", "Review tracking pixels on health pages"],
    sourceHref: "https://www.vanta.com/products/hipaa",
    Icon: ShieldCheck,
  },
  {
    id: "aptible-secure-hosting",
    name: "Aptible or healthcare cloud posture",
    lane: "compliance",
    stage: "future_scale",
    priority: 4,
    role: "A later infrastructure option if PHI scope outgrows the current Vercel/Supabase/Railway setup.",
    firstUse: "Dedicated PHI services, audit-heavy result storage, and stricter enterprise partner requirements.",
    implementation: "Keep app boundaries modular so PHI-heavy services can move without rewriting the storefront.",
    envVars: [],
    beforePhi: ["Hosting BAA", "Encryption posture", "Backup/disaster recovery", "Audit logging"],
    guardrails: ["BAA is not compliance by itself", "Application auth still matters", "Least-privilege service design"],
    sourceHref: "https://www.aptible.com/hipaa/hosting",
    Icon: Siren,
  },
  {
    id: "sentry-observability",
    name: "Sentry",
    lane: "compliance",
    stage: "connect_account",
    priority: 3,
    role: "Catches checkout, provider, webhook, and result-flow failures before customers lose trust.",
    firstUse: "Error monitoring, uptime alerts, release tracking, and failed provider-call triage.",
    implementation: "Scrub request bodies and never send patient intake or result values in error context.",
    envVars: ["SENTRY_DSN"],
    beforePhi: ["PII scrubbing", "Allowed-context list", "Alert routing"],
    guardrails: ["No request body capture", "No result payload capture", "No secrets in breadcrumbs"],
    sourceHref: "https://sentrydocs.dev/features/error-monitoring",
    Icon: ClipboardCheck,
  },
  {
    id: "v0-cursor-figma-ui",
    name: "v0 + Cursor + Figma/Pageflows",
    lane: "ui",
    stage: "scaffolded",
    priority: 2,
    role: "Keeps the product visually close to Superpower/Function/Hims: premium, calm, fast, and decisive.",
    firstUse: "Landing, checkout, dashboard, result trends, program pages, and mobile polish.",
    implementation: "Use AI for variants, then codify the best patterns in the existing Next/Tailwind system.",
    envVars: [],
    beforePhi: ["Do not paste real patient data into design tools", "Use synthetic screenshots only"],
    guardrails: ["No dark-pattern urgency", "No unsubstantiated outcomes", "No diagnosis/treatment UI copy"],
    sourceHref: "https://v0.dev/",
    Icon: Palette,
  },
];

export const aiGrowthSprints: AiGrowthSprint[] = [
  {
    id: "instrument-first-funnel",
    title: "Instrument the private lab funnel",
    timing: "Now",
    goal: "Know where buyers slow down before spending on ads or affiliates.",
    tools: ["posthog-product-os", "sentry-observability"],
    acceptance: [
      "Server-side event endpoint accepts sanitized funnel events",
      "Catalog, ZIP, checkout, and result events have definitions",
      "No PHI fields are accepted into analytics payloads",
    ],
  },
  {
    id: "concierge-mvp",
    title: "Ship the safe AI concierge",
    timing: "Now",
    goal: "Make panel choice feel guided while keeping medical claims conservative.",
    tools: ["openai-concierge"],
    acceptance: [
      "Rules-based recommendations work without API keys",
      "Live model mode is gated behind BAA acknowledgement",
      "Every answer includes educational-only and clinician-discussion language",
    ],
  },
  {
    id: "lifecycle-engine",
    title: "Lifecycle and retest engine",
    timing: "Next",
    goal: "Turn a one-time order into a repeat health relationship.",
    tools: ["customerio-lifecycle", "twilio-messaging"],
    acceptance: [
      "Abandoned checkout and result-ready journeys are mapped",
      "SMS/email templates avoid lab values and sensitive details",
      "Retest reminders connect to program tracks",
    ],
  },
  {
    id: "lab-acquisition-machine",
    title: "Lab acquisition machine",
    timing: "Next",
    goal: "Compound coverage by finding, scoring, and contacting labs every week.",
    tools: ["clay-apollo-lab-acquisition", "firecrawl-apify-research"],
    acceptance: [
      "CMS CLIA and regional lab sources feed a reviewed lead queue",
      "Outreach drafts never imply existing partnerships",
      "Partner score includes price, state coverage, result delivery, and critical-value policy",
    ],
  },
  {
    id: "trust-readiness",
    title: "Trust and compliance readiness",
    timing: "Before scaling PHI",
    goal: "Make the company credible for partners, customers, and future clinical tracks.",
    tools: ["vanta-drata-compliance", "aptible-secure-hosting"],
    acceptance: [
      "Vendor inventory and BAA needs are tracked",
      "Audit-log requirements are documented",
      "Marketing claims are reviewed against FTC/FDA-style risk",
    ],
  },
];

export const aiOperatingPrinciples: AiOperatingPrinciple[] = [
  {
    id: "education-not-diagnosis",
    title: "Education, not diagnosis",
    policy: "AI can explain what a panel includes and when to discuss results with a clinician; it must not diagnose, treat, prescribe, or tell users to ignore a clinician.",
  },
  {
    id: "phi-minimization",
    title: "PHI minimization by default",
    policy: "Analytics, outreach, design, and AI tools receive the smallest possible payload. Sensitive details stay in the secure app unless a vendor is approved for that use.",
  },
  {
    id: "human-review-on-risk",
    title: "Human review on risk",
    policy: "Partner outreach, clinical copy, abnormal-result messaging, and live AI prompt changes need human review before release.",
  },
  {
    id: "measure-before-scale",
    title: "Measure before scale",
    policy: "Use funnel data, partner response rates, support tickets, and order completion before committing to expensive enterprise deals.",
  },
];

export function getAiGrowthToolsByLane(lane: AiGrowthLane) {
  return aiGrowthStackTools.filter((tool) => tool.lane === lane);
}

export function getPriorityAiGrowthTools() {
  return aiGrowthStackTools.filter((tool) => tool.priority <= 2);
}

export function getAiGrowthToolReadiness(env: Record<string, string | undefined> = process.env) {
  return aiGrowthStackTools.map((tool) => {
    const configuredVars = tool.envVars.filter((name) => Boolean(env[name]));
    return {
      id: tool.id,
      name: tool.name,
      configured: configuredVars.length,
      required: tool.envVars.length,
      ready: tool.envVars.length === 0 || configuredVars.length === tool.envVars.length,
      missing: tool.envVars.filter((name) => !env[name]),
    };
  });
}
