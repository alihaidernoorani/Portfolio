---
id: 002
title: Portfolio Architecture Plan
stage: plan
date: 2026-06-20
surface: agent
model: claude-sonnet-4-6
feature: 001-personal-portfolio
branch: 001-personal-portfolio
user: Ali Haider Noorani
command: /sp.plan
labels: ["plan", "architecture", "portfolio", "next-js", "tailwind"]
links:
  spec: specs/001-personal-portfolio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-personal-portfolio/plan.md
  - specs/001-personal-portfolio/research.md
  - specs/001-personal-portfolio/data-model.md
  - specs/001-personal-portfolio/quickstart.md
  - specs/001-personal-portfolio/contracts/emailjs-contract.md
  - CLAUDE.md
tests:
  - n/a (plan stage — no tests generated)
---

## Prompt

Using the approved specification and constitution:

Create a detailed implementation plan.

Requirements:

1. Do NOT write code.
2. Define the overall architecture.
3. Explain major technical decisions.
4. Describe component hierarchy.
5. Define data flow.
6. Identify risks and mitigation strategies.
7. Explain trade-offs for important decisions.
8. Verify compliance with the constitution.

Output Format:

# Architecture Overview

# Component Structure

# Routing Strategy

# State Management Strategy

# Styling Strategy

# Performance Considerations

# Accessibility Considerations

# Risks & Mitigations

# Constitution Compliance Check

## Response snapshot

Produced a complete architecture plan at `specs/001-personal-portfolio/plan.md` covering:

**Architecture Overview**: Next.js 14 SSG frontend-only site on Vercel; single runtime network call (EmailJS); system diagram included; all 8 major technology decisions documented with rationale table.

**Component Structure**: Full component hierarchy tree from `app/layout.tsx` down; component classification table (Server vs Client) with reasoning; shared UI component prop signatures.

**Routing Strategy**: Route map (/, /projects/[slug], 404); `generateStaticParams` for project detail pages; single-page scroll navigation rationale and trade-off discussion.

**State Management**: Minimal local state only (5 state items across 3 client components); data flow diagrams; no global state library justified.

**Styling Strategy**: Tailwind utility-first; design token strategy; responsive breakpoints (320px–2560px); Framer Motion animation approach with `prefers-reduced-motion` compliance.

**Performance Considerations**: Build-time optimizations (SSG, next/image, next/font, CSS purging, code splitting); runtime optimizations (minimal client components, lazy EmailJS load); performance budget table (FCP < 1.5s, LCP < 2.5s, CLS < 0.1, Lighthouse ≥ 90).

**Accessibility Considerations**: WCAG 2.1 AA target; semantic HTML, image alt text, form label strategy, keyboard navigation patterns, color contrast requirements, screen reader announcements.

**Risks & Mitigations**: 6 risks identified (EmailJS free tier, stale resume PDF, missing thumbnails, public credentials, Next.js version drift, content readiness) each with probability/impact and concrete mitigation.

**Constitution Compliance**: 7 gates evaluated, all PASS. ADR suggestion raised for contact form delivery strategy.

Supporting artifacts created: research.md (7 technology decisions), data-model.md (5 entities with TypeScript interfaces), contracts/emailjs-contract.md, quickstart.md (10-step setup guide). Agent context updated in CLAUDE.md.

## Outcome

- ✅ Impact: Complete architecture plan for the personal portfolio; all sections in the requested format; ready for task generation
- 🧪 Tests: No tests at plan stage
- 📁 Files: plan.md, research.md, data-model.md, quickstart.md, contracts/emailjs-contract.md, CLAUDE.md
- 🔁 Next prompts: `/sp.tasks` to generate ordered implementation task list; `/sp.adr contact-form-delivery-strategy` (optional, for ADR on no-backend decision)
- 🧠 Reflection: Constitution is unpopulated placeholder — architectural gates defaulted to standard web best practices. Running `/sp.constitution` before next feature is advised.

## Evaluation notes (flywheel)

- Failure modes observed: setup-plan.ps1 overwrites plan.md each time it runs — previous plan content was lost on second invocation; file was rewritten from scratch as workaround
- Graders run and results (PASS/FAIL): Constitution compliance — 7/7 PASS
- Prompt variant (if applicable): Second invocation of /sp.plan; first was interrupted; second had more specific output format requirements
- Next experiment (smallest change to try): Guard setup-plan.ps1 against overwriting existing plan.md content (or back up before overwrite)
