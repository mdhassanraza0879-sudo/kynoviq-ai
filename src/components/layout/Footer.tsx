import React from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Phone, Heart, Shield, Terminal, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, STUDIO_TOOLS } from '@/config/site';

export function Footer() {
  return (
    <footer className="bg-[#05070b] border-t border-white/[0.08] text-slate-400 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-[1px] shadow-md shadow-indigo-500/20">
                <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg tracking-wider text-white">KYNOVIQ</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                    STUDIO
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-tight font-medium">
                  One Idea. Infinite Creation.
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The complete AI creative operating system for creators, influencers, agencies, and brands. Generate scripts, videos, voiceovers, captions, dubbing, and ad campaigns seamlessly from one place.
            </p>

            {/* Founder Mini Spotlight */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-slate-950">
                  <img
                    src="/founder.jpg"
                    alt={SITE_CONFIG.founder.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white truncate">{SITE_CONFIG.founder.name}</div>
                  <div className="text-[10px] text-indigo-400 font-mono font-semibold truncate">{SITE_CONFIG.founder.role}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Built with vision for high-velocity global creative production.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] pt-1 text-slate-300 font-mono">
                <a
                  href={`mailto:${SITE_CONFIG.founder.email}`}
                  className="inline-flex items-center gap-1 hover:text-indigo-300 transition-colors"
                >
                  <Mail className="w-3 h-3 text-indigo-400" />
                  <span>{SITE_CONFIG.founder.email}</span>
                </a>
                <a
                  href={`tel:${SITE_CONFIG.founder.phone}`}
                  className="inline-flex items-center gap-1 hover:text-indigo-300 transition-colors"
                >
                  <Phone className="w-3 h-3 text-sky-400" />
                  <span>+91 {SITE_CONFIG.founder.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: AI Studios */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">AI Studios</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/agent" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>AI Creative Agent</span>
                  <span className="text-[9px] px-1 bg-indigo-500/20 text-indigo-300 rounded">Core</span>
                </Link>
              </li>
              <li>
                <Link href="/studio/video" className="hover:text-white transition-colors">
                  AI Video Generator
                </Link>
              </li>
              <li>
                <Link href="/studio/editor" className="hover:text-white transition-colors">
                  Browser Video Editor
                </Link>
              </li>
              <li>
                <Link href="/studio/image" className="hover:text-white transition-colors">
                  Image & Poster Generator
                </Link>
              </li>
              <li>
                <Link href="/studio/voiceover" className="hover:text-white transition-colors">
                  AI Voiceover Studio
                </Link>
              </li>
              <li>
                <Link href="/studio/dubbing" className="hover:text-white transition-colors">
                  AI Multilingual Dubbing
                </Link>
              </li>
              <li>
                <Link href="/studio/captions" className="hover:text-white transition-colors">
                  Auto Captions & Subtitles
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Ecosystem & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/studio/reels" className="hover:text-white transition-colors">
                  Reels & Shorts Creator
                </Link>
              </li>
              <li>
                <Link href="/studio/ad-creative" className="hover:text-white transition-colors">
                  Ad Creative Generator
                </Link>
              </li>
              <li>
                <Link href="/studio/social" className="hover:text-white transition-colors">
                  Social Media Suite
                </Link>
              </li>
              <li>
                <Link href="/brand-kit" className="hover:text-white transition-colors">
                  AI Brand Kit
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-white transition-colors">
                  Template Marketplace
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-white transition-colors">
                  Content Analytics
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  Team Collaboration
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Kynoviq
                </Link>
              </li>
              <li>
                <Link href="/founder" className="hover:text-white transition-colors">
                  Founder Spotlight
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing & Credits
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/ai-policy" className="hover:text-white transition-colors">
                  AI Usage & Ethics Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Kynoviq Studio. All rights reserved.</span>
            <span>•</span>
            <span className="text-indigo-400 font-medium">One Idea. Infinite Creation.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <Link href="/admin" className="hover:text-slate-300 transition-colors flex items-center gap-1 font-mono text-[11px]">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Admin Suite</span>
            </Link>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>Crafted for creators globally</span>
              <Heart className="w-3 h-3 text-rose-500 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
