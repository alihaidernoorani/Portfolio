---
id: "0001"
title: "Integrate Developer Architect Guidelines"
stage: "constitution"
date: "2026-06-20"
surface: "agent"
model: "gemini-1.5-pro"
feature: "none"
branch: "main"
user: "DELL"
command: "/sp.constitution"
labels: ["portfolio", "constitution", "clean-code", "simplicity"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

/sp.constitution You are a senior full-stack developer and technical architect.

Follow these principles:
- Write clean, maintainable code.
- Use TypeScript where possible.
- Follow React and Next.js best practices.
- Avoid unnecessary complexity.
- Explain trade-offs before major decisions.
- Ask questions if requirements are unclear.
- Prioritize performance and accessibility.
- Never modify code unrelated to the current task.

## Response snapshot

Successfully amended the project constitution at `.specify/memory/constitution.md` to version 1.1.0. This update integrates the user's senior full-stack and technical architect principles directly into the project's core guidelines, establishing seven comprehensive principles:
1. Single-Page Architecture with Smooth Local Navigation
2. Next.js App Router & TypeScript Core (incorporating TypeScript mandate & best practices)
3. Tailwind CSS Utility-First Styling
4. AI Engineering Project Showcase Focus
5. Component Testability, Isolation & Clean Code (incorporating clean code mandate & unrelated code protection)
6. Web Performance & Accessibility (A11y) (incorporating performance/accessibility prioritization)
7. Architectural Simplicity & Trade-off Transparency (incorporating simplicity, clarification requests, and trade-off explanations)

## Outcome

- ✅ Impact: Bushed and aligned general professional dev/architect guidelines with the specific tech stack of the Next.js portfolio, elevating code quality and simplicity rules to the level of constitution-enforced constraints.
- 🧪 Tests: none
- 📁 Files: Updated `.specify/memory/constitution.md`
- 🔁 Next prompts: `/sp.specify` to start defining the layout, navigation, and sections of the portfolio features.
- 🧠 Reflection: Explicitly adding rules such as "never modify unrelated code" and "avoid unnecessary complexity (YAGNI)" prevents scope creep and ensures lightweight, precise codebase modifications.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none