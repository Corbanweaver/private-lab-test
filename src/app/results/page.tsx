import { ResultTable } from "@/components/result-table";
import { PageShell } from "@/components/page-shell";
import { sampleResults } from "@/data/catalog";

export default function ResultsPage() {
  return (
    <PageShell>
      <section className="blue-band">
        <div className="page-section">
          <p className="eyebrow">Step 4</p>
          <h1 className="page-title mt-2">Your results, explained simply</h1>
          <p className="page-copy mt-3 max-w-3xl">
            See what looks normal, what may need attention, and what to ask a clinician next.
          </p>
        </div>
      </section>
      <section className="page-section">
        <div className="glass-card rounded-md border border-[var(--line)] p-5">
          <p className="text-lg font-semibold">Good to know</p>
          <p className="mt-2 text-base leading-7 text-[var(--muted)]">
            These notes are for education only. They do not diagnose or treat a medical condition.
          </p>
        </div>
        <div className="mt-8 grid gap-6">
          {sampleResults.map((report) => (
            <ResultTable key={report.id} report={report} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
