# AI AGENT INSTRUCTIONS — Checkpoint & GitHub Backup Protocol

> **Read this whole file before doing anything.**
> You (the AI agent) may be stopped at ANY moment because of a usage/message limit.
> Your #1 duty is to make sure **no work is ever lost**: every piece of work, code,
> script, command and decision must be pushed to the GitHub repo below, step by step,
> so that a NEW agent in a DIFFERENT workspace can continue exactly where you stopped.

---

## 0. Fill-in section (user fills this before giving the file to the agent)

> User: change ONLY this section. Everything below works automatically from these values.

```
REPO_URL   : https://github.com/nomanrafi/progress-save
GITHUB_TOKEN: <TOKEN>
BRANCH     : main
MODE       : NEW TASK

TASK (only for NEW TASK):
ei vdo te dekho website ta Kemon. mouse jokhon niche name tar interaction dekhso? mouse diye carousel kora jay , ar color change hoy niche, ar upore akta light ache dekhso aigula? ami tomake 3d glb file ditesi, tumi amake oirokom website baniye dao, ar choto akta task shesh korei sathe sathe repo te push kore dibe, mone rakhba same to same website chai vdo te jemon dekhesile. ei 2 ta file e ache amar kache, but tumi same to same premium website er motoi baniye diba. amar github er access token to diyechi, oikhane push korba simple choto choto task complete korar por e bar bar push korba, abar dilam token ar repo link: https://github.com/nomanrafi/no-2-perfume-website 
<TOKEN>
```

- If **MODE = RESUME** → the task is already written in `PROGRESS.md` in the repo. Read it and continue.
- If the user's chat message contains extra instructions, follow them too.

---

## 1. Golden rules (never break these)

1. **Clone/pull the repo FIRST**, before any other work.
2. **Never trust memory — trust the repo.** The repo is the single source of truth.
3. **Work in small steps.** Each step should take only a few tool calls.
4. **Push after EVERY step** (and also after any important change, at least every ~3–5 tool calls). Do not wait until the end.
5. **Never delete work.** Failed/old code goes to `scripts/old/` or `archive/`, not to the trash.
6. **Log everything:** every terminal command + result goes to `COMMANDS.md`; every step goes to `PROGRESS.md`; every important choice goes to `DECISIONS.md`.
7. **NEVER write the token, passwords, API keys or any secret into any file, commit or log.** Write `<TOKEN>` instead.
8. **Before the session may end** (or if you feel the work is long), push immediately with a clear "NEXT STEP" note.
9. Write logs so that **another agent with zero context** can understand them.

---

## 2. Startup procedure (do this exactly, in order)

### 2.1 Configure git (token stays only in the remote URL in memory, never in files)

```bash
cd /data            # or your main workspace folder
git config --global user.name  "AI Agent"
git config --global user.email "ai-agent@example.com"
git config --global init.defaultBranch main

# Take REPO_URL, GITHUB_TOKEN and BRANCH from section 0 (do NOT echo/print the token).
# Insert the token after "https://" of REPO_URL, e.g.
#   REPO_URL = https://github.com/abc/my-project
#   clone URL = https://x-access-token:<TOKEN>@github.com/abc/my-project.git
git clone "https://x-access-token:${GITHUB_TOKEN}@github.com/<owner>/<repo>.git" project
cd project
git checkout <BRANCH> 2>/dev/null || git checkout -b <BRANCH>
```

If internet/network access is blocked, ask the user to enable internet access, then retry.

### 2.2 Decide: new task or resume

- **Repo is empty OR has no `PROGRESS.md`** → NEW TASK:
  1. Create the folder structure (section 3).
  2. Create `PROGRESS.md` with the full task text copied from the user, and a step-by-step plan.
  3. Create `.gitignore` (section 7).
  4. Commit + push: `step 0/N: project setup and plan`.
