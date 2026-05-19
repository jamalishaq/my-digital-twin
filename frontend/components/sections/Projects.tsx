import { ExternalLink, GitFork } from 'lucide-react';
import { projects, type Project } from '@/lib/data';

const statusConfig = {
  active:        { dot: 'bg-emerald-500', label: 'Active' },
  completed:     { dot: 'bg-gray-500',    label: 'Completed' },
  'in-progress': { dot: 'bg-amber-400',   label: 'In Progress' },
}

function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status]

  return (
    <div className="bg-white rounded-xl border border-indigo-100 p-6 flex flex-col gap-4 hover:border-indigo-200 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`w-2 h-2 rounded-full ${status.dot}`} />
          <span className="text-xs text-gray-500">{status.label}</span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>{project.period}</span>
        <span>·</span>
        <span className="capitalize">{project.type}</span>
        <span>·</span>
        <span>{project.role}</span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map(tech => (
          <span key={tech} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded font-medium">
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      {(project.url || project.repo) && (
        <div className="flex gap-3 mt-auto pt-2 border-t border-indigo-100">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-indigo-700 hover:text-indigo-600 font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-indigo-700 hover:text-indigo-600 font-medium transition-colors"
            >
              <GitFork className="w-3.5 h-3.5" />
              Repo
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
