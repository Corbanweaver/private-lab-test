import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BadgeDollarSign,
  FlaskConical,
  LayoutDashboard,
  ListChecks,
  Search,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const navItems: Array<{ href: string; label: string; Icon: LucideIcon }> = [
  { href: "/#how-it-works", label: "How it works", Icon: ListChecks },
  { href: "/catalog", label: "Tests", Icon: Search },
  { href: "/#pricing", label: "Pricing", Icon: BadgeDollarSign },
  { href: "/dashboard", label: "Account", Icon: LayoutDashboard },
];

const mobileNavItems: Array<{ href: string; label: string; Icon: LucideIcon }> = [
  { href: "/catalog", label: "Tests", Icon: Search },
  { href: "/quiz", label: "Choose", Icon: Activity },
  { href: "/dashboard", label: "Account", Icon: LayoutDashboard },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-white/95 shadow-sm backdrop-blur">
      <div className="border-b border-[var(--line)] bg-[var(--brand-deep)] px-4 py-2 text-center text-sm font-semibold text-white">
        <span className="mx-auto flex max-w-7xl items-center justify-center gap-2">
          <ShieldCheck size={14} className="shrink-0" />
          <span className="min-w-0">Clear cash-pay price. Private results. Real help at every step.</span>
        </span>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex min-w-0 items-center gap-3 rounded-md font-semibold text-[var(--brand-dark)]">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-white shadow-sm"
            style={{ background: "linear-gradient(135deg, var(--brand-dark), var(--brand), var(--accent))" }}
          >
            <FlaskConical size={20} />
          </span>
          <span className="truncate text-lg">ClearLabs</span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm text-[var(--muted)] lg:flex">
          {navItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md px-3 font-semibold hover:bg-[var(--soft)] hover:text-[var(--brand-dark)]"
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="focus-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[var(--line)] bg-white text-[var(--brand-dark)]"
            aria-label="Cart"
            title="Cart"
          >
            <ShoppingCart size={19} />
          </Link>
          <Link href="/cart?panel=complete-wellness" className="focus-ring primary-action desktop-action text-sm">
            <ShoppingCart size={17} />
            Start testing
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/dashboard"
            className="focus-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[var(--line)] bg-white text-[var(--brand-dark)] sm:hidden"
            aria-label="Dashboard"
            title="Dashboard"
          >
            <LayoutDashboard size={19} />
          </Link>
        </div>
      </div>
      <nav className="border-t border-[var(--line)] bg-white px-3 py-2 lg:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2">
          {mobileNavItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="focus-ring flex min-h-11 min-w-0 w-full items-center justify-center gap-2 rounded-md bg-[var(--soft)] px-2 text-sm font-semibold text-[var(--brand-dark)]"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
