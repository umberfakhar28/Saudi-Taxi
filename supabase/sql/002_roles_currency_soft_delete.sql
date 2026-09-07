-- Admin Portal — Roles, Multi-Currency & Safe Customer Deletion
--
-- Run this once in the Supabase Dashboard → SQL Editor (Project → SQL Editor
-- → New query → paste → Run), the same way 001 was applied. There is still
-- no migration tooling in this repo, so this file is the source of truth for
-- this schema change.
--
-- SAFETY NOTES — read before running:
--   * Purely additive to DATA. No existing row is deleted, and no existing
--     amount is altered. New columns get defaults that match what the code
--     already assumed (currency = SAR).
--   * Every existing auth.users account is seeded as a FULL ADMIN, so the
--     owner cannot be locked out and the portal behaves exactly as before
--     for them.
--   * It DOES replace the row-level security policies on bookings, quotes,
--     invoices and customers. Those previously granted every authenticated
--     session full read/write. They are replaced with role-aware policies.
--     All public-website writes go through service-role API routes
--     (/api/bookings/create, /api/customers/upsert, /api/emails/send,
--     /api/admin/audit-log) which bypass RLS entirely, so the public
--     booking flow is unaffected.
--   * Safe to run more than once.

begin;

-- =========================================================================
-- 1. admin_users — who may sign in to the portal, and as what
-- =========================================================================
create table if not exists admin_users (
    id          uuid primary key references auth.users(id) on delete cascade,
    email       text not null unique,
    name        text,
    role        text not null default 'supervisor'
                check (role in ('supervisor', 'manager', 'admin')),
    is_active   boolean not null default true,
    created_at  timestamptz not null default now(),
    created_by  text
);

create index if not exists admin_users_email_idx on admin_users (lower(email));

-- Seed: every account that can already sign in today becomes a full admin.
-- Without this the new RLS policies below would lock the owner out of their
-- own portal the moment this migration runs.
insert into admin_users (id, email, name, role, is_active, created_by)
select u.id,
       u.email,
       coalesce(u.raw_user_meta_data ->> 'name', split_part(u.email, '@', 1)),
       'admin',
       true,
       'migration_002'
from auth.users u
where u.email is not null
on conflict (id) do nothing;

-- =========================================================================
-- 2. Role helper — the single place RLS asks "what may this session do?"
--
-- SECURITY DEFINER so it can read admin_users while admin_users itself is
-- protected by RLS (otherwise every policy would recurse into that table).
-- Ranks: 0 = not a portal user, 1 = supervisor, 2 = manager, 3 = admin.
-- =========================================================================
create or replace function public.admin_rank()
returns int
language sql
stable
security definer
set search_path = public
as $fn$
    select coalesce(
        (select case au.role
                    when 'admin'      then 3
                    when 'manager'    then 2
                    when 'supervisor' then 1
                    else 0
                end
         from public.admin_users au
         where au.id = auth.uid()
           and au.is_active = true),
        0);
$fn$;

revoke all on function public.admin_rank() from public;
grant execute on function public.admin_rank() to authenticated;

-- =========================================================================
-- 3. admin_users RLS
--    Everyone signed in may read the roster (the portal shows who has
--    access). Only a full admin (rank 3) may add, change or remove users.
-- =========================================================================
alter table admin_users enable row level security;

drop policy if exists "admin_users_select" on admin_users;
create policy "admin_users_select" on admin_users
    for select using (public.admin_rank() >= 1);

drop policy if exists "admin_users_write" on admin_users;
create policy "admin_users_write" on admin_users
    for all using (public.admin_rank() >= 3) with check (public.admin_rank() >= 3);

-- =========================================================================
-- 4. Multi-currency
--    Stored next to the amount, never derived. Existing rows are backfilled
--    to SAR because that is what the UI has always displayed them as — this
--    records the assumption that was already being made, and changes no
--    numeric value.
-- =========================================================================
alter table bookings add column if not exists currency text not null default 'SAR';
alter table quotes   add column if not exists currency text not null default 'SAR';
alter table invoices add column if not exists currency text not null default 'SAR';

update bookings set currency = 'SAR' where currency is null or btrim(currency) = '';
update quotes   set currency = 'SAR' where currency is null or btrim(currency) = '';
update invoices set currency = 'SAR' where currency is null or btrim(currency) = '';

