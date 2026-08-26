-- Admin Portal — Real-Time Notifications & Web Push
-- Run this once in the Supabase Dashboard → SQL Editor (Project → SQL Editor
-- → New query → paste → Run). There is no migration tooling in this repo
-- (no supabase/ CLI project, no tracked migrations) — this file is the
-- source of truth for this schema change until one exists.
--
-- This is purely ADDITIVE: two new tables, no changes to any existing
-- table, no data touched. Safe to run against production.

-- ─────────────────────────────────────────────────────────────────────────
-- notifications — one row per customer-triggered event the Admin Portal
-- should surface (new booking, new destination enquiry). Populated by the
-- server-side /api/emails/send route at the same moment it emails the
-- admin, so it only ever reflects events that already happened via the
-- existing, unmodified booking/enquiry flows.
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists notifications (
    id uuid primary key default gen_random_uuid(),
    type text not null check (type in ('new_booking', 'new_enquiry')),
    booking_id uuid references bookings(id) on delete set null,
    title text not null,
    summary text,
    customer_name text,
    pickup_location text,
    dropoff_location text,
    travel_date text,
    travel_time text,
    passengers_count int,
    service_type text,
    is_read boolean not null default false,
    created_at timestamptz not null default now()
);

create index if not exists notifications_created_at_idx on notifications (created_at desc);
create index if not exists notifications_is_read_idx on notifications (is_read) where is_read = false;

alter table notifications enable row level security;

-- Single-admin model (see src/proxy.ts): any authenticated session in this
-- project IS the admin — there is no separate roles table. Consistent with
-- that existing model rather than introducing a new one for just this
-- table. If a second admin account is ever added, this table's access
-- follows automatically.
drop policy if exists "notifications_select_authenticated" on notifications;
create policy "notifications_select_authenticated" on notifications
    for select using (auth.role() = 'authenticated');

drop policy if exists "notifications_update_authenticated" on notifications;
create policy "notifications_update_authenticated" on notifications
    for update using (auth.role() = 'authenticated');

-- Inserts happen only via the server's service-role client
-- (createAdminClient() in /api/emails/send), which bypasses RLS entirely —
-- no insert/delete policy is needed for the anon/authenticated roles.

-- ─────────────────────────────────────────────────────────────────────────
-- push_subscriptions — one row per browser/device that has granted Web
-- Push permission from inside the Admin Portal. Written by the admin's own
-- authenticated browser session, read only by the server (service role)
-- when sending a push.
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists push_subscriptions (
    id uuid primary key default gen_random_uuid(),
    endpoint text not null unique,
    p256dh text not null,
    auth_key text not null,
    created_at timestamptz not null default now()
);

alter table push_subscriptions enable row level security;

drop policy if exists "push_subscriptions_all_authenticated" on push_subscriptions;
create policy "push_subscriptions_all_authenticated" on push_subscriptions
    for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────────────────
-- Enable Realtime on notifications so the Admin Portal's Postgres Changes
-- subscription (INSERT/UPDATE) fires without polling. Equivalent to
-- toggling this table on in Dashboard → Database → Replication.
-- ─────────────────────────────────────────────────────────────────────────
alter publication supabase_realtime add table notifications;
