import type { BiomarkerFlag, ResultReport } from "@/lib/types";

const flagClass: Record<BiomarkerFlag, string> = {
  low: "bg-blue-50 text-blue-800",
  normal: "bg-emerald-50 text-emerald-800",
  high: "bg-amber-50 text-amber-900",
  critical: "bg-red-50 text-red-800",
};

export function ResultTable({ report }: { report: ResultReport }) {
  return (
    <div className="table-shell">
      <div className="border-b border-[var(--line)] p-5">
        <p className="text-sm text-[var(--muted)]">{report.orderNumber}</p>
        <h2 className="text-xl font-semibold">{report.panelName}</h2>
        <p className="text-sm text-[var(--muted)]">Collected {report.collectionDate}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[var(--soft)] text-xs uppercase text-[var(--brand-dark)]">
            <tr>
              <th className="px-4 py-3">Biomarker</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Range</th>
              <th className="px-4 py-3">Flag</th>
              <th className="px-4 py-3">Educational insight</th>
            </tr>
          </thead>
          <tbody>
            {report.biomarkers.map((marker) => (
              <tr key={marker.name} className="border-t border-[var(--line)] align-top">
                <td className="px-4 py-3 font-medium">{marker.name}</td>
                <td className="px-4 py-3 font-mono">
                  {marker.value} {marker.unit}
                </td>
                <td className="px-4 py-3 font-mono text-[var(--muted)]">{marker.range}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-md px-2 py-1 text-xs font-semibold ${flagClass[marker.flag]}`}>
                    {marker.flag}
                  </span>
                </td>
                <td className="max-w-sm px-4 py-3 text-[var(--muted)]">{marker.insight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
