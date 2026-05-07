import Link from "next/link";
import { ArrowRight, FileText, FlaskConical, ShieldCheck, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { sampleResults } from "@/data/catalog";
import { hasSupabaseConfig } from "@/lib/supabase";

export default function DashboardPage() {
  const configured = hasSupabaseConfig();
  const metrics: Array<[string, string, LucideIcon]> = [
    ["Active orders", "2", FlaskConical],
    ["Released reports", String(sampleResults.length), FileText],
    ["Provider review", "On", ShieldCheck],
    ["Account mode", configured ? "Live" : "Sample", UserRound],
  ];

  return (
    <PageShell>
      <section className="page-section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Account dashboard</p>
            <h1 className="page-title mt-2">Orders and results in one place</h1>
            <p className="page-copy mt-3 max-w-3xl">
              Check order status, lab instructions, released reports, and private educational insights.
            </p>
          </div>
          <Link href="/auth" className="focus-ring secondary-action">
            <UserRound size={18} />
            Account
          </Link>
        </div>
        {!configured && (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Live account storage is not connected in this preview. Orders and results are shown with sample data.
          </div>
        )}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {metrics.map(([label, value, Icon]) => (
            <div key={label} className="premium-card p-5">
              <Icon className="text-[var(--brand)]" size={22} />
              <p className="mt-3 text-sm text-[var(--muted)]">{label}</p>
              <p className="text-3xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Link href="/orders" className="focus-ring premium-card p-5">
            <FlaskConical className="text-[var(--brand)]" size={22} />
            <h2 className="mt-3 text-xl font-semibold">Order timeline</h2>
            <p className="mt-2 text-[var(--muted)]">Track paid, submitted, ready, collected, reviewed, and released orders.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-semibold text-[var(--brand-dark)]">
              View orders <ArrowRight size={17} />
            </span>
          </Link>
          <Link href="/results" className="focus-ring premium-card p-5">
            <FileText className="text-[var(--brand)]" size={22} />
            <h2 className="mt-3 text-xl font-semibold">Results and insights</h2>
            <p className="mt-2 text-[var(--muted)]">View private result PDFs, normalized values, flags, and education.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-semibold text-[var(--brand-dark)]">
              View results <ArrowRight size={17} />
            </span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
