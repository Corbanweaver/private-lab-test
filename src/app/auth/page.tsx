import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { hasSupabaseConfig } from "@/lib/supabase";

export default function AuthPage() {
  const configured = hasSupabaseConfig();

  return (
    <PageShell>
      <section className="page-section grid gap-6 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="eyebrow">Secure account</p>
          <h1 className="page-title mt-2">Sign in before ordering labs</h1>
          <p className="page-copy mt-3 max-w-2xl">
            Your account keeps orders, lab instructions, result PDFs, and wellness notes in one private place.
          </p>
          <div className="premium-card mt-6 p-5">
            <LockKeyhole className="text-[var(--brand)]" />
            <h2 className="mt-3 text-xl font-semibold">Security model</h2>
            <p className="mt-2 text-[var(--muted)]">
              Private storage, short sessions, and server-side checks are planned for sensitive account and result pages.
            </p>
          </div>
        </div>
        <form className="premium-card h-max p-5">
          <div className="flex items-center gap-2">
            <Mail className="text-[var(--brand)]" size={20} />
            <h2 className="text-xl font-semibold">{configured ? "Magic link" : "Sign in"}</h2>
          </div>
          <label className="mt-5 grid gap-1 text-sm font-medium">
            Email
            <input
              type="email"
              placeholder="you@example.com"
              className="focus-ring input-control"
            />
          </label>
          <button type="button" className="focus-ring primary-action mt-4 w-full">
            <ShieldCheck size={18} />
            Continue
          </button>
          <p className="mt-3 text-xs text-[var(--muted)]">
            {configured
              ? "A sign-in link can be sent to your email."
              : "This preview shows the sign-in screen without sending email."}
          </p>
        </form>
      </section>
    </PageShell>
  );
}
