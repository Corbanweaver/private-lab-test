import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, CheckCircle2, ExternalLink, FlaskConical, Layers3, Target } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  careLayerStageLabels,
  retentionLoops,
  scaleBenchmarks,
  subscriptionTiers,
  telehealthCareLayers,
} from "@/data/health-programs";
import {
  commonLabDemand,
  networkExpansionPlays,
  premiumUiPrinciples,
  productResearchSources,
  trustDrivers,
} from "@/data/product-research";

export default function StrategyPage() {
  return (
    <PageShell>
      <section className="deep-band">
        <div className="page-section grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-[#9ed5cc]">Product strategy</p>
            <h1 className="page-title mt-2 text-white">Research-backed next moves for Private Lab Test.</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#dbe8e4]">
              This is the working dashboard for customer trust, common lab demand, lab-network expansion, and premium UI
              decisions. It keeps the product pointed at the next real unlock: reliable ordering coverage.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/partners/outreach" className="focus-ring primary-action">
                <Target size={18} />
                Work partner outreach
                <ArrowRight size={17} />
              </Link>
              <Link href="/catalog" className="focus-ring secondary-action">
                <FlaskConical size={18} />
                Review catalog
              </Link>
              <Link href="/programs" className="focus-ring secondary-action">
                <Layers3 size={18} />
                Programs
              </Link>
              <Link href="/growth" className="focus-ring secondary-action">
                <BrainCircuit size={18} />
                AI growth stack
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Trust drivers", trustDrivers.length],
              ["Common tests", commonLabDemand.length],
              ["Care layers", telehealthCareLayers.length],
            ].map(([label, value]) => (
              <div key={label} className="pulse-pill rounded-[var(--radius)] p-5 text-[var(--foreground)]">
                <p className="text-sm font-semibold text-[var(--muted)]">{label}</p>
                <p className="mt-2 text-4xl font-semibold text-[var(--brand-dark)]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-band">
        <div className="page-section">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Scale benchmarks</p>
            <h2 className="mt-2 text-3xl font-semibold">The companies to learn from.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {scaleBenchmarks.map((benchmark) => (
              <a
                key={benchmark.company}
                href={benchmark.sourceHref}
                className="focus-ring premium-card p-5"
                target="_blank"
                rel="noreferrer"
              >
                <p className="text-sm font-semibold text-[var(--accent-strong)]">{benchmark.category}</p>
                <h3 className="mt-2 text-xl font-semibold">{benchmark.company}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{benchmark.lesson}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="eyebrow">Telehealth direction</p>
            <h2 className="mt-2 text-3xl font-semibold">The next MedVi move is care continuity, not just more tests.</h2>
          </div>
          <p className="page-copy">
            The platform should become a relationship: order labs, understand results, talk to a clinician when needed,
            retest on a sane cadence, and join a transparent membership when the value is obvious.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-5">
          {telehealthCareLayers.map((layer) => (
            <article key={layer.id} className="premium-card p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="icon-tile">
                  <layer.Icon size={21} />
                </span>
                <span className="pill">{careLayerStageLabels[layer.stage]}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{layer.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{layer.customerPromise}</p>
              <p className="mt-4 text-xs leading-5 text-[var(--muted)]">{layer.operationalRequirements[0]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="calm-band">
        <div className="page-section">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <p className="eyebrow">Subscription model</p>
              <h2 className="mt-2 text-3xl font-semibold">The recurring products we should build toward.</h2>
            </div>
            <Link href="/programs" className="focus-ring secondary-action">
              Programs
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="table-shell overflow-x-auto">
            <table className="w-full min-w-[1040px] text-left text-sm">
              <thead className="bg-[var(--soft)] text-xs uppercase text-[var(--brand-dark)]">
                <tr>
                  <th className="px-4 py-3">Tier</th>
                  <th className="px-4 py-3">Cadence</th>
                  <th className="px-4 py-3">Positioning</th>
                  <th className="px-4 py-3">Safeguard</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionTiers.map((tier) => (
                  <tr key={tier.id} className="border-t border-[var(--line)] align-top">
                    <td className="px-4 py-3 font-semibold">{tier.title}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{tier.cadence}</td>
                    <td className="px-4 py-3">{tier.positioning}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{tier.safeguards[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow">Retention</p>
          <h2 className="mt-2 text-3xl font-semibold">What makes customers come back.</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-5">
          {retentionLoops.map((loop) => (
            <article key={loop.id} className="premium-card p-5">
              <span className="icon-tile">
                <loop.Icon size={21} />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{loop.title}</h3>
              <p className="mt-2 text-sm font-semibold text-[var(--brand-dark)]">{loop.businessValue}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{loop.customerValue}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="calm-band">
        <div className="page-section">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Customer trust</p>
            <h2 className="mt-2 text-3xl font-semibold">What people need to believe before they order.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {trustDrivers.map(({ id, title, priority, productMove, Icon }) => (
              <article key={id} className="premium-card p-5">
                <span className="icon-tile">
                  <Icon size={21} />
                </span>
                <p className="mt-4 text-sm font-semibold text-[var(--accent-strong)]">{priority}</p>
                <h3 className="mt-1 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{productMove}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-band">
        <div className="page-section">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <p className="eyebrow">Common test demand</p>
              <h2 className="mt-2 text-3xl font-semibold">Build the cheapest useful catalog first.</h2>
            </div>
            <Link href="/catalog" className="focus-ring secondary-action">
              Catalog
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="table-shell overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="bg-[var(--soft)] text-xs uppercase text-[var(--brand-dark)]">
                <tr>
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Test</th>
                  <th className="px-4 py-3">Customer reason</th>
                  <th className="px-4 py-3">Product move</th>
                </tr>
              </thead>
              <tbody>
                {commonLabDemand.map((item) => (
                  <tr key={item.testId} className="border-t border-[var(--line)] align-top">
                    <td className="px-4 py-3">
                      <span className="simple-number h-8 w-8 text-sm">{item.rank}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold">{item.label}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{item.customerReason}</td>
                    <td className="px-4 py-3">{item.nextProductMove}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow">Network build</p>
          <h2 className="mt-2 text-3xl font-semibold">The partner order of operations.</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {networkExpansionPlays.map(({ id, title, lane, priority, targetNames, ask, productUnlock, Icon }) => (
            <article key={id} className="premium-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <span className="icon-tile">
                  <Icon size={21} />
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="pill">{priority}</span>
                  <span className="pill pill-info">{lane}</span>
                </div>
              </div>
              <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm font-semibold text-[var(--brand-dark)]">{targetNames.join(", ")}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{ask}</p>
              <p className="mt-4 flex items-start gap-2 text-sm font-semibold text-[var(--foreground)]">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--brand)]" size={16} />
                {productUnlock}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white">
        <div className="page-section grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Premium UI</p>
            <h2 className="mt-2 text-3xl font-semibold">How the site should feel as it matures.</h2>
            <p className="page-copy mt-3">
              The premium benchmark is calm, decisive, private, and clinically restrained. The app should sell clarity,
              not overwhelm people with medical noise.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {premiumUiPrinciples.map((principle) => (
              <div key={principle.id} className="premium-card p-5">
                <h3 className="text-xl font-semibold">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{principle.implementation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="flex items-center gap-3">
          <span className="icon-tile">
            <BookOpen size={21} />
          </span>
          <div>
            <p className="eyebrow">Sources</p>
            <h2 className="text-3xl font-semibold">Research links used for this sprint.</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {productResearchSources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              className="focus-ring premium-card flex items-start justify-between gap-4 p-5"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <span className="block font-semibold text-[var(--brand-dark)]">{source.label}</span>
                <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">{source.note}</span>
              </span>
              <ExternalLink className="shrink-0 text-[var(--brand)]" size={18} />
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
