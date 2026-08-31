'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import { Share2, Sparkles, Copy, Check, Hash, Calendar, ArrowRight } from 'lucide-react';

export default function SocialStudio() {
  const [topic, setTopic] = useState('How modern founders use AI to scale content creation');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram', 'LinkedIn', 'YouTube', 'TikTok']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const [posts, setPosts] = useState<any[]>([
    {
      platform: 'Instagram',
      caption: `✨ 3 Game-Changing steps to 10x your content output with AI:\n\n1️⃣ Automate repetitive scriptwriting & captions\n2️⃣ Focus 100% on creative vision\n3️⃣ Distribute across all channels instantly\n\nSave this post for your next launch & comment 'CREATE' for our complete template! 👇`,
      hashtags: ['#ContentCreator', '#AITools', '#CreatorEconomy', '#ReelsTips', '#KynoviqStudio'],
      cta: 'Comment CREATE for free template',
      idealPostTime: '6:30 PM EST',
      formatSuggestion: '9:16 Reel + 5-Slide Carousel',
    },
    {
      platform: 'LinkedIn',
      caption: `The future of digital content isn't about working more hours—it's about removing production friction.\n\nWhen we analyzed how modern creator teams ship content, the data was clear: teams using unified AI creative ecosystems produce 5.4x more variations at 80% lower overhead.\n\nWhat is your biggest creative bottleneck today? Let's discuss in the comments.`,
      hashtags: ['#GenerativeAI', '#Productivity', '#CreatorEconomy', '#Leadership'],
      cta: 'Share your thoughts below',
      idealPostTime: '8:45 AM EST',
      formatSuggestion: 'Text + Document Slide Deck (PDF Carousel)',
    },
  ]);

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      setSelectedPlatforms(selectedPlatforms.filter((x) => x !== p));
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: topic, platforms: selectedPlatforms }),
      });
      const data = await res.json();
      if (data.variations) {
        setPosts(data.variations);
      }
    } catch (e) {
      console.warn('Social fallback');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Social Media AI Studio" subtitle="Omnichannel Captions, Trending Hashtags & Carousel Blueprints" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Inputs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-4 shadow-xl text-xs">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-sky-400" />
                    <span>Social Parameters</span>
                  </h2>
                  <span className="font-mono text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    1 Credit
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Topic or Core Idea</label>
                  <textarea
                    rows={4}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Describe your post concept..."
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl p-3 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* Platforms Multi-Select */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-300">Target Platforms</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Instagram', 'LinkedIn', 'YouTube', 'TikTok', 'Twitter', 'Facebook'].map((p) => {
                      const active = selectedPlatforms.includes(p);
                      return (
                        <button
                          key={p}
                          onClick={() => togglePlatform(p)}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all text-left ${
                            active
                              ? 'bg-sky-600/20 border-sky-500 text-white'
                              : 'bg-white/[0.02] border-white/[0.05] text-slate-400'
                          }`}
                        >
                          {active ? '✓ ' : '+ '} {p}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  isLoading={isGenerating}
                  onClick={handleGenerate}
                  className="w-full font-bold py-3 glow-indigo bg-sky-600 hover:bg-sky-500 mt-2"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Generate Social Posts
                </Button>
              </div>
            </div>

            {/* Right Posts Feed */}
            <div className="lg:col-span-7 space-y-6">
              {posts.map((post, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-4 shadow-xl text-xs">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-bold text-white uppercase text-xs font-mono text-sky-400">
                      {post.platform} Post
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400">🕒 {post.idealPostTime}</span>
                      <button
                        onClick={() => handleCopy(post.caption, idx)}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-xs font-mono text-slate-300 flex items-center gap-1 hover:bg-white/[0.08]"
                      >
                        {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.06] whitespace-pre-wrap leading-relaxed text-slate-200 font-sans">
                    {post.caption}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.hashtags?.map((h: string, hIdx: number) => (
                      <span key={hIdx} className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 font-mono text-[10px] border border-sky-500/20">
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
                    <span>Format: {post.formatSuggestion}</span>
                    <span className="text-emerald-400 font-bold">CTA: {post.cta}</span>
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
