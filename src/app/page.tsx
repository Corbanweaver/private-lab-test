import Link from "next/link";
import { ArrowRight, BadgeDollarSign, CheckCircle2, FileText, Search, ShieldCheck, TestTube2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PanelCard } from "@/components/panel-card";
import { panels } from "@/data/catalog";

export default function Home() {
  const steps: Array<[string, string, LucideIcon]> = [
    ["Choose", "Pick a ready-made panel or search for a specific test.", Search],
    ["Pay", "See the price clearly before you checkout.", BadgeDollarSign],
    ["Get results", "Receive simple instructions and private results online.", FileText],
  ];

  const trustItems = [
    "Large, easy buttons",
    "Clear cash prices",
    "Private account area",
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
            <p className="eyebrow">Private wellness blood testing</p>
            <h1 className="page-title mt-4 max-w-4xl">
              Simple blood test ordering with clear prices.
            </h1>
            <p className="page-copy mt-5 max-w-2xl">
              Choose a panel, check your state, pay securely, and get plain-language lab instructions from one private
              account.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="focus-ring primary-action w-full sm:w-auto"
              >
                <Search size={19} />
                Browse catalog
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/quiz"
                className="focus-ring secondary-action w-full sm:w-auto"
              >
                <TestTube2 size={19} />
                Find a panel
              </Link>
            </div>
            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {trustItems.map((item) => (
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
      <section className="page-section">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Popular panels</p>
            <h2 className="mt-2 text-3xl font-semibold">Start with a trusted option</h2>
          </div>
          <Link href="/builder" className="focus-ring secondary-action desktop-action text-sm">
            <ShieldCheck size={17} />
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
