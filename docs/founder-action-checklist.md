# Private Lab Test Founder Action Checklist

Use this as the batch setup list for accounts, keys, approvals, and decisions that need the founder/operator touch.

## Knock Out Together

### PostHog

Status: needed.

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

Status: use this first because the account already exists.

What to do:

- Confirm the active Resend API key.
- Confirm which sender domain/address should send product email, ideally something like `care@privatelabtest.com` or `orders@privatelabtest.com`.
- Send the key/sender choice so they can be added as:
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL`

Why it matters:

- Handles order confirmation, requisition-ready, result-ready, abandoned checkout, and retest reminder emails before we need Customer.io.

### OpenAI Healthcare BAA

Status: later, before live AI handles PHI.

What to do:

- Request/confirm whether OpenAI can execute a BAA for the API use case.
- Do not enable live PHI-capable AI until the BAA/privacy review is done.

Why it matters:

- The current concierge works safely in rules mode. Live AI is gated until the healthcare privacy setup is approved.

### Quest Health Affiliate

Status: needed.

What to do:

- Apply to the Quest Health affiliate program.
- Send approval, terms, allowed claims, link rules, and brand-use rules.

Why it matters:

- Fastest legitimate Quest-branded path while direct national-lab contracting matures.

### Junction Production Menu

Status: sandbox screenshots captured; production menu still needed.

What to do:

- Ask Junction for production or expanded sandbox lab test IDs for CMP, CBC, lipids, A1c, TSH, vitamin D, B12/folate, hs-CRP, ferritin, thyroid, and hormone tests.
- Send the test IDs/menu export.
- Confirm whether provider ID `7325` should be used for estradiol sensitive, the estradiol/LH/progesterone panel, or both depending lab/provider.

Why it matters:

- Turns the sandbox flow into real orderable panels.

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
