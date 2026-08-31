'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import {
  Music,
  Sparkles,
  Play,
  Pause,
  Download,
  ShieldCheck,
  Film,
  Volume2,
} from 'lucide-react';

export default function MusicStudio() {
  const [selectedMood, setSelectedMood] = useState('Cinematic');
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const tracks = [
    {
      id: 'trk_1',
      title: 'Cyberpunk Horizon 2099',
      artist: 'Kynoviq Soundworks',
      mood: 'Futuristic',
      bpm: 124,
      key: 'F Minor',
      duration: '2:25',
      url: 'https://actions.google.com/sounds/v1/science_fiction/ambient_hum.ogg',
      license: '100% Royalty Free for Commercial SaaS & YouTube Monetization',
    },
    {
      id: 'trk_2',
      title: 'Cinematic Dawn Orchestra',
      artist: 'Aetheria Ensemble',
      mood: 'Cinematic',
      bpm: 98,
      key: 'D Major',
      duration: '3:00',
      url: 'https://actions.google.com/sounds/v1/science_fiction/alien_beacon.ogg',
      license: 'Commercial Clearance Included (YouTube & Meta Safe)',
    },
    {
      id: 'trk_3',
      title: 'Silicon Velocity Pulse',
      artist: 'HyperDrive Audio',
      mood: 'Energetic',
      bpm: 130,
      key: 'A Minor',
      duration: '1:50',
      url: 'https://actions.google.com/sounds/v1/science_fiction/computer_beeps.ogg',
      license: 'Royalty-Free Creative Commons Commercial CC-BY 4.0',
    },
    {
      id: 'trk_4',
      title: 'Deep Focus Zen Flow',
      artist: 'MindPulse',
      mood: 'Calm',
      bpm: 85,
      key: 'C Major',
      duration: '3:15',
      url: 'https://actions.google.com/sounds/v1/science_fiction/force_field.ogg',
      license: '100% Cleared for Monetized Podcasts & Explainers',
    },
  ];

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="AI Music & Sound Studio" subtitle="Contextual Soundtrack Matching & Royalty-Free Licensing" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Music className="w-4 h-4 text-amber-400" />
                <span>Filter Soundtrack by Mood</span>
              </h2>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>All Tracks Royalty-Free & Monetization Safe</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Cinematic', 'Energetic', 'Calm', 'Corporate', 'Emotional', 'Futuristic'].map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMood(m)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                    selectedMood === m
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Track List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Recommended Audio Soundtracks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tracks.map((t) => {
                const isPlaying = playingTrackId === t.id;

                return (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setPlayingTrackId(isPlaying ? null : t.id)}
                            className="p-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white shadow-lg"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                          </button>
                          <div>
                            <h4 className="text-sm font-bold text-white">{t.title}</h4>
                            <p className="text-[11px] text-slate-400">{t.artist}</p>
                          </div>
                        </div>

                        <span className="text-xs font-mono text-slate-400">{t.duration}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-400 pt-1">
                        <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05]">BPM: {t.bpm}</span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05]">Key: {t.key}</span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05]">Mood: {t.mood}</span>
                      </div>

                      <p className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                        ✓ {t.license}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                      <a href={t.url} download={`${t.title}.ogg`}>
                        <Button variant="secondary" size="sm" className="text-xs" leftIcon={<Download className="w-3.5 h-3.5" />}>
                          Download Audio
                        </Button>
                      </a>

                      <Link href="/studio/editor">
                        <Button variant="primary" size="sm" className="text-xs font-bold glow-indigo" rightIcon={<Film className="w-3.5 h-3.5" />}>
                          Add to Timeline
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
