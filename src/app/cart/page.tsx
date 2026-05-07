import Link from "next/link";
import { CheckCircle2, CreditCard, FileText, ShieldCheck } from "lucide-react";
import { EligibilityForm } from "@/components/eligibility-form";
import { PageShell } from "@/components/page-shell";
import { labTests, panels } from "@/data/catalog";
import { customerTrustFeatures } from "@/data/lab-partners";
import { calculateCustomPanelPrice, formatCurrency } from "@/lib/catalog";

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<{ panel?: string; custom?: string }>;
}) {
  const params = await searchParams;
  const panel = panels.find((item) => item.id === (params.panel ?? "complete-wellness"));
  const customIds = params.custom?.split(",").filter(Boolean) ?? [];
  const customTests = labTests.filter((test) => customIds.includes(test.id));
  const customPrice = calculateCustomPanelPrice(customIds);
  const total = customTests.length ? customPrice : panel?.price ?? 0;

  return (
    <PageShell>
      <section className="page-section grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="premium-card p-5">
          <p className="eyebrow">Cart</p>
          <h1 className="mt-2 text-3xl font-semibold">{customTests.length ? "Custom Panel" : panel?.name}</h1>
          <p className="page-copy mt-2">
            Review your tests, confirm your state, and continue to clinician authorization before checkout.
          </p>
          <div className="mt-5 grid gap-3">
            {(customTests.length ? customTests : labTests.filter((test) => panel?.testIds.includes(test.id))).map((test) => (
              <div key={test.id} className="flex justify-between gap-4 rounded-md bg-[var(--soft)] p-3">
                <div>
                  <p className="font-medium">{test.name}</p>
                  <p className="text-sm text-[var(--muted)]">{test.fasting}</p>
                </div>
                <p className="font-semibold">{formatCurrency(test.price)}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="grid h-max gap-4">
          <EligibilityForm />
          <div className="premium-card p-5">
            <div className="flex items-center gap-2 text-[var(--brand-dark)]">
              <ShieldCheck size={20} />
              <p className="font-semibold">Cash-pay protection</p>
            </div>
            <div className="mt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="mt-4 grid gap-2">
              {customerTrustFeatures.map((feature) => (
                <p key={feature} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <CheckCircle2 size={16} className="text-[var(--brand)]" />
                  {feature}
                </p>
              ))}
            </div>
            <form action="/api/checkout" method="POST" className="mt-5 grid gap-3">
              <input type="hidden" name="panelId" value={panel?.id ?? "custom"} />
              <input type="hidden" name="amount" value={total} />
              <label className="grid gap-1 text-sm font-medium">
                State
                <input name="state" defaultValue="CO" className="focus-ring input-control uppercase" />
              </label>
              <button className="focus-ring primary-action">
                <CreditCard size={18} />
                Continue to checkout
              </button>
            </form>
            <Link href="/checkout" className="focus-ring secondary-action mt-3 w-full text-sm">
              <FileText size={16} />
              Review next steps
            </Link>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
