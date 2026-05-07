import Link from "next/link";
import {
  Activity,
  FlaskConical,
  Handshake,
  LayoutDashboard,
  Search,
  ShieldCheck,
  ShoppingCart,
  TestTube2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const navItems: Array<{ href: string; label: string; Icon: LucideIcon }> = [
  { href: "/catalog", label: "Shop tests", Icon: Search },
  { href: "/builder", label: "Build panel", Icon: TestTube2 },
  { href: "/quiz", label: "Help me choose", Icon: Activity },
  { href: "/partners", label: "Lab partners", Icon: Handshake },
  { href: "/dashboard", label: "My account", Icon: LayoutDashboard },
];

const mobileNavItems: Array<{ href: string; label: string; Icon: LucideIcon }> = [
  { href: "/catalog", label: "Tests", Icon: Search },
  { href: "/builder", label: "Build", Icon: TestTube2 },
  { href: "/quiz", label: "Choose", Icon: Activity },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex min-w-0 items-center gap-3 rounded-md font-semibold text-[var(--brand-dark)]">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[var(--brand-dark)] text-white">
            <FlaskConical size={20} />
          </span>
          <span className="truncate text-lg">Private Lab Test</span>
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
          <Link href="/auth" className="focus-ring primary-action desktop-action text-sm">
            <ShieldCheck size={17} />
            Sign in
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
      <div className="border-t border-[var(--line)] bg-[var(--info)] px-4 py-2 text-center text-sm text-[var(--brand-dark)]">
        <span className="mx-auto flex max-w-7xl items-center justify-center gap-2">
          <Activity size={14} className="shrink-0" />
          <span className="min-w-0">Wellness testing for education. Talk with your clinician about health decisions.</span>
        </span>
      </div>
    </header>
  );
}
