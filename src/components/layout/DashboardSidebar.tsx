'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  LayoutDashboard,
  Video,
  Film,
  Image as ImageIcon,
  Mic,
  Languages,
  Captions,
  Music,
  Smartphone,
  Target,
  Share2,
  Palette,
  Layers,
  FolderKanban,
  FileBox,
  History,
  BarChart3,
  Users,
  CreditCard,
  Settings,
  Shield,
  Zap,
  ArrowUpRight,
  FileText,
} from 'lucide-react';

export function DashboardSidebar() {
  const pathname = usePathname();

  const primaryNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'AI Creative Agent', href: '/agent', icon: <Sparkles className="w-4 h-4 text-indigo-400" />, badge: 'Core' },
  ];

  const creativeStudios = [
    { name: 'Video Generator', href: '/studio/video', icon: <Video className="w-4 h-4 text-sky-400" /> },
    { name: 'Browser Video Editor', href: '/studio/editor', icon: <Film className="w-4 h-4 text-sky-400" />, badge: 'Studio' },
    { name: 'Image & Poster Studio', href: '/studio/image', icon: <ImageIcon className="w-4 h-4 text-emerald-400" /> },
    { name: 'Voiceover Studio', href: '/studio/voiceover', icon: <Mic className="w-4 h-4 text-indigo-400" /> },
    { name: 'AI Idea & Script', href: '/studio/script', icon: <FileText className="w-4 h-4 text-purple-400" /> },
    { name: 'Auto Captions', href: '/studio/captions', icon: <Captions className="w-4 h-4 text-purple-400" /> },
    { name: 'Multilingual Dubbing', href: '/studio/dubbing', icon: <Languages className="w-4 h-4 text-sky-400" /> },
    { name: 'Music & Sound', href: '/studio/music', icon: <Music className="w-4 h-4 text-amber-400" /> },
    { name: 'Reels / Shorts Creator', href: '/studio/reels', icon: <Smartphone className="w-4 h-4 text-rose-400" /> },
    { name: 'AI Ad Creative', href: '/studio/ad-creative', icon: <Target className="w-4 h-4 text-amber-400" /> },
    { name: 'Social Media AI', href: '/studio/social', icon: <Share2 className="w-4 h-4 text-sky-400" /> },
  ];

  const workspaceAssets = [
    { name: 'AI Brand Kit', href: '/brand-kit', icon: <Palette className="w-4 h-4 text-purple-400" /> },
    { name: 'Template Marketplace', href: '/templates', icon: <Layers className="w-4 h-4 text-emerald-400" /> },
    { name: 'Projects', href: '/projects', icon: <FolderKanban className="w-4 h-4 text-indigo-400" /> },
    { name: 'Asset Library', href: '/assets', icon: <FileBox className="w-4 h-4 text-slate-400" /> },
    { name: 'Generation History', href: '/history', icon: <History className="w-4 h-4 text-slate-400" /> },
    { name: 'Performance Analytics', href: '/analytics', icon: <BarChart3 className="w-4 h-4 text-rose-400" /> },
    { name: 'Team Collaboration', href: '/team', icon: <Users className="w-4 h-4 text-emerald-400" /> },
  ];

  const accountNavigation = [
    { name: 'Billing & Credits', href: '/billing', icon: <CreditCard className="w-4 h-4" /> },
    { name: 'Settings', href: '/settings', icon: <Settings className="w-4 h-4" /> },
    { name: 'Admin Suite', href: '/admin', icon: <Shield className="w-4 h-4 text-indigo-400" /> },
  ];

  return (
    <aside className="w-64 bg-[#07090e] border-r border-white/[0.08] flex flex-col h-screen shrink-0 sticky top-0 overflow-hidden font-sans">
      {/* Brand Header */}
      <div className="p-4 border-b border-white/[0.08]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-[1px] shadow-md shadow-indigo-500/20">
            <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm tracking-wider text-white">KYNOVIQ</span>
              <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                STUDIO
              </span>
            </div>
            <span className="text-[9px] text-slate-400 font-medium tracking-tight">One Idea. Infinite Creation.</span>
          </div>
        </Link>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6 text-xs">
        {/* Core */}
        <div className="space-y-1">
          {primaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono font-bold uppercase bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* AI Studios */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
            Creative Studios
          </div>
          {creativeStudios.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono font-bold uppercase bg-sky-500/20 text-sky-300 px-1.5 py-0.2 rounded">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Workspace & Management */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
            Workspace & Assets
          </div>
          {workspaceAssets.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {item.icon}
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Account & Administration */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
            System & Billing
          </div>
          {accountNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {item.icon}
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Credit Balance Meter Footer */}
      <div className="p-3 border-t border-white/[0.08] bg-[#05070b]">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-medium">Credits Available</span>
            <span className="font-mono font-bold text-sky-400">45 / 50</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full w-[90%]" />
          </div>
          <div className="flex items-center justify-between pt-1 text-[10px]">
            <span className="text-slate-500">Free Tier</span>
            <Link href="/billing" className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-0.5">
              <span>Upgrade</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
