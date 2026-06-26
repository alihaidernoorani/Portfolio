import type { Skill } from '@/types';

export const skills: Skill[] = [
  // Languages
  { name: 'TypeScript', category: 'language', proficiency: 'proficient' },
  { name: 'JavaScript', category: 'language', proficiency: 'proficient' },
  { name: 'Python', category: 'language', proficiency: 'proficient' },
  { name: 'HTML & CSS', category: 'language', proficiency: 'expert' },

  // Frameworks & Libraries
  { name: 'Next.js', category: 'framework', proficiency: 'expert' },
  { name: 'React', category: 'framework', proficiency: 'proficient' },
  { name: 'Tailwind CSS', category: 'framework', proficiency: 'expert' },
  { name: 'FastAPI', category: 'framework', proficiency: 'proficient' },
  { name: 'OpenAI Agents SDK', category: 'framework', proficiency: 'proficient' },

  // Tools
  { name: 'Git & GitHub', category: 'tool', proficiency: 'expert' },
  { name: 'Docker', category: 'tool', proficiency: 'familiar' },
  { name: 'Figma', category: 'tool', proficiency: 'familiar' },
  { name: 'Sanity', category: 'tool', proficiency: 'familiar' },
  { name: 'Cohere', category: 'tool', proficiency: 'familiar' },

  // Platforms
  { name: 'Vercel', category: 'platform', proficiency: 'expert' },
  { name: 'NeonDB (Postgres)', category: 'platform', proficiency: 'familiar' },
  { name: 'Qdrant', category: 'platform', proficiency: 'familiar' },
];
