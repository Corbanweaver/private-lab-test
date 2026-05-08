do $$
begin
  create type lab_order_mode as enum ('direct_access', 'provider_authorization_included');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type lab_collection_type as enum ('walk_in', 'mobile', 'kit');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type lab_network_status as enum ('active_mock', 'contracting', 'candidate');
exception
  when duplicate_object then null;
end $$;

create table if not exists lab_network_routes (
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

create table if not exists lab_network_locations (
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

create table if not exists lab_provider_test_mappings (
  id uuid primary key default gen_random_uuid(),
  partner_id text not null references lab_partners(id) on delete cascade,
  internal_test_id text not null references lab_tests(id) on delete cascade,
  provider_test_code text not null,
  cash_price_cents integer not null check (cash_price_cents >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (partner_id, internal_test_id, provider_test_code)
);

alter table lab_orders add column if not exists quote_id text;
alter table lab_orders add column if not exists route_id text references lab_network_routes(id);
alter table lab_orders add column if not exists location_id text references lab_network_locations(id);
alter table lab_orders add column if not exists order_mode_v2 lab_order_mode;
alter table lab_orders add column if not exists collection_type lab_collection_type;

alter table lab_network_routes enable row level security;
alter table lab_network_locations enable row level security;
alter table lab_provider_test_mappings enable row level security;

create policy "Public read lab network routes" on lab_network_routes for select using (true);
create policy "Public read lab network locations" on lab_network_locations for select using (active = true);
create policy "Public read lab provider test mappings" on lab_provider_test_mappings for select using (active = true);

grant select on lab_network_routes to anon, authenticated;
grant select on lab_network_locations to anon, authenticated;
grant select on lab_provider_test_mappings to anon, authenticated;

create index if not exists lab_network_routes_partner_id_idx on lab_network_routes(partner_id);
create index if not exists lab_network_routes_status_idx on lab_network_routes(status);
create index if not exists lab_network_locations_route_id_idx on lab_network_locations(route_id);
create index if not exists lab_network_locations_state_zip_idx on lab_network_locations(state, zip);
create index if not exists lab_provider_test_mappings_partner_test_idx on lab_provider_test_mappings(partner_id, internal_test_id);

insert into lab_network_routes (
  id,
  name,
  partner_id,
  tier,
  status,
  order_mode,
  collection_types,
  states_served,
  restricted_states,
  route_priority,
  price_multiplier,
  platform_fee_cents,
  draw_fee_cents,
  turnaround,
  support_note
) values
  (
    'junction-walk-in',
    'Junction-style nationwide walk-in API',
    'aggregator-api',
    'aggregator',
    'active_mock',
    'provider_authorization_included',
    array['walk_in']::lab_collection_type[],
    array['AL','AK','AR','CA','CO','CT','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY'],
    array['AZ'],
    1,
    0.82,
    1400,
    0,
    '1-3 days',
    'Best default path for broad cash-pay lab access and fast requisitions.'
  ),
  (
    'ordrs-backup',
    'ORDRS-style backup API network',
    'aggregator-api',
    'aggregator',
    'active_mock',
    'provider_authorization_included',
    array['walk_in','kit']::lab_collection_type[],
    array['AL','AK','AR','CA','CO','CT','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NM','NV','OH','OK','OR','PA','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY'],
    array['AZ','NY','NJ','RI'],
    2,
    0.88,
    1200,
    0,
    '1-4 days',
    'Backup route for common wellness tests when the primary network is unavailable.'
  ),
  (
    'getlabs-mobile',
    'Getlabs-style mobile draw',
    'home-draw-concierge',
    'mobile',
    'active_mock',
    'provider_authorization_included',
    array['mobile']::lab_collection_type[],
    array['CA','CO','FL','GA','NC','NY','NJ','TX'],
    array['AZ','RI'],
    3,
    0.92,
    1200,
    7900,
    '2-5 days',
    'Best for customers who want blood drawn at home or work.'
  ),
  (
    'regional-cash-menu',
    'Regional independent cash menu',
    'rocky-mountain-labs',
    'regional',
    'active_mock',
    'provider_authorization_included',
    array['walk_in']::lab_collection_type[],
    array['CO','NM','UT','WY'],
    array[]::text[],
    1,
    0.72,
    1000,
    0,
    '1-4 days',
    'Lowest-cost route where direct regional pricing is available.'
  ),
  (
    'national-consumer-lab',
    'National consumer lab path',
    'national-reference',
    'national',
    'contracting',
    'provider_authorization_included',
    array['walk_in','mobile','kit']::lab_collection_type[],
    array['AL','AK','AR','CA','CO','CT','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY'],
    array['AZ'],
    4,
    0.95,
    1800,
    0,
    '1-5 days',
    'Enterprise path modeled after consumer lab programs such as Quest Health and Labcorp OnDemand.'
  )
on conflict (id) do update set
  name = excluded.name,
  partner_id = excluded.partner_id,
  tier = excluded.tier,
  status = excluded.status,
  order_mode = excluded.order_mode,
  collection_types = excluded.collection_types,
  states_served = excluded.states_served,
  restricted_states = excluded.restricted_states,
  route_priority = excluded.route_priority,
  price_multiplier = excluded.price_multiplier,
  platform_fee_cents = excluded.platform_fee_cents,
  draw_fee_cents = excluded.draw_fee_cents,
  turnaround = excluded.turnaround,
  support_note = excluded.support_note,
  updated_at = now();

insert into lab_network_locations (
  id,
  route_id,
  partner_id,
  name,
  address,
  state,
  zip,
  collection_type,
  draw_fee_cents,
  appointment_required
) values
  ('denver-central-walkin','junction-walk-in','aggregator-api','Denver Central Patient Service Center','1420 Market Street, Denver, CO','CO','80202','walk_in',0,true),
  ('lakewood-regional-walkin','regional-cash-menu','rocky-mountain-labs','Lakewood Regional Patient Center','88 Union Boulevard, Lakewood, CO','CO','80226','walk_in',0,true),
  ('dallas-commerce-walkin','junction-walk-in','aggregator-api','Dallas Commerce Draw Center','1910 Commerce Street, Dallas, TX','TX','75201','walk_in',0,true),
  ('austin-north-walkin','ordrs-backup','aggregator-api','Austin North Lab Center','3300 North Lamar Boulevard, Austin, TX','TX','78705','walk_in',0,true),
  ('miami-brickell-walkin','junction-walk-in','aggregator-api','Miami Brickell Lab Center','1200 Brickell Avenue, Miami, FL','FL','33131','walk_in',0,true),
  ('orlando-downtown-walkin','ordrs-backup','aggregator-api','Orlando Downtown Patient Center','255 South Orange Avenue, Orlando, FL','FL','32801','walk_in',0,true),
  ('los-angeles-walkin','junction-walk-in','aggregator-api','Los Angeles Wilshire Lab Center','3550 Wilshire Boulevard, Los Angeles, CA','CA','90010','walk_in',0,true),
  ('san-diego-walkin','junction-walk-in','aggregator-api','San Diego Mission Valley Lab Center','1450 Frazee Road, San Diego, CA','CA','92108','walk_in',0,true),
  ('atlanta-midtown-walkin','junction-walk-in','aggregator-api','Atlanta Midtown Patient Center','730 Peachtree Street NE, Atlanta, GA','GA','30308','walk_in',0,true),
  ('charlotte-uptown-walkin','junction-walk-in','aggregator-api','Charlotte Uptown Lab Center','201 South College Street, Charlotte, NC','NC','28202','walk_in',0,true),
  ('new-york-midtown-walkin','junction-walk-in','aggregator-api','New York Midtown Patient Center','1350 Broadway, New York, NY','NY','10018','walk_in',0,true),
  ('newark-downtown-walkin','junction-walk-in','aggregator-api','Newark Downtown Lab Center','744 Broad Street, Newark, NJ','NJ','07102','walk_in',0,true),
  ('providence-walkin','junction-walk-in','aggregator-api','Providence Patient Service Center','1 Financial Plaza, Providence, RI','RI','02903','walk_in',0,true),
  ('denver-mobile-draw','getlabs-mobile','home-draw-concierge','Denver Mobile Blood Draw','Mobile service within 25 miles of Denver, CO','CO','80202','mobile',7900,true),
  ('dallas-mobile-draw','getlabs-mobile','home-draw-concierge','Dallas Mobile Blood Draw','Mobile service within 25 miles of Dallas, TX','TX','75201','mobile',7900,true),
  ('miami-mobile-draw','getlabs-mobile','home-draw-concierge','Miami Mobile Blood Draw','Mobile service within 25 miles of Miami, FL','FL','33131','mobile',7900,true),
  ('la-mobile-draw','getlabs-mobile','home-draw-concierge','Los Angeles Mobile Blood Draw','Mobile service within 25 miles of Los Angeles, CA','CA','90010','mobile',7900,true)
on conflict (id) do update set
  route_id = excluded.route_id,
  partner_id = excluded.partner_id,
  name = excluded.name,
  address = excluded.address,
  state = excluded.state,
  zip = excluded.zip,
  collection_type = excluded.collection_type,
  draw_fee_cents = excluded.draw_fee_cents,
  appointment_required = excluded.appointment_required,
  active = true;

insert into lab_provider_test_mappings (partner_id, internal_test_id, provider_test_code, cash_price_cents)
select
  'aggregator-api',
  id,
  'JUNC-' || upper(replace(provider_code, 'MOCK-', '')),
  greatest(100, round(price_cents * 0.82))::integer
from lab_tests
on conflict (partner_id, internal_test_id, provider_test_code) do update set
  cash_price_cents = excluded.cash_price_cents,
  active = true;

insert into lab_provider_test_mappings (partner_id, internal_test_id, provider_test_code, cash_price_cents)
select
  'rocky-mountain-labs',
  id,
  'RML-' || upper(replace(provider_code, 'MOCK-', '')),
  greatest(100, round(price_cents * 0.72))::integer
from lab_tests
where id in ('cmp','cbc','lipids','a1c','tsh','vit-d','ferritin')
on conflict (partner_id, internal_test_id, provider_test_code) do update set
  cash_price_cents = excluded.cash_price_cents,
  active = true;
