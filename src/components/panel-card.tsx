import Link from "next/link";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { getTestsForPanel, formatCurrency } from "@/lib/catalog";
import type { Panel } from "@/lib/types";

export function PanelCard({ panel }: { panel: Panel }) {
  const tests = getTestsForPanel(panel.id);

  return (
    <article className="premium-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-xs">{panel.subtitle}</p>
          <h3 className="mt-2 text-xl font-semibold text-[var(--foreground)]">{panel.name}</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-[var(--brand-dark)]">{formatCurrency(panel.price)}</p>
          <p className="text-xs text-[var(--muted)] line-through">{formatCurrency(panel.compareAt)}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{panel.description}</p>
      <div className="mt-4 grid gap-2 text-[0.95rem] text-[var(--foreground)]">
        {tests.slice(0, 4).map((test) => (
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
        className="focus-ring primary-action mt-5 w-full"
      >
        <ShoppingCart size={18} />
        Add panel
      </Link>
    </article>
  );
}
