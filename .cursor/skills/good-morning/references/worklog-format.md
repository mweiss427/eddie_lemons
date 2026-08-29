# Worklog format

`docs/eddie/worklog.md` is the durable session record read by the `good-morning`
skill. It is **Memory** in the sense of `.cursor/rules/20-eddie-context.mdc`:
version-controlled, curated, and carrying provenance — not a chat log.

## Structure

```markdown
# Eddie — Worklog

<one-paragraph note explaining what the file is and how to maintain it>

## Open threads

- **<short name>** — <state in one sentence>. <provenance>
- ...

---

## YYYY-MM-DD — <session title>

**Did:** <what actually happened, with commit/PR/file provenance>

**Decided:** <decision> — <why>. (omit the section if nothing was decided)

**Open:** <what is unfinished and what the next concrete step is>
```

## Rules

- Newest entry directly under the `---` separator; older entries below it.
- **Open threads** at the top is the live list the next session reads first. Keep it
  short and current: prune closed items, do not archive them.
- Every durable claim names its source — a commit hash, PR number, file path,
  command output, or "operator stated".
- No transient state, no dead hypotheses, no restating the conversation.
- One entry per session, and only when something durable happened.
