import { Search } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { TestCard } from "@/components/test-card";
import { labTests, panels } from "@/data/catalog";

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
      <section className="page-section">
        <div className="max-w-3xl">
          <p className="eyebrow">Catalog</p>
          <h1 className="page-title mt-2">Search tests and ready-made panels</h1>
          <p className="page-copy mt-3">
            Prices, preparation notes, and included markers are easy to compare before checkout.
          </p>
        </div>
        <form className="premium-card mt-6 grid gap-3 p-4 sm:grid-cols-[1fr_220px_auto]">
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
          <button className="focus-ring primary-action">
            <Search size={18} />
            Search
          </button>
        </form>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {panels.map((panel) => (
            <PanelCard key={panel.id} panel={panel} />
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
