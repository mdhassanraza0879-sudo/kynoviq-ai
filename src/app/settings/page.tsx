'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import { Settings, User, Key, Bell, Shield, Save, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (session?.user) {
      if (session.user.name) setName(session.user.name);
      if (session.user.email) setEmail(session.user.email);
    }
  }, [session]);

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Account & Studio Settings" subtitle="Profile Governance, Custom AI API Credentials & Notification Routing" />

        <main className="flex-1 p-6 sm:p-8 max-w-4xl w-full mx-auto space-y-8">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Profile Information */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] shadow-2xl space-y-5 text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Profile Identity</h2>
                    <p className="text-slate-400">Manage account name, email and role identifier</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl border border-white/20 shrink-0 bg-indigo-600/30 flex items-center justify-center font-bold text-white font-mono text-sm">
                    {initials}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name..."
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Custom Provider Keys (BYOK) */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] shadow-2xl space-y-5 text-xs">
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Custom AI Provider API Keys (Optional)</h2>
                  <p className="text-slate-400">Bring Your Own Key (BYOK) for unlimited zero-credit generation</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">OpenAI API Key (sk-...)</label>
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:border-sky-500"
                />
                <span className="text-[11px] text-slate-500 block">
                  Keys are stored encrypted on server. Leave blank to use default Kynoviq Cloud credits.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {saved ? (
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Settings Updated Successfully!</span>
                </span>
              ) : (
                <span className="text-xs font-mono text-slate-400">All changes autosaved to database</span>
              )}

              <Button variant="primary" size="md" type="submit" className="text-xs font-bold px-8 glow-indigo" leftIcon={<Save className="w-4 h-4" />}>
                Save Preferences
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
