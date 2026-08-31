'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { STUDIO_TOOLS } from '@/config/site';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function ToolDetailPage() {
  const params = useParams();
  const toolId = params?.toolId as string;

  const tool = STUDIO_TOOLS.find((t) => t.id === toolId) || STUDIO_TOOLS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full space-y-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-white/[0.08] shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{tool.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white">{tool.name}</h1>
          <p className="text-lg text-slate-300 leading-relaxed font-mono">{tool.tagline}</p>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{tool.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08] text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#07090e] border border-white/[0.05]">
              <span className="text-slate-400 block">Credit Cost</span>
              <span className="text-base font-bold text-sky-400">{tool.creditCost} Credits / Run</span>
            </div>
            <div className="p-4 rounded-xl bg-[#07090e] border border-white/[0.05]">
              <span className="text-slate-400 block">Resolution / Quality</span>
              <span className="text-base font-bold text-emerald-400">1080p / 4K Lossless</span>
            </div>
            <div className="p-4 rounded-xl bg-[#07090e] border border-white/[0.05]">
              <span className="text-slate-400 block">Commercial License</span>
              <span className="text-base font-bold text-purple-400">Included</span>
            </div>
          </div>

          <div className="pt-4">
            <Link href={tool.href}>
              <Button variant="primary" size="lg" className="text-sm font-bold glow-indigo" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Launch {tool.name} Workspace
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
