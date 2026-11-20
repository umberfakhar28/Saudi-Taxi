-- Rollback for 012_booking_status_past.sql.
-- Every "past" booking goes back to "pending", then the old status list is
-- restored. Run only if you want to remove the "past" status entirely.

begin;

update bookings set status = 'pending' where status = 'past';

alter table bookings drop constraint if exists bookings_status_check;
alter table bookings add constraint bookings_status_check
    check (status in ('pending', 'confirmed', 'completed', 'cancelled'));

commit;

notify pgrst, 'reload schema';
