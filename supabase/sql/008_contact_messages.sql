-- Contact Us enquiries — a home for messages that are not yet trips
--
-- Run this once in the Supabase Dashboard → SQL Editor, the same way 001–007
-- were applied. There is no migration runner in this repo; committing this
-- file does nothing on its own.
--
-- ═══════════════════════════════════════════════════════════════════════
-- WHY THIS TABLE EXISTS
--
-- /contact-us and /ar/contact-us collected a name, phone, email, subject,
-- service and message and then threw all of it away: the submit handler
-- showed an alert() and cleared the form. Nothing was stored, nothing was
-- emailed, nobody was notified — while the customer was told "we will get
-- back to you within 24 hours".
--
-- WHY NOT JUST USE `bookings`:
--
--   bookings.pickup_location   NOT NULL
--   bookings.dropoff_location  NOT NULL
--   bookings.travel_date       NOT NULL
--   bookings.travel_time       NOT NULL
--
-- A contact message has none of those four. Storing enquiries as bookings
-- would mean writing invented values into all four columns, and those rows
-- would then appear in the Calendar and in the Dashboard's "upcoming
-- bookings" widget alongside real trips. This table holds what the form
-- actually collects, and nothing it does not.
--
-- This is NOT a parallel contact-management system: there is no second
-- customer record, no second booking lifecycle. It is an inbox. When an
-- enquiry turns into real work, it becomes a `bookings` row through the
-- existing flow, and `converted_booking_id` records that it did.
--
-- SAFETY: purely additive. One new table, no change to any existing table,
-- no data touched. Safe to run against production. Safe to run twice.
-- ═══════════════════════════════════════════════════════════════════════

begin;

create table if not exists contact_messages (
    id              uuid primary key default gen_random_uuid(),
    created_at      timestamptz not null default now(),

    -- What the form collects. name/phone/message are what the form marks
    -- required; email is optional because this business reaches people on
    -- WhatsApp and a phone number is the more reliable identity (the same
    -- reasoning as migration 006).
    name            text not null,
    phone           text not null,
    email           text,
    subject         text not null,
    service         text,
    message         text not null,

    -- Which form it came from. The Arabic page is a real, separate audience
    -- (/ar converts at nearly double the English CTR), so knowing the
    -- enquiry arrived in Arabic tells the admin which language to reply in.
    locale          text not null default 'en'
                    check (locale in ('en', 'ar')),

    -- Channel attribution. Fixed at 'website_contact' today; the column
    -- exists so that when the same idea is applied to bookings (backlog
    -- P1-1) the vocabulary is already established rather than invented
    -- twice.
    source          text not null default 'website_contact'
                    check (source in ('website_contact', 'whatsapp', 'email', 'phone', 'admin')),

    -- The enquiry lifecycle. Deliberately short: this is an inbox, not a
    -- second booking pipeline.
    status          text not null default 'new'
                    check (status in ('new', 'contacted', 'converted', 'closed', 'spam')),

    internal_notes  text,
    handled_at      timestamptz,

    -- Set when the admin notification email actually goes out. This is also
    -- the replay guard: the API route refuses to send a second notification
    -- for a message that already has one, so a repeated request cannot be
    -- used to flood the business's own inbox.
    notified_at     timestamptz,

    -- If this enquiry became real work, the booking it became. ON DELETE
    -- SET NULL for the same reason invoices use it: deleting a booking must
    -- not delete the history of where it came from.
    converted_booking_id uuid references bookings(id) on delete set null
);

comment on table contact_messages is
    'Enquiries from /contact-us and /ar/contact-us. Not bookings: no pickup, drop-off, date or time. Inserted only by the service-role route /api/contact/create.';
comment on column contact_messages.notified_at is
    'When the admin notification email was sent. Non-null also means "do not send again" — the replay guard in /api/contact/create.';

create index if not exists contact_messages_created_at_idx
    on contact_messages (created_at desc);
create index if not exists contact_messages_status_idx
    on contact_messages (status) where status = 'new';
create index if not exists contact_messages_phone_idx
    on contact_messages (phone);

-- ═══════════════════════════════════════════════════════════════════════
-- RLS — identical model to migrations 002 and 003.
--
--   view   = admin_rank() >= 1  (Supervisor and up)
--   edit   = admin_rank() >= 2  (Manager and up — set status, add notes)
--   delete = admin_rank() >= 3  (Admin only)
--
-- There is deliberately NO INSERT POLICY. Inserts come from
-- /api/contact/create via the service-role client, which bypasses RLS —
-- exactly the pattern email_logs and audit_logs already use. A browser
-- holding the public anon key therefore cannot write here at all, which
-- means this table cannot be used as an anonymous write primitive.
-- ═══════════════════════════════════════════════════════════════════════

alter table contact_messages enable row level security;

drop policy if exists "contact_messages_select_portal" on contact_messages;
create policy "contact_messages_select_portal" on contact_messages
    for select using (public.admin_rank() >= 1);

drop policy if exists "contact_messages_update_portal" on contact_messages;
create policy "contact_messages_update_portal" on contact_messages
    for update using (public.admin_rank() >= 2) with check (public.admin_rank() >= 2);

drop policy if exists "contact_messages_delete_portal" on contact_messages;
create policy "contact_messages_delete_portal" on contact_messages
    for delete using (public.admin_rank() >= 3);

commit;

-- ═══════════════════════════════════════════════════════════════════════
-- AFTERWARDS — reload the PostgREST schema cache, or supabase-js will keep
-- reporting "Could not find the table 'public.contact_messages' in the
-- schema cache" even though the table exists.
-- ═══════════════════════════════════════════════════════════════════════
notify pgrst, 'reload schema';

-- ═══════════════════════════════════════════════════════════════════════
-- VERIFICATION — run these after the migration and check the output.
-- ═══════════════════════════════════════════════════════════════════════

-- 1. The table exists with the expected columns (expect 15 rows).
-- select column_name, data_type, is_nullable
-- from information_schema.columns
-- where table_schema = 'public' and table_name = 'contact_messages'
-- order by ordinal_position;

-- 2. RLS is on and there are exactly three policies, none of them INSERT.
-- select c.relrowsecurity as rls_enabled,
--        (select count(*) from pg_policies p
--          where p.schemaname='public' and p.tablename='contact_messages') as policy_count
-- from pg_class c join pg_namespace n on n.oid = c.relnamespace
-- where n.nspname='public' and c.relname='contact_messages';

-- 3. No policy grants INSERT (expect zero rows).
-- select policyname, cmd from pg_policies
-- where schemaname='public' and tablename='contact_messages' and cmd in ('INSERT','ALL');
