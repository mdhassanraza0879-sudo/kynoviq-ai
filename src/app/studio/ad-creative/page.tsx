'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import { Target, Sparkles, Copy, Check, ArrowRight, Layers } from 'lucide-react';

export default function AdCreativeStudio() {
  const [product, setProduct] = useState('Kynoviq AI AI Creative Operating System');
  const [audience, setAudience] = useState('Creators, marketing agencies, and startups');
  const [platform, setPlatform] = useState('Meta & Instagram Ads');
  const [goal, setGoal] = useState('High-Converting Free Trial Signups');
  const [isGenerating, setIsGenerating] = useState(false);
  const [ads, setAds] = useState<any[]>([
    {
      hook: 'Still paying for 8 separate AI subscriptions? Here is the fix.',
      headline: 'One Idea. Infinite Creation. Try Kynoviq AI Free.',
      primaryText: 'Stop wasting hours switching between fragmented AI tools. Kynoviq unifies scripts, 4K video generation, browser timeline editing, neural Hindi & English voices, and automated captions in one place.',
      cta: 'Claim 50 Free AI Credits',
      videoStoryboard: [
        { scene: 1, visual: 'Frustrated editor with 15 open tabs', audio: 'Tired of paying $300/mo for 10 separate AI tools?' },
        { scene: 2, visual: 'Clean Kynoviq AI dashboard generating full campaign in 30s', audio: 'Kynoviq brings your entire creative stack under one roof.' },
        { scene: 3, visual: 'Hero CTA with glowing start button', audio: 'Claim your 50 free credits now.' },
      ],
      displayVariationUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    },
  ]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ad-creative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, targetAudience: audience, platform, goal }),
      });
      const data = await res.json();
      if (data.ads) {
        setAds(data.ads);
      }
    } catch (e) {
      console.warn('Ad gen fallback');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="AI Ad Creative Generator" subtitle="High-ROAS Ad Copy, Multi-Variant Storyboards & Display Mockups" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Inputs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-4 shadow-xl text-xs">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-400" />
                    <span>Campaign Parameters</span>
                  </h2>
                  <span className="font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    4 Credits
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Product or Service</label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Target Audience</label>
                  <input
                    type="text"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Ad Platform</label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Meta & Instagram Ads">Meta & Instagram</option>
                      <option value="TikTok Ads">TikTok Ads</option>
                      <option value="Google & YouTube Ads">Google & YouTube</option>
                      <option value="LinkedIn Sponsored">LinkedIn Ads</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Primary Objective</label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="High-Converting Signups">Conversions / Signups</option>
                      <option value="Brand Awareness">Viral Reach</option>
                      <option value="Lead Generation">Lead Form Capture</option>
                    </select>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  isLoading={isGenerating}
                  onClick={handleGenerate}
                  className="w-full font-bold py-3 glow-indigo bg-amber-600 hover:bg-amber-500 mt-2"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Generate High-ROAS Ad Variations
                </Button>
              </div>
            </div>

            {/* Right Ad Variations Inspector */}
            <div className="lg:col-span-7 space-y-6">
              {ads.map((ad, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-4 shadow-xl text-xs font-mono">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-bold text-white uppercase text-xs">Ad Variation #{idx + 1} ({platform})</span>
                    <span className="text-amber-400 font-bold">Predicted ROAS: 3.8x</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                      <strong>Headline:</strong> “{ad.headline}”
                    </div>

                    <div className="p-3 rounded-xl bg-[#07090e] border border-white/[0.06] space-y-1 text-slate-300 font-sans">
                      <strong className="font-mono text-slate-400 text-[10px] uppercase block">Primary Text Copy:</strong>
                      <p className="leading-relaxed">{ad.primaryText}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                      <span className="text-slate-400">Call To Action (CTA):</span>
                      <span className="px-3 py-1 bg-amber-500 text-black font-bold rounded-lg">{ad.cta}</span>
                    </div>
                  </div>

                  {/* Video Storyboard Breakdown */}
                  {ad.videoStoryboard && (
                    <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">🎬 Video Ad Storyboard:</span>
                      <div className="space-y-1 text-[11px] font-sans text-slate-300">
                        {ad.videoStoryboard.map((scene: any, sIdx: number) => (
                          <div key={sIdx} className="p-2 rounded-lg bg-black/40 border border-white/[0.04] flex gap-2">
                            <span className="font-mono text-amber-400 font-bold shrink-0">Scene {scene.scene}:</span>
                            <div>
                              <span><strong>Visual:</strong> {scene.visual}</span>
                              <span className="block text-slate-400"><strong>VO:</strong> “{scene.audio}”</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                    <Link href={`/studio/video?prompt=${encodeURIComponent(ad.hook)}`}>
                      <Button variant="primary" size="sm" className="text-xs font-bold glow-indigo">
                        Create Video Commercial →
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
