import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { getTestsForPanel } from "@/lib/catalog";
import type { Panel } from "@/lib/types";

export function PanelCard({ panel }: { panel: Panel }) {
  const tests = getTestsForPanel(panel.id);
  const isFeatured = panel.id === "complete-wellness";

  return (
    <article
      className={`flex h-full flex-col p-5 ${isFeatured ? "glass-card ring-1 ring-[rgba(20,114,103,0.24)]" : "premium-card"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="premium-section-label">{isFeatured ? "Most popular" : panel.subtitle}</p>
          <h3 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{panel.name}</h3>
          <p className="mt-1 text-xs font-medium text-[var(--muted)]">{tests.length} tests included</p>
        </div>
        <div className="liquid-field shrink-0 px-3 py-2 text-right">
          <p className="text-sm font-semibold text-[var(--brand-dark)]">Early access</p>
          <p className="text-xs text-[var(--muted)]">pricing before launch</p>
        </div>
      </div>
      <p className="mt-3 text-base leading-7 text-[var(--muted)]">{panel.description}</p>
      <p className="mt-3 flex items-start gap-2 rounded-[var(--radius)] border border-white/60 bg-[var(--accent-soft)] p-3 text-sm font-medium leading-6 text-[var(--brand-dark)]">
        <ShieldCheck className="mt-0.5 shrink-0" size={17} />
        Full ordering is not live yet. Join the waitlist and we will invite customers by coverage area.
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
        href={`/cart?panel=${panel.id}#waitlist`}
        className="focus-ring primary-action mt-auto w-full shadow-[0_22px_60px_rgba(16,22,21,0.22)]"
      >
        Join waitlist
        <ArrowRight size={18} />
      </Link>
    </article>
  );
}
