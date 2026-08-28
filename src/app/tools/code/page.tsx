'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { CodeAssistantResult } from '@/types';
import { Code2, Sparkles, AlertTriangle, CheckCircle2, ArrowLeft, Copy, Bookmark, Check } from 'lucide-react';
import Link from 'next/link';

export default function CodeAssistantPage() {
  const toast = useToast();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('typescript');
  const [analysis, setAnalysis] = useState<CodeAssistantResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = ['typescript', 'javascript', 'python', 'java', 'c', 'cpp'];

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error('Validation Error', 'Please paste a code snippet.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error('Error', data.error || 'Failed to analyze code.');
      } else {
        setAnalysis(data.codeAnalysis);
        toast.success('Code Audit Complete!');
      }
    } catch (e) {
      toast.error('Network Error', 'Check connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!analysis?.refactoredCode) return;
    navigator.clipboard.writeText(analysis.refactoredCode);
    setCopied(true);
    toast.success('Refactored code copied');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!analysis) return;
    try {
      await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Code Refactor (${language})`,
          toolType: 'CODE',
          content: analysis.refactoredCode,
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
                <span>Code Assistant</span>
                <Code2 className="w-5 h-5 text-emerald-400" />
              </h1>
              <p className="text-xs text-slate-400">Analyze code, detect syntax & logic bugs, and generate clean production refactors.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Source Code Input</h3>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-cyan-500"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <Textarea
              placeholder="Paste your source code here..."
              rows={12}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-xs bg-slate-950 border-slate-800 text-cyan-200"
            />

            <Button
              variant="primary"
              className="w-full"
              onClick={handleAnalyze}
              isLoading={isLoading}
              disabled={!code.trim()}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Analyze & Refactor Code
            </Button>
          </Card>

          {/* Analysis & Output Panel */}
          <Card className="space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white">AI Diagnostics & Refactored Code</h3>
                {analysis && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Save</span>
                    </button>
                  </div>
                )}
              </div>

              {analysis ? (
                <div className="space-y-4 pt-4">
                  {/* Explanation */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Explanation</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{analysis.explanation}</p>
                  </div>

                  {/* Potential Errors */}
                  {analysis.potentialErrors && analysis.potentialErrors.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Potential Risks / Bugs</span>
                      </h4>
                      <ul className="space-y-1 text-xs text-rose-300/90 pl-2">
                        {analysis.potentialErrors.map((err, i) => (
                          <li key={i}>• {err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Refactored Code Box */}
                  <div className="space-y-1 pt-2">
                    <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Refactored Production Code</span>
                    </h4>
                    <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
                      <code>{analysis.refactoredCode}</code>
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-slate-500 space-y-2">
                  <Code2 className="w-10 h-10 mx-auto opacity-30" />
                  <p className="text-xs">Your refactored code and audit will appear here.</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
