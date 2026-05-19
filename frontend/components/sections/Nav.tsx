'use client';

import { useEffect, useState } from 'react';

const links = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Chat',     href: '#chat' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 bg-indigo-700 transition-shadow duration-200 ${
        scrolled ? 'shadow-lg shadow-indigo-900/40' : ''
      }`}
    >
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="text-white font-semibold text-lg tracking-tight hover:text-indigo-200 transition-colors">
          Jamal Ishaq
        </a>

        <ul className="flex items-center gap-1">
          {links.map(({ label, href }) =>
            label === 'Chat' ? (
              <li key={label}>
                <a
                  href={href}
                  className="ml-2 px-4 py-1.5 bg-white hover:bg-indigo-50 text-indigo-700 text-sm rounded-full transition-colors font-medium"
                >
                  {label}
                </a>
              </li>
            ) : (
              <li key={label}>
                <a
                  href={href}
                  className="px-3 py-1.5 text-indigo-200 hover:text-white text-sm transition-colors"
                >
                  {label}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}
