import Link from "next/link";
import { ArrowRight, CheckCircle2, Search, Sparkles } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { TestCard } from "@/components/test-card";
import { labTests, panels } from "@/data/catalog";
import { commonLabDemand } from "@/data/product-research";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").toLowerCase();
  const category = params.category ?? "All";
  const categories = ["All", ...Array.from(new Set(labTests.map((test) => test.category)))];
  const commonTests = commonLabDemand
    .map((item) => labTests.find((test) => test.id === item.testId))
    .filter((test): test is (typeof labTests)[number] => Boolean(test))
    .slice(0, 8);
  const filtered = labTests.filter((test) => {
    const matchesQuery =
      !query ||
      test.name.toLowerCase().includes(query) ||
      test.tags.some((tag) => tag.includes(query)) ||
      test.biomarkers.some((marker) => marker.toLowerCase().includes(query));
    const matchesCategory = category === "All" || test.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <PageShell>
      <section className="deep-band">
        <div className="page-section grid items-center gap-6 lg:grid-cols-[1fr_380px]">
          <div className="max-w-3xl">
            <p className="eyebrow text-[#9ed5cc]">Step 1</p>
            <h1 className="page-title mt-2 text-white">Choose tests or a panel.</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-[#dbe8e4]">
              Pick what you want, then join the launch list. No payment, no DOB, and no medical intake until full
              ordering is ready.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Launch pricing before orders", "Private results planned", "Full in-app ordering planned"].map((item) => (
                <span
                  key={item}
                  className="pulse-pill flex items-center gap-2 rounded-[var(--radius)] px-4 py-2 text-sm font-semibold text-[var(--brand-dark)]"
                >
                  <CheckCircle2 size={15} className="text-[var(--brand)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-card p-5 text-[var(--foreground)]">
            <p className="eyebrow">Recommended</p>
            <h2 className="mt-2 text-2xl font-semibold">Complete Wellness</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Broad wellness screening interest list for the first in-app ordering launch.
            </p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-2xl font-semibold text-[var(--brand-dark)]">Waitlist open</p>
              <Link href="/cart?panel=complete-wellness#waitlist" className="focus-ring primary-action min-h-12 px-4 text-sm">
                <Sparkles size={17} />
                Join list
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="glass-card mb-8 grid gap-5 p-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Common first orders</p>
            <h2 className="mt-2 text-2xl font-semibold">Start with the labs people recognize.</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              These markers anchor most low-friction wellness panels before adding deeper hormones, nutrients, or heart
              risk upgrades.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {commonTests.map((test) => (
              <Link
                key={test.id}
                href={`/catalog?q=${encodeURIComponent(test.name)}`}
                className="focus-ring flex items-center justify-between gap-3 rounded-[var(--radius)] border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] transition hover:border-[color-mix(in_srgb,var(--brand)_42%,rgba(255,255,255,0.7))] hover:shadow-[0_10px_28px_rgba(16,22,21,0.08)]"
              >
                <span>{test.name}</span>
                <span className="text-[var(--brand-dark)]">Waitlist</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="simple-number">1</span>
            <div>
              <h2 className="text-2xl font-semibold">Choose a panel</h2>
              <p className="text-sm text-[var(--muted)]">Compare included tests and select what you want when ordering opens.</p>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {panels.map((panel) => (
              <PanelCard key={panel.id} panel={panel} />
            ))}
          </div>
        </div>
        <form className="liquid-glass mt-8 grid gap-3 p-4 sm:grid-cols-[1fr_220px_auto]">
          <div className="sm:col-span-3">
            <div className="flex items-center gap-3">
              <span className="simple-number">2</span>
              <div>
                <h2 className="text-2xl font-semibold">Search individual tests</h2>
                <p className="mt-1 text-[var(--muted)]">Add specific tests, then join the launch list.</p>
              </div>
            </div>
          </div>
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Search glucose, thyroid, vitamin D..."
            className="focus-ring input-control"
          />
          <select
            name="category"
            defaultValue={category}
            className="focus-ring input-control"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <button className="focus-ring primary-action shadow-[0_18px_48px_rgba(16,22,21,0.2)]">
            <Search size={18} />
            Search tests
          </button>
        </form>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
