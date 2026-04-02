---
name: absorb
description: Extract selective value from an external resource (a skill file, a website, a document, a value proposition, a competitor feature, a framework, a methodology) and integrate only the valuable parts into the current project or codebase. Use this skill when the user says things like "absorb this", "learn from this", "extract what's useful from", "compare this to what we have", "upgrade from this resource", "integrate the good parts of", or hands over any artifact they want to mine for value. The skill performs a structured diff between the external resource and the current state, presents the delta as explicit choices, and applies only what the user approves. Never absorb wholesale — always curate first.
---

# Absorb

The philosophy: external resources rarely deserve 100% adoption. They contain gold, noise, and things you already do better. The job is to separate the three, present the delta clearly, and let the human decide what to keep.

## The Four Phases

### Phase 1 — Ingest the Resource

Read whatever was provided:
- A file, URL, or pasted content (skill, doc, competitor site, methodology, spec)
- The current project state (read relevant files, ask if unclear)

If the current state is ambiguous, ask one focused question: *"What should I compare this against — a specific file, the whole project, or a concept?"* Don't proceed until you know both sides of the comparison.

### Phase 2 — Extract & Map Differences

Analyze both sides. Produce a **delta map**: a structured list of meaningful differences. For each difference, classify it:

| Class | Meaning |
|---|---|
| 🟢 **Net new** | Resource has something current state lacks entirely |
| 🔵 **Better approach** | Resource handles something differently — potentially superior |
| 🟡 **Overlap** | Both cover this, roughly equivalent |
| 🔴 **Already stronger** | Current state does this better — resource would be a downgrade |
| ⚪ **Irrelevant** | Resource covers something out of scope |

Only surface 🟢 and 🔵 items for decision. Suppress 🟡, 🔴, ⚪ unless the user asks for the full picture.

**Keep the delta map tight.** Don't list 15 things — if there are many, group by theme and ask which themes matter before drilling into specifics.

### Phase 3 — Present Choices

For each 🟢 and 🔵 item, present it as an explicit choice. Format:

---

**[#N] [Short label]** — `🟢 net new` or `🔵 better approach`

> **From resource:** [1–2 sentence description of what the resource does/says]
> **Current state:** [1–2 sentence description of the current approach, or "not addressed"]
> **Why it might matter:** [1 sentence on the potential value]

**Keep / Skip / Adapt?**

---

List all choices first, then ask: *"Which of these do you want to absorb? You can say 'keep all', pick numbers, or say 'adapt #3' to modify before applying."*

Don't apply anything until you have explicit approval.

### Phase 4 — Implement Approved Changes

For each approved item:
1. Apply the change (edit files, update config, rewrite a section)
2. Call out what you changed and where
3. If "Adapt" was chosen, show the adapted version before writing and get a quick confirmation

After all changes are applied, give a brief **absorption summary**:
- What was absorbed (N items)
- What was skipped and why (one line)
- Whether anything from the current state was reinforced as stronger (optional, if relevant)

---

## Guiding Principles

**Curate, don't copy.** The goal is selective import, not wholesale replacement. If the resource is 80% noise, the output should reflect that — absorbing 2 things from a 20-page doc is a success.

**Be explicit about tradeoffs.** When something is 🔵 "better approach", say honestly why it might be better AND what would be lost or changed by switching.

**Respect what exists.** 🔴 items (current state is stronger) should be named — it validates the existing work and prevents regression.

**Stay in scope.** If the resource covers things outside the current project's domain, mark them ⚪ and don't surface them as decisions. Ask if scope is unclear.

**One decision at a time.** Don't overwhelm. If there are more than ~7 delta items, group or prioritize before presenting all choices.

---

## Edge Cases

**Resource is another skill:**
Compare the skill's approach, philosophy, and specific instructions against the current skill. Surface differences in methodology, not just wording.

**Resource is a website or competitor product:**
Focus on features, patterns, or copy angles — not implementation. Delta map should be conceptual ("their onboarding flow does X") not technical unless the project is a product.

**Resource is a value proposition / positioning doc:**
Compare messaging angles, audience framing, differentiators. Delta is about narrative and emphasis, not features.

**Resource and current state are in different formats:**
Abstract to intent before comparing. A JSON config and a markdown doc can both express the same concept — compare the concept, not the syntax.

**No current state exists yet:**
If the project is blank, absorb becomes a filtered import. Still classify and curate — don't recommend adopting parts that are out of scope or low-value just because there's nothing to conflict with.
