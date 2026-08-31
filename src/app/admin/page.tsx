'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import {
  Shield,
  Users,
  CreditCard,
  Settings2,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff,
  Save,
  Plus,
  RefreshCw,
  Phone,
  Mail,
  Zap,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'pricing' | 'founder_toggle' | 'logs'>('overview');

  // Dynamic system config
  const [showFounderContact, setShowFounderContact] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Credit rates
  const [creditRateVideo, setCreditRateVideo] = useState(15);
  const [creditRateImage, setCreditRateImage] = useState(2);
  const [creditRateVoice, setCreditRateVoice] = useState(3);
  const [creditRateAgent, setCreditRateAgent] = useState(25);

  // Users list
  const [users, setUsers] = useState([
    { id: 'usr_1', name: 'Mohammad Hassan Raza', email: 'mdhassanraza0879@gmail.com', role: 'SUPER_ADMIN', tier: 'BUSINESS', credits: 99999, isSuspended: false },
    { id: 'usr_2', name: 'Sarah Jenkins', email: 'sarah@agency.com', role: 'USER', tier: 'PRO', credits: 820, isSuspended: false },
    { id: 'usr_3', name: 'David Kim', email: 'david@brand.com', role: 'USER', tier: 'FREE', credits: 35, isSuspended: false },
  ]);

  useEffect(() => {
    fetch('/api/admin/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.config) {
          setShowFounderContact(data.config.showFounderPublicContact ?? true);
          setMaintenanceMode(data.config.maintenanceMode ?? false);
          if (data.config.creditRateVideo) setCreditRateVideo(data.config.creditRateVideo);
          if (data.config.creditRateImage) setCreditRateImage(data.config.creditRateImage);
          if (data.config.creditRateVoice) setCreditRateVoice(data.config.creditRateVoice);
          if (data.config.creditRateAgent) setCreditRateAgent(data.config.creditRateAgent);
        }
      })
      .catch(() => {});
  }, []);

  const handleSaveConfig = async () => {
    try {
      await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          showFounderPublicContact: showFounderContact,
          maintenanceMode,
          creditRateVideo,
          creditRateImage,
          creditRateVoice,
          creditRateAgent,
        }),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.warn('Admin save error');
    }
  };

  const handleToggleSuspend = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, isSuspended: !u.isSuspended } : u)));
  };

  const handleAddCredits = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, credits: u.credits + 500 } : u)));
    alert('Added +500 Bonus AI Credits to User');
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Super Admin Control Center" subtitle="User Moderation, Dynamic Pricing, System Health & Founder Controls" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900 border border-white/[0.08] text-xs font-mono">
            {[
              { id: 'overview', name: 'System Overview', icon: <Activity className="w-3.5 h-3.5" /> },
              { id: 'users', name: 'User Management', icon: <Users className="w-3.5 h-3.5" /> },
              { id: 'pricing', name: 'Pricing & Credit Rates', icon: <CreditCard className="w-3.5 h-3.5" /> },
              { id: 'founder_toggle', name: 'Founder Contact Switch', icon: <Phone className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-1">
                  <span className="text-xs font-mono text-slate-400">Total Users</span>
                  <div className="text-3xl font-black text-white">1,420</div>
                  <span className="text-[10px] text-emerald-400 font-mono">+124 this week</span>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-1">
                  <span className="text-xs font-mono text-slate-400">Active Generations</span>
                  <div className="text-3xl font-black text-sky-400">18</div>
                  <span className="text-[10px] text-emerald-400 font-mono">0 Failed jobs</span>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-1">
                  <span className="text-xs font-mono text-slate-400">Monthly Revenue (MRR)</span>
                  <div className="text-3xl font-black text-emerald-400">$18,450</div>
                  <span className="text-[10px] text-emerald-400 font-mono">+24% vs last month</span>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-1">
                  <span className="text-xs font-mono text-slate-400">API Health Status</span>
                  <div className="text-3xl font-black text-white flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span>99.98%</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">All 6 AI Adapters Online</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: User Management */}
          {activeTab === 'users' && (
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">User Accounts ({users.length})</h3>
                <span className="text-xs font-mono text-slate-400">Super Admin Privileges Active</span>
              </div>

              <div className="divide-y divide-white/[0.06] text-xs">
                {users.map((u) => (
                  <div key={u.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span>{u.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {u.role}
                        </span>
                        {u.isSuspended && (
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-rose-500/20 text-rose-400">
                            SUSPENDED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sky-400 font-bold">{u.credits.toLocaleString()} Credits</span>

                      <Button variant="secondary" size="sm" onClick={() => handleAddCredits(u.id)} className="text-xs">
                        +500 Credits
                      </Button>

                      {u.role !== 'SUPER_ADMIN' && (
                        <button
                          onClick={() => handleToggleSuspend(u.id)}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-colors ${
                            u.isSuspended ? 'bg-emerald-600 text-white' : 'bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white'
                          }`}
                        >
                          {u.isSuspended ? 'Activate' : 'Suspend'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Dynamic Pricing & Credit Rates */}
          {activeTab === 'pricing' && (
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] shadow-2xl space-y-6 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <h3 className="text-base font-bold text-white font-sans">Dynamic Credit Consumption Rates</h3>
                  <p className="text-slate-400">Adjust credit deductions per operation on the fly without server redeployment</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Video Generation (Credits / Scene)</label>
                  <input
                    type="number"
                    value={creditRateVideo}
                    onChange={(e) => setCreditRateVideo(parseInt(e.target.value) || 15)}
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">AI Image Generation (Credits / Image)</label>
                  <input
                    type="number"
                    value={creditRateImage}
                    onChange={(e) => setCreditRateImage(parseInt(e.target.value) || 2)}
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Voiceover Synthesis (Credits / Clip)</label>
                  <input
                    type="number"
                    value={creditRateVoice}
                    onChange={(e) => setCreditRateVoice(parseInt(e.target.value) || 3)}
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Creative Agent DAG (Credits / Campaign)</label>
                  <input
                    type="number"
                    value={creditRateAgent}
                    onChange={(e) => setCreditRateAgent(parseInt(e.target.value) || 25)}
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                {saveSuccess ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saved to Database!</span>
                  </span>
                ) : (
                  <span className="text-slate-500">Live rate updates</span>
                )}
                <Button variant="primary" size="md" onClick={handleSaveConfig} className="text-xs font-bold glow-indigo">
                  Save Credit Rates
                </Button>
              </div>
            </div>
          )}

          {/* Tab 4: Founder Contact Visibility Toggle */}
          {activeTab === 'founder_toggle' && (
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] shadow-2xl space-y-6">
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Founder Public Contact Details Visibility</h3>
                  <p className="text-xs text-slate-400">
                    Toggle whether phone number and direct email are displayed on public landing and about pages
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08] flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-bold text-white text-xs">Public Contact Display Status</div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Email: mdhassanraza0879@gmail.com • Phone: 7307670879
                  </p>
                </div>

                <button
                  onClick={() => setShowFounderContact(!showFounderContact)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                    showFounderContact
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {showFounderContact ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>{showFounderContact ? 'Visible on Public Pages' : 'Hidden from Public'}</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between">
                {saveSuccess ? (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Visibility Setting Updated!</span>
                  </span>
                ) : (
                  <span className="text-xs font-mono text-slate-400">Controls Landing Page & Footer display</span>
                )}

                <Button variant="primary" size="md" onClick={handleSaveConfig} className="text-xs font-bold glow-indigo">
                  Save Contact Settings
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
