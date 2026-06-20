# Quickstart: Personal Portfolio Website

**Phase**: 1 — Design & Contracts  
**Date**: 2026-06-20  
**Feature**: 001-personal-portfolio

---

## Prerequisites

- Node.js 20 LTS or later
- npm 10+ (or pnpm 9+)
- An [EmailJS](https://www.emailjs.com/) account with a configured service and template
- Git

---

## 1. Initialize the Project

```bash
npx create-next-app@14 . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

Run from the repository root (`C:\Users\DELL\Desktop\Portfolio`).

---

## 2. Install Additional Dependencies

```bash
npm install framer-motion @emailjs/browser
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @playwright/test
```

---

## 3. Configure Environment Variables

Create `.env.local` at the repository root (never commit this file):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
```

On Vercel: add these same variables in the project's **Settings → Environment Variables** dashboard.

---

## 4. Add Resume PDF

Place your resume at:

```
public/resume.pdf
```

This file is served at `/resume.pdf` and referenced by the Navbar and About section download links.

---

## 5. Add Project Thumbnails

Place project thumbnail images at:

```
public/images/projects/<project-slug>.jpg
```

Recommended size: **800 × 500px** (16:10 ratio). `next/image` will generate responsive variants automatically.

---

## 6. Populate Static Data

Edit the data files with real content:

- `src/data/projects.ts` — your portfolio projects
- `src/data/skills.ts` — your skills by category
- `src/data/social.ts` — LinkedIn and GitHub URLs

Follow the TypeScript interfaces in `src/types/index.ts`.

---

## 7. Development Server

```bash
npm run dev
```

Opens at `http://localhost:3000`.

---

## 8. Run Tests

```bash
# Unit + integration
npm run test

# E2E (requires dev server or production build)
npx playwright test
```

---

## 9. Production Build & Local Preview

```bash
npm run build
npm run start
```

Confirm all pages load, resume downloads, and the contact form submits (check your email inbox).

---

## 10. Deploy to Vercel

```bash
npx vercel --prod
```

Or connect the GitHub repository to Vercel for automatic deployments on push to `main`.

---

## EmailJS Setup (One-Time)

1. Create an EmailJS account at [emailjs.com](https://www.emailjs.com/)
2. Add an email service (Gmail, Outlook, or custom SMTP)
3. Create an email template with variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
4. Copy the **Service ID**, **Template ID**, and **Public Key** into `.env.local`
