-- =========================================================================
-- JM Barone Enterprises — Supabase schema
-- Run this entire file in the Supabase SQL editor for a fresh project.
-- =========================================================================

create extension if not exists "pgcrypto";

-- ---------- site_settings ------------------------------------------------
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  phone text not null default '682-582-6734',
  email text not null default 'sales@jmbaroneinc.com',
  address text,
  emergency_phone text not null default '682-582-6734',
  hero_eyebrow text not null default 'Serving DFW since 2003',
  hero_title text not null default 'Professional, full turn-key cleaning & restoration for DFW properties.',
  hero_subtitle text not null default 'Carpet care, tile, resurfacing, painting, make-ready, housekeeping and 24-hour water extraction — backed by a 100% satisfaction guarantee.',
  hero_image_url text,
  about_heading text not null default 'Trusted commercial & multifamily service partner',
  about_body text not null default 'JM Barone Enterprises, Inc. has served Dallas/Fort Worth since 2003 with full turn-key cleaning, restoration, and maintenance services.',
  founded_year int not null default 2003,
  service_area text not null default 'Dallas / Fort Worth Metroplex',
  business_hours text not null default 'Mon–Fri 8a–6p · 24/7 Emergency',
  facebook_url text,
  instagram_url text,
  updated_at timestamptz not null default now()
);

-- Idempotent migration for existing deployments
alter table public.site_settings
  add column if not exists business_hours text not null default 'Mon–Fri 8a–6p · 24/7 Emergency';

-- ---------- services -----------------------------------------------------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null default '',
  long_description text not null default '',
  icon text not null default 'Sparkles',
  hero_image_url text,
  features text[] not null default '{}',
  display_order int not null default 100,
  is_active boolean not null default true,
  meta_title text,
  meta_description text,
  before_image_url text,
  after_image_url text,
  before_after_caption text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Idempotent migration for existing deployments
alter table public.services
  add column if not exists before_image_url text,
  add column if not exists after_image_url text,
  add column if not exists before_after_caption text;

-- ---------- testimonials -------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author_name text not null,
  author_title text,
  author_company text,
  rating int not null default 5 check (rating between 1 and 5),
  is_active boolean not null default true,
  display_order int not null default 100,
  created_at timestamptz not null default now()
);

-- ---------- documents ----------------------------------------------------
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_url text not null,
  file_path text,
  file_type text,
  display_order int not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- media --------------------------------------------------------
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  storage_path text not null,
  public_url text not null,
  mime_type text not null default 'application/octet-stream',
  size_bytes bigint not null default 0,
  alt_text text,
  created_at timestamptz not null default now()
);

-- ---------- contact_submissions -----------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  community_name text,
  service text,
  message text not null,
  is_read boolean not null default false,
  is_archived boolean not null default false,
  created_at timestamptz not null default now()
);

-- Idempotent migration for existing deployments
alter table public.contact_submissions
  add column if not exists community_name text;

-- =========================================================================
-- Role grants (RLS sits on top of these — both layers must allow access)
-- =========================================================================

grant usage on schema public to anon, authenticated, service_role;

grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;

grant select on public.site_settings, public.services, public.testimonials, public.documents, public.media to anon;
grant insert on public.contact_submissions to anon;

grant select, insert, update, delete on public.site_settings, public.services, public.testimonials, public.documents, public.media, public.contact_submissions to authenticated;
grant usage, select on all sequences in schema public to authenticated;

alter default privileges in schema public grant select on tables to anon;
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated;
alter default privileges in schema public grant all on tables to service_role;
alter default privileges in schema public grant usage, select on sequences to anon, authenticated;
alter default privileges in schema public grant all on sequences to service_role;

-- =========================================================================
-- Row Level Security
-- Public read for "site content" tables; only authenticated users can write.
-- contact_submissions accepts anonymous INSERTs but only auth'd users can read.
-- =========================================================================

alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.documents enable row level security;
alter table public.media enable row level security;
alter table public.contact_submissions enable row level security;

-- site_settings: public read; auth write
drop policy if exists "site_settings_read_all" on public.site_settings;
create policy "site_settings_read_all" on public.site_settings
  for select using (true);
drop policy if exists "site_settings_write_auth" on public.site_settings;
create policy "site_settings_write_auth" on public.site_settings
  for all to authenticated using (true) with check (true);

-- services: public read; auth write
drop policy if exists "services_read_all" on public.services;
create policy "services_read_all" on public.services
  for select using (true);
drop policy if exists "services_write_auth" on public.services;
create policy "services_write_auth" on public.services
  for all to authenticated using (true) with check (true);

-- testimonials: public read; auth write
drop policy if exists "testimonials_read_all" on public.testimonials;
create policy "testimonials_read_all" on public.testimonials
  for select using (true);
