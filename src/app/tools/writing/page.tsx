'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { PenTool, Sparkles, Copy, Bookmark, Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WritingAssistantPage() {
  const toast = useToast();
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'improve_grammar' | 'rewrite' | 'make_professional' | 'make_simpler' | 'change_tone'>('make_professional');
  const [targetTone, setTargetTone] = useState('confident & persuasive');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const modes = [
    { id: 'make_professional', label: 'Make Professional' },
    { id: 'improve_grammar', label: 'Fix Grammar' },
    { id: 'rewrite', label: 'Complete Rewrite' },
    { id: 'make_simpler', label: 'Make Simpler' },
    { id: 'change_tone', label: 'Change Tone' },
  ];

  const handleTransform = async () => {
    if (!text.trim()) {
      toast.error('Validation Error', 'Please enter text to enhance.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mode, targetTone }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error('Error', data.error || 'Failed to transform writing.');
      } else {
        setOutput(data.improvedText);
        toast.success('Text Enhanced!');
      }
    } catch (e) {
      toast.error('Network Error', 'Check connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!output) return;
    try {
      await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Writing Enhancement (${mode})`,
          toolType: 'WRITING',
          content: output,
        }),
      });
      toast.success('Saved to Library!');
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
                <span>Writing Assistant</span>
                <PenTool className="w-5 h-5 text-amber-400" />
              </h1>
              <p className="text-xs text-slate-400">Elevate content grammar, tone, clarity, flow, and professional impact.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="space-y-6">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Draft Content</h3>

            <Textarea
              placeholder="Type or paste draft text here..."
              rows={7}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300">Transformation Goal</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {modes.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id as any)}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                      mode === m.id
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={handleTransform}
              isLoading={isLoading}
              disabled={!text.trim()}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Enhance Writing
            </Button>
          </Card>

          {/* Output Panel */}
          <Card className="space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white">Polished Output</h3>
                {output && (
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
                      <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                      <span>Save</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4">
                {output ? (
                  <div className="prose prose-invert prose-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {output}
                  </div>
                ) : (
                  <div className="py-20 text-center text-slate-500 space-y-2">
                    <PenTool className="w-10 h-10 mx-auto opacity-30" />
                    <p className="text-xs">Your polished text will appear here.</p>
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
