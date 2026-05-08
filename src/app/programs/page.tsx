import Link from "next/link";
import { ArrowRight, BadgeDollarSign, CheckCircle2, Clock, Layers3, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { healthPrograms, membershipConcepts, programStageLabels, scaleBenchmarks } from "@/data/health-programs";

export default function ProgramsPage() {
  const livePrograms = healthPrograms.filter((program) => program.stage === "live_lab_path");
  const futurePrograms = healthPrograms.filter((program) => program.stage !== "live_lab_path");

  return (
    <PageShell>
      <section className="deep-band">
        <div className="page-section grid items-end gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="eyebrow text-[#9ed5cc]">Private health programs</p>
            <h1 className="page-title mt-2 text-white">The bigger platform starts with labs.</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#dbe8e4]">
              Private Lab Test can grow from fast self-pay lab checkout into recurring private-health programs:
              baseline testing, metabolic tracking, hormones, longevity, caregiver support, and eventually licensed
              clinician pathways where appropriate.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/catalog" className="focus-ring primary-action">
                Choose a lab panel
                <ArrowRight size={17} />
              </Link>
              <Link href="/strategy" className="focus-ring secondary-action">
                Strategy dashboard
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Live lab paths", livePrograms.length],
              ["Expansion tracks", futurePrograms.length],
              ["Benchmarks", scaleBenchmarks.length],
            ].map(([label, value]) => (
              <div key={label} className="pulse-pill rounded-[var(--radius)] p-5 text-[var(--foreground)]">
                <p className="text-sm font-semibold text-[var(--muted)]">{label}</p>
                <p className="mt-2 text-4xl font-semibold text-[var(--brand-dark)]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow">Live first</p>
          <h2 className="mt-2 text-3xl font-semibold">Programs we can sell as lab-first paths.</h2>
          <p className="page-copy mt-3">
            These tracks use the current panels and keep the promise honest: labs, private results, educational context,
            and clinician discussion prompts where needed.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {livePrograms.map((program) => (
            <article key={program.id} className="premium-card flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="icon-tile">
                  <program.Icon size={21} />
                </span>
                <span className="pill pill-info">{programStageLabels[program.stage]}</span>
              </div>
              <p className="mt-5 text-sm font-semibold text-[var(--accent-strong)]">{program.subtitle}</p>
              <h3 className="mt-1 text-2xl font-semibold">{program.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{program.description}</p>
              <div className="mt-5 grid gap-2">
                {program.includes.slice(0, 5).map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 size={16} className="text-[var(--brand)]" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="mt-5 grid gap-2 rounded-[var(--radius)] bg-[var(--soft)] p-4 text-sm">
                <p className="flex items-start gap-2">
                  <BadgeDollarSign className="mt-0.5 shrink-0 text-[var(--brand)]" size={16} />
                  <span>{program.priceAnchor}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Clock className="mt-0.5 shrink-0 text-[var(--brand)]" size={16} />
                  <span>{program.cadence}</span>
                </p>
              </div>
              <Link href={`/cart?panel=${program.primaryPanelId}`} className="focus-ring primary-action mt-auto w-full">
                Start this path
                <ArrowRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="calm-band">
        <div className="page-section">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Scale tracks</p>
            <h2 className="mt-2 text-3xl font-semibold">The Hims/MEDVi-style expansion, without jumping the gun.</h2>
            <p className="page-copy mt-3">
              These are high-demand lanes, but each one needs the right provider, lab, privacy, and clinical operations
              underneath it before anything prescription-related goes live.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {futurePrograms.map((program) => (
              <article key={program.id} className="premium-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <span className="icon-tile">
                    <program.Icon size={21} />
                  </span>
                  <span className="pill">{programStageLabels[program.stage]}</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{program.title}</h3>
                <p className="mt-2 text-sm font-semibold text-[var(--brand-dark)]">{program.demandSignal}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{program.conversionPath}</p>
                <div className="mt-4 border-t border-[var(--line)] pt-4">
                  <p className="text-sm font-semibold">Future unlocks</p>
                  <ul className="mt-2 grid gap-2">
                    {program.futureExpansion.slice(0, 3).map((item) => (
                      <li key={item} className="simple-list-item text-sm text-[var(--muted)]">
                        <ArrowRight className="mt-1 shrink-0 text-[var(--accent-strong)]" size={15} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="eyebrow">Recurring engine</p>
            <h2 className="mt-2 text-3xl font-semibold">Membership ideas that turn one order into a relationship.</h2>
          </div>
          <p className="page-copy">
            The big companies compound because they keep helping after checkout. For this product, the cleanest version
            is retesting, trend dashboards, support, and later optional clinician review.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {membershipConcepts.map((concept) => (
            <article key={concept.id} className="premium-card p-5">
              <div className="flex items-start justify-between gap-4">
                <span className="icon-tile">
                  <Layers3 size={21} />
                </span>
                <span className="pill">{concept.status === "design_next" ? "Design next" : "Future"}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{concept.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{concept.value}</p>
              <p className="mt-4 text-sm font-semibold text-[var(--brand-dark)]">{concept.customerMoment}</p>
              <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{concept.operationalNeed}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white">
        <div className="page-section">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Benchmark lessons</p>
            <h2 className="mt-2 text-3xl font-semibold">What to borrow, and what to avoid.</h2>
          </div>
          <div className="table-shell overflow-x-auto">
            <table className="w-full min-w-[1040px] text-left text-sm">
              <thead className="bg-[var(--soft)] text-xs uppercase text-[var(--brand-dark)]">
                <tr>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Lesson</th>
                  <th className="px-4 py-3">Borrow</th>
                  <th className="px-4 py-3">Avoid</th>
                </tr>
              </thead>
              <tbody>
                {scaleBenchmarks.map((benchmark) => (
                  <tr key={benchmark.company} className="border-t border-[var(--line)] align-top">
                    <td className="px-4 py-3">
                      <a
                        href={benchmark.sourceHref}
                        className="focus-ring rounded-sm font-semibold text-[var(--brand-dark)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--brand)]"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {benchmark.company}
                      </a>
                      <p className="mt-1 text-xs text-[var(--muted)]">{benchmark.category}</p>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted)]">{benchmark.lesson}</td>
                    <td className="px-4 py-3">{benchmark.borrow}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{benchmark.avoid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-[var(--muted)]">
            <ShieldCheck className="mt-0.5 shrink-0 text-[var(--brand)]" size={17} />
            Prescription or treatment pathways should only go live through licensed clinicians, verified protocols,
            payment/refund clarity, privacy review, and state-by-state operations.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
