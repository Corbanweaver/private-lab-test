import { PageShell } from "@/components/page-shell";
import type { OrderStatus } from "@/lib/types";

const steps: Array<{ status: OrderStatus; label: string; copy: string }> = [
  { status: "draft", label: "Draft", copy: "Cart and intake started." },
  { status: "eligible", label: "Eligible", copy: "ZIP/state passed conservative gating." },
  { status: "paid", label: "Paid", copy: "Stripe Checkout completed and webhook verified." },
  { status: "submitted_to_provider", label: "Submitted", copy: "Lab network accepted the order." },
  { status: "lab_order_ready", label: "Lab order ready", copy: "Requisition and appointment instructions available." },
  { status: "collected", label: "Collected", copy: "Specimen collection confirmed." },
  { status: "results_received", label: "Results received", copy: "PDF and biomarker values ingested." },
  { status: "reviewed", label: "Reviewed", copy: "Partner clinician/API completed review." },
  { status: "released", label: "Released", copy: "Results visible in the user dashboard." },
];

export default function OrdersPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow">Order flow</p>
        <h1 className="page-title mt-2">PLT-10041 timeline</h1>
        <div className="mt-8 grid gap-3">
          {steps.map((step, index) => (
            <div key={step.status} className="premium-card grid grid-cols-[44px_1fr] gap-3 p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--brand)] font-mono text-sm text-white">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold">{step.label}</p>
                <p className="text-sm text-[var(--muted)]">{step.copy}</p>
                <p className="mt-1 font-mono text-xs text-[var(--brand-dark)]">{step.status}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
