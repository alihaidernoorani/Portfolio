# Tasks: Personal Portfolio Website

**Input**: Design documents from `/specs/001-personal-portfolio/`  
**Prerequisites**: plan.md âœ… | spec.md âœ… | research.md âœ… | data-model.md âœ… | contracts/ âœ… | quickstart.md âœ…

**Tech Stack**: Next.js 14 (App Router) Â· TypeScript 5.x Â· Tailwind CSS 3 Â· Framer Motion Â· EmailJS  
**Path Convention**: Web application â€” `src/` at repository root Â· `public/` for static assets Â· `tests/` for all test files

**Tests**: Not included as separate phases (not requested in spec). Testing tasks appear in the Polish phase only.

**User Stories from spec.md**:
- **US1** (P1): First Impression & Professional Assessment
- **US2** (P2): Projects Exploration
- **US3** (P3): Contact Initiation
- **US4** (P4): Resume/CV Download
- **US5** (P5): About & Background Discovery

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Next.js project, install all dependencies, and create the folder skeleton.  
**Prerequisite**: Node.js 20 LTS, npm 10+ installed. See `quickstart.md` for full setup guide.

- [x] T001 Initialize Next.js 14 App Router project at repository root with TypeScript, Tailwind CSS, ESLint, and src-dir layout: `npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- [x] T002 Install additional runtime dependencies: `framer-motion @emailjs/browser`
- [x] T003 [P] Install dev/test dependencies: `vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @playwright/test`
- [x] T004 [P] Create source folder structure: `src/components/layout/`, `src/components/sections/`, `src/components/ui/`, `src/data/`, `src/lib/`, `src/types/`, `public/images/projects/`, `tests/unit/`, `tests/integration/`, `tests/e2e/`
- [x] T005 [P] Create `src/lib/utils.ts` exporting a `cn(...classes)` helper for conditional Tailwind class merging (uses `clsx` or simple string join)
- [x] T006 [P] Create `.env.local` at repository root with stubs for all required environment variables (`NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`, `NEXT_PUBLIC_CONTACT_EMAIL`); add `.env.local` to `.gitignore`
- [x] T007 [P] Create `vitest.config.ts` configuring jsdom environment, React plugin, and path aliases matching `tsconfig.json`
- [x] T008 [P] Create `playwright.config.ts` targeting `http://localhost:3000`, configuring Chromium + Firefox + WebKit browsers, and pointing to `tests/e2e/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define all data shapes, configure the visual system, and create the root layout shell. MUST be complete before any user story phase begins.

**âš ï¸ CRITICAL**: All user story phases depend on this phase being complete.

- [x] T009 Create all TypeScript interfaces in `src/types/index.ts`: `Project`, `ProjectLinks`, `ProjectCategory` (union type), `Skill`, `SkillCategory` (union type), `ContactMessage`, `SocialLink`, `NavItem` â€” exact shapes from `data-model.md`
- [x] T010 [P] Create placeholder static data files: `src/data/projects.ts` exporting `projects: Project[]` with 2 placeholder entries; `src/data/skills.ts` exporting `skills: Skill[]` with 4 placeholder entries; `src/data/social.ts` exporting `socialLinks: SocialLink[]` with LinkedIn and GitHub placeholder entries â€” all typed against `src/types/index.ts`
- [x] T011 [P] Configure `tailwind.config.ts`: extend theme with one primary accent color, neutral gray scale, and custom font family; set `darkMode: 'class'`; confirm `content` paths cover `src/**/*.{ts,tsx}`
- [x] T012 [P] Write `src/app/globals.css` with Tailwind `@base`, `@components`, `@utilities` directives; add `scroll-behavior: smooth` on `html`; define CSS custom properties for the color scheme (light and dark values)
- [x] T013 [P] Configure `next/font` in `src/lib/fonts.ts` loading the chosen typeface (e.g., Inter) with `display: 'swap'` and subset `latin`; export the font variable for use in `layout.tsx`
- [x] T014 [P] Implement `Button` component in `src/components/ui/Button.tsx` supporting: `variant` prop (`primary | secondary | ghost`), `as` prop (`'button' | 'a'`), `href`, `download`, `disabled`, and `children`; all variants have visible focus ring styles
- [x] T015 Create root layout at `src/app/layout.tsx`: import font variable from `src/lib/fonts.ts`, import `globals.css`, apply font class to `<html>`, render `<Navbar />` + `{children}` + `<Footer />` shell with correct `<html lang="en">` and viewport meta; Navbar and Footer are empty placeholder components for now

