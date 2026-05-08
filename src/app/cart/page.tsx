import Link from "next/link";
import { ArrowRight, CheckCircle2, CreditCard, FileText, LockKeyhole, ShieldCheck } from "lucide-react";
import { EligibilityForm } from "@/components/eligibility-form";
import { PageShell } from "@/components/page-shell";
import { labTests, panels } from "@/data/catalog";
import { calculateCustomPanelPrice, formatCurrency } from "@/lib/catalog";

const checkoutTrustFeatures = [
  "No doctor visit",
  "No insurance or Medicare billing",
  "Provider authorization included where required",
  "Nearest-clinic instructions after checkout",
  "Private results in your account",
];

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
  const selectedName = customTests.length ? "Custom Panel" : panel?.name;
  const selectedPanelId = customTests.length ? "custom" : panel?.id ?? "complete-wellness";

  return (
    <PageShell>
      <section className="blue-band">
        <div className="page-section">
          <p className="eyebrow">Step 2</p>
          <h1 className="page-title mt-2">Enter ZIP, see a clinic, checkout.</h1>
          <p className="page-copy mt-3 max-w-3xl">
            Add basic info, confirm a nearby clinic, then pay the clear self-pay price. No insurance is billed.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {["Choose tests", "ZIP/basic info", "Nearest clinic", "Cash checkout"].map((item, index) => (
              <div key={item} className="checkout-step flex items-center gap-3 p-4">
                <span className="simple-number">{index + 1}</span>
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="page-section grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="premium-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Selected</p>
              <h2 className="mt-2 text-3xl font-semibold">{selectedName}</h2>
            </div>
            <p className="text-4xl font-semibold text-[var(--brand-dark)]">{formatCurrency(total)}</p>
          </div>
          <div className="mt-5 grid gap-3">
            {(customTests.length ? customTests : labTests.filter((test) => panel?.testIds.includes(test.id))).map((test) => (
              <div key={test.id} className="flex justify-between gap-4 rounded-md border border-[var(--line)] bg-[#fcfffd] p-3">
                <div>
                  <p className="font-medium">{test.name}</p>
                  <p className="text-sm text-[var(--muted)]">{test.fasting}</p>
                </div>
                <p className="font-semibold">{formatCurrency(test.price)}</p>
              </div>
            ))}
          </div>
        </div>
        <aside id="checkout" className="grid h-max gap-4 lg:sticky lg:top-40">
          <EligibilityForm formId="cash-checkout-form" panelId={selectedPanelId} testIds={customIds} />
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 text-[var(--brand-dark)]">
              <ShieldCheck size={20} />
              <p className="font-semibold">Self-pay checkout, no insurance billing</p>
            </div>
            <div className="mt-4 flex justify-between text-lg font-semibold">
              <span>Panel price</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="mt-4 grid gap-2">
              {checkoutTrustFeatures.map((feature) => (
                <p key={feature} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <CheckCircle2 size={16} className="text-[var(--brand)]" />
                  {feature}
                </p>
              ))}
            </div>
            <form id="cash-checkout-form" action="/api/checkout" method="POST" className="mt-5 grid gap-3">
              <input type="hidden" name="panelId" value={selectedPanelId} />
              <input type="hidden" name="testIds" value={customIds.join(",")} />
              <input type="hidden" name="amount" value={total} />
              <button className="focus-ring primary-action">
                <CreditCard size={18} />
                Pay self-pay price
                <ArrowRight size={17} />
              </button>
            </form>
            <div className="mt-4 flex items-start gap-2 rounded-md bg-[#fcfffd] p-3 text-sm leading-6 text-[var(--muted)]">
              <LockKeyhole className="mt-1 shrink-0 text-[var(--brand)]" size={17} />
              <p>Your order and results stay in a private account.</p>
            </div>
            <Link href="/checkout" className="focus-ring secondary-action mt-3 w-full text-sm">
              <FileText size={16} />
              See visit instructions
            </Link>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
