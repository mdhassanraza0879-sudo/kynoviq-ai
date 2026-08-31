'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Sparkles,
  ArrowRight,
  Video,
  Film,
  Image as ImageIcon,
  Mic,
  Languages,
  Captions,
  FileText,
  Target,
  Share2,
  Palette,
  Layers,
  FolderKanban,
  History,
  BarChart3,
  CreditCard,
  X,
  CornerDownLeft,
} from 'lucide-react';

export function GlobalCommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExecute = (targetUrl: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(targetUrl);
  };

  const handleIntentSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.toLowerCase().trim();
    if (!q) return;

    if (q.includes('reel') || q.includes('short') || q.includes('tiktok') || q.includes('viral')) {
      handleExecute(`/studio/reels?prompt=${encodeURIComponent(query)}`);
    } else if (q.includes('video edit') || q.includes('timeline') || q.includes('trim') || q.includes('cut')) {
      handleExecute(`/studio/editor`);
    } else if (q.includes('video') || q.includes('movie') || q.includes('cinematic') || q.includes('clip')) {
      handleExecute(`/studio/video?prompt=${encodeURIComponent(query)}`);
    } else if (q.includes('poster') || q.includes('image') || q.includes('thumb') || q.includes('photo') || q.includes('art')) {
      handleExecute(`/studio/image?prompt=${encodeURIComponent(query)}`);
    } else if (q.includes('voice') || q.includes('speak') || q.includes('audio') || q.includes('tts') || q.includes('speech')) {
      handleExecute(`/studio/voiceover?text=${encodeURIComponent(query)}`);
    } else if (q.includes('dub') || q.includes('translate') || q.includes('hindi')) {
      handleExecute(`/studio/dubbing`);
    } else if (q.includes('caption') || q.includes('subtitles') || q.includes('srt')) {
      handleExecute(`/studio/captions`);
    } else if (q.includes('script') || q.includes('story') || q.includes('writer') || q.includes('idea')) {
      handleExecute(`/studio/script?prompt=${encodeURIComponent(query)}`);
    } else if (q.includes('ad') || q.includes('campaign') || q.includes('commercial') || q.includes('meta')) {
      handleExecute(`/studio/ad-creative?prompt=${encodeURIComponent(query)}`);
    } else if (q.includes('social') || q.includes('post') || q.includes('instagram') || q.includes('linkedin')) {
      handleExecute(`/studio/social?prompt=${encodeURIComponent(query)}`);
    } else if (q.includes('project') || q.includes('my files')) {
      handleExecute(`/projects`);
    } else if (q.includes('credit') || q.includes('bill') || q.includes('plan')) {
      handleExecute(`/billing`);
    } else {
      // Default smart route to flagship AI Creative Agent
      handleExecute(`/agent?prompt=${encodeURIComponent(query)}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0b0f19] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Input Bar */}
        <form onSubmit={handleIntentSearch} className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08]">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type anything (e.g. 'Create a Reel', 'Generate a poster', 'Make a voiceover in Hindi')..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded">
            <span>Enter</span>
            <CornerDownLeft className="w-3 h-3" />
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-white/[0.05] text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Suggestions & Routes */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-1 text-xs">
          <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
            Suggested Creative Workspaces
          </div>

          {[
            { label: 'AI Creative Agent (Auto Campaign)', icon: <Sparkles className="w-4 h-4 text-indigo-400" />, path: '/agent' },
            { label: 'Create a Video / 4K Scene', icon: <Video className="w-4 h-4 text-sky-400" />, path: '/studio/video' },
            { label: 'Open Browser Video Editor', icon: <Film className="w-4 h-4 text-sky-400" />, path: '/studio/editor' },
            { label: 'Generate Image or Poster', icon: <ImageIcon className="w-4 h-4 text-emerald-400" />, path: '/studio/image' },
            { label: 'Generate AI Voiceover (Hindi / English)', icon: <Mic className="w-4 h-4 text-indigo-400" />, path: '/studio/voiceover' },
            { label: 'Multilingual Video Dubbing', icon: <Languages className="w-4 h-4 text-sky-400" />, path: '/studio/dubbing' },
            { label: 'Auto Captions & Subtitles', icon: <Captions className="w-4 h-4 text-purple-400" />, path: '/studio/captions' },
            { label: 'AI Ad Creative Generator', icon: <Target className="w-4 h-4 text-amber-400" />, path: '/studio/ad-creative' },
            { label: 'Open My Projects & Assets', icon: <FolderKanban className="w-4 h-4 text-indigo-400" />, path: '/projects' },
            { label: 'Generation History & Logs', icon: <History className="w-4 h-4 text-slate-400" />, path: '/history' },
            { label: 'AI Brand Kit Settings', icon: <Palette className="w-4 h-4 text-purple-400" />, path: '/brand-kit' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => handleExecute(item.path)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.05]">{item.icon}</div>
                <span className="font-semibold text-slate-200 group-hover:text-white">{item.label}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Tip: Press ESC to close</span>
          <span>Intelligent Natural Language Intent Engine</span>
        </div>
      </div>
    </div>
  );
}
