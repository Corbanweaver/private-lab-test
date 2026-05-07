create type order_status as enum (
  'draft',
  'eligible',
  'paid',
  'submitted_to_provider',
  'lab_order_ready',
  'collected',
  'results_received',
  'reviewed',
  'released'
);

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
alter table result_reports enable row level security;
alter table biomarker_results enable row level security;

create policy "Users read own profile" on profiles for select using (auth.uid() = id);
create policy "Public catalog read tests" on lab_tests for select using (true);
create policy "Public catalog read panels" on panels for select using (true);
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
