'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import {
  Mic,
  Sparkles,
  Play,
  Pause,
  Download,
  Volume2,
  Sliders,
  CheckCircle2,
  Film,
  Languages,
} from 'lucide-react';

interface VoiceItem {
  id: string;
  name: string;
  language: string;
  gender: 'Male' | 'Female';
  tone: string;
}

const VOICES: VoiceItem[] = [
  { id: 'voice_hassan_deep', name: 'Hassan (Deep & Authoritative)', language: 'Hindi & English (India)', gender: 'Male', tone: 'Authoritative, Tech & Commercial' },
  { id: 'voice_ananya_calm', name: 'Ananya (Smooth & Warm)', language: 'Hindi (National)', gender: 'Female', tone: 'Narrative, Documentary & Soft' },
  { id: 'voice_alex_hype', name: 'Alex (High-Energy Viral)', language: 'English (US)', gender: 'Male', tone: 'Reels, TikTok & Commercial' },
  { id: 'voice_emily_corporate', name: 'Emily (Executive Pro)', language: 'English (UK)', gender: 'Female', tone: 'Corporate, SaaS & Educational' },
  { id: 'voice_carlos_dynamic', name: 'Carlos (Passionate)', language: 'Spanish', gender: 'Male', tone: 'Commercial & Energetic' },
];

export default function VoiceoverStudio() {
  const [scriptText, setScriptText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<string>('voice_hassan_deep');
  const [speed, setSpeed] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(1.0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioOutput, setAudioOutput] = useState<any>(null);

  const handleGenerate = async () => {
    if (!scriptText.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/voiceover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: scriptText, voiceId: selectedVoice, speed, pitch }),
      });
      const data = await res.json();
      if (data.voiceover) {
        setAudioOutput(data.voiceover);
      }
    } catch (e) {
      console.warn('Voiceover fallback');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="AI Voiceover Studio" subtitle="Studio-Grade Multilingual Neural Voices & Synthesis" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Mic className="w-4 h-4 text-indigo-400" />
                    <span>Voiceover Script</span>
                  </h2>
                  <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    3 Credits
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Script (Hindi / English / Any Language)</label>
                  <textarea
                    rows={5}
                    value={scriptText}
                    onChange={(e) => setScriptText(e.target.value)}
                    placeholder="Enter speech text..."
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Voice Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">Choose Neural Voice</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {VOICES.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVoice(v.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer text-xs ${
                          selectedVoice === v.id
                            ? 'bg-indigo-600/20 border-indigo-500 shadow-md'
                            : 'bg-white/[0.02] border-white/[0.05] text-slate-300 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>{v.name}</span>
                          <span className="text-[10px] font-mono text-indigo-400">{v.language}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{v.tone}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Speed & Pitch Controls */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/[0.06]">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span>Speed</span>
                      <span className="text-indigo-400">{speed}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.05"
                      value={speed}
                      onChange={(e) => setSpeed(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span>Pitch</span>
                      <span className="text-indigo-400">{pitch}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="1.2"
                      step="0.05"
                      value={pitch}
                      onChange={(e) => setPitch(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  isLoading={isGenerating}
                  onClick={handleGenerate}
                  className="w-full text-xs font-bold py-3 glow-indigo"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Synthesize Voice Track
                </Button>
              </div>
            </div>

            {/* Right Waveform Inspector */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <span className="text-xs font-bold text-white">Audio Waveform & Player</span>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {audioOutput ? `Duration: ~${audioOutput.durationSec}s` : 'Neural Audio'}
                  </span>
                </div>

                {audioOutput ? (
                  <>
                    {/* Animated Waveform Visualizer */}
                    <div className="h-44 rounded-2xl bg-[#07090e] border border-white/[0.08] flex items-center justify-center gap-1 px-6">
                      {audioOutput.waveformFrequencies?.map((val: number, i: number) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all duration-300 ${
                            isPlaying ? 'bg-gradient-to-t from-indigo-500 to-sky-400 animate-pulse' : 'bg-indigo-600/40'
                          }`}
                          style={{ height: `${isPlaying ? Math.max(15, val) : val * 0.7}%` }}
                        />
                      ))}
                    </div>

                    {/* Audio Controls */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                        </button>
                        <div>
                          <h4 className="text-xs font-bold text-white">Generated Voice Master</h4>
                          <p className="text-[11px] text-slate-400 font-mono">48kHz Lossless WAV</p>
                        </div>
                      </div>

                      <a href={audioOutput.audioUrl} download="kynoviq-voiceover.wav">
                        <Button variant="secondary" size="sm" className="text-xs font-bold" leftIcon={<Download className="w-3.5 h-3.5" />}>
                          Download Audio
                        </Button>
                      </a>
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                      <span className="text-xs text-slate-400 font-mono">Ready for video synchronization</span>
                      <Link href="/studio/editor">
                        <Button variant="primary" size="sm" className="text-xs font-bold glow-indigo" rightIcon={<Film className="w-3.5 h-3.5" />}>
                          Attach to Video Timeline
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-indigo-400">
                      <Mic className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">No Audio Synthesized Yet</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Enter your voiceover text on the left and click &quot;Synthesize Voice Track&quot;.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
