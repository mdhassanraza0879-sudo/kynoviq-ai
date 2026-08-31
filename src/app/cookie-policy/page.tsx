import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Cookie } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full space-y-8">
        <div className="space-y-2 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold uppercase">
            <Cookie className="w-4 h-4" />
            <span>Cookie Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Cookie Policy</h1>
          <p className="text-xs text-slate-400 font-mono">Last updated: January 2026</p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none text-xs sm:text-sm space-y-6 text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Essential Cookies</h2>
            <p>
              We use essential cookies to authenticate your user session, maintain secure state across studio workspaces, and track your active project timeline data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Managing Preferences</h2>
            <p>
              You can control or disable cookies through your browser settings at any time; however, disabling essential cookies may impact studio autosave and session capabilities.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
