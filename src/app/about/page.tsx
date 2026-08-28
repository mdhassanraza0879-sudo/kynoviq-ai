import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sparkles, Target, Zap, Shield, Mail, Phone, UserCheck, Cpu, Code2, Database } from 'lucide-react';

export const metadata = {
  title: 'About & Founder — Kynoviq AI',
  description: 'Learn about Kynoviq AI vision, founder Mohammad Hassan Raza, and technology stack.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Company Vision & Leadership</span>
            </div>
            <h1 className="text-4xl font-black text-white sm:text-5xl">
              About <span className="gradient-text">Kynoviq AI</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
              “Think smarter. Create faster.” — We are building the next generation of structured AI workspace software.
            </p>
          </div>

          {/* FOUNDER SPOTLIGHT SECTION */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-slate-800 space-y-8 bg-slate-900/80 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              {/* Founder Image */}
              <div className="md:col-span-5 flex flex-col items-center text-center space-y-3">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-500 opacity-50 blur-lg group-hover:opacity-75 transition-opacity" />
                  <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl">
                    <Image
                      src="/founder.jpg"
                      alt="Mohammad Hassan Raza — Founder & CEO"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Founder & CEO</span>
                  </span>
                </div>
              </div>

              {/* Founder Details & Bio */}
              <div className="md:col-span-7 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Mohammad Hassan Raza
                  </h2>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Founder & Chief Executive Officer — Kynoviq AI
                  </p>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  “I founded Kynoviq AI with a clear mission: to eliminate the friction between human imagination and artificial intelligence execution. Instead of struggling with complex prompts, creators, engineers, and students deserve specialized, intelligent tools designed specifically for their workflow.”
                </p>

                {/* Direct Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href="mailto:mdhassanraza0879@gmail.com"
                    className="p-3 bg-slate-950/80 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center gap-3 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-500 font-semibold uppercase">Official Email</p>
                      <p className="text-xs font-bold text-slate-200 truncate">mdhassanraza0879@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="tel:7307670879"
                    className="p-3 bg-slate-950/80 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center gap-3 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-500 font-semibold uppercase">Direct Phone</p>
                      <p className="text-xs font-bold text-slate-200 truncate">+91 7307670879</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* COMPANY ARCHITECTURE & STACK USED */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">Enterprise Technology</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">What Powers Kynoviq AI</h2>
              <p className="text-xs text-slate-400">Engineered using modern, production-grade web technologies.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-3">
                <Cpu className="w-6 h-6 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Next.js App Router</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fast server-side rendering, streaming client components, and Turbopack build optimization.
                </p>
              </div>
              <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-3">
                <Code2 className="w-6 h-6 text-sky-400" />
                <h3 className="text-base font-bold text-white">OpenAI Neural Engine</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  GPT-4o system prompt pipelines configured for precision code analysis, study guides, and summaries.
                </p>
              </div>
              <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-3">
                <Database className="w-6 h-6 text-purple-400" />
                <h3 className="text-base font-bold text-white">Prisma & NextAuth</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  PostgreSQL/SQLite ORM database persistence with bcryptjs password hashing and JWT session security.
                </p>
              </div>
            </div>
          </div>

          {/* PHILOSOPHY & VALUES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-3">
              <Target className="w-6 h-6 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Focused Excellence</h3>
              <p className="text-xs text-slate-400">Tailored system prompts and structured UI views per tool.</p>
            </div>
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-3">
              <Zap className="w-6 h-6 text-amber-400" />
              <h3 className="text-base font-bold text-white">Ultra Fast Speed</h3>
              <p className="text-xs text-slate-400">Instant page transitions and live background execution.</p>
            </div>
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-3">
              <Shield className="w-6 h-6 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Privacy & Security</h3>
              <p className="text-xs text-slate-400">Secure user data isolation with NextAuth and Prisma ORM.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
