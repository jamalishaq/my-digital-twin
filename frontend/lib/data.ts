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
  "name": "Apex — Trade & Risk Intelligence Platform",
  "description": "An AI-powered incident intelligence platform for trading operations that eliminates 20–45 minutes of manual context gathering per alert. When a trade break or risk limit breach fires, Apex automatically assembles a complete operational briefing — position context, risk state, counterparty history, and regulatory obligations — so the operations team can act in seconds instead of minutes.",
  "role": "Sole developer — designed and built end-to-end",
  "type": "personal",
  "stack": [
    "Python",
    "FastAPI",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Claude Sonnet 4.6",
    "Claude Haiku 4.5",
    "Cohere Embed v4",
    "Cohere Rerank 3.5",
    "Amazon Bedrock",
    "Amazon DynamoDB",
    "S3 Vectors"
  ],
  "period": "2026",
  "status": "in-progress",
  "url": "",
  "repo": ""
},
  {
  "name": "Cognis",
  "description": "An AI-powered incident intelligence platform that sits between alerting tools and on-call engineers. When an alert fires, Cognis intercepts it, runs it through a RAG-augmented tool-calling agent that retrieves relevant runbooks and investigates live signals, and delivers a structured incident brief to the engineer — reducing mean time to resolution.",
  "role": "Sole developer — designed and built end-to-end",
  "type": "personal",
  "stack": ["Python", "FastAPI", "React", "TypeScript", "Tailwind CSS", "Shadcn/ui", "AWS Bedrock", "Claude Sonnet 4.6", "Claude Haiku 4.5", "Cohere Embed v4", "Cohere Rerank 3.5"],
  "period": "2025",
  "status": "completed",
  "url": "http://cognis-dev-frontend.s3-website-us-east-1.amazonaws.com/mock",
  "repo": "https://github.com/jamalishaq/cognis"
},
{
  "name": "Meridian Customer Support Agent",
  "description": "An AI-powered customer support chatbot for Meridian Electronics that handles product discovery, order placement, order history lookup, and customer authentication through natural conversation. Built as a production-ready prototype using a FastAPI MCP agent backend and a streaming React chat interface.",
  "role": "Sole developer — designed and built end-to-end",
  "type": "personal",
  "stack": ["Python", "FastAPI", "React", "TypeScript", "Tailwind CSS", "Shadcn/ui", "OpenRouter", "GPT-4o", "MCP (Model Context Protocol)"],
  "period": "2025",
  "status": "completed",
  "url": "http://customer-support-agent-frontend-588106420806.s3-website-us-east-1.amazonaws.com",
  "repo": "https://github.com/jamalishaq/meridian_customer_support_agent"
},
{
    name: 'My Digital Twin',
    description:
      'An AI-powered chatbot that represents me on my personal website. Visitors can have a natural conversation with it to learn about my background, skills, experience, and projects.',
    role: 'Sole developer — designed and built end-to-end',
    type: 'personal',
    stack: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API'],
    period: '2025',
    status: 'completed',
    url: 'https://www.jamalishaq.dev',
    repo: 'https://github.com/jamalishaq/my-digital-twin',
  },
]