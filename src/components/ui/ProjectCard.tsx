import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

const categoryLabels: Record<string, string> = {
  web: 'Web',
  mobile: 'Mobile',
  backend: 'Backend',
  data: 'Data',
  'open-source': 'Open Source',
  other: 'Other',
};

const categoryColors: Record<string, string> = {
  web: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  mobile: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  backend: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  data: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'open-source': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  other: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

function FallbackThumbnail({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/30 dark:to-accent-800/30">
      <span className="text-4xl font-bold text-accent-400 dark:text-accent-600 select-none">
        {title.charAt(0)}
      </span>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="relative group flex flex-col h-full rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 focus-within:ring-2 focus-within:ring-accent-500 focus-within:ring-offset-2">
      {/* Thumbnail */}
      <div className="relative h-48 rounded-t-xl bg-gray-100 dark:bg-gray-800">
        <Image
          src={project.thumbnail}
          alt={`Screenshot of ${project.title}`}
          fill
          className="object-contain p-2"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div style={{ display: 'none' }} className="absolute inset-0">
          <FallbackThumbnail title={project.title} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Category badge */}
        <span
          className={`inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[project.category] ?? categoryColors.other}`}
        >
          {categoryLabels[project.category] ?? project.category}
        </span>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-accent-600 dark:hover:text-accent-400 focus-ring rounded transition-colors after:absolute after:inset-0"
          >
            {project.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
          {project.shortDescription}
        </p>

        {/* Tech labels */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techLabels.map((tech) => (
            <span
              key={tech}
              className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.links.demo || project.links.source) && (
          <div className="flex gap-3 pt-2 relative z-10">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.title}`}
                className="text-sm font-medium text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 focus-ring rounded transition-colors"
              >
                Live Demo ↗
              </a>
            )}
            {project.links.source && (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code of ${project.title} on GitHub`}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 focus-ring rounded transition-colors"
              >
                Source ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
