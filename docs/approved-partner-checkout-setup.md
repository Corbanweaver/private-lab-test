# Approved Partner Checkout Setup

Date: May 9, 2026

## What Changed

Ulta is now modeled as an approved partner checkout path. Quest is modeled as a pending partner path that can be enabled the same way if Quest/Impact approves the application.

The app can show both at the same time. A customer can choose a panel on Private Lab Test, then continue to the approved partner checkout that best matches the panel, price, location, or brand preference.

## Current Integration Model

Private Lab Test owns:

- Panel education and selection.
- ZIP/location guidance.
- Follow-up, retest, membership, and future clinician-review positioning.
- Non-PHI click tracking through our own redirect route.

Ulta or Quest owns:

- The actual lab purchase.
- Requisition/order instructions.
- Payment in their checkout.
- Result portal unless a separate export/API arrangement is approved.
- Their own provider authorization and support workflow, based on their terms.

## Environment Variables

Set these in Vercel Production and Preview when ready:

```text
ULTA_PARTNER_STATUS=approved
ULTA_AFFILIATE_URL=https://your-ulta-tracked-or-cobranded-url
ULTA_PANEL_URL_MAP={"complete-wellness":"https://optional-panel-specific-url"}
```

For Quest after approval:

```text
QUEST_PARTNER_STATUS=approved
QUEST_AFFILIATE_URL=https://your-quest-impact-tracked-url
QUEST_PANEL_URL_MAP={"complete-wellness":"https://optional-panel-specific-url"}
```

`*_PANEL_URL_MAP` is optional. Use it only if Ulta or Quest gives panel-specific links. If the map is missing, the app uses the base affiliate/co-branded URL.

Never put patient names, DOB, symptoms, or lab results into partner URLs. The redirect adds only non-PHI campaign parameters such as panel ID and source.

## Routes Added

- `/partners/order` shows partner checkout status and active partner order links.
- `/api/partners/status` returns non-secret partner configuration status.
- `/api/partners/referral?partner=ulta-lab-tests&panel=complete-wellness` redirects to the configured Ulta URL.

## What We Still Need From Ulta

- Exact affiliate or co-branded portal URL.
- Whether they can create custom panel links.
- Allowed wording and brand rules.
- Commission/payout schedule.
- Whether results can be exported or reported later.
- State restrictions and who handles physician authorization.

## Quest Can Run Alongside Ulta

Quest should not replace Ulta. If approved, Quest becomes a second checkout option. The product can eventually choose between partners by:

- Panel availability.
- Customer trust preference.
- Price.
- Location availability.
- State restrictions.
- Commission and conversion rate.

For now, Ulta is the fastest path to a real product. Quest becomes a second trusted national-lab lane if accepted.
