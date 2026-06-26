'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-72px)] flex items-center bg-white dark:bg-gray-950 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl w-full py-20">
        <motion.div
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text content */}
          <div className="flex flex-col gap-6">
            <motion.p
              variants={itemVariants}
              className="text-sm font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400"
            >
              👋 Hello, I&apos;m
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
            >
              Ali Haider Noorani
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl font-medium text-accent-600 dark:text-accent-400 sm:text-2xl"
            >
              Cloud Applied Generative AI Engineer
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="max-w-lg text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              I build production-ready agentic AI systems - autonomous agents, multi-agent pipelines, and the full-stack interfaces that bring them to life.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button as="a" href="#projects" variant="primary">
                View My Work
              </Button>
              <Button as="a" href="#contact" variant="secondary">
                Contact Me
              </Button>
            </motion.div>
          </div>

          {/* Profile photo */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/30 dark:to-accent-800/30" />
              <Image
                src="/images/profile.jpg"
                alt="Ali Haider Noorani - Cloud Applied Generative AI Engineer"
                fill
                className="rounded-full object-contain ring-4 ring-white dark:ring-gray-900 shadow-xl"
                priority
                sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
