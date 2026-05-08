import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Flag,
  FlaskConical,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  aiGrowthLaneLabels,
  aiGrowthSprints,
  aiGrowthStackTools,
  aiGrowthStageLabels,
  aiOperatingPrinciples,
  getPriorityAiGrowthTools,
} from "@/data/ai-growth-stack";

const priorityTools = getPriorityAiGrowthTools();

export default function GrowthPage() {
  return (
    <PageShell>
      <section className="deep-band">
        <div className="page-section grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-[#9ed5cc]">AI growth operating system</p>
            <h1 className="page-title mt-2 text-white">Make Private Lab Test feel like the next premium telehealth company.</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#dbe8e4]">
              The goal is not to add AI sparkle. It is to make ordering, follow-up, partner acquisition, compliance, and
              product iteration compound faster than a normal lab storefront.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/catalog" className="focus-ring primary-action">
                Start with catalog
                <ArrowRight size={17} />
              </Link>
              <Link href="/partners/outreach" className="focus-ring secondary-action">
                Lab acquisition
              </Link>
              <Link href="/strategy" className="focus-ring secondary-action">
                Strategy dashboard
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Priority tools", priorityTools.length],
              ["Sprints", aiGrowthSprints.length],
              ["Guardrails", aiOperatingPrinciples.length],
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
          <p className="eyebrow">The stack</p>
          <h2 className="mt-2 text-3xl font-semibold">Tools that make the company bigger than checkout.</h2>
          <p className="page-copy mt-3">
            Each tool has a lane, an activation point, and hard guardrails so growth does not outrun trust.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {aiGrowthStackTools.map((tool) => (
            <article key={tool.id} className="premium-card flex h-full flex-col p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <span className="icon-tile">
                  <tool.Icon size={21} />
                </span>
                <div className="flex flex-wrap justify-end gap-2">
                  <span className="pill">{aiGrowthStageLabels[tool.stage]}</span>
                  <span className="pill pill-info">P{tool.priority}</span>
                </div>
              </div>
              <p className="mt-5 text-sm font-semibold text-[var(--accent-strong)]">{aiGrowthLaneLabels[tool.lane]}</p>
              <h3 className="mt-1 text-2xl font-semibold">{tool.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{tool.role}</p>
              <p className="mt-4 text-sm font-semibold text-[var(--brand-dark)]">{tool.firstUse}</p>
              <div className="mt-4 rounded-[var(--radius)] bg-[var(--soft)] p-4 text-sm leading-6 text-[var(--muted)]">
                {tool.implementation}
              </div>
              <div className="mt-4 grid gap-2">
                {tool.guardrails.slice(0, 3).map((item) => (
                  <p key={item} className="simple-list-item text-sm">
                    <ShieldCheck className="mt-1 shrink-0 text-[var(--brand)]" size={15} />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
              <a
                href={tool.sourceHref}
                className="focus-ring mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[var(--brand-dark)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--brand)]"
                target="_blank"
                rel="noreferrer"
              >
                Source
                <ExternalLink size={15} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="calm-band">
        <div className="page-section">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Build order</p>
            <h2 className="mt-2 text-3xl font-semibold">The implementation sequence.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-5">
            {aiGrowthSprints.map((sprint, index) => (
              <article key={sprint.id} className="premium-card p-5">
                <span className="simple-number h-9 w-9 text-sm">{index + 1}</span>
                <p className="mt-4 text-sm font-semibold text-[var(--accent-strong)]">{sprint.timing}</p>
                <h3 className="mt-1 text-xl font-semibold">{sprint.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{sprint.goal}</p>
                <div className="mt-4 grid gap-2">
                  {sprint.acceptance.slice(0, 2).map((item) => (
                    <p key={item} className="simple-list-item text-sm">
                      <CheckCircle2 className="mt-1 shrink-0 text-[var(--brand)]" size={15} />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="eyebrow">Operating rules</p>
            <h2 className="mt-2 text-3xl font-semibold">The lines we do not cross.</h2>
            <p className="page-copy mt-3">
              This is healthcare-adjacent growth. The company gets stronger if the privacy posture is boring, strict,
              and documented from the beginning.
            </p>
            <Link href="/catalog" className="focus-ring primary-action mt-6">
              Keep selling labs
              <FlaskConical size={17} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {aiOperatingPrinciples.map((principle) => (
              <article key={principle.id} className="premium-card p-5">
                <span className="icon-tile">
                  <Flag size={21} />
                </span>
                <h3 className="mt-4 text-xl font-semibold">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{principle.policy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white">
        <div className="page-section">
          <div className="mb-6 max-w-3xl">
            <p className="eyebrow">Environment checklist</p>
            <h2 className="mt-2 text-3xl font-semibold">Accounts we need to connect next.</h2>
          </div>
          <div className="table-shell overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-[var(--soft)] text-xs uppercase text-[var(--brand-dark)]">
                <tr>
                  <th className="px-4 py-3">Tool</th>
                  <th className="px-4 py-3">Lane</th>
                  <th className="px-4 py-3">Env vars</th>
                  <th className="px-4 py-3">Before PHI</th>
                </tr>
              </thead>
              <tbody>
                {aiGrowthStackTools
                  .filter((tool) => tool.envVars.length > 0 || tool.beforePhi.length > 0)
                  .map((tool) => (
                    <tr key={tool.id} className="border-t border-[var(--line)] align-top">
                      <td className="px-4 py-3 font-semibold">{tool.name}</td>
                      <td className="px-4 py-3">{aiGrowthLaneLabels[tool.lane]}</td>
                      <td className="px-4 py-3 text-[var(--muted)]">
                        {tool.envVars.length ? tool.envVars.join(", ") : "No app env yet"}
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)]">{tool.beforePhi.slice(0, 3).join(", ")}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="premium-card flex flex-wrap items-center justify-between gap-5 p-6">
          <div className="flex items-start gap-4">
            <span className="icon-tile">
              <Sparkles size={21} />
            </span>
            <div>
              <p className="eyebrow">Current implementation</p>
              <h2 className="mt-1 text-2xl font-semibold">The safe foundation is already wired.</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                The app now has a concierge endpoint, a sanitized growth-event endpoint, and this roadmap as structured
                data. The next unlock is connecting real accounts and credentials.
              </p>
            </div>
          </div>
          <Link href="/strategy" className="focus-ring secondary-action">
            Strategy dashboard
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
