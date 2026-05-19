export const facts = {
  full_name: 'Jamal Ishaq',
  name: 'Jamal',
  current_role: 'Software Engineer',
  years_of_experience: 5,
  location: 'Lagos, Nigeria',
  email: 'toyinjamal@gmail.com',
  linkedin: 'https://linkedin.com/in/ishaq-jamal',
  github: 'https://github.com/jamalishaq',
  focus: 'AI-powered applications and scalable full-stack systems',
  open_to: ['Full-time roles', 'Freelance projects', 'AI and full-stack consulting', 'Remote opportunities'],
  bio: `I'm a Software Engineer with ${5} years of experience building full-stack systems and AI-powered applications. Based in Lagos, Nigeria, I focus on turning complex problems into clean, scalable solutions — from backend APIs to polished frontends to cloud infrastructure.`,
}

export const skillCategories: { label: string; key: string; items: string[] }[] = [
  { label: 'Languages',      key: 'languages',      items: ['Python', 'TypeScript', 'JavaScript'] },
  { label: 'Frameworks',     key: 'frameworks',     items: ['FastAPI', 'Next.js', 'React'] },
  { label: 'AI / ML',        key: 'ai_and_ml',      items: ['OpenAI API', 'AWS Bedrock', 'Prompt Engineering'] },
  { label: 'Cloud',          key: 'cloud',          items: ['AWS', 'Vercel'] },
  { label: 'Infrastructure', key: 'infrastructure', items: ['Terraform', 'Docker', 'GitHub Actions'] },
  { label: 'Tools',          key: 'tools',          items: ['Git', 'REST APIs'] },
]

export interface Project {
  name: string
  description: string
  role: string
  type: string
  stack: string[]
  period: string
  status: 'active' | 'completed' | 'in-progress'
  url: string | null
  repo: string | null
}

// Note: `infrastructure` and `highlights` are intentionally excluded from this interface.
// They exist in backend/data/projects.json for the AI twin's context but are not
// displayed anywhere in the portfolio UI. Do not add them here.

export const projects: Project[] = [
  {
    name: 'My Digital Twin',
    description:
      'An AI-powered chatbot that represents me on my personal website. Visitors can have a natural conversation with it to learn about my background, skills, experience, and projects.',
    role: 'Sole developer — designed and built end-to-end',
    type: 'personal',
    stack: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API'],
    period: '2025',
    status: 'active',
    url: 'https://www.jamalishaq.dev',
    repo: 'https://github.com/jamalishaq/my-digital-twin',
  },
]