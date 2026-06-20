# Data Model: Personal Portfolio Website

**Phase**: 1 — Design & Contracts  
**Date**: 2026-06-20  
**Feature**: 001-personal-portfolio  
**Source**: spec.md → Key Entities

---

## Overview

All data is static (no database). Entities are defined as TypeScript interfaces in `src/types/index.ts` and instantiated as typed arrays in `src/data/*.ts`. The Contact Message entity is ephemeral — it exists only as form state and is never persisted.

---

## Entity 1: Project

**Spec reference**: Key Entities — "Represents a portfolio work item"

```typescript
export interface Project {
  slug: string;           // URL-safe identifier, e.g. "ecommerce-dashboard"
  title: string;          // Display name, e.g. "E-Commerce Analytics Dashboard"
  shortDescription: string; // 1–2 sentence summary for the project card
  fullDescription: string;  // Full paragraph(s) for the detail page
  challenge: string;        // The problem solved (detail page)
  category: ProjectCategory; // For filtering (FR-013)
  techLabels: string[];     // Plain-text technology names, e.g. ["React", "Node.js"]
  thumbnail: string;        // Path relative to /public, e.g. "/images/projects/ecommerce.jpg"
  links: ProjectLinks;
  period: string;           // e.g. "Jan 2024 – Mar 2024" or "2023"
  featured: boolean;        // If true, shown on homepage hero section
}

export interface ProjectLinks {
  demo?: string;    // Live URL (optional)
  source?: string;  // Repository URL (optional)
  // At least one of demo or source must be present (enforced at data-authoring time, FR-004)
}

export type ProjectCategory =
  | 'web'
  | 'mobile'
  | 'backend'
  | 'data'
  | 'open-source'
  | 'other';
```

**Validation rules** (enforced by TypeScript at compile time):
- `slug` must be unique across all projects
- At least one of `links.demo` or `links.source` must be present (FR-004, SC-006)
- `thumbnail` must resolve to an existing file in `/public`

**State transitions**: None (static data, no lifecycle)

---

## Entity 2: Skill

**Spec reference**: Key Entities — "Represents a professional competency"

```typescript
export interface Skill {
  name: string;           // Display name, e.g. "TypeScript"
  category: SkillCategory; // Groups skills in the About section
  proficiency?: 'expert' | 'proficient' | 'familiar'; // Optional proficiency indicator
}

export type SkillCategory =
  | 'language'
  | 'framework'
  | 'tool'
  | 'platform'
  | 'domain';
```

**Notes**:
- Skills are rendered as badge components grouped by `category`
- `proficiency` is optional — if present, it may inform visual styling of the badge

---

## Entity 3: Contact Message (Ephemeral)

**Spec reference**: Key Entities — "Represents an inbound inquiry"

```typescript
export interface ContactMessage {
  senderName: string;   // Required, non-empty (FR-007)
  senderEmail: string;  // Required, valid email format (FR-007)
  subject: string;      // Required, non-empty (FR-007)
  body: string;         // Required, non-empty (FR-007)
}
```

**Notes**:
- This interface describes the form state only — not a persisted record
- No `id` or `timestamp` field (not stored; per spec assumption)
- Validation rules applied client-side before EmailJS submission (FR-007)

**Validation rules**:
- `senderName`: required, min 1 char, max 100 chars
- `senderEmail`: required, matches RFC 5321 email format
- `subject`: required, min 1 char, max 200 chars
- `body`: required, min 10 chars, max 5000 chars

---

## Entity 4: Social Profile Link

**Spec reference**: Key Entities — "Represents an external professional presence"

```typescript
export interface SocialLink {
  platform: 'linkedin' | 'github'; // Constrained to spec-approved platforms (FR-011)
  url: string;                      // Full URL, e.g. "https://github.com/username"
  label: string;                    // Accessible text, e.g. "Ali Haider on GitHub"
}
```

**Notes**:
- Two entries expected: LinkedIn and GitHub (FR-011)
- `label` is used as the `aria-label` on anchor elements (SC-007 accessibility)

---

## Entity 5: Navigation Item (UI-only)

**Not in spec Key Entities, but required for implementation**

```typescript
export interface NavItem {
  label: string;   // Display label, e.g. "Projects"
  href: string;    // Anchor or path, e.g. "#projects" or "/projects"
}
```

**Static list** (not from data file — defined inline in Navbar component):
```
Home (#hero), About (#about), Projects (#projects), Contact (#contact)
```
Plus a "Resume" download link pointing to `/resume.pdf`.

---

## Data File Map

| File | Exports | Entities |
|------|---------|---------|
| `src/data/projects.ts` | `projects: Project[]` | Project |
| `src/data/skills.ts` | `skills: Skill[]` | Skill |
| `src/data/social.ts` | `socialLinks: SocialLink[]` | SocialLink |
| `src/types/index.ts` | All TypeScript interfaces | All |

---

## Derived Data (Computed at Runtime)

| Computed Value | Source | Used By |
|----------------|--------|---------|
| `categories: ProjectCategory[]` | `[...new Set(projects.map(p => p.category))]` | ProjectFilter component |
| `featuredProjects: Project[]` | `projects.filter(p => p.featured)` | Hero section (homepage) |
| `projectsBySlug: Map<string, Project>` | `new Map(projects.map(p => [p.slug, p]))` | Project detail page |
| `skillsByCategory` | `groupBy(skills, s => s.category)` | About section skill grid |
