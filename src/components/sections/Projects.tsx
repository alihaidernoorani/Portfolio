'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ProjectFilter } from '@/components/ui/ProjectFilter';
import type { ProjectCategory } from '@/types';

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const prefersReducedMotion = useReducedMotion();

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const cardVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.35 } },
    exit: { opacity: 0, transition: { duration: prefersReducedMotion ? 0 : 0.2 } },
  };

  return (
    <section
      id="projects"
      className="bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Projects
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              A selection of work I&apos;m proud of.
            </p>
          </div>

          <ProjectFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
