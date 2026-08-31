'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import {
  FolderKanban,
  Plus,
  Search,
  Film,
  MoreVertical,
  Calendar,
  Layers,
  ArrowRight,
  Trash2,
  Copy,
  Edit2,
  CheckCircle2,
} from 'lucide-react';

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('ALL');
  const [projects, setProjects] = useState([
    {
      id: 'proj_1',
      title: 'Quantum SaaS Product Launch (Reel + Ad)',
      category: 'REELS',
      updatedAt: '12 mins ago',
      assetsCount: 6,
      status: 'READY',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'proj_2',
      title: 'AI Tutorial Step-by-Step Short (Hindi + English)',
      category: 'SHORTS',
      updatedAt: '2 hours ago',
      assetsCount: 4,
      status: 'IN_PROGRESS',
      thumbnailUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'proj_3',
      title: 'Sustainable Apparel Brand Campaign',
      category: 'CAMPAIGN',
      updatedAt: 'Yesterday',
      assetsCount: 10,
      status: 'READY',
      thumbnailUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'proj_4',
      title: 'Meta Ads Conversion Storyboard Variations',
      category: 'ADS',
      updatedAt: '3 days ago',
      assetsCount: 3,
      status: 'READY',
      thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    },
  ]);

  const filtered = projects.filter((p) => {
    const matchCat = filterCat === 'ALL' || p.category === filterCat;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCreateProject = () => {
    const title = prompt('Enter Project Title:');
    if (!title) return;
    const newProj = {
      id: `proj_${Date.now()}`,
      title,
      category: 'REELS',
      updatedAt: 'Just now',
      assetsCount: 1,
      status: 'IN_PROGRESS',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    };
    setProjects([newProj, ...projects]);
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Project Management" subtitle="Multi-Modal Creation Workspaces, Asset Groups & Version Snapshots" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-slate-900 border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-white/[0.08] text-xs font-mono">
                {['ALL', 'REELS', 'SHORTS', 'CAMPAIGN', 'ADS'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCat(cat)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      filterCat === cat ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateProject}
                className="text-xs font-bold glow-indigo"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Create Project
              </Button>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((proj) => (
              <div
                key={proj.id}
                className="rounded-3xl bg-slate-900/60 border border-white/[0.08] overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 transition-all shadow-xl group"
              >
                <div className="space-y-3">
                  <div className="aspect-video relative bg-slate-950 overflow-hidden">
                    <img
                      src={proj.thumbnailUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono font-bold bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-white border border-white/[0.1]">
                        {proj.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {proj.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>{proj.assetsCount} Assets</span>
                      <span>🕒 {proj.updatedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between gap-2">
                  <Link href="/studio/editor" className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full text-xs font-bold" leftIcon={<Film className="w-3.5 h-3.5" />}>
                      Open Workspace
                    </Button>
                  </Link>

                  <button
                    onClick={() => setProjects(projects.filter((x) => x.id !== proj.id))}
                    className="p-2 rounded-xl bg-white/[0.02] hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-white/[0.05]"
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
