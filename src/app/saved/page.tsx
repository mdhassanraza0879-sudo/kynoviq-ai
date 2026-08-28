'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Bookmark, Search, Trash2, Copy, Check, Eye, Download, FileText } from 'lucide-react';

interface SavedItem {
  id: string;
  title: string;
  toolType: string;
  content: string;
  createdAt: string;
}

export default function SavedItemsPage() {
  const toast = useToast();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [search, setSearch] = useState('');
  const [filterTool, setFilterTool] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  const [previewItem, setPreviewItem] = useState<SavedItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchSavedItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/saved');
      if (res.ok) {
        const data = await res.json();
        setSavedItems(data.savedItems || []);
      }
    } catch (e) {
      toast.error('Error', 'Failed to load saved items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedItems();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/saved/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Deleted', 'Saved item removed.');
        setSavedItems((prev) => prev.filter((item) => item.id !== id));
        setDeleteConfirmId(null);
        if (previewItem?.id === id) setPreviewItem(null);
      }
    } catch (e) {
      toast.error('Error', 'Could not delete item.');
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportMarkdown = (item: SavedItem) => {
    const mdContent = `# ${item.title}\n\n**Tool**: ${item.toolType}\n**Date**: ${new Date(item.createdAt).toLocaleString()}\n\n---\n\n${item.content}`;
    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded Markdown file!');
  };

  const filteredItems = savedItems.filter((item) => {
    const matchesTool = filterTool === 'ALL' || item.toolType === filterTool;
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase());
    return matchesTool && matchesSearch;
  });

  return (
    <div className="min-h-screen flex bg-[#0b0f19] text-slate-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800/80 pb-4">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span>Saved Snippets Gallery</span>
            <Bookmark className="w-5 h-5 text-indigo-400" />
          </h1>
          <p className="text-xs text-slate-400">Access, preview, and export your saved AI outputs and code refactors.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search saved items..."
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
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        {/* Grid View */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-40 animate-pulse bg-slate-900/50" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <Card className="text-center py-16 space-y-3">
            <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No saved items found</h3>
            <p className="text-xs text-slate-400">Save AI outputs from any tool to view them here.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} hoverable className="space-y-4 flex flex-col justify-between p-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                      {item.toolType}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-4 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                    {item.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs text-slate-300 hover:text-indigo-400 p-1"
                    onClick={() => setPreviewItem(item)}
                    leftIcon={<Eye className="w-3.5 h-3.5" />}
                  >
                    View & Export
                  </Button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item.id, item.content)}
                      className="p-1.5 rounded text-slate-400 hover:text-white"
                      title="Copy"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-1.5 rounded text-slate-400 hover:text-rose-400"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Preview & Export Modal */}
      <Modal
        isOpen={!!previewItem}
        onClose={() => setPreviewItem(null)}
        title={previewItem?.title || 'Saved Snippet'}
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
            <span>Category: {previewItem?.toolType}</span>
            <span>Created: {previewItem && new Date(previewItem.createdAt).toLocaleString()}</span>
          </div>
          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed overflow-y-auto max-h-[60vh]">
            {previewItem?.content}
          </pre>
          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => previewItem && handleExportMarkdown(previewItem)}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export as Markdown (.md)
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => previewItem && handleCopy(previewItem.id, previewItem.content)}
              leftIcon={<Copy className="w-4 h-4" />}
            >
              Copy Content
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => deleteConfirmId && handleDelete(deleteConfirmId)}
        title="Delete Saved Item"
        description="Are you sure you want to remove this item from your saved library?"
      />
    </div>
  );
}
