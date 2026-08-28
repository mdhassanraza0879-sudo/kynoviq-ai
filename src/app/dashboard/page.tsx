import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AI_TOOLS } from '@/config/tools';
import {
  MessageSquare,
  FileText,
  Code2,
  GraduationCap,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Clock,
  Bookmark,
  TrendingUp,
} from 'lucide-react';

export const metadata = {
  title: 'Dashboard — Kynoviq AI',
  description: 'Manage your intelligent AI conversations, saved outputs, and quick tools.',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard');
  }

  const userId = session.user.id || 'cmt_founder_production_id';

  let conversationsCount = 0;
  let savedCount = 0;
  let usageCount = 0;
  let recentConversations: any[] = [];
  let recentSaved: any[] = [];

  try {
    const results = await Promise.all([
      prisma.conversation.count({ where: { userId } }),
      prisma.savedItem.count({ where: { userId } }),
      prisma.toolUsage.count({ where: { userId } }),
      prisma.conversation.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        take: 4,
        include: { _count: { select: { messages: true } } },
      }),
      prisma.savedItem.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
    ]);

    conversationsCount = results[0] || 0;
    savedCount = results[1] || 0;
    usageCount = results[2] || 0;
    recentConversations = results[3] || [];
    recentSaved = results[4] || [];
  } catch (e) {
    console.warn('Dashboard DB fetch serverless fallback:', e);
  }

  const quickActions = [
    {
      title: 'Start AI Chat',
      desc: 'Ask questions & solve complex tasks',
      icon: MessageSquare,
      href: '/chat',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      title: 'Summarize Text',
      desc: 'Condense long articles & papers',
      icon: FileText,
      href: '/tools/summarizer',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Code Assistant',
      desc: 'Refactor, debug & explain code',
      icon: Code2,
      href: '/tools/code',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Study Assistant',
      desc: 'Generate study guides & flashcards',
      icon: GraduationCap,
      href: '/tools/study',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#0b0f19] text-slate-100 h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Workspace Dashboard</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Welcome back, <span className="gradient-text">{session.user.name || 'Creator'}</span>
            </h1>
            <p className="text-xs text-slate-400">
              Here is your intelligent AI activity overview and quick workspace launcher.
            </p>
          </div>

          <Link href="/chat">
            <Button variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
              Launch AI Assistant
            </Button>
          </Link>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="flex items-center gap-4 p-5">
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Conversations</p>
              <h3 className="text-2xl font-black text-white">{conversationsCount}</h3>
            </div>
          </Card>

          <Card className="flex items-center gap-4 p-5">
            <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Saved Snippets</p>
              <h3 className="text-2xl font-black text-white">{savedCount}</h3>
            </div>
          </Card>

          <Card className="flex items-center gap-4 p-5">
            <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tool Executions</p>
              <h3 className="text-2xl font-black text-white">{usageCount}</h3>
            </div>
          </Card>
        </div>

        {/* Quick Launch Actions */}
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">Quick Launchers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <Link key={i} href={action.href}>
                  <Card hoverable className="h-full flex flex-col justify-between p-5 space-y-4 group">
                    <div className="space-y-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{action.title}</h3>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{action.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform pt-2">
                      <span>Launch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
          {/* Recent Threads */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Recent Conversations</span>
              </h2>
              <Link href="/chat" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                View All →
              </Link>
            </div>

            {recentConversations.length === 0 ? (
              <Card className="text-center py-8 text-xs text-slate-500 italic">
                No recent conversations. Start a new chat to get started!
              </Card>
            ) : (
              <div className="space-y-3">
                {recentConversations.map((c) => (
                  <Link key={c.id} href={`/chat?id=${c.id}`}>
                    <Card hoverable className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <MessageSquare className="w-4 h-4 text-indigo-400 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{c.title}</p>
                          <p className="text-[11px] text-slate-500">{c._count?.messages || 0} messages</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(c.updatedAt).toLocaleDateString()}
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Saved Snippets Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-sky-400" />
                <span>Saved Library</span>
              </h2>
              <Link href="/saved" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                View Gallery →
              </Link>
            </div>

            {recentSaved.length === 0 ? (
              <Card className="text-center py-8 text-xs text-slate-500 italic">
                No saved snippets yet. Save outputs from tools anytime.
              </Card>
            ) : (
              <div className="space-y-3">
                {recentSaved.map((s) => (
                  <Card key={s.id} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                        {s.toolType}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white truncate">{s.title}</p>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed bg-slate-950/60 p-2 rounded border border-slate-800">
                      {s.content}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
