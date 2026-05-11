import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, LockKeyhole, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { WaitlistForm } from "@/components/waitlist-form";
import { labTests, panels } from "@/data/catalog";
import { getTestsForPanel } from "@/lib/catalog";

const checkoutTrustFeatures = [
  "No payment collected today",
  "No DOB or full medical intake yet",
  "Launch invites by ZIP and state coverage",
  "Transparent pricing before ordering opens",
  "Full in-app ordering planned through an API lab partner",
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
  const selectedName = customTests.length ? "Custom Panel" : panel?.name ?? "Complete Wellness";
  const selectedPanelId = customTests.length ? "custom" : panel?.id ?? "complete-wellness";
  const selectedTests = customTests.length ? customTests : getTestsForPanel(panel?.id ?? "complete-wellness");

  return (
    <PageShell>
      <section className="blue-band">
        <div className="page-section">
          <p className="eyebrow">Early access</p>
          <h1 className="page-title mt-2">Join the launch list for this panel.</h1>
          <p className="page-copy mt-3 max-w-3xl">
            We are validating demand before turning on Junction-level ordering. Join the list and we will invite people
            as soon as full in-app lab ordering is ready in their area.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {["Choose tests", "Share interest", "Coverage check", "Launch invite"].map((item, index) => (
              <div key={item} className="checkout-step flex items-center gap-3 p-4 shadow-[0_14px_34px_rgba(16,22,21,0.06)]">
                <span className="simple-number">{index + 1}</span>
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="page-section grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="glass-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Selected</p>
              <h2 className="mt-2 text-3xl font-semibold">{selectedName}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                No public pricing yet. We will share exact launch pricing before accepting any order.
              </p>
            </div>
            <span className="pill pill-info">Waitlist only</span>
          </div>
          <div className="mt-5 grid gap-3">
            {selectedTests.map((test) => (
              <div
                key={test.id}
                className="flex justify-between gap-4 rounded-[var(--radius)] border border-white/60 bg-white/70 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.62)]"
              >
                <div>
                  <p className="font-medium">{test.name}</p>
                  <p className="text-sm text-[var(--muted)]">{test.fasting}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-[var(--brand-dark)]">Included</p>
              </div>
            ))}
          </div>
        </div>
        <aside id="waitlist" className="grid h-max scroll-mt-48 gap-4 lg:sticky lg:top-40 lg:scroll-mt-52">
          <WaitlistForm panelId={selectedPanelId} selectedName={selectedName} source="cart" compact />
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 text-[var(--brand-dark)]">
              <ShieldCheck size={20} />
              <p className="font-semibold">Demand capture before paid ordering</p>
            </div>
            <div className="mt-4 grid gap-2">
              {checkoutTrustFeatures.map((feature) => (
                <p key={feature} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <CheckCircle2 size={16} className="text-[var(--brand)]" />
                  {feature}
                </p>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-[var(--radius)] border border-white/60 bg-white/70 p-3 text-sm leading-6 text-[var(--muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)]">
              <LockKeyhole className="mt-1 shrink-0 text-[var(--brand)]" size={17} />
              <p>We are not taking lab orders until the backend partner economics make sense.</p>
            </div>
            <Link href="/catalog" className="focus-ring secondary-action mt-3 w-full text-sm">
              <FileText size={16} />
              Browse more panels
              <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
