# Implementation Plan: Personal Portfolio Website

**Branch**: `001-personal-portfolio` | **Date**: 2026-06-20 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-personal-portfolio/spec.md`

---

# Architecture Overview

## System Type

Single-page-style web application built with **Next.js 14 (App Router)** using **Static Site Generation (SSG)**. All HTML is pre-rendered at build time — the server never executes per-request logic. Visitors receive pre-built HTML from a CDN, which maximises performance (SC-002) and guarantees core content is visible without JavaScript (FR-014).

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel CDN Edge                       │
│   Pre-built HTML + CSS + JS assets (Next.js SSG output) │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP (HTTPS only)
         ┌───────────▼───────────┐
         │    Visitor Browser    │
         │  ┌─────────────────┐  │
         │  │   Next.js App   │  │
         │  │  (hydrates SSG  │  │
         │  │   HTML → React) │  │
         │  └────────┬────────┘  │
         │           │ EmailJS SDK (on form submit only)
         └───────────┼───────────┘
                     │ HTTPS API call
         ┌───────────▼───────────┐
         │   EmailJS Service     │
         │  (third-party, free)  │
         │  Sends email to owner │
         └───────────────────────┘
```

**No custom backend. No database. No authentication.** The only runtime network call is the EmailJS form submission.

## Major Technical Decisions

| Decision | Choice | Key Reason |
|----------|--------|-----------|
| Framework | Next.js 14 App Router | SSG + dynamic routes + `next/image` + SEO metadata API |
| Language | TypeScript 5.x | Compile-time safety for data contracts |
| Styling | Tailwind CSS 3 | Responsive modifiers, no runtime cost, dark-mode ready |
| Animation | Framer Motion | Scroll-triggered stagger, respects `prefers-reduced-motion` |
| Contact delivery | EmailJS (browser SDK) | No backend required; free tier; template-controlled |
| Content management | Static TypeScript data files | No CMS cost or dependency; type-safe at compile time |
| Deployment | Vercel | Native Next.js support, CDN, environment variable management |
| Testing | Vitest + RTL + Playwright | Fast unit tests + semantic component tests + cross-browser E2E |

Full rationale and alternatives considered for each decision: [`research.md`](./research.md)

---

# Component Structure

## Hierarchy

```
app/
├── layout.tsx                   ← Root shell (always mounted)
│   ├── <Navbar />               ← Sticky nav: section links + resume download
│   ├── {children}               ← Page slot
│   └── <Footer />               ← Social links + copyright
│
├── page.tsx                     ← Homepage (single scrollable page)
│   ├── <Hero />                 ← Name, role, tagline, CTAs, profile photo
│   ├── <About />                ← Bio, background, skills grid, social links
│   │   └── <SkillBadge />[]     ← Per-skill pill (name + optional proficiency)
│   ├── <Projects />             ← Project grid with filter
│   │   ├── <ProjectFilter />    ← Category button group (client component)
│   │   └── <ProjectCard />[]    ← Per-project card (thumbnail, links, labels)
│   └── <Contact />              ← Section wrapper + fallback email
│       └── <ContactForm />      ← Form fields, validation, EmailJS call
│
├── projects/[slug]/
│   └── page.tsx                 ← Project detail (statically generated per slug)
│       └── <ProjectCard />      ← Reused for thumbnail + meta display
│
└── not-found.tsx                ← Custom 404 with homepage link
```

## Component Classification

| Component | Type | Reason |
|-----------|------|--------|
| `Navbar` | Server + Client (menu toggle only) | Static links rendered server-side; hamburger state is client-only |
| `Footer` | Server | Pure static content, no interactivity |
| `Hero` | Server | Static content + Framer Motion entrance (hydrates after paint) |
| `About` | Server | Static data, no user interaction |
| `SkillBadge` | Server | Pure display, no state |
| `Projects` | Client (`"use client"`) | Filter state must live in the browser |
| `ProjectFilter` | Client | Owns active filter state; calls onChange |
| `ProjectCard` | Server | Static display; Next.js Link for navigation |
| `Contact` | Server | Wrapper only |
| `ContactForm` | Client (`"use client"`) | Form state, validation, async EmailJS call |
| `Button` | Server or Client | Context-dependent; accepts `as="a"` or `type="button"` |

**Rule**: Mark `"use client"` only when a component owns interactive state or calls browser APIs. Everything else is a Server Component, reducing client-side JavaScript.

## Shared UI Components (`src/components/ui/`)

| Component | Props | Consumed By |
|-----------|-------|------------|
| `Button` | `variant`, `as`, `href`, `onClick`, `disabled`, `children` | Hero, Navbar, ContactForm |
| `ProjectCard` | `project: Project` | Projects section, Project detail page |
| `ProjectFilter` | `categories`, `active`, `onChange` | Projects section |
| `SkillBadge` | `skill: Skill` | About section |
| `ContactForm` | _(internal state only)_ | Contact section |

