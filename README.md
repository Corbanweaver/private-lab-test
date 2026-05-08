Private Lab Test is a Next.js prototype for safe, affordable cash-pay lab access for older adults and the loved ones helping them.

The product is now shaped around:

- Clinician-authorized wellness lab orders
- Prepaid cash prices with no insurance or Medicare billing in the launch flow
- Concierge scheduling and family assurance milestones
- CLIA-focused lab partner tracking
- An aggregator-first supply strategy with regional, mobile, and national lab expansion paths

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Real Lab Provider Setup

The app defaults to the mock provider. To test real lab connectivity through Junction sandbox:

1. Get a Junction sandbox Team API key.
2. Set `LAB_PROVIDER=junction`, `JUNCTION_API_KEY`, `JUNCTION_BASE_URL=https://api.sandbox.us.junction.com`, and `SUPABASE_SERVICE_ROLE_KEY` in Vercel/local env.
3. Use `GET /api/provider/live` to confirm catalog access.
4. Use `POST /api/provider/live` with `{ "action": "locations", "zip": "80202" }` to verify live clinic lookup.
5. Map Private Lab Test panels/tests to Junction lab test IDs in `JUNCTION_LAB_TEST_MAP`, for example:

```json
{
  "complete-wellness": ["junction-lab-test-id"]
}
```

Production provider order writes stay disabled unless `LAB_PROVIDER_ORDER_WRITES=enabled`. Sandbox checkout bypasses Stripe unless `LAB_PROVIDER_SANDBOX_CHECKOUT=enabled`, and direct sandbox order testing is blocked in production unless `LAB_PROVIDER_SANDBOX_TESTS=enabled`. Catalog/mapping debug actions are Preview-only unless `LAB_PROVIDER_CATALOG_DEBUG=enabled`. Patient intake is stored server-side in Supabase checkout intents and is not copied into Stripe metadata.

When mapping individual test IDs, the Junction adapter requires every selected test to have a provider ID. Set `JUNCTION_ALLOW_PARTIAL_TEST_MAP=true` only for temporary sandbox experiments.

Direct Quest/Labcorp enterprise integrations should come after aggregator volume proof; the current fastest path is a provider network that can issue the required authorization, generate requisitions, return PSC locations, and deliver results.

The latest product research sprint is documented in `docs/market-research-and-product-sprint.md`, the company scale playbook is in `docs/company-scale-playbook.md`, and the app exposes working strategy/program surfaces at `/strategy` and `/programs`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
