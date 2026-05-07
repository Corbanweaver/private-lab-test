import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { TestCard } from "@/components/test-card";
import { labTests } from "@/data/catalog";
import { calculateCustomPanelPrice, calculatePanelRetail, formatCurrency } from "@/lib/catalog";

export default async function BuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ add?: string | string[] }>;
}) {
  const params = await searchParams;
  const selectedIds = Array.isArray(params.add) ? params.add : params.add ? [params.add] : ["cmp", "cbc", "lipids"];
  const selected = labTests.filter((test) => selectedIds.includes(test.id));
  const retail = calculatePanelRetail(selectedIds);
  const price = calculateCustomPanelPrice(selectedIds);

  return (
    <PageShell>
      <section className="page-section grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="eyebrow">Custom builder</p>
          <h1 className="page-title mt-2">Build your own wellness panel</h1>
          <p className="page-copy mt-3 max-w-3xl">
            A flexible panel for people who know exactly what they want checked.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {labTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </div>
        <aside className="premium-card h-max p-5 lg:sticky lg:top-40">
          <p className="eyebrow">Current panel</p>
          <h2 className="mt-2 text-2xl font-semibold">Custom Panel</h2>
          <div className="mt-4 grid gap-3">
            {selected.map((test) => (
              <div key={test.id} className="rounded-md bg-[var(--soft)] p-3">
                <p className="font-medium">{test.name}</p>
                <p className="text-sm text-[var(--muted)]">{test.biomarkers.slice(0, 4).join(", ")}</p>
              </div>
            ))}
          </div>
          <dl className="mt-5 grid gap-2 text-sm">
            <div className="flex justify-between">
              <dt>Retail tests</dt>
              <dd>{formatCurrency(retail)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Builder price</dt>
              <dd className="font-semibold text-[var(--brand-dark)]">{formatCurrency(price)}</dd>
            </div>
          </dl>
          <Link
            href={`/cart?custom=${selectedIds.join(",")}`}
            className="focus-ring primary-action mt-5 w-full"
          >
            <ShoppingCart size={18} />
            Continue to cart
          </Link>
        </aside>
      </section>
    </PageShell>
  );
}
