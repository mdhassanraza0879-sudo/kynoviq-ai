'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroCanvas3D } from '@/components/ui/HeroCanvas3D';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG, STUDIO_TOOLS, PRICING_PLANS, FAQ_ITEMS } from '@/config/site';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Video,
  Film,
  Image as ImageIcon,
  Mic,
  Languages,
  Captions,
  Share2,
  Target,
  Palette,
  Layers,
  Users,
  BarChart3,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Cpu,
  Zap,
  ShieldCheck,
  Check,
  Copy,
  Wand2,
  Clock,
  ExternalLink,
  Volume2,
  Send,
} from 'lucide-react';

export default function LandingPage() {
  // Sandbox State
  const [sandboxPrompt, setSandboxPrompt] = useState('Launch a 30s viral Instagram Reel for a sustainable coffee startup');
  const [isSandboxRunning, setIsSandboxRunning] = useState(false);
  const [sandboxStep, setSandboxStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Dubbing interactive preview state
  const [dubbingLanguage, setDubbingLanguage] = useState<'hindi' | 'spanish' | 'english'>('hindi');

  // Video editor preview active track
  const [activeEditorTab, setActiveEditorTab] = useState<'tracks' | 'filters' | 'captions'>('tracks');

  const handleRunSandbox = () => {
    setIsSandboxRunning(true);
    setSandboxStep(1);

    const timer1 = setTimeout(() => setSandboxStep(2), 700);
    const timer2 = setTimeout(() => setSandboxStep(3), 1500);
    const timer3 = setTimeout(() => setSandboxStep(4), 2300);
    const timer4 = setTimeout(() => {
      setSandboxStep(5);
      setIsSandboxRunning(false);
    }, 3100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', message: '' });
      setContactSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden font-sans">
      <Navbar />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden flex flex-col items-center justify-center">
        {/* Dynamic 3D Particle Canvas & Glows */}
        <HeroCanvas3D />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-br from-indigo-600/20 via-sky-500/10 to-purple-600/15 rounded-full blur-[170px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Super Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl shadow-xl shadow-indigo-950/40">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-bold tracking-wide text-slate-200">
                Next-Gen AI Creative Operating System
              </span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05]">
              One Idea. <br />
              <span className="gradient-text">Infinite Creation.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Create videos, images, scripts, voiceovers, captions, advertisements and complete social-media campaigns with one powerful AI creative workspace.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/agent" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto text-base font-bold px-8 py-4 glow-indigo shadow-2xl shadow-indigo-600/40"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Start Creating
                </Button>
              </Link>
              <Link href="/tools" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto text-base font-semibold px-8 py-4 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12]"
                >
                  Explore AI Tools
                </Button>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise Security & Commercial Rights</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Sub-Second Latency Cloud Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>14 Integrated Creative Studios</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Preview Card (Floating Futuristic Workspace) */}
          <div className="mt-14 max-w-5xl mx-auto relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-400 to-purple-500 opacity-30 blur-2xl animate-glow" />
            <div className="relative rounded-2xl bg-[#0b0f19]/90 border border-white/[0.12] backdrop-blur-2xl shadow-2xl p-4 sm:p-6 overflow-hidden">
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-300 font-bold">
                    kynoviq-creative-agent-dag-orchestrator.v2
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Live Engine Active
                  </span>
                  <span className="text-xs font-mono text-slate-400">Latency: 14ms</span>
                </div>
              </div>

              {/* Interactive Input Bar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={sandboxPrompt}
                    onChange={(e) => setSandboxPrompt(e.target.value)}
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    placeholder="Enter your idea or campaign goal..."
                  />
                </div>
                <Button
                  variant="primary"
                  size="md"
                  isLoading={isSandboxRunning}
                  onClick={handleRunSandbox}
                  className="px-6 text-xs font-bold glow-indigo"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Simulate DAG Execution
                </Button>
              </div>

              {/* Simulated DAG Visual Workflow Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { step: 1, name: '1. Strategy & Script', icon: '📝', detail: 'Viral hook & 4-scene outline generated' },
                  { step: 2, name: '2. Visual Diffusion', icon: '🎨', detail: '8K photorealistic assets synthesized' },
                  { step: 3, name: '3. Neural Voiceover', icon: '🎙️', detail: 'Hindi / English audio track timed' },
                  { step: 4, name: '4. Dynamic Captions', icon: '⚡', detail: 'Word-level Hormozi style subtitles' },
                  { step: 5, name: '5. Multi-Export', icon: '🚀', detail: '9:16 Reel + Meta Ad copy ready' },
                ].map((item) => {
                  const isActive = sandboxStep >= item.step;
                  const isCurrent = sandboxStep === item.step && isSandboxRunning;

                  return (
                    <div
                      key={item.step}
                      className={`p-3.5 rounded-xl border transition-all duration-300 ${
                        isCurrent
                          ? 'bg-indigo-600/20 border-indigo-400 shadow-lg shadow-indigo-500/20 scale-105'
                          : isActive
                          ? 'bg-white/[0.04] border-emerald-500/30'
                          : 'bg-white/[0.02] border-white/[0.05] opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg">{item.icon}</span>
                        {isActive && !isCurrent ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isCurrent ? (
                          <Cpu className="w-4 h-4 text-indigo-400 animate-spin" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-700" />
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-tight">{item.detail}</p>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Output Preview Drawer */}
              {sandboxStep >= 1 && (
                <div className="mt-6 p-4 rounded-xl bg-[#07090e] border border-white/[0.08] text-xs space-y-2 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between text-sky-400 font-bold border-b border-white/[0.06] pb-2">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Synthesized Campaign Output
                    </span>
                    <Link href="/agent" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                      <span>Open in Full Studio</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                  <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                    <span className="text-indigo-400 font-bold">[Hook]: </span>
                    “Stop buying single-use coffee pods! Here is how our biodegradable beans brew barista quality in 10 seconds.”
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-mono text-[10px] border border-indigo-500/20">
                      Format: 9:16 Vertical
                    </span>
                    <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 font-mono text-[10px] border border-sky-500/20">
                      Duration: 28s
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono text-[10px] border border-emerald-500/20">
                      Credits: 25 Used
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUSTED / USE-CASES */}
      {/* ========================================================================= */}
      <section className="py-14 bg-[#090d16] border-t border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Built For Modern High-Growth Creators & Teams
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            {[
              { role: 'Creators', icon: '🎬', desc: 'YouTube & Reels' },
              { role: 'Students', icon: '🎓', desc: 'Study & Projects' },
              { role: 'Influencers', icon: '✨', desc: 'Viral Content' },
              { role: 'Freelancers', icon: '💼', desc: 'Client Deliverables' },
              { role: 'Businesses', icon: '🏢', desc: 'SaaS & Marketing' },
              { role: 'Agencies', icon: '🚀', desc: 'Multi-Client Scale' },
              { role: 'Brands', icon: '👑', desc: 'Omnichannel Voice' },
            ].map((u) => (
              <div
                key={u.role}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/30 transition-all group"
              >
                <span className="text-2xl mb-1 block group-hover:scale-110 transition-transform">{u.icon}</span>
                <span className="text-xs font-bold text-white block">{u.role}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{u.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHAT IS KYNOVIQ STUDIO? (COMPANY INTRODUCTION) */}
      {/* ========================================================================= */}
      <section id="features" className="py-24 bg-[#07090e] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">
              About Kynoviq Studio
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              One Unified Ecosystem for the Entire Creative Lifecycle.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Kynoviq Studio is an AI-powered creative ecosystem designed to bring content creation, video editing, branding, translation, and marketing workflows into one high-performance platform.
            </p>
          </div>

          {/* 6 Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'CREATE',
                icon: <Wand2 className="w-6 h-6 text-indigo-400" />,
                desc: 'Generate viral video scripts, photorealistic images, 4K video clips, neural voiceovers, and high-converting ad copy from a single prompt.',
                badge: 'Generative AI',
              },
              {
                title: 'EDIT',
                icon: <Film className="w-6 h-6 text-sky-400" />,
                desc: 'Full multi-track browser video editor with trimming, splitting, transitions, animated text, and background removal without external software.',
                badge: 'Browser Studio',
              },
              {
                title: 'ENHANCE',
                icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
                desc: 'Smart silence removal, audio normalization, automated subtitle styling, viral hook detection, and 8K visual upscaling.',
                badge: 'Automated FX',
              },
              {
                title: 'BRAND',
                icon: <Palette className="w-6 h-6 text-purple-400" />,
                desc: 'Centrally maintain your logo, color palette, custom fonts, and brand voice. Automatically injected into every generation.',
                badge: 'Identity Kit',
              },
              {
                title: 'PUBLISH',
                icon: <Share2 className="w-6 h-6 text-amber-400" />,
                desc: 'One-click format presets for Instagram Reels, YouTube Shorts, Meta Ads, TikTok, and LinkedIn with auto-aspect ratio framing.',
                badge: 'Multi-Channel',
              },
              {
                title: 'ANALYZE',
                icon: <BarChart3 className="w-6 h-6 text-rose-400" />,
                desc: 'Track creation history, AI credits consumption, cloud storage, engagement projections, and team asset versioning seamlessly.',
                badge: 'Live Metrics',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-8 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl hover:border-indigo-500/40 transition-all group hover:-translate-y-1 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:bg-indigo-600/20 group-hover:border-indigo-500/30 transition-colors">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-300">
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mb-2">{card.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FLAGSHIP WORKSPACE: AI CREATIVE AGENT */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#090d16] border-t border-b border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Flagship DAG Orchestrator</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                AI Creative Agent: <br />
                <span className="gradient-text">Autonomous Campaign Engine.</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Give the agent one prompt like <em>“Launch a 30-second campaign for my apparel brand”</em> and watch it execute a structured 10-step pipeline. Review, pause, modify, or regenerate each milestone on demand.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  '10-Step Automated DAG Pipeline (Idea -> Script -> Video -> VO -> Captions -> Ads)',
                  'Full Step-Level Control: Pause, Edit, Skip, Retry, and Approve',
                  'Automatic Brand Kit rules and tone-of-voice alignment',
                  'Direct 1-click handoff to Browser Video Editor & Asset Library',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/agent">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Launch Creative Agent
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-[#07090e] border border-white/[0.1] shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <span className="text-xs font-bold text-white">Active Workflow Graph</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Step 6 of 10 Complete
                  </span>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  {[
                    { name: '1. Strategic Positioning', status: 'COMPLETED', time: '1.2s' },
                    { name: '2. Script & Scene Decomposition', status: 'COMPLETED', time: '2.4s' },
                    { name: '3. Visual Scene Diffusion (8K)', status: 'COMPLETED', time: '4.8s' },
                    { name: '4. Hindi / English Voiceover Synthesis', status: 'COMPLETED', time: '3.1s' },
                    { name: '5. Dynamic Subtitle Synchronization', status: 'COMPLETED', time: '1.5s' },
                    { name: '6. High-Converting Meta & TikTok Ads', status: 'PROCESSING', time: 'Active' },
                  ].map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg flex items-center justify-between border ${
                        step.status === 'COMPLETED'
                          ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-300'
                          : 'bg-indigo-500/10 border-indigo-500/30 text-white animate-pulse'
                      }`}
                    >
                      <span>{step.name}</span>
                      <span className="text-[10px] font-bold text-indigo-400">{step.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. AI VIDEO GENERATOR & 6. BROWSER VIDEO EDITOR */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#07090e] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">
              Video Production Suite
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              AI Video Generation & Browser Multi-Track Editor.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Generate cinematic clips with aspect ratios 9:16, 16:9, 1:1, and 4:5, then edit everything seamlessly on our browser timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video Generator Showcase */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/[0.08] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI Video Generator</h3>
                    <p className="text-xs text-slate-400">Cinematic text-to-video & camera control</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#07090e] border border-white/[0.08] space-y-3">
                  <div className="text-xs text-slate-300 font-mono">
                    <span className="text-sky-400">Prompt: </span>
                    “Futuristic neon cyberpunk city, slow drone push-in, 8K hyperrealistic”
                  </div>
                  <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] text-slate-300">Ratio: 9:16</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] text-slate-300">Style: Hyperreal</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] text-slate-300">Camera: Drone Push</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Support for Instagram Reels, YouTube Shorts, Meta Commercials, and long-form YouTube footage. Pluggable provider architecture with zero lock-in.
                </p>
              </div>

              <Link href="/studio/video">
                <Button variant="secondary" size="md" className="w-full text-xs font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Open Video Generator
                </Button>
              </Link>
            </div>

            {/* Browser Video Editor Showcase */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/[0.08] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Film className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Browser Video Editor</h3>
                    <p className="text-xs text-slate-400">Multi-track timeline with instant rendering</p>
                  </div>
                </div>

                {/* Timeline Visual Mockup */}
                <div className="p-3 rounded-xl bg-[#07090e] border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-1 border-b border-white/[0.06]">
                    <span>00:00:08:15</span>
                    <span className="text-indigo-400">4 Tracks Active</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="h-6 rounded bg-sky-600/30 border border-sky-500/40 px-2 flex items-center justify-between text-sky-200">
                      <span>🎬 Video Track 1 (Hero Clip)</span>
                      <span>15s</span>
                    </div>
                    <div className="h-6 rounded bg-indigo-600/30 border border-indigo-500/40 px-2 flex items-center justify-between text-indigo-200">
                      <span>🎙️ AI Voiceover (Hindi)</span>
                      <span>15s</span>
                    </div>
                    <div className="h-6 rounded bg-emerald-600/30 border border-emerald-500/40 px-2 flex items-center justify-between text-emerald-200">
                      <span>⚡ Auto Subtitles (Bold)</span>
                      <span>15s</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Trim, split, crop, speed manipulation, AI captions, silence removal, and one-click export directly from your browser.
                </p>
              </div>

              <Link href="/studio/editor">
                <Button variant="secondary" size="md" className="w-full text-xs font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Open Video Editor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. IMAGE GENERATOR & 8. VOICEOVER & 9. DUBBING */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#090d16] border-t border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              Visual & Audio Multimodality
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Studio-Grade Visuals, Voice & Multilingual Dubbing.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Image & Poster Studio */}
            <div className="p-6 rounded-2xl bg-[#07090e] border border-white/[0.08] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <ImageIcon className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">AI Image & Poster Studio</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Text-to-image, background removal, object eraser, product shots, thumbnail creator, and smart upscale in all standard aspect ratios.
                </p>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-slate-300">
                  ⚡ 1-Click Save directly to Project Assets & Timeline
                </div>
              </div>
              <Link href="/studio/image">
                <Button variant="secondary" size="sm" className="w-full text-xs">
                  Generate Visuals
                </Button>
              </Link>
            </div>

            {/* AI Voiceover Studio */}
            <div className="p-6 rounded-2xl bg-[#07090e] border border-white/[0.08] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <Mic className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-bold text-white">AI Voiceover Studio</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Studio-quality neural voices in Hindi, English, and 30+ languages with emotional style controls, pitch modulation, and waveform preview.
                </p>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-slate-300 flex items-center gap-2">
                  <Volume2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Includes natural Indian English & Hindi accents</span>
                </div>
              </div>
              <Link href="/studio/voiceover">
                <Button variant="secondary" size="sm" className="w-full text-xs">
                  Create Voiceover
                </Button>
              </Link>
            </div>

            {/* AI Dubbing Studio */}
            <div className="p-6 rounded-2xl bg-[#07090e] border border-white/[0.08] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <Languages className="w-5 h-5 text-sky-400" />
                  <h3 className="text-base font-bold text-white">Multilingual AI Dubbing</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Transcribe, translate, synthesize, and lip-sync videos into new languages with side-by-side synchronized comparison player.
                </p>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-slate-300">
                  🌐 Reach 10x larger global audiences effortlessly
                </div>
              </div>
              <Link href="/studio/dubbing">
                <Button variant="secondary" size="sm" className="w-full text-xs">
                  Dub Video Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CAPTIONS & 11. SOCIAL MEDIA & 12. AD CREATIVE */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#07090e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400">
              Growth & Conversion Engines
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Viral Captions, Social Campaigns & High-Converting Ads.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-4">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 w-fit">
                <Captions className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Auto Captions & Subtitles</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Word-by-word timestamp synchronization with Clean, Bold, Minimal, Social, and Highlight styles. Export SRT/VTT or burn directly into MP4.
              </p>
              <Link href="/studio/captions" className="inline-block text-xs font-bold text-purple-400 hover:text-purple-300">
                Generate Captions →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">AI Ad Creative Generator</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your product and target audience to generate multi-variant Meta, Google, and TikTok ad concepts, primary text, headlines, and CTAs.
              </p>
              <Link href="/studio/ad-creative" className="inline-block text-xs font-bold text-amber-400 hover:text-amber-300">
                Create High-ROAS Ads →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-4">
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 w-fit">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Social Media AI Studio</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Craft multi-platform posts, viral hooks, hashtag recommendations, and carousel blueprints tailored for Instagram, YouTube, and LinkedIn.
              </p>
              <Link href="/studio/social" className="inline-block text-xs font-bold text-sky-400 hover:text-sky-300">
                Build Social Posts →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. BRAND KIT & 14. TEMPLATES & 15. TEAMS & 16. ANALYTICS */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#090d16] border-t border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#07090e] border border-white/[0.08] space-y-3">
              <Palette className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">AI Brand Kit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Store logo, colors, fonts, and tone. Automatically applied to every video, image, and ad generation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#07090e] border border-white/[0.08] space-y-3">
              <Layers className="w-5 h-5 text-sky-400" />
              <h3 className="text-sm font-bold text-white">Template Marketplace</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                500+ creator-ready templates for Reels, YouTube Shorts, SaaS commercials, and podcasts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#07090e] border border-white/[0.08] space-y-3">
              <Users className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Team Collaboration</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Invite team members with role-based permissions (Owner, Admin, Editor, Viewer) and shared assets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#07090e] border border-white/[0.08] space-y-3">
              <BarChart3 className="w-5 h-5 text-rose-400" />
              <h3 className="text-sm font-bold text-white">Performance Analytics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Audit generation history, AI credits consumption, cloud storage, and engagement trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 17. HOW IT WORKS (4 ANIMATED CONNECTED STEPS) */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-24 bg-[#07090e] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              How Kynoviq Studio Works.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Turn raw concepts into finished, published digital content in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              {
                step: 'STEP 1',
                title: 'Describe Your Idea',
                desc: 'Type your concept, prompt, or upload existing raw video and audio assets.',
                icon: '💡',
              },
              {
                step: 'STEP 2',
                title: 'AI Builds Creative Plan',
                desc: 'Our engine generates scripts, scene breakdowns, voiceovers, and visual prompts.',
                icon: '🧠',
              },
              {
                step: 'STEP 3',
                title: 'Generate & Edit',
                desc: 'Refine scenes on the multi-track browser timeline with AI enhancement and captions.',
                icon: '✂️',
              },
              {
                step: 'STEP 4',
                title: 'Publish Everywhere',
                desc: 'Export HD/4K videos, download SRT captions, and distribute across all social channels.',
                icon: '🚀',
              },
            ].map((s, idx) => (
              <div
                key={s.step}
                className="relative p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-4 hover:border-indigo-500/40 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-[11px] font-mono font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 18. FOUNDER SECTION ("BUILT WITH VISION") */}
      {/* ========================================================================= */}
      <section id="founder" className="py-24 bg-[#090d16] border-t border-b border-white/[0.06] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">
              Leadership & Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Built with Vision.</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Meet the creator driving the architecture of Kynoviq Studio.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[#07090e] border border-white/[0.1] shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Founder Real Portrait Card */}
              <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 opacity-70 blur-md group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-gradient-to-br from-indigo-900/90 to-slate-950 flex flex-col items-center justify-center text-white">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 font-black text-2xl mb-1">
                      HR
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">Founder & CEO</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-indigo-600 text-[10px] font-mono font-bold text-white border border-white/20 shadow-lg flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-300 fill-emerald-300/20" />
                    <span>Verified</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{SITE_CONFIG.founder.name}</h3>
                  <p className="text-xs text-indigo-400 font-mono mt-1 font-semibold">{SITE_CONFIG.founder.role}</p>
                </div>
              </div>

              {/* Founder Story & Clean Contact Information */}
              <div className="md:col-span-8 space-y-5">
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  “We engineered Kynoviq Studio to eliminate the massive fragmentation in digital creation. Today’s creators and businesses shouldn’t have to stitch together 10 different expensive AI subscriptions. Kynoviq unifies scriptwriting, 4K video generation, timeline editing, neural voices, dubbing, and brand automation into a single cohesive operating system.”
                </p>

                {/* Professional Contact Card */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-slate-500 font-bold block">Founder Contact</span>
                    <div className="flex flex-wrap items-center gap-4 text-slate-300">
                      <a
                        href={`mailto:${SITE_CONFIG.founder.email}`}
                        className="inline-flex items-center gap-1.5 hover:text-indigo-300 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{SITE_CONFIG.founder.email}</span>
                      </a>
                      <a
                        href={`tel:${SITE_CONFIG.founder.phone}`}
                        className="inline-flex items-center gap-1.5 hover:text-indigo-300 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-sky-400" />
                        <span>+91 {SITE_CONFIG.founder.phone}</span>
                      </a>
                    </div>
                  </div>

                  <Link href="/about">
                    <Button variant="secondary" size="sm" className="text-xs">
                      About Story
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 19. PRICING & MONETIZATION */}
      {/* ========================================================================= */}
      <section id="pricing" className="py-24 bg-[#07090e] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">
              Simple & Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Start Free. Scale As You Create.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              No hidden fees. Full commercial rights included with every tier.
            </p>

            {/* Monthly / Yearly Switch */}
            <div className="inline-flex items-center p-1 rounded-full bg-slate-900 border border-white/[0.08] mt-4">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  billingPeriod === 'monthly' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                  billingPeriod === 'yearly' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'
                }`}
              >
                <span>Yearly Billing</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-mono">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.map((plan) => {
              const price = billingPeriod === 'yearly' ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice;

              return (
                <div
                  key={plan.tier}
                  className={`p-8 rounded-3xl flex flex-col justify-between transition-all ${
                    plan.isPopular
                      ? 'bg-[#0d1222] border-2 border-indigo-500 shadow-2xl shadow-indigo-600/20 relative scale-105'
                      : 'bg-slate-900/60 border border-white/[0.08]'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 text-white text-[11px] font-black uppercase tracking-wider shadow-lg">
                      Most Popular
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-white">${price}</span>
                      <span className="text-xs text-slate-400">/ month</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-xs font-mono text-indigo-300">
                      ✨ {plan.creditsPerMonth.toLocaleString()} AI Credits / month
                    </div>

                    <ul className="space-y-3 text-xs text-slate-300 pt-2 border-t border-white/[0.06]">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <Link href="/agent">
                      <Button
                        variant={plan.isPopular ? 'primary' : 'secondary'}
                        size="md"
                        className="w-full text-xs font-bold py-3"
                      >
                        {plan.ctaText}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 20. FAQ (ACCORDION) */}
      {/* ========================================================================= */}
      <section id="faq" className="py-24 bg-[#090d16] border-t border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = activeFaq === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#07090e] border border-white/[0.08] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02]"
                  >
                    <span className="text-sm font-bold text-white">{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.04] pt-3 animate-in fade-in duration-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 21. CONTACT SECTION */}
      {/* ========================================================================= */}
      <section id="contact" className="py-24 bg-[#07090e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-white/[0.08] shadow-2xl">
            <div className="text-center space-y-3 mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">
                Get in Touch
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Contact Kynoviq Studio</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Have questions regarding enterprise licenses, custom models, or feedback? Drop us a message.
              </p>
            </div>

            {contactSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Our architecture team will review and reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Alex Mercer"
                      className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Message or Inquiry</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us about your team or project requirements..."
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <Button variant="primary" size="md" type="submit" className="w-full text-xs font-bold glow-indigo">
                  Send Message to Architecture Team
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 22. FINAL CTA SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 bg-gradient-to-b from-[#090d16] to-[#05070b] border-t border-white/[0.08] relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0,transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Launch Your First Project in 60 Seconds</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Your Next Creation Starts Here.
          </h2>

          <p className="text-slate-300 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed">
            Turn your ideas into professional content with Kynoviq Studio. Start with 50 free credits—no credit card required.
          </p>

          <div className="pt-2">
            <Link href="/agent">
              <Button
                variant="primary"
                size="lg"
                className="text-base font-bold px-10 py-4 glow-indigo shadow-2xl shadow-indigo-600/40"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Start Creating
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 23. FOOTER */}
      {/* ========================================================================= */}
      <Footer />
    </div>
  );
}
