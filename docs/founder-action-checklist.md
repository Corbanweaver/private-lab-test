# Private Lab Test Founder Action Checklist

Use this as the batch setup list for accounts, keys, approvals, and decisions that need the founder/operator touch.

## Knock Out Together

### PostHog

Status: connected and tested.

What to do:

- Create a PostHog project for Private Lab Test.
- Copy the project API key.
- Copy the host, usually `https://us.i.posthog.com` for US cloud unless PostHog shows a different host.
- Send both values so they can be added as:
  - `POSTHOG_PROJECT_API_KEY`
  - `POSTHOG_HOST`

Why it matters:

- Lets us measure catalog, ZIP, checkout, and retest funnel drop-off without sending PHI.

### Resend

Status: connected and tested. App test endpoint is `POST /api/email/test`.

What to do:

- Confirm the active Resend API key.
- Confirm which sender domain/address should send product email, ideally something like `care@privatelabtest.com` or `orders@privatelabtest.com`.
- Send the key/sender choice so they can be added as:
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL`

Why it matters:

- Handles order confirmation, requisition-ready, result-ready, abandoned checkout, and retest reminder emails before we need Customer.io.

How we test it:

- `GET /api/email/test` reports whether `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are present without exposing the key.
- `POST /api/email/test` sends a non-PHI test email to Resend's safe `delivered@resend.dev` sink address by default.
- To test a real inbox later, set `RESEND_TEST_RECIPIENT` to that email address. Do not enable arbitrary recipients in production.

### OpenAI Healthcare BAA

Status: later, before live AI handles PHI.

What to do:

- Request/confirm whether OpenAI can execute a BAA for the API use case.
- Do not enable live PHI-capable AI until the BAA/privacy review is done.

Why it matters:

- The current concierge works safely in rules mode. Live AI is gated until the healthcare privacy setup is approved.

### Quest Health Affiliate

Status: application submitted; Impact verification token added to `privatelabtest.com`.

What to do:

- Apply to the Quest Health affiliate program.
- Send approval, terms, allowed claims, link rules, and brand-use rules.

Why it matters:

- Fastest legitimate Quest-branded path while direct national-lab contracting matures.

### Ulta Lab Tests

Status: accepted. App now supports an Ulta partner checkout path through `/partners/order` and `/api/partners/referral`.

What to collect now:

- Exact affiliate, healthcare professional, or co-branded portal URL.
- Any panel-specific URLs for Complete Wellness, Essential Wellness, Heart/Metabolic, Energy, and Hormone panels.
- Approved wording and brand-use rules.
- Commission/margin and payout timing.
- Whether custom panels can be created in their portal.
- Whether results stay only in Ulta's portal or can be exported/reported later.

Set in Vercel:

- `ULTA_PARTNER_STATUS=approved`
- `ULTA_AFFILIATE_URL=your_tracked_ulta_url`
- Optional: `ULTA_PANEL_URL_MAP={"complete-wellness":"https://panel-specific-url"}`

Still ask on the call:

- Whether the best setup is affiliate, healthcare professional account, co-branded portal, or another partner structure.
- Whether Private Lab Test can deep-link to specific tests or custom panels.
- Whether users can preview nearby draw sites before payment.
- Who handles physician authorization, requisitions, abnormal results, and result delivery.
- Whether results stay in Ulta's portal or can be exported/reported later.
- Exact commission/margin, payout timing, allowed claims, and state restrictions.

Why it matters:

- This may be the fastest way to make the site useful for real customers while API-native ordering is still being negotiated.

### Junction Production Menu

Status: sandbox screenshots captured; production menu still needed.

What to do:

- Ask Junction for production or expanded sandbox lab test IDs for CMP, CBC, lipids, A1c, TSH, vitamin D, B12/folate, hs-CRP, ferritin, thyroid, and hormone tests.
- Send the test IDs/menu export.
- Confirm whether provider ID `7325` should be used for estradiol sensitive, the estradiol/LH/progesterone panel, or both depending lab/provider.

Why it matters:

- Turns the sandbox flow into real orderable panels.

### Clinical Review Partner

Status: needed before marketing medical advice, clinician interpretation, or treatment pathways.

What to do:

- Identify an Everly/PWNHealth-style partner or licensed telehealth group that can support lab-result review.
- Ask for state coverage, clinician documentation, critical-value handling, BAA posture, patient messaging, pricing, and API/export options.

Why it matters:

- Educational lab insights can be built now, but actual medical advice needs licensed clinician operations.

## Later

### Twilio

Use after consent language and message templates are ready.

Needed values:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_MESSAGING_SERVICE_SID`

### Vanta Or Drata

Use before heavy PHI/result storage, enterprise partnerships, or clinical workflows.

Needed decision:

- Choose Vanta, Drata, or a legal/compliance consultant-led process.

### Customer.io

Use later when Resend-coded lifecycle flows become too complex.

Needed decision:

- Move to Customer.io when we need branching journeys, segmentation, and multi-channel lifecycle campaigns.
