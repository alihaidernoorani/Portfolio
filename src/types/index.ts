export type ProjectCategory =
  | 'web'
  | 'mobile'
  | 'backend'
  | 'data'
  | 'open-source'
  | 'other';

export type SkillCategory =
  | 'language'
  | 'framework'
  | 'tool'
  | 'platform'
  | 'domain';

export interface ProjectLinks {
  demo?: string;
  source?: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  category: ProjectCategory;
  techLabels: string[];
  thumbnail: string;
  links: ProjectLinks;
  period: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency?: 'expert' | 'proficient' | 'familiar';
}

export interface ContactMessage {
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
}

export interface SocialLink {
  platform: 'linkedin' | 'github';
  url: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
}
