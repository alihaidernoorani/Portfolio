import type { Skill, SkillCategory } from '@/types';
import { cn } from '@/lib/utils';

const categoryColors: Record<SkillCategory, string> = {
  language: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  framework: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  tool: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  platform: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  domain: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
};

const proficiencyDot: Record<NonNullable<Skill['proficiency']>, string> = {
  expert: 'bg-emerald-500',
  proficient: 'bg-amber-400',
  familiar: 'bg-gray-400',
};

interface SkillBadgeProps {
  skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
        categoryColors[skill.category]
      )}
      title={skill.proficiency ? `Proficiency: ${skill.proficiency}` : undefined}
    >
      {skill.proficiency && (
        <span
          aria-hidden="true"
          className={cn('h-1.5 w-1.5 rounded-full', proficiencyDot[skill.proficiency])}
        />
      )}
      {skill.name}
    </span>
  );
}
