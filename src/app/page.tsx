import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Handshake,
  Headphones,
  Search,
  Stethoscope,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { panels } from "@/data/catalog";
import { customerTrustFeatures } from "@/data/lab-partners";
import { summarizeLabSupply } from "@/lib/lab-access";

export default function Home() {
  const supply = summarizeLabSupply();
  const steps: Array<[string, string, LucideIcon]> = [
    ["Choose", "Pick a ready-made panel or ask concierge for help.", Search],
    ["Clinician review", "A licensed clinician authorizes eligible cash-pay orders.", Stethoscope],
    ["Get support", "Concierge helps with scheduling, prep, results, and family sharing.", Headphones],
  ];
  const metrics = [
    ["Supply tracks", "4", "Aggregator, regional, mobile, and national lab paths."],
    ["Launch states", String(supply.states), "State-by-state rules with clinician authorization."],
    ["Cash menu items", String(supply.cashMenuCount), "Prepaid prices before a family pays."],
  ];

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-[var(--line)] bg-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.9) 48%, rgba(255,255,255,0.58) 100%), url('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="page-section relative py-14 lg:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow">Safe cash-pay lab access</p>
            <h1 className="page-title mt-4 max-w-4xl">
              Affordable lab tests with concierge help families can trust.
            </h1>
            <p className="page-copy mt-5 max-w-2xl">
              Prepaid cash prices, licensed clinician review, CLIA-focused lab partners, and a simple dashboard for older
              adults and the loved ones helping them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="focus-ring primary-action w-full sm:w-auto"
              >
                <Search size={19} />
                Browse affordable tests
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/partners"
                className="focus-ring secondary-action w-full sm:w-auto"
              >
                <Handshake size={19} />
                See partner plan
              </Link>
            </div>
            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {customerTrustFeatures.slice(0, 3).map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-md bg-white/90 px-3 py-3 text-sm font-semibold text-[var(--brand-dark)] shadow-sm">
                  <CheckCircle2 size={17} className="text-[var(--brand)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-[var(--line)] bg-[var(--background)]">
        <div className="page-section py-10">
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map(([title, copy, Icon]) => (
              <div key={title} className="premium-card p-5">
                <span className="icon-tile">
                  <Icon size={22} />
                </span>
                <h2 className="mt-4 text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-[var(--muted)]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b border-[var(--line)] bg-white">
        <div className="page-section py-10">
          <div className="grid gap-4 md:grid-cols-3">
            {metrics.map(([label, value, copy]) => (
              <div key={label} className="premium-card p-5">
                <p className="text-sm font-semibold text-[var(--muted)]">{label}</p>
                <p className="mt-2 text-4xl font-semibold text-[var(--brand-dark)]">{value}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Cash-pay wellness panels</p>
            <h2 className="mt-2 text-3xl font-semibold">Start with a trusted, simple option</h2>
          </div>
          <Link href="/builder" className="focus-ring secondary-action desktop-action text-sm">
            <BadgeDollarSign size={17} />
            Build custom
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {panels.slice(0, 3).map((panel) => (
            <PanelCard key={panel.id} panel={panel} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
