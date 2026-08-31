import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Shield, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full space-y-8">
        <div className="space-y-2 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold uppercase">
            <Shield className="w-4 h-4" />
            <span>Legal Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-400 font-mono">Last updated: January 2026</p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none text-xs sm:text-sm space-y-6 text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
            <p>
              At Kynoviq AI, we collect account information (such as name and email address), uploaded media assets (images, audio files, and video clips for processing), and generation prompts required to execute your AI creative requests.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. AI Training & Data Isolation</h2>
            <p>
              We do <strong>not</strong> use your private brand assets, proprietary scripts, custom brand kits, or raw generated videos to train public foundation models without explicit written permission. Your creative assets remain strictly isolated within your workspace.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Commercial Ownership of Generated Assets</h2>
            <p>
              Subject to your compliance with our Terms of Service and active subscription status, you maintain full commercial ownership and licensing rights over all scripts, images, videos, audio tracks, and subtitles generated through Kynoviq AI.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Security & Encryption</h2>
            <p>
              All data transmitted between your browser and Kynoviq AI servers is encrypted using industry-standard TLS 1.3 encryption. Media assets stored in cloud object storage are encrypted at rest with AES-256 protocols.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Contact Information</h2>
            <p>
              For privacy inquiries or data erasure requests, please contact our security team at{' '}
              <a href="mailto:mdhassanraza0879@gmail.com" className="text-indigo-400 underline">
                mdhassanraza0879@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
