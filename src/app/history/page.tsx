'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { History, Search, Filter, Trash2, ExternalLink, Sparkles, Clock } from 'lucide-react';
import Link from 'next/link';

interface HistoryItem {
  id: string;
  toolType: string;
  inputSnippet: string | null;
  outputSnippet: string | null;
  createdAt: string;
}

export default function HistoryPage() {
  const toast = useToast();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [search, setSearch] = useState('');
  const [filterTool, setFilterTool] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/history');
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      }
    } catch (e) {
      toast.error('Error', 'Failed to load history');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClearHistory = async () => {
    try {
      const res = await fetch('/api/history', { method: 'DELETE' });
      if (res.ok) {
        toast.success('Cleared', 'History deleted successfully.');
        setHistory([]);
        setClearConfirmOpen(false);
      }
    } catch (e) {
      toast.error('Error', 'Could not clear history.');
    }
  };

  const filteredHistory = history.filter((item) => {
    const matchesTool = filterTool === 'ALL' || item.toolType === filterTool;
    const matchesSearch =
      !search ||
      (item.inputSnippet && item.inputSnippet.toLowerCase().includes(search.toLowerCase())) ||
      (item.outputSnippet && item.outputSnippet.toLowerCase().includes(search.toLowerCase()));
    return matchesTool && matchesSearch;
  });

  const getToolBadgeColor = (tool: string) => {
    switch (tool) {
      case 'CHAT': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'SUMMARIZER': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'STUDY': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'CODE': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'WRITING': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'IDEAS': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen flex bg-[#090d16] text-slate-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <span>Execution History</span>
              <History className="w-5 h-5 text-cyan-400" />
            </h1>
            <p className="text-xs text-slate-400">Search and audit all your previous AI tool interactions.</p>
          </div>
          {history.length > 0 && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => setClearConfirmOpen(true)}
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Clear All History
            </Button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search history snippets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {['ALL', 'CHAT', 'SUMMARIZER', 'STUDY', 'CODE', 'WRITING', 'IDEAS'].map((tool) => (
              <button
                key={tool}
                onClick={() => setFilterTool(tool)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border whitespace-nowrap transition-all ${
                  filterTool === tool
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        {/* History Stream Grid */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-24 animate-pulse bg-slate-900/50" />
            ))}
          </div>
        ) : filteredHistory.length === 0 ? (
          <Card className="text-center py-16 space-y-3">
            <Clock className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No history records found</h3>
            <p className="text-xs text-slate-400">Run any AI tool to log activity automatically.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <Card key={item.id} hoverable className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${getToolBadgeColor(item.toolType)}`}>
                    {item.toolType}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {item.inputSnippet && (
                    <p className="text-slate-300 font-medium line-clamp-2">
                      <span className="text-slate-500 font-bold">Input: </span>
                      {item.inputSnippet}
                    </p>
                  )}
                  {item.outputSnippet && (
                    <p className="text-slate-400 line-clamp-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-cyan-400 font-bold">AI Output: </span>
                      {item.outputSnippet}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <ConfirmDialog
        isOpen={clearConfirmOpen}
        onClose={() => setClearConfirmOpen(false)}
        onConfirm={handleClearHistory}
        title="Clear Execution History"
        description="Are you sure you want to delete all tool usage logs? This action is permanent."
      />
    </div>
  );
}
