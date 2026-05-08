import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  FlaskConical,
  LayoutDashboard,
  ListChecks,
  MapPin,
  Search,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const navItems: Array<{ href: string; label: string; Icon: LucideIcon }> = [
  { href: "/#how-it-works", label: "How it works", Icon: ListChecks },
  { href: "/catalog", label: "Choose tests", Icon: Search },
  { href: "/#pricing", label: "Pricing", Icon: BadgeDollarSign },
  { href: "/dashboard", label: "Account", Icon: LayoutDashboard },
];

const mobileNavItems: Array<{ href: string; label: string; Icon: LucideIcon }> = [
  { href: "/catalog", label: "Tests", Icon: Search },
  { href: "/cart?panel=complete-wellness#checkout", label: "ZIP", Icon: MapPin },
  { href: "/dashboard", label: "Account", Icon: LayoutDashboard },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--panel)]/88 shadow-sm backdrop-blur-xl">
      <div className="border-b border-white/10 bg-[var(--brand-deep)] px-4 py-2 text-center text-sm font-semibold text-[#e7f2ee]">
        <span className="mx-auto flex w-full max-w-7xl min-w-0 items-center justify-center gap-2">
          <ShieldCheck size={14} className="shrink-0 text-[var(--accent)]" />
          <span className="min-w-0 leading-5">
            Self-pay private blood work. No insurance billing. Provider authorization included where required.
          </span>
        </span>
      </div>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex min-w-0 items-center gap-3 rounded-md font-semibold text-[var(--foreground)]">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-white shadow-sm"
            style={{ background: "linear-gradient(135deg, var(--brand-deep), var(--brand-dark), var(--brand))" }}
          >
            <FlaskConical size={20} />
          </span>
          <span className="truncate text-lg">Private Lab Test</span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm text-[var(--muted)] lg:flex">
          {navItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md px-3 font-semibold transition hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]"
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="focus-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[var(--line)] bg-[#fcfffd] text-[var(--brand-dark)] transition hover:border-[var(--brand)] hover:shadow-md"
            aria-label="Cart"
            title="Cart"
          >
            <ShoppingCart size={19} />
          </Link>
          <Link href="/catalog" className="focus-ring primary-action desktop-action text-sm">
            <Search size={17} />
            Choose tests
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/dashboard"
            className="focus-ring hidden h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[var(--line)] bg-[#fcfffd] text-[var(--brand-dark)] transition hover:border-[var(--brand)] hover:shadow-md"
            aria-label="Dashboard"
            title="Dashboard"
          >
            <LayoutDashboard size={19} />
          </Link>
        </div>
      </div>
      <nav className="border-t border-[var(--line)] bg-[var(--panel)]/90 px-3 py-2 lg:hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-2">
          {mobileNavItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="focus-ring flex min-h-11 min-w-0 w-full items-center justify-center gap-2 rounded-md bg-[var(--accent-soft)] px-2 text-sm font-semibold text-[var(--brand-dark)] transition hover:bg-[#dcece6]"
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
