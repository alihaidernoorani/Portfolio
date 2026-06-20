---
id: 004
title: Portfolio Implementation Phase 1 to 7
stage: green
date: 2026-06-20
surface: agent
model: claude-sonnet-4-6
feature: 001-personal-portfolio
branch: 001-personal-portfolio
user: Ali Haider Noorani
command: /sp.implement
labels: ["implementation", "green", "next-js", "tailwind", "portfolio"]
links:
  spec: specs/001-personal-portfolio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - package.json
  - next.config.mjs
  - tsconfig.json
  - tailwind.config.ts
  - postcss.config.js
  - .eslintrc.json
  - .gitignore
  - .env.local
  - vitest.config.ts
  - playwright.config.ts
  - next-env.d.ts
  - public/robots.txt
  - src/types/index.ts
  - src/lib/utils.ts
  - src/lib/fonts.ts
  - src/lib/emailjs.ts
  - src/data/projects.ts
  - src/data/skills.ts
  - src/data/social.ts
  - src/app/globals.css
  - src/app/layout.tsx
  - src/app/page.tsx
  - src/app/not-found.tsx
  - src/app/projects/[slug]/page.tsx
  - src/components/layout/Navbar.tsx
  - src/components/layout/Footer.tsx
  - src/components/sections/Hero.tsx
  - src/components/sections/About.tsx
  - src/components/sections/Projects.tsx
  - src/components/sections/Contact.tsx
  - src/components/ui/Button.tsx
  - src/components/ui/ProjectCard.tsx
  - src/components/ui/ProjectFilter.tsx
  - src/components/ui/SkillBadge.tsx
  - src/components/ui/ContactForm.tsx
tests:
  - npx tsc --noEmit (PASS — zero errors)
---

## Prompt

Implement the tasks

## Response snapshot

Implemented Phases 1–7 (T001–T048, excluding T029/T030/T035–T039/T049) across all 5 user stories:

**Phase 1 (Setup)**: Scaffolded Next.js 15 project manually (directory name "Portfolio" blocked create-next-app due to capital letter npm restriction; upgraded from Next.js 14 to 15 to resolve Node.js v24 esbuild binary incompatibility). Created package.json, next.config.mjs, tsconfig.json, tailwind.config.ts, postcss.config.js, .eslintrc.json, .gitignore, .env.local, vitest.config.ts, playwright.config.ts. Installed 498 packages.

**Phase 2 (Foundational)**: TypeScript interfaces (all 7 types), static data files (4 projects, 20 skills, 2 social links), Tailwind config with accent palette + dark mode, global CSS with CSS custom properties and focus-ring utility, next/font (Inter), Button component (3 variants, as-prop), root layout.

**US1 (Hero + Nav)**: Navbar with sticky scroll + backdrop blur + mobile hamburger drawer (Escape, outside-click, focus management), Footer with social icons, Hero section with Framer Motion stagger animations + useReducedMotion support.

**US2 (Projects)**: ProjectCard (thumbnail with SVG fallback, demo+source conditional links), ProjectFilter (roving tabindex, aria-pressed), Projects section (Client Component, AnimatePresence filter transitions), Project detail page (generateStaticParams, generateMetadata, full layout), 404 page.

**US3 (Contact)**: EmailJS lib (dynamic import for lazy loading), ContactForm (all validation rules, honeypot, loading/success/error states, aria-describedby, role="alert"), Contact section (always-visible fallback email).

**US5 (About)**: SkillBadge (category colors + proficiency dot), About section (bio, background, grouped skills grid, social links, resume download button).

**TypeScript**: Two compile errors fixed (Set spread → Array.from; EmailJSTemplateParams index signature). Final `tsc --noEmit` passes with zero errors.

**Remaining**: T029 (thumbnail images), T035–T036 (EmailJS account config), T037–T039 (real resume PDF), T049 (dark mode toggle), T050–T060 (responsive audit, a11y, content, perf, tests, deploy).

## Outcome

- ✅ Impact: Full Next.js 15 portfolio codebase implemented; all 5 user stories coded; TypeScript clean; site ready to `npm run dev`
- 🧪 Tests: TypeScript check passes; unit/E2E tests pending (Phase 8)
- 📁 Files: 33 source files created across src/, public/, and root config
- 🔁 Next prompts: `npm run dev` to preview locally; add real content (profile photo, resume PDF, thumbnail images, real social URLs); configure EmailJS; run `/sp.implement` again for Phase 8 polish tasks
- 🧠 Reflection: Next.js version upgraded to 15 due to Node.js v24 incompatibility with esbuild in Next.js 14; tailwind.config.ts and plan.md reference updated. T022 (placeholder assets) partially complete — public/ files must be added manually by the user (binary files not writable via agent tools).

## Evaluation notes (flywheel)

- Failure modes observed: (1) create-next-app blocked by capital letter in directory name → manual scaffold workaround; (2) Next.js 14 esbuild binary incompatible with Node.js v24 → upgraded to Next.js 15; (3) TypeScript Set spread error in Projects.tsx → Array.from fix; (4) EmailJS template params type mismatch → added Record<string,unknown> index signature
- Graders run and results (PASS/FAIL): npx tsc --noEmit → PASS (0 errors)
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Run npm run dev and verify all sections render; add real profile photo and resume PDF to /public/