**Checkpoint**: Foundation ready â€” all types defined, visual system configured, layout shell renders, placeholder data files in place.

---

## Phase 3: User Story 1 â€” First Impression & Professional Assessment (Priority: P1) ðŸŽ¯ MVP

**Goal**: A visitor arriving at the homepage immediately sees the owner's name, professional role, value proposition, and CTAs â€” delivering the full first-impression without any other section.

**Independent Test**: Open `http://localhost:3000/` in a browser. Within 10 seconds (no scrolling), you can read the owner's name, role, a one-sentence tagline, and two prominent CTA buttons. Profile photo is visible. Navbar shows all section links and a Resume download link.

- [x] T016 [US1] Implement `Navbar` component in `src/components/layout/Navbar.tsx`: render owner name/logo on the left; section anchor links (`#hero`, `#about`, `#projects`, `#contact`) on the right; a "Resume" link using `<a href="/resume.pdf" download aria-label="Download resume PDF">`; sticky positioning with `position: sticky; top: 0`; backdrop blur class on scroll (via scroll event listener setting a state class); full keyboard navigability with visible focus indicators
- [x] T017 [P] [US1] Add mobile hamburger menu to `src/components/layout/Navbar.tsx`: hamburger icon button visible below `md` breakpoint; toggleable drawer showing all nav links vertically; close on nav-link click, on outside click, or on Escape key press; focus trap while drawer is open using `aria-modal` and managing tabindex
- [x] T018 [P] [US1] Implement `Footer` component in `src/components/layout/Footer.tsx`: LinkedIn and GitHub `<a>` links from `src/data/social.ts` with `aria-label="[Name] on [Platform]"` and SVG icons; copyright line with `new Date().getFullYear()`; "Back to top" anchor link to `#hero`; responsive layout
- [x] T019 [US1] Implement `Hero` section in `src/components/sections/Hero.tsx`: `<h1>` with owner full name; `<p>` with professional role/title as subheading; one-sentence value proposition text; two `Button` components ("View My Work" linking to `#projects`, "Contact Me" linking to `#contact`); profile photo via `<Image>` from `next/image` with `alt="[Owner name], [role]"` and `priority` prop; section `id="hero"`
- [x] T020 [US1] Update `src/app/page.tsx` to render `<Hero />` as the first and only section for now â€” homepage is live with a complete first impression
- [x] T021 [US1] Add Framer Motion entrance animation to `src/components/sections/Hero.tsx`: wrap content in `motion.div` with `initial={{ opacity: 0, y: 20 }}` â†’ `animate={{ opacity: 1, y: 0 }}`; check `useReducedMotion()` and skip animation if true; stagger text elements with `delay` variants
- [x] T022 [US1] Place `public/resume.pdf` (placeholder or real PDF) and `public/images/profile.jpg` (placeholder or real photo) in `/public/`; manually test the Navbar resume link triggers a file download

**Checkpoint**: US1 complete. Visiting `/` shows name, role, tagline, CTA buttons, profile photo, and Navbar with resume download. All navigable by keyboard. Mobile hamburger works.

---

## Phase 4: User Story 2 â€” Projects Exploration (Priority: P2)

**Goal**: A visitor can browse all portfolio projects, filter by category, and click into a detail page for any project â€” without needing any other section to be present.

