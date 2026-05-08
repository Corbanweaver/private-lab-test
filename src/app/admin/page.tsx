import Link from "next/link";
import { ArrowRight, Database, FileWarning, Handshake, MapPinned, Settings2, ShieldCheck, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { labTests, panels, restrictedStates } from "@/data/catalog";
import { outreachTargets } from "@/data/lab-outreach";
import { labPartners } from "@/data/lab-partners";
import { commonLabDemand, networkExpansionPlays, trustDrivers } from "@/data/product-research";
import { summarizeLabSupply } from "@/lib/lab-access";

export default function AdminPage() {
  const supply = summarizeLabSupply();
  const metrics: Array<[string, number, LucideIcon]> = [
    ["Tests", labTests.length, Database],
    ["Panels", panels.length, Settings2],
    ["Lab partners", supply.partners, Handshake],
    ["Lab targets", outreachTargets.length, Target],
    ["States mapped", supply.states, MapPinned],
    ["Blocked states", restrictedStates.length, ShieldCheck],
    ["Trust drivers", trustDrivers.length, ShieldCheck],
    ["Common tests", commonLabDemand.length, Database],
    ["Network plays", networkExpansionPlays.length, Handshake],
    ["Routing holds", 1, FileWarning],
  ];

  return (
    <PageShell>
      <section className="page-section">
        <p className="eyebrow">Admin</p>
        <h1 className="page-title mt-2">Keep tests, lab partners, and safety rules organized</h1>
        <p className="page-copy mt-3 max-w-3xl">
          A simple internal view for the team to check prices, partner coverage, and orders that need review.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/strategy" className="focus-ring primary-action">
            <Target size={18} />
            Product strategy
            <ArrowRight size={17} />
          </Link>
          <Link href="/partners/outreach" className="focus-ring secondary-action">
            <Handshake size={18} />
            Outreach cockpit
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {metrics.map(([label, value, Icon]) => (
            <div key={String(label)} className="premium-card p-5">
              <Icon className="text-[var(--brand)]" size={22} />
              <p className="mt-3 text-sm text-[var(--muted)]">{label}</p>
              <p className="text-3xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="table-shell mt-8 overflow-x-auto">
          <table className="w-full min-w-[1040px] text-left text-sm">
            <thead className="bg-[var(--soft)] text-xs uppercase text-[var(--brand-dark)]">
              <tr>
                <th className="px-4 py-3">Lab partner</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">CLIA</th>
                <th className="px-4 py-3">States served</th>
                <th className="px-4 py-3">Cash menu</th>
                <th className="px-4 py-3">Result delivery</th>
                <th className="px-4 py-3">Critical result policy</th>
              </tr>
            </thead>
            <tbody>
              {labPartners.map((partner) => (
                <tr key={partner.id} className="border-t border-[var(--line)] align-top">
                  <td className="px-4 py-3">
                    <p className="font-medium">{partner.name}</p>
                    <p className="text-xs text-[var(--muted)]">{partner.contact.name} - {partner.contact.email}</p>
                  </td>
                  <td className="px-4 py-3 capitalize">{partner.tier}</td>
                  <td className="px-4 py-3 capitalize">{partner.cliaStatus}</td>
                  <td className="px-4 py-3">{partner.statesServed.join(", ")}</td>
                  <td className="px-4 py-3">{partner.cashPriceMenu.length} prices</td>
                  <td className="px-4 py-3 uppercase">{partner.resultDelivery.replace("_", " ")}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{partner.criticalResultPolicy}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
