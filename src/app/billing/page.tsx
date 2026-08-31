'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import { CREDIT_PACKAGES, PRICING_PLANS } from '@/config/site';
import { CreditCard, Sparkles, Check, CheckCircle2, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export default function BillingPage() {
  const [currentCredits, setCurrentCredits] = useState(100);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const handleBuyPack = (credits: number) => {
    setCurrentCredits((prev) => prev + credits);
    setPurchaseSuccess(true);
    setTimeout(() => setPurchaseSuccess(false), 3000);
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Billing & AI Credits Engine" subtitle="Real-Time Credit Ledger, Plan Upgrades & Add-On Packages" />

        <main className="flex-1 p-6 sm:p-8 max-w-6xl w-full mx-auto space-y-8">
          {/* Current Credit Meter Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-sky-950/60 border border-indigo-500/30 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-indigo-300 font-bold uppercase tracking-wider">
                  Active Subscription Tier: Starter (Free)
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white flex items-baseline gap-2">
                  <span>{currentCredits}</span>
                  <span className="text-sm font-normal text-slate-400 font-mono">Available AI Credits</span>
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                  Resets in 18 days
                </span>
              </div>
            </div>

            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 w-[90%]" />
            </div>

            {purchaseSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Credit Pack Applied Instantly to Balance!</span>
              </div>
            )}
          </div>

          {/* Instant Credit Top-Up Packs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Instant Credit Top-Up Packs</h3>
                <p className="text-xs text-slate-400 font-mono">No subscription required • Credits never expire</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CREDIT_PACKAGES.map((pack) => (
                <div
                  key={pack.id}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-sky-500/40 transition-colors shadow-xl"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white">{pack.name}</h4>
                      {pack.bonus > 0 && (
                        <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20">
                          +{pack.bonus} Bonus
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">${pack.price}</span>
                      <span className="text-xs text-slate-400">one-time</span>
                    </div>
                    <p className="text-xs font-mono text-slate-400">
                      {(pack.credits + pack.bonus).toLocaleString()} Total AI Credits
                    </p>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleBuyPack(pack.credits + pack.bonus)}
                    className="w-full text-xs font-bold"
                  >
                    Add {pack.credits} Credits
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Upgrade Selector */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Subscription Upgrade Options</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRICING_PLANS.map((p) => (
                <div
                  key={p.tier}
                  className={`p-6 rounded-2xl flex flex-col justify-between space-y-4 ${
                    p.isPopular
                      ? 'bg-[#0d1222] border-2 border-indigo-500 shadow-xl'
                      : 'bg-slate-900/60 border border-white/[0.08]'
                  }`}
                >
                  <div className="space-y-3">
                    <h4 className="text-base font-bold text-white">{p.name}</h4>
                    <div className="text-2xl font-black text-white">${p.monthlyPrice} <span className="text-xs text-slate-400 font-normal">/mo</span></div>
                    <p className="text-xs text-indigo-300 font-mono">✨ {p.creditsPerMonth.toLocaleString()} Credits / mo</p>
                    <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/[0.06]">
                      {p.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant={p.isPopular ? 'primary' : 'secondary'}
                    size="sm"
                    className="w-full text-xs font-bold"
                    onClick={() => alert(`Upgraded to ${p.name}`)}
                  >
                    {p.ctaText}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
