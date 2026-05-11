create table if not exists waitlist_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  zip text,
  state text,
  panel_id text,
  interest text,
  source text not null default 'site',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table waitlist_leads is 'Pre-launch demand capture for Private Lab Test. Does not store DOB, full address, lab results, symptoms, or medical notes.';

alter table waitlist_leads enable row level security;

revoke all on waitlist_leads from anon, authenticated;

create index if not exists waitlist_leads_state_idx on waitlist_leads(state);
create index if not exists waitlist_leads_panel_idx on waitlist_leads(panel_id);
create index if not exists waitlist_leads_created_idx on waitlist_leads(created_at desc);
