"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useDemo } from "@/providers/DemoProvider";
import { getGeminiResponse } from "@/actions/chat";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export function RetailAssistant() {
    const { inventory, salesStats, cartTotal } = useDemo();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'init',
            role: 'assistant',
            content: "Hello! I'm your AI Retail Assistant. Ask me about stock levels, revenue, or store performance.",
            timestamp: new Date()
        }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Show typing indicator or optimistic update if needed
        // For now, just wait for response
        try {
            const response = await getGeminiResponse(userMsg.content, { inventory, salesStats });

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Sorry, I encountered an error answering that.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                <Button
                    onClick={() => setIsOpen(true)}
                    className="h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-xl flex items-center justify-center"
                >
                    <Sparkles className="text-white" size={24} />
                </Button>
            </div>

            {/* Chat Window */}
            <div className={`fixed bottom-6 right-6 z-50 w-[380px] transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'}`}>
                <Card className="border shadow-2xl overflow-hidden flex flex-col h-[500px]">
                    {/* Header */}
                    <div className="bg-indigo-600 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                            <Bot size={20} />
                            <h3 className="font-bold">Retail Assistant</h3>
                        </div>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-indigo-700 h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
                            <X size={18} />
                        </Button>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4 bg-slate-50 dark:bg-slate-900" ref={scrollRef}>
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-none'
                                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Input */}
                    <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about stock, sales..."
                            className="bg-slate-50 dark:bg-slate-900 border-0 focus-visible:ring-1 focus-visible:ring-indigo-500"
                        />
                        <Button size="icon" onClick={handleSend} className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0">
                            <Send size={18} />
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    );
}

