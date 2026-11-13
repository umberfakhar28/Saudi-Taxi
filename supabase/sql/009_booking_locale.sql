-- ═══════════════════════════════════════════════════════════════════════
-- 009 — bookings.locale: the language the customer booked in
-- ═══════════════════════════════════════════════════════════════════════
--
-- Why: customer emails (booking received, confirmed, day-before reminder)
-- are sent in Arabic for bookings made on /ar/book-online. The booking-
-- received email knows the language from the request, but the confirmation
-- and the reminder are sent later and read it from this column.
--
-- Safe to run before or after the code deploy:
--   · before it — the column sits unused, defaulting to 'en';
--   · after it  — /api/bookings/create retries the insert without `locale`
--     if the column is missing (logging a warning), so bookings never fail;
--     only the later Arabic emails fall back to English until this runs.
--
-- Run in the Supabase SQL Editor, then reload the PostgREST schema cache
-- (last line).

alter table public.bookings
    add column if not exists locale text not null default 'en';

do $$
begin
    if not exists (
        select 1 from pg_constraint where conname = 'bookings_locale_check'
    ) then
        alter table public.bookings
            add constraint bookings_locale_check check (locale in ('en', 'ar'));
    end if;
end $$;

-- Used by the contact/booking spam limits (recent rows per phone/email).
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists email_logs_recipient_created_idx on public.email_logs (lower(recipient_email), created_at desc);

notify pgrst, 'reload schema';

-- ═══════════════════════════════════════════════════════════════════════
-- VERIFICATION
-- ═══════════════════════════════════════════════════════════════════════
-- select column_name, data_type, column_default, is_nullable
-- from information_schema.columns
-- where table_schema = 'public' and table_name = 'bookings' and column_name = 'locale';
-- Expect one row: locale | text | 'en'::text | NO
