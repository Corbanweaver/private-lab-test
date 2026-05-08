do $$
begin
  create type lab_collection_type as enum ('walk_in', 'mobile', 'kit');
exception
  when duplicate_object then null;
end $$;

create table if not exists checkout_intents (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'created' check (
    status in (
      'created',
      'stripe_session_created',
      'paid',
      'submitted_to_provider',
      'lab_order_ready',
      'collected',
      'results_received',
      'reviewed',
      'released',
      'provider_error',
      'cancelled'
    )
  ),
  panel_id text not null,
  test_ids text[] not null default '{}',
  state text not null,
  zip text not null,
  collection_type lab_collection_type not null default 'walk_in',
  quote_id text not null,
  route_id text,
  location_id text,
  partner_id text,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'usd',
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  provider_order_id text,
  provider_name text,
  provider_response jsonb,
  patient_intake jsonb not null default '{}'::jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table checkout_intents is 'Server-only checkout handoff records for paid lab orders. Contains PHI in patient_intake and should not be publicly exposed.';
comment on column checkout_intents.patient_intake is 'Basic patient intake needed by lab providers. Do not copy this data into Stripe metadata or client-visible logs.';

alter table checkout_intents enable row level security;

revoke all on checkout_intents from anon, authenticated;

create index if not exists checkout_intents_status_idx on checkout_intents(status);
create index if not exists checkout_intents_stripe_session_idx on checkout_intents(stripe_checkout_session_id);
create index if not exists checkout_intents_provider_order_idx on checkout_intents(provider_order_id);
