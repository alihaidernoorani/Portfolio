# Contract: EmailJS Contact Form Integration

**Phase**: 1 — Design & Contracts  
**Date**: 2026-06-20  
**Feature**: 001-personal-portfolio  
**Spec refs**: FR-006, FR-007, FR-008, US-3

---

## Overview

The contact form (FR-006) submits messages via the EmailJS browser SDK. No custom backend API is required. The browser calls the EmailJS HTTPS endpoint directly using credentials stored in environment variables.

---

## Environment Variables

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Public (client) | EmailJS service identifier |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Public (client) | EmailJS email template identifier |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Public (client) | EmailJS public/user key |

**Note**: These are `NEXT_PUBLIC_` prefixed and intentionally client-side. EmailJS public keys are designed to be exposed in browser code; the account's allowed origins/domain policy restricts abuse.

---

## EmailJS SDK Call

**Library**: `@emailjs/browser`  
**Method**: `emailjs.send(serviceId, templateId, templateParams, publicKey)`

### Template Parameters (sent to EmailJS)

```typescript
interface EmailJSTemplateParams {
  from_name: string;    // Maps from ContactMessage.senderName
  from_email: string;   // Maps from ContactMessage.senderEmail
  subject: string;      // Maps from ContactMessage.subject
  message: string;      // Maps from ContactMessage.body
  to_email: string;     // Portfolio owner's email (set in EmailJS template, not here)
}
```

### Response Contract

| Outcome | EmailJS Result | UI Action |
|---------|---------------|-----------|
| Success | `status === 200` | Show success confirmation (FR-008); clear form |
| Client validation failure | N/A (not sent) | Show inline field errors (FR-007); retain values |
| Network/service error | Promise rejected or `status !== 200` | Show error message with fallback email address |

---

## Error Handling

Per spec edge case: *"What happens if the contact form service is unavailable? The site must show an alternative contact method."*

- On submit failure: display the portfolio owner's email address as a clickable `mailto:` link
- The fallback email must be stored in an environment variable or constant, not hardcoded to a specific value

```typescript
// Fallback displayed on error
const FALLBACK_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contact@example.com';
```

---

## Client-Side Validation (Pre-submission)

Validation runs before the EmailJS call is made. The form must NOT submit if validation fails.

| Field | Rule | Error Message |
|-------|------|---------------|
| `senderName` | Required, non-empty | "Name is required" |
| `senderEmail` | Required, valid email | "Enter a valid email address" |
| `subject` | Required, non-empty | "Subject is required" |
| `body` | Required, ≥ 10 chars | "Message must be at least 10 characters" |

All errors display inline beneath their respective fields (FR-007). Entered values are retained on validation failure (FR-007 AC-3).

---

## Idempotency & Retries

- No automatic retry on failure — user must manually resubmit
- Submit button is disabled while a request is in-flight to prevent duplicate sends
- No idempotency key required (EmailJS handles deduplication at their end)

---

## Rate Limiting

EmailJS free tier: 200 emails/month. No additional rate limiting implemented at the portfolio level. Honeypot field (hidden input) may be added to reduce spam submissions without CAPTCHA friction.
