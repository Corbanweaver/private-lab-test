import { panels } from "@/data/catalog";
import type { Panel } from "@/lib/types";

export type AiConciergeInput = {
  message?: string;
  goals?: string[];
};

export type AiConciergePanelRecommendation = {
  id: string;
  name: string;
  price: number;
  reason: string;
};

export type AiConciergeResponse = {
  mode: "rules" | "live";
  answer: string;
  recommendedPanels: AiConciergePanelRecommendation[];
  safetyNotes: string[];
  needsClinicianDiscussion: boolean;
};

const goalKeywords: Record<Panel["goal"], string[]> = {
  baseline: ["baseline", "annual", "basic", "general", "checkup", "cheap", "starter", "first"],
  comprehensive: ["complete", "comprehensive", "everything", "full", "whole", "deep", "broad"],
  energy: ["energy", "fatigue", "tired", "thyroid", "vitamin", "iron", "b12", "ferritin"],
  heart: ["heart", "cholesterol", "lipid", "metabolic", "a1c", "glucose", "inflammation", "weight"],
  hormones: ["hormone", "testosterone", "estradiol", "men", "women"],
};

const aiSafetyNotes = [
  "Educational information only; this does not diagnose, treat, prescribe, or replace a licensed clinician.",
  "Abnormal, urgent, or confusing results should be discussed with a clinician.",
  "Critical values must follow the ordering clinician or lab partner escalation workflow before customer release.",
];

function normalizeWords(input: AiConciergeInput) {
  return `${input.message || ""} ${(input.goals || []).join(" ")}`.toLowerCase();
}

export function inferConciergeGoals(input: AiConciergeInput) {
  const words = normalizeWords(input);
  const scoredGoals = Object.entries(goalKeywords)
    .map(([goal, keywords]) => ({
      goal: goal as Panel["goal"],
      score: keywords.filter((keyword) => words.includes(keyword)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredGoals.length > 0 ? scoredGoals.map((item) => item.goal) : (["baseline"] as Panel["goal"][]);
}

function panelReason(panel: Panel, goals: Panel["goal"][]) {
  if (panel.goal === "baseline") return "Best low-cost starting point for a first private wellness check.";
  if (panel.goal === "comprehensive") return "Broadest general-wellness option when the user wants a fuller baseline.";
  if (panel.goal === "energy") return "Matches energy, thyroid, vitamin, and iron-storage questions.";
  if (panel.goal === "heart") return "Matches heart, cholesterol, glucose, metabolic, or weight-tracking goals.";
  if (panel.goal === "hormones") return "Matches hormone and thyroid screening interests.";
  return `Matches ${goals.join(", ")} goals.`;
}

export function getRulesBasedConciergeResponse(input: AiConciergeInput): AiConciergeResponse {
  const goals = inferConciergeGoals(input);
  const recommendedPanels = panels
    .map((panel) => ({
      panel,
      score:
        (goals.includes(panel.goal) ? 4 : 0) +
        panel.tags.filter((tag) => goals.some((goal) => tag.includes(goal))).length,
    }))
    .sort((a, b) => b.score - a.score || a.panel.price - b.panel.price)
    .slice(0, 3)
    .map(({ panel }) => ({
      id: panel.id,
      name: panel.name,
      price: panel.price,
      reason: panelReason(panel, goals),
    }));

  const top = recommendedPanels[0];

  return {
    mode: "rules",
    answer: top
      ? `${top.name} is the best starting point from the current catalog. It keeps the next step simple: choose the panel, check ZIP availability, answer basic intake, and get lab instructions after checkout.`
      : "Start with Essential Wellness if this is a first private lab order, then add targeted markers later.",
    recommendedPanels,
    safetyNotes: aiSafetyNotes,
    needsClinicianDiscussion: true,
  };
}

export function redactConciergeText(value: string) {
  return value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]")
    .replace(/\b(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/g, "[phone]")
    .replace(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, "[date]")
    .slice(0, 1200);
}

export function isLiveConciergeEnabled(env: Record<string, string | undefined> = process.env) {
  return (
    env.AI_CONCIERGE_MODE === "live" &&
    Boolean(env.OPENAI_API_KEY) &&
    Boolean(env.OPENAI_MODEL) &&
    env.OPENAI_HEALTHCARE_BAA_ACK === "true"
  );
}

function extractOpenAIText(data: unknown) {
  if (!data || typeof data !== "object") return "";
  const maybeOutputText = (data as { output_text?: unknown }).output_text;
  if (typeof maybeOutputText === "string") return maybeOutputText;

  const output = (data as { output?: unknown }).output;
  if (!Array.isArray(output)) return "";

  return output
    .flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const content = (item as { content?: unknown }).content;
      return Array.isArray(content) ? content : [];
    })
    .map((content) => {
      if (!content || typeof content !== "object") return "";
      const text = (content as { text?: unknown; type?: unknown }).text;
      return typeof text === "string" ? text : "";
    })
    .filter(Boolean)
    .join("\n");
}

export async function generateAiConciergeResponse(input: AiConciergeInput): Promise<AiConciergeResponse> {
  const fallback = getRulesBasedConciergeResponse(input);

  if (!isLiveConciergeEnabled()) return fallback;

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;
  const userText = redactConciergeText(input.message || "");

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        store: false,
        instructions:
          "You are the Private Lab Test educational lab concierge. Explain lab panel options plainly. Do not diagnose, treat, prescribe, or suggest medication. Encourage clinician discussion for abnormal, urgent, or confusing results. Do not ask for personal identifiers.",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `User goal: ${userText}\nDeterministic panel shortlist: ${fallback.recommendedPanels
                  .map((panel) => `${panel.name} (${panel.id})`)
                  .join(", ")}`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) return fallback;

    const data = (await response.json()) as unknown;
    const liveText = extractOpenAIText(data).trim();

    if (!liveText) return fallback;

    return {
      ...fallback,
      mode: "live",
      answer: liveText.slice(0, 1600),
    };
  } catch {
    return fallback;
  }
}
