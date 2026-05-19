import { skillCategories } from '@/lib/data';

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Skills</h2>

        <div className="space-y-6">
          {skillCategories.map(({ label, key, items }) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="w-36 flex-shrink-0 text-sm font-semibold text-gray-500 uppercase tracking-wide pt-1">
                {label}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map(item => (
                  <span
                    key={item}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm rounded-lg font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
