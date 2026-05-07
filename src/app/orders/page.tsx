import { CheckCircle2, Headphones } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { conciergeTasks } from "@/data/lab-partners";
import type { OrderStatus } from "@/lib/types";

const steps: Array<{ status: OrderStatus; label: string; copy: string }> = [
  { status: "draft", label: "Draft", copy: "Cart and intake started." },
  { status: "eligible", label: "Eligible", copy: "ZIP/state passed conservative gating." },
  { status: "clinician_review", label: "Clinician review", copy: "Licensed clinician reviews the cash-pay wellness order." },
  { status: "authorized", label: "Authorized", copy: "Order is authorized before payment and lab submission." },
  { status: "paid", label: "Paid", copy: "Cash-pay checkout completed with no insurance billing." },
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
        <p className="page-copy mt-3">
          The launch workflow keeps families oriented from eligibility through clinician authorization, scheduling,
          collection, and results.
        </p>
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
        <div className="mt-10">
          <div className="flex items-center gap-3">
            <span className="icon-tile">
              <Headphones size={21} />
            </span>
            <div>
              <p className="eyebrow">Concierge workflow</p>
              <h2 className="text-2xl font-semibold">Family assurance milestones</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {conciergeTasks.map((task) => (
              <div key={task.id} className="premium-card p-4">
                <CheckCircle2 className="text-[var(--brand)]" size={20} />
                <p className="mt-3 font-semibold">{task.label}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{task.copy}</p>
                <p className="mt-3 font-mono text-xs text-[var(--brand-dark)]">{task.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
