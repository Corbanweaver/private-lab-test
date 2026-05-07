alter type order_status add value if not exists 'clinician_review';
alter type order_status add value if not exists 'authorized';

do $$
begin
  create type lab_partner_tier as enum ('aggregator', 'regional', 'mobile', 'national');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type lab_partner_clia_status as enum ('verified', 'pending');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type result_delivery_method as enum ('api', 'sftp', 'portal', 'manual_pdf');
exception
  when duplicate_object then null;
end $$;

create table if not exists lab_partners (
  id text primary key,
  name text not null,
  tier lab_partner_tier not null,
  clia_status lab_partner_clia_status not null default 'pending',
  states_served text[] not null default '{}',
  supported_test_ids text[] not null default '{}',
  order_workflow text not null,
  requisition_process text not null,
  result_delivery result_delivery_method not null,
  turnaround text not null,
  critical_result_policy text not null,
  contact_name text not null,
  contact_title text not null,
  contact_email text not null,
  created_at timestamptz not null default now()
);

create table if not exists lab_partner_prices (
  id uuid primary key default gen_random_uuid(),
  partner_id text not null references lab_partners(id) on delete cascade,
  test_id text not null references lab_tests(id) on delete cascade,
  cash_price_cents integer not null check (cash_price_cents >= 0),
  unique (partner_id, test_id)
);

create table if not exists lab_partner_locations (
  id text primary key,
  partner_id text not null references lab_partners(id) on delete cascade,
  name text not null,
  state text not null,
  zip text not null,
  address text not null
);

alter table lab_orders add column if not exists lab_partner_id text references lab_partners(id);
alter table lab_orders add column if not exists clinician_authorization_id text;
alter table lab_orders add column if not exists order_model text not null default 'cash_pay_clinician_authorized';
alter table lab_orders add column if not exists concierge_status text;

alter table lab_partners enable row level security;
alter table lab_partner_prices enable row level security;
alter table lab_partner_locations enable row level security;

create policy "Public read active lab partners" on lab_partners for select using (true);
create policy "Public read lab partner prices" on lab_partner_prices for select using (true);
create policy "Public read lab partner locations" on lab_partner_locations for select using (true);