**Independent Test**: Navigate to `http://localhost:3000/#projects`. See a grid of project cards with thumbnails, titles, and category badges. Click a category filter button â€” only matching cards appear without page reload. Click a project card â€” navigate to `/projects/[slug]` and see full description, challenge, tech labels, and demo/source links. Click "Back" â€” return to `/#projects`.

- [x] T023 [P] [US2] Implement `ProjectCard` component in `src/components/ui/ProjectCard.tsx`: thumbnail via `<Image>` with `alt="Screenshot of [project.title]"` and `onError` fallback to a branded SVG placeholder; `<h3>` title linked to `/projects/[slug]`; `shortDescription`; category badge (styled `<span>`); `techLabels` as a horizontal list of small tags; conditional "Demo" and "Source" links rendered only when `links.demo` or `links.source` are present; hover/focus card lift animation via Tailwind `transition hover:shadow-lg hover:-translate-y-1`
- [x] T024 [P] [US2] Implement `ProjectFilter` component in `src/components/ui/ProjectFilter.tsx`: receive `categories: ProjectCategory[]`, `active: ProjectCategory | 'all'`, and `onChange: (cat) => void` props; render "All" button plus one button per category; apply active styling class when selected; set `aria-pressed={active === cat}` on each button; support arrow-key navigation within the group (roving tabindex pattern)
- [x] T025 [US2] Implement `Projects` section in `src/components/sections/Projects.tsx` as a Client Component (`"use client"`): import `projects` from `src/data/projects.ts`; derive `categories` from unique project categories; manage `activeCategory` state (default `'all'`); derive `filteredProjects` array; render `<ProjectFilter>` + grid of `<ProjectCard>` components; add Framer Motion `AnimatePresence` around cards with stagger `variants` so filtered-out cards animate out and new ones stagger in; section `id="projects"` with a visible `<h2>` heading
- [x] T026 [US2] Add `<Projects />` section to `src/app/page.tsx` below `<Hero />`
- [x] T027 [US2] Implement Project detail page at `src/app/projects/[slug]/page.tsx`: export `generateStaticParams()` mapping all project slugs from `src/data/projects.ts`; export `generateMetadata()` returning per-project title and description; page body renders: large thumbnail, `<h1>` title, `fullDescription`, "The Challenge" section with `challenge` text, tech labels as styled badges, demo and source link buttons (conditional), and a `â† Back to Projects` link pointing to `/#projects`
- [x] T028 [US2] Populate `src/data/projects.ts` with at least 3 real (or realistic placeholder) project entries covering at least 2 different `ProjectCategory` values to make the filter demonstrable; each entry must have a valid `slug`, `thumbnail` path, and at least one link (`demo` or `source`)
- [ ] T029 [US2] Add project thumbnail images to `public/images/projects/` with filenames matching each project's `thumbnail` field value; recommended 800Ã—500px dimensions
- [ ] T030 [US2] Verify ProjectCard `onError` fallback renders a branded SVG placeholder when a thumbnail file is missing; verify filter shows "All" selected by default and correct subset on category click; verify detail page link and back link work end-to-end

**Checkpoint**: US2 complete. Projects grid visible at `/#projects`, filtering works client-side, detail page renders at `/projects/[slug]`, back navigation works.

---

## Phase 5: User Story 3 â€” Contact Initiation (Priority: P3)

**Goal**: A visitor can fill in and submit a contact form; the portfolio owner receives the message as an email; the visitor sees clear confirmation or error feedback.

**Independent Test**: Navigate to `http://localhost:3000/#contact`. Fill in all fields with valid data and submit â€” see a success confirmation message and verify an email arrives in the owner's inbox. Submit with invalid/empty fields â€” see inline error messages below each field, with entered values retained. Kill network access and submit â€” see an error message with a clickable mailto fallback email.

