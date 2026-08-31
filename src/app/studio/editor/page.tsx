'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import { AdInterstitialModal } from '@/components/ui/AdInterstitialModal';
import { VideoEditorTrack, VideoEditorTrackItem } from '@/types/studio';
import {
  Film,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Scissors,
  Split,
  Crop,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  Download,
  Layers,
  Sparkles,
  Type,
  Smile,
  Music,
  Mic,
  Captions,
  Maximize2,
  Sliders,
  Check,
  CheckCircle2,
  Smartphone,
  Wand2,
  Zap,
} from 'lucide-react';

const INITIAL_TRACKS: VideoEditorTrack[] = [
  {
    id: 'track_video_1',
    name: 'Video Track 1',
    type: 'video',
    items: [
      {
        id: 'item_v1',
        trackId: 'track_video_1',
        type: 'video',
        title: 'Hero Cyberpunk Scene (8K)',
        startSec: 0,
        durationSec: 12,
        sourceUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      },
      {
        id: 'item_v2',
        trackId: 'track_video_1',
        type: 'video',
        title: 'Product Zoom In B-Roll',
        startSec: 12,
        durationSec: 8,
        sourceUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      },
    ],
  },
  {
    id: 'track_voice_1',
    name: 'AI Voiceover',
    type: 'voiceover',
    items: [
      {
        id: 'item_vo1',
        trackId: 'track_voice_1',
        type: 'voiceover',
        title: 'Neural Hindi / English VO',
        startSec: 0,
        durationSec: 20,
        content: 'Stop scrolling if you want to master AI creation in 2026...',
      },
    ],
  },
  {
    id: 'track_music_1',
    name: 'Background Music',
    type: 'audio',
    items: [
      {
        id: 'item_m1',
        trackId: 'track_music_1',
        type: 'audio',
        title: 'Cyberpunk Horizon (Synthwave)',
        startSec: 0,
        durationSec: 20,
        volume: 0.35,
      },
    ],
  },
  {
    id: 'track_captions_1',
    name: 'Auto Subtitles',
    type: 'caption',
    items: [
      {
        id: 'item_c1',
        trackId: 'track_captions_1',
        type: 'caption',
        title: 'Dynamic Hormozi Captions',
        startSec: 0,
        durationSec: 20,
        content: 'ONE IDEA. INFINITE CREATION.',
      },
    ],
  },
];

