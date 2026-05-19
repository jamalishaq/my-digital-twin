import { GitFork, ExternalLink, Mail } from 'lucide-react';
import { facts } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-indigo-700 border-t border-indigo-800 text-indigo-200 py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white font-semibold text-lg">{facts.full_name}</p>
          <p className="text-indigo-200 text-sm mt-0.5">{facts.current_role} · {facts.location}</p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={facts.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition-colors"
          >
            <GitFork className="w-5 h-5" />
          </a>
          <a
            href={facts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${facts.email}`}
            aria-label="Email"
            className="hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <p className="text-indigo-300 text-sm">
          © {new Date().getFullYear()} {facts.full_name}
        </p>
      </div>
    </footer>
  );
}
