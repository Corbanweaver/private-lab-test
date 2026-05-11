"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail, MapPin, ShieldCheck } from "lucide-react";

type WaitlistFormProps = {
  panelId?: string;
  selectedName?: string;
  source?: string;
  compact?: boolean;
};

type WaitlistStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

export function WaitlistForm({
  panelId = "complete-wellness",
  selectedName = "Complete Wellness",
  source = "site",
  compact = false,
}: WaitlistFormProps) {
  const [status, setStatus] = useState<WaitlistStatus>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ state: "submitting" });

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        firstName: formData.get("firstName"),
        zip: formData.get("zip"),
        state: formData.get("state"),
        interest: formData.get("interest"),
        panelId,
        source,
      }),
    });

    const payload = (await response.json().catch(() => ({}))) as { message?: string; error?: string };

    if (!response.ok) {
      setStatus({ state: "error", message: payload.error ?? payload.message ?? "Could not join the waitlist yet." });
      return;
    }

    form.reset();
    setStatus({ state: "success", message: payload.message ?? "You are on the waitlist." });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`waitlist-form liquid-glass grid ${compact ? "waitlist-form--compact gap-3 p-4" : "gap-4 p-5"}`}
    >
      <div className="flex items-start gap-3">
        <span className="icon-tile">
          <Mail size={20} />
        </span>
        <div>
          <p className="premium-section-label">Early access</p>
          <h2 className={`mt-1 font-semibold ${compact ? "text-xl" : "text-2xl"}`}>
            Join the {selectedName} waitlist
          </h2>
          <p className={`mt-2 text-sm leading-6 text-[var(--muted)] ${compact ? "hidden" : ""}`}>
            We will invite people by region once full in-app ordering is ready. No payment or medical intake today.
          </p>
        </div>
      </div>

      <input type="hidden" name="panelId" value={panelId} />
      <input type="hidden" name="source" value={source} />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">
          First name
          <input name="firstName" className="focus-ring input-control" autoComplete="given-name" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Email
          <input name="email" type="email" className="focus-ring input-control" autoComplete="email" required />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          ZIP code
          <input name="zip" className="focus-ring input-control" inputMode="numeric" autoComplete="postal-code" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          State
          <input name="state" className="focus-ring input-control uppercase" autoComplete="address-level1" maxLength={2} />
        </label>
      </div>

      <label className="grid gap-1 text-sm font-medium">
        What do you want first?
        <select name="interest" defaultValue={selectedName} className="focus-ring input-control">
          <option>{selectedName}</option>
          <option>Full wellness panel</option>
          <option>Hormones and thyroid</option>
          <option>Heart and metabolic health</option>
          <option>Vitamin and nutrient testing</option>
          <option>Build my own panel</option>
        </select>
      </label>

      <button className="focus-ring primary-action w-full" disabled={status.state === "submitting"}>
        {status.state === "submitting" ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
        Join waitlist
        <ArrowRight size={17} />
      </button>

      {status.state === "success" ? (
        <p className="flex items-start gap-2 rounded-[var(--radius)] border border-[rgba(20,114,103,0.18)] bg-[rgba(20,114,103,0.08)] p-3 text-sm font-medium leading-6 text-[var(--brand-dark)]">
          <CheckCircle2 className="mt-0.5 shrink-0" size={17} />
          {status.message}
        </p>
      ) : null}
      {status.state === "error" ? (
        <p className="rounded-[var(--radius)] border border-[rgba(198,161,86,0.28)] bg-[rgba(198,161,86,0.12)] p-3 text-sm font-medium leading-6 text-[var(--foreground)]">
          {status.message}
        </p>
      ) : null}

      <p className={`items-start gap-2 text-xs leading-5 text-[var(--muted)] ${compact ? "hidden md:flex" : "flex"}`}>
        <MapPin className="mt-0.5 shrink-0 text-[var(--brand)]" size={14} />
        We use ZIP/state only to understand launch demand and lab coverage.
      </p>
    </form>
  );
}
