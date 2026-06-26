import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-144px)] flex-col items-center justify-center bg-white px-4 text-center dark:bg-gray-950">
      <p className="text-6xl font-bold text-accent-200 dark:text-accent-900">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 text-base text-gray-500 dark:text-gray-400 max-w-sm">
        Apologies, the page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8">
        <Button as="a" href="/" variant="primary">
          Go to Homepage
        </Button>
      </div>
    </div>
  );
}
