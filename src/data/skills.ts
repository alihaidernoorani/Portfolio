import type { Skill } from '@/types';

export const skills: Skill[] = [
  // Languages
  { name: 'TypeScript', category: 'language', proficiency: 'expert' },
  { name: 'JavaScript', category: 'language', proficiency: 'expert' },
  { name: 'Python', category: 'language', proficiency: 'proficient' },
  { name: 'HTML & CSS', category: 'language', proficiency: 'expert' },

  // Frameworks
  { name: 'React', category: 'framework', proficiency: 'expert' },
  { name: 'Next.js', category: 'framework', proficiency: 'expert' },
  { name: 'Tailwind CSS', category: 'framework', proficiency: 'expert' },
  { name: 'OpenAI Agents SDK', category: 'framework', proficiency: 'expert' },

  // Tools
  { name: 'Git & GitHub', category: 'tool', proficiency: 'expert' },
  { name: 'VS Code', category: 'tool', proficiency: 'expert' },
  { name: 'Figma', category: 'tool', proficiency: 'familiar' },

  // Platforms
  { name: 'Vercel', category: 'platform', proficiency: 'expert' },
  { name: 'PostgreSQL', category: 'platform', proficiency: 'proficient' },
];
