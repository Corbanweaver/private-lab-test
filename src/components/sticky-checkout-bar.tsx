"use client";

import Link from "next/link";
import { ArrowRight, ClipboardList, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";

const hiddenRoutes = ["/admin", "/partners"];

export function StickyCheckoutBar() {
  const pathname = usePathname();
  const isHidden = hiddenRoutes.some((route) => pathname.startsWith(route));
  const isHome = pathname === "/";
  const isCart = pathname.startsWith("/cart");

  if (isHidden || isHome || isCart) {
    return null;
  }

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3">
      <div className="liquid-nav mx-auto flex max-w-5xl items-center justify-between gap-3 px-3 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius)] bg-white/60 text-[var(--brand-dark)] sm:flex">
            <ShieldCheck size={21} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--brand-dark)]">Complete Wellness waitlist</p>
            <p className="truncate text-xs text-[var(--muted)]">Get launch access before public ordering opens</p>
          </div>
        </div>
        <Link
          href={isCart ? "/cart?panel=complete-wellness#waitlist" : "/cart?panel=complete-wellness#waitlist"}
          className="focus-ring primary-action min-h-11 shrink-0 px-3 text-xs shadow-[0_18px_48px_rgba(16,22,21,0.22)] sm:min-h-12 sm:px-4 sm:text-sm"
        >
          <ClipboardList size={17} />
          Join waitlist
          <ArrowRight className="hidden sm:block" size={16} />
        </Link>
      </div>
    </aside>
  );
}
