'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import {
  Languages,
  Sparkles,
  Play,
  Pause,
  Download,
  CheckCircle2,
  ArrowRight,
  Split,
  Mic,
  Video,
} from 'lucide-react';

export default function DubbingStudio() {
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Hindi');
  const [isDubbing, setIsDubbing] = useState(false);
  const [dubbingOutput, setDubbingOutput] = useState<any>({
    status: 'COMPLETED',
    originalTranscript: 'Kynoviq AI automates full-scale creative workflows, delivering high-resolution video and neural voice synthesis across global languages.',
    translatedTranscript: 'क्यूनोविक एआई पूर्ण-स्तरीय रचनात्मक वर्कफ़्लो को स्वचालित करता है, वैश्विक भाषाओं में उच्च-रिज़ॉल्यूशन वीडियो और न्यूरल वॉयस सिंथेसिस प्रदान करता है।',
    originalVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    dubbedVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  });

  const handleStartDubbing = async () => {
    setIsDubbing(true);
    try {
      const res = await fetch('/api/dubbing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceLanguage: sourceLang, targetLanguage: targetLang }),
      });
      const data = await res.json();
      if (data.task) {
        setDubbingOutput(data.task);
      }
    } catch (e) {
      console.warn('Dubbing fallback');
    } finally {
      setIsDubbing(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="AI Video Dubbing Studio" subtitle="Multilingual Speech Translation, Voice Cloning & Lip Synchronization" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Languages className="w-4 h-4 text-sky-400" />
                    <span>Language Configuration</span>
                  </h2>
                  <span className="text-xs font-mono text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    10 Credits
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Source Language</label>
                    <select
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi (हिंदी)</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Target Dub Language</label>
                    <select
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="Hindi">Hindi (हिंदी)</option>
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Japanese">Japanese</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2 text-xs">
                  <span className="font-mono font-bold text-sky-400">⚡ 4-Stage Automated Pipeline:</span>
                  <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px]">
                    <li>Speech Recognition & Transcription</li>
                    <li>Context-Aware Neural Translation</li>
                    <li>Voice Clone & Tone Matching</li>
                    <li>Audio Timecode & Lip Synchronization</li>
                  </ol>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  isLoading={isDubbing}
                  onClick={handleStartDubbing}
                  className="w-full text-xs font-bold py-3 glow-indigo bg-sky-600 hover:bg-sky-500"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Start Multilingual Dubbing
                </Button>
              </div>
            </div>

            {/* Right: Side-by-Side Synchronized Comparison */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Split className="w-4 h-4 text-sky-400" />
                    <span>Side-by-Side Comparison (Original vs Dubbed)</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Dubbing Complete (100%)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Original */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 font-mono">Original ({sourceLang}):</span>
                    <div className="aspect-video rounded-xl bg-black overflow-hidden border border-white/[0.1]">
                      <video src={dubbingOutput.originalVideoUrl} controls className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[11px] text-slate-400 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                      “{dubbingOutput.originalTranscript}”
                    </p>
                  </div>

                  {/* Dubbed */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-sky-400 font-mono">Dubbed Version ({targetLang}):</span>
                    <div className="aspect-video rounded-xl bg-black overflow-hidden border border-sky-500/30">
                      <video src={dubbingOutput.dubbedVideoUrl} controls className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[11px] text-slate-200 p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 font-sans">
                      “{dubbingOutput.translatedTranscript}”
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <a href={dubbingOutput.dubbedVideoUrl} download={`dubbed-${targetLang}.mp4`}>
                    <Button variant="secondary" size="sm" className="text-xs font-bold" leftIcon={<Download className="w-3.5 h-3.5" />}>
                      Download Dubbed Video
                    </Button>
                  </a>

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
