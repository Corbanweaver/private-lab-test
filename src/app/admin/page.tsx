import { Database, FileWarning, Settings2, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { labTests, panels, restrictedStates } from "@/data/catalog";

export default function AdminPage() {
  const metrics: Array<[string, number, LucideIcon]> = [
    ["Tests", labTests.length, Database],
    ["Panels", panels.length, Settings2],
    ["Blocked states", restrictedStates.length, ShieldCheck],
    ["Review queue", 3, FileWarning],
  ];

  return (
    <PageShell>
      <section className="page-section">
        <p className="eyebrow">Admin</p>
        <h1 className="page-title mt-2">Catalog, orders, provider sync, and compliance controls</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {metrics.map(([label, value, Icon]) => (
            <div key={String(label)} className="premium-card p-5">
              <Icon className="text-[var(--brand)]" size={22} />
              <p className="mt-3 text-sm text-[var(--muted)]">{label}</p>
              <p className="text-3xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="table-shell mt-8 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[var(--soft)] text-xs uppercase text-[var(--brand-dark)]">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Provider code</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Prep</th>
              </tr>
            </thead>
            <tbody>
              {labTests.map((test) => (
                <tr key={test.id} className="border-t border-[var(--line)]">
                  <td className="px-4 py-3 font-medium">{test.name}</td>
                  <td className="px-4 py-3 font-mono text-xs">{test.providerCode}</td>
                  <td className="px-4 py-3">{test.category}</td>
                  <td className="px-4 py-3">${test.price}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{test.fasting}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageShell>
  );
}
