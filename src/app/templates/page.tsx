'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Sparkles, Layers, Play, ArrowRight, Star, Copy, Check } from 'lucide-react';

interface TemplateItem {
  id: string;
  title: string;
  category: string;
  aspectRatio: string;
  durationSec: number;
  remixCount: number;
  thumbnailUrl: string;
  previewUrl: string;
  description: string;
  tags: string[];
}

const TEMPLATES: TemplateItem[] = [
  {
    id: 'tpl_1',
    title: 'Viral Hook Explainer (Alex Hormozi Style)',
    category: 'Reels',
    aspectRatio: '9:16',
    durationSec: 25,
    remixCount: 1420,
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'High-contrast bold animated captions, dynamic camera zoom-ins, fast sound FX, and punchy 3-beat rhythm.',
    tags: ['Viral', 'Hormozi', 'Captions', 'Educational'],
  },
  {
    id: 'tpl_2',
    title: 'SaaS Product Launch Commercial',
    category: 'Ads',
    aspectRatio: '16:9',
    durationSec: 30,
    remixCount: 890,
    thumbnailUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Sleek UI zoom animations, futuristic glass cards, dynamic metric counters, and corporate synth background.',
    tags: ['SaaS', 'Commercial', 'Tech', 'Launch'],
  },
  {
    id: 'tpl_3',
    title: 'AI Tutorial Step-by-Step Short',
    category: 'Shorts',
    aspectRatio: '9:16',
    durationSec: 40,
    remixCount: 610,
    thumbnailUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80',
    previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    description: 'Clean split screen with terminal code highlight, automated subtitle overlays, and direct arrow annotations.',
    tags: ['Tutorial', 'Coding', 'AI', 'Shorts'],
  },
  {
    id: 'tpl_4',
    title: 'E-Commerce Direct Response Story Ad',
    category: 'E-commerce',
    aspectRatio: '9:16',
    durationSec: 20,
    remixCount: 1150,
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    description: 'Problem-Agitation-Solution format optimized for Meta & TikTok performance ads with swipe-up hook.',
    tags: ['Ecom', 'Ad', 'Meta', 'Conversion'],
  },
  {
    id: 'tpl_5',
    title: 'Corporate Executive Thought Leadership',
    category: 'Business',
    aspectRatio: '1:1',
    durationSec: 45,
    remixCount: 430,
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'Sophisticated typography, calm minimalist pacing, and authoritative voiceover cadence for LinkedIn and PR.',
    tags: ['Corporate', 'LinkedIn', 'Square', 'ThoughtLeadership'],
  },
  {
    id: 'tpl_6',
    title: 'High-Energy Gaming Highlights Reel',
    category: 'Gaming',
    aspectRatio: '9:16',
    durationSec: 18,
    remixCount: 970,
    thumbnailUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Bass-boosted impact shakes, RGB glitch transitions, and automated hype text triggers.',
    tags: ['Gaming', 'Glitch', 'Hype', 'Shorts'],
  },
];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);

  const categories = ['All', 'Reels', 'Shorts', 'Ads', 'Business', 'E-commerce', 'Gaming'];

  const filtered = TEMPLATES.filter((t) => selectedCategory === 'All' || t.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>500+ Production Blueprints</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Template Marketplace</h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Start with proven formats designed for maximum retention, viral reach, and conversion.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 pb-4 border-b border-white/[0.08]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.05]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-900/60 border border-white/[0.08] overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 transition-all group shadow-xl"
            >
              <div className="space-y-3">
                {/* Thumbnail / Video Container */}
                <div
                  className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer group"
                  onClick={() => setPreviewTemplate(item)}
                >
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-3 rounded-full bg-indigo-600 text-white shadow-xl">
                      <Play className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-white border border-white/[0.1]">
                      {item.aspectRatio}
                    </span>
                    <span className="text-[10px] font-mono bg-indigo-600/80 backdrop-blur-md px-2 py-0.5 rounded text-white font-bold">
                      {item.durationSec}s
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="text-indigo-400 font-bold uppercase">{item.category}</span>
                    <span>{item.remixCount.toLocaleString()} remixes</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link href={`/agent?template=${item.id}`}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full text-xs font-bold"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Use This Template
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Video Preview Modal */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-[#0b0f19] border border-white/[0.1] rounded-3xl p-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{previewTemplate.title}</h3>
                  <span className="text-xs text-indigo-400 font-mono">{previewTemplate.category} Template</span>
                </div>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="text-slate-400 hover:text-white text-xs font-mono px-3 py-1 bg-white/[0.05] rounded-lg"
                >
                  Close
                </button>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/[0.1]">
                <video src={previewTemplate.previewUrl} controls autoPlay className="w-full h-full object-contain" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-slate-400">{previewTemplate.description}</p>
                <Link href={`/agent?template=${previewTemplate.id}`}>
                  <Button variant="primary" size="sm" className="text-xs font-bold shrink-0">
                    Use Template
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