drop policy if exists "testimonials_write_auth" on public.testimonials;
create policy "testimonials_write_auth" on public.testimonials
  for all to authenticated using (true) with check (true);

-- documents: public read; auth write
drop policy if exists "documents_read_all" on public.documents;
create policy "documents_read_all" on public.documents
  for select using (true);
drop policy if exists "documents_write_auth" on public.documents;
create policy "documents_write_auth" on public.documents
  for all to authenticated using (true) with check (true);

-- media: public read; auth write
drop policy if exists "media_read_all" on public.media;
create policy "media_read_all" on public.media
  for select using (true);
drop policy if exists "media_write_auth" on public.media;
create policy "media_write_auth" on public.media
  for all to authenticated using (true) with check (true);

-- contact_submissions: anon may INSERT; only auth may SELECT/UPDATE/DELETE
drop policy if exists "contact_submissions_insert_anon" on public.contact_submissions;
create policy "contact_submissions_insert_anon" on public.contact_submissions
  for insert to anon, authenticated with check (true);
drop policy if exists "contact_submissions_read_auth" on public.contact_submissions;
create policy "contact_submissions_read_auth" on public.contact_submissions
  for select to authenticated using (true);
drop policy if exists "contact_submissions_update_auth" on public.contact_submissions;
create policy "contact_submissions_update_auth" on public.contact_submissions
  for update to authenticated using (true) with check (true);
drop policy if exists "contact_submissions_delete_auth" on public.contact_submissions;
create policy "contact_submissions_delete_auth" on public.contact_submissions
  for delete to authenticated using (true);

-- =========================================================================
-- Seed data — preserves the current site's content as a starter.
-- =========================================================================

insert into public.site_settings (
  phone, email, address, emergency_phone,
  hero_eyebrow, hero_title, hero_subtitle,
  about_heading, about_body, founded_year, service_area
)
select
  '682-582-6734', 'sales@jmbaroneinc.com', 'Dallas / Fort Worth, Texas',
  '682-582-6734',
  'Serving DFW since 2003',
  'Professional, full turn-key cleaning & restoration for DFW properties.',
  'Carpet care, tile, resurfacing, painting, make-ready, housekeeping and 24-hour water extraction — backed by a 100% satisfaction guarantee.',
  'Trusted commercial & multifamily service partner',
  'JM Barone Enterprises, Inc. has served Dallas/Fort Worth since 2003 with full turn-key cleaning, restoration, and maintenance services. We work with multifamily communities, property managers, and commercial clients who need reliable, on-time, quality work — every job, every time. Fully insured. Estimates available. 24-hour emergency response.',
  2003,
  'Dallas / Fort Worth Metroplex'
where not exists (select 1 from public.site_settings);

insert into public.services (slug, title, short_description, long_description, icon, hero_image_url, features, display_order, meta_title, meta_description)
values
  ('carpet-services', 'Carpet Services',
   'Truck-mounted hot-water extraction and 24-hour water extraction for deep, healthy, like-new carpet.',
   'Our carpet services use truck-mounted hot-water extraction equipment to lift soil, allergens, and stains that surface cleaning leaves behind. We treat high-traffic lanes, pet odors, and stubborn spots. Our 24-hour water extraction crew also responds to floods, burst pipes, and storm damage. Ideal for multifamily turns, offices, and post-construction cleanup.',
   'Sparkles',
   'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1600',
   array['Truck-mounted hot-water extraction','24-hour water extraction (floods, burst pipes, storm damage)','Spot & stain treatment','Pet odor neutralization','Multifamily turns / make-ready','Commercial maintenance programs'],
   10,
   'Carpet Cleaning & Water Extraction in DFW | JM Barone',
   'Truck-mounted carpet cleaning and 24-hour water extraction for multifamily, commercial, and residential properties in Dallas / Fort Worth.'),
  ('cleaning-services', 'Cleaning Services',
   'Deep cleans, common area maintenance, and post-construction cleanup.',
   'From routine cleaning programs to deep one-time cleans, we handle it all. Our technicians are trained and equipped for the speed and consistency multifamily and commercial properties demand.',
   'SprayCan',
   'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
   array['Multifamily common areas','Office & retail cleaning','Post-construction cleanup','Move-in / move-out cleans','Recurring maintenance plans'],
   20,
   'Commercial & Multifamily Cleaning in DFW | JM Barone',
   'Professional cleaning technicians for multifamily, commercial, and post-construction projects across DFW.'),
  ('resurfacing', 'Resurfacing',
   'Bathtubs, countertops, and tile resurfaced to look brand new.',
   'Replacing tubs and counters is expensive and disruptive. Our resurfacing brings worn, chipped, or stained surfaces back to a clean, glossy finish at a fraction of the cost.',
   'Paintbrush',
   'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=80',
   array['Bathtub & shower resurfacing','Countertop refinishing','Tile surround restoration','Chip & stain repair','Fast turnaround for unit turns'],
   30,
   'Bathtub & Countertop Resurfacing in DFW | JM Barone',
   'Affordable resurfacing for bathtubs, countertops, and tile in DFW — fast turnaround for multifamily turns.'),
  ('tile-cleaning', 'Tile Cleaning',
   'Restore tile and grout with deep extraction and color restoration.',
   'Years of mopping push soil into grout lines and dull tile surfaces. We use high-pressure extraction tools and tile-safe solutions to lift embedded grime, brighten grout, and restore original color.',
   'LayoutGrid',
   'https://images.pexels.com/photos/3935352/pexels-photo-3935352.jpeg?auto=compress&cs=tinysrgb&w=1600',
   array['Deep tile & grout extraction','Color restoration','Bathrooms, kitchens, common areas','Make-ready & unit turn support'],
   40,
   'Tile & Grout Cleaning in DFW | JM Barone',
   'Professional tile and grout cleaning for DFW properties — deep extraction and color restoration.'),
  ('additional-services', 'Additional Services',
   'Painting, window cleaning, make ready and trash outs, welding, pressure washing, tub replacements, machine rentals, and vinyl pet treatment.',
   'We are a true turn-key partner. Beyond cleaning and restoration, we offer painting, window cleaning, make ready and trash outs, welding, pressure washing, tub replacements, machine rentals, and vinyl pet treatment.',
   'Wrench',
   'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1600&q=80',
   array['Painting','Window cleaning','Make ready and trash outs','Welding','Pressure washing','Tub replacements','Machine rentals','Vinyl pet treatment'],
   50,
   'Painting, Make-Ready, Welding & More in DFW | JM Barone',
   'Painting, window cleaning, make-ready, trash outs, welding, pressure washing, tub replacements, machine rentals, and vinyl pet treatment for DFW multifamily and commercial properties.')
