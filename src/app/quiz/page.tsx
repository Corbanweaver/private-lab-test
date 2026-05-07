import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { recommendPanels } from "@/lib/catalog";

const goals = ["baseline", "energy", "heart", "hormones", "comprehensive"];
const goalLabels: Record<string, string> = {
  baseline: "Basic checkup",
  energy: "Energy",
  heart: "Heart health",
  hormones: "Hormones",
  comprehensive: "Full wellness",
};

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{ goal?: string | string[] }>;
}) {
  const params = await searchParams;
  const selectedGoals = Array.isArray(params.goal) ? params.goal : params.goal ? [params.goal] : ["baseline"];
  const recommendations = recommendPanels(selectedGoals);

  return (
    <PageShell>
      <section className="page-section">
        <div className="max-w-3xl">
          <p className="eyebrow">Suggested panels</p>
          <h1 className="page-title mt-2">Tell us what you want to check</h1>
          <p className="page-copy mt-3">
            Simple panel options for common wellness goals. These suggestions are educational and not a diagnosis.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {goals.map((goal) => (
            <Link
              key={goal}
              href={`/quiz?goal=${goal}`}
              className={`focus-ring inline-flex min-h-12 items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold ${
                selectedGoals.includes(goal)
                  ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                  : "border-[var(--line)] bg-white text-[var(--brand-dark)]"
              }`}
            >
              <CheckCircle2 size={16} />
              {goalLabels[goal]}
            </Link>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recommendations.map((panel) => (
            <PanelCard key={panel.id} panel={panel} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
