-- Quotes raised from a booking row can now be given to the customer
-- directly (WhatsApp, in person) instead of being emailed through the
-- system. That is a different thing from a draft nobody has seen, and from
-- a 'sent' quote that genuinely went out by email.
--
-- Rather than widen the quotes_status_check constraint (which would change
-- the meaning of the status column for every existing page and report), the
-- moment of sharing is recorded on its own. A draft with shared_at set reads
-- as "Shared" on the booking; status itself is untouched.
--
-- Additive and nullable: existing quotes keep working, and the running site
-- ignores a column it doesn't select.

alter table quotes add column if not exists shared_at timestamptz;

comment on column quotes.shared_at is
    'When the quote was given to the customer directly (WhatsApp/in person). NULL means it was never shared that way; emailed quotes carry status = sent instead.';