---

# Routing Strategy

## Route Map

| URL Pattern | File | Render Mode | Purpose |
|-------------|------|-------------|---------|
| `/` | `app/page.tsx` | SSG | Homepage with all five sections |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | SSG | Project detail page |
| `*` (no match) | `app/not-found.tsx` | SSG | Custom 404 |

## Static Generation for Project Detail Pages

`generateStaticParams()` in `app/projects/[slug]/page.tsx` reads `src/data/projects.ts` at build time and returns all slugs. Next.js pre-renders one HTML file per slug. Adding a new project requires a redeploy (acceptable for a personal portfolio with infrequent content changes).

## Navigation

- **Between sections on the homepage**: Anchor links (`#hero`, `#about`, `#projects`, `#contact`) with CSS `scroll-behavior: smooth`.
- **To project detail pages**: `<Link href="/projects/[slug]">` — Next.js prefetches on hover.
- **Back from detail page**: Explicit `← Back to Projects` link targeting `/#projects`.
- **Resume download**: `<a href="/resume.pdf" download>` — browser-native download; no JS required (FR-014 compatible).

## Trade-off: Single-Page vs Multi-Page

The homepage is one scrollable page (not separate routes for each section). **Trade-off**: simpler navigation, better first impression, faster perceived load. Downside: the URL does not change as the user scrolls between sections. Mitigated by: smooth-scroll anchor links, a sticky navbar showing active section via IntersectionObserver, and direct deep links (`/#projects`) working correctly.

---

# State Management Strategy

## Principle: Minimal Client State

The site has no global state, no auth state, and no server-synced state. All state is local and ephemeral.

## State Inventory

| State | Owner | Type | Scope |
|-------|-------|------|-------|
| Active project filter category | `Projects` component | `useState<ProjectCategory \| 'all'>` | Local to Projects section |
| Contact form field values | `ContactForm` component | `useState<ContactMessage>` | Local to ContactForm |
| Contact form validation errors | `ContactForm` component | `useState<Partial<Record<keyof ContactMessage, string>>>` | Local to ContactForm |
| Contact form submission status | `ContactForm` component | `useState<'idle' \| 'loading' \| 'success' \| 'error'>` | Local to ContactForm |
| Mobile nav open/closed | `Navbar` component | `useState<boolean>` | Local to Navbar |

**No global state library (Redux, Zustand, Jotai) is needed.** All state fits within the component that owns it, passed down via props where necessary. This is the smallest viable approach.

## Data Flow

```
src/data/projects.ts  ──► Projects (Client Component)
                              ├── filters derived: [...new Set(projects.map(p => p.category))]
                              ├── filteredProjects: projects filtered by activeCategory state
                              ├── ProjectFilter ◄── onChange updates activeCategory
                              └── ProjectCard[] rendered from filteredProjects

src/data/skills.ts    ──► About (Server Component)
                              └── SkillBadge[] grouped by category

src/data/social.ts    ──► About + Footer (Server Components)
                              └── <a> links with aria-label

ContactForm (Client)  ──► local form state ──► EmailJS.send() ──► EmailJS API
                              └── submission status ──► success/error UI
```

All data flows are **unidirectional** (data → component → rendered HTML). No prop drilling beyond two levels.

---

# Styling Strategy

## Approach: Tailwind CSS Utility-First

All styling is done with Tailwind utility classes directly in JSX. No CSS-in-JS runtime, no `.module.css` files (except for `globals.css` for CSS custom properties and base resets).

## Design Token Strategy

Tailwind's `tailwind.config.ts` is extended with:
- **Color palette**: Primary brand color (one accent), neutral grays for text/backgrounds
- **Typography scale**: Headings use a display font (e.g., Inter or custom), body uses a readable serif/sans
- **Spacing**: Tailwind defaults (4px base grid) are sufficient; no custom spacing tokens needed
- **Dark mode**: `darkMode: 'class'` — a `dark` class on `<html>` switches themes. Toggle state stored in `localStorage` and applied before first paint via a script in `<head>` to avoid flash.

## Responsive Breakpoints

```
Default (mobile-first): 320px+
sm:  640px+  (larger phones, small tablets)
md:  768px+  (tablets, hamburger → full nav transition)
lg:  1024px+ (laptops)
xl:  1280px+ (desktops)
2xl: 1536px+ (large monitors, max-width container caps layout)
```

A `max-w-7xl mx-auto` container prevents content from stretching beyond ~1280px on very large screens (SC-004).

## Animation Strategy

