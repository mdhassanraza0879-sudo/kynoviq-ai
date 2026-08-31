import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full space-y-8">
        <div className="space-y-2 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold uppercase">
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Terms of Service</h1>
          <p className="text-xs text-slate-400 font-mono">Last updated: January 2026</p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none text-xs sm:text-sm space-y-6 text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Kynoviq Studio, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Acceptable Use & Content Policy</h2>
            <p>
              You agree not to use Kynoviq Studio to generate deceptive deepfakes, hate speech, non-consensual voice clones, copyright-infringing media, or illegal material. We reserve the right to suspend accounts that violate acceptable use guidelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Subscriptions & Credit System</h2>
            <p>
              Subscriptions renew automatically on a monthly or annual basis unless cancelled prior to renewal. AI Credits allocated under subscription plans reset at each billing cycle. Top-up credit packs do not expire while your account remains in good standing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Realistic Performance Disclaimer</h2>
            <p>
              Kynoviq Studio does not promise, guarantee, or warrant specific revenue numbers, viral view thresholds, or algorithmic social media distribution. Creative success depends on your unique strategy, audience, and content quality.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
