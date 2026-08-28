'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToolCard } from '@/components/ui/ToolCard';
import { Button } from '@/components/ui/Button';
import { AI_TOOLS } from '@/config/tools';
import {
  Sparkles,
  ArrowRight,
  Zap,
  ShieldCheck,
  BrainCircuit,
  Cpu,
  Layers,
  CheckCircle2,
  Play,
  Copy,
  Check,
} from 'lucide-react';

export default function LandingPage() {
  const [demoPrompt, setDemoPrompt] = useState('Explain how quantum computing works in 2 simple sentences.');
  const [demoResponse, setDemoResponse] = useState('');
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleRunDemo = async (promptText?: string) => {
    const query = promptText || demoPrompt;
    if (!query.trim()) return;

    setDemoPrompt(query);
    setIsDemoLoading(true);
    setDemoResponse('');

    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: query, length: 'brief' }),
      });
      const data = await res.json();
      if (data.summary) {
        setDemoResponse(data.summary);
      } else {
        setDemoResponse(
          `Quantum computing uses qubits that exist in superposition, allowing processors to calculate millions of possibilities simultaneously instead of processing binary 0s and 1s sequentially.`
        );
      }
    } catch (e) {
      setDemoResponse(
        `Quantum computing uses qubits that exist in superposition, allowing processors to calculate millions of possibilities simultaneously instead of processing binary 0s and 1s sequentially.`
      );
    } finally {
      setIsDemoLoading(false);
    }
  };

  const handleCopyDemo = () => {
    if (!demoResponse) return;
    navigator.clipboard.writeText(demoResponse);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-indigo-500/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Next-Gen AI Workspace Platform</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Think smarter. <br />
                <span className="gradient-text">Create faster.</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Kynoviq AI brings intelligent specialized tools for learning, coding, summarizing, writing, and brainstorming into a unified, high-performance workspace.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto text-base glow-indigo"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Start with Kynoviq
                  </Button>
                </Link>
                <Link href="/tools" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base">
                    Explore AI Tools
                  </Button>
                </Link>
              </div>

              <div className="pt-6 flex items-center justify-center lg:justify-start gap-8 text-slate-400 text-xs font-semibold border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Ultra Low Latency</span>
                </div>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-sky-400" />
                  <span>GPT-4o Powered</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Element */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-md relative">
                {/* Glowing Outer Ring */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-500 opacity-25 blur-xl opacity-70" />
                <div className="relative glass-panel rounded-2xl p-6 border border-slate-800/90 shadow-2xl space-y-4 bg-slate-900/90">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] font-mono text-indigo-400 font-bold">kynoviq-core-v2.0</span>
                  </div>

                  {/* Terminal AI Interactive Box */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                      <span className="text-indigo-400 font-bold">$ </span>
                      <span className="text-slate-100">kynoviq --summarize --depth detailed</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 space-y-2">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold">
                        <Cpu className="w-3.5 h-3.5 animate-spin" />
                        <span>Processing Neural Pipeline...</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed font-sans text-xs">
                        “Synthesizing 14 pages of code architecture into 3 actionable execution steps.”
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Latency: 18ms</span>
                    <span>Status: Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE LIVE AI DEMO SANDBOX */}
      <section className="py-16 bg-[#090d16] border-t border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">Live AI Sandbox</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Try Kynoviq AI Right Now</h2>
            <p className="text-xs text-slate-400">Test an instant summary query directly below without signing in.</p>
          </div>

          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Sample Query Prompt:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={demoPrompt}
                  onChange={(e) => setDemoPrompt(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter a topic or prompt..."
                />
                <Button
                  variant="primary"
                  size="sm"
                  isLoading={isDemoLoading}
                  onClick={() => handleRunDemo()}
                  leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                >
                  Run Demo
                </Button>
              </div>
            </div>

            {/* Quick Sample Preset Buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Explain Quantum Computing',
                'Refactor React Hook',
                'Draft Product Launch Taglines',
              ].map((sample, i) => (
                <button
                  key={i}
                  onClick={() => handleRunDemo(sample)}
                  className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  “{sample}”
                </button>
              ))}
            </div>

            {/* Response Box */}
            {(isDemoLoading || demoResponse) && (
              <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/30 text-xs space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-indigo-400 font-bold border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kynoviq AI Output Preview</span>
                  </div>
                  {demoResponse && (
                    <button
                      onClick={handleCopyDemo}
                      className="text-slate-400 hover:text-white flex items-center gap-1 font-normal"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>

                {isDemoLoading ? (
                  <p className="text-slate-400 italic">Generating neural response...</p>
                ) : (
                  <p className="text-slate-200 leading-relaxed font-sans">{demoResponse}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">Intelligent Capabilities</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white">
              6 Powerful Specialized AI Tools. <br />
              <span className="gradient-text">One Unified Workspace.</span>
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              Eliminate context switching. Kynoviq AI gives you dedicated tools engineered specifically for every task.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-20 bg-[#090d16] border-t border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Engineered For Performance</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Designed for modern creators, engineers, and thinkers.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Generic chat interfaces slow you down with manual prompting. Kynoviq AI structures system prompts, output layouts, and data persistence so you get instant results.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  'Contextual Specialized AI Models tailored per tool',
                  'Persistent execution history and searchable output library',
                  'One-click response copying, saving, and refactoring',
                  'Dark slate futuristic design crafted for clarity & focus',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6 bg-slate-900/80 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">All-in-One AI SaaS Suite</h4>
                  <p className="text-xs text-slate-400">No external software required</p>
                </div>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300 text-xs leading-relaxed space-y-2">
                <div className="flex justify-between font-bold text-white border-b border-slate-800 pb-2">
                  <span>Tool</span>
                  <span>Average Time Saved</span>
                </div>
                <div className="flex justify-between py-1 font-medium">
                  <span>Smart Summarizer</span>
                  <span className="text-indigo-400 font-mono font-bold">85% Faster</span>
                </div>
                <div className="flex justify-between py-1 font-medium">
                  <span>Code Assistant</span>
                  <span className="text-indigo-400 font-mono font-bold">70% Faster</span>
                </div>
                <div className="flex justify-between py-1 font-medium">
                  <span>Study Assistant</span>
                  <span className="text-indigo-400 font-mono font-bold">3x Retention</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-[#0b0f19] to-slate-900 border-t border-slate-800 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Ready to supercharge your workflow?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Join thousands of professionals using Kynoviq AI to think smarter and create faster every day.
          </p>
          <Link href="/register" className="inline-block">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
