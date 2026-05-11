import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, FileText, MapPin, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { WaitlistForm } from "@/components/waitlist-form";

const nextSteps: Array<[LucideIcon, string, string]> = [
  [ClipboardList, "Join the waitlist", "Share email, ZIP, state, and the panel you want first."],
  [MapPin, "Map demand by region", "We use waitlist ZIP/state signals to choose launch areas and lab coverage."],
  [FileText, "Open ordering later", "Launch pricing and full ordering details are shared before anyone pays."],
];

export default function CheckoutPage() {
  return (
    <PageShell>
      <section className="blue-band">
        <div className="page-section grid gap-6 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="eyebrow">Ordering paused</p>
            <h1 className="page-title mt-2">We are not taking payments yet.</h1>
            <p className="page-copy mt-3 max-w-3xl">
              Junction is the right full backend for direct in-app lab ordering, but the monthly cost only makes sense
              after we prove demand. For now, Private Lab Test is collecting launch interest instead of payment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#waitlist" className="focus-ring primary-action">
                Join waitlist
                <ArrowRight size={17} />
              </Link>
              <Link href="/catalog" className="focus-ring secondary-action">
                Browse panels
              </Link>
            </div>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 text-[var(--brand-dark)]">
              <ShieldCheck size={21} />
              <p className="font-semibold">No payment or medical intake today</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              We will only turn paid ordering back on when the provider API, state coverage, pricing, authorization,
              and result flow are ready end to end.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3">
            <span className="icon-tile h-12 w-12">
              <ClipboardList size={24} />
            </span>
            <div>
              <p className="eyebrow">Launch flow</p>
              <h2 className="text-3xl font-semibold">What happens next</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {nextSteps.map(([Icon, title, copy]) => (
              <div
                key={title}
                className="rounded-[var(--radius-lg)] border border-[rgba(6,18,29,0.13)] bg-[var(--panel-strong)] p-4 shadow-[0_14px_34px_rgba(6,18,29,0.08)]"
              >
                <Icon className="text-[var(--brand)]" size={20} />
                <h2 className="mt-3 font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[var(--radius-lg)] border border-[rgba(6,18,29,0.13)] bg-[var(--panel-strong)] p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 text-[var(--brand)]" size={20} />
              <div>
                <p className="font-semibold">The target is still full in-app ordering.</p>
                <p className="mt-1 text-base leading-7 text-[var(--muted)]">
                  The waitlist gives us leverage before paying for the backend: which panels people want, which states
                  matter first, and whether the product deserves the next investment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside id="waitlist" className="h-max scroll-mt-48 lg:sticky lg:top-40">
          <WaitlistForm selectedName="Complete Wellness" source="checkout-paused" compact />
        </aside>
      </section>
    </PageShell>
  );
}
