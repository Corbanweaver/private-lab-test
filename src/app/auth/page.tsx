import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { hasSupabaseConfig } from "@/lib/supabase";

export default function AuthPage() {
  const configured = hasSupabaseConfig();

  return (
    <PageShell>
      <section className="blue-band">
        <div className="page-section grid gap-6 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="eyebrow">Private account</p>
          <h1 className="page-title mt-2">Sign in to keep results private</h1>
          <p className="page-copy mt-3 max-w-2xl">
            Your account keeps orders, lab instructions, results, and trusted family access in one safe place.
          </p>
          <div className="premium-card mt-6 p-5">
            <LockKeyhole className="text-[var(--brand)]" />
            <h2 className="mt-3 text-xl font-semibold">Your information stays private</h2>
            <p className="mt-2 text-base leading-7 text-[var(--muted)]">
              We use a private account so lab orders and results are not shared by email or left in the open.
            </p>
          </div>
        </div>
        <form className="premium-card h-max p-5">
          <div className="flex items-center gap-2">
            <Mail className="text-[var(--brand)]" size={20} />
            <h2 className="text-xl font-semibold">{configured ? "Email sign-in link" : "Sign in preview"}</h2>
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
            Send sign-in link
          </button>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {configured
              ? "We will send a private link to this email."
            : "This preview shows the sign-in screen without sending an email."}
          </p>
        </form>
        </div>
      </section>
    </PageShell>
  );
}
