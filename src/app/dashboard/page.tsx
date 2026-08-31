'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import { STUDIO_TOOLS } from '@/config/site';
import {
  Sparkles,
  ArrowRight,
  Video,
  Film,
  Image as ImageIcon,
  Mic,
  Languages,
  Captions,
  Plus,
  FolderKanban,
  FileBox,
  TrendingUp,
  CreditCard,
  HardDrive,
  Play,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function DashboardPage() {
  const quickStudios = STUDIO_TOOLS.slice(0, 8);

  const recentProjects = [
    {
      id: 'proj_1',
      title: 'Quantum SaaS Product Launch (Reel + Ad)',
      category: 'REELS',
      updatedAt: '12 mins ago',
      assetsCount: 6,
      status: 'READY',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'proj_2',
      title: 'AI Tutorial Step-by-Step Short (Hindi + English)',
      category: 'SHORTS',
      updatedAt: '2 hours ago',
      assetsCount: 4,
      status: 'IN_PROGRESS',
      thumbnailUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'proj_3',
      title: 'Sustainable Apparel Brand Campaign',
      category: 'CAMPAIGN',
      updatedAt: 'Yesterday',
      assetsCount: 10,
      status: 'READY',
      thumbnailUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const recentGenerations = [
    { id: 'gen_1', type: 'AI Creative Agent', prompt: '30s viral Instagram campaign for coffee brand', credits: 25, status: 'COMPLETED', time: '15m ago' },
    { id: 'gen_2', type: 'AI Voiceover (Hindi)', prompt: 'Stop scrolling if you want to master AI...', credits: 3, status: 'COMPLETED', time: '1h ago' },
    { id: 'gen_3', type: 'Video Diffusion (9:16)', prompt: 'Cyberpunk neon skyline drone push-in 8K', credits: 15, status: 'COMPLETED', time: '3h ago' },
    { id: 'gen_4', type: 'Auto Subtitles', prompt: 'Word-level sync for YouTube Shorts clip', credits: 2, status: 'COMPLETED', time: '5h ago' },
  ];

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Workspace Overview" subtitle="Welcome back, Mohammad Hassan Raza" />

        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* Top Hero Banner: AI Creative Agent Quick Launcher */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900/90 to-sky-950/60 border border-indigo-500/30 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Autonomous Creative Agent</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Turn Any Idea into a Complete Cross-Platform Campaign.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Describe your goal. The agent automatically writes scripts, generates 8K visuals, records neural voiceovers, synchronizes captions, and prepares multi-channel exports.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/agent">
                  <Button variant="primary" size="md" className="text-xs font-bold glow-indigo" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Launch Creative Agent
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="secondary" size="md" className="text-xs font-semibold">
                    Browse Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Total Projects</span>
                <FolderKanban className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-black text-white">12</div>
              <span className="text-[10px] text-emerald-400 font-mono">+3 created this week</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>AI Credits Available</span>
                <Sparkles className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-black text-sky-400">45 <span className="text-xs text-slate-500 font-normal">/ 50</span></div>
              <span className="text-[10px] text-slate-400 font-mono">Resets in 18 days</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Media Assets</span>
                <FileBox className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white">48</div>
              <span className="text-[10px] text-slate-400 font-mono">Videos, VO, Images</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Cloud Storage</span>
                <HardDrive className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-white">142 <span className="text-xs text-slate-500 font-normal">MB</span></div>
              <span className="text-[10px] text-slate-400 font-mono">of 500 MB Free quota</span>
            </div>
          </div>

          {/* Quick Creative Studios Launcher Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Creative Studios</h3>
              <Link href="/tools" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                View All Studios →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickStudios.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-indigo-500/40 transition-all group flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {tool.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{tool.creditCost}cr</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{tool.tagline}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Active Projects Showcase */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Active Projects</h3>
              <Link href="/projects" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                All Projects →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recentProjects.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/projects?id=${proj.id}`}
                  className="rounded-2xl bg-slate-900/60 border border-white/[0.08] overflow-hidden group hover:border-indigo-500/40 transition-all shadow-xl"
                >
                  <div className="aspect-video relative bg-slate-950">
                    <img src={proj.thumbnailUrl} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80" />
                    <div className="absolute top-2 left-2">
                      <span className="text-[9px] font-mono font-bold bg-black/80 px-2 py-0.5 rounded text-white border border-white/[0.1]">
                        {proj.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {proj.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{proj.assetsCount} Assets</span>
                      <span>{proj.updatedAt}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Generation Stream / Audit History */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Recent Generations</h3>
              <Link href="/history" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                Full Generation Log →
              </Link>
            </div>

            <div className="rounded-2xl bg-slate-900/60 border border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden text-xs">
              {recentGenerations.map((gen) => (
                <div key={gen.id} className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02]">
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{gen.type}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                        {gen.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{gen.prompt}</p>
                  </div>

                  <div className="flex items-center gap-4 text-right shrink-0">
                    <span className="text-[11px] font-mono text-indigo-300 font-semibold">-{gen.credits} cr</span>
                    <span className="text-[10px] font-mono text-slate-500">{gen.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
