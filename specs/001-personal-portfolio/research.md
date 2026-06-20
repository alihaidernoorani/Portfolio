# Research: Personal Portfolio Website

**Phase**: 0 — Outline & Research  
**Date**: 2026-06-20  
**Feature**: 001-personal-portfolio

---

## Decision 1: Frontend Framework

**Decision**: Next.js 14 with App Router + TypeScript

**Rationale**:
- Static Site Generation (SSG) out of the box — all pages pre-rendered at build time → fast load times (SC-002)
- File-based routing handles both the homepage and dynamic `/projects/[slug]` pages without extra config
- `next/image` provides automatic image optimization (lazy loading, WebP conversion, responsive srcsets) — directly supports SC-002 and SC-007
- SEO-friendly: pages render as HTML, meta tags are server-side (SC-001 — visitor sees content without JS)
- Vercel deployment is one command; native support with zero config
- `not-found.tsx` convention satisfies SC-008 (custom 404)

**Alternatives considered**:
- **Astro**: Excellent for static sites, ships zero JS by default. Rejected because the filtering requirement (FR-013, US-2 AC-3) needs client-side interactivity; Astro islands would add complexity vs. native React state.
- **Vite + React SPA**: Fast DX but no SSR/SSG → poor SEO, JS required to see any content (violates FR-014).
- **Remix**: Full-stack oriented; overkill for a no-backend portfolio.

---

## Decision 2: Styling

**Decision**: Tailwind CSS v3

**Rationale**:
- Responsive modifiers (`sm:`, `md:`, `lg:`) make SC-004 (320px–2560px) straightforward to implement
- Dark mode support via `class` strategy with zero additional libraries
- No runtime style overhead — all CSS is generated at build time
- Widely adopted in Next.js ecosystem; well-documented patterns for portfolios

**Alternatives considered**:
- **CSS Modules**: More verbose, no design-token system, responsive utilities need manual media queries.
- **styled-components / emotion**: Runtime overhead; not ideal for static sites where performance is critical.
- **MUI / Chakra**: Pre-built components are convenient but add significant bundle weight and override complexity.

---

## Decision 3: Animation Library

**Decision**: Framer Motion

**Rationale**:
- Declarative React API; scroll-triggered animations via `useInView`
- Stagger effects for project cards with minimal code
- Handles reduced-motion preference (`prefers-reduced-motion`) automatically — supports SC-007
- Tree-shakeable; only animating what's visible

**Alternatives considered**:
- **CSS transitions only**: Sufficient for simple fades but limited for staggered card entrances and scroll-linked effects.
- **GSAP**: More powerful but larger bundle, more imperative, heavier learning curve for small portfolio scope.

---

## Decision 4: Contact Form Delivery

**Decision**: EmailJS (client-side email delivery)

**Rationale**:
- Sends email directly from the browser using a configured email service (Gmail, Outlook, etc.) — no server required
- Free tier supports up to 200 emails/month (more than sufficient for a personal portfolio)
- Credentials stored as `NEXT_PUBLIC_EMAILJS_*` environment variables — no secrets in code
- Satisfies FR-006, FR-007, FR-008, and the spec assumption that "no database persistence of messages is required"
- If service is unavailable, the fallback email address (FR edge case) is displayed statically in the Contact section

**Alternatives considered**:
- **Formspree**: Similar service, slightly simpler setup. Rejected because EmailJS gives more control over the email template and sender identity, and is free with no redirect.
- **Resend / Nodemailer**: Requires a Node.js server/API route with server-side secrets. Rejected because spec explicitly excludes backend infrastructure.
- **Netlify Forms**: Ties deployment to Netlify; adds hidden field magic. Rejected to keep deployment-agnostic.

---

## Decision 5: Deployment Platform

**Decision**: Vercel

**Rationale**:
- Native Next.js support: zero-config deployment, automatic HTTPS, global CDN
- `NEXT_PUBLIC_EMAILJS_*` environment variables configured in Vercel dashboard — no `.env` committed to repo
- Free Hobby tier supports personal portfolios indefinitely
- Automatic preview deployments on every branch push (useful for content updates)
- Vercel Analytics available for free usage tracking

**Alternatives considered**:
- **Netlify**: Equally capable, also free. Rejected to favor the native Next.js integration and avoid adapter complexity.
- **GitHub Pages**: Does not support Next.js App Router dynamic routes without a workaround. Rejected.
- **AWS Amplify / S3+CloudFront**: Operational overhead not justified for a personal site.

---

## Decision 6: Testing Strategy

**Decision**: Vitest + React Testing Library (unit/integration) + Playwright (E2E)

**Rationale**:
- **Vitest**: Drop-in Jest replacement with native ESM support; fast in watch mode; works with Next.js without extra config
- **React Testing Library**: Tests user behavior (what the visitor sees and does), not implementation. Aligns with spec's acceptance scenarios.
- **Playwright**: Cross-browser E2E tests covering the three primary user journeys (first impression, project filter, contact form). Catches layout regressions.

**Test scope**:
- Unit: `ContactForm` validation logic, `ProjectFilter` state, utility functions
- Integration: Full section renders with data (Hero, Projects, About)
- E2E: Homepage journey, project filter, contact form submission (mock)

**Alternatives considered**:
- **Cypress**: Similar E2E capability. Playwright preferred for parallel cross-browser execution and better CI performance.
- **Jest**: Slower than Vitest for ESM projects; requires more config with Next.js.

---

## Decision 7: Project Content Management

**Decision**: Static TypeScript data files (`src/data/`)

**Rationale**:
- No CMS required per spec assumption: "resume PDF will be provided by the owner and updated manually; no admin panel required"
- TypeScript interfaces enforce data shape at compile time — prevents missing fields at runtime
- Changes to project list are a code change (PR + deploy) — consistent with a developer portfolio
- Zero cost, zero external dependency, works offline

**Alternatives considered**:
- **Contentful / Sanity**: Adds CMS dependency, monthly cost, auth tokens. Overkill for a personal portfolio with infrequent content changes.
- **MDX files**: Good for blog-style content; slightly more complex for structured project data with multiple typed fields.
- **JSON files**: No type-checking. Rejected in favor of typed TypeScript.

---

## Resolved Unknowns

| Unknown | Resolution |
|---------|-----------|
| Tech stack | Next.js 14 + TypeScript + Tailwind CSS (see Decision 1–2) |
| Contact delivery | EmailJS, no backend (see Decision 4) |
| Deployment | Vercel, free tier (see Decision 5) |
| Social profiles | LinkedIn + GitHub (resolved in spec, FR-011) |
| Content management | Static TypeScript data files (see Decision 7) |
| Blog/articles section | Out of scope (per spec assumption) |
| Authentication | Not required (public site, per spec assumption) |
