import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/config/site';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Zap, Heart, Mail, Phone } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full space-y-16">
        {/* Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Our Mission & Architectural Vision</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            The AI Creative Operating System
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Kynoviq Studio was born out of a simple observation: modern creators, agencies, and brands waste up to 80% of their creative energy wrestling with fragmented AI tools.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-3">
            <Cpu className="w-6 h-6 text-sky-400" />
            <h3 className="text-lg font-bold text-white">Unified Pipeline</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No more copying text from one tab to another. Scripts flow directly into video generation, voice synthesis, automated subtitles, and timeline editing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Provider Agnostic</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never lock our platform to a single AI vendor. Our modular architecture allows real-time routing to best-in-class models across text, image, audio, and video.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-3">
            <Zap className="w-6 h-6 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Browser-First Studio</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-performance WebGL and cloud acceleration bring professional multi-track video editing into any browser without heavy GPU requirements.
            </p>
          </div>
        </div>

        {/* Founder Card Spotlight */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 opacity-70 blur-md" />
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-slate-950">
                <img
                  src="/founder.jpg"
                  alt={SITE_CONFIG.founder.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl font-black text-white">{SITE_CONFIG.founder.name}</h2>
              <p className="text-xs text-indigo-400 font-mono font-bold">{SITE_CONFIG.founder.role}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-slate-400 pt-2">
                <a href={`mailto:${SITE_CONFIG.founder.email}`} className="hover:text-white flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{SITE_CONFIG.founder.email}</span>
                </a>
                <a href={`tel:${SITE_CONFIG.founder.phone}`} className="hover:text-white flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>+91 {SITE_CONFIG.founder.phone}</span>
                </a>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            “Kynoviq Studio is dedicated to elevating human creativity, not replacing it. By providing creators with autonomous agents, synchronized audio-visual workspaces, and unified brand governance, we empower anyone with a vision to produce studio-grade digital content at the speed of thought.”
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <Link href="/agent">
            <Button variant="primary" size="lg" className="text-sm font-bold glow-indigo" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start Creating on Kynoviq Studio
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
