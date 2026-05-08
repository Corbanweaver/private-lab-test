import Link from "next/link";
import { ArrowRight, BadgeDollarSign, CheckCircle2, ClipboardList, Handshake, ShieldCheck, Target } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { labPartners, outreachWaves, partnerPacketNeeds } from "@/data/lab-partners";
import { summarizeLabSupply } from "@/lib/lab-access";

export default function PartnersPage() {
  const supply = summarizeLabSupply();

  return (
    <PageShell>
      <section className="page-section">
        <div className="max-w-4xl">
          <p className="eyebrow">For lab partners</p>
          <h1 className="page-title mt-2">We bring prepared patients and clear cash-pay orders</h1>
          <p className="page-copy mt-4">
            We help older adults and families order affordable labs, understand where to go, and get results without
            billing confusion.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["Partner types", supply.partners],
            ["Verified labs", supply.verifiedPartners],
            ["States covered", supply.states],
            ["Clear prices", supply.cashMenuCount],
          ].map(([label, value]) => (
            <div key={label} className="premium-card p-5">
              <ShieldCheck className="text-[var(--brand)]" size={22} />
              <p className="mt-3 text-sm text-[var(--muted)]">{label}</p>
              <p className="text-3xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white">
        <div className="page-section">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="eyebrow">Simple offer</p>
              <h2 className="mt-2 text-3xl font-semibold">Less confusion for patients and staff</h2>
              <p className="mt-3 text-base leading-7 text-[var(--muted)]">
                Our goal is simple: send people who already paid, know where to go, and have someone to call if they
                need help.
              </p>
              <div className="mt-5 rounded-md bg-[var(--soft)] p-4">
                <p className="font-semibold text-[var(--brand-dark)]">Partner pitch</p>
                <p className="mt-2 text-base leading-7 text-[var(--muted)]">
                  We send prepaid cash-pay lab orders from older adults and families, with concierge support so patients
                  arrive prepared and understand next steps. We are looking for reliable lab partners with transparent
                  pricing and electronic results.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {partnerPacketNeeds.map((need) => (
                <div key={need} className="premium-card flex items-start gap-3 p-4">
                  <CheckCircle2 className="mt-1 text-[var(--brand)]" size={18} />
                  <p className="font-medium">{need}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Growth path</p>
            <h2 className="mt-2 text-3xl font-semibold">Start broad, then build deeper relationships</h2>
          </div>
          <Link href="/partners/outreach" className="focus-ring secondary-action">
            <Target size={18} />
            Open outreach cockpit
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {outreachWaves.map((wave) => (
            <article key={wave.label} className="premium-card p-5">
              <span className="icon-tile">
                <Handshake size={21} />
              </span>
              <p className="mt-4 text-sm font-semibold text-[var(--accent)]">{wave.label}</p>
              <h3 className="mt-1 text-xl font-semibold">{wave.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{wave.goal}</p>
              <p className="mt-4 text-sm font-semibold text-[var(--brand-dark)]">{wave.target}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-white">
        <div className="page-section">
          <div className="flex items-center gap-3">
            <span className="icon-tile">
              <ClipboardList size={21} />
            </span>
            <div>
              <p className="eyebrow">Partner admin</p>
              <h2 className="text-3xl font-semibold">Tracked lab supply fields</h2>
            </div>
          </div>
          <div className="table-shell mt-6 overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-[var(--soft)] text-xs uppercase text-[var(--brand-dark)]">
                <tr>
                  <th className="px-4 py-3">Lab partner</th>
                  <th className="px-4 py-3">Tier</th>
                  <th className="px-4 py-3">CLIA</th>
                  <th className="px-4 py-3">States</th>
                  <th className="px-4 py-3">Result delivery</th>
                  <th className="px-4 py-3">Contact</th>
                </tr>
              </thead>
              <tbody>
                {labPartners.map((partner) => (
                  <tr key={partner.id} className="border-t border-[var(--line)] align-top">
                    <td className="px-4 py-3">
                      <p className="font-semibold">{partner.name}</p>
                      <p className="text-xs text-[var(--muted)]">{partner.orderWorkflow}</p>
                    </td>
                    <td className="px-4 py-3 capitalize">{partner.tier}</td>
                    <td className="px-4 py-3 capitalize">{partner.cliaStatus}</td>
                    <td className="px-4 py-3">{partner.statesServed.join(", ")}</td>
                    <td className="px-4 py-3 uppercase">{partner.resultDelivery.replace("_", " ")}</td>
                    <td className="px-4 py-3">
                      <p>{partner.contact.name}</p>
                      <p className="text-xs text-[var(--muted)]">{partner.contact.email}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/catalog" className="focus-ring primary-action">
              <BadgeDollarSign size={18} />
              View cash-pay catalog
            </Link>
            <Link href="/partners/outreach" className="focus-ring secondary-action">
              <ArrowRight size={18} />
              Work the lab target list
            </Link>
            <Link href="/admin" className="focus-ring secondary-action">
              <ClipboardList size={18} />
              Open admin controls
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
