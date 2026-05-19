import Twin from '@/components/twin';

export default function ChatSection() {
  return (
    <section id="chat" className="pt-8 pb-8 px-4 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
          Chat with my Digital Twin
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Ask me about my experience, projects, or anything else.
        </p>

        <div className="h-[calc(100vh-240px)] min-h-[300px]">
          <Twin />
        </div>
      </div>
    </section>
  );
}
