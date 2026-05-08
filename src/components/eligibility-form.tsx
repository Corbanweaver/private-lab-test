"use client";

import { useState } from "react";
import { MapPin, ShieldAlert } from "lucide-react";
import { checkStateEligibility } from "@/lib/catalog";

export function EligibilityForm() {
  const [state, setState] = useState("CO");
  const [zip, setZip] = useState("80202");
  const result = checkStateEligibility(state);

  return (
    <section className="premium-card p-5">
      <div className="flex items-center gap-2">
        <MapPin className="text-[var(--brand)]" size={20} />
        <h2 className="text-xl font-semibold">Where will you test?</h2>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_120px]">
        <label className="grid gap-1 text-sm font-medium">
          ZIP code near you
          <input
            value={zip}
            onChange={(event) => setZip(event.target.value)}
            className="focus-ring input-control"
            inputMode="numeric"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          State
          <input
            value={state}
            onChange={(event) => setState(event.target.value.slice(0, 2).toUpperCase())}
            className="focus-ring input-control uppercase"
          />
        </label>
      </div>
      <div
        className={`mt-4 flex items-start gap-2 rounded-md p-3 text-sm ${
          result.eligible ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"
        }`}
      >
        <ShieldAlert size={18} />
        <p>
          {result.message} We use ZIP <span className="font-mono">{zip || "not entered"}</span> to find nearby labs
          and scheduling help.
        </p>
      </div>
    </section>
  );
}