Framer Motion is used for:
1. **Entrance animations**: Sections and cards fade/slide in when they enter the viewport (`useInView` + `motion.div`)
2. **Stagger effect**: Project cards animate in sequence on section entry (`variants` with `staggerChildren`)
3. **Filter transitions**: `AnimatePresence` wraps project cards so filtered-out cards animate out before new ones animate in
4. **Reduced motion**: All animations respect `prefers-reduced-motion` via Framer Motion's built-in `useReducedMotion` hook — animations are skipped for users who have opted out (SC-007)

---

# Performance Considerations

## Build-Time Optimizations

| Optimization | Mechanism | Target |
|-------------|-----------|--------|
| Pre-rendered HTML | Next.js SSG | SC-002: page visible before JS loads |
| Image optimization | `next/image` (WebP, lazy load, responsive srcsets) | SC-002 + SC-007 (alt text) |
| Font optimization | `next/font` (self-hosted, no layout shift) | Core Web Vitals CLS = 0 |
| CSS purging | Tailwind + PostCSS (unused classes stripped at build) | Minimal CSS bundle |
| Code splitting | Next.js automatic per-page/per-component splitting | Only needed JS loaded |
| Static assets on CDN | Vercel Edge Network | Low latency globally |

## Runtime Optimizations

- **No client-side data fetching**: All data is bundled at build time; zero API calls on page load
- **Client components minimized**: Only `Projects` and `ContactForm` hydrate in the browser; all other components remain static HTML
- **EmailJS loaded lazily**: The `@emailjs/browser` SDK is dynamically imported only when the Contact section is in view (avoids loading a ~30KB library upfront)

## Performance Budget

| Metric | Target | How Achieved |
|--------|--------|-------------|
| First Contentful Paint | < 1.5s | SSG + CDN |
| Largest Contentful Paint | < 2.5s | Hero image preloaded via `priority` prop on `next/image` |
| Cumulative Layout Shift | < 0.1 | `next/font`, explicit image dimensions |
| Time to Interactive | < 3s | Minimal client JS bundle |
| Lighthouse Performance | ≥ 90 | All of the above |

---

# Accessibility Considerations

## Compliance Target

WCAG 2.1 Level AA — required by SC-007.

## Implementation Checklist

### Semantic HTML
- Section elements use `<section>` with `id` attributes (not `<div>`)
- Navigation uses `<nav aria-label="Main navigation">`
- Footer uses `<footer>`
- Headings follow a strict hierarchy: one `<h1>` (owner name in Hero), `<h2>` per section, `<h3>` for sub-items

### Images
- All `<Image>` components receive a meaningful `alt` prop (never empty for informational images)
- Decorative images (if any) use `alt=""`
- Profile photo: `alt="[Owner name] — [role]"`
- Project thumbnails: `alt="Screenshot of [project name]"`

### Forms
- Every `<input>` and `<textarea>` has an associated `<label>` (not just placeholder text)
- Error messages use `aria-describedby` linking the field to its error element
- Submit button conveys state: "Send Message" → "Sending…" (not disabled silently)

### Keyboard Navigation
- All interactive elements reachable via Tab in logical DOM order
- Mobile nav drawer: focus trapped while open; Escape closes it
- Project filter buttons: arrow-key navigation within the button group (roving tabindex pattern)
- Custom focus ring styles visible against all backgrounds (Tailwind `focus-visible:ring-*`)

### Color & Contrast
- Text on backgrounds: minimum 4.5:1 contrast ratio
- Large text (headings): minimum 3:1 contrast ratio
- Interactive elements (buttons, links): minimum 3:1 against surrounding content
- Dark mode: same ratios enforced in both themes

### Animations
- All Framer Motion animations gated on `useReducedMotion()` — if `prefers-reduced-motion: reduce`, content appears instantly without transition

### Screen Readers
- Social links: `aria-label="[Owner] on LinkedIn"` (not just icon)
- Download link: `aria-label="Download resume PDF"`
- Project filter: `aria-pressed` on active filter button
- Form success/error messages: `role="alert"` so screen readers announce them immediately

---

# Risks & Mitigations

## Risk 1: EmailJS Free Tier Limit
**Risk**: EmailJS free tier allows 200 emails/month. If the portfolio goes viral or is scraped, the limit is exceeded and the contact form stops working.  
**Probability**: Low (personal portfolio, not mass traffic)  
**Impact**: Medium (visitors cannot contact the owner)  
**Mitigation**:
- Always display the owner's direct email address as a static `mailto:` link in the Contact section (never hidden behind JS)
- Add a honeypot hidden field to reduce bot submissions
- If spam becomes an issue, upgrade to EmailJS paid tier ($0/month up to 1,000 emails) or switch to Resend with a minimal Vercel serverless function

