import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  FlaskConical,
  LayoutDashboard,
  Layers3,
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
  { href: "/programs", label: "Programs", Icon: Layers3 },
  { href: "/#waitlist", label: "Waitlist", Icon: ClipboardList },
  { href: "/dashboard", label: "Account", Icon: LayoutDashboard },
];

const mobileNavItems: Array<{ href: string; label: string; Icon: LucideIcon }> = [
  { href: "/catalog", label: "Tests", Icon: Search },
  { href: "/programs", label: "Programs", Icon: Layers3 },
  { href: "/#waitlist", label: "Waitlist", Icon: MapPin },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 bg-[rgba(247,246,241,0.78)] px-3 pb-2 pt-3 shadow-[0_12px_36px_rgba(16,22,21,0.06)] backdrop-blur-2xl">
      <div className="mx-auto mb-2 max-w-7xl rounded-[var(--radius)] border border-white/15 bg-[rgba(16,20,19,0.86)] px-4 py-2 text-center text-xs font-semibold text-[#edf6f2] shadow-[0_16px_44px_rgba(16,22,21,0.16)] backdrop-blur-2xl sm:text-sm">
        <span className="mx-auto flex w-full min-w-0 items-center justify-center gap-2">
          <ShieldCheck size={14} className="shrink-0 text-[var(--accent)]" />
          <span className="min-w-0 leading-5">
            Early access is open. Join the waitlist before full in-app lab ordering launches.
          </span>
        </span>
      </div>
      <div className="liquid-nav mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-4 lg:px-5">
        <Link href="/" className="focus-ring flex min-w-0 items-center gap-3 rounded-[var(--radius)] font-semibold text-[var(--foreground)]">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius)] text-white shadow-[0_18px_44px_rgba(6,18,29,0.24)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(130,220,202,0.42), transparent 34%), linear-gradient(135deg, var(--brand-deep), var(--brand-dark), var(--brand))",
            }}
          >
            <FlaskConical size={20} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-semibold leading-5 sm:text-lg">Private Lab Test</span>
            <span className="hidden text-xs font-medium text-[var(--muted)] sm:block">Direct-access wellness labs</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 rounded-[var(--radius)] bg-white/30 p-1 text-sm text-[var(--muted)] lg:flex">
          {navItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-[var(--radius)] px-3 font-semibold transition hover:bg-white/70 hover:text-[var(--foreground)] xl:px-4"
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="focus-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius)] border border-white/60 bg-white/70 text-[var(--brand-dark)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition hover:border-[color-mix(in_srgb,var(--brand)_48%,rgba(255,255,255,0.7))] hover:shadow-[0_14px_34px_rgba(16,22,21,0.12)]"
            aria-label="Cart"
            title="Cart"
          >
            <ShoppingCart size={19} />
          </Link>
          <Link href="/#waitlist" className="focus-ring primary-action desktop-action text-sm">
            <Search size={17} />
            Join waitlist
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/dashboard"
            className="focus-ring hidden h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius)] border border-white/60 bg-white/70 text-[var(--brand-dark)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition hover:border-[color-mix(in_srgb,var(--brand)_48%,rgba(255,255,255,0.7))] hover:shadow-[0_14px_34px_rgba(16,22,21,0.12)]"
            aria-label="Dashboard"
            title="Dashboard"
          >
            <LayoutDashboard size={19} />
          </Link>
        </div>
      </div>
      <nav className="liquid-nav mx-auto mt-2 w-full max-w-7xl px-2 py-2 lg:hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-2">
          {mobileNavItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="focus-ring flex min-h-11 w-full min-w-0 items-center justify-center gap-1.5 rounded-[var(--radius)] bg-white/50 px-1.5 text-xs font-semibold text-[var(--brand-dark)] transition hover:bg-white/75"
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