export default function BrowserVideoEditorStudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const totalDurationSec = 20;
  const [tracks, setTracks] = useState<VideoEditorTrack[]>(INITIAL_TRACKS);
  const [selectedItemId, setSelectedItemId] = useState<string>('item_v1');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeTab, setActiveTab] = useState<'tools' | 'ai_tools' | 'text' | 'audio' | 'export'>('tools');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);

  const triggerExportWithAd = () => {
    setShowAdModal(true);
  };

  // Playback timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalDurationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTimecode = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const f = Math.floor((secs % 1) * 30);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
    }, 2500);
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader title="AI Browser Video Editor Studio" subtitle="Multi-Track Cloud Timeline & WebGL Rendering" />

        {/* Top Control Bar */}
        <div className="h-12 bg-[#090d16] border-b border-white/[0.08] px-6 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-slate-400 hover:text-white" title="Undo">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-slate-400 hover:text-white" title="Redo">
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Autosaved</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">1080x1920 (9:16)</span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setActiveTab('export')}
              className="text-xs font-bold glow-indigo"
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Export Video
            </Button>
          </div>
        </div>

        {/* Middle: Canvas Preview + Tool Palette */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
          {/* Tool Palette Tabs (Left sidebar in editor) */}
          <div className="lg:col-span-3 bg-[#080c14] border-r border-white/[0.08] p-4 flex flex-col space-y-4 overflow-y-auto">
            <div className="grid grid-cols-3 gap-1 p-1 bg-black/40 rounded-xl border border-white/[0.05] text-[11px] font-mono">
              <button
                onClick={() => setActiveTab('tools')}
                className={`py-1.5 rounded-lg font-bold ${activeTab === 'tools' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Edit Tools
              </button>
              <button
                onClick={() => setActiveTab('ai_tools')}
                className={`py-1.5 rounded-lg font-bold flex items-center justify-center gap-1 ${
                  activeTab === 'ai_tools' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                <Sparkles className="w-3 h-3 text-sky-400" />
                <span>AI Tools</span>
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`py-1.5 rounded-lg font-bold ${activeTab === 'text' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Captions
              </button>
            </div>

            {activeTab === 'tools' && (
              <div className="space-y-3 text-xs">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Timeline Manipulation</span>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] flex items-center gap-2 text-slate-200">
                    <Scissors className="w-4 h-4 text-indigo-400" />
                    <span>Split Clip</span>
                  </button>
                  <button className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] flex items-center gap-2 text-slate-200">
                    <Crop className="w-4 h-4 text-sky-400" />
                    <span>Auto Crop 9:16</span>
                  </button>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="font-bold text-slate-300 text-xs">Speed Control ({playbackSpeed}x)</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'ai_tools' && (
              <div className="space-y-2.5 text-xs">
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-400">1-Click AI Enhancements</span>
                {[
                  { title: 'Remove Video Background', icon: <Wand2 className="w-4 h-4 text-emerald-400" />, desc: 'Green-screen removal via AI' },
                  { title: 'Auto Silence Removal', icon: <Zap className="w-4 h-4 text-amber-400" />, desc: 'Cut dead audio gaps' },
                  { title: 'Generate Viral Shorts', icon: <Smartphone className="w-4 h-4 text-rose-400" />, desc: 'Auto detect highlights' },
                  { title: 'AI Video Upscale (4K)', icon: <Sparkles className="w-4 h-4 text-sky-400" />, desc: 'Neural sharpness enhancement' },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => alert(`Activated: ${item.title}`)}
                    className="w-full p-3 rounded-xl bg-white/[0.02] hover:bg-indigo-600/20 border border-white/[0.06] hover:border-indigo-500/40 text-left space-y-1 transition-all"
                  >
                    <div className="flex items-center gap-2 font-bold text-white">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'text' && (
              <div className="space-y-3 text-xs">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Subtitle Styling</span>
                <div className="space-y-2">
                  {['Hormozi Viral Yellow', 'Clean Minimalist White', 'Neon Cyber Cyan', 'Boxed Bold Black'].map((s) => (
                    <button
                      key={s}
                      className="w-full p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] text-left text-slate-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'export' && (
              <div className="space-y-4 text-xs">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Export Settings</span>
                <div className="p-3 rounded-xl bg-slate-950 border border-white/[0.08] space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Resolution</span>
                    <span className="font-bold text-white">1080p (60 FPS)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Codec</span>
                    <span className="font-bold text-white">H.264 MP4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Est. Size</span>
                    <span className="font-bold text-white">18.4 MB</span>
                  </div>
                </div>

                {exportComplete ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                    <span className="font-bold text-white block">Ready for Download!</span>
                    <a
                      href="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                      download="kynoviq-render.mp4"
                      className="inline-block w-full py-2 bg-emerald-600 rounded-xl text-white font-bold"
                    >
                      Download Final MP4
                    </a>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    isLoading={isExporting}
                    onClick={triggerExportWithAd}
                    className="w-full font-bold glow-indigo"
                  >
                    Start Cloud Render
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Canvas Preview Player */}
          <div className="lg:col-span-9 bg-[#05070b] p-6 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="w-full max-w-sm aspect-[9/16] bg-black rounded-2xl border border-white/[0.12] overflow-hidden relative shadow-2xl flex items-center justify-center">
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                className="w-full h-full object-cover"
                muted
              />

              {/* Dynamic Live Captions Overlay */}
              <div className="absolute bottom-16 inset-x-4 text-center">
                <span className="px-3 py-1 bg-yellow-400 text-black font-black text-sm uppercase tracking-wide rounded shadow-xl">
                  ONE IDEA. INFINITE CREATION.
                </span>
              </div>

              {/* Play / Pause Center Overlay Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
              >
                <div className="p-4 rounded-full bg-indigo-600 text-white shadow-xl">
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Multi-Track Timeline */}
        <div className="h-64 bg-[#07090e] border-t border-white/[0.08] flex flex-col">
          {/* Timeline Header & Playhead Controller */}
          <div className="h-10 bg-[#090d16] border-b border-white/[0.06] px-4 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>
              <span className="font-bold text-white">{formatTimecode(currentTimeSec)}</span>
              <span className="text-slate-500">/ {formatTimecode(totalDurationSec)}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <span>Zoom: 100%</span>
            </div>
          </div>

          {/* Tracks Area */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5 font-mono text-xs">
            {tracks.map((track) => (
              <div key={track.id} className="h-10 rounded-xl bg-slate-950/80 border border-white/[0.05] flex items-center px-3 gap-3">
                <span className="w-28 font-bold text-slate-400 truncate text-[11px]">{track.name}</span>
                <div className="flex-1 h-7 rounded-lg bg-white/[0.02] border border-white/[0.04] relative overflow-hidden flex items-center px-2">
                  {track.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      className={`h-5 rounded px-2 flex items-center text-[10px] truncate cursor-pointer transition-colors ${
                        selectedItemId === item.id
                          ? 'bg-indigo-600 text-white font-bold shadow'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                      style={{ width: `${(item.durationSec / totalDurationSec) * 100}%` }}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdInterstitialModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onAdFinished={handleExport}
        actionTitle="Starting Cloud Video Render (1080p / 60FPS)"
      />
    </div>
  );
}
