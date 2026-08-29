---
name: good-morning
description: Produce a start-of-session rundown of what we were working on plus a prioritized checklist of open tasks. Use when the operator opens a session with a greeting or a catch-up request — "good morning", "morning", "gm", "where were we", "catch me up", "what's on deck", "status", "standup" — or when a session resumes after a gap and current state needs re-establishing.
---

# Good Morning — Session Rundown & Checklist

Reconstruct what was in flight, report it, and hand back a checklist. **A greeting
is a request for a briefing, not authorization to start work.** Observe and report,
then stop and wait for the operator to pick a task.

Runs `Observe → Capture` from the Eddie loop. Acting comes after the operator
chooses.

## 1. Observe (do this before writing anything)

Run the collector from the repository root:

```bash
./.cursor/skills/good-morning/scripts/standup.sh
```

It is read-only and prints: current time, repo/branch/HEAD and how stale it is,
working-tree and stash state, unpushed commits, recent commits and branches, open
PRs with review state, recently merged/closed PRs, recent CI runs, the worklog, and
which other backlog files exist. Sections that cannot be gathered print
`UNAVAILABLE` or `MISSING` — treat those as unknowns, not as "nothing to report".

Then fill the gaps the collector deliberately leaves:

- **Unfinished work in an open PR.** For each open PR that matters, read its
  description and unresolved feedback: `gh pr view <n> --comments` and
  `gh pr checks <n>`. A PR sitting in draft with review comments is the single most
  likely "what we were working on".
- **Prior sessions, when the worklog is missing or thin.** In a Cloud Agent, call
  `cursor-cloud-list-cloud-agents` for recent runs on this repo — names, lifecycle
  status, whether each made code changes or opened a PR. Only escalate to
  `cursor-cloud-batch-fetch-details` when the list is genuinely insufficient, and
  delegate reading any transcript to a subagent; transcripts are large.
- **Local uncommitted work.** If the tree is dirty, read the actual diff before
  characterizing it. Do not guess intent from filenames.

Two failure modes to avoid: reporting the repo's own git history as *our* recent
work when the last commit is years old, and inventing continuity that no artifact
supports. If there is no evidence of prior work, say exactly that.

## 2. Report

Lead with the answer. Use this shape, in prose, keeping it to what changes what the
operator does next:

1. **Where we left off** — two or three sentences. The single most recent thread of
   work, its state, and why it stopped if that is known.
2. **In flight** — one short table: item, state, evidence (PR number, branch,
   commit, file). Every row cites something checkable. Include blocked and stalled
   items; a stalled item is information.
3. **Checklist** — numbered, ordered by what unblocks the most. Each item is one
   actionable sentence plus a short clause saying why it is on the list. Distinguish
   *finish this* from *decide this* from *nice to have*. Also register the list with
   `TodoWrite` so it survives the turn.
4. **Needs your call** — decisions only the operator can make: scope, priorities,
   credentials, anything destructive. Keep it short; if nothing needs a decision,
   drop the section rather than padding it.

Apply **KNOWN / INFERRED / ASSUMED / UNKNOWN** where it changes the reading. "PR #4
is open with two unresolved comments" is KNOWN. "We were probably mid-refactor" is
INFERRED, and label it. Never present a reconstruction as a memory — this runtime
has no session memory beyond what is in the repository and on GitHub.

Do not include: motivational openers, an agenda for the day the operator did not
ask for, or a summary of the skill's own process.

## 3. Capture

Update `docs/eddie/worklog.md` so the *next* session starts from a record instead
of a reconstruction. Its header documents the format. Rules:

- One entry per session, newest at the top, dated.
- Record what was done, what was decided and why, and what is still open — with
  provenance (commit, PR, file, or "operator stated").
- Curate, do not hoard. Prune the **Open threads** list as items close; delete dead
  hypotheses rather than archiving them. Transient state and chatter stay out.
- Write the entry when there is something durable to record. A greeting that
  surfaces nothing new does not need one; do not append an entry saying nothing
  happened.
- **A worklog entry on a feature branch is not memory yet.** It only becomes
  readable by future sessions once it reaches the default branch. Commit the entry
  with the work it describes so it merges with that PR, and if the work is abandoned
  the entry goes with it — do not leave the record depending on a PR nobody intends
  to merge.
- On a merge conflict in this file, keep both entries. Two sessions each recorded
  something real; the loser of a conflict is lost memory.

If the file is missing, create it from the format in `references/worklog-format.md`.

## Degraded modes

| Situation | Do this |
|---|---|
| Not a git repo | Report that, list what is on disk, and ask what to work on. |
| `gh` missing or unauthenticated | Say PR and CI state is UNKNOWN; do not infer it from branch names. |
| Repo is stale (last commit months or years old) | Say so explicitly. Recent-looking commits are the repo's history, not our session's. |
| No worklog, no open PRs, no recent runs | Report that there is no evidence of prior work, give a short read of the codebase's actual state, and ask for direction. Do not manufacture a checklist. |
| Local checkout may be behind the remote | `git fetch origin <branch>` before comparing; a Cloud Agent's checkout can be hours stale. |
