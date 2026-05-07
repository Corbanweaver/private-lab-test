import { ResultTable } from "@/components/result-table";
import { PageShell } from "@/components/page-shell";
import { sampleResults } from "@/data/catalog";

export default function ResultsPage() {
  return (
    <PageShell>
      <section className="page-section">
        <p className="eyebrow">Results</p>
        <h1 className="page-title mt-2">Private results with plain-language notes</h1>
        <p className="page-copy mt-3 max-w-3xl">
          Result notes are educational and encourage users to discuss findings with a clinician.
        </p>
        <div className="mt-8 grid gap-6">
          {sampleResults.map((report) => (
            <ResultTable key={report.id} report={report} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