- [x] T031 [P] [US3] Initialize EmailJS in `src/lib/emailjs.ts`: call `emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)` and export a typed `sendContactMessage(params: EmailJSTemplateParams): Promise<void>` function wrapping `emailjs.send()` â€” shapes match `contracts/emailjs-contract.md`
- [x] T032 [US3] Implement `ContactForm` component in `src/components/ui/ContactForm.tsx` as a Client Component (`"use client"`): four controlled fields (name, email, subject, message) with associated `<label>` elements; `onSubmit` runs client-side validation per rules in `data-model.md` before any network call; display inline error `<span>` beneath each invalid field linked via `aria-describedby`; on valid submit, call `sendContactMessage()`, set `status = 'loading'` disabling the submit button, then set `status = 'success'` or `'error'`; success state renders a confirmation message; error state renders error text + `<a href="mailto:[FALLBACK_EMAIL]">` using `NEXT_PUBLIC_CONTACT_EMAIL`; include a hidden honeypot `<input tabIndex={-1} aria-hidden="true">` field; form errors use `role="alert"` for screen reader announcement
- [x] T033 [US3] Implement `Contact` section in `src/components/sections/Contact.tsx`: section `id="contact"` with `<h2>` heading; brief invitation text ("Get in touch" etc.); render `<ContactForm />`; statically display the fallback email address as a `mailto:` link below the form (always visible, not only on error)
- [x] T034 [US3] Add `<Contact />` section to `src/app/page.tsx` below `<Projects />`
- [ ] T035 [US3] Configure EmailJS account: create service connected to owner's email provider, create email template with `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}` variables, set allowed origins to the production domain; update `.env.local` with real `SERVICE_ID`, `TEMPLATE_ID`, and `PUBLIC_KEY`
- [ ] T036 [US3] Set `NEXT_PUBLIC_CONTACT_EMAIL=nooranialihaider@gmail.com` in `.env.local`; verify the fallback `mailto:` link and error-state link both render with the correct address

**Checkpoint**: US3 complete. Contact form validates client-side, sends email via EmailJS, shows success/error states, fallback email always visible.

---

## Phase 6: User Story 4 â€” Resume/CV Download (Priority: P4)

**Goal**: A visitor can download the owner's resume PDF in a single click from at least two locations on the site.

**Independent Test**: From any page, click the "Resume" link in the Navbar â€” browser downloads `resume.pdf`. Navigate to the About section (or current page if About not yet added) and find a second download link â€” clicking it also downloads `resume.pdf`. Neither link requires login or any form submission.

- [ ] T037 [US4] Replace placeholder `public/resume.pdf` with the real resume PDF file; verify file is under 5MB and opens correctly in a PDF viewer
- [ ] T038 [US4] Confirm `Navbar` resume link (T016) has `download` attribute and `aria-label="Download resume PDF"`; manually verify it downloads (not navigates) in Chrome, Firefox, and Safari
- [ ] T039 [US4] Add a second resume download link inside `src/components/sections/About.tsx` (created in Phase 7 but reserved here): a `<Button as="a" href="/resume.pdf" download variant="secondary">Download Resume</Button>` placed below the bio paragraph, satisfying SC-005 (2+ locations)

**Note**: T039 is authored here for traceability but must be implemented after T045 (About section) in Phase 7.

**Checkpoint**: US4 complete. Resume downloadable from Navbar + About section without login. Two distinct download points confirmed.

---

## Phase 7: User Story 5 â€” About & Background Discovery (Priority: P5)

**Goal**: A visitor can read the owner's personal bio, professional background, a grouped skills grid, and reach LinkedIn and GitHub profiles â€” all from a single section.

**Independent Test**: Navigate to `http://localhost:3000/#about`. Read the bio paragraph and background summary. See skills organized by category (languages, frameworks, tools, etc.). Find LinkedIn and GitHub links and confirm they open the correct profiles in a new tab. Find a resume download link.

