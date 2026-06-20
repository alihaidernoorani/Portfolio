import { ContactForm } from '@/components/ui/ContactForm';

const FALLBACK_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'nooranialihaider@gmail.com';

export function Contact() {
  return (
    <section
      id="contact"
      className="bg-white dark:bg-gray-950 px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Have a project in mind, a question, or just want to say hello? I&apos;d love to hear from you.
          </p>
        </div>

        <ContactForm />

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Prefer email?{' '}
          <a
            href={`mailto:${FALLBACK_EMAIL}`}
            className="text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 underline hover:no-underline focus-ring rounded transition-colors"
          >
            {FALLBACK_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
