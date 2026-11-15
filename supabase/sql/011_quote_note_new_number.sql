-- ═══════════════════════════════════════════════════════════════════════
-- 011 — New business number in saved quote notes
-- ═══════════════════════════════════════════════════════════════════════
--
-- The business number changed on 15 Nov 2026 from +92 326 8869669 to
-- +966 54 772 1168 (WhatsApp only, no calls). The code now reads the number
-- from src/lib/contact.ts, but 28 quotes saved before the change carry the
-- old number inside quotes.admin_note, the "Note for Customer" printed on the
-- quote PDF and in the quote email. Re-sending or re-downloading one of those
-- quotes would still show the old number.
--
-- Checked read-only on 15 Nov 2026: the old number appears only in
-- quotes.admin_note (28 rows, always written "+92 326 8869669"). No other
-- text column in quotes, invoices, bookings or customers contains it.
--
-- Additive and reversible: the original notes are copied to
-- quotes_admin_note_backup_011 first. Rollback:
-- 011_quote_note_new_number_rollback.sql
--
-- Run in the Supabase SQL Editor.

create table if not exists public.quotes_admin_note_backup_011 (
    quote_id   uuid primary key,
    admin_note text,
    backed_up_at timestamptz not null default now()
);

alter table public.quotes_admin_note_backup_011 enable row level security;
-- No policies: only the service role (SQL Editor) can read it.

insert into public.quotes_admin_note_backup_011 (quote_id, admin_note)
select id, admin_note
  from public.quotes
 where admin_note like '%8869669%'
on conflict (quote_id) do nothing;

update public.quotes
   set admin_note = replace(
                      replace(admin_note, '+92 326 8869669', '+966 54 772 1168'),
                      '+923268869669', '+966547721168')
 where admin_note like '%8869669%';

notify pgrst, 'reload schema';

-- ═══════════════════════════════════════════════════════════════════════
-- VERIFICATION
-- ═══════════════════════════════════════════════════════════════════════
-- select count(*) from public.quotes where admin_note like '%8869669%';
-- Expect 0.
--
-- select count(*) from public.quotes_admin_note_backup_011;
-- Expect 28 (or however many rows matched on the day it ran).
