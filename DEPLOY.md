# Deploying gulftripservice.com

The site is on Vercel's free **Hobby** plan. Every deployment Vercel keeps
uses about **280 MB** of the **10 GB** storage allowance. Every build that
reaches production also empties the CDN cache, so the first visitors re-read
pages from storage.

So deploy **less often, in batches**, and never deploy something that hasn't
been built locally first.

## The workflow

1. **Work locally.**
   - `npm run dev` and check the change at http://localhost:3000.
2. **Commit freely to a `dev` branch** (or any feature branch).
   - Pushing these branches does **not** deploy (see "What builds" below).
3. **Before merging, build locally:**
   ```
   npm run build
   ```
   - It must end without errors. A failed build on Vercel still creates a
     deployment (an "Error" one) and still uses storage.
   - Look through the output for `Error` / `Failed`, not only the exit code.
4. **Merge to `main` once a day**, or when a batch is ready, and push `main`.
   - That push is the one production deployment.
5. **Check the live site** after Vercel shows "Ready" (about 2–3 minutes).

### Don'ts

- **No manual "Redeploy" of a commit that's already deployed.**
  - It creates another full copy (~280 MB) of an identical site.
  - This has happened: "Kuwait routes…" was deployed 4×, "Arabic Doha to Riyadh…" 3×.
  - If something looks wrong after a deploy, find the cause first. A redeploy of the same code gives the same result.
- **Don't push half-finished work to `main`.** Every push to `main` with site changes is a production build.
- **Don't push a branch only to "save" it** if it's named `preview/…`. That makes a preview deployment.

## What builds (vercel.json → `ignoreCommand`)

`scripts/vercel-ignore-build.sh` decides, on Vercel, before each build:

| Push to | Result |
|---|---|
| `main`, with site changes | **Production build** |
| `main`, only docs changed (`*.md`, `docs/`, `seo-audit/`, `tests/`) | Skipped: no deployment |
| `preview/<anything>` | Preview build. Use this when you want a test URL before going live. |
| any other branch (`dev`, feature branches) | Skipped: no deployment |

**If you need a preview URL:**
```
git checkout -b preview/my-change
git push origin preview/my-change
```
Delete the branch (and its deployment) when you're done.

## Cleaning up old deployments

Vercel → Project → **Deployments** lists them all. Keep:
- the **current production** deployment;
- the **4 previous production** ones (instant rollback targets);
- any preview you are using right now.

**First candidates to delete:**
1. **Errored deployments** (status "Error"): failed builds, never served.
2. **Duplicate deployments of the same commit** (same commit message and hash; keep only the newest of each).
3. Old previews of branches that are merged or abandoned.
4. Production deployments older than the newest 5.

**In the dashboard:**
- Filter by Status → Error.
- Open the "⋯" menu on a deployment → **Delete**.

**With the CLI**, after `npx vercel@latest login`:
```
# list deployments with their status and age
npx vercel@latest ls <project-name>

# delete one deployment by its URL (repeat per deployment).
# --safe refuses to delete a deployment that still has a live domain.
npx vercel@latest rm <deployment-url> --safe --yes
```
`<project-name>` is the project's name in Vercel. `<deployment-url>` is the
`…vercel.app` address shown for each row.

**Never delete the deployment that `gulftripservice.com` points to**
(`--safe` guards against that).

**Automatic clean-up:**
- Project → Settings → Security → **Deployment Retention Policy**.
- Set **errored** and **canceled** deployments to the shortest period, and **preview** deployments to a short period.
- Old deployments are then removed without anyone having to remember.

## Database migrations

`supabase/sql/*.sql` files never run themselves. They are run by hand in
Supabase → SQL Editor. See `CONFIG.md`. A deploy that needs a new column must
have its migration run **before** the push.
