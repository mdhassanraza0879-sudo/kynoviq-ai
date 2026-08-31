'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Sparkles,
  Bell,
  User,
  LogOut,
  Settings,
  FolderKanban,
  Shield,
  CreditCard,
  ChevronDown,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DashboardHeader({ title, subtitle }: { title?: string; subtitle?: string }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="h-16 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/[0.08] px-6 flex items-center justify-between sticky top-0 z-30 font-sans">
      {/* Left Title / Breadcrumbs */}
      <div>
        {title ? (
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{title}</span>
            </h1>
            {subtitle && <p className="text-[11px] text-slate-400 font-mono -mt-0.5">{subtitle}</p>}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Workspace / </span>
            <span className="text-xs font-bold text-white">Default Creative Studio</span>
          </div>
        )}
      </div>

      {/* Center / Right: Global Command Search Trigger + Credits + Actions */}
      <div className="flex items-center gap-4">
        {/* Global AI Command Bar Trigger */}
        <button
          onClick={() => {
            const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true });
            window.dispatchEvent(event);
          }}
          className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/[0.08] hover:border-indigo-500/40 text-xs text-slate-400 hover:text-white transition-all w-64 justify-between"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px]">AI Command or Prompt...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono text-slate-400">⌘K</kbd>
        </button>

        {/* Quick New Project Button */}
        <Link href="/projects?action=new">
          <Button variant="secondary" size="sm" className="hidden sm:flex text-xs font-bold" leftIcon={<Plus className="w-3.5 h-3.5" />}>
            New Project
          </Button>
        </Link>

        {/* Quick Credit Badge */}
        <Link
          href="/billing"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-colors text-xs font-mono font-bold"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>100 Credits</span>
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-white/[0.08] hover:border-white/[0.15] text-slate-300 relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-indigo-500 absolute top-1.5 right-1.5" />
          </button>

          {notifMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0b0f19] border border-white/[0.1] shadow-2xl p-3 z-50 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] mb-2">
                <span className="font-bold text-white text-xs">Notifications</span>
                <span className="text-[10px] text-indigo-400 font-mono">1 Unread</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-white/[0.03] space-y-1">
                  <div className="font-bold text-white text-[11px]">🎉 100 Starter Credits Claimed</div>
                  <p className="text-[11px] text-slate-400">
                    Your 100 starter AI credits are ready. Try launching your first autonomous campaign!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-white/[0.08] hover:border-white/[0.15] transition-colors"
          >
            <div className="w-7 h-7 rounded-lg border border-white/20 shrink-0 bg-indigo-600/40 flex items-center justify-center font-bold text-white text-[10px] font-mono">
              HR
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0b0f19] border border-white/[0.1] shadow-2xl p-2 z-50 animate-in fade-in duration-150 space-y-1 text-xs">
              <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                <div className="font-bold text-white">Mohammad Hassan Raza</div>
                <div className="text-[10px] text-slate-400 font-mono">mdhassanraza0879@gmail.com</div>
                <span className="inline-block mt-1 text-[9px] font-mono font-bold bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded border border-indigo-500/30">
                  SUPER ADMIN
                </span>
              </div>

              <Link
                href="/settings"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05]"
              >
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </Link>

              <Link
                href="/billing"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05]"
              >
                <CreditCard className="w-4 h-4" />
                <span>Billing & Plans</span>
              </Link>

              <Link
                href="/admin"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-indigo-300 hover:text-white hover:bg-indigo-600/20 font-bold"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Suite</span>
              </Link>

              <div className="pt-1 border-t border-white/[0.06]">
                <Link
                  href="/"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