- [x] T040 [P] [US5] Implement `SkillBadge` component in `src/components/ui/SkillBadge.tsx`: renders `skill.name` inside a rounded pill; applies a category-specific background color using a Tailwind class map; optionally renders a proficiency dot/label if `skill.proficiency` is set
- [x] T041 [P] [US5] Populate `src/data/skills.ts` with real skills: at least 5 per category for the owner's primary categories (language, framework, tool); include `proficiency` for at least 3 skills
- [x] T042 [P] [US5] Populate `src/data/social.ts` with real LinkedIn URL (`https://linkedin.com/in/[username]`) and GitHub URL (`https://github.com/[username]`); write descriptive `label` strings for aria-label use
- [x] T043 [US5] Implement `About` section in `src/components/sections/About.tsx`: section `id="about"` with `<h2>` heading; owner bio paragraph (authored as a string constant in the component or passed from page.tsx); professional background summary paragraph; skills grid â€” import `skills` from `src/data/skills.ts`, group by `category` using a helper from `src/lib/utils.ts`, render category heading + row of `<SkillBadge>` per group; LinkedIn and GitHub `<a>` links from `src/data/social.ts` with icons and `aria-label`; resume `<Button download>` link (fulfilling T039)
- [x] T044 [US5] Add `<About />` section to `src/app/page.tsx` between `<Hero />` and `<Projects />` (reflecting the natural homepage scroll order: Hero â†’ About â†’ Projects â†’ Contact)
- [x] T045 [US5] Update `Footer` component (`src/components/layout/Footer.tsx`) to read real LinkedIn and GitHub URLs from `src/data/social.ts` instead of hardcoded placeholder values (data from T042 is now real)

**Checkpoint**: US5 complete. About section visible at `/#about` with real bio, grouped skills, LinkedIn/GitHub links, and resume download.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Quality, performance, accessibility, SEO, dark mode, tests, and deployment. These tasks cut across all user stories.

