# Eddie — Worklog

Durable session record. The `good-morning` skill reads this first so a new session
starts from a record rather than a reconstruction, and appends to it when something
durable happens. Every claim carries provenance; **Open threads** is pruned as items
close rather than archived. Format:
`.cursor/skills/good-morning/references/worklog-format.md`.

## Open threads

- **PR #1 — Eddie operating profile** — open and unmerged, so `docs/eddie/EDDIE.md`
  and the always-applied identity/engineering/context rules are not on `main` yet.
  Needs operator review. (`gh pr view 1`, branch `cursor/eddie-lemons-profile-d91a`)
- **`good-morning` skill** — on branch `cursor/good-morning-standup-skill-59af`,
  pending review. Its `30-eddie-standup.mdc` rule assumes PR #1's numbering scheme
  and references `docs/eddie/EDDIE.md`, which only exists once PR #1 merges.
- **`personality.json` contradicts the Eddie spec** — PR #1 seeds its `prompt` array
  with "You have access to conversation history and remember previous interactions"
  and "friendly", which contradict `EDDIE.md` §1/§10 (never claim memory the runtime
  cannot access) and §4 (dry, no filler). No source file reads `personality.json`, so
  it has no effect today; `server.js:14` reads only `conversations.json`. Fix the
  wording before anything starts consuming it.
  (`rg -l personality` over non-JSON sources → no matches)
- **`EDDIE.md` §11 lists only three rules** — it enumerates the `.cursor/rules/`
  files, so it goes stale the moment `30-eddie-standup.mdc` lands. Whichever of PR #1
  and PR #2 merges second should add the fourth entry.
- **Neither PR has a tracking issue** — `EDDIE.md` §9 says non-trivial work is
  tracked by an issue with a PR delivering the change. PRs #1 and #2 both skip the
  issue. Either loosen the rule for operator-directed work or start filing issues;
  right now the rule is installed and already unobserved.
- **`README.md` is unreliable** — the intro and install instructions are duplicated
  verbatim, the two copies contradict each other on where the OpenAI key goes
  (`.env` at line 11 vs. `server.js` at line 77), and the About section still has
  `[Your Name]` / `[a course/an independent project/etc.]` placeholders. Nobody has
  claimed this work. (read `README.md`)
- **`REACT_APP_OPENAI_API_KEY` naming is a footgun** — the key is read only in
  `server.js:13` and nothing under `src/` touches `process.env`, so it is *not* in
  the client bundle today. But the `REACT_APP_` prefix is Create React App's
  "expose to browser" prefix, so any future `src/` reference silently ships the
  secret. Renaming it to `OPENAI_API_KEY` is a one-line, low-risk fix.
  (`rg 'process\.env' src/` → no matches; `server.js:13`)

---

## 2026-08-29 — Built the good-morning rundown skill

**Did:** Added the `good-morning` skill on branch
`cursor/good-morning-standup-skill-59af`: `.cursor/skills/good-morning/SKILL.md`
(observe → report → capture workflow), `scripts/standup.sh` (read-only collector for
git, GitHub, CI, and worklog state), `references/worklog-format.md`, the
always-applied trigger rule `.cursor/rules/30-eddie-standup.mdc`, and this file.
Ran the collector against this repo to verify its output.

**Decided:** Skill plus a small always-applied rule, rather than a skill alone.
Cursor's skill invocation is a model judgment call on the `description` field with
no exact-phrase guarantee, so a three-line `alwaysApply` rule makes the greeting
trigger reliable; the workflow body stays in the skill to keep it out of every
turn's context. Project-level, not user-level, because Cursor does not copy
`~/.cursor/skills/` into Cloud Agents. (Sources: cursor.com/docs/skills,
cursor.com/help/customization/skills)

**Decided:** The worklog is version-controlled markdown in the repo. Chat history is
not retrievable across sessions, and `.cursor/rules/20-eddie-context.mdc` requires
durable knowledge to live in a persistent store.

**Open:** Repository state observed for the record — `main` and `origin/main` are
both at `33f9df6` (2023-04-17), so this codebase has had no substantive work in
about three years; the only newer commit, `eac7a0b` (2023-12-01), is on
`origin/gh-pages`. There are no CI workflows and no merged PRs. The app is Create
React App plus an Express `server.js` (OpenAI, MongoDB via mongoose), run together
by `npm run dev`. No task has been chosen yet.
