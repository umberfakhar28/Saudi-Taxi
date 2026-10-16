-- Invoices: the fields a transport invoice actually needs
--
-- Run once in the Supabase Dashboard → SQL Editor, like 001–006.
--
-- WHY: the invoice could only ever say who, where, when and how much. It had
-- no way to record how the customer paid, whether the trip was a return, what
-- vehicle ran it, or how many people travelled — all of which the booking
-- already knew and the invoice threw away. The admin had no form either: an
-- invoice was raised in one click with every value defaulted, so tax_rate,
-- discount_amount, paid_amount and notes existed as columns that nothing
-- could set.
--
-- Everything below is nullable with no default, so:
--   * the four invoices already in the table stay exactly as they are and
--     keep rendering (every reader treats null as "not recorded" and omits
--     the line rather than printing a blank or a zero);
--   * nothing that writes invoices today has to change to keep working.
--
-- The two CHECK constraints are written to permit NULL explicitly, so they
-- validate new values without rejecting the existing rows.
--
-- SAFETY: additive only. No column is dropped, renamed or retyped, no row is
-- rewritten except the invoice_date backfill below, which only ever fills a
-- null from that row's own created_at. Idempotent — safe to run twice.

-- ── When the invoice was issued ──────────────────────────────────────
-- Distinct from created_at: the admin can date an invoice for the day the
-- work was done rather than the moment the record happened to be typed.
alter table invoices add column if not exists invoice_date date;

-- ── How the customer paid ────────────────────────────────────────────
alter table invoices add column if not exists payment_method text;

-- ── Who it is billed to, beyond name and phone ───────────────────────
alter table invoices add column if not exists billing_address text;

-- ── The trip itself ──────────────────────────────────────────────────
alter table invoices add column if not exists trip_type text;
alter table invoices add column if not exists return_date date;
-- text, not `time`, to match invoices.travel_time (migration 005) and the
-- app's "HH:MM:SS" string handling in lib/datetime.ts.
alter table invoices add column if not exists return_time text;
alter table invoices add column if not exists vehicle_type text;
alter table invoices add column if not exists passengers_count integer;
alter table invoices add column if not exists luggage_count integer;

-- ── Additional charges ───────────────────────────────────────────────
-- Waiting time, an extra stop, parking: a real surcharge on a transfer, and
-- not the same thing as tax, which the table already models separately.
-- Carries its own label so the invoice can name the charge instead of
-- printing an unexplained number.
alter table invoices add column if not exists extra_charges numeric;
alter table invoices add column if not exists extra_charges_label text;

-- ── The booking this invoice bills for ───────────────────────────────
-- Denormalised from bookings.booking_number so the invoice can print its
-- reference without a join, and keeps it if the booking is ever removed.
alter table invoices add column if not exists booking_number text;

-- ── Value constraints ────────────────────────────────────────────────
-- Added only when absent: ALTER TABLE ... ADD CONSTRAINT has no IF NOT
-- EXISTS, so re-running the file would otherwise fail on the second pass.
do $$
begin
    if not exists (select 1 from pg_constraint where conname = 'invoices_payment_method_check') then
        alter table invoices add constraint invoices_payment_method_check
            check (payment_method is null or payment_method in ('cash', 'bank_transfer', 'card', 'online'));
    end if;

    if not exists (select 1 from pg_constraint where conname = 'invoices_trip_type_check') then
        alter table invoices add constraint invoices_trip_type_check
            check (trip_type is null or trip_type in ('one-way', 'return'));
    end if;

    if not exists (select 1 from pg_constraint where conname = 'invoices_passengers_count_check') then
        alter table invoices add constraint invoices_passengers_count_check
            check (passengers_count is null or passengers_count >= 0);
    end if;

    if not exists (select 1 from pg_constraint where conname = 'invoices_luggage_count_check') then
        alter table invoices add constraint invoices_luggage_count_check
            check (luggage_count is null or luggage_count >= 0);
    end if;
end $$;

-- ── Backfill ─────────────────────────────────────────────────────────
-- Existing invoices get the issue date they already effectively had. Only
-- ever fills a null, so re-running changes nothing and an admin-corrected
-- date is never overwritten.
update invoices
set invoice_date = (created_at at time zone 'utc')::date
where invoice_date is null
  and created_at is not null;

-- The booking reference each invoice was raised against, where one exists.
update invoices i
set booking_number = b.booking_number
from bookings b
where i.booking_id = b.id
  and i.booking_number is null
  and b.booking_number is not null;
