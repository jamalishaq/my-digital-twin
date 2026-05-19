import Twin from '@/components/twin';

export default function ChatSection() {
  return (
    <section id="chat" className="py-20 px-4 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
          Chat with my Digital Twin
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Ask me about my experience, projects, or anything else.
        </p>

        <div className="h-[600px]">
          <Twin />
        </div>
      </div>
    </section>
  );
}
