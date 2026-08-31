'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import { AdInterstitialModal } from '@/components/ui/AdInterstitialModal';
import { AspectRatio } from '@/types/studio';
import {
  Image as ImageIcon,
  Sparkles,
  Download,
  Wand2,
  Crop,
  Layers,
  ZoomIn,
  CheckCircle2,
  FolderKanban,
  Check,
} from 'lucide-react';

export default function ImageGeneratorStudio() {
  const [prompt, setPrompt] = useState('Photorealistic 8K product mockup of an energy drink can on dark stone pedestal with water droplets and neon backlight');
  const [style, setStyle] = useState('Photorealistic 8K');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [imageOutput, setImageOutput] = useState<any>({
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    prompt: 'Photorealistic 8K product mockup',
    aspectRatio: '1:1',
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const triggerSaveWithAd = () => {
    setShowAdModal(true);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style, aspectRatio }),
      });
      const data = await res.json();
      if (data.image) {
        setImageOutput(data.image);
      }
    } catch (e) {
      console.warn('Image generation fallback');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToAssets = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="AI Image & Poster Studio" subtitle="Photorealistic Generative Visuals, Posters & Product Shots" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Form */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>Visual Prompt</span>
                  </h2>
                  <span className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    2 Credits
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Prompt</label>
                  <textarea
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your visual concept..."
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Aspect Ratio</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['1:1', '9:16', '16:9', '4:5'] as AspectRatio[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => setAspectRatio(r)}
                        className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                          aspectRatio === r
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visual Style */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Style Preset</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Photorealistic 8K">Photorealistic 8K</option>
                    <option value="Cinematic Commercial">Cinematic Commercial</option>
                    <option value="Cyberpunk Neon 3D">Cyberpunk Neon 3D</option>
                    <option value="Minimalist Graphic Poster">Minimalist Graphic Poster</option>
                    <option value="Anime & Studio Ghibli">Anime & Studio Ghibli</option>
                  </select>
                </div>

                {/* AI Tools quick triggers */}
                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">1-Click Image Utilities</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => alert('Background Removal Applied')}
                      className="p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] text-left text-slate-300"
                    >
                      🪄 Remove Background
                    </button>
                    <button
                      onClick={() => alert('Smart Upscale 4K Applied')}
                      className="p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] text-left text-slate-300"
                    >
                      ✨ 4K Upscale
                    </button>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  isLoading={isGenerating}
                  onClick={handleGenerate}
                  className="w-full text-xs font-bold py-3 glow-indigo bg-emerald-600 hover:bg-emerald-500"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Generate 8K Image
                </Button>
              </div>
            </div>

            {/* Right Canvas */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <span className="text-xs font-bold text-white">Visual Inspector</span>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20">
                    {aspectRatio} • {style}
                  </span>
                </div>

                <div className="relative aspect-square max-h-[460px] mx-auto rounded-2xl overflow-hidden bg-black border border-white/[0.1] flex items-center justify-center">
                  <img
                    src={imageOutput.imageUrl}
                    alt={imageOutput.prompt}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <a href={imageOutput.imageUrl} target="_blank" rel="noreferrer" download="kynoviq-image.jpg">
                      <Button variant="secondary" size="sm" className="text-xs font-bold" leftIcon={<Download className="w-3.5 h-3.5" />}>
                        Download 8K
                      </Button>
                    </a>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={triggerSaveWithAd}
                      className="text-xs font-bold"
                      leftIcon={savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FolderKanban className="w-3.5 h-3.5" />}
                    >
                      {savedSuccess ? 'Saved!' : 'Save to Assets'}
                    </Button>
                  </div>

                  <Link href="/studio/editor">
                    <Button variant="primary" size="sm" className="text-xs font-bold glow-indigo">
                      Insert into Video Timeline →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AdInterstitialModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onAdFinished={handleSaveToAssets}
        actionTitle="Saving Image to Asset Library"
      />
    </div>
  );
}
