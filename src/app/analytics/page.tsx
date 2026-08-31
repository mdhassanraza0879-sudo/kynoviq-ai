'use client';

import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { BarChart3, TrendingUp, Sparkles, Video, Film, Eye, Share2, HardDrive } from 'lucide-react';

export default function AnalyticsDashboardPage() {
  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Content Performance & Analytics" subtitle="Generation Velocity, Credit Utilization, Storage & Engagement Projections" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Top Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-2">
              <span className="text-xs font-mono text-slate-400">Total Outputs Created</span>
              <div className="text-3xl font-black text-white">48</div>
              <span className="text-[11px] text-emerald-400 font-mono">+18% vs last month</span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-2">
              <span className="text-xs font-mono text-slate-400">AI Credits Burned</span>
              <div className="text-3xl font-black text-sky-400">182</div>
              <span className="text-[11px] text-slate-400 font-mono">Average 15cr / project</span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-2">
              <span className="text-xs font-mono text-slate-400">Est. Audience Reach</span>
              <div className="text-3xl font-black text-indigo-400">240K+</div>
              <span className="text-[11px] text-emerald-400 font-mono">High Engagement Rate</span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-2">
              <span className="text-xs font-mono text-slate-400">Cloud Storage Used</span>
              <div className="text-3xl font-black text-purple-400">142 MB</div>
              <span className="text-[11px] text-slate-400 font-mono">of 500 MB Free Plan</span>
            </div>
          </div>

          {/* Simulated Activity & Velocity Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Generation Velocity by Week */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Weekly Content Generation Velocity</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Outputs produced over last 4 weeks</p>
                </div>
                <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                  Total: 48 Assets
                </span>
              </div>

              {/* Visual Bar Chart */}
              <div className="h-56 flex items-end justify-between gap-3 pt-8 pb-2 px-4 bg-[#07090e] rounded-2xl border border-white/[0.05]">
                {[
                  { day: 'Mon', count: 6, h: '45%' },
                  { day: 'Tue', count: 9, h: '70%' },
                  { day: 'Wed', count: 14, h: '95%' },
                  { day: 'Thu', count: 8, h: '60%' },
                  { day: 'Fri', count: 11, h: '80%' },
                  { day: 'Sat', count: 15, h: '100%' },
                  { day: 'Sun', count: 5, h: '35%' },
                ].map((bar) => (
                  <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      className="w-full max-w-[36px] bg-gradient-to-t from-indigo-600 to-sky-400 rounded-t-lg transition-all duration-500 hover:brightness-125"
                      style={{ height: bar.h }}
                    />
                    <span className="text-[10px] font-mono text-slate-400">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio Breakdown */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-4 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Studio Utilization</h3>
                <p className="text-[11px] text-slate-400 font-mono">Breakdown by AI modality</p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>AI Video Generator</span>
                    <span className="text-sky-400">45%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 w-[45%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>AI Creative Agent</span>
                    <span className="text-indigo-400">30%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[30%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>AI Voiceover & Dubbing</span>
                    <span className="text-emerald-400">15%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[15%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Images, Ads & Scripts</span>
                    <span className="text-purple-400">10%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[10%]" />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-slate-400">
                💡 Official Social API analytics sync available on Pro & Business plans.
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
