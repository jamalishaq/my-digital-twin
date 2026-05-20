'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface ChatContextValue {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    clearMessages: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

const STORAGE_KEY = 'twin_chat_history';

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed: Array<Omit<Message, 'timestamp'> & { timestamp: string }> = JSON.parse(stored);
                setMessages(parsed.map(m => ({ ...m, timestamp: new Date(m.timestamp) })));
            }
        } catch {
            // ignore corrupt storage
        }
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (!loaded) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch {
            // ignore storage quota errors
        }
    }, [messages, loaded]);

    const clearMessages = useCallback(() => {
        setMessages([]);
        try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    }, []);

    return (
        <ChatContext.Provider value={{ messages, setMessages, clearMessages }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChatMessages() {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error('useChatMessages must be used within ChatProvider');
    return ctx;
}
