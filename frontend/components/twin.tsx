'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Bot, User } from 'lucide-react';
import { useChatMessages, type Message } from '@/components/ChatContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Twin() {
    const { messages, setMessages } = useChatMessages();
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [hasAvatar, setHasAvatar] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const prevMessageCountRef = useRef(0);

    useEffect(() => {
        if (messages.length === 0) return;
        // Only scroll when a new message is added, not during streaming updates
        if (messages.length > prevMessageCountRef.current) {
            const container = messagesEndRef.current?.parentElement;
            if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
            prevMessageCountRef.current = messages.length;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading || isStreaming) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const assistantId = (Date.now() + 1).toString();

        const setErrorMessage = () => setMessages(prev => {
            const errMsg: Message = { id: assistantId, role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date() };
            return prev.some(m => m.id === assistantId)
                ? prev.map(m => m.id === assistantId ? errMsg : m)
                : [...prev, errMsg];
        });

        try {
            const history = messages.map(m => ({ role: m.role, content: m.content }));

            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage.content,
                    history,
                }),
            });

            if (!response.ok) throw new Error('Request failed');
            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let firstChunk = true;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() ?? '';

                for (const line of lines) {
                    if (!line.startsWith('data: ')) continue;

                    let event: { type: string; content?: string; detail?: string };
                    try {
                        event = JSON.parse(line.slice(6));
                    } catch {
                        continue;
                    }

                    if (event.type === 'chunk' && event.content) {
                        if (firstChunk) {
                            // Replace loading state with the first real message
                            setIsLoading(false);
                            setIsStreaming(true);
                            setMessages(prev => [...prev, {
                                id: assistantId,
                                role: 'assistant',
                                content: event.content!,
                                timestamp: new Date(),
                            }]);
                            firstChunk = false;
                        } else {
                            setMessages(prev => prev.map(m =>
                                m.id === assistantId
                                    ? { ...m, content: m.content + event.content }
                                    : m
                            ));
                        }
                    } else if (event.type === 'error') {
                        setErrorMessage();
                    }
                }
            }
        } catch {
            setErrorMessage();
        } finally {
            setIsLoading(false);
            setIsStreaming(false);
            setTimeout(() => {
                if (navigator.maxTouchPoints > 0) return;
                inputRef.current?.focus();
            }, 100);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const Avatar = ({ size = 'sm' }: { size?: 'sm' | 'lg' }) => {
        const dim = size === 'lg' ? 'w-20 h-20' : 'w-8 h-8';
        return hasAvatar ? (
            <div className={`relative ${dim} rounded-full overflow-hidden border border-indigo-200 shrink-0`}>
                <Image
                    src="/avatar.png"
                    alt="Digital Twin Avatar"
                    fill
                    className="object-cover"
                    onError={() => setHasAvatar(false)}
                />
            </div>
        ) : (
            <div className={`${dim} bg-indigo-100 rounded-full flex items-center justify-center shrink-0`}>
                <Bot className={size === 'lg' ? 'w-10 h-10 text-indigo-700' : 'w-5 h-5 text-indigo-700'} />
            </div>
        );
    };

    const busy = isLoading || isStreaming;

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg border border-indigo-100">
            {/* Header */}
            <div className="bg-indigo-700 border-b border-indigo-800 text-white p-4 rounded-t-lg">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Bot className="w-6 h-6 text-indigo-200" />
                    Jamal&apos;s Digital Twin
                </h2>
                <p className="text-sm text-indigo-200 mt-1">Ask me anything about Jamal</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        <div className="flex justify-center mb-3">
                            <Avatar size="lg" />
                        </div>
                        <p className="font-medium text-gray-700">Hi, I&apos;m Jamal&apos;s Digital Twin.</p>
                        <p className="text-sm mt-1">Ask me about his experience, projects, or skills.</p>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.role === 'assistant' && <Avatar />}

                        <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                                message.role === 'user'
                                    ? 'bg-indigo-700 text-white'
                                    : 'bg-indigo-50 border border-indigo-100 text-gray-700'
                            }`}
                        >
                            {message.role === 'assistant' ? (
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        p:      ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                                        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                                        ul:     ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                                        ol:     ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                                        li:     ({ children }) => <li className="leading-relaxed">{children}</li>,
                                        code:   ({ children }) => <code className="bg-indigo-100 text-indigo-700 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                                        pre:    ({ children }) => <pre className="bg-indigo-100 text-gray-700 p-3 rounded text-xs font-mono overflow-x-auto mb-2">{children}</pre>,
                                        a:      ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-700 underline hover:text-indigo-600">{children}</a>,
                                    }}
                                >
                                    {message.content}
                                </ReactMarkdown>
                            ) : (
                                <p className="whitespace-pre-wrap">{message.content}</p>
                            )}
                            <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>
                                {message.timestamp.toLocaleTimeString()}
                            </p>
                        </div>

                        {message.role === 'user' && (
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                                <User className="w-5 h-5 text-indigo-700" />
                            </div>
                        )}
                    </div>
                ))}

                {/* Loading dots — only shown before first chunk arrives */}
                {isLoading && (
                    <div className="flex gap-3 justify-start">
                        <Avatar />
                        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                            <div className="flex space-x-2 items-center h-4">
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-indigo-100 p-4 bg-white rounded-b-lg">
                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything..."
                        className="flex-1 px-4 py-2 bg-white border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                        disabled={busy}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || busy}
                        className="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
