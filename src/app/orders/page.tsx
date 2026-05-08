import { CheckCircle2, Headphones } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { conciergeTasks } from "@/data/lab-partners";

const steps: Array<{ id: string; label: string; copy: string }> = [
  { id: "draft", label: "You chose tests", copy: "Your panel is saved in the cart." },
  { id: "eligible", label: "We checked your state", copy: "We confirm lab ordering is available before payment." },
  { id: "authorized", label: "Authorization included", copy: "Provider authorization is handled automatically where required." },
  { id: "paid", label: "Payment complete", copy: "The cash price is paid before the lab visit." },
  { id: "submitted_to_provider", label: "Sent to lab", copy: "The lab network receives your order." },
  {
    id: "requisition_pending",
    label: "Requisition pending",
    copy: "Some provider networks return the requisition PDF after the order has a sample ID.",
  },
  { id: "lab_order_ready", label: "Ready for visit", copy: "Your final requisition and visit instructions are ready." },
  { id: "collected", label: "Blood draw done", copy: "The lab confirms collection." },
  { id: "results_received", label: "Results received", copy: "Your results are added to your account." },
  { id: "reviewed", label: "Checked for next steps", copy: "Important items are flagged clearly." },
  { id: "released", label: "Ready to view", copy: "You and your loved one can review results." },
];

export default function OrdersPage() {
  return (
    <PageShell>
      <section className="blue-band">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="eyebrow">My order</p>
          <h1 className="page-title mt-2">What is happening now?</h1>
          <p className="page-copy mt-3">
            A simple checklist so you always know the next step.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mt-8 grid gap-3">
          {steps.map((step, index) => (
            <div key={step.id} className="premium-card grid grid-cols-[44px_1fr] gap-3 p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--brand)] font-mono text-sm text-white">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold">{step.label}</p>
                <p className="text-sm text-[var(--muted)]">{step.copy}</p>
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
              <p className="eyebrow">Extra help</p>
              <h2 className="text-2xl font-semibold">Extra help from concierge</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {conciergeTasks.map((task) => (
              <div key={task.id} className="premium-card p-4">
                <CheckCircle2 className="text-[var(--brand)]" size={20} />
                <p className="mt-3 font-semibold">{task.label}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{task.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
