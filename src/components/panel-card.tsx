import Link from "next/link";
import { CheckCircle2, ShieldCheck, ShoppingCart } from "lucide-react";
import { getTestsForPanel, formatCurrency } from "@/lib/catalog";
import type { Panel } from "@/lib/types";

export function PanelCard({ panel }: { panel: Panel }) {
  const tests = getTestsForPanel(panel.id);
  const isFeatured = panel.id === "complete-wellness";

  return (
    <article
      className={`flex h-full flex-col p-5 ${isFeatured ? "glass-card ring-1 ring-[rgba(31,111,104,0.35)]" : "premium-card"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-xs">{isFeatured ? "Most popular" : panel.subtitle}</p>
          <h3 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{panel.name}</h3>
          <p className="mt-1 text-xs font-medium text-[var(--muted)]">{tests.length} tests included</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-[var(--brand-dark)]">{formatCurrency(panel.price)}</p>
          <p className="text-xs text-[var(--muted)]">self-pay</p>
        </div>
      </div>
      <p className="mt-3 text-base leading-7 text-[var(--muted)]">{panel.description}</p>
      <p className="mt-3 flex items-start gap-2 rounded-[var(--radius)] bg-[var(--accent-soft)] p-3 text-sm font-medium leading-6 text-[var(--brand-dark)]">
        <ShieldCheck className="mt-0.5 shrink-0" size={17} />
        No doctor visit. No insurance billing. Provider authorization included where required.
      </p>
      <div className="mt-4 grid gap-2 text-[0.95rem] text-[var(--foreground)]">
        {tests.slice(0, 3).map((test) => (
          <span key={test?.id} className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[var(--brand)]" />
            {test?.name}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {panel.tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/cart?panel=${panel.id}`}
        className="focus-ring primary-action mt-auto w-full shadow-[0_22px_60px_rgba(6,18,29,0.22)]"
      >
        <ShoppingCart size={18} />
        Choose this panel
      </Link>
    </article>
  );
}
