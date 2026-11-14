-- Rollback for 010_whatsapp_shared_and_invoice_guard.sql.
-- Drops only what 010 added. quotes.shared_at (migration 005) is untouched,
-- so the "Shared" history recorded before 010 survives a rollback.

drop index if exists public.invoices_one_per_booking;
alter table public.quotes   drop column if exists shared_via_whatsapp_at;
alter table public.bookings drop column if exists shared_via_whatsapp_at;

notify pgrst, 'reload schema';
