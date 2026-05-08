# Market Research And Product Sprint

Date: May 8, 2026

## What People Need To Trust This

The direct-to-consumer lab flow needs to feel more like a calm health checkout than a medical rabbit hole.

The highest-value trust signals are:

- Clear price before payment, with no insurance billing surprises.
- Privacy language close to the order buttons, not hidden in the footer.
- Simple collection instructions and nearby clinic/mobile options.
- Human support for scheduling, fasting, redraws, and result timing.
- Plain-language result education without diagnosis or treatment claims.

Research signal:

- J.D. Power's 2024 telehealth study ranks trust as the most important factor in telehealth satisfaction and cites convenience, speed, and data-security concerns as major experience factors: https://www.jdpower.com/business/press-releases/2024-us-telehealth-satisfaction-study
- HHS telehealth privacy resources emphasize secure health information handling and patient privacy expectations: https://telehealth.hhs.gov/patients/additional-resources/data-privacy
- HHS tracking guidance is a warning sign for health-intent pages: avoid unnecessary third-party tracking around sensitive lab intent pages: https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-online-tracking/index.html

Product moves implemented:

- Added a research-backed trust section to the homepage.
- Added a `/strategy` dashboard for trust drivers, common tests, network plays, UI principles, and source links.
- Kept the product language focused on privacy, clear cash price, provider authorization where required, and next steps.

## Most Common Test Demand

The starter catalog should stay narrow until the live provider menu is mapped. The highest-confidence launch set is:

1. CMP
2. CBC
3. Lipid panel
4. Hemoglobin A1c
5. TSH
6. Vitamin D, 25-Hydroxy
7. Ferritin
8. hs-CRP

Research signal:

- Labcorp OnDemand visibly lists common self-pay tests including CBC, HbA1c, hs-CRP, vitamin D, and ferritin, and describes a curated menu of commonly ordered tests: https://www.ondemand.labcorp.com/products?category_id=22
- Quest Health shows common direct-order tests and best-seller demand for HbA1c and broader health profiles: https://www.questhealth.com/shop-tests
- Quest Health affiliate materials cite 150+ on-demand tests and 2,000+ patient service centers: https://www.questhealth.com/affiliate-program.html
- Labcorp OnDemand explains its purchase-online flow, physician review/order step, online results, and no-insurance billing model: https://www.labcorp.com/patients/labcorp-ondemand

Product moves implemented:

- Added `src/data/product-research.ts` to encode common lab demand.
- Added common-test shortcuts to the catalog page.
- Added common-test cards to the homepage.
- Added tests so every common-demand test ID must exist in the catalog.

## Lab Network Expansion Strategy

The fastest real product path is still:

1. Finish the Junction production menu mapping.
2. Open an ORDRS commercial backup.
3. Add Getlabs or equivalent mobile phlebotomy for home draw.
4. Qualify Health Gorilla for deeper ordering/result connectivity.
5. Use real demand data to approach Quest, Labcorp, Sonic divisions, and BioReference.
6. Build a regional CLIA lab sweep for better local cash prices.

Research signal:

- Junction documents lab ordering, physician networks, multiple sampling methods, webhooks, and results: https://docs.junction.com/lab/overview/introduction
- ORDRS markets API-driven lab ordering, physician oversight, 2,500+ locations, and a 3,000+ test menu: https://www.ordrs.io/
- Getlabs offers partner portal/API/link workflows for mobile phlebotomy and home diagnostics: https://www.getlabs.com/partners
- Health Gorilla describes electronic lab ordering and results retrieval across a national lab network: https://www.healthgorilla.com/home/markets/labs
- CMS CLIA is the certification baseline for U.S. human-specimen testing partners: https://www.cms.gov/medicare/quality/clinical-laboratory-improvement-amendments

Product moves implemented:

- Added network-expansion plays to `src/data/product-research.ts`.
- Added a homepage network roadmap.
- Added `/strategy` as the working product/research dashboard.
- Linked the strategy page from admin.

## Bigger Platform Direction

The next product layer should not be "more random tests." It should be named private-health programs:

- Whole Body Baseline
- Weight and Metabolic
- Men's Hormone Baseline
- Women's Hormone and Energy
- Heart and Longevity
- Private Lab Pass

This borrows the scalable pattern from Hims, MEDVi, Function Health, and Private MD Labs:

- Private MD Labs: fast order flow, big catalog, lab instructions.
- Hims & Hers: recurring personalized care, strong brand trust, app-based follow-through, labs as a data layer.
- MEDVi: narrow self-pay program around a high-intent problem.
- Function Health: premium biomarker membership and trend dashboard.

Product moves implemented:

- Added `src/data/health-programs.ts`.
- Added `/programs`.
- Added program cards to the homepage.
- Added benchmark lessons to `/strategy`.

## UI Direction

The site should keep moving toward the feel of premium biomarker brands without copying any one product:

- Calm, dark-first hero with immediate trust signals.
- Clear self-pay order path instead of a generic marketing page.
- Dense but polished tables for admin/partner work.
- Result-preview surfaces that sell clarity and trend awareness.
- Less medical clutter, more visible operational confidence.

Competitive signals:

- Function Health emphasizes Quest collection, 100+ biomarkers, medical-grade processing, trends, and dashboard clarity: https://www.functionhealth.com/faqs/which-tests-are-included-with-a-function-membership
- Labcorp and Quest both lean heavily on trusted lab names, online purchasing, physician ordering/review language, and online results.

Product moves implemented:

- Added premium UI principles to the strategy page.
- Added clearer homepage sections for trust, common tests, and network build.
- Added source-backed content without adding diagnosis or treatment claims.

## What Still Needs Founder Help

- Junction: request the production or expanded sandbox menu and lab_test IDs for the top launch tests.
- ORDRS: book a commercial/API discovery call as backup.
- Getlabs: ask for ZIP coverage and fees for launch states.
- Legal/privacy: decide the HIPAA/BAA posture before marketing stored results heavily.
- Brand: decide whether the public site should expose `/strategy` or keep it as an internal-only route later.
