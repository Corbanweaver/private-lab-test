import { labTests, panels, restrictedStates } from "@/data/catalog";
import { getLabAccessRule, normalizeState } from "@/lib/lab-access";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getTestsForPanel(panelId: string) {
  const panel = panels.find((item) => item.id === panelId);
  if (!panel) return [];
  return panel.testIds
    .map((testId) => labTests.find((test) => test.id === testId))
    .filter((test) => Boolean(test));
}

export function calculatePanelRetail(testIds: string[]) {
  return testIds.reduce((total, testId) => {
    const test = labTests.find((item) => item.id === testId);
    return total + (test?.price ?? 0);
  }, 0);
}

export function calculateCustomPanelPrice(testIds: string[]) {
  const retail = calculatePanelRetail(testIds);
  if (testIds.length >= 6) return Math.round(retail * 0.82);
  if (testIds.length >= 3) return Math.round(retail * 0.9);
  return retail;
}

export function checkStateEligibility(state: string) {
  const normalized = normalizeState(state);
  const accessRule = getLabAccessRule(normalized);
  const eligible = normalized.length === 2 && accessRule.mode !== "blocked" && !restrictedStates.includes(normalized as never);

  return {
    state: normalized,
    eligible,
    accessMode: accessRule.mode,
    requiresClinicianAuthorization: accessRule.mode === "clinician_authorized",
    message: eligible
      ? "Cash-pay checkout is available. A licensed clinician checks eligible orders before the lab visit."
      : accessRule.note || "Lab ordering is not available for this state in the launch rules.",
  };
}

export function recommendPanels(goals: string[]) {
  const normalizedGoals = goals.map((goal) => goal.toLowerCase());
  return panels
    .map((panel) => {
      const score = panel.tags.filter((tag) => normalizedGoals.includes(tag)).length +
        (normalizedGoals.includes(panel.goal) ? 2 : 0);
      return { panel, score };
    })
    .sort((a, b) => b.score - a.score || a.panel.price - b.panel.price)
    .map((item) => item.panel);
}
