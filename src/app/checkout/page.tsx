import Link from "next/link";
import { ArrowRight, CheckCircle2, CreditCard, FlaskConical, Headphones, LockKeyhole, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { labPartners } from "@/data/lab-partners";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ partner?: string; auth?: string }>;
}) {
  const params = await searchParams;
  const partner = labPartners.find((item) => item.id === params.partner) ?? labPartners[0];
  const nextSteps: Array<[LucideIcon, string, string]> = [
    [
      Stethoscope,
      "Order review",
      params.auth ? "Your order review is approved." : "A licensed clinician reviews eligible orders before they go to the lab.",
    ],
    [CreditCard, "Clear cash price", "You pay before the lab visit. No surprise bill at the lab."],
    [Headphones, "Need help?", "A real person can help with scheduling, prep, and result questions."],
  ];

  return (
    <PageShell>
      <section className="blue-band">
        <div className="page-section grid gap-6 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="eyebrow">Step 3</p>
            <h1 className="page-title mt-2">Your order is almost ready.</h1>
            <p className="page-copy mt-3 max-w-3xl">
              We keep this part simple: review, lab instructions, and private results in one place.
            </p>
          </div>
          <div className="glass-card p-5">
            <p className="eyebrow">Current status</p>
            <h2 className="mt-2 text-2xl font-semibold">{params.auth ? "Order review approved" : "Order review next"}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              {params.auth ? "You can move to your order steps now." : "Eligible orders are checked before the lab visit."}
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="glass-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
            <span className="icon-tile h-12 w-12">
              <CreditCard size={24} />
            </span>
            <div>
              <p className="eyebrow">Checkout flow</p>
              <h2 className="text-3xl font-semibold">What happens next</h2>
            </div>
          </div>
            <Link href="/cart?panel=complete-wellness#checkout" className="focus-ring secondary-action text-sm">
              <CreditCard size={17} />
              Back to checkout
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {nextSteps.map(([Icon, title, copy]) => (
              <div key={title} className="rounded-md bg-white p-4 shadow-sm">
                <Icon className="text-[var(--brand)]" size={20} />
                <h2 className="mt-3 font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-md border border-[var(--line)] bg-white p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 text-[var(--brand)]" size={20} />
              <div>
                <p className="font-semibold">Your lab network: {partner.name}</p>
                <p className="mt-1 text-base leading-7 text-[var(--muted)]">
                  We prepare the lab order, help you schedule if needed, and keep results in your private account.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-md bg-[var(--soft)] p-4">
            <LockKeyhole className="mt-1 text-[var(--brand)]" size={20} />
            <p className="text-sm leading-6 text-[var(--muted)]">
              Results stay private and can be shared with a loved one from your account.
            </p>
          </div>
          <Link
            href="/orders"
            className="focus-ring primary-action mt-6"
          >
            <FlaskConical size={18} />
            See my steps
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
