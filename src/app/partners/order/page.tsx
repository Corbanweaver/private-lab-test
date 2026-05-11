import Link from "next/link";
import { ArrowRight, CheckCircle2, FlaskConical, Handshake, Settings2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { panels } from "@/data/catalog";
import { getOrderingPartnerRuntimes } from "@/lib/partner-referrals";

export default async function PartnerOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ panel?: string; missing?: string }>;
}) {
  const params = await searchParams;
  const panelId = params.panel ?? "complete-wellness";
  const panel = panels.find((item) => item.id === panelId) ?? panels[1] ?? panels[0];
  const partners = getOrderingPartnerRuntimes(panel.id);
  const activePartners = partners.filter((partner) => partner.enabled);
  const pendingPartners = partners.filter((partner) => !partner.enabled);

  return (
    <PageShell>
      <section className="deep-band">
        <div className="page-section grid items-end gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="eyebrow text-[#9ed5cc]">Partner status</p>
            <h1 className="page-title mt-2 text-white">Partner ordering is paused while we validate demand.</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#dbe8e4]">
              Private Lab Test helps users choose the right panel, but we are not routing people into outside ordering
              portals while the product is focused on waitlist validation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/cart?panel=${panel.id}#waitlist`} className="focus-ring primary-action">
                <FlaskConical size={18} />
                Join {panel.name} waitlist
                <ArrowRight size={17} />
              </Link>
              <Link href="/partners" className="focus-ring secondary-action">
                Partner dashboard
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Selected", panel.name],
              ["Active", activePartners.length],
              ["Ready later", pendingPartners.length],
            ].map(([label, value]) => (
              <div key={label} className="pulse-pill rounded-[var(--radius)] p-5 text-[var(--foreground)]">
                <p className="text-sm font-semibold text-[var(--muted)]">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-[var(--brand-dark)]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow">Paused now</p>
          <h2 className="mt-2 text-3xl font-semibold">Approved or pending partners for {panel.name}.</h2>
          <p className="page-copy mt-3">
            These are tracked for operations, but public ordering links stay off until we decide whether partner
            redirects fit the product.
          </p>
        </div>
        {partners.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {partners.map((partner) => (
              <article key={partner.id} className="premium-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="icon-tile">
                    <Handshake size={21} />
                  </span>
                  <span className="pill pill-info">{partner.approvalStatus === "approved" ? "Approved" : "Pending"}</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{partner.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{partner.customerPromise}</p>
                <div className="mt-4 grid gap-2 text-sm">
                  {[`Ordering owner: ${partner.checkoutOwner}`, `Results: ${partner.resultsOwner}`].map((item) => (
                    <p key={item} className="flex items-start gap-2 text-[var(--muted)]">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--brand)]" size={16} />
                      {item}
                    </p>
                  ))}
                </div>
                <Link href={`/cart?panel=${panel.id}#waitlist`} className="focus-ring primary-action mt-6 w-full">
                  Join waitlist instead
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="premium-card p-6">
            <div className="flex items-start gap-3">
              <span className="icon-tile">
                <Settings2 size={21} />
              </span>
              <div>
                <h3 className="text-2xl font-semibold">Partner URL still needs to be configured.</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  We can add tracked Ulta or Quest URLs later if we choose to use partner ordering. For now, the public
                  path stays on the waitlist.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="calm-band">
        <div className="page-section">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Configuration status</p>
            <h2 className="mt-2 text-3xl font-semibold">Both Ulta and Quest can run side by side.</h2>
            <p className="page-copy mt-3">
              The app treats each partner independently. Ulta can be live now, and Quest can be enabled later without
              removing Ulta.
            </p>
          </div>
          <div className="table-shell overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-[var(--soft)] text-xs uppercase text-[var(--brand-dark)]">
                <tr>
                  <th className="px-4 py-3">Partner</th>
                  <th className="px-4 py-3">Approval</th>
                  <th className="px-4 py-3">Configured</th>
                  <th className="px-4 py-3">URL env</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => (
                  <tr key={partner.id} className="border-t border-[var(--line)] align-top">
                    <td className="px-4 py-3 font-semibold">{partner.name}</td>
                    <td className="px-4 py-3 capitalize">{partner.approvalStatus}</td>
                    <td className="px-4 py-3">{partner.configured ? "Yes" : "Needs URL"}</td>
                    <td className="px-4 py-3 font-mono text-xs">{partner.baseUrlEnv}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{partner.operatorNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
