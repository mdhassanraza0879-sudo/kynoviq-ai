'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import { AdInterstitialModal } from '@/components/ui/AdInterstitialModal';
import { VideoStyle, AspectRatio, CameraMovement } from '@/types/studio';
import {
  Video,
  Sparkles,
  Play,
  Download,
  Film,
  Layers,
  Settings2,
  Maximize2,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function VideoGeneratorStudio() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [duration, setDuration] = useState<number>(15);
  const [style, setStyle] = useState<VideoStyle>('Cinematic Realism');
  const [camera, setCamera] = useState<CameraMovement>('Slow Push-in Dolly');
  const [quality, setQuality] = useState<'Standard 1080p' | 'Ultra 4K'>('Standard 1080p');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<any>(null);

  const triggerGenerationWithAd = () => {
    if (!prompt.trim() || isGenerating) return;
    setShowAdModal(true);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const res = await fetch('/api/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, durationSeconds: duration, aspectRatio, style, cameraMovement: camera, quality }),
      });
      const data = await res.json();
      if (data.video) {
        setGeneratedVideo(data.video);
      }
    } catch (e) {
      console.warn('Video gen fallback');
    } finally {
      setIsGenerating(false);
    }
  };

  const presets = [
    { name: 'Instagram Reel', ratio: '9:16' as AspectRatio, dur: 15, style: 'Cinematic Realism' as VideoStyle },
    { name: 'YouTube Short', ratio: '9:16' as AspectRatio, dur: 30, style: 'Hyperrealistic 8K' as VideoStyle },
    { name: 'YouTube 16:9', ratio: '16:9' as AspectRatio, dur: 60, style: 'Cinematic Realism' as VideoStyle },
    { name: 'Social Ad 4:5', ratio: '4:5' as AspectRatio, dur: 15, style: 'Minimalist Commercial' as VideoStyle },
  ];

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="AI Video Generator Studio" subtitle="Cinematic Text & Image-to-Video Synthesis" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Controls & Parameters */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-sky-400" />
                    <span>Generation Parameters</span>
                  </h2>
                  <span className="text-xs font-mono text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    15 Credits
                  </span>
                </div>

                {/* Prompt */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Prompt Description</label>
                  <textarea
                    rows={3}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your scene in vivid detail..."
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* Presets */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 font-mono">Format Presets</label>
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => {
                          setAspectRatio(p.ratio);
                          setDuration(p.dur);
                          setStyle(p.style);
                        }}
                        className="p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] text-[11px] font-mono text-left text-slate-300 hover:text-white transition-colors"
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Aspect Ratio</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['9:16', '16:9', '1:1', '4:5'] as AspectRatio[]).map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                          aspectRatio === ratio
                            ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                            : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold text-slate-300">Scene Duration</label>
                    <span className="font-mono text-sky-400">{duration} seconds</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 text-xs font-mono">
                    {[5, 10, 15, 30, 60].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`py-1.5 rounded-lg text-center ${
                          duration === d ? 'bg-sky-600 text-white font-bold' : 'bg-white/[0.02] text-slate-400'
                        }`}
                      >
                        {d}s
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visual Style */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Visual Style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value as VideoStyle)}
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Cinematic Realism">Cinematic Realism</option>
                    <option value="Hyperrealistic 8K">Hyperrealistic 8K</option>
                    <option value="Cyberpunk Neon">Cyberpunk Neon</option>
                    <option value="Anime & Manga">Anime & Manga</option>
                    <option value="3D Pixar Animation">3D Pixar Animation</option>
                    <option value="Minimalist Commercial">Minimalist Commercial</option>
                  </select>
                </div>

                {/* Camera Movement */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Camera Movement</label>
                  <select
                    value={camera}
                    onChange={(e) => setCamera(e.target.value as CameraMovement)}
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Slow Push-in Dolly">Slow Push-in Dolly</option>
                    <option value="Dynamic Orbit 360">Dynamic Orbit 360</option>
                    <option value="Aerial Drone Crane">Aerial Drone Crane</option>
                    <option value="FPV Speed Rush">FPV Speed Rush</option>
                    <option value="Static Framing">Static Framing</option>
                  </select>
                </div>

                {/* Quality */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Render Quality</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Standard 1080p', 'Ultra 4K'] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                          quality === q
                            ? 'bg-sky-600 text-white shadow-md'
                            : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  isLoading={isGenerating}
                  onClick={handleGenerate}
                  className="w-full text-xs font-bold py-3 glow-indigo bg-sky-600 hover:bg-sky-500"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  {isGenerating ? 'Rendering 4K Scene...' : 'Generate 4K Video Scene'}
                </Button>
              </div>
            </div>

            {/* Right: Player Preview & Handoff */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <span className="text-xs font-bold text-white">Video Canvas Preview</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded border border-sky-500/20">
                      {aspectRatio} • {duration}s • {quality}
                    </span>
                  </div>
                </div>

                {/* Video Player Box */}
                <div className="relative aspect-video max-h-[420px] rounded-2xl overflow-hidden bg-black border border-white/[0.1] flex items-center justify-center">
                  {generatedVideo ? (
                    <video
                      key={generatedVideo.videoUrl}
                      src={generatedVideo.videoUrl}
                      controls
                      autoPlay
                      loop
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center space-y-2 text-slate-500">
                      <Video className="w-10 h-10 mx-auto opacity-50" />
                      <p className="text-xs">Your generated video will render here.</p>
                    </div>
                  )}
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <a href={generatedVideo?.videoUrl} download="kynoviq-video.mp4">
                      <Button variant="secondary" size="sm" className="text-xs font-bold" leftIcon={<Download className="w-3.5 h-3.5" />}>
                        Download MP4
                      </Button>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href="/studio/editor">
                      <Button variant="primary" size="sm" className="text-xs font-bold glow-indigo" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Open in Browser Video Editor
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AdInterstitialModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onAdFinished={handleGenerate}
        actionTitle="Rendering 4K Video Scene"
      />
    </div>
  );
}
