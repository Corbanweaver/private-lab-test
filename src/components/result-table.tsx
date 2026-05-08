import type { BiomarkerFlag, ResultReport } from "@/lib/types";

const flagCopy: Record<BiomarkerFlag, { label: string; className: string }> = {
  low: {
    label: "Needs attention",
    className: "bg-blue-50 text-blue-800",
  },
  normal: {
    label: "Looks normal",
    className: "bg-emerald-50 text-emerald-800",
  },
  high: {
    label: "Needs attention",
    className: "bg-amber-50 text-amber-900",
  },
  critical: {
    label: "Urgent review",
    className: "bg-red-50 text-red-800",
  },
};

export function ResultTable({ report }: { report: ResultReport }) {
  return (
    <section className="premium-card overflow-hidden">
      <div className="border-b border-[var(--line)] p-5">
        <p className="text-sm font-semibold text-[var(--accent)]">{report.orderNumber}</p>
        <h2 className="mt-2 text-2xl font-semibold">{report.panelName}</h2>
        <p className="mt-1 text-base text-[var(--muted)]">Blood draw: {report.collectionDate}</p>
      </div>

      <div className="grid gap-4 p-4 sm:p-5">
        {report.biomarkers.map((marker) => {
          const flag = flagCopy[marker.flag];

          return (
            <article key={marker.name} className="rounded-md border border-[var(--line)] bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{marker.name}</h3>
                  <p className="mt-1 text-2xl font-semibold text-[var(--brand-dark)]">
                    {marker.value} <span className="text-base font-medium text-[var(--muted)]">{marker.unit}</span>
                  </p>
                </div>
                <span className={`rounded-md px-3 py-2 text-sm font-semibold ${flag.className}`}>{flag.label}</span>
              </div>

              <div className="mt-4 grid gap-3 text-base leading-7 text-[var(--muted)] md:grid-cols-[12rem_1fr]">
                <p>
                  <span className="font-semibold text-[var(--foreground)]">Usual range:</span> {marker.range}
                </p>
                <p>{marker.insight}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
