-- Admin Portal — Email Log column + RLS hardening
--
-- Run once in the Supabase Dashboard → SQL Editor, the same way 001 and 002
-- were applied.
--
-- ═══════════════════════════════════════════════════════════════════════
-- WHY THIS MATTERS — read before running
--
-- Three tables were left with policies granting the `anon` role ALL access
-- with USING(true) and WITH CHECK(true):
--
--     email_logs        anon_all_email_logs
--     audit_logs        anon_all_audit_logs
--     automation_rules  anon_all_rules
--
-- `anon` is the role behind NEXT_PUBLIC_SUPABASE_ANON_KEY, which is shipped
-- inside the public website's JavaScript bundle. Anyone who opens
-- gulftripservice.com can extract that key. Verified against the live
-- database from a signed-out client holding only that key:
--
--     email_logs        READABLE — 32 rows (every customer email address
--                       and subject line ever sent)
--     audit_logs        READABLE — 20 rows of admin activity
--     automation_rules  READABLE — 11 pricing rules
--
-- Because the policies are ALL rather than SELECT, the same key could also
-- INSERT, UPDATE and DELETE those rows — a stranger could have wiped the
-- audit trail or rewritten the pricing rules.
--
-- These policies predate migration 002, which only covered bookings,
-- quotes, invoices and customers. This migration brings the remaining
-- tables onto the same admin_rank() model.
--
-- SAFETY: additive to data. One nullable column is added; no row is
-- deleted and no value is altered. Writes to email_logs and audit_logs go
-- through service-role API routes, which bypass RLS entirely, so tightening
-- these policies cannot break the booking, email or audit pipelines.
-- Safe to run more than once.
-- ═══════════════════════════════════════════════════════════════════════

begin;

-- =========================================================================
-- 1. Record which address each email was actually sent from
--    Nullable on purpose: rows written before this column existed have no
--    recorded sender, and guessing one would be inventing history. The
--    admin Email Log shows those as "not recorded".
-- =========================================================================
alter table email_logs add column if not exists from_address text;

comment on column email_logs.from_address is
    'RFC 5322 sender used for this send, e.g. "Gulf Trip Service <info@gulftripservice.com>". Null for rows written before this column existed.';

create index if not exists email_logs_created_at_idx on email_logs (created_at desc);
create index if not exists email_logs_status_idx on email_logs (status);

-- =========================================================================
-- 2. email_logs — portal users may read; nobody may write from a browser
--    Inserts come from /api/emails/send via the service-role client, which
--    bypasses RLS, so no insert policy is required.
-- =========================================================================
do $p$
declare p record;
begin
    for p in select policyname from pg_policies where schemaname='public' and tablename='email_logs'
    loop execute format('drop policy if exists %I on public.email_logs', p.policyname); end loop;
end
$p$;

alter table email_logs enable row level security;

create policy "email_logs_select_portal" on email_logs
    for select using (public.admin_rank() >= 1);

-- =========================================================================
-- 3. audit_logs — portal users may read; written only by service role
--    (/api/admin/audit-log and src/utils/adminApi.ts). Deliberately no
--    update or delete policy: an audit trail nobody can edit is the point.
-- =========================================================================
do $p$
declare p record;
begin
    for p in select policyname from pg_policies where schemaname='public' and tablename='audit_logs'
    loop execute format('drop policy if exists %I on public.audit_logs', p.policyname); end loop;
end
$p$;

alter table audit_logs enable row level security;

create policy "audit_logs_select_portal" on audit_logs
    for select using (public.admin_rank() >= 1);

-- =========================================================================
-- 4. automation_rules — pricing rules
--    Read by the admin Automation page and the quote calculator; edited
--    from the browser by the Automation page. No public page reads them.
--    View = Supervisor and up, change = Manager and up, delete = Admin.
-- =========================================================================
do $p$
declare p record;
begin
    for p in select policyname from pg_policies where schemaname='public' and tablename='automation_rules'
    loop execute format('drop policy if exists %I on public.automation_rules', p.policyname); end loop;
end
$p$;

alter table automation_rules enable row level security;

create policy "automation_rules_select_portal" on automation_rules
    for select using (public.admin_rank() >= 1);
create policy "automation_rules_insert_portal" on automation_rules
    for insert with check (public.admin_rank() >= 2);
create policy "automation_rules_update_portal" on automation_rules
    for update using (public.admin_rank() >= 2) with check (public.admin_rank() >= 2);
create policy "automation_rules_delete_portal" on automation_rules
    for delete using (public.admin_rank() >= 3);

-- =========================================================================
-- 5. fleet — keep the public catalogue readable, fix the admin side
--    Its admin policy was hardcoded to a single email address:
--        (auth.jwt() ->> 'email') = 'umberfakhar10@gmail.com'
--    which meant no Manager could ever manage vehicles. Public SELECT is
--    intentional (the website lists the fleet) and is preserved.
-- =========================================================================
drop policy if exists "Admins can do everything on fleet" on fleet;
drop policy if exists "fleet_write_portal" on fleet;
create policy "fleet_write_portal" on fleet
    for all using (public.admin_rank() >= 2) with check (public.admin_rank() >= 2);

commit;

-- =========================================================================
-- Verification — run after the migration.
-- =========================================================================
-- Expect: no policy anywhere below is granted to {anon}.
-- select tablename, policyname, cmd, roles::text
--   from pg_policies
--  where schemaname='public'
--    and tablename in ('email_logs','audit_logs','automation_rules','fleet')
--  order by tablename, cmd;
--
-- Expect the new column to exist:
-- select column_name from information_schema.columns
--  where table_schema='public' and table_name='email_logs' and column_name='from_address';
--
-- Expect row counts unchanged:
-- select (select count(*) from email_logs) email_logs,
--        (select count(*) from audit_logs) audit_logs,
--        (select count(*) from automation_rules) automation_rules;