on conflict (slug) do nothing;

insert into public.testimonials (quote, author_name, author_title, author_company, rating, display_order)
values
  ($$I've been using JM Barone since late 2019 & have not been let down once! Karina, their office manager, is remarkable with scheduling & phenomenal customer service! Their employees from resurface, carpet cleaning & housekeeping have been professional, on-time, & quality work! Their work has over-achieved 5 stars, as now my sister properties are using their services as well. Keep up the great work & penmanship!$$,
   'Renee Brown', 'Community Manager', 'Dominium Management', 5, 10),
  ($$They are the housekeepers I use on my property — they're the best I have found.$$,
   'Ray Young', 'Lead Maintenance Supervisor', 'Cortland Management', 5, 20),
  ($$We use J.M. Barone for our housekeeping services in the multi-family residential business. J.M. Barone is always on time, sometimes same-day service, apartments are always cleaned to a higher standard. Their staff always comes in smiling and apartments are always clean and ready for move-in!$$,
   'Erin Pennington', 'Community Manager', 'Devonshire Real Estate & Asset Management', 5, 30)
on conflict do nothing;

-- Certificate of Insurance (COI) intentionally omitted at the owner's request.
insert into public.documents (title, description, file_url, file_type, display_order)
values
  ('Occupied Disclaimer Forms', 'Required disclaimer for occupied-unit service.',
   'https://drive.google.com/file/d/1dVkHS4Ute016LldiL4fpRqhdtE-JnlnP/view?usp=sharing',
   'external', 10),
  ('Cancellation Policy & Fees', 'Our cancellation policy and applicable fees.',
   'https://www.canva.com/design/DAF3womtwQI/qCOUHXmsuQBDciZw3DGNhg/view?utm_content=DAF3womtwQI&utm_campaign=designshare&utm_medium=link&utm_source=editor',
   'external', 20)
on conflict do nothing;

-- =========================================================================
-- Storage buckets (run after enabling Storage in the Supabase dashboard)
-- The 'documents' and 'media' buckets are public-read, auth-write.
-- =========================================================================

insert into storage.buckets (id, name, public)
values ('documents', 'documents', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Storage policies
drop policy if exists "documents_public_read" on storage.objects;
create policy "documents_public_read" on storage.objects
  for select using (bucket_id in ('documents','media'));

drop policy if exists "documents_auth_write" on storage.objects;
create policy "documents_auth_write" on storage.objects
  for insert to authenticated with check (bucket_id in ('documents','media'));

drop policy if exists "documents_auth_update" on storage.objects;
create policy "documents_auth_update" on storage.objects
  for update to authenticated using (bucket_id in ('documents','media'));

drop policy if exists "documents_auth_delete" on storage.objects;
create policy "documents_auth_delete" on storage.objects
  for delete to authenticated using (bucket_id in ('documents','media'));
