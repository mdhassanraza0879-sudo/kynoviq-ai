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

  const userId = session.user.id;

  // Fetch metrics & recent activity
  const [conversationsCount, savedCount, usageCount, recentConversations, recentSaved] =
    await Promise.all([
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

  const quickActions = [
    {
      title: 'Start AI Chat',
      desc: 'Ask questions & solve complex tasks',
      href: '/chat',
      icon: MessageSquare,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
    {
      title: 'Summarize Text',
      desc: 'Compress documents & notes',
      href: '/tools/summarizer',
      icon: FileText,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Explain Code',
      desc: 'Audit bugs & refactor algorithms',
      href: '/tools/code',
      icon: Code2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Study Something',
      desc: 'Interactive guides & concepts',
      href: '/tools/study',
      icon: GraduationCap,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Generate Ideas',
      desc: 'Brainstorm concepts & products',
      href: '/tools/ideas',
      icon: Lightbulb,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10 border-pink-500/20',
    },
  ];

  const userName = session.user.name || 'Creator';

  return (
    <div className="min-h-screen flex bg-[#090d16] text-slate-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-8 overflow-y-auto">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <span>Welcome back, {userName}</span>
              <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Think smarter. Create faster. What would you like to build today?
            </p>
          </div>
          <Link href="/chat">
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              New AI Conversation
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Conversations</p>
              <h3 className="text-2xl font-black text-white">{conversationsCount}</h3>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Saved Items</p>
              <h3 className="text-2xl font-black text-white">{savedCount}</h3>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Tool Executions</p>
              <h3 className="text-2xl font-black text-white">{usageCount}</h3>
            </div>
          </Card>
        </div>

        {/* Quick Launch Cards */}
        <div className="space-y-4">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <span>Quick Launch Actions</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <Link key={i} href={action.href} className="group">
                  <Card hoverable className="h-full flex flex-col justify-between p-4 space-y-3">
                    <div className="space-y-3">
                      <div className={`p-2.5 rounded-xl border w-fit ${action.bg} ${action.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">{action.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-cyan-400 font-semibold gap-1 pt-2 group-hover:translate-x-1 transition-transform">
                      <span>Launch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout: Recent Conversations + Saved Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Conversations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Recent Conversations</span>
              </h2>
              <Link href="/history" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">
                View History →
              </Link>
            </div>

            {recentConversations.length === 0 ? (
              <Card className="text-center py-10 space-y-3">
                <p className="text-xs text-slate-400">No active conversations yet.</p>
                <Link href="/chat">
                  <Button size="sm" variant="outline">
                    Start Your First Chat
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-3">
                {recentConversations.map((chat) => (
                  <Link key={chat.id} href={`/chat?id=${chat.id}`}>
                    <Card hoverable className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-slate-800 text-cyan-400">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{chat.title}</h4>
                          <p className="text-[11px] text-slate-500">
                            {chat._count.messages} messages • {new Date(chat.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Saved Outputs Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-indigo-400" />
                <span>Saved Library</span>
              </h2>
              <Link href="/saved" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">
                View All Saved →
              </Link>
            </div>

            {recentSaved.length === 0 ? (
              <Card className="text-center py-10 space-y-3">
                <p className="text-xs text-slate-400">Your saved outputs will appear here.</p>
                <Link href="/tools">
                  <Button size="sm" variant="outline">
                    Explore Tools
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-3">
                {recentSaved.map((item) => (
                  <Card key={item.id} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {item.toolType}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{item.content}</p>
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
