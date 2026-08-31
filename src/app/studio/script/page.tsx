'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Video,
  Mic,
  ArrowRight,
  FolderKanban,
  Edit3,
} from 'lucide-react';

export default function ScriptGeneratorStudio() {
  const [ideaPrompt, setIdeaPrompt] = useState('Create a viral YouTube video about how AI is transforming content creation');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [scriptData, setScriptData] = useState<any>({
    title: 'The Ultimate Guide to AI Content Creation in 2026',
    hook: 'Did you know that 90% of creators struggle with manual editing? Here is how to fix it in 30 seconds.',
    introduction: 'Welcome back to Kynoviq AI. Today we are breaking down the exact AI frameworks top creators use.',
    fullScript: `[SCENE 1: HOOK (0-4s)]\nVisual: Fast whip-pan cut to high-energy creator looking at camera.\nHost: "Stop scrolling if you want to master AI creation in 2026."\n\n[SCENE 2: THE PROBLEM (4-12s)]\nVisual: Split screen showing frustration with 10 different tabs vs unified AI studio.\nHost: "Most people waste hours juggling separate tools for scripts, audio, and video without results."\n\n[SCENE 3: THE AI SOLUTION (12-22s)]\nVisual: Screen recording showing 1-click video synthesis and multi-track timeline.\nHost: "With Kynoviq AI, you turn any idea into full production-grade assets in 60 seconds."\n\n[SCENE 4: CTA (22-30s)]\nVisual: Glowing brand card with animated swipe up and claim credits button.\nHost: "Try it today on Kynoviq AI and create without limits!"`,
    sceneBreakdown: [
      { sceneNumber: 1, visualDescription: 'Extreme close up with neon rim lighting, fast zoom-in', bRollSuggestions: ['Futuristic neon city timelapse', 'Fast typing on glowing cyber keyboard'], voiceoverText: 'Stop scrolling if you want to master AI creation.', durationEstimateSec: 4 },
      { sceneNumber: 2, visualDescription: 'Split screen comparing manual editing vs AI automation', bRollSuggestions: ['Overwhelmed creator staring at timeline', 'Clock ticking at 2x speed'], voiceoverText: 'Most people waste hours juggling separate tools without results.', durationEstimateSec: 8 },
      { sceneNumber: 3, visualDescription: '3D holographic workspace generating assets automatically', bRollSuggestions: ['AI neural nodes connecting', 'High-res video rendering on timeline'], voiceoverText: 'With Kynoviq AI, you turn any idea into production-grade assets in 60 seconds.', durationEstimateSec: 10 },
      { sceneNumber: 4, visualDescription: 'Hero brand card with particle glow and CTA button', bRollSuggestions: ['Satisfied creator celebrating', 'Mobile feed getting thousands of likes'], voiceoverText: 'Try it today on Kynoviq AI and create without limits!', durationEstimateSec: 8 },
    ],
    callToAction: 'Claim your 50 free credits on Kynoviq AI today!',
    videoDescription: 'Master AI video production with our comprehensive step-by-step breakdown. #KynoviqStudio #AICreator #VideoProduction',
    socialVersions: {
      shortHook: 'Stop making this huge mistake with AI video production! 🚀',
      caption: 'Here is the secret to scaling your content output 10x with unified AI workspaces.',
      hashtags: ['#KynoviqStudio', '#AICreator', '#ViralReels', '#VideoEditing'],
    },
  });

  const handleGenerate = async () => {
    if (!ideaPrompt.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: ideaPrompt }),
      });
      const data = await res.json();
      if (data.script) {
        setScriptData(data.script);
      }
    } catch (e) {
      console.warn('Script generation fallback');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(scriptData.fullScript);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="AI Idea & Script Studio" subtitle="High-Converting Viral Scripts, Scene Decompositions & Visual Directives" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Prompt Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>Creative Concept</span>
                  </h2>
                  <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    1 Credit
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Idea or Topic</label>
                  <textarea
                    rows={4}
                    value={ideaPrompt}
                    onChange={(e) => setIdeaPrompt(e.target.value)}
                    placeholder="Enter your video topic or core thesis..."
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <Button
                  variant="primary"
                  size="md"
                  isLoading={isGenerating}
                  onClick={handleGenerate}
                  className="w-full text-xs font-bold py-3 glow-indigo bg-purple-600 hover:bg-purple-500"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Generate Viral Script
                </Button>
              </div>
            </div>

            {/* Right Output Inspector & Handoff Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">{scriptData.title}</h3>
                    <span className="text-xs text-purple-400 font-mono">Ready for Production</span>
                  </div>

                  <button
                    onClick={handleCopyScript}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] text-xs font-mono text-slate-300 flex items-center gap-1.5 hover:bg-white/[0.08]"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{isCopied ? 'Copied' : 'Copy Script'}</span>
                  </button>
                </div>

                {/* Structured Script Sections */}
                <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 text-xs">
                  {/* Hook */}
                  <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1 font-mono">
                    <span className="text-[10px] font-bold uppercase text-purple-300">🔥 Viral 3-Second Hook</span>
                    <p className="text-slate-200 font-sans text-xs">“{scriptData.hook}”</p>
                  </div>

                  {/* Scene Breakdown */}
                  <div className="space-y-2">
                    <span className="font-bold text-white uppercase tracking-wider font-mono text-[10px]">
                      🎬 4-Scene Breakdown & B-Roll Suggestions
                    </span>
                    {scriptData.sceneBreakdown.map((s: any) => (
                      <div key={s.sceneNumber} className="p-3 rounded-xl bg-[#07090e] border border-white/[0.06] space-y-1 font-mono text-[11px]">
                        <div className="flex items-center justify-between text-purple-400 font-bold">
                          <span>Scene {s.sceneNumber} ({s.durationEstimateSec}s)</span>
                        </div>
                        <p className="text-slate-300 font-sans"><strong>Visual:</strong> {s.visualDescription}</p>
                        <p className="text-slate-400 font-sans"><strong>Voiceover:</strong> “{s.voiceoverText}”</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {s.bRollSuggestions.map((b: string, i: number) => (
                            <span key={i} className="px-1.5 py-0.2 bg-white/[0.03] text-slate-400 rounded text-[10px]">
                              B-Roll: {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1 font-mono text-[11px]">
                    <span className="text-slate-400 font-bold">CTA & Description:</span>
                    <p className="text-slate-300 font-sans">{scriptData.callToAction}</p>
                  </div>
                </div>

                {/* Handoff Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
                  <span className="text-xs font-mono text-slate-400">Send Script To:</span>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/studio/video?prompt=${encodeURIComponent(scriptData.hook)}`}>
                      <Button variant="secondary" size="sm" className="text-xs font-bold" leftIcon={<Video className="w-3.5 h-3.5 text-sky-400" />}>
                        Send to Video Gen
                      </Button>
                    </Link>

                    <Link href={`/studio/voiceover?text=${encodeURIComponent(scriptData.hook)}`}>
                      <Button variant="secondary" size="sm" className="text-xs font-bold" leftIcon={<Mic className="w-3.5 h-3.5 text-indigo-400" />}>
                        Send to Voiceover
                      </Button>
                    </Link>

                    <Link href={`/agent?prompt=${encodeURIComponent(ideaPrompt)}`}>
                      <Button variant="primary" size="sm" className="text-xs font-bold glow-indigo" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Send to Creative Agent
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
