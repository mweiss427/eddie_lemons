#!/usr/bin/env bash
# Read-only status collection for the good-morning skill.
# Writes nothing, changes nothing, fetches nothing from the network except
# authenticated GitHub reads via `gh`. Individual sections degrade to a
# MISSING/UNAVAILABLE marker rather than failing the whole run.

set -u

REPO_DIR="${1:-.}"
cd "$REPO_DIR" || { echo "CANNOT_CD:$REPO_DIR"; exit 1; }

section() { printf '\n=== %s ===\n' "$1"; }
have() { command -v "$1" >/dev/null 2>&1; }

if ! have git || ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "NOT_A_GIT_REPO:$(pwd)"
  exit 0
fi

section "NOW"
date -u '+%Y-%m-%d %H:%M UTC (%A)'

section "REPO"
echo "path:   $(pwd)"
# Strip any embedded credentials before printing the remote.
echo "remote: $(git remote get-url origin 2>/dev/null | sed -E 's#//[^/@]*@#//#' || echo none)"
echo "branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
echo "head:   $(git log -1 --format='%h %ad %an — %s' --date=short 2>/dev/null)"
echo "age:    $(git log -1 --format='%ar' 2>/dev/null) since last commit on this branch"
upstream=$(git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null)
echo "upstream: ${upstream:-none}"

section "WORKING TREE"
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
  git status --short 2>/dev/null | head -40
  echo "--- diffstat ---"
  git diff --stat HEAD 2>/dev/null | tail -5
else
  echo "clean"
fi

section "STASHES"
git stash list 2>/dev/null | head -10 || true
[ -z "$(git stash list 2>/dev/null)" ] && echo "none"

section "UNPUSHED COMMITS"
if [ -n "${upstream:-}" ]; then
  out=$(git log --oneline "${upstream}..HEAD" 2>/dev/null | head -20)
  [ -n "$out" ] && echo "$out" || echo "none (branch matches ${upstream})"
else
  echo "no upstream set — nothing has been pushed for this branch"
fi

section "RECENT COMMITS (all branches, last 21 days)"
git log --all --since='21 days ago' --date=short \
  --format='%h %ad %an (%D) %s' 2>/dev/null | head -25
echo "--- fallback: last 10 commits regardless of date ---"
git log --all -10 --date=short --format='%h %ad %an %s' 2>/dev/null

section "RECENT BRANCHES"
git for-each-ref --sort=-committerdate refs/heads \
  --format='%(committerdate:short) %(refname:short) :: %(contents:subject)' 2>/dev/null | head -12

section "GITHUB"
if ! have gh; then
  echo "UNAVAILABLE: gh not installed"
elif ! gh auth status >/dev/null 2>&1; then
  echo "UNAVAILABLE: gh not authenticated"
else
  echo "--- open PRs ---"
  gh pr list --state open --limit 20 \
    --json number,title,author,headRefName,isDraft,reviewDecision,updatedAt,url \
    --jq '.[] | "#\(.number) [\(if .isDraft then "draft" else "ready" end)] \(.title)
      branch: \(.headRefName)  author: \(.author.login)  review: \(.reviewDecision // "none")  updated: \(.updatedAt)
      \(.url)"' 2>/dev/null || echo "  (query failed)"
  echo "--- merged/closed in last 14 days ---"
  gh pr list --state closed --limit 15 \
    --json number,title,mergedAt,closedAt,url \
    --jq '[.[] | select((.mergedAt // .closedAt) != null)] | .[] | "#\(.number) \(.title) — \(if .mergedAt then "merged " + .mergedAt else "closed " + .closedAt end)"' 2>/dev/null \
    | head -15 || echo "  (query failed)"
  echo "--- recent CI runs ---"
  gh run list --limit 8 \
    --json displayTitle,status,conclusion,headBranch,createdAt \
    --jq '.[] | "\(.conclusion // .status)\t\(.headBranch)\t\(.displayTitle)\t\(.createdAt)"' 2>/dev/null \
    || echo "  (no workflows or query failed)"
fi

section "WORKLOG"
if [ -f docs/eddie/worklog.md ]; then
  echo "--- docs/eddie/worklog.md (first 80 lines; newest entries are at the top) ---"
  head -80 docs/eddie/worklog.md
else
  echo "MISSING: docs/eddie/worklog.md — no carried-over context from prior sessions"
fi

section "OTHER BACKLOG SOURCES"
for f in TODO.md TASKS.md ROADMAP.md docs/eddie/BACKLOG.md docs/eddie/EDDIE.md .cursor/rules; do
  [ -e "$f" ] && echo "present: $f"
done
echo "(end)"
