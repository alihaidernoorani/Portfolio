'use client';

import { useRef } from 'react';
import type { ProjectCategory } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectFilterProps {
  categories: ProjectCategory[];
  active: ProjectCategory | 'all';
  onChange: (cat: ProjectCategory | 'all') => void;
}

const categoryLabels: Record<string, string> = {
  all: 'All',
  web: 'Web',
  mobile: 'Mobile',
  backend: 'Backend',
  data: 'Data',
  'open-source': 'Open Source',
  other: 'Other',
};

export function ProjectFilter({ categories, active, onChange }: ProjectFilterProps) {
  const all: (ProjectCategory | 'all')[] = ['all', ...categories];
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      const next = (index + 1) % all.length;
      refs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      const prev = (index - 1 + all.length) % all.length;
      refs.current[prev]?.focus();
    }
  };

  return (
    <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
      {all.map((cat, i) => (
        <button
          key={cat}
          ref={(el) => { refs.current[i] = el; }}
          aria-pressed={active === cat}
          onClick={() => onChange(cat)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          tabIndex={active === cat ? 0 : -1}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-ring',
            active === cat
              ? 'bg-accent-600 text-white dark:bg-accent-500'
              : 'border border-gray-300 text-gray-600 hover:border-accent-400 hover:text-accent-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-accent-500 dark:hover:text-accent-400'
          )}
        >
          {categoryLabels[cat] ?? cat}
        </button>
      ))}
    </div>
  );
}
