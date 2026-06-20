import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonAsButton = {
  as?: 'button';
  href?: never;
  download?: never;
  target?: never;
  rel?: never;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsAnchor = {
  as: 'a';
  href: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
} & (ButtonAsButton | ButtonAsAnchor);

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-600 text-white hover:bg-accent-700 dark:bg-accent-500 dark:hover:bg-accent-600',
  secondary:
    'border border-accent-600 text-accent-600 hover:bg-accent-50 dark:border-accent-400 dark:text-accent-400 dark:hover:bg-accent-900/20',
  ghost:
    'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
};

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50';

  const classes = cn(base, variantClasses[variant], className);

  if (props.as === 'a') {
    const { as: _as, ...anchorProps } = props;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