## Risk 2: Resume PDF Stale or Missing
**Risk**: The `public/resume.pdf` file is outdated or accidentally removed in a redeploy.  
**Probability**: Medium (manual file management)  
**Impact**: Low–Medium (recruiters download an old resume or get a 404)  
**Mitigation**:
- Add a deploy-time check script that verifies `public/resume.pdf` exists before Vercel deploys (Vercel build command: `node scripts/check-assets.mjs && next build`)
- Store the resume in version control alongside the code so any update requires a deliberate commit

## Risk 3: Project Thumbnail Images Missing at Launch
**Risk**: `public/images/projects/` is empty or thumbnails don't match slugs, causing broken images.  
**Probability**: Medium (content population is a manual step)  
**Impact**: Low (placeholder fallback can display)  
**Mitigation**:
- `ProjectCard` renders a branded placeholder SVG if the thumbnail path returns a 404 (handled via `next/image` `onError` callback)
- Same deploy-time asset check validates that every project's `thumbnail` path has a corresponding file

## Risk 4: EmailJS Credentials Exposed in Client Bundle
**Risk**: `NEXT_PUBLIC_*` variables are embedded in the JavaScript bundle and visible in browser DevTools.  
**Probability**: Certain (by design for EmailJS)  
**Impact**: Low (EmailJS public keys are designed to be public; access is restricted by domain allowlist in the EmailJS dashboard)  
**Mitigation**:
- Configure the EmailJS account's allowed domains to `yourdomain.com` only — keys are useless from other origins
- Document this configuration in `quickstart.md` as a required setup step

## Risk 5: Next.js Major Version Breaking Changes
**Risk**: A future Next.js update (v15+) changes App Router APIs, breaking the build.  
**Probability**: Low in the short term  
**Impact**: Low–Medium (site continues to work on existing deploy; only new builds break)  
**Mitigation**:
- Pin `next` to a minor version in `package.json` (e.g., `"next": "~14.2"`)
- Upgrade deliberately with a separate PR when capacity allows

## Risk 6: Content Not Ready at Development Completion
**Risk**: Code is done but real project data, bio text, photos, and resume are not yet prepared.  
**Probability**: Medium  
**Impact**: Medium (cannot deploy a meaningful site with placeholder content)  
**Mitigation**:
- Content Population (Task 23) is a discrete task tracked separately from code tasks
- Placeholder content is functional — the site can be deployed and tested with dummy data before real content is added

---

# Constitution Compliance Check

*The project constitution (`/.specify/memory/constitution.md`) contains only unpopulated placeholder sections — no project-specific principles have been ratified. The following standard web development principles govern this project in the absence of a filled constitution.*

## Gate Evaluation

| Gate | Status | Notes |
|------|--------|-------|
| No hardcoded secrets | ✅ PASS | EmailJS keys stored in `.env.local` / Vercel env vars; `public/` key exposed intentionally per EmailJS design |
| Smallest viable change | ✅ PASS | No CMS, no backend, no auth, no database — per spec assumptions |
| Testable components | ✅ PASS | All interactive logic (form validation, filter state) is in client components covered by Vitest + RTL |
| Accessible by default | ✅ PASS | WCAG 2.1 AA target; accessibility audit is Task 18 with zero-critical-violation acceptance criterion |
| No unresolved NEEDS CLARIFICATION | ✅ PASS | One clarification (social platforms) resolved in spec phase; research.md resolves all tech unknowns |
| Performance budget defined | ✅ PASS | SC-002 (< 3s TTI), Lighthouse ≥ 90 in Performance budget table above |
| Dependencies justified | ✅ PASS | Each dependency in Technical Context is justified in `research.md` with alternatives considered |

## Recommendation

**PROCEED TO IMPLEMENTATION.** No gate violations. Constitution placeholder state is noted — running `/sp.constitution` to define project principles before the next feature is advised.

📋 **Architectural decision detected**: No backend vs. lightweight API route for contact form — Document the no-backend rationale and its future migration path? Run `/sp.adr contact-form-delivery-strategy`

---

## Artifacts Generated

| File | Purpose |
|------|---------|
| `specs/001-personal-portfolio/plan.md` | This file — full architecture plan |
| `specs/001-personal-portfolio/research.md` | Phase 0: technology decisions & rationale |
| `specs/001-personal-portfolio/data-model.md` | Phase 1: TypeScript interfaces & data entity map |
| `specs/001-personal-portfolio/contracts/emailjs-contract.md` | Phase 1: contact form integration contract |
| `specs/001-personal-portfolio/quickstart.md` | Phase 1: developer setup guide |

**Next step**: Run `/sp.tasks` to generate the ordered, dependency-aware task list for implementation.