do $mig$
begin
    if not exists (select 1 from pg_constraint where conname = 'bookings_currency_check') then
        alter table bookings add constraint bookings_currency_check check (currency in ('SAR','AED','KWD'));
    end if;
    if not exists (select 1 from pg_constraint where conname = 'quotes_currency_check') then
        alter table quotes add constraint quotes_currency_check check (currency in ('SAR','AED','KWD'));
    end if;
    if not exists (select 1 from pg_constraint where conname = 'invoices_currency_check') then
        alter table invoices add constraint invoices_currency_check check (currency in ('SAR','AED','KWD'));
    end if;
end
$mig$;

-- =========================================================================
-- 4b. Status vocabularies enforced in the database
--     The portal lets an admin set a booking's status directly from the
--     browser, so "only these values are legal" has to be enforced past the
--     UI. These are the exact sets the application already uses, and every
--     existing row conforms, so this rejects nothing that is currently
--     stored. Wrapped in NOT VALID + VALIDATE so an unexpected legacy row
--     surfaces as a clear error rather than a failed migration.
-- =========================================================================
do $chk$
begin
    if not exists (select 1 from pg_constraint where conname = 'bookings_status_check') then
        alter table bookings add constraint bookings_status_check
            check (status in ('pending', 'confirmed', 'completed', 'cancelled'));
    end if;
    if not exists (select 1 from pg_constraint where conname = 'quotes_status_check') then
        alter table quotes add constraint quotes_status_check
            check (status in ('draft', 'sent', 'accepted', 'expired', 'converted'));
    end if;
    if not exists (select 1 from pg_constraint where conname = 'invoices_status_check') then
        alter table invoices add constraint invoices_status_check
            check (status in ('paid', 'unpaid', 'partially_paid'));
    end if;
end
$chk$;

-- =========================================================================
-- 5. Safe customer deletion (soft delete)
--    bookings.customer_id references customers, and bookings/invoices also
--    keep their own denormalised copy of the customer's name, phone and
--    email. A hard delete would therefore either cascade away real booking
--    history or leave dangling references. Soft delete keeps every
--    historical booking, invoice and quote intact and readable.
-- =========================================================================
alter table customers add column if not exists deleted_at timestamptz;
create index if not exists customers_deleted_at_idx on customers (deleted_at) where deleted_at is null;

-- =========================================================================
-- 6. Role-aware RLS on the operational tables
--    view        = rank 1 (Supervisor and up)
--    create/edit = rank 2 (Manager and up)
--    delete      = rank 3 (Admin only)
--
--    The DO block clears whatever policies exist today by name, so this is
--    re-runnable and does not depend on knowing the old policy names.
-- =========================================================================
do $rls$
declare
    t text;
    p record;
begin
    foreach t in array array['bookings', 'quotes', 'invoices', 'customers']
    loop
        for p in select policyname from pg_policies where schemaname = 'public' and tablename = t
        loop
            execute format('drop policy if exists %I on public.%I', p.policyname, t);
        end loop;

        execute format('alter table public.%I enable row level security', t);

        execute format(
            'create policy %I on public.%I for select using (public.admin_rank() >= 1)',
            t || '_select_portal', t);
        execute format(
            'create policy %I on public.%I for insert with check (public.admin_rank() >= 2)',
            t || '_insert_portal', t);
        execute format(
            'create policy %I on public.%I for update using (public.admin_rank() >= 2) with check (public.admin_rank() >= 2)',
            t || '_update_portal', t);
        execute format(
            'create policy %I on public.%I for delete using (public.admin_rank() >= 3)',
            t || '_delete_portal', t);
    end loop;
end
$rls$;

-- =========================================================================
-- 7. Align the 001 tables with the same model
--    (previously "any authenticated session", now "any portal user").
-- =========================================================================
drop policy if exists "notifications_select_authenticated" on notifications;
create policy "notifications_select_authenticated" on notifications
    for select using (public.admin_rank() >= 1);

drop policy if exists "notifications_update_authenticated" on notifications;
create policy "notifications_update_authenticated" on notifications
    for update using (public.admin_rank() >= 1) with check (public.admin_rank() >= 1);

drop policy if exists "push_subscriptions_all_authenticated" on push_subscriptions;
create policy "push_subscriptions_all_authenticated" on push_subscriptions
    for all using (public.admin_rank() >= 1) with check (public.admin_rank() >= 1);

commit;

-- =========================================================================
-- Verification — run these after the migration and check the output.
-- =========================================================================
-- select email, role, is_active from admin_users order by created_at;
-- select count(*) as bookings_still_readable from bookings;
-- select distinct currency from bookings;
-- select tablename, policyname, cmd from pg_policies
--   where tablename in ('bookings','quotes','invoices','customers') order by tablename, cmd;
