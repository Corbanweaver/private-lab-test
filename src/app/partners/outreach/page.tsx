import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Handshake,
  Mail,
  MapPinned,
  Phone,
  Send,
  Target,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import {
  outreachCadence,
  outreachCategoryLabels,
  outreachScripts,
  outreachStageLabels,
  outreachTargets,
  partnerQualificationChecklist,
  stageTone,
  summarizeOutreachTargets,
  weeklyOutreachKpis,
} from "@/data/lab-outreach";

const metricCards = [
  {
    label: "Targets loaded",
    value: summarizeOutreachTargets().targets,
    Icon: Target,
  },
  {
    label: "Priority partners",
    value: summarizeOutreachTargets().priorityTargets,
    Icon: Handshake,
  },
  {
    label: "States in focus",
    value: summarizeOutreachTargets().states,
    Icon: MapPinned,
  },
  {
    label: "Ready to contact",
    value: summarizeOutreachTargets().readyToContact,
    Icon: Send,
  },
];

export default function LabOutreachPage() {
  const summary = summarizeOutreachTargets();

  return (
    <PageShell>
      <section className="page-section">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Lab network acquisition</p>
            <h1 className="page-title mt-2">Build the cheapest useful lab network, one partner at a time</h1>
            <p className="page-copy mt-4">
              Start with API networks for coverage, add mobile draw access for older adults, then use real demand data
              to win better regional cash pricing.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {metricCards.map(({ label, value, Icon }) => (
              <div key={label} className="premium-card p-5">
                <Icon className="text-[var(--brand)]" size={22} />
                <p className="mt-3 text-sm text-[var(--muted)]">{label}</p>
                <p className="text-3xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="mailto:partners@privatelabtest.com" className="focus-ring primary-action">
            <Mail size={18} />
            Start outreach
          </a>
          <Link href="/partners" className="focus-ring secondary-action">
            <Handshake size={18} />
            Partner page
          </Link>
        </div>
      </section>

      <section className="calm-band">
        <div className="page-section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">30-day cadence</p>
              <h2 className="mt-2 text-3xl font-semibold">The operating plan</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
              The first goal is not perfect coverage. It is one reliable ordering path, one mobile-draw path, and enough
              pricing data to negotiate from reality.
            </p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            {outreachCadence.map((step) => (
              <article key={step.label} className="premium-card p-5">
                <span className="icon-tile">
                  <CalendarCheck size={21} />
                </span>
                <p className="mt-4 text-sm font-semibold text-[var(--accent)]">{step.label}</p>
                <h3 className="mt-1 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.goal}</p>
                <ul className="mt-4 space-y-3">
                  {step.actions.map((action) => (
                    <li key={action} className="simple-list-item text-sm">
                      <CheckCircle2 className="mt-1 shrink-0 text-[var(--brand)]" size={16} />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Lead list</p>
            <h2 className="mt-2 text-3xl font-semibold">Partners to contact first</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="pill pill-info">{summary.categories} categories</span>
            <span className="pill">{summary.readyToContact} queued</span>
          </div>
        </div>
        <div className="table-shell mt-6 overflow-x-auto">
          <table className="w-full min-w-[1180px] text-left text-sm">
            <thead className="bg-[var(--soft)] text-xs uppercase text-[var(--brand-dark)]">
              <tr>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Target</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Focus</th>
                <th className="px-4 py-3">Ask</th>
                <th className="px-4 py-3">Next step</th>
              </tr>
            </thead>
            <tbody>
              {outreachTargets.map((target) => (
                <tr key={target.id} className="border-t border-[var(--line)] align-top">
                  <td className="px-4 py-3">
                    <span className="simple-number h-8 w-8 text-sm">{target.priority}</span>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={target.website}
                      className="focus-ring rounded-sm font-semibold text-[var(--brand-dark)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--brand)]"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {target.name}
                    </a>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{target.relationshipType}</p>
                  </td>
                  <td className="px-4 py-3">{outreachCategoryLabels[target.category]}</td>
                  <td className="px-4 py-3">
                    <span className={`pill ${stageTone[target.stage]}`}>{outreachStageLabels[target.stage]}</span>
                  </td>
                  <td className="px-4 py-3">{target.statesFocus.join(", ")}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{target.ask}</td>
                  <td className="px-4 py-3 font-medium">{target.nextStep}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white">
        <div className="page-section">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="eyebrow">Qualification</p>
              <h2 className="mt-2 text-3xl font-semibold">Do not turn on a partner until these are clear</h2>
              <ul className="simple-list mt-5">
                {partnerQualificationChecklist.map((item) => (
                  <li key={item} className="simple-list-item">
                    <CheckCircle2 className="mt-1 shrink-0 text-[var(--brand)]" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="premium-card p-5">
                <span className="icon-tile">
                  <ClipboardList size={21} />
                </span>
                <h3 className="mt-4 text-xl font-semibold">Weekly scorecard</h3>
                <ul className="mt-4 space-y-3">
                  {weeklyOutreachKpis.map((kpi) => (
                    <li key={kpi} className="simple-list-item text-sm">
                      <ArrowRight className="mt-1 shrink-0 text-[var(--accent)]" size={16} />
                      <span>{kpi}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="premium-card p-5">
                <span className="icon-tile">
                  <Phone size={21} />
                </span>
                <h3 className="mt-4 text-xl font-semibold">Call order</h3>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
                  <li>1. Ask for business development or lab operations.</li>
                  <li>2. Confirm they accept prepaid cash-pay orders.</li>
                  <li>3. Ask for written pricing and state coverage.</li>
                  <li>4. Book the workflow call before discussing volume.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="flex items-center gap-3">
          <span className="icon-tile">
            <Mail size={21} />
          </span>
          <div>
            <p className="eyebrow">Scripts</p>
            <h2 className="text-3xl font-semibold">Copy for the first touches</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {outreachScripts.map((script) => (
            <article key={script.id} className="premium-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">{script.title}</h3>
                <span className="pill">{script.channel}</span>
              </div>
              {script.subject ? (
                <p className="mt-4 text-sm font-semibold text-[var(--brand-dark)]">Subject: {script.subject}</p>
              ) : null}
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{script.body}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
