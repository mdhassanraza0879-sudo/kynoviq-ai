import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RotateCcw } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full space-y-8">
        <div className="space-y-2 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold uppercase">
            <RotateCcw className="w-4 h-4" />
            <span>Billing Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Refund Policy</h1>
          <p className="text-xs text-slate-400 font-mono">Last updated: January 2026</p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none text-xs sm:text-sm space-y-6 text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Subscription Refunds</h2>
            <p>
              We offer a 7-day money-back guarantee for first-time subscribers on the Pro or Business monthly plans if you have consumed fewer than 100 credits during that billing cycle.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Credit Pack Purchases</h2>
            <p>
              Because AI computing costs (GPU cycles, neural inference) are incurred immediately upon generation, one-time credit top-up packs are non-refundable once any portion of the pack has been used.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. How to Request Support</h2>
            <p>
              To request a refund or review a failed generation job credit credit adjustment, please reach out to{' '}
              <a href="mailto:mdhassanraza0879@gmail.com" className="text-indigo-400 underline">
                mdhassanraza0879@gmail.com
              </a>{' '}
              with your transaction ID.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
