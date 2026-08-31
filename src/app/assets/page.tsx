'use client';

import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import {
  FileBox,
  Upload,
  Search,
  Video,
  Image as ImageIcon,
  Mic,
  FileText,
  Trash2,
  Download,
  Filter,
} from 'lucide-react';

export default function AssetsPage() {
  const [filterType, setFilterType] = useState('ALL');
  const [search, setSearch] = useState('');

  const [assets, setAssets] = useState([
    { id: 'ast_1', name: 'Cyberpunk Tokyo Drone 8K.mp4', type: 'VIDEO', size: '14.2 MB', duration: '15s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', date: '2 hours ago' },
    { id: 'ast_2', name: 'Neural Hindi Voiceover Master.wav', type: 'AUDIO', size: '2.8 MB', duration: '28s', url: 'https://actions.google.com/sounds/v1/science_fiction/scifi_hum.ogg', date: '3 hours ago' },
    { id: 'ast_3', name: 'Product Can Glow 8K.jpg', type: 'IMAGE', size: '3.4 MB', resolution: '1024x1024', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', date: 'Yesterday' },
    { id: 'ast_4', name: 'Eco Sneakers Script Full.json', type: 'SCRIPT', size: '42 KB', date: 'Yesterday' },
  ]);

  const filtered = assets.filter((a) => {
    const matchType = filterType === 'ALL' || a.type === filterType;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Asset & Media Library" subtitle="Cloud Storage, Generated Media Files & Project Artifacts" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Top Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assets..."
                className="w-full bg-slate-900 border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-white/[0.08] text-xs font-mono">
                {['ALL', 'VIDEO', 'IMAGE', 'AUDIO', 'SCRIPT'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      filterType === t ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <Button
                variant="primary"
                size="sm"
                className="text-xs font-bold glow-indigo"
                leftIcon={<Upload className="w-4 h-4" />}
                onClick={() => alert('Drag & Drop or File Upload triggered')}
              >
                Upload Asset
              </Button>
            </div>
          </div>

          {/* Asset Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-slate-900/60 border border-white/[0.08] p-4 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all group"
              >
                <div className="space-y-3">
                  <div className="aspect-square rounded-xl bg-slate-950 border border-white/[0.05] overflow-hidden flex items-center justify-center relative">
                    {item.type === 'IMAGE' ? (
                      <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                    ) : item.type === 'VIDEO' ? (
                      <video src={item.url} className="w-full h-full object-cover" />
                    ) : item.type === 'AUDIO' ? (
                      <Mic className="w-10 h-10 text-indigo-400" />
                    ) : (
                      <FileText className="w-10 h-10 text-purple-400" />
                    )}

                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] font-bold text-white border border-white/[0.1]">
                      {item.type}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white truncate" title={item.name}>
                      {item.name}
                    </h4>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>{item.size}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <button
                    onClick={() => alert(`Downloading: ${item.name}`)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 font-mono"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>

                  <button
                    onClick={() => setAssets(assets.filter((x) => x.id !== item.id))}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
