import Link from "next/link";
import { CheckCircle2, CreditCard, FlaskConical } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export default function CheckoutPage() {
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
              <h1 className="text-3xl font-semibold">Secure payment and lab order</h1>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Secure payment", "Hosted checkout for a one-time lab purchase."],
              ["Lab order", "Requisition and appointment instructions are prepared."],
              ["Account dashboard", "Instructions, status, results, and reviewed insights stay private."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-md bg-[var(--soft)] p-4">
                <CheckCircle2 className="text-[var(--brand)]" size={20} />
                <h2 className="mt-3 font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{copy}</p>
              </div>
            ))}
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
