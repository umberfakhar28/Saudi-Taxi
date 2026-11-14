-- ═══════════════════════════════════════════════════════════════════════
-- 010 — WhatsApp "Shared" stamps, and one invoice per booking
-- ═══════════════════════════════════════════════════════════════════════
--
-- Additive only. Rollback: 010_whatsapp_shared_and_invoice_guard_rollback.sql
--
-- 1. shared_via_whatsapp_at on quotes and bookings (admin item 8)
--    Stamped when an admin opens WhatsApp with a quote or a booking message,
--    and shown on the Bookings list as a green "Shared" tag whose tooltip
--    gives the date and time. quotes.shared_at (migration 005) already
--    meant "given directly", which in practice was WhatsApp, so existing
--    quotes are back-filled from it.
--
-- 2. At most one invoice per booking (admin item 1)
--    The page already refuses a second invoice; this makes the database
--    refuse it too, so two admins pressing Create at once cannot both win.
--    Added only when no booking already has two invoices — if one does, the
--    index is skipped with a NOTICE listing them, and nothing else changes.
--
-- Safe before or after the code deploy: the new code reads quotes(*) and
-- retries a stamp without the column if it is missing.
--
-- Run in the Supabase SQL Editor, then reload the PostgREST schema cache
-- (last line).

alter table public.quotes   add column if not exists shared_via_whatsapp_at timestamptz;
alter table public.bookings add column if not exists shared_via_whatsapp_at timestamptz;

comment on column public.quotes.shared_via_whatsapp_at is
    'Last time an admin opened WhatsApp with this quote. NULL = never shared on WhatsApp.';
comment on column public.bookings.shared_via_whatsapp_at is
    'Last time an admin opened WhatsApp with a message about this booking. NULL = never.';

update public.quotes
   set shared_via_whatsapp_at = shared_at
 where shared_via_whatsapp_at is null
   and shared_at is not null;

do $$
declare
    dupes text;
begin
    select string_agg(booking_id::text, ', ')
      into dupes
      from (select booking_id from public.invoices
             where booking_id is not null
             group by booking_id having count(*) > 1) d;

    if dupes is null then
        create unique index if not exists invoices_one_per_booking
            on public.invoices (booking_id)
            where booking_id is not null;
    else
        raise notice 'invoices_one_per_booking NOT created: these bookings already have more than one invoice: %', dupes;
    end if;
end $$;

notify pgrst, 'reload schema';

-- ═══════════════════════════════════════════════════════════════════════
-- VERIFICATION
-- ═══════════════════════════════════════════════════════════════════════
-- select table_name, column_name from information_schema.columns
--  where table_schema = 'public' and column_name = 'shared_via_whatsapp_at';
-- Expect two rows: bookings, quotes.
--
-- select indexname from pg_indexes where indexname = 'invoices_one_per_booking';
-- Expect one row (or the NOTICE above explaining why not).
