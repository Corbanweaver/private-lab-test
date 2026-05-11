# Company Scale Playbook

Date: May 8, 2026

## North Star

Private Lab Test should become the private, self-pay health platform that starts with labs.

The first wedge is Private MD Labs-style ordering: choose tests, enter ZIP, pay cash, get lab instructions, view results.

The bigger company is Hims/Function-style continuity: recurring programs, biomarker trends, clinician review options, family support, and future treatment pathways only where licensed providers and state operations support them.

The updated product thesis is documented in `docs/telehealth-lab-membership-roadmap.md`: Private Lab Test should become a lab-first telehealth membership, not just a one-time test catalog.

## What To Borrow

### Private MD Labs

Borrow:

- Large searchable test catalog.
- Immediate order instructions.
- Simple self-pay flow.
- Repeat testing reminders.

Avoid:

- Feeling like a commodity list of tests with no relationship after the order.

Source: https://www.privatemdlabs.com/lab_process.php

### Hims & Hers

Borrow:

- Program-based packaging.
- Recurring subscription engine.
- Strong brand and trust language.
- Labs as the data layer for personalized follow-through.
- App-style dashboard, insights, and care pathways.

Avoid:

- Prescription expansion before clinical operations, protocols, and regulatory review are ready.
- Any confusing personalization or compounding claims.

Sources:

- https://www.hims.com/labs
- https://news.hims.com/newsroom/introducing-labs-by-hims-hers
- https://investors.hims.com/news/news-details/2025/Hims--Hers-Introduces-Labs-a-Holistic-In-Depth-Testing-Experience-That-Puts-Customers-in-Control-of-Their-Health-and-Wellness-Journeys/default.aspx

### MEDVi

Borrow:

- Simple high-intent program packaging.
- Transparent self-pay framing.
- Messaging/support as part of the product.
- Narrow metabolic/weight-loss entry path.

Avoid:

- Surprise subscription charges, unclear escalation, or medication language before provider review.

Source: https://glp1.medvi.org/

### Function Health

Borrow:

- Whole-body biomarker membership positioning.
- Premium trend dashboard.
- Annual and semiannual testing cadence.
- Clear "baseline then track over time" story.

Avoid:

- Overwhelming first-time buyers before the basic ordering network is reliable.

Source: https://www.functionhealth.com/faqs/which-tests-are-included-with-a-function-membership

### Superpower

Borrow:

- Simple biomarker membership pitch.
- AI-forward dashboard and repeated testing story.
- Lower-friction pricing narrative that makes advanced labs feel more mainstream.

Avoid:

- Letting AI-generated copy sound like diagnosis, treatment, or medical advice before clinician review is operational.

Source: https://superpower.com/

## Product Stack To Build

1. Self-pay lab checkout
   - Current focus.
   - Works when Junction or another provider can create real orders.
   - Now also supports approved partner checkout redirects for Ulta, and Quest when approved.

2. AI-guided ordering and growth engine
   - Safe panel concierge for customers.
   - Non-PHI funnel analytics.
   - Lifecycle reminders for requisitions, results, and retests.
   - Lab-partner acquisition machine.
   - Documented compliance posture before scaling PHI.

3. Program landing pages
   - Whole Body Baseline.
   - Weight and Metabolic.
   - Men's Hormone Baseline.
   - Women's Hormone and Energy.
   - Heart and Longevity.

4. Result dashboard
   - PDF result storage.
   - Structured biomarker trends.
   - Educational insights.
   - "Discuss with a clinician" prompts.

5. Membership engine
   - Annual Lab Pass.
   - Lab Pass Plus with clinician result review where licensed.
   - 12-week metabolic follow-up.
   - Retest reminders.
   - Member pricing and support.
   - Clear renewal notices and easy cancellation.

6. Clinical marketplace
   - Optional licensed clinician review.
   - Treatment partner referrals only where compliant.
   - Clear separation between lab ordering and prescribing.
   - State-aware clinician licensure and scope-of-practice checks.

7. Family/caregiver layer
   - Permissioned result sharing.
   - Appointment support.
   - Adult caregiver notifications.

## Operational Moats

- Provider test ID mapping by panel and state.
- ZIP-level clinic/mobile availability.
- Cash price database by lab, test, draw fee, and region.
- National lab affiliation ladder: affiliate/referral proof first, then white-label/API networks, then provider-account or enterprise direct contracting.
- Result ingestion and normalized biomarkers.
- Retest reminders and longitudinal trends.
- Result-release, abnormal-follow-up, retest, program-progress, and member-savings retention loops.
- Support workflows for redraws, missed requisitions, result delays, and critical values.
- Privacy-first account and consent controls.
- Separation between educational insights, licensed clinician review, and future treatment pathways.

## Immediate Founder Asks

- Batch the account/key/approval work in `docs/founder-action-checklist.md`.
- Get Junction production or expanded sandbox IDs for the launch menu.
- Apply to Quest Health's affiliate program and keep Quest-branded pages disabled until approval and brand-use terms are written.
- Turn Quest/Ulta approval into affiliate, deep-link, or co-branded real-ordering paths.
- Add Ulta's tracked URL to `ULTA_AFFILIATE_URL`; add Quest's Impact URL later to `QUEST_AFFILIATE_URL`.
- Keep ORDRS as a later backup because the signup/onboarding path is currently too circular.
- Book Getlabs or another mobile phlebotomy partner.
- Identify the clinician infrastructure partner that can support result review, telehealth visits, state matching, documentation, and critical-value workflows.
- Decide whether `/strategy` and `/programs` should be public or hidden before production push.
- Start legal/privacy review before advertising stored results, family sharing, or any treatment pathway.
- Connect PostHog, OpenAI API, Customer.io/Resend, Twilio, and a compliance tool only with the guardrails in `docs/ai-growth-stack-plan.md`.
