import Twin from '@/components/twin';

export default function ChatSection() {
  return (
    <section id="chat" className="h-[calc(100svh-4rem)] flex flex-col pt-8 pb-4 px-4 bg-stone-50 overflow-hidden">
      <div className="max-w-3xl mx-auto w-full flex flex-col flex-1 min-h-0">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
          Chat with my Digital Twin
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Ask me about my experience, projects, or anything else.
        </p>

        <div className="flex-1 min-h-0">
          <Twin />
        </div>
      </div>
    </section>
  );
}
