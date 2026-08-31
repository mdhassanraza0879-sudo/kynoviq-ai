'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Layers,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Video,
  Mic,
  Image as ImageIcon,
  Languages,
  Film,
  FileText,
  CreditCard,
  User,
  Shield,
  HelpCircle,
  Code,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG, STUDIO_TOOLS } from '@/config/site';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'AI Workspaces', href: '/tools' },
    { name: 'Templates', href: '/templates' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Founder', href: '/#founder' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-indigo-950/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 p-[1px] shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#07090e] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-wider text-white">KYNOVIQ</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight -mt-0.5">
                Think Smarter. Create Faster.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  pathname === link.href
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* AI Tools Quick Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onMouseEnter={() => setToolsDropdownOpen(true)}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-300 hover:text-white hover:bg-indigo-500/20 transition-colors"
              >
                <span>Studios</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {toolsDropdownOpen && (
                <div
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                  className="absolute top-full right-0 mt-2 w-80 rounded-2xl bg-[#0b0f19]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl p-3 grid grid-cols-1 gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      All-in-One Creative Ecosystem
                    </span>
                  </div>
                  {STUDIO_TOOLS.slice(0, 6).map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{tool.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">{tool.tagline}</div>
                      </div>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-white/[0.06] mt-1 text-center">
                    <Link
                      href="/tools"
                      onClick={() => setToolsDropdownOpen(false)}
                      className="text-xs text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1"
                    >
                      <span>Explore all 14 studios</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-xl hover:bg-white/[0.05] transition-colors"
            >
              Sign In
            </Link>

            <Link href="/agent">
              <Button
                variant="primary"
                size="sm"
                className="glow-indigo shadow-lg shadow-indigo-600/30 text-xs font-bold px-4 py-2"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start Creating
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <Link href="/agent">
              <Button size="sm" variant="primary" className="text-xs py-1.5 px-3">
                Create
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-white/[0.1] text-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-[#0b0f19] border border-white/[0.1] shadow-2xl space-y-4 animate-in fade-in duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05]"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-white/[0.08] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3">
                Featured Studios
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/agent"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-xs font-semibold text-slate-200"
                >
                  ✨ AI Agent
                </Link>
                <Link
                  href="/studio/video"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-xs font-semibold text-slate-200"
                >
                  🎬 Video Gen
                </Link>
                <Link
                  href="/studio/editor"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-xs font-semibold text-slate-200"
                >
                  ✂️ Video Editor
                </Link>
                <Link
                  href="/studio/voiceover"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-xs font-semibold text-slate-200"
                >
                  🎙️ Voiceover
                </Link>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-xl border border-white/[0.1] text-xs font-bold text-slate-200 hover:bg-white/[0.05]"
              >
                Sign In
              </Link>
              <Link
                href="/agent"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white shadow-lg shadow-indigo-600/30"
              >
                Start Creating
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