- [x] T046 [P] Implement custom 404 page at `src/app/not-found.tsx`: friendly "Page not found" message, owner name/brand header, brief apology text, and a prominent `<Button as="a" href="/">Go to Homepage</Button>` link â€” styled consistently with the rest of the site (SC-008)
- [x] T047 [P] Add page-level SEO metadata: implement `generateMetadata()` in `src/app/page.tsx` returning title, description, and Open Graph/Twitter card tags; implement `generateMetadata({ params })` in `src/app/projects/[slug]/page.tsx` returning per-project title and OG image from `thumbnail` field
- [x] T048 [P] Add `public/robots.txt` permitting all crawlers (`User-agent: * / Allow: /`) and add `public/sitemap.xml` listing `/`, each `/projects/[slug]`, and `/#about`, `/#contact` â€” or use `next-sitemap` package for automatic generation
- [ ] T049 [P] Implement dark mode: create `src/lib/theme.ts` with `getTheme()` / `setTheme()` reading/writing `localStorage`; add a theme toggle `<button>` to `Navbar`; add a flash-prevention inline script to `<head>` in `src/app/layout.tsx` that reads localStorage and sets the `dark` class on `<html>` before first paint; apply `dark:` Tailwind variants to all section backgrounds, text, and borders
- [ ] T050 Conduct responsive layout audit at viewports 320px, 375px, 768px, 1024px, 1280px, 1920px, 2560px: verify no horizontal scrollbar at any width; Navbar hamburger collapses below `md`; project grid is 1-column on mobile, 2-column on tablet, 3-column on desktop; hero text is readable at all sizes; contact form fields don't overflow (SC-004)
- [ ] T051 Conduct accessibility audit using Lighthouse or axe DevTools: fix all critical violations; verify every `<Image>` has meaningful `alt`; every form field has a `<label>`; focus order is logical; focus rings are visible; color contrast is â‰¥ 4.5:1 for body text and â‰¥ 3:1 for large text and UI elements; `aria-pressed` on filter buttons; `role="alert"` on form feedback (SC-007)
- [ ] T052 Replace all remaining placeholder content in components: write real bio paragraph and background summary in `src/components/sections/About.tsx`; replace placeholder owner name in `Hero.tsx`; ensure all `src/data/*.ts` files contain real data with no placeholder strings
- [ ] T053 Run `next build` and Lighthouse audit in production mode: add `priority` prop to Hero `<Image>`, add explicit `width`/`height` or `sizes` props to all `<Image>` components, verify `next/font` eliminates layout shift (CLS < 0.1); fix any performance issues until Lighthouse Performance â‰¥ 90 (SC-002)
- [ ] T054 Write Vitest unit tests for `ContactForm` validation in `tests/unit/ContactForm.validation.test.tsx`: test each required field shows its error when empty on submit; test email field error for invalid format; test that entered values are retained when validation fails; test that success state renders after mocked successful EmailJS call; test that error state with mailto link renders after mocked rejection
- [ ] T055 [P] Write Vitest integration test for `Projects` section filtering in `tests/integration/Projects.filter.test.tsx`: render `<Projects />` with mock project data covering 2 categories; assert all cards visible initially; click a category filter; assert only matching cards remain; click "All"; assert all cards return
- [ ] T056 [P] Write Playwright E2E test for homepage first-impression journey in `tests/e2e/homepage.spec.ts`: navigate to `/`; assert page `<title>` is set; assert `<h1>` containing owner name is visible; assert "View My Work" and "Contact Me" buttons are present; assert Navbar resume link has `download` attribute
- [ ] T057 [P] Write Playwright E2E test for project filter in `tests/e2e/projects.spec.ts`: navigate to `/#projects`; assert project cards are visible; click first non-"All" filter; assert at least one card is shown; assert count is less than total; click "All"; assert original count returns
- [ ] T058 [P] Write Playwright E2E test for 404 page in `tests/e2e/404.spec.ts`: navigate to `/this-page-does-not-exist`; assert custom 404 content is visible; assert "Go to Homepage" link is present and navigates to `/`
- [ ] T059 Deploy to Vercel: connect repository to a new Vercel project; add all `NEXT_PUBLIC_*` environment variables in Vercel dashboard Settings â†’ Environment Variables; trigger production deploy; verify on the live URL that: homepage loads in < 3s, resume downloads, contact form sends email to owner inbox, project filter works, project detail pages load, 404 page activates for unknown routes (SC-002, SC-005, SC-006, SC-008)
- [ ] T060 Post-deploy verification: run `next build` locally one final time, run all Vitest and Playwright tests, fix any failures; document the live URL and add it to `specs/001-personal-portfolio/quickstart.md` under a "Live Site" section

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 â€” Setup**: No dependencies. Start immediately.
- **Phase 2 â€” Foundational**: Depends on Phase 1 complete. **Blocks all user story phases.**
- **Phase 3 â€” US1 (P1)**: Depends on Phase 2. No dependency on other user story phases.
- **Phase 4 â€” US2 (P2)**: Depends on Phase 2. No dependency on US1, but US2 renders below US1 on the homepage.
- **Phase 5 â€” US3 (P3)**: Depends on Phase 2. No dependency on US1 or US2.
- **Phase 6 â€” US4 (P4)**: Depends on Phase 3 (Navbar created in T016). T039 depends on Phase 7 (About section).
- **Phase 7 â€” US5 (P5)**: Depends on Phase 2. No dependency on US1â€“US4, but About section slots between Hero and Projects on the page.
- **Phase 8 â€” Polish**: Depends on all user story phases being complete.

### Within Each Phase

- Tasks marked `[P]` within the same phase can run in parallel (different files, no shared state).
- Non-`[P]` tasks within a phase must complete before the next sequential task in that phase.

### Cross-Phase Task Dependencies

