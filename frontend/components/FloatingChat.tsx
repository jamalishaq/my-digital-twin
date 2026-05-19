'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import Twin from '@/components/twin';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {isOpen && (
        <div className="w-[360px] h-[520px] bg-white rounded-xl shadow-2xl shadow-indigo-200/60 border border-indigo-100 overflow-hidden flex flex-col">
          <Twin />
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="w-14 h-14 bg-indigo-700 hover:bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-700/50 flex items-center justify-center transition-colors"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </div>
  );
}
