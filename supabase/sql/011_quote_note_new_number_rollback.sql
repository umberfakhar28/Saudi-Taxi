-- Rollback for 011_quote_note_new_number.sql.
-- Puts back the quote notes exactly as they were before 011 ran, then drops
-- the backup table. Only the rows 011 changed are touched.

update public.quotes q
   set admin_note = b.admin_note
  from public.quotes_admin_note_backup_011 b
 where b.quote_id = q.id;

drop table if exists public.quotes_admin_note_backup_011;

notify pgrst, 'reload schema';
