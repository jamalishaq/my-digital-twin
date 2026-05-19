import Image from 'next/image';
import { facts } from '@/lib/data';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">About</h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-100 shadow-lg">
              <Image src="/avatar.png" alt={facts.full_name} fill className="object-cover" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">{facts.full_name}</h3>
            <p className="text-indigo-700 font-medium mb-4">{facts.current_role}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{facts.bio}</p>

            <div className="flex flex-wrap gap-2">
              {facts.open_to.map(item => (
                <span
                  key={item}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
