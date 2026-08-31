import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Cpu, ShieldCheck } from 'lucide-react';

export default function AIPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full space-y-8">
        <div className="space-y-2 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold uppercase">
            <Cpu className="w-4 h-4" />
            <span>Ethical AI Framework</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">AI Usage & Ethics Policy</h1>
          <p className="text-xs text-slate-400 font-mono">Last updated: January 2026</p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none text-xs sm:text-sm space-y-6 text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Responsible Generative AI</h2>
            <p>
              Kynoviq Studio is committed to responsible generative AI technologies. Our models and provider integrations incorporate real-time safety guardrails to detect and prevent hate speech, harmful deepfakes, and non-consensual voice cloning.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Music & Audio Licensing Transparency</h2>
            <p>
              All music and sound suggestions provided within our audio studio are curated with explicit royalty-free licensing terms or cleared for monetized YouTube and social media broadcasting. We never claim third-party copyrighted tracks are automatically licensed without clearance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Voice Synthesis Ethics</h2>
            <p>
              Users may only synthesize voices using provided neural library presets or with explicit authorized consent from the individual whose voice is being modeled.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
