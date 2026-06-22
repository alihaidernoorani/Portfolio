import { skills } from '@/data/skills';
import { socialLinks } from '@/data/social';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { Button } from '@/components/ui/Button';
import { groupBy } from '@/lib/utils';
import type { SkillCategory } from '@/types';

const categoryTitles: Record<SkillCategory, string> = {
  language: 'Languages',
  framework: 'Frameworks & Libraries',
  tool: 'Tools',
  platform: 'Platforms & Databases',
  domain: 'Domains',
};

const GitHubIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socialIcons: Record<string, () => JSX.Element> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

export function About() {
  const skillsByCategory = groupBy(skills, (s) => s.category);
  const categoryOrder: SkillCategory[] = ['language', 'framework', 'tool', 'platform', 'domain'];

  return (
    <section
      id="about"
      className="bg-white dark:bg-gray-950 px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Bio */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              About Me
            </h2>

            <div className="flex flex-col gap-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                I&apos;m Ali Haider Noorani. I&apos;m passionate about full-stack development,
                Generative AI, and creating meaningful digital experiences. I enjoy building projects that solve
                real problems while continuously improving my technical skills.
              </p>
              <p>
                My experience comes from hands-on learning through personal projects and hackathons from the Certified
                Cloud Applied Generative AI Engineer program. I&apos;ve worked with technologies such as Next.js,
                React, TypeScript and Python and modern AI tools to build web applications, automation
                solutions, and AI-powered projects.
              </p>
              <p>
                I&apos;m always exploring new technologies, refining my development practices, and looking for
                opportunities to apply my skills to challenging and impactful projects.
              </p>
            </div>

            {/* Social + Resume */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.platform];
                return Icon ? (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-accent-400 hover:text-accent-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-accent-500 dark:hover:text-accent-400 focus-ring transition-colors"
                  >
                    <Icon />
                    {link.platform === 'linkedin' ? 'LinkedIn' : 'GitHub'}
                  </a>
                ) : null;
              })}

              <Button as="a" href="/Ali_Haider_Noorani_CV.pdf" download aria-label="Download resume PDF" variant="secondary">
                Download Resume
              </Button>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Skills</h3>

            <div className="flex flex-col gap-6">
              {categoryOrder.map((cat) => {
                const catSkills = skillsByCategory[cat];
                if (!catSkills?.length) return null;
                return (
                  <div key={cat}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500">
                      {categoryTitles[cat]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {catSkills.map((skill) => (
                        <SkillBadge key={skill.name} skill={skill} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
