# Private Lab Test AI Growth Stack Plan

## Goal

Build the operating system that lets Private Lab Test feel like a premium telehealth company instead of a commodity lab catalog.

The product should use AI where it compounds trust and speed:

- Help customers choose labs without diagnosing or treating.
- Track funnel drop-off without leaking health data.
- Automate email/SMS follow-up without exposing sensitive details.
- Build a repeatable lab-partner acquisition machine.
- Prepare for HIPAA/SOC 2-style diligence before result storage and AI PHI workflows scale.
- Keep UI quality close to Superpower, Function, Hims, and MEDVi.

## Stack

### 1. AI Concierge

Tool: OpenAI API.

Use now:

- Rules-based panel recommendations.
- Educational panel explanations.
- Fasting/prep guidance.
- Result-discussion prompts.

Live AI mode should stay gated until the right privacy setup exists:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `AI_CONCIERGE_MODE=live`
- `OPENAI_HEALTHCARE_BAA_ACK=true`

Rules:

- No diagnosis.
- No treatment or medication recommendations.
- No raw PHI in prompts until BAA/zero-retention requirements are reviewed.
- Use `store: false` when calling OpenAI Responses API.

### 2. Product Analytics

Tool: PostHog.

Use now:

- Catalog search.
- Panel view.
- ZIP check.
- Checkout start.
- Checkout completion.
- Result-ready event.
- Retest reminder due.

Never send:

- Name.
- Email.
- Phone.
- DOB.
- Address or raw ZIP.
- Result values.
- Biomarker values.
- Symptoms or diagnosis language.

Environment:

- `POSTHOG_PROJECT_API_KEY`
- `POSTHOG_HOST`

### 3. Lifecycle Automation

Tools: Resend first, then Customer.io and Twilio when journeys become more complex.

Journeys:

- Abandoned checkout.
- Requisition ready.
- Fasting reminder.
- Appointment reminder.
- Result-ready notification.
- 12-week metabolic retest.
- Annual baseline retest.

Rule: SMS/email should say an update is ready in the portal rather than putting health details directly in the message.

### 4. Lab Acquisition Machine

Tools: Clay, Apollo, Firecrawl/Apify, CMS CLIA lookup.

Weekly workflow:

1. Pull CLIA/regional lab candidates.
2. Enrich decision-makers and business-development contacts.
3. Score each lab by state, cash menu, PSC/mobile coverage, result delivery, and critical-value policy.
4. Draft outreach.
5. Human-review every message before sending.
6. Track response and contract status in the partner pipeline.

No patient data should ever enter outbound or enrichment tools.

### 5. Compliance And Trust

Tools: Vanta or Drata, Sentry, later Aptible or a healthcare cloud posture if PHI scope grows.

Start before scale:

- Vendor inventory.
- BAA tracker.
- Risk assessment.
- Access review cadence.
- Incident response plan.
- Audit logs for orders, results, admin actions, and AI actions.
- Error monitoring with PII/PHI scrubbing.

Do not claim "HIPAA certified." Scope compliance honestly.

### 6. Premium UI Machine

Tools: v0, Cursor, Figma, Pageflows, Mobbin.

Use AI for:

- Landing page variants.
- Checkout clarity.
- Result dashboard polish.
- Program pages.
- Mobile purchase flow.

Guardrail: use synthetic data only in design tools.

## Implementation Status

- `/growth` shows the operating stack and sprint roadmap.
- `/api/ai/concierge` returns safe panel guidance now, with live OpenAI mode gated by env and BAA acknowledgement.
- `/api/growth/event` accepts only approved non-PHI event fields and can forward to PostHog when configured.
- `/api/email/test` verifies Resend configuration and can send a non-PHI test email to Resend's safe sink address.
- `src/data/ai-growth-stack.ts` stores the tool stack, env requirements, guardrails, and sprint plan.

## Founder Next Steps

- Work through `docs/founder-action-checklist.md` in one batch setup session.
- Create PostHog project and send the project API key/host.
- Use Resend for early lifecycle email because the account already exists.
- Set up Twilio only after consent language and message templates are ready.
- Start Vanta or Drata when real PHI/result workflows become the focus.
- Request OpenAI BAA before live AI receives anything that could be PHI.
