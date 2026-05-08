import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeDollarSign,
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
import { panels } from "@/data/catalog";
import { formatCurrency, getTestsForPanel } from "@/lib/catalog";
import { summarizeLabSupply } from "@/lib/lab-access";

export default function Home() {
  const supply = summarizeLabSupply();
  const featuredPanel = panels.find((panel) => panel.id === "complete-wellness") ?? panels[0];
  const featuredTests = getTestsForPanel(featuredPanel.id).slice(0, 5);
  const steps: Array<[string, string, LucideIcon]> = [
    ["Choose tests", "Pick a ready-made panel or add individual tests.", Search],
    ["Enter ZIP and basic info", "Tell us where you want to test and who the order is for.", ClipboardList],
    ["See the nearest clinic", "Preview a nearby patient service center before checkout.", MapPin],
    ["Pay cash, get instructions", "Pay the clear price and receive lab visit instructions.", BadgeDollarSign],
  ];
  const benefits: Array<[string, string, LucideIcon]> = [
    ["No doctor visit", "Start online without scheduling a separate physician appointment.", HeartPulse],
    ["No insurance billing", "Cash-pay pricing is shown before checkout.", BadgeDollarSign],
    ["Authorization included", "Provider authorization is included where required.", ShieldCheck],
    ["Real support", "A person can help with scheduling, prep, and result questions.", Headphones],
  ];

  return (
    <PageShell>
      <section className="deep-band relative overflow-hidden">
        <div className="page-section hero-shell grid items-center gap-10 py-12 lg:grid-cols-[0.98fr_1.02fr] lg:py-16">
          <div className="relative z-10 min-w-0">
            <div className="pulse-pill inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-[var(--brand-dark)]">
              <ShieldCheck size={16} />
              Private Lab Test
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Private blood work, ordered without the friction.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-[#dbe8e4]">
              Choose a panel, enter your ZIP, see the nearest clinic, and pay the clear self-pay price. No insurance
              billing. Provider authorization is included where required.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/catalog" className="focus-ring primary-action w-full sm:w-auto">
                <Search size={19} />
                Choose tests
                <ArrowRight size={18} />
              </Link>
              <Link href="/cart?panel=complete-wellness#checkout" className="focus-ring secondary-action w-full sm:w-auto">
                <MapPin size={19} />
                Enter ZIP
              </Link>
            </div>
            <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
              {["No doctor visit", "No insurance billing", "Private results"].map((item) => (
                <div
                  key={item}
                  className="pulse-pill flex min-h-16 items-center gap-2 rounded-md px-3 py-3 text-sm font-semibold text-[var(--brand-dark)]"
                >
                  <CheckCircle2 size={17} className="text-[var(--brand)]" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-[#b9cbc6]">
              <span className="flex items-center gap-2">
                <FileText size={16} />
                Clear cash prices
              </span>
              <span className="flex items-center gap-2">
                <Building2 size={16} />
                ZIP to nearby clinic
              </span>
              <span className="flex items-center gap-2">
                <Headphones size={16} />
                Human support
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
              className="object-cover opacity-20 mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fbfdfc] via-[#fbfdfc]/70 to-[#fbfdfc]/40" />
            <div className="absolute inset-x-5 top-5 rounded-md border border-[var(--line)] bg-[var(--brand-deep)] p-5 text-white shadow-2xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase text-[#9ed5cc]">Order preview</p>
                  <h2 className="mt-2 text-2xl font-semibold">{featuredPanel.name}</h2>
                  <p className="mt-1 text-sm leading-6 text-[#c9d8d4]">{featuredPanel.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#c9d8d4]">self-pay</p>
                  <p className="text-4xl font-semibold">{formatCurrency(featuredPanel.price)}</p>
                </div>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-3/4 rounded-full bg-[var(--accent)]" />
              </div>
              <div className="mt-3 flex justify-between text-xs font-semibold text-[#c9d8d4]">
                <span>Tests selected</span>
                <span>ZIP next</span>
              </div>
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-md border border-[var(--line)] bg-[#fcfffd]/95 p-5 text-[var(--foreground)] shadow-[0_24px_70px_rgba(7,19,31,0.18)] backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">Private result view</p>
                  <h3 className="mt-1 text-2xl font-semibold">Markers in one place</h3>
                </div>
                <span className="rounded-md bg-[var(--accent-soft)] px-3 py-2 text-sm font-semibold text-[var(--brand-dark)]">
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
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ["Clinic", "2.4 mi"],
                  ["Timing", "1-3 days"],
                  ["Privacy", "Account"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md border border-[var(--line)] bg-white/70 p-3">
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
              ["Checkout", "Self-pay", "No insurance or Medicare billing."],
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

      <section className="blue-band">
        <div className="page-section">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Start here</p>
            <h2 className="mt-2 text-4xl font-semibold">Pick one panel. Keep the order moving.</h2>
            <p className="page-copy mt-3">
              Start with a panel, then enter ZIP and basic info to see the nearest clinic.
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
        <div className="page-section grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-[#9ed5cc]">Results without panic</p>
            <h2 className="mt-2 text-4xl font-semibold text-white">A private dashboard built for clarity.</h2>
            <p className="mt-4 text-lg leading-8 text-[#dbe8e4]">
              Results are arranged with reference ranges, plain-language labels, and privacy controls for your account.
            </p>
            <div className="mt-6 grid gap-3">
              {benefits.map(([title, copy, Icon]) => (
                <div key={title} className="pulse-pill flex items-start gap-3 rounded-md p-4 text-[var(--foreground)]">
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
              <span className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">Ready</span>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ["HbA1c", "5.4%", "Looks normal"],
                ["Vitamin D", "27 ng/mL", "Needs attention"],
                ["LDL", "132 mg/dL", "Review with a clinician"],
              ].map(([name, value, status]) => (
                <div key={name} className="rounded-md border border-[var(--line)] bg-white p-4">
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

      <section id="pricing" className="page-section">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="eyebrow">Self-pay checkout</p>
            <h2 className="mt-2 text-4xl font-semibold">A clear order, built for trust.</h2>
            <p className="page-copy mt-3">
              Choose the panel, enter ZIP and basic info, see the nearest clinic, and pay without insurance.
            </p>
          </div>
          <div className="glass-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Complete Wellness</p>
                <h3 className="mt-2 text-3xl font-semibold">Start testing today</h3>
              </div>
              <div className="text-right">
                <p className="text-5xl font-semibold text-[var(--brand-dark)]">{formatCurrency(featuredPanel.price)}</p>
                <p className="text-sm text-[var(--muted)]">one order</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                "Blood count, metabolic, thyroid, glucose, nutrients, and inflammation",
                "No doctor visit. Provider authorization included where required.",
                "Cash-pay checkout with no insurance or Medicare billing",
                "Nearest-clinic instructions after checkout",
              ].map((item) => (
                <p key={item} className="flex items-start gap-2 text-base leading-7 text-[var(--muted)]">
                  <CheckCircle2 className="mt-1 shrink-0 text-[var(--brand)]" size={18} />
                  {item}
                </p>
              ))}
            </div>
            <Link href="/cart?panel=complete-wellness#checkout" className="focus-ring primary-action mt-6 w-full">
              <HeartPulse size={19} />
              Enter ZIP and checkout
              <ArrowRight size={18} />
            </Link>
            <p className="mt-3 text-center text-sm text-[var(--muted)]">
              No doctor visit. No insurance. Provider authorization included where required.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
