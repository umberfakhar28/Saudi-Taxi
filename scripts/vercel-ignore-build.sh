#!/bin/bash
# Vercel "Ignored Build Step" (vercel.json → ignoreCommand).
# Exit 0 = SKIP this build. Exit 1 = BUILD.
#
# Every deployment Vercel keeps costs ~280 MB of the 10 GB Hobby storage, and
# a build that changes nothing on the site is pure cost. So (DEPLOY.md):
#   · main             → builds production, unless the push only touched
#                        docs (*.md, docs/, seo-audit/, tests/)
#   · preview/*        → builds a preview deployment
#   · any other branch → no build (work freely on dev, feature branches, …)

BRANCH="${VERCEL_GIT_COMMIT_REF:-}"
echo "Ignored Build Step: branch '${BRANCH}', commit ${VERCEL_GIT_COMMIT_SHA:-?}"

case "$BRANCH" in
  main) ;;
  preview/*) echo "→ preview branch: build"; exit 1 ;;
  *) echo "→ not main and not preview/*: skip"; exit 0 ;;
esac

# main: compare against the last successful production deployment (or the
# previous commit when Vercel has none on record).
BASE="${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}"
git diff --quiet "$BASE" HEAD -- . \
  ':(exclude,glob)**/*.md' ':(exclude)docs' ':(exclude)seo-audit' ':(exclude)tests'
rc=$?
if [ "$rc" -eq 0 ]; then
  echo "→ main, only docs changed since ${BASE}: skip"
  exit 0
fi
# rc 1 = code changed; anything else = could not compare (shallow clone,
# unknown SHA): build rather than risk skipping a real change.
echo "→ main, site files changed (or could not compare, rc=${rc}): build"
exit 1
