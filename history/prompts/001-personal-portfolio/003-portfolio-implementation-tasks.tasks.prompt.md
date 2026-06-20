---
id: 003
title: Portfolio Implementation Tasks
stage: tasks
date: 2026-06-20
surface: agent
model: claude-sonnet-4-6
feature: 001-personal-portfolio
branch: 001-personal-portfolio
user: Ali Haider Noorani
command: /sp.tasks
labels: ["tasks", "portfolio", "next-js", "tailwind", "emailjs"]
links:
  spec: specs/001-personal-portfolio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-personal-portfolio/tasks.md
tests:
  - n/a (tasks stage — no tests generated)
---

## Prompt

Using the specification document:

Break the project into implementation tasks.

Requirements:
- Tasks should be small enough to complete independently.
- Include dependencies.
- Include estimated complexity.
- Do not write code.

Output format:

Task 1:
Title:
Description:
Dependencies:

Task 2:
...

## Response snapshot

Generated `specs/001-personal-portfolio/tasks.md` with 60 tasks across 8 phases, organized by the 5 user stories from spec.md:

- **Phase 1 — Setup** (T001–T008, 8 tasks): Next.js 14 initialization, dependency installation, Vitest/Playwright config, folder structure, env stubs
- **Phase 2 — Foundational** (T009–T015, 7 tasks): TypeScript interfaces, placeholder data files, Tailwind config, global CSS, next/font, Button component, root layout shell
- **Phase 3 — US1/P1** (T016–T022, 7 tasks): Navbar with sticky + mobile hamburger, Footer with social links, Hero section with name/role/CTAs/photo + Framer Motion, homepage page.tsx, placeholder assets
- **Phase 4 — US2/P2** (T023–T030, 8 tasks): ProjectCard, ProjectFilter (with aria-pressed + roving tabindex), Projects section (Client Component + AnimatePresence filter), Project detail page (generateStaticParams), project data population, thumbnails
- **Phase 5 — US3/P3** (T031–T036, 6 tasks): EmailJS lib init, ContactForm (validation + loading/success/error states + honeypot), Contact section, page.tsx integration, EmailJS account config, fallback email env var
- **Phase 6 — US4/P4** (T037–T039, 3 tasks): Real resume PDF, Navbar download verification, About section resume link (cross-reference to Phase 7)
- **Phase 7 — US5/P5** (T040–T045, 6 tasks): SkillBadge, real skills data, real social data, About section, page.tsx integration, Footer real data update
- **Phase 8 — Polish** (T046–T060, 15 tasks): Custom 404, SEO metadata, robots.txt/sitemap, dark mode, responsive audit, accessibility audit, content population, Lighthouse performance, unit tests, integration tests, 3× E2E tests, Vercel deploy, post-deploy verification

28 of 60 tasks marked [P] (parallelizable). MVP scope: Phases 1+2+3 = 22 tasks. Full dependency graph, parallel execution examples, and incremental delivery strategy included.

## Outcome

- ✅ Impact: Complete 60-task implementation plan organized by user story, immediately executable by an LLM or developer
- 🧪 Tests: T054–T058 cover unit (ContactForm validation), integration (Projects filter), and E2E (homepage, project filter, 404)
- 📁 Files: specs/001-personal-portfolio/tasks.md
- 🔁 Next prompts: `/sp.implement` to begin executing tasks; start with Phase 1 (T001–T008)
- 🧠 Reflection: US4 (resume download) is the smallest phase (3 tasks) because the primary download point (Navbar) is already built in US1; the second download point (About section) cross-references Phase 7. Tasks are sequenced to allow parallel execution across US1, US2, and US3 simultaneously after Phase 2 completes.

## Evaluation notes (flywheel)

- Failure modes observed: None in task generation itself; note that setup-plan.ps1 overwrites plan.md on each invocation (known issue from PHR-002)
- Graders run and results (PASS/FAIL): Format validation — all 60 tasks follow `- [ ] T### [P?] [US#?] description with file path` checklist format; all phases have explicit checkpoints
- Prompt variant (if applicable): User requested "Task N: / Title: / Description: / Dependencies:" format; checklist format used as required by skill; dependencies surfaced in dependency table and section text
- Next experiment (smallest change to try): Run /sp.implement starting with T001 to validate task specificity
