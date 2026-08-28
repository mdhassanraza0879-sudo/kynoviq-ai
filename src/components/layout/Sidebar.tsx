'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  LayoutDashboard,
  MessageSquare,
  Wrench,
  History,
  Bookmark,
  Settings,
  LogOut,
  Menu,
  X,
  UserCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Chat', href: '/chat', icon: MessageSquare },
    { name: 'AI Tools', href: '/tools', icon: Wrench },
    { name: 'History', href: '/history', icon: History },
    { name: 'Saved Items', href: '/saved', icon: Bookmark },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between p-4 bg-[#090d16] border-r border-slate-800/80">
      <div className="space-y-6">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 px-2 py-1 group">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-md shadow-indigo-500/20">
            <Image src="/logo.svg" alt="Kynoviq AI" width={32} height={32} className="object-contain" />
          </div>
          <span className="text-lg font-black text-white">
            Kynoviq <span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileDrawerOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200',
                  active
                    ? 'bg-gradient-to-r from-indigo-500/20 to-sky-500/10 text-indigo-300 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                )}
              >
                <Icon className={cn('w-4 h-4', active ? 'text-indigo-400' : 'text-slate-400')} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="space-y-3 pt-4 border-t border-slate-800/80">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
            {session?.user?.name ? session.user.name.charAt(0) : <UserCircle className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{session?.user?.name || 'Workspace User'}</p>
            <p className="text-[11px] text-slate-500 truncate">{session?.user?.email || 'user@kynoviq.ai'}</p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-30">
        {navContent}
      </aside>

      {/* Mobile Drawer Navigation Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-7 h-7 rounded-lg overflow-hidden">
            <Image src="/logo.svg" alt="Kynoviq AI" width={28} height={28} className="object-contain" />
          </div>
          <span className="text-base font-black text-white">Kynoviq AI</span>
        </Link>
        <button
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
        >
          {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-[#0b0f19]/80 backdrop-blur-sm" onClick={() => setMobileDrawerOpen(false)} />
          <div className="relative w-64 max-w-full h-full z-10 animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
