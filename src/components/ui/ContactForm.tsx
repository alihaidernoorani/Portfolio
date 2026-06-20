'use client';

import { useState } from 'react';
import type { ContactMessage } from '@/types';
import { sendContactMessage } from '@/lib/emailjs';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Errors = Partial<Record<keyof ContactMessage, string>>;

const FALLBACK_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'nooranialihaider@gmail.com';

function validate(form: ContactMessage): Errors {
  const errors: Errors = {};
  if (!form.senderName.trim()) errors.senderName = 'Name is required.';
  if (!form.senderEmail.trim()) {
    errors.senderEmail = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.senderEmail)) {
    errors.senderEmail = 'Enter a valid email address.';
  }
  if (!form.subject.trim()) errors.subject = 'Subject is required.';
  if (!form.body.trim() || form.body.trim().length < 10)
    errors.body = 'Message must be at least 10 characters.';
  return errors;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} <span aria-hidden="true" className="text-red-500">*</span>
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}

const inputBase =
  'rounded-lg border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-1 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500';

export function ContactForm() {
  const [form, setForm] = useState<ContactMessage>({
    senderName: '',
    senderEmail: '',
    subject: '',
    body: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (key: keyof ContactMessage) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('loading');
    try {
      await sendContactMessage(form);
      setStatus('success');
      setForm({ senderName: '', senderEmail: '', subject: '', body: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="alert" className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-800 dark:bg-emerald-900/20">
        <p className="text-2xl mb-2">✅</p>
        <p className="font-semibold text-emerald-800 dark:text-emerald-300">Message sent!</p>
        <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-emerald-600 underline hover:no-underline dark:text-emerald-400 focus-ring rounded"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot */}
      <input
        type="text"
        name="_honeypot"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="senderName" label="Name" error={errors.senderName}>
          <input
            id="senderName"
            type="text"
            value={form.senderName}
            onChange={set('senderName')}
            autoComplete="name"
            placeholder="Your name"
            aria-describedby={errors.senderName ? 'senderName-error' : undefined}
            aria-invalid={!!errors.senderName}
            className={cn(
              inputBase,
              errors.senderName ? 'border-red-400 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
            )}
          />
        </Field>

        <Field id="senderEmail" label="Email" error={errors.senderEmail}>
          <input
            id="senderEmail"
            type="email"
            value={form.senderEmail}
            onChange={set('senderEmail')}
            autoComplete="email"
            placeholder="you@example.com"
            aria-describedby={errors.senderEmail ? 'senderEmail-error' : undefined}
            aria-invalid={!!errors.senderEmail}
            className={cn(
              inputBase,
              errors.senderEmail ? 'border-red-400 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
            )}
          />
        </Field>
      </div>

      <Field id="subject" label="Subject" error={errors.subject}>
        <input
          id="subject"
          type="text"
          value={form.subject}
          onChange={set('subject')}
          placeholder="What's this about?"
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          aria-invalid={!!errors.subject}
          className={cn(
            inputBase,
            errors.subject ? 'border-red-400 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          )}
        />
      </Field>

      <Field id="body" label="Message" error={errors.body}>
        <textarea
          id="body"
          value={form.body}
          onChange={set('body')}
          rows={5}
          placeholder="Tell me about your project or just say hello..."
          aria-describedby={errors.body ? 'body-error' : undefined}
          aria-invalid={!!errors.body}
          className={cn(
            inputBase,
            'resize-none',
            errors.body ? 'border-red-400 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
          )}
        />
      </Field>

      {status === 'error' && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          Something went wrong. Please try again, or email me directly at{' '}
          <a href={`mailto:${FALLBACK_EMAIL}`} className="underline hover:no-underline">
            {FALLBACK_EMAIL}
          </a>
          .
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === 'loading'}
        className="self-start"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  );
}
