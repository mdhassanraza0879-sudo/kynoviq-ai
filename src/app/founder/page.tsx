import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/config/site';
import { Sparkles, Mail, Phone, ArrowRight, Shield, Award, Terminal } from 'lucide-react';

export default function FounderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Built With Vision</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Founder Spotlight</h1>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-white/[0.1] shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/[0.08]">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 opacity-75 blur-md" />
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-gradient-to-br from-indigo-900/90 to-slate-950 flex flex-col items-center justify-center text-white">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 font-black text-2xl mb-1">
                  HR
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">Founder & CEO</span>
              </div>
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl font-black text-white">{SITE_CONFIG.founder.name}</h2>
              <p className="text-xs text-indigo-400 font-mono font-bold">{SITE_CONFIG.founder.role}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-slate-300 pt-2">
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
          </div>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-normal">
            <p>
              Mohammad Hassan Raza is the founder and lead architect behind <strong>Kynoviq Studio</strong>. With deep expertise across full-stack engineering, generative AI orchestration, and cloud architecture, Hassan established Kynoviq Studio to unify the fractured digital creation process into an autonomous, browser-first creative operating system.
            </p>
            <p>
              Under his technical leadership, Kynoviq Studio incorporates high-res video diffusion pipelines, multi-track WebGL timeline rendering, neural Hindi and multilingual speech models, automated subtitle synchronizers, and DAG-based autonomous campaign agents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06] text-xs">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <span className="text-slate-400 block font-mono">Mission</span>
              <span className="text-white font-bold block">Democratize 4K Content Production</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <span className="text-slate-400 block font-mono">Architecture</span>
              <span className="text-white font-bold block">100% Provider-Agnostic Engine</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <span className="text-slate-400 block font-mono">Location & Reach</span>
              <span className="text-white font-bold block">Global SaaS Platform</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/agent">
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Experience Kynoviq Studio
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
