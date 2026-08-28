'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MessageSquare, X, Send, Sparkles, Bot, User, Mic } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SupportMessage {
  id: string;
  role: 'bot' | 'user';
  text: string;
}

export const SupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: 'init',
      role: 'bot',
      text: 'Hello! 👋 Welcome to Kynoviq AI. I am your 24/7 Virtual Assistant. How can I assist your work or college presentation today?',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || inputMsg;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: SupportMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });
      const data = await res.json();
      if (data.message?.content) {
        setMessages((prev) => [
          ...prev,
          { id: 'bot_' + Date.now(), role: 'bot', text: data.message.content },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: 'bot_' + Date.now(),
            role: 'bot',
            text: 'Kynoviq AI is an intelligent SaaS platform bringing AI Chat, Study Assistant, Code Assistant, Smart Summarizer, Writing Assistant, and Idea Generator into one workspace. Founded by Mohammad Hassan Raza.',
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_' + Date.now(),
          role: 'bot',
          text: 'Kynoviq AI is live 24/7! Feel free to test any AI tool from the main navigation menu.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-2xl shadow-indigo-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-3 cursor-pointer border border-indigo-400/40"
        >
          <div className="relative w-7 h-7">
            <Image src="/logo.svg" alt="Kynoviq AI Support" fill className="object-contain" />
          </div>
          <span className="text-xs font-bold hidden sm:inline">24/7 Live AI Help</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0b0f19] rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0b0f19] rounded-full" />
        </button>
      )}

      {/* Live Chat Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-96 h-[480px] glass-panel bg-slate-900/95 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Widget Header */}
          <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-indigo-950/80 to-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-md">
                <Image src="/logo.svg" alt="Kynoviq AI Support" fill className="object-contain" />
              </div>
              <div>
                <h3 className="text-xs font-black text-white flex items-center gap-1.5">
                  <span>Kynoviq Live Support</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-slate-400">24/7 AI Assistant & College Demo Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'bot' && (
                  <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                </div>
                {m.role === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 items-center text-[11px] text-slate-400 bg-slate-800/50 p-2.5 rounded-xl border border-slate-800 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Chips */}
          <div className="px-3 py-1.5 border-t border-slate-800/60 bg-slate-950/40 flex gap-1.5 overflow-x-auto">
            {['Tell me about Founder', 'What features are in Kynoviq?', 'How to present in college?'].map(
              (chip, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(undefined, chip)}
                  className="px-2.5 py-1 text-[10px] bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg whitespace-nowrap transition-colors"
                >
                  {chip}
                </button>
              )
            )}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask support or prompt AI..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <Button type="submit" variant="primary" size="sm" isLoading={isLoading} className="p-2.5 rounded-xl">
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