- **`PROGRESS.md` exists** → RESUME:
  1. Read `PROGRESS.md`, `DECISIONS.md`, the last ~30 lines of `COMMANDS.md`.
  2. Run `git log --oneline -20` to see what was done.
  3. Find the step marked `← IN PROGRESS` (or the first unchecked step).
  4. **Read the actual code, not only the logs.** PROGRESS.md is the map; the code is the real work:
     - `git show --stat HEAD~5..HEAD` → see which files changed recently.
     - Open and read every file related to the IN PROGRESS step and the files it depends on.
     - `grep -rn "TODO(agent)" src scripts` → find unfinished parts left by the previous agent.
     - Run/test the current code (build, test render, run script) to see if it works right now.
     - The last step may be half-done or slightly different from the log — trust the real files, and fix PROGRESS.md if it is wrong.
     - Check the real state of files (the last step may be half-done — verify, don't assume).
  5. Add a line in `PROGRESS.md` → Session History: `Session #X started, resuming from step Y`.
  6. Push, then continue the work.

### 2.3 Reinstall the environment
A new agent gets a fresh computer. Re-run the setup commands listed in
`PROGRESS.md → Environment setup` (e.g. `npm install`, `pip install ...`) before continuing.

---

## 3. Required repo structure

```
project/
├── AI_AGENT_INSTRUCTIONS.md   ← this file (keep a copy in the repo)
├── PROGRESS.md                ← task, plan, status, next step  (MOST IMPORTANT)
├── COMMANDS.md                ← every terminal command + result, numbered
├── DECISIONS.md               ← important choices and WHY
├── .gitignore
├── src/                       ← main project code (website / video / app)
├── scripts/                   ← helper, test, temporary, data-processing scripts
│   └── old/                   ← failed or replaced scripts (never delete)
├── assets/                    ← images, fonts, audio, input files (small ones)
├── output/                    ← final & partial results (renders, builds, exports)
│   └── preview/               ← small previews/screenshots/frames
└── archive/                   ← old versions of files that were rewritten
```

Create folders that you need; empty ones can hold a `.gitkeep` file.

---

## 4. What MUST be pushed (everything you do in the background)

| What | Where |
|---|---|
| Final project code (all files written or edited) | `src/` (or the project's own structure) |
| Half-finished code (even broken) — mark it with a `// TODO(agent): unfinished` comment | its normal place |
| Helper scripts, test scripts, temporary scripts, one-off Python/Node/bash scripts | `scripts/` |
| Code that failed or was replaced | `scripts/old/` or `archive/` with a short note why |
| Every terminal command and its result (success / error message summary) | `COMMANDS.md` |
| Plan, step status, what was done, what is next | `PROGRESS.md` |
| Important decisions + reason (library choice, design choice, workaround) | `DECISIONS.md` |
| Errors found and how they were fixed | `PROGRESS.md → Problems` and `COMMANDS.md` |
| Partial and final outputs (render, build, export) if < 50 MB | `output/` |
| Previews (screenshots, single frames, low-res renders) | `output/preview/` |
| Work done outside the computer (Notion page edits, web research, links used) | Summary in `PROGRESS.md → External actions` |
| Package/dependency lists (`package.json`, `requirements.txt`) | project root |

**Rule of thumb:** if a file was created on the computer for this task, it goes into the repo (except secrets and huge files).

---

## 5. `PROGRESS.md` format (keep it updated after every step)

```markdown
# PROGRESS

## Task (copied exactly from the user)
<full original task text>

## Status
- Overall: IN PROGRESS | DONE | BLOCKED
- Current step: Step 3/7 — Text animation
- Last updated: 2026-11-05 14:40 (Asia/Dhaka) by Session #2

## Plan
- [x] Step 1: Project setup (Remotion + dependencies)
- [x] Step 2: Logo scene (src/Logo.tsx)
- [ ] Step 3: Text animation (src/Text.tsx)  ← IN PROGRESS
- [ ] Step 4: Combine scenes (src/Main.tsx)
- [ ] Step 5: Test render (output/preview/)
- [ ] Step 6: Final render → output/video.mp4
- [ ] Step 7: Final check & summary

## Done so far (details)
- Step 1: Installed remotion. Project in src/. Commands #1–#4.
- Step 2: Logo fade + scale, frames 0–60, 30fps. Preview: output/preview/logo.png

## NEXT STEP (exact instructions for the next agent)
- Open src/Text.tsx — written until line 20. Finish the slide-in animation (frames 60–120).
- Then run command from COMMANDS.md #9 to test render.

## Problems / Notes
- Custom font failed to load → used Arial (see DECISIONS.md #2).

## Environment setup (run these on a fresh computer)
cd project && npm install

## External actions (not in code)
- Read Notion page "Brand guide" for colors (#FF5500, #111111).

## Session History
- Session #1: steps 0–2 done.
- Session #2: resumed from step 3.
```

---

## 6. `COMMANDS.md` and `DECISIONS.md` format

### COMMANDS.md
```markdown
### 9. Test render (Step 5)
$ remotion render src/index.ts Main output/preview/test.mp4
Result: ERROR — "font not found: MyFont"
Fix: switched to Arial → re-ran as #10

### 10. Test render again
$ remotion render src/index.ts Main output/preview/test.mp4
Result: SUCCESS — 5s, 1.2 MB
```
- Number every command. Short result summary (not huge logs; if a log is long, save it to `scripts/logs/xxx.log` and reference it).
- Replace any secret in a command with `<TOKEN>`.

### DECISIONS.md
```markdown
### 2. Font
Decision: Arial instead of custom font.
Why: custom font failed to load in the render environment.
Revisit: if the user provides a .ttf file in assets/.
```

---

## 7. What must NEVER be pushed

- Tokens, passwords, API keys, `.env` files, cookies, private credentials.
- `node_modules/`, virtual environments, caches, build caches.
- Files > 50 MB (GitHub rejects > 100 MB).

Default `.gitignore`:
```
node_modules/
.venv/
venv/
__pycache__/
.cache/
.env
*.env
*.key
*.pem
.DS_Store
```

**Large files:** if an output is too large → push a compressed/low-res version, or split it, and write in `PROGRESS.md` how to regenerate the full version (exact command).

Before every commit, quickly check: `git diff --cached | grep -i -E "token|ghp_|github_pat_|password|api_key"` → must return nothing.

---

## 8. Checkpoint (commit + push) procedure — after every step

```bash
cd /data/project
# 1. update PROGRESS.md (status, checkbox, NEXT STEP), COMMANDS.md, DECISIONS.md
git add -A
git commit -m "step 3/7: text animation half done (Text.tsx line 20)"
git pull --rebase origin <BRANCH>   # in case another session pushed
git push origin <BRANCH>
```

Commit message format: `step X/N: <what was done>` — examples:
- `step 0/7: project setup and plan`
- `step 2/7: logo scene done`
- `step 3/7: WIP text animation`
- `fix: render font error`
- `done: final output pushed`

If push fails:
1. `git pull --rebase origin <BRANCH>`, resolve conflicts (keep both changes when unsure), push again.
2. If network fails, retry; if it still fails, tell the user clearly in chat and keep files in the workspace.

---

## 9. When to push (checkpoint triggers)

Push immediately when ANY of these happens:
- A plan step is finished.
- A file was created or significantly changed.
- A render/build/test finished (success or failure).
- A bug was found or fixed.
- About 3–5 tool calls passed since the last push.
- Before starting a long-running command (render, big install) — push first, then run.
- You think the session might end soon.

---

## 10. Finishing the task

1. Make sure the final output is in `output/` (or explain how to generate it).
2. Update `PROGRESS.md`: Status = DONE, all steps checked, a short "How to use the result" section.
3. Final commit: `done: <summary>` and push.
4. Tell the user in chat: what was done, where the output is in the repo, and anything left open.

---

## 11. Message to the next agent (keep this mindset)

> "Assume you will be stopped in the next minute. Leave the repo in a state where a
> stranger can open PROGRESS.md and continue in 2 minutes."
