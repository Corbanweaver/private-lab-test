"use client";

import { useEffect, useState } from "react";
import { Building2, CheckCircle2, MapPin, ShieldAlert } from "lucide-react";
import type { CollectionType } from "@/lib/types";

type QuotePreview = {
  available: boolean;
  state: string;
  customerMessage: string;
  unavailableReason?: string;
  total: number;
  turnaround: string;
  selectedLocation?: {
    name: string;
    address: string;
    distanceMiles: number;
  };
};

type QuoteState = {
  requestKey: string;
  quote: QuotePreview;
};

export function EligibilityForm({
  formId,
  panelId = "complete-wellness",
  testIds = [],
}: {
  formId?: string;
  panelId?: string;
  testIds?: string[];
}) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("CO");
  const [zip, setZip] = useState("80202");
  const [collectionType, setCollectionType] = useState<CollectionType>("walk_in");
  const [quoteState, setQuoteState] = useState<QuoteState | null>(null);
  const formProps = formId ? { form: formId } : {};
  const normalizedZipInput = zip.replace(/\D/g, "").slice(0, 5);
  const testIdsKey = testIds.join(",");
  const quoteRequestKey = `${panelId}|${testIdsKey}|${state}|${normalizedZipInput}|${collectionType}`;
  const isReadyForQuote = state.length === 2 && normalizedZipInput.length === 5;
  const activeQuote = isReadyForQuote && quoteState?.requestKey === quoteRequestKey ? quoteState.quote : null;
  const isLoading = isReadyForQuote && quoteState?.requestKey !== quoteRequestKey;
  const isAvailable = activeQuote?.available ?? false;
  const clinic = activeQuote?.selectedLocation;

  useEffect(() => {
    const controller = new AbortController();
    const normalizedZip = zip.replace(/\D/g, "").slice(0, 5);

    if (state.length !== 2 || normalizedZip.length !== 5) {
      return;
    }

    fetch("/api/order/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        panelId,
        testIds: testIdsKey ? testIdsKey.split(",").filter(Boolean) : [],
        state,
        zip: normalizedZip,
        collectionType,
      }),
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = (await response.json()) as QuotePreview;
        setQuoteState({ requestKey: quoteRequestKey, quote: data });
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") {
          setQuoteState({
            requestKey: quoteRequestKey,
            quote: {
              available: false,
              state,
              customerMessage: "We could not check nearby labs. Try again in a moment.",
              total: 0,
              turnaround: "Unavailable",
            },
          });
        }
      });

    return () => controller.abort();
  }, [collectionType, panelId, quoteRequestKey, state, testIdsKey, zip]);

  return (
    <section className="premium-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="text-[var(--brand)]" size={20} />
          <h2 className="text-xl font-semibold">ZIP and basic info</h2>
        </div>
        <span className="pill">Step 2</span>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        We use this to match a nearby clinic and prepare your self-pay lab instructions.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">
          First name
          <input
            {...formProps}
            name="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="focus-ring input-control"
            autoComplete="given-name"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Email
          <input
            {...formProps}
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="focus-ring input-control"
            autoComplete="email"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          ZIP code near you
          <input
            {...formProps}
            name="zip"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
            className="focus-ring input-control"
            inputMode="numeric"
            autoComplete="postal-code"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          State
          <input
            {...formProps}
            name="state"
            value={state}
            onChange={(event) => setState(event.target.value.slice(0, 2).toUpperCase())}
            className="focus-ring input-control uppercase"
            autoComplete="address-level1"
            maxLength={2}
          />
        </label>
        <label className="grid gap-1 text-sm font-medium sm:col-span-2">
          Collection
          <select
            {...formProps}
            name="collectionType"
            value={collectionType}
            onChange={(event) => setCollectionType(event.target.value as CollectionType)}
            className="focus-ring input-control"
          >
            <option value="walk_in">Nearest clinic</option>
            <option value="mobile">Home or office blood draw</option>
          </select>
        </label>
      </div>
      <div
        className={`mt-4 flex items-start gap-2 rounded-md p-3 text-sm ${
          isAvailable ? "bg-[#e4f3ed] text-[#125044]" : "bg-[#f7ecd0] text-[#63511c]"
        }`}
      >
        {isAvailable ? <CheckCircle2 size={18} /> : <ShieldAlert size={18} />}
        <p>
          {isLoading && isReadyForQuote
            ? "Checking nearby labs..."
            : activeQuote?.customerMessage ?? "Enter your ZIP and state to find the nearest lab route."}
        </p>
      </div>
      {isAvailable && clinic ? (
        <div className="mt-4 rounded-md border border-[var(--line)] bg-[#fcfffd] p-4">
          <div className="flex items-start gap-3">
            <span className="icon-tile">
              <Building2 size={19} />
            </span>
            <div>
              <p className="eyebrow text-xs">Nearest clinic</p>
              <h3 className="mt-1 text-lg font-semibold">{clinic.name}</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{clinic.address}</p>
            </div>
          </div>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <p className="rounded-md bg-[var(--accent-soft)] p-3">
              <span className="block font-semibold text-[var(--brand-dark)]">
                {clinic.distanceMiles.toFixed(1)} miles
              </span>
              from ZIP {zip || "near you"}
            </p>
            <p className="rounded-md bg-[var(--accent-soft)] p-3">
              <span className="block font-semibold text-[var(--brand-dark)]">${activeQuote?.total ?? 0} cash price</span>
              Results expected in {activeQuote?.turnaround ?? "a few days"}.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
