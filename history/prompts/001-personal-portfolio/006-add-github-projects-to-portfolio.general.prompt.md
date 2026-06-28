---
id: 006
title: Add GitHub Projects to Portfolio
stage: general
date: 2026-06-26
surface: agent
model: claude-sonnet-4-6
feature: personal-portfolio
branch: fix/trim-project-descriptions
user: Ali Haider Noorani
command: "Is it possible for you to peruse through my github repository and add all the cool projects that I have made to my portfolio?"
labels: ["projects","github","portfolio","ai-agent","python","categories"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/types/index.ts
  - src/components/ui/ProjectFilter.tsx
  - src/components/ui/ProjectCard.tsx
  - src/data/projects.ts
tests:
  - npx tsc --noEmit (PASS)
---

## Prompt

Is it possible for you to peruse through my github repository and add all the cool projects that I have made to my portfolio?

(Follow-up): Add Tier 1, 2 and 3. Can you also make different tags for each type of project so that it is easier to see, distinguish and sort between the types of projects?

## Response snapshot

Fetched all 49 GitHub repos for alihaidernoorani via `gh repo list`. Curated projects into tiers, inspected READMEs and source code for key projects, then:

1. Added two new `ProjectCategory` values — `'ai-agent'` (violet badge) and `'python'` (emerald badge) — to the type system, filter labels, and card color map.
2. Added 8 new projects to `src/data/projects.ts`:
   - **Personal AI Employee** (ai-agent, featured) — Claude Code + Obsidian autonomous FTE
   - **Poetry Analysis Agent** (ai-agent) — multi-agent orchestration with handoffs
   - **Crypto Currency Agent** (ai-agent) — Binance API live prices
   - **Shopping Assistant Agent** (ai-agent) — product catalog NL search
   - **Weather AI Agent** (ai-agent) — Weatherstack API conversational agent
   - **Translator Agent** (ai-agent) — NL translation agent
   - **Password Strength Checker & Generator** (python) — Streamlit security tool
   - **File Converter & Data Cleaner** (python) — Streamlit CSV/Excel converter

## Outcome

- ✅ Impact: Portfolio grows from 3 to 11 projects with two new filterable categories
- 🧪 Tests: TypeScript type check passes (no errors)
- 📁 Files: 4 files modified
- 🔁 Next prompts: Add thumbnail images for new projects; consider adding Hospital Management System or resume builder projects
- 🧠 Reflection: Many repos lacked READMEs so code was inspected directly; Growth-Mindset-Challenge repo actually contained a File Converter app (repo name did not match app title)

## Evaluation notes (flywheel)

- Failure modes observed: Several repos had no README or description; base64 decoding of GitHub API content required cleaning newlines first
- Graders run and results (PASS/FAIL): tsc --noEmit PASS
- Prompt variant (if applicable): null
- Next experiment: Add project screenshots/thumbnails for the new entries
