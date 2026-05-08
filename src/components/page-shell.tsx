import { AppHeader } from "@/components/app-header";
import { StickyCheckoutBar } from "@/components/sticky-checkout-bar";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="sticky-checkout-safe flex-1">{children}</main>
      <StickyCheckoutBar />
    </>
  );
}
