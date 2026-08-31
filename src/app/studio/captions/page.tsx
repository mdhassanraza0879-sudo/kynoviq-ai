'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import {
  Captions,
  Sparkles,
  Download,
  Play,
  Film,
  CheckCircle2,
  FileText,
  Copy,
  Check,
} from 'lucide-react';

export default function CaptionsStudio() {
  const [inputText, setInputText] = useState('ONE IDEA TRANSFORMS INTO INFINITE CREATION WITH Kynoviq AI.');
  const [style, setStyle] = useState<'social' | 'bold' | 'clean' | 'highlight'>('social');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [subtitles, setSubtitles] = useState([
    { start: '00:00:00', end: '00:00:01', text: 'ONE IDEA' },
    { start: '00:00:01', end: '00:00:02', text: 'TRANSFORMS INTO' },
    { start: '00:00:02', end: '00:00:04', text: 'INFINITE CREATION' },
    { start: '00:00:04', end: '00:00:06', text: 'WITH Kynoviq AI' },
  ]);

  const handleGenerate = async () => {
    if (!inputText.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, style }),
      });
      const data = await res.json();
      if (data.captions?.subtitles) {
        setSubtitles(
          data.captions.subtitles.map((s: any) => ({
            start: '00:00:00',
            end: '00:00:02',
            text: s.text,
          }))
        );
      }
    } catch (e) {
      console.warn('Captions fallback');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopySRT = () => {
    const srt = `1\n00:00:00,000 --> 00:00:02,000\nONE IDEA\n\n2\n00:00:02,000 --> 00:00:04,000\nINFINITE CREATION\n\n3\n00:00:04,000 --> 00:00:06,000\nWITH Kynoviq AI`;
    navigator.clipboard.writeText(srt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Auto Captions & Subtitles Studio" subtitle="Word-Level Timestamp Synchronization & Viral Styling" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Captions className="w-4 h-4 text-purple-400" />
                    <span>Captions Source</span>
                  </h2>
                  <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    2 Credits
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Speech or Transcript Text</label>
                  <textarea
                    rows={4}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter transcript or video narration..."
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Caption Styles */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">Caption Style Preset</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'social', name: '⚡ Viral Hormozi (Yellow/Black)' },
                      { id: 'bold', name: '🔲 Bold Boxed Neon' },
                      { id: 'clean', name: '✨ Minimal Clean White' },
                      { id: 'highlight', name: '🎯 Word-by-Word Highlight' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStyle(s.id as any)}
                        className={`p-3 rounded-xl border text-left text-xs font-mono transition-all ${
                          style === s.id
                            ? 'bg-purple-600/20 border-purple-500 text-white font-bold'
                            : 'bg-white/[0.02] border-white/[0.05] text-slate-400 hover:text-white'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  isLoading={isGenerating}
                  onClick={handleGenerate}
                  className="w-full text-xs font-bold py-3 glow-indigo bg-purple-600 hover:bg-purple-500"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Synchronize Subtitles
                </Button>
              </div>
            </div>

            {/* Right Video Overlay Preview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <span className="text-xs font-bold text-white">Live Subtitle Overlay Preview</span>
                  <button
                    onClick={handleCopySRT}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-xs font-mono text-slate-300 flex items-center gap-1"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied SRT' : 'Copy SRT'}</span>
                  </button>
                </div>

                {/* Video Player Box with dynamic subtitles */}
                <div className="relative aspect-[9/16] max-h-[380px] mx-auto rounded-2xl overflow-hidden bg-black border border-white/[0.1] flex items-center justify-center">
                  <video
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-10 inset-x-4 text-center">
                    <span className="px-3 py-1 bg-yellow-400 text-black font-black text-sm uppercase tracking-wider rounded shadow-2xl">
                      {subtitles[0]?.text || 'ONE IDEA. INFINITE CREATION.'}
                    </span>
                  </div>
                </div>

                {/* Subtitle Table */}
                <div className="space-y-2 max-h-40 overflow-y-auto font-mono text-xs">
                  {subtitles.map((sub, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-[#07090e] border border-white/[0.05] flex items-center justify-between">
                      <span className="text-purple-400 font-bold">{sub.start} - {sub.end}</span>
                      <span className="text-slate-200 font-bold">{sub.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <span className="text-xs text-slate-400 font-mono">Compatible with Premiere, CapCut & Kynoviq Editor</span>
                  <Link href="/studio/editor">
                    <Button variant="primary" size="sm" className="text-xs font-bold glow-indigo">
                      Open in Video Editor →
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