| Task | Depends On |
|------|-----------|
| T010 (placeholder data) | T009 (interfaces must exist first) |
| T015 (Navbar) | T014 (Button component), T015 (layout shell) |
| T019 (Hero) | T014 (Button), T013 (fonts) |
| T020 (page.tsx renders Hero) | T019 (Hero), T015 (Navbar), T018 (Footer) |
| T025 (Projects section) | T023 (ProjectCard), T024 (ProjectFilter) |
| T026 (Projects on page.tsx) | T025 |
| T027 (detail page) | T023 (ProjectCard reused) |
| T032 (ContactForm) | T031 (EmailJS lib), T014 (Button) |
| T033 (Contact section) | T032 (ContactForm) |
| T034 (Contact on page.tsx) | T033 |
| T039 (Resume in About) | T043 (About section, Phase 7) |
| T043 (About section) | T040 (SkillBadge), T041 (skills data), T042 (social data) |
| T044 (About on page.tsx) | T043 |
| T045 (Footer real data) | T042 (real social.ts data) |
| T054â€“T058 (tests) | Respective component phases complete |
| T059 (deploy) | T052, T053 (content + perf), T059â€“T058 (tests) |

---

## Parallel Execution Examples

### Phase 1 (with 2+ developers)

```
Developer A: T001 â†’ T002 â†’ T006
Developer B: T003 [P], T004 [P], T005 [P], T007 [P], T008 [P]  (all parallel)
```

### Phase 2 (with 2+ developers)

```
Developer A: T009 â†’ T010 [P], T011 [P], T012 [P], T013 [P], T014 [P]  (T010â€“T014 parallel after T009)
Developer B: wait for T009, then T010â€“T014 in parallel
Both finish â†’ T015 (root layout)
```

### Phase 3 + Phase 4 + Phase 5 in parallel (3 developers)

```
Developer A: US1 (T016â€“T022)
Developer B: US2 (T023â€“T030)
Developer C: US3 (T031â€“T036)
(All depend only on Phase 2 being done)
```

### Phase 8 Polish (high parallelism)

```
Parallel batch 1: T046 [P], T047 [P], T048 [P], T049 [P]
Parallel batch 2: T054, T055 [P], T056 [P], T057 [P], T058 [P]  (after implementation phases)
Sequential: T050, T051, T052, T053  (need full site to audit)
Final: T059, T060
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001â€“T008)
2. Complete Phase 2: Foundational (T009â€“T015) â€” **critical blocker**
3. Complete Phase 3: US1 â€” Hero + Navbar + Footer (T016â€“T022)
4. **STOP and VALIDATE**: Visit `/` â€” does it deliver the 10-second first impression?
5. Optional: deploy the MVP to Vercel at this point

### Incremental Delivery

```
Phase 1+2: Foundation ready
  â†“
Phase 3 (US1): Homepage with Hero â†’ Deployable MVP
  â†“
Phase 4 (US2): Add Projects grid + detail pages â†’ Visitor can explore work
  â†“
Phase 5 (US3): Add Contact form â†’ Visitor can reach out
  â†“
Phase 6 (US4): Confirm resume download â†’ Recruiter flow complete
  â†“
Phase 7 (US5): Add About section â†’ Full personal narrative
  â†“
Phase 8: Polish â†’ Production quality
```

Each phase adds value without breaking the previous phase.

---

## Summary

| Metric | Value |
|--------|-------|
| Total tasks | 60 |
| Phase 1 â€” Setup | 8 tasks |
| Phase 2 â€” Foundational | 7 tasks |
| Phase 3 â€” US1 (P1) | 7 tasks |
| Phase 4 â€” US2 (P2) | 8 tasks |
| Phase 5 â€” US3 (P3) | 6 tasks |
| Phase 6 â€” US4 (P4) | 3 tasks |
| Phase 7 â€” US5 (P5) | 6 tasks |
| Phase 8 â€” Polish | 15 tasks |
| Tasks parallelizable [P] | 28 tasks |
| MVP scope | Phase 1 + Phase 2 + Phase 3 (22 tasks) |

---

## Notes

- `[P]` tasks operate on different files and have no cross-task state; run in parallel whenever possible
- `[US#]` label maps each task to its parent user story for traceability and independent testing
- Each phase ends with a **Checkpoint** â€” stop and validate the story independently before proceeding
- Commit after each completed task or logical group to enable clean rollback
- Tests (Phase 8) are written after implementation per user choice; if TDD is preferred, write T054â€“T058 before their respective implementation phases

