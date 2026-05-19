import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { facts } from '@/lib/data';

export default function Hero() {
  return (
    <section className="min-h-screen bg-stone-50 flex items-center pt-16">
      <div className="max-w-5xl mx-auto px-4 py-20 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-indigo-700 font-medium mb-2 tracking-wide uppercase text-sm">
              Software Engineer
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Hi, I&apos;m {facts.name}.
            </h1>
            <p className="text-gray-600 text-lg mb-3 max-w-lg leading-relaxed">
              {facts.bio}
            </p>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-8 justify-center md:justify-start">
              <MapPin className="w-4 h-4" />
              <span>{facts.location}</span>
            </div>
            <div className="flex gap-3 justify-center md:justify-start flex-wrap">
              <a
                href="#projects"
                className="px-6 py-3 bg-indigo-700 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors"
              >
                View Projects
              </a>
              <a
                href="#chat"
                className="px-6 py-3 border-2 border-indigo-700 text-indigo-700 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                Chat with my Twin
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-indigo-100 shadow-xl shadow-indigo-200/50">
              <Image src="/avatar.png" alt={facts.full_name} fill className="object-cover" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
