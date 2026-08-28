'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { FileText, Sparkles, Copy, Bookmark, Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SummarizerPage() {
  const toast = useToast();
  const [text, setText] = useState('');
  const [length, setLength] = useState<'short' | 'medium' | 'detailed'>('medium');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim() || text.length < 10) {
      toast.error('Validation Error', 'Please enter at least 10 characters to summarize.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, length }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error('Error', data.error || 'Failed to generate summary.');
      } else {
        setSummary(data.summary);
        toast.success('Summary Generated!');
      }
    } catch (e) {
      toast.error('Network Error', 'Check connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Summary (${length.toUpperCase()})`,
          toolType: 'SUMMARIZER',
          content: summary,
        }),
      });
      if (res.ok) {
        toast.success('Saved to Library!');
      }
    } catch (e) {
      toast.error('Save Failed');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#090d16] text-slate-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto space-y-8 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/tools" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <span>Smart Summarizer</span>
                <FileText className="w-5 h-5 text-indigo-400" />
              </h1>
              <p className="text-xs text-slate-400">Convert long text, articles, or reports into high-impact key summaries.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="space-y-6">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Input Document Text</h3>

            <Textarea
              label="Source Content"
              placeholder="Paste article, meeting notes, essay, or raw text here..."
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Summary Depth</label>
              <div className="grid grid-cols-3 gap-2">
                {(['short', 'medium', 'detailed'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLength(l)}
                    className={`py-2 text-xs font-semibold rounded-lg border capitalize transition-all ${
                      length === l
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={handleGenerate}
              isLoading={isLoading}
              disabled={!text.trim()}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Generate Summary
            </Button>
          </Card>

          {/* Output Section */}
          <Card className="space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white">AI Summary Output</h3>
                {summary && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Save</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4">
                {summary ? (
                  <div className="prose prose-invert prose-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {summary}
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-500 space-y-2">
                    <FileText className="w-10 h-10 mx-auto opacity-30" />
                    <p className="text-xs">Your generated summary will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
