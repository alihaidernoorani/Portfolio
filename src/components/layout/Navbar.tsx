'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-gray-200 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90'
          : 'bg-white dark:bg-gray-950'
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        {/* Logo / Name */}
        <a
          href="#hero"
          className="text-lg font-bold text-gray-900 hover:text-accent-600 dark:text-gray-50 dark:hover:text-accent-400 focus-ring rounded"
        >
          Ali Haider
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 md:flex" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-accent-600 dark:text-gray-400 dark:hover:text-accent-400 focus-ring rounded transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              download
              aria-label="Download resume PDF"
              className="inline-flex items-center gap-1.5 rounded-lg border border-accent-600 px-4 py-1.5 text-sm font-medium text-accent-600 hover:bg-accent-50 dark:border-accent-400 dark:text-accent-400 dark:hover:bg-accent-900/20 focus-ring transition-colors"
            >
              Resume
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v12m0 0l-3.5-3.5M12 15l3.5-3.5M5 20h14"
                />
              </svg>
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus-ring"
        >
          <span aria-hidden="true">
            {isOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'md:hidden border-t border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        )}
      >
        <ul className="flex flex-col px-4 py-4 gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-accent-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-accent-400 focus-ring transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <a
              href="/resume.pdf"
              download
              aria-label="Download resume PDF"
              onClick={closeMenu}
              className="block rounded-md px-3 py-2 text-base font-medium text-accent-600 hover:bg-accent-50 dark:text-accent-400 dark:hover:bg-accent-900/20 focus-ring transition-colors"
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
