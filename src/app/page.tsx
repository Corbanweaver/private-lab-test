import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  Headphones,
  HeartPulse,
  MapPin,
  Search,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { WaitlistForm } from "@/components/waitlist-form";
import { panels } from "@/data/catalog";
import { healthPrograms } from "@/data/health-programs";
import { commonLabDemand, networkExpansionPlays, trustDrivers } from "@/data/product-research";
import { getTestsForPanel } from "@/lib/catalog";
import { summarizeLabSupply } from "@/lib/lab-access";

export default function Home() {
  const supply = summarizeLabSupply();
  const featuredPanel = panels.find((panel) => panel.id === "complete-wellness") ?? panels[0];
  const featuredTests = getTestsForPanel(featuredPanel.id).slice(0, 5);
  const topTests = commonLabDemand.slice(0, 6);
  const trustCards = trustDrivers.slice(0, 4);
  const networkCards = networkExpansionPlays.slice(0, 3);
  const programCards = healthPrograms.slice(0, 3);
  const steps: Array<[string, string, LucideIcon]> = [
    ["Choose tests", "Pick a ready-made panel or add individual tests.", Search],
    ["Enter ZIP and basic info", "Tell us where you want to test and who the order is for.", ClipboardList],
    ["Share ZIP and interest", "Tell us where demand is strongest before launch.", MapPin],
    ["Get launch access", "We will invite customers when ordering is ready in their area.", ClipboardList],
  ];
  const benefits: Array<[string, string, LucideIcon]> = [
    ["No medical intake today", "Join with email and location interest only.", HeartPulse],
    ["No payment today", "We will share launch pricing before any order opens.", ShieldCheck],
    ["Full backend planned", "Junction-level in-app ordering is the target when the economics work.", ShieldCheck],
    ["Real support", "We will use waitlist feedback to shape the first launch regions.", Headphones],
  ];
  const trustSignals = [
    "Launch pricing before orders",
    "Private results",
    "Nearby lab demand tracking",
    "Full in-app ordering planned",
  ] as const;

  return (
    <PageShell>
      <section className="deep-band relative overflow-hidden">
        <div className="page-section hero-shell grid items-center gap-10 py-12 lg:grid-cols-[0.94fr_1.06fr] lg:py-16">
          <div className="relative z-10 min-w-0">
            <div className="flex flex-wrap gap-2">
              <div className="pulse-pill inline-flex items-center gap-2 rounded-[var(--radius)] px-4 py-2 text-sm font-semibold text-[var(--brand-dark)]">
                <ShieldCheck size={16} />
                Early access
              </div>
              <div className="pulse-pill inline-flex items-center gap-2 rounded-[var(--radius)] px-4 py-2 text-sm font-semibold text-[var(--brand-dark)]">
                <ClipboardList size={16} />
                No payment today
              </div>
            </div>
            <p className="mt-3 max-w-full break-all text-[10px] font-medium leading-4 text-white/50">
              Impact-Site-Verification: b12d44aa-c34a-4466-a4d3-b092a424eaf0
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-normal text-white sm:text-5xl lg:text-[4.25rem]">
              Blood work without the office visit.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#dbe8e4] sm:text-lg sm:leading-8">
              Join the waitlist for direct-access wellness labs. We are proving demand before turning on expensive
              backend ordering, so there is no payment or medical intake today.
            </p>
            <form
              action="/catalog"
              className="hero-search-card mt-6 rounded-[var(--radius)] border border-white/60 bg-white/90 p-3 text-[var(--foreground)] shadow-[0_26px_80px_rgba(16,22,21,0.2)] backdrop-blur-2xl"
            >
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <label className="liquid-field flex min-h-14 items-center gap-3 overflow-hidden rounded-[var(--radius)] border border-[rgba(16,22,21,0.11)] bg-white/95 px-4 text-[var(--foreground)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  <Search size={20} className="shrink-0 text-[var(--brand-dark)]" />
                  <input
                    name="q"
                    placeholder="Search vitamin D, hormones, cholesterol..."
                    className="h-12 min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-[#77827d]"
                  />
                </label>
                <button className="focus-ring primary-action min-h-14 px-5">
                  Find tests
                  <ArrowRight size={18} />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(16,22,21,0.08)] px-1 pt-3 text-sm font-medium text-[var(--muted)]">
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-[var(--brand)]" />
                  Launch regions chosen by ZIP demand
                </span>
                <span className="flex flex-wrap gap-3">
                  <Link href="/catalog?q=hormones" className="font-semibold text-[var(--brand-dark)] underline">
                    Hormones
                  </Link>
                  <Link href="/catalog?q=vitamin%20D" className="font-semibold text-[var(--brand-dark)] underline">
                    Vitamin D
                  </Link>
                  <Link href="/catalog?q=lipid" className="font-semibold text-[var(--brand-dark)] underline">
                    Heart health
                  </Link>
                </span>
              </div>
            </form>
            <div className="trust-row mt-7 max-w-4xl">
              {trustSignals.map((item) => (
                <div
                  key={item}
                  className="trust-pill"
                >
                  <CheckCircle2 size={17} className="text-[var(--brand)]" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-[#c8d7d2]">
              <span className="flex items-center gap-2">
                <FileText size={16} />
                Pricing shared before launch
              </span>
              <span className="flex items-center gap-2">
                <Building2 size={16} />
                ZIP to launch region
              </span>
              <span className="flex items-center gap-2">
                <Headphones size={16} />
                Human-built launch
              </span>
            </div>
          </div>

          <div className="capsule-stage">
            <Image
              src="/blue-lab-capsules.png"
              alt="Private lab testing visual"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-35 mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9f4] via-[#f8f9f4]/68 to-[#f8f9f4]/34" />
            <div className="absolute inset-x-4 top-4 rounded-[var(--radius)] border border-white/15 bg-[rgba(16,20,19,0.9)] p-4 text-white shadow-[0_30px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:inset-x-5 sm:top-5 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase text-[#9ed5cc]">Whole-body check</p>
                  <h2 className="mt-2 text-2xl font-semibold">{featuredPanel.name}</h2>
                  <p className="mt-1 text-sm leading-6 text-[#c9d8d4]">{featuredPanel.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#c9d8d4]">status</p>
                  <p className="text-3xl font-semibold sm:text-4xl">Waitlist</p>
                </div>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-3/4 rounded-full bg-[var(--accent)]" />
              </div>
              <div className="mt-3 flex justify-between text-xs font-semibold text-[#c9d8d4]">
                <span>Panel interest</span>
                <span>Launch list next</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-[var(--radius)] border border-white/60 bg-white/70 p-4 text-[var(--foreground)] shadow-[0_30px_70px_rgba(16,22,21,0.18)] backdrop-blur-2xl sm:bottom-5 sm:left-5 sm:right-5 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">Private result view</p>
                  <h3 className="mt-1 text-xl font-semibold sm:text-2xl">Markers in one place</h3>
                </div>
                <span className="rounded-[var(--radius)] bg-[var(--accent-soft)] px-3 py-2 text-sm font-semibold text-[var(--brand-dark)]">
                  Released
                </span>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {featuredTests.map((test) => (
                  <p key={test?.id} className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                    <CheckCircle2 size={15} className="text-[var(--brand)]" />
                    {test?.name}
                  </p>
                ))}
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {[
                  ["Clinic", "2.4 mi"],
                  ["Launch", "By region"],
                  ["Privacy", "Account"],
                ].map(([label, value]) => (
                  <div key={label} className="metric-tile">
                    <p className="text-xs text-[var(--muted)]">{label}</p>
                    <p className="mt-1 font-semibold text-[var(--foreground)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="calm-band">
        <div className="page-section py-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Curated panels", String(panels.length), "Start with one simple choice."],
              ["Supported states", String(supply.states), "Use ZIP to route to a nearby clinic."],
              ["Launch mode", "Waitlist", "No payment today."],
            ].map(([label, value, copy]) => (
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
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="eyebrow">Why people trust it</p>
            <h2 className="mt-2 text-4xl font-semibold">A health launch has to feel calm before it feels clever.</h2>
            <p className="page-copy mt-3">
              The product is built around the things people look for first: privacy, cost clarity, nearby collection,
              and a real reason to trust us before we ask for money.
            </p>
            <Link href="/#waitlist" className="focus-ring primary-action mt-6">
              <MapPin size={18} />
              Join by ZIP
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustCards.map(({ id, title, customerPromise, Icon }) => (
              <article key={id} className="premium-card p-5">
                <span className="icon-tile">
                  <Icon size={21} />
                </span>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{customerPromise}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="page-section">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="eyebrow">The private route</p>
            <h2 className="mt-2 text-4xl font-semibold">From choosing tests to clinic instructions.</h2>
          </div>
          <Link href="/catalog" className="focus-ring secondary-action">
            <ShoppingCart size={18} />
            Choose tests
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, copy, Icon], index) => (
            <article key={title} className="premium-card p-6">
              <div className="flex items-center justify-between">
                <span className="simple-number">{index + 1}</span>
                <Icon className="text-[var(--brand)]" size={24} />
              </div>
              <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
              <p className="mt-2 text-base leading-7 text-[var(--muted)]">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="calm-band">
        <div className="page-section">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <p className="eyebrow">Most requested starting points</p>
              <h2 className="mt-2 text-4xl font-semibold">The core menu is intentionally simple first.</h2>
              <p className="page-copy mt-3">
                These are the tests that show up again and again in direct-access lab menus and wellness panels.
              </p>
            </div>
            <Link href="/catalog" className="focus-ring secondary-action">
              <Search size={18} />
              Browse all tests
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {topTests.map((item) => (
              <Link
                href={`/catalog?q=${encodeURIComponent(item.label)}`}
                key={item.testId}
                className="focus-ring premium-card group flex min-h-36 items-start gap-4 p-5"
              >
                <span className="simple-number">{item.rank}</span>
                <span className="min-w-0">
                  <span className="block text-xl font-semibold text-[var(--foreground)]">{item.label}</span>
                  <span className="mt-2 block text-sm leading-6 text-[var(--muted)]">{item.customerReason}</span>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-dark)]">
                    View test <ArrowRight className="transition group-hover:translate-x-0.5" size={15} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="blue-band">
        <div className="page-section">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Start here</p>
            <h2 className="mt-2 text-4xl font-semibold">Pick one panel. Keep the order moving.</h2>
            <p className="page-copy mt-3">
              Start with a panel, then join the waitlist so we can prove demand by region.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {panels.slice(0, 3).map((panel) => (
              <PanelCard key={panel.id} panel={panel} />
            ))}
          </div>
        </div>
      </section>

      <section className="deep-band">
        <div className="page-section">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <p className="eyebrow text-[#9ed5cc]">Bigger than one lab order</p>
              <h2 className="mt-2 text-4xl font-semibold text-white">Programs turn testing into a private health platform.</h2>
              <p className="mt-3 text-lg leading-8 text-[#dbe8e4]">
                The long-term product should feel like Private MD Labs speed, Hims follow-through, and premium biomarker
                tracking, with labs as the first trusted layer.
              </p>
            </div>
            <Link href="/programs" className="focus-ring secondary-action">
              View programs
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {programCards.map((program) => (
              <article key={program.id} className="pulse-pill rounded-[var(--radius)] p-5 text-[var(--foreground)]">
                <span className="icon-tile">
                  <program.Icon size={21} />
                </span>
                <p className="mt-5 text-sm font-semibold text-[var(--accent-strong)]">{program.subtitle}</p>
                <h3 className="mt-1 text-2xl font-semibold">{program.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{program.description}</p>
                <Link
                  href={`/cart?panel=${program.primaryPanelId}#waitlist`}
                  className="focus-ring secondary-action mt-5 min-h-12 w-full text-sm"
                >
                  Join waitlist
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow">Network roadmap</p>
          <h2 className="mt-2 text-4xl font-semibold">The lab network grows in layers.</h2>
          <p className="page-copy mt-3">
            First priority is reliable API ordering. Next comes home draw, then direct national and regional lab
            relationships for better cost and coverage.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {networkCards.map(({ id, title, priority, lane, whyItMatters, Icon }) => (
            <article key={id} className="premium-card p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="icon-tile">
                  <Icon size={21} />
                </span>
                <span className="pill">{priority}</span>
              </div>
              <p className="mt-5 text-sm font-semibold text-[var(--accent-strong)]">{lane}</p>
              <h3 className="mt-1 text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{whyItMatters}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="deep-band">
        <div className="page-section grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-[#9ed5cc]">Results without panic</p>
            <h2 className="mt-2 text-4xl font-semibold text-white">A private dashboard built for clarity.</h2>
            <p className="mt-4 text-lg leading-8 text-[#dbe8e4]">
              Results are arranged with reference ranges, plain-language labels, and privacy controls for your account.
            </p>
            <div className="mt-6 grid gap-3">
              {benefits.map(([title, copy, Icon]) => (
                <div key={title} className="pulse-pill flex items-start gap-3 rounded-[var(--radius)] p-4 text-[var(--foreground)]">
                  <Icon className="mt-1 text-[var(--brand)]" size={20} />
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm leading-6 text-[var(--muted)]">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="results-preview-grid glass-card p-5 text-[var(--foreground)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Result view</p>
                <h3 className="mt-2 text-2xl font-semibold">Complete Wellness</h3>
              </div>
              <span className="rounded-[var(--radius)] bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
                Ready
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ["HbA1c", "5.4%", "Educational insights"],
                ["Vitamin D", "27 ng/mL", "Discuss with a clinician"],
                ["LDL", "132 mg/dL", "Review with a clinician"],
              ].map(([name, value, status]) => (
                <div key={name} className="rounded-[var(--radius)] border border-[var(--line)] bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold">{name}</p>
                      <p className="text-sm text-[var(--muted)]">{status}</p>
                    </div>
                    <p className="text-xl font-semibold text-[var(--brand-dark)]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/results" className="focus-ring secondary-action mt-5 w-full">
              <FileText size={18} />
              Preview results
            </Link>
          </div>
        </div>
      </section>

      <section id="waitlist-launch" className="page-section">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
          <p className="eyebrow">Waitlist launch</p>
            <h2 className="mt-2 text-4xl font-semibold">Prove demand before paying for the backend.</h2>
            <p className="page-copy mt-3">
              Junction is the right end-to-end path, but the monthly cost is too high before we validate demand. This
              waitlist tells us which panels and regions should launch first.
            </p>
          </div>
          <div id="waitlist" className="scroll-mt-48">
            <WaitlistForm panelId={featuredPanel.id} selectedName={featuredPanel.name} source="homepage" />
            <div className="mt-5 grid gap-3 rounded-[var(--radius)] border border-white/60 bg-white/60 p-4">
              {[
                "Blood count, metabolic, thyroid, glucose, nutrients, and inflammation",
                "No doctor visit or prescription required from the customer when the real API ordering flow launches.",
                "Transparent launch pricing before anyone pays",
                "Nearest-clinic ordering planned once the backend is active",
              ].map((item) => (
                <p key={item} className="flex items-start gap-2 text-base leading-7 text-[var(--muted)]">
                  <CheckCircle2 className="mt-1 shrink-0 text-[var(--brand)]" size={18} />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
