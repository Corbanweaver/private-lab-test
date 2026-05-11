import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import type { LabTest } from "@/lib/types";

export function TestCard({ test }: { test: LabTest }) {
  return (
    <article className="premium-card flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="premium-section-label">{test.category}</p>
          <h3 className="mt-1 text-xl font-semibold text-[var(--foreground)]">{test.name}</h3>
        </div>
        <p className="liquid-field shrink-0 px-3 py-2 text-sm font-semibold text-[var(--brand-dark)]">Waitlist</p>
      </div>
      <p className="mt-2 text-base leading-7 text-[var(--muted)]">{test.description}</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="liquid-field p-3">
          <dt className="text-[var(--muted)]">Sample</dt>
          <dd className="font-medium">{test.specimen}</dd>
        </div>
        <div className="liquid-field p-3">
          <dt className="text-[var(--muted)]">Results timing</dt>
          <dd className="font-medium">{test.turnaround}</dd>
        </div>
        <div className="liquid-field col-span-2 p-3">
          <dt className="text-[var(--muted)]">Before visit</dt>
          <dd className="font-medium">{test.fasting}</dd>
        </div>
      </dl>
      <p className="mt-4 rounded-[var(--radius)] border border-white/60 bg-[var(--accent-soft)] p-3 text-sm font-medium leading-6 text-[var(--brand-dark)]">
        Add this to your interest list. We will share launch pricing before orders open.
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
        className="focus-ring secondary-action mt-auto w-full text-sm"
      >
        <Plus size={16} />
        Add interest
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
