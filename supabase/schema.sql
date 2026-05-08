create type order_status as enum (
  'draft',
  'eligible',
  'clinician_review',
  'authorized',
  'paid',
  'submitted_to_provider',
  'lab_order_ready',
  'collected',
  'results_received',
  'reviewed',
  'released'
);

create type lab_partner_tier as enum ('aggregator', 'regional', 'mobile', 'national');
create type lab_partner_clia_status as enum ('verified', 'pending');
create type result_delivery_method as enum ('api', 'sftp', 'portal', 'manual_pdf');
create type lab_order_mode as enum ('direct_access', 'provider_authorization_included');
create type lab_collection_type as enum ('walk_in', 'mobile', 'kit');
create type lab_network_status as enum ('active_mock', 'contracting', 'candidate');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create table lab_tests (
  id text primary key,
  name text not null,
  category text not null,
  provider_code text not null,
  price_cents integer not null check (price_cents >= 0),
  biomarkers text[] not null default '{}',
  specimen text not null,
  fasting text not null,
  turnaround text not null,
  tags text[] not null default '{}',
  description text not null,
  created_at timestamptz not null default now()
);

create table panels (
  id text primary key,
  name text not null,
  subtitle text not null,
  price_cents integer not null check (price_cents >= 0),
  compare_at_cents integer not null check (compare_at_cents >= price_cents),
  test_ids text[] not null default '{}',
  tags text[] not null default '{}',
  goal text not null,
  description text not null,
  created_at timestamptz not null default now()
);

create table lab_partners (
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

create table lab_partner_prices (
  id uuid primary key default gen_random_uuid(),
  partner_id text not null references lab_partners(id) on delete cascade,
  test_id text not null references lab_tests(id) on delete cascade,
  cash_price_cents integer not null check (cash_price_cents >= 0),
  unique (partner_id, test_id)
);

create table lab_partner_locations (
  id text primary key,
  partner_id text not null references lab_partners(id) on delete cascade,
  name text not null,
  state text not null,
  zip text not null,
  address text not null
);

create table lab_network_routes (
  id text primary key,
  name text not null,
  partner_id text not null references lab_partners(id) on delete cascade,
  tier lab_partner_tier not null,
  status lab_network_status not null default 'candidate',
  order_mode lab_order_mode not null,
  collection_types lab_collection_type[] not null default '{}',
  states_served text[] not null default '{}',
  restricted_states text[] not null default '{}',
  route_priority smallint not null default 3 check (route_priority between 1 and 9),
  price_multiplier numeric(5, 2) not null default 1.00 check (price_multiplier > 0),
  platform_fee_cents integer not null default 0 check (platform_fee_cents >= 0),
  draw_fee_cents integer not null default 0 check (draw_fee_cents >= 0),
  turnaround text not null,
  support_note text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table lab_network_locations (
  id text primary key,
  route_id text not null references lab_network_routes(id) on delete cascade,
  partner_id text not null references lab_partners(id) on delete cascade,
  name text not null,
  address text not null,
  state text not null,
  zip text not null,
  collection_type lab_collection_type not null,
  draw_fee_cents integer not null default 0 check (draw_fee_cents >= 0),
  appointment_required boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table lab_provider_test_mappings (
  id uuid primary key default gen_random_uuid(),
  partner_id text not null references lab_partners(id) on delete cascade,
  internal_test_id text not null references lab_tests(id) on delete cascade,
  provider_test_code text not null,
  cash_price_cents integer not null check (cash_price_cents >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (partner_id, internal_test_id, provider_test_code)
);

create table lab_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_number text not null unique,
  status order_status not null default 'draft',
  panel_id text,
  state text not null,
  zip text,
  stripe_checkout_session_id text,
  provider_order_id text,
  provider_name text,
  lab_partner_id text references lab_partners(id),
  clinician_authorization_id text,
  order_model text not null default 'cash_pay_clinician_authorized',
  quote_id text,
  route_id text references lab_network_routes(id),
  location_id text references lab_network_locations(id),
  order_mode_v2 lab_order_mode,
  collection_type lab_collection_type,
  concierge_status text,
  requisition_url text,
  appointment_url text,
  total_cents integer not null check (total_cents >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table result_reports (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references lab_orders(id) on delete cascade,
  storage_path text not null,
  collection_date date not null,
  review_status text not null default 'pending' check (review_status in ('pending', 'reviewed', 'released')),
  released_at timestamptz,
  created_at timestamptz not null default now()
);

create table biomarker_results (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references result_reports(id) on delete cascade,
  name text not null,
  value text not null,
  unit text not null,
  reference_range text not null,
  flag text not null check (flag in ('low', 'normal', 'high', 'critical')),
  educational_insight text not null
);

alter table profiles enable row level security;
alter table lab_tests enable row level security;
alter table panels enable row level security;
alter table lab_orders enable row level security;
alter table lab_partners enable row level security;
alter table lab_partner_prices enable row level security;
alter table lab_partner_locations enable row level security;
alter table lab_network_routes enable row level security;
alter table lab_network_locations enable row level security;
alter table lab_provider_test_mappings enable row level security;
alter table result_reports enable row level security;
alter table biomarker_results enable row level security;

create policy "Users read own profile" on profiles for select using (auth.uid() = id);
create policy "Public catalog read tests" on lab_tests for select using (true);
create policy "Public catalog read panels" on panels for select using (true);
create policy "Public read active lab partners" on lab_partners for select using (true);
create policy "Public read lab partner prices" on lab_partner_prices for select using (true);
create policy "Public read lab partner locations" on lab_partner_locations for select using (true);
create policy "Public read lab network routes" on lab_network_routes for select using (true);
create policy "Public read lab network locations" on lab_network_locations for select using (active = true);
create policy "Public read lab provider test mappings" on lab_provider_test_mappings for select using (active = true);
create policy "Users read own orders" on lab_orders for select using (auth.uid() = user_id);
create policy "Users read own reports" on result_reports
  for select using (exists (select 1 from lab_orders where lab_orders.id = result_reports.order_id and lab_orders.user_id = auth.uid()));
create policy "Users read own biomarkers" on biomarker_results
  for select using (
    exists (
      select 1
      from result_reports
      join lab_orders on lab_orders.id = result_reports.order_id
      where result_reports.id = biomarker_results.report_id
      and lab_orders.user_id = auth.uid()
    )
  );
