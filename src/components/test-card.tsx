import Link from "next/link";
import { Plus } from "lucide-react";
import { formatCurrency } from "@/lib/catalog";
import type { LabTest } from "@/lib/types";

export function TestCard({ test }: { test: LabTest }) {
  return (
    <article className="premium-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-xs">{test.category}</p>
          <h3 className="mt-1 text-xl font-semibold text-[var(--foreground)]">{test.name}</h3>
        </div>
        <p className="font-semibold text-[var(--brand-dark)]">{formatCurrency(test.price)}</p>
      </div>
      <p className="mt-2 text-base leading-7 text-[var(--muted)]">{test.description}</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-[var(--muted)]">Sample</dt>
          <dd className="font-medium">{test.specimen}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Results timing</dt>
          <dd className="font-medium">{test.turnaround}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[var(--muted)]">Before visit</dt>
          <dd className="font-medium">{test.fasting}</dd>
        </div>
      </dl>
      <p className="mt-4 rounded-md bg-[var(--soft)] p-3 text-sm font-medium leading-6 text-[var(--brand-dark)]">
        Cash-pay test. No insurance billing.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {test.biomarkers.slice(0, 4).map((marker) => (
          <span key={marker} className="pill pill-info">
            {marker}
          </span>
        ))}
      </div>
      <Link
        href={`/builder?add=${test.id}`}
        className="focus-ring secondary-action mt-4 w-full text-sm"
      >
        <Plus size={16} />
        Add to order
      </Link>
    </article>
  );
}
