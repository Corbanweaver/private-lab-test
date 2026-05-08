import Link from "next/link";
import { ArrowRight, CheckCircle2, Search, Sparkles } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { TestCard } from "@/components/test-card";
import { labTests, panels } from "@/data/catalog";
import { formatCurrency } from "@/lib/catalog";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").toLowerCase();
  const category = params.category ?? "All";
  const categories = ["All", ...Array.from(new Set(labTests.map((test) => test.category)))];
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
              Pick what you want, then enter ZIP and basic info to see a nearby clinic. No doctor visit. No insurance
              billing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Clear prices", "Private results", "Authorization where required"].map((item) => (
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
              Broad wellness screening with a clear cash price and provider authorization included where required.
            </p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-4xl font-semibold text-[var(--brand-dark)]">
                {formatCurrency(panels.find((panel) => panel.id === "complete-wellness")?.price ?? 229)}
              </p>
              <Link href="/cart?panel=complete-wellness" className="focus-ring primary-action min-h-12 px-4 text-sm">
                <Sparkles size={17} />
                Start order
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="simple-number">1</span>
            <div>
              <h2 className="text-2xl font-semibold">Choose a panel</h2>
              <p className="text-sm text-[var(--muted)]">Compare included tests and select the right self-pay option.</p>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {panels.map((panel) => (
              <PanelCard key={panel.id} panel={panel} />
            ))}
          </div>
        </div>
        <form className="premium-card mt-8 grid gap-3 p-4 sm:grid-cols-[1fr_220px_auto]">
          <div className="sm:col-span-3">
            <div className="flex items-center gap-3">
              <span className="simple-number">2</span>
              <div>
                <h2 className="text-2xl font-semibold">Search individual tests</h2>
                <p className="mt-1 text-[var(--muted)]">Add specific tests, then continue to ZIP and checkout.</p>
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
          <button className="focus-ring primary-action shadow-[0_18px_48px_rgba(6,18,29,0.2)]">
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
