import Link from "next/link";
import { CheckCircle2, CreditCard, FlaskConical, Headphones, Stethoscope } from "lucide-react";
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
      "Clinician review",
      params.auth ? `Authorization ${params.auth} is approved.` : "A licensed clinician reviews eligible orders before lab submission.",
    ],
    [CreditCard, "Prepaid cash price", "No insurance or Medicare billing is used in this launch flow."],
    [Headphones, "Concierge support", "Scheduling, prep, result readiness, and family sharing are supported."],
  ];

  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="premium-card p-6">
          <div className="flex items-center gap-3">
            <span className="icon-tile h-12 w-12">
              <CreditCard size={24} />
            </span>
            <div>
              <p className="eyebrow">Next steps</p>
              <h1 className="text-3xl font-semibold">Clinician-authorized cash-pay order</h1>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {nextSteps.map(([Icon, title, copy]) => (
              <div key={title} className="rounded-md bg-[var(--soft)] p-4">
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
                <p className="font-semibold">Partner route: {partner.name}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                  {partner.orderWorkflow} Requisition flow: {partner.requisitionProcess}
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/orders"
            className="focus-ring primary-action mt-6"
          >
            <FlaskConical size={18} />
            View order timeline
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
