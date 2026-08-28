'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { IdeaGeneratorResult } from '@/types';
import { Lightbulb, Sparkles, Target, Users, DollarSign, ArrowLeft, Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function IdeaGeneratorPage() {
  const toast = useToast();
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('Tech Founders & Creators');
  const [goal, setGoal] = useState('Build a $10k/mo Micro-SaaS');
  const [result, setResult] = useState<IdeaGeneratorResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Validation Error', 'Please specify a domain or topic.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, targetAudience, goal }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error('Error', data.error || 'Failed to generate ideas.');
      } else {
        setResult(data.ideaResult);
        toast.success('Concepts Generated!');
      }
    } catch (e) {
      toast.error('Network Error', 'Check connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (ideaTitle: string, ideaDesc: string) => {
    try {
      await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Idea: ${ideaTitle}`,
          toolType: 'IDEAS',
          content: `${ideaTitle}\n\n${ideaDesc}`,
        }),
      });
      toast.success('Idea saved to Library!');
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
                <span>Idea Generator</span>
                <Lightbulb className="w-5 h-5 text-pink-400" />
              </h1>
              <p className="text-xs text-slate-400">Generate structured ideas for startups, products, content, and creative projects.</p>
            </div>
          </div>
        </div>

        {/* Input Card */}
        <Card className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Topic or Industry"
              placeholder="e.g. AI Workflow Automation, Remote Team Health"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <Input
              label="Target Audience"
              placeholder="e.g. Indie Hackers, Real Estate Brokers"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />
            <Input
              label="Primary Goal"
              placeholder="e.g. High Conversion SaaS, Viral YouTube Series"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            className="w-full"
            onClick={handleGenerate}
            isLoading={isLoading}
            disabled={!topic.trim()}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Brainstorm Strategic Concepts
          </Button>
        </Card>

        {/* Output Grid */}
        {result && (
          <div className="space-y-6">
            {result.summary && (
              <p className="text-xs text-slate-400 italic bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                Summary: {result.summary}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.ideas?.map((idea, idx) => (
                <Card key={idx} hoverable className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">Concept 0{idx + 1}</span>
                      <button
                        onClick={() => handleSave(idea.title, idea.description)}
                        className="p-1 rounded text-slate-400 hover:text-pink-400 transition-colors"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-white">{idea.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{idea.description}</p>

                    <div className="space-y-2 pt-2 border-t border-slate-800/60">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Audience: {idea.targetAudience}</span>
                      </div>
                      {idea.monetization && (
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Monetization: {idea.monetization}</span>
                        </div>
                      )}
                    </div>

                    {idea.keyFeatures && idea.keyFeatures.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[11px] font-semibold text-slate-400 block mb-1">Key Pillars:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {idea.keyFeatures.map((f, i) => (
                            <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
