do $$
begin
  create type lab_outreach_category as enum (
    'api_network',
    'national_lab',
    'regional_lab',
    'mobile_phlebotomy',
    'specialty_lab',
    'retail_collection',
    'data_connectivity'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type lab_outreach_stage as enum (
    'research',
    'queued',
    'contacted',
    'meeting_booked',
    'packet_sent',
    'pricing_received',
    'contracting',
    'integrating',
    'active',
    'not_fit'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type lab_outreach_activity_type as enum (
    'email',
    'call',
    'form',
    'meeting',
    'note',
    'pricing',
    'contract',
    'integration'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists lab_outreach_targets (
  id text primary key,
  name text not null,
  category lab_outreach_category not null,
  priority smallint not null check (priority between 1 and 5),
  stage lab_outreach_stage not null default 'research',
  website text not null,
  states_focus text[] not null default '{}',
  relationship_type text not null,
  why_target text not null,
  ask text not null,
  next_step text not null,
  evidence_needed text[] not null default '{}',
  source_note text not null default '',
  owner text,
  last_contacted_at timestamptz,
  next_follow_up_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists lab_outreach_activities (
  id uuid primary key default gen_random_uuid(),
  target_id text not null references lab_outreach_targets(id) on delete cascade,
  activity_type lab_outreach_activity_type not null,
  outcome text not null,
  notes text,
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function set_lab_outreach_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists lab_outreach_targets_updated_at on lab_outreach_targets;

create trigger lab_outreach_targets_updated_at
before update on lab_outreach_targets
for each row
execute function set_lab_outreach_updated_at();

alter table lab_outreach_targets enable row level security;
alter table lab_outreach_activities enable row level security;

comment on table lab_outreach_targets is 'Internal partner-development pipeline for lab network expansion. Keep private until admin authorization is implemented.';
comment on table lab_outreach_activities is 'Internal outreach activity log for lab partner conversations and follow-ups.';

create index if not exists lab_outreach_targets_category_idx on lab_outreach_targets(category);
create index if not exists lab_outreach_targets_stage_idx on lab_outreach_targets(stage);
create index if not exists lab_outreach_targets_next_follow_up_idx on lab_outreach_targets(next_follow_up_at);
create index if not exists lab_outreach_activities_target_id_idx on lab_outreach_activities(target_id);
create index if not exists lab_outreach_activities_due_at_idx on lab_outreach_activities(due_at);

insert into lab_outreach_targets (
  id,
  name,
  category,
  priority,
  stage,
  website,
  states_focus,
  relationship_type,
  why_target,
  ask,
  next_step,
  evidence_needed,
  source_note
) values
  (
    'junction',
    'Junction',
    'api_network',
    1,
    'queued',
    'https://www.junction.com/',
    array['National', 'NY', 'NJ', 'RI'],
    'White-label lab ordering API with collection and results workflows',
    'Best first call for instant breadth because the platform is built for digital health companies that need lab ordering infrastructure.',
    'Request sandbox access, launch-state coverage, test menu, cash-pay pricing, physician network terms, requisition flow, and result payload examples.',
    'Submit partner inquiry and book a technical discovery call.',
    array['State coverage matrix', 'Cash-pay test menu', 'Physician authorization terms', 'Sample requisition and result payload'],
    'Official Junction materials position it as nationwide lab testing infrastructure for walk-in, kit, and mobile collection.'
  ),
  (
    'labtestingapi',
    'LabTestingAPI',
    'api_network',
    1,
    'queued',
    'https://www.labtestingapi.com/',
    array['National'],
    'Direct lab purchasing and ordering API candidate',
    'The model matches Private Lab Test closely: online ordering, prepaid wellness tests, and a replacement candidate for the mock provider adapter.',
    'Request API docs, partner pricing, state exclusions, supported draw networks, and webhook or result delivery options.',
    'Use the business contact path to ask for API partnership access.',
    array['API access terms', 'Restricted-state list', 'Panel pricing', 'Result delivery method'],
    'Official LabTestingAPI pages describe a direct lab testing service and API-oriented ordering model.'
  ),
  (
    'ordrs',
    'ORDRS',
    'api_network',
    1,
    'queued',
    'https://www.ordrs.io/',
    array['National'],
    'API-driven ordering, specimen collection, and results delivery',
    'Strong fit for an MVP that needs to support many collection modes without separate lab-by-lab integration work.',
    'Request marketplace pricing, supported labs, collection methods, critical-result process, and API onboarding requirements.',
    'Send founder note and request a demo for care-driven organizations.',
    array['Supported lab list', 'Specimen collection options', 'Critical result escalation', 'API authentication model'],
    'ORDRS presents itself as software and API for lab ordering, specimen collection, and result delivery.'
  ),
  (
    'health-gorilla',
    'Health Gorilla Lab Network',
    'data_connectivity',
    2,
    'research',
    'https://www.healthgorilla.com/home/markets/labs',
    array['National'],
    'FHIR-based lab ordering and result retrieval network',
    'Useful if Private Lab Test needs enterprise-grade ordering connectivity, structured results, or downstream diagnostic vendor access.',
    'Confirm whether consumer cash-pay lab ordering is a fit, then request FHIR workflow, vendor coverage, and pricing model.',
    'Qualify fit before spending integration time.',
    array['Qualified provider requirements', 'Connected lab list', 'FHIR requisition flow', 'Commercial terms'],
    'Official Health Gorilla materials describe APIs for centralized lab ordering and results retrieval.'
  ),
  (
    'getlabs',
    'Getlabs',
    'mobile_phlebotomy',
    1,
    'queued',
    'https://www.getlabs.com/partners',
    array['National', 'CO', 'TX', 'FL', 'CA'],
    'At-home and office phlebotomy collection partner',
    'Critical for older adults, people without easy transportation, and assisted-living use cases where draw completion matters more than storefront density.',
    'Request partner coverage, scheduling API or referral workflow, fees, specimen handling rules, and lab drop-off options.',
    'Submit partner inquiry and ask for launch-market coverage.',
    array['Coverage by ZIP', 'Collection fee schedule', 'Preferred lab drop-off rules', 'Cancellation and recollection policy'],
    'Official Getlabs partner materials describe mobile phlebotomy collection for healthcare organizations and lab partners.'
  ),
  (
    'quest-health',
    'Quest Health / Quest Diagnostics',
    'national_lab',
    2,
    'research',
    'https://www.questhealth.com/affiliate-program.html',
    array['National'],
    'National draw network, affiliate, and scaled partnership track',
    'Quest brand trust and draw-site density can unlock a better consumer experience once Private Lab Test has volume proof.',
    'Start with affiliate or partnership team, then qualify API, patient service center rules, and cash-pay collaboration options.',
    'Collect volume proof metrics, then contact Quest Health partnership channel.',
    array['Partnership eligibility', 'Supported sales channels', 'Ordering workflow', 'Result routing constraints'],
    'Quest Health describes direct-to-consumer lab tests and partnership channels for sales and API-supported scale.'
  ),
  (
    'labcorp-ondemand',
    'Labcorp OnDemand / Labcorp',
    'national_lab',
    2,
    'research',
    'https://www.ondemand.labcorp.com/',
    array['National'],
    'National reference lab and consumer testing benchmark',
    'Labcorp is a known draw network and direct-to-consumer benchmark; a direct relationship may become easier after order volume exists.',
    'Map affiliate, enterprise, or provider ordering options and confirm whether third-party marketplace orders are allowed.',
    'Document requirements and approach after API-network pilot proves demand.',
    array['Business development contact', 'Consumer order limitations', 'Cash-pay menu', 'Result-routing options'],
    'Labcorp OnDemand lets consumers purchase tests online with authorized healthcare professional ordering built into the workflow.'
  ),
  (
    'sonic-healthcare-usa',
    'Sonic Healthcare USA divisions',
    'regional_lab',
    2,
    'research',
    'https://pgms.sonichealthcareusa.com/common/divmap/default.aspx',
    array['TX', 'FL', 'NY', 'RI', 'CA'],
    'Regional division relationships with local patient service centers',
    'Regional divisions can sometimes move faster than a single national enterprise channel and may offer better local cash pricing.',
    'Identify division contacts by launch state and request cash-pay menu, PSC list, and electronic result options.',
    'Build a division-by-division contact sheet for CO, TX, FL, and CA first.',
    array['Division coverage map', 'Local PSC list', 'Cash-pay pricing', 'Portal or SFTP result process'],
    'Sonic Healthcare USA publishes a division map that can guide regional outreach by geography.'
  ),
  (
    'any-lab-test-now',
    'Any Lab Test Now',
    'retail_collection',
    3,
    'research',
    'https://www.anylabtestnow.com/franchise/about-us/',
    array['National', 'GA', 'TX', 'FL', 'AZ'],
    'Retail storefront and local franchise relationship candidate',
    'Useful for cash-pay demand validation and local collection partnerships in markets where storefront access matters.',
    'Qualify whether corporate or franchise locations can accept Private Lab Test requisitions and negotiated pricing.',
    'Contact corporate first, then test one launch-market franchise conversation.',
    array['Corporate partnership path', 'Franchise participation rules', 'Draw fee', 'Result-routing workflow'],
    'Official franchise materials describe a large U.S. retail lab testing location footprint.'
  ),
  (
    'bioreference',
    'BioReference Health / BioReference Direct',
    'regional_lab',
    3,
    'research',
    'https://www.bioreference.com/',
    array['NY', 'NJ', 'FL'],
    'Regional reference lab and state-specific direct testing signal',
    'Worth mapping for New York and New Jersey because those states often require extra diligence and BioReference has state-specific consumer testing activity.',
    'Confirm provider requisition requirements, Direct availability, PSC rules, and whether marketplace ordering is possible.',
    'Research state-specific ordering path before outreach.',
    array['Provider requisition requirement', 'Direct testing state limits', 'PSC coverage', 'Result portal options'],
    'BioReference public materials describe patient service centers and BioReference Direct availability in NY and NJ.'
  ),
  (
    'rupa-health',
    'Rupa Health / Fullscript',
    'specialty_lab',
    3,
    'research',
    'https://www.rupahealth.com/',
    array['National'],
    'Specialty lab marketplace and practitioner ordering benchmark',
    'Not a pure consumer lab API fit, but useful for specialty panels, physician-services benchmarking, and partner packaging ideas.',
    'Qualify whether Private Lab Test can participate through a practitioner or physician-services model.',
    'Map specialty panel options and compare against API-network capabilities.',
    array['Practitioner requirements', 'Physician services rules', 'Lab company list', 'Cash-pay patient flow'],
    'Rupa positions itself as a centralized ordering platform for practitioners and specialty lab companies.'
  ),
  (
    'vibrant-america',
    'Vibrant America',
    'specialty_lab',
    3,
    'research',
    'https://www.vibrant-america.com/',
    array['CA', 'National'],
    'Specialty wellness and advanced diagnostic lab candidate',
    'Potential future partner for differentiated panels after the core low-cost wellness catalog is working.',
    'Request provider account requirements, cash pricing, specimen logistics, and whether consumer-facing ordering is permitted.',
    'Save for specialty-panel phase after core coverage is live.',
    array['Provider account terms', 'Specimen kit logistics', 'State restrictions', 'Result format'],
    'Vibrant America describes a CLIA and CAP-certified California laboratory with clinically relevant testing options.'
  ),
  (
    'access-medical-labs',
    'Access Medical Labs via Evexia Diagnostics',
    'specialty_lab',
    4,
    'research',
    'https://www.evexiadiagnostics.com/diagnostic-testing/laboratory-partners/access-medical-labs/',
    array['National'],
    'Specialty lab partner through practitioner distribution',
    'A useful lead for specialty expansion, but likely requires practitioner-facing workflows and careful compliance review.',
    'Confirm whether Private Lab Test can use a partner clinician workflow and what panels fit general wellness positioning.',
    'Revisit after clinician review and specialty panel policy are documented.',
    array['Ordering eligibility', 'Cash price schedule', 'Specimen collection workflow', 'Panel restrictions'],
    'Evexia lists Access Medical Labs as a laboratory partner with full-spectrum testing for providers.'
  ),
  (
    'regional-clia-sweep',
    'Regional CLIA lab sweep',
    'regional_lab',
    1,
    'queued',
    'https://www.cms.gov/medicare/quality/clinical-laboratory-improvement-amendments',
    array['CO', 'TX', 'FL', 'CA', 'GA', 'NC'],
    'State-by-state independent laboratory pipeline',
    'This is the volume play: build a spreadsheet from state CLIA directories, hospital outreach pages, and local lab managers to find cheaper cash menus.',
    'Ask each lab for cash-pay menu, draw-site options, provider requisition process, result delivery, and critical-value policy.',
    'Create 25 lab leads per launch state and work them in two-call sequences.',
    array['CLIA certificate', 'Cash-pay menu', 'Accepted requisitions', 'Result delivery process'],
    'CMS CLIA resources provide the compliance starting point for verifying lab certification before any relationship goes live.'
  )
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  priority = excluded.priority,
  stage = excluded.stage,
  website = excluded.website,
  states_focus = excluded.states_focus,
  relationship_type = excluded.relationship_type,
  why_target = excluded.why_target,
  ask = excluded.ask,
  next_step = excluded.next_step,
  evidence_needed = excluded.evidence_needed,
  source_note = excluded.source_note;
