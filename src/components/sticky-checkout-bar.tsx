"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

const hiddenRoutes = ["/admin", "/partners"];

export function StickyCheckoutBar() {
  const pathname = usePathname();
  const isHidden = hiddenRoutes.some((route) => pathname.startsWith(route));
  const isCart = pathname.startsWith("/cart");

  if (isHidden) {
    return null;
  }

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--panel)]/92 px-3 py-3 shadow-[0_-18px_44px_rgba(7,19,31,0.14)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[var(--accent-soft)] text-[var(--brand-dark)] sm:flex">
            <ShieldCheck size={21} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--brand-dark)]">Complete Wellness starts here</p>
            <p className="truncate text-xs text-[var(--muted)]">$229 self-pay - no insurance billing - private results</p>
          </div>
        </div>
        <Link
          href={isCart ? "/cart?panel=complete-wellness#checkout" : "/cart?panel=complete-wellness"}
          className="focus-ring primary-action min-h-12 shrink-0 px-4 text-sm"
        >
          <ShoppingCart size={17} />
          {isCart ? "Checkout" : "Start testing"}
          <ArrowRight className="hidden sm:block" size={16} />
        </Link>
      </div>
    </aside>
  );
}
