-- Quotes — a message from the team to the customer
--
-- Run once in the Supabase Dashboard → SQL Editor, like 001–003.
--
-- quotes.notes already holds the customer's own trip requirements (it is
-- pre-filled from the booking's special notes). This adds a separate field
-- for what the team wants to tell the customer, shown prominently on the
-- quote email and on the downloaded quote.
--
-- SAFETY: one nullable column. No row is changed. Covered by the existing
-- quotes RLS policies from 002. Safe to run more than once.

alter table quotes add column if not exists admin_note text;

comment on column quotes.admin_note is
    'Message written by the team for the customer; shown on the quote email and the downloaded quote.';
