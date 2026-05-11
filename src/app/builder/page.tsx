import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { TestCard } from "@/components/test-card";
import { labTests } from "@/data/catalog";

export default async function BuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ add?: string | string[] }>;
}) {
  const params = await searchParams;
  const selectedIds = Array.isArray(params.add) ? params.add : params.add ? [params.add] : ["cmp", "cbc", "lipids"];
  const selected = labTests.filter((test) => selectedIds.includes(test.id));

  return (
    <PageShell>
      <section className="blue-band">
        <div className="page-section">
          <div className="max-w-3xl">
            <p className="eyebrow">Custom panel</p>
            <h1 className="page-title mt-2">Pick only the tests you want</h1>
            <p className="page-copy mt-3">
              This page is for people who already know the names of the tests they want. Save your interest now and we
              will share launch pricing before orders open.
            </p>
          </div>
        </div>
      </section>
      <section className="page-section grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {labTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </div>
        <aside className="glass-card h-max p-5 lg:sticky lg:top-40">
          <p className="eyebrow">Your picks</p>
          <h2 className="mt-2 text-2xl font-semibold">Current panel</h2>
          <div className="mt-4 grid gap-3">
            {selected.map((test) => (
              <div key={test.id} className="rounded-md bg-[var(--soft)] p-3">
                <p className="font-medium">{test.name}</p>
                <p className="text-sm text-[var(--muted)]">{test.biomarkers.slice(0, 4).join(", ")}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[var(--radius)] border border-white/60 bg-white/70 p-4 text-sm leading-6 text-[var(--muted)]">
            <p className="font-semibold text-[var(--brand-dark)]">{selected.length} tests selected</p>
            <p>Pricing is hidden until launch economics are confirmed.</p>
          </div>
          <Link
            href={`/cart?custom=${selectedIds.join(",")}#waitlist`}
            className="focus-ring primary-action mt-5 w-full"
          >
            <ClipboardList size={18} />
            Join waitlist
            <ArrowRight size={17} />
          </Link>
        </aside>
      </section>
    </PageShell>
  );
}
