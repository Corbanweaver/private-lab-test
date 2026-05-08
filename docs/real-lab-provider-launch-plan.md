# Real Lab Provider Launch Plan

## Fastest Path

Start with an aggregator/provider network, then pursue direct national lab relationships after order volume is proven.

1. Junction sandbox and production
   - Supports lab ordering, physician network coverage, patient service center lookup, requisition PDF retrieval, and structured/PDF results.
   - Best first integration because it can route to major lab networks while we keep one adapter contract in the app.

2. ORDRS commercial conversation
   - Parallel backup for nationwide physician oversight, lab ordering, result delivery, and broader test menu coverage.
   - Use as redundancy and negotiating leverage.

3. Lab Testing API status check
   - Do not treat Lab Testing API as the primary launch path until they confirm new API orders are active again.
   - Their public individual portal notice says new orders were discontinued effective March 1, 2026.

4. Direct Quest/Labcorp enterprise
   - Approach after we can show monthly order volume, clean patient demographics, low cancellation rate, support workflow, and critical-result handling.
   - Direct relationships are likely portal/interface/enterprise onboarding, not a simple public self-serve API.

## What Is Implemented

- `LAB_PROVIDER=junction` switches the aggregator adapter from mock to Junction.
- `GET /api/provider/live` checks provider configuration and catalog access.
- `POST /api/provider/live` supports live/sandbox location and quote checks.
- `POST /api/provider/live` with `action=sandbox_order` can create sandbox orders only.
- Stripe checkout creates a server-only Supabase checkout intent for patient intake.
- Stripe webhook marks paid checkout intents and submits the order to the configured provider.
- Requisition PDFs are proxied through `/api/provider/live/requisition?orderId=...` so API keys stay server-side.

## Environment Needed

```bash
LAB_PROVIDER=junction
JUNCTION_API_KEY=
JUNCTION_BASE_URL=https://api.sandbox.us.junction.com
JUNCTION_LAB_TEST_MAP='{"complete-wellness":["<junction lab_test_id>"]}'
JUNCTION_ALLOW_PARTIAL_TEST_MAP=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Set `LAB_PROVIDER_ORDER_WRITES=enabled` only after production contracting, webhook verification, and clinical operations review. Sandbox writes are allowed without that flag.

Keep `LAB_PROVIDER_SANDBOX_CHECKOUT` unset to bypass Stripe while the provider is pointed at sandbox. Keep `LAB_PROVIDER_SANDBOX_TESTS` unset in production so the direct sandbox-order test endpoint stays blocked on the public deployment.

`LAB_PROVIDER_CATALOG_DEBUG=enabled` allows catalog/mapping debug actions on production. Keep it unset unless you are actively auditing the provider catalog; Preview deployments can use those actions without the flag.

Keep `JUNCTION_ALLOW_PARTIAL_TEST_MAP` unset for real orders. The adapter will block an order if the selected panel relies on individual test mappings and any selected test is missing a Junction ID.

## Current Sandbox Mapping

The current Junction sandbox catalog exposes only a few test IDs. For now, `complete-wellness` is mapped to the walk-in CMP sandbox test so the full provider flow can be exercised safely:

```json
{
  "complete-wellness": ["c533549c-1e62-4afe-9a0e-0567a9b2bcc2"],
  "cmp": "c533549c-1e62-4afe-9a0e-0567a9b2bcc2"
}
```

This is not the final production Complete Wellness panel. Replace it when Junction provides production IDs for CMP, CBC, lipid panel, A1C, TSH, vitamin D, B12/folate, hsCRP, ferritin, and any other launched markers.

## Mapping Workflow

Use a Preview deployment or a private local server:

```bash
POST /api/provider/live
{"action":"mapping"}
```

The response includes:

- `byTestId`: ranked provider candidates for each Private Lab Test test ID.
- `suggestedMap`: high-confidence individual test mappings that match the default walk-in collection flow.
- `panelMap`: generated complete panel-to-provider-test mappings.
- `partialPanelMap`: panels that still have missing provider IDs.
- `collectionMismatches`: high-confidence candidates that were skipped because they require another collection method, such as at-home phlebotomy.
- `envValue`: compact JSON ready for `JUNCTION_LAB_TEST_MAP`.
- `missingTestIds`: tests that still need a manual provider ID from Junction.

Only use the generated `envValue` after reviewing the candidates. This keeps the production menu from silently mapping a marker to the wrong lab product.

## Operational Requirements Before Production

- Signed provider agreement and BAA/privacy review.
- Confirm states served and excluded states with the provider.
- Confirm whether Quest, Labcorp, BioReference, or another network is used per order.
- Confirm panel mappings and provider IDs for each marker.
- Confirm critical-value and abnormal-result escalation.
- Confirm patient support process for missed requisitions, redraws, cancellations, and result delays.
- Keep insurance out of the flow: use client-bill/cash-pay where supported.
