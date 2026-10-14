-- Invoices — pickup time alongside the pickup date
--
-- Run once in the Supabase Dashboard → SQL Editor, like 001–004.
--
-- WHY: bookings and quotes both carry travel_time, and the booking and quote
-- emails have always shown a Time row. Invoices did not: the invoice created
-- from a booking (admin/bookings/page.tsx) copied travel_date and dropped
-- travel_time, so every downstream invoice format — the preview modal, the
-- PNG, the PDF and the invoice email — had no time to show. Adding the
-- column lets the invoice carry the booking's own saved time rather than any
-- format inventing or defaulting one.
--
-- Matches the bookings/quotes column type (text, nullable): the app stores
-- times as "HH:MM:SS" strings and formats them through lib/datetime.ts, and a
-- booking with no time recorded stays null and is rendered as absent.
--
-- SAFETY: one nullable column, no row is changed, no default backfilled.
-- Covered by the existing invoices RLS policies from 002. Idempotent — safe
-- to run more than once.

alter table invoices add column if not exists travel_time text;

-- Backfill from each invoice's originating booking, where one is linked and
-- the booking actually has a time. Leaves everything else null rather than
-- guessing. Safe to re-run: it only ever fills a null.
update invoices i
set travel_time = b.travel_time
from bookings b
where i.booking_id = b.id
  and i.travel_time is null
  and b.travel_time is not null;
