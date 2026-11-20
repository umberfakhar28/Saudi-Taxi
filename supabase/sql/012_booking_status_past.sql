-- 012: a "past" booking status.
--
-- Owner, 20 Nov 2026: pending bookings whose trip date has gone by were
-- never confirmed or completed, and 220 of them sat in "Pending" next to the
-- live enquiries. "Past" files them away without calling them completed
-- (which would claim the trip happened, and would email the customer if done
-- from the admin panel) or cancelled.
--
-- This script only changes data in the database. No email, WhatsApp or
-- notification is sent: those are sent by the admin panel when an admin
-- changes a status there, not by the database.
--
-- Run once in the Supabase SQL Editor. Safe to run again.
-- Rollback: 012_booking_status_past_rollback.sql

begin;

-- 1. Allow the new value.
alter table bookings drop constraint if exists bookings_status_check;
alter table bookings add constraint bookings_status_check
    check (status in ('pending', 'confirmed', 'completed', 'cancelled', 'past'));

-- 2. One-off: pending bookings whose trip date is before today, Saudi time.
--    Today's and future trips, and bookings with no date, stay pending.
update bookings
   set status = 'past'
 where status = 'pending'
   and travel_date is not null
   and travel_date < (now() at time zone 'Asia/Riyadh')::date;

commit;

-- 3. Let the API see the new constraint straight away.
notify pgrst, 'reload schema';

-- Check: expect "past" to be about 220 on 20 Nov 2026, and no pending row
-- with a trip date before today.
select status, count(*) from bookings group by status order by status;
