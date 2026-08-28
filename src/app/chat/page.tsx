'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  MessageSquare,
  Plus,
  Send,
  Trash2,
  Copy,
  Check,
  Bookmark,
  Sparkles,
  User,
  Bot,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
}

function ChatContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(searchParams.get('id'));
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingChat, setIsFetchingChat] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/chat');
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
      }
    } catch (e) {
      console.error('Failed to load conversations', e);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    const convId = searchParams.get('id');
    setActiveConvId(convId);

    if (convId) {
      setIsFetchingChat(true);
      fetch(`/api/chat/${convId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.conversation) {
            setMessages(data.conversation.messages || []);
          }
        })
        .catch(() => toast.error('Error', 'Failed to load conversation history'))
        .finally(() => setIsFetchingChat(false));
    } else {
      setMessages([]);
    }
  }, [searchParams]);

  const handleNewChat = () => {
    setActiveConvId(null);
    setMessages([]);
    router.push('/chat');
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMsg.trim() || isLoading) return;

    const userText = inputMsg;
    setInputMsg('');
    setIsLoading(true);

    const tempUserMsg: Message = {
      id: 'temp-' + Date.now(),
      role: 'user',
      content: userText,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: activeConvId || undefined,
          message: userText,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error('AI Error', data.error || 'Failed to generate response.');
      } else {
        if (!activeConvId) {
          setActiveConvId(data.conversationId);
          router.push(`/chat?id=${data.conversationId}`);
        }
        setMessages((prev) => [...prev.filter((m) => m.id !== tempUserMsg.id), tempUserMsg, data.message]);
        fetchConversations();
      }
    } catch (error) {
      toast.error('Network Error', 'Check connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveSnippet = async (title: string, content: string) => {
    try {
      const res = await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.slice(0, 40),
          toolType: 'CHAT',
          content,
        }),
      });
      if (res.ok) {
        toast.success('Saved!', 'Added to your Saved Items gallery.');
      } else {
        toast.error('Save Failed', 'Could not save snippet.');
      }
    } catch (e) {
      toast.error('Save Error', 'An unexpected error occurred.');
    }
  };

  const handleDeleteConversation = async (id: string) => {
    try {
      const res = await fetch(`/api/chat/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Deleted', 'Conversation removed.');
        setDeleteConfirmId(null);
        if (activeConvId === id) {
          handleNewChat();
        }
        fetchConversations();
      }
    } catch (e) {
      toast.error('Error', 'Failed to delete conversation.');
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
      {/* Sidebar Drawer */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 flex flex-col justify-between shrink-0 h-48 md:h-full overflow-y-auto">
        <div className="space-y-4">
          <Button
            variant="primary"
            className="w-full shadow-sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={handleNewChat}
          >
            New Conversation
          </Button>

          <div className="space-y-1 pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Previous Chats
            </span>

            {conversations.length === 0 ? (
              <p className="text-xs text-slate-400 px-2 py-4 italic text-center">No previous chats</p>
            ) : (
              conversations.map((c) => (
                <div
                  key={c.id}
                  className={cn(
                    'group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors',
                    activeConvId === c.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  )}
                  onClick={() => router.push(`/chat?id=${c.id}`)}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MessageSquare className="w-3.5 h-3.5 shrink-0 text-blue-600" />
                    <span className="truncate">{c.title}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirmId(c.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Conversation Window */}
      <div className="flex-1 flex flex-col h-full bg-slate-50/50 relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">AI Assistant Workspace</h2>
              <p className="text-[11px] text-slate-500">Powered by GPT-4o Neural Reasoning Engine</p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-500 hover:text-rose-600 text-xs"
              onClick={() => setMessages([])}
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Clear Stream
            </Button>
          )}
        </div>

        {/* Messages Thread */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6">
          {isFetchingChat ? (
            <div className="space-y-4 max-w-3xl mx-auto pt-6">
              <Skeleton className="h-16 w-3/4 rounded-2xl bg-slate-200" />
              <Skeleton className="h-28 w-5/6 rounded-2xl ml-auto bg-slate-200" />
              <Skeleton className="h-20 w-2/3 rounded-2xl bg-slate-200" />
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6 max-w-md mx-auto">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 glow-blue">
                <Sparkles className="w-10 h-10 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900">How can Kynoviq AI help you today?</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ask questions, refactor architecture, write documentation, or brainstorm strategy in natural language.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full text-left pt-2">
                {[
                  'Explain quantum computing simply',
                  'Audit a React hook for memory leaks',
                  'Draft an executive launch announcement',
                  'Brainstorm 5 SaaS startup concepts',
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInputMsg(suggestion)}
                    className="p-3 text-xs bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 transition-colors shadow-sm font-medium"
                  >
                    “{suggestion}”
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    'flex gap-3 md:gap-4 text-sm animate-in fade-in duration-200',
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {m.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md shadow-blue-500/20">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl p-4 space-y-2 leading-relaxed text-xs sm:text-sm',
                      m.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-md'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                    )}
                  >
                    <div className="whitespace-pre-wrap font-sans">{m.content}</div>

                    {m.role === 'assistant' && (
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-slate-400 text-xs">
                        <button
                          onClick={() => handleCopy(m.id, m.content)}
                          className="flex items-center gap-1 hover:text-blue-600 transition-colors p-1 rounded font-medium"
                        >
                          {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                        </button>
                        <button
                          onClick={() => handleSaveSnippet(m.content.slice(0, 30), m.content)}
                          className="flex items-center gap-1 hover:text-indigo-600 transition-colors p-1 rounded font-medium"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {m.role === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 items-center text-xs text-slate-500 bg-white p-4 rounded-2xl border border-slate-200 w-fit shadow-sm">
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  <span>Kynoviq AI is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t border-slate-200 bg-white shrink-0">
          <form
            onSubmit={handleSendMessage}
            className="max-w-3xl mx-auto relative flex items-center gap-2"
          >
            <Textarea
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask Kynoviq AI anything... (Press Enter to send)"
              rows={2}
              className="pr-12 text-xs sm:text-sm bg-white"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!inputMsg.trim() || isLoading}
              isLoading={isLoading}
              className="absolute right-2 bottom-2 shadow-none rounded-lg p-2"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => deleteConfirmId && handleDeleteConversation(deleteConfirmId)}
        title="Delete Conversation"
        description="Are you sure you want to delete this chat thread?"
      />
    </div>
  );
}

export default function ChatPage() {
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 h-screen overflow-hidden">
      <Sidebar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center text-xs text-slate-400">Loading AI Workspace...</div>}>
        <ChatContent />
      </Suspense>
    </div>
  );
}
