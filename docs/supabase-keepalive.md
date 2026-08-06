# Supabase Keepalive

## Why this exists

Supabase free-tier projects auto-pause after roughly 7 days with no external
activity. A paused project means the site's database calls (bookings,
quotes, etc.) start failing until someone manually resumes it from the
Supabase dashboard. `.github/workflows/supabase-keepalive.yml` runs a real
database read + write once a day so that never happens silently.

## What was set up (2026-08-06)

1. **`public.keepalive` table** — created directly in the project's Postgres
   database (via a one-off script using `POSTGRES_URL_NON_POOLING`, not
   through the Supabase SQL editor UI). Single row (`id = 1`,
   `last_ping timestamptz`), isolated from every application table, RLS
   enabled.
2. **RLS policies** — `keepalive_anon_select` and `keepalive_anon_update`,
   both scoped to the `anon` role and, for the update policy, to `id = 1`
   only. The anon key used by the workflow cannot read or write anything
   else in the database because of this — it has no policy granting access
   to any other table.
3. **Verified end-to-end** before writing the workflow: confirmed the
   project was active (a live `select` against the real `bookings` table
   returned `200`, which a paused project can't do), then confirmed the
   anon key could `PATCH` the keepalive row via the exact REST request the
   workflow uses.
4. **Credential choice**: the legacy JWT anon key
   (`NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`), not the newer
   `sb_publishable_...` key Supabase now recommends by default. The new key
   formats can't be sent as an `Authorization: Bearer` token — Supabase
   rejects that combination — which would need a different request shape
   than the one used here. The legacy key remains fully supported until
   Supabase's stated end-of-2026 deprecation, and the RLS policies above
   already give it a near-zero blast radius regardless of key type.

## GitHub secrets you need to add (I don't have access to set these myself)

Go to the repo's **Settings → Secrets and variables → Actions → New
repository secret** and add two secrets, copying the values from your own
`.env.local` (never paste them anywhere else, including chat):

| Secret name | Value comes from this `.env.local` variable |
| --- | --- |
| `SUPABASE_URL` | `NEXT_PUBLIC_SUPABASE_URL` |
| `SUPABASE_KEEPALIVE_KEY` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |

## Verifying it worked

1. After adding both secrets, go to the **Actions** tab → **Supabase
   keepalive** → **Run workflow** (the `workflow_dispatch` trigger) → confirm
   it goes green.
2. In the Supabase dashboard's Table Editor, open `public.keepalive` and
   confirm `last_ping` updated to (approximately) the time you ran the
   workflow.
3. Check the workflow's run log — it only ever echoes the HTTP status code
   and response body (`{"id":1,"last_ping":"..."}`), never the secret
   values themselves.
4. Come back in a day or two and confirm the scheduled trigger fired on its
   own (Actions tab will show a run with no "manually triggered" marker).

## The honest caveat

This is a workaround, not a fix. If this database backs a live commercial
site, the free tier itself is the bigger risk — no daily backups, lower
resource ceilings, and a missed GitHub notification email (see the 60-day
inactivity note in the workflow file) or one paused week is enough to take
booking submissions offline. Worth raising the Supabase Pro upgrade as its
own decision, separate from whether this keepalive job is working.
