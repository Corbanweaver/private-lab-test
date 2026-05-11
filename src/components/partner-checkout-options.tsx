import Link from "next/link";
import { ArrowRight, Handshake, ShieldCheck } from "lucide-react";
import { getConfiguredOrderingPartners } from "@/lib/partner-referrals";

export function PartnerCheckoutOptions({ panelId }: { panelId: string; source?: string }) {
  const partners = getConfiguredOrderingPartners(panelId);

  if (partners.length === 0) return null;

  return (
    <section className="liquid-glass p-5">
      <div className="flex items-start gap-3">
        <span className="icon-tile">
          <Handshake size={20} />
        </span>
        <div>
          <p className="eyebrow">Partner ordering paused</p>
          <h2 className="mt-1 text-xl font-semibold">Join the waitlist instead</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Partner portals are tracked internally, but we are not sending customers to outside ordering while demand
            validation is the priority.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        {partners.map((partner) => (
          <div key={partner.id} className="rounded-[var(--radius)] border border-white/60 bg-white/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{partner.name}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{partner.customerPromise}</p>
              </div>
              <span className="pill pill-info">Approved</span>
            </div>
            <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-[var(--muted)]">
              <ShieldCheck className="mt-0.5 shrink-0 text-[var(--brand)]" size={15} />
              {partner.checkoutOwner} may be useful later. Today this path stays waitlist-only.
            </p>
            <Link href={`/cart?panel=${panelId}#waitlist`} className="focus-ring primary-action mt-4 w-full text-sm">
              Join waitlist
              <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
