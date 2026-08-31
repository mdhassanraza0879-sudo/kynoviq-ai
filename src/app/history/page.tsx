'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import { History, Sparkles, RotateCcw, Download, Trash2, Search, ArrowRight } from 'lucide-react';

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [historyItems, setHistoryItems] = useState([
    { id: 'gen_1', type: 'AI Creative Agent DAG', prompt: '30s viral Instagram campaign for eco-friendly sneakers', credits: 25, status: 'COMPLETED', date: '15m ago', route: '/agent' },
    { id: 'gen_2', type: 'AI Voiceover (Hindi / English)', prompt: 'Stop scrolling if you want to master AI in 2026...', credits: 3, status: 'COMPLETED', date: '1h ago', route: '/studio/voiceover' },
    { id: 'gen_3', type: 'Video Diffusion (9:16)', prompt: 'Cinematic Tokyo cyberpunk skyline drone push 8K', credits: 15, status: 'COMPLETED', date: '3h ago', route: '/studio/video' },
    { id: 'gen_4', type: 'Auto Subtitles Synchronizer', prompt: 'Word-level sync for YouTube Shorts clip', credits: 2, status: 'COMPLETED', date: '5h ago', route: '/studio/captions' },
    { id: 'gen_5', type: 'AI Ad Creative Generator', prompt: 'Multi-variant Meta Ads for SaaS productivity suite', credits: 4, status: 'COMPLETED', date: 'Yesterday', route: '/studio/ad-creative' },
    { id: 'gen_6', type: 'AI Multilingual Dubbing', prompt: 'English video translation to Hindi with voice clone', credits: 10, status: 'COMPLETED', date: '2 days ago', route: '/studio/dubbing' },
  ]);

  const filtered = historyItems.filter((item) =>
    item.prompt.toLowerCase().includes(search.toLowerCase()) ||
    item.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Generation History & Audit Log" subtitle="Comprehensive Generation Timeline, Credit Ledger & Re-run Triggers" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search history by prompt or tool..."
                className="w-full bg-slate-900 border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <span className="text-xs font-mono text-slate-400">Total Runs: {historyItems.length}</span>
          </div>

          {/* Table / List */}
          <div className="rounded-3xl bg-slate-900/60 border border-white/[0.08] overflow-hidden divide-y divide-white/[0.06] shadow-xl text-xs">
            {filtered.map((item) => (
              <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/[0.02]">
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{item.type}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.2 rounded border border-emerald-500/20">
                      {item.status}
                    </span>
                    <span className="text-[10px] font-mono text-indigo-300">-{item.credits} Credits</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{item.prompt}</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-[11px] font-mono text-slate-500">{item.date}</span>

                  <Link href={item.route}>
                    <Button variant="secondary" size="sm" className="text-xs font-bold font-mono" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Open Studio
                    </Button>
                  </Link>

                  <button
                    onClick={() => setHistoryItems(historyItems.filter((x) => x.id !== item.id))}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
