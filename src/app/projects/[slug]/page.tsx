import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/Button';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [{ url: project.thumbnail, alt: `Screenshot of ${project.title}` }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="bg-white dark:bg-gray-950 min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-accent-600 dark:text-gray-400 dark:hover:text-accent-400 focus-ring rounded transition-colors mb-8"
        >
          ← Back to Projects
        </Link>

        {/* Thumbnail */}
        <div className="relative mb-8 h-64 w-full rounded-xl bg-gray-100 dark:bg-gray-800 sm:h-80">
          <Image
            src={project.thumbnail}
            alt={`Screenshot of ${project.title}`}
            fill
            className="object-contain p-3"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Header */}
        <header className="mb-8">
          <span className="mb-3 inline-block rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-700 dark:bg-accent-900/30 dark:text-accent-300">
            {project.category}
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{project.period}</p>
        </header>

        {/* Description */}
        <section className="mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.fullDescription}
          </p>
        </section>

        {/* Challenge */}
        <section className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
            The Challenge
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            {project.challenge}
          </p>
        </section>

        {/* Tech stack */}
        <section className="mb-10">
          <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techLabels.map((tech) => (
              <span
                key={tech}
                className="rounded border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Links */}
        {(project.links.demo || project.links.source) && (
          <div className="flex flex-wrap gap-4">
            {project.links.demo && (
              <Button
                as="a"
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                aria-label={`View live demo of ${project.title}`}
              >
                View Live Demo ↗
              </Button>
            )}
            {project.links.source && (
              <Button
                as="a"
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                aria-label={`View source code of ${project.title} on GitHub`}
              >
                View Source ↗
              </Button>
            )}
          </div>
        )}

        {/* Individual repos (for collection projects) */}
        {project.links.repos && project.links.repos.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">
              Source Repositories
            </h2>
            <div className="flex flex-col gap-2">
              {project.links.repos.map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 transition-colors hover:border-accent-400 hover:text-accent-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-accent-500 dark:hover:text-accent-400"
                >
                  <span className="font-medium">{repo.label}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">GitHub ↗</span>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
