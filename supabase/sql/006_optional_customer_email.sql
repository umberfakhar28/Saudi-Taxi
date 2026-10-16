-- Customer email becomes optional on bookings and quotes
--
-- Run once in the Supabase Dashboard → SQL Editor, like 001–005.
--
-- WHY: plenty of customers reach us by phone or WhatsApp and never give an
-- email address. The booking and quote tables declared customer_email NOT
-- NULL, so every form in front of them had to demand one — and a customer
-- without an email either got turned away or was recorded under a made-up
-- address. Phone is the channel that actually matters for this business
-- (the booking, enquiry, confirmation and quote emails all lead with
-- WhatsApp), so the email column stays, it simply stops being mandatory.
--
-- invoices.customer_email and customers.email were already nullable, so an
-- invoice raised from a booking with no email needs no change here — once
-- these two columns allow null, the whole chain does.
--
-- NOT touched, deliberately:
--   admin_users.email      — the login identifier for a staff account.
--   email_logs.recipient_*  — a row only exists because mail was addressed
--                             somewhere; null there would mean nothing.
--
-- SAFETY: dropping NOT NULL only widens what the column accepts. No existing
-- row changes (all 149 bookings and 61 quotes currently have an address), no
-- index, policy or view depends on the constraint, and nothing that reads
-- the column assumed it was non-null beyond the forms being fixed alongside
-- this. Reversible with `set not null` while no null rows exist. Idempotent.

alter table bookings alter column customer_email drop not null;
alter table quotes   alter column customer_email drop not null;

-- Normalise the empty string to null so "no email" has one representation.
-- A '' slipped in by an older form reads as an address everywhere else
-- (`if (customer_email)` is true for '' in SQL but the value is useless),
-- and the send guards added alongside this migration test for null.
update bookings set customer_email = null where customer_email = '';
update quotes   set customer_email = null where customer_email = '';
update invoices set customer_email = null where customer_email = '';
update customers set email = null where email = '';
