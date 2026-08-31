'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { PRICING_PLANS, CREDIT_PACKAGES, FAQ_ITEMS } from '@/config/site';
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Modular & Transparent SaaS Monetization</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Plans for Creators, Studios & Enterprise
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Start free with 50 credits each month. Upgrade or buy credit packs as you scale your output.
          </p>

          {/* Billing Switch */}
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

        {/* Subscription Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
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
                  <Link href="/billing">
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

        {/* Credit Top-Up Packages Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-white/[0.08] mb-20">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">
              Need Extra Computing Power?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Instant Credit Top-Up Packs</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Never run out of generation power during crunch deadlines. Credits never expire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CREDIT_PACKAGES.map((pack) => (
              <div
                key={pack.id}
                className="p-6 rounded-2xl bg-[#07090e] border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-sky-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{pack.name}</h4>
                    {pack.bonus > 0 && (
                      <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20">
                        +{pack.bonus} Bonus
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">${pack.price}</span>
                    <span className="text-xs text-slate-400">one-time</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    {(pack.credits + pack.bonus).toLocaleString()} Total AI Credits
                  </p>
                </div>

                <Link href="/billing">
                  <Button variant="secondary" size="sm" className="w-full text-xs font-bold">
                    Buy {pack.credits} Credits
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Breakdown Table */}
        <div className="p-8 rounded-3xl bg-[#07090e] border border-white/[0.08] space-y-4 mb-20">
          <h3 className="text-lg font-bold text-white">AI Credit Consumption Rates</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-slate-400 block">Video Generation</span>
              <span className="text-sm font-bold text-sky-400">15 Credits</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-slate-400 block">Image & Poster</span>
              <span className="text-sm font-bold text-emerald-400">2 Credits</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-slate-400 block">AI Voiceover</span>
              <span className="text-sm font-bold text-indigo-400">3 Credits</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-slate-400 block">Script Generator</span>
              <span className="text-sm font-bold text-purple-400">1 Credit</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-slate-400 block">Multilingual Dubbing</span>
              <span className="text-sm font-bold text-amber-400">10 Credits</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-slate-400 block">Auto Captions</span>
              <span className="text-sm font-bold text-sky-400">2 Credits</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-slate-400 block">AI Creative Agent DAG</span>
              <span className="text-sm font-bold text-rose-400">25 Credits</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-slate-400 block">Brand Kit & Templates</span>
              <span className="text-sm font-bold text-emerald-400">0 Credits (Free)</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
