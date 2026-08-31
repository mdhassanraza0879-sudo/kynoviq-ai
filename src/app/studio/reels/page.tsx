'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import {
  Smartphone,
  Sparkles,
  Video,
  Play,
  Scissors,
  CheckCircle2,
  Film,
  Download,
  Flame,
  ArrowRight,
} from 'lucide-react';

export default function ReelsCreatorStudio() {
  const [format, setFormat] = useState<'Reel' | 'Short' | 'TikTok'>('Reel');
  const [isProcessing, setIsProcessing] = useState(false);
  const [clipOutput, setClipOutput] = useState<any>(null);

  const handleProcessReel = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Reels & Shorts Creator Studio" subtitle="1-Click Viral Highlight Detection, 9:16 Auto-Cropping & Dynamic Hook Generation" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-rose-400" />
                    <span>Viral Format Selection</span>
                  </h2>
                  <span className="text-xs font-mono text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    8 Credits
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(['Reel', 'Short', 'TikTok'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        format === f
                          ? 'bg-rose-600 text-white shadow-md'
                          : 'bg-white/[0.02] text-slate-400 border border-white/[0.06]'
                      }`}
                    >
                      {f} (9:16)
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2 text-xs">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">⚡ Auto Capabilities</span>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li>✓ Automatic high-energy moments detector</li>
                    <li>✓ Centers speaker automatically to vertical 9:16</li>
                    <li>✓ High-contrast animated yellow subtitle overlay</li>
                    <li>✓ Generates viral description and hashtags</li>
                  </ul>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  isLoading={isProcessing}
                  onClick={handleProcessReel}
                  className="w-full text-xs font-bold py-3 glow-indigo bg-rose-600 hover:bg-rose-500"
                  leftIcon={<Flame className="w-4 h-4" />}
                >
                  Generate Viral Short Clip
                </Button>
              </div>
            </div>

            {/* Right Preview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <span className="text-xs font-bold text-white">Processed 9:16 Clip</span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-rose-400 font-bold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      Viral Score: {clipOutput.viralScore}/100
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[9/16] max-h-[380px] mx-auto rounded-2xl overflow-hidden bg-black border border-white/[0.1]">
                  <video src={clipOutput.videoUrl} autoPlay loop muted className="w-full h-full object-cover" />
                  <div className="absolute top-4 inset-x-4 text-center">
                    <span className="px-2.5 py-1 bg-black/80 text-yellow-400 font-mono font-bold text-[11px] rounded border border-yellow-400/30">
                      ⚡ Hook: “{clipOutput.hook}”
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <a href={clipOutput.videoUrl} download="viral-reel.mp4">
                    <Button variant="secondary" size="sm" className="text-xs font-bold" leftIcon={<Download className="w-3.5 h-3.5" />}>
                      Download 9:16
                    </Button>
                  </a>

                  <Link href="/studio/editor">
                    <Button variant="primary" size="sm" className="text-xs font-bold glow-indigo" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Fine-tune in Video Editor
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
