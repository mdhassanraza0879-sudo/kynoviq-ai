'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { STUDIO_TOOLS } from '@/config/site';
import {
  Sparkles,
  ArrowRight,
  Video,
  Film,
  Image as ImageIcon,
  Mic,
  Languages,
  Captions,
  Music,
  Smartphone,
  Target,
  Share2,
  Palette,
  Layers,
  FileText,
  Search,
} from 'lucide-react';

export default function ToolsDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Core AI', 'Video & Motion', 'Image & Visuals', 'Audio & Voice', 'Marketing & Social'];

  const filteredTools = STUDIO_TOOLS.filter((tool) => {
    const matchesCat = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getToolIcon = (name: string) => {
    switch (name) {
      case 'AI Creative Agent':
        return <Sparkles className="w-6 h-6 text-indigo-400" />;
      case 'AI Idea & Script Studio':
        return <FileText className="w-6 h-6 text-indigo-400" />;
      case 'AI Video Generator':
        return <Video className="w-6 h-6 text-sky-400" />;
      case 'AI Browser Video Editor':
        return <Film className="w-6 h-6 text-sky-400" />;
      case 'AI Image & Poster Generator':
        return <ImageIcon className="w-6 h-6 text-emerald-400" />;
      case 'AI Voiceover Studio':
        return <Mic className="w-6 h-6 text-indigo-400" />;
      case 'Auto Captions & Subtitles':
        return <Captions className="w-6 h-6 text-purple-400" />;
      case 'AI Video Dubbing':
        return <Languages className="w-6 h-6 text-sky-400" />;
      case 'AI Music & Sound Suggestions':
        return <Music className="w-6 h-6 text-amber-400" />;
      case 'Reels / Shorts Creator':
        return <Smartphone className="w-6 h-6 text-rose-400" />;
      case 'AI Ad Creative Generator':
        return <Target className="w-6 h-6 text-amber-400" />;
      case 'Social Media AI Studio':
        return <Share2 className="w-6 h-6 text-sky-400" />;
      case 'AI Brand Kit':
        return <Palette className="w-6 h-6 text-purple-400" />;
      case 'Template Marketplace':
        return <Layers className="w-6 h-6 text-emerald-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Complete AI Creative Workspace</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Explore All 14 Creative Studios
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Every studio is engineered for dedicated creative tasks with modular AI provider architecture.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search studios & tools..."
              className="w-full bg-[#0b0f19] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl hover:border-indigo-500/40 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:bg-indigo-600/20 group-hover:border-indigo-500/30 transition-colors">
                    {getToolIcon(tool.name)}
                  </div>
                  <div className="flex items-center gap-2">
                    {tool.badge && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {tool.badge}
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
                      {tool.creditCost} credits
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{tool.tagline}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">{tool.description}</p>
              </div>

              <div className="pt-6">
                <Link href={tool.href}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full text-xs font-bold"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Open Workspace
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
