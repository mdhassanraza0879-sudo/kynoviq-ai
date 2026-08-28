'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { StudyAssistantResult } from '@/types';
import { GraduationCap, Sparkles, BookOpen, Lightbulb, HelpCircle, ArrowLeft, Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function StudyAssistantPage() {
  const toast = useToast();
  const [topic, setTopic] = useState('');
  const [guide, setGuide] = useState<StudyAssistantResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Validation Error', 'Please enter a study topic.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error('Error', data.error || 'Failed to generate study guide.');
      } else {
        setGuide(data.studyGuide);
        toast.success('Study Guide Generated!');
      }
    } catch (e) {
      toast.error('Network Error', 'Check connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!guide) return;
    try {
      await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Study Guide: ${topic}`,
          toolType: 'STUDY',
          content: `${guide.explanation}\n\nKey Points:\n${guide.keyPoints.join('\n')}`,
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
                <span>Study Assistant</span>
                <GraduationCap className="w-5 h-5 text-purple-400" />
              </h1>
              <p className="text-xs text-slate-400">Master difficult concepts with simple explanations, analogies, key terms, and quizzes.</p>
            </div>
          </div>
        </div>

        {/* Input Card */}
        <Card className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 w-full">
              <Input
                label="Topic or Subject to Understand"
                placeholder="e.g. Quantum Entanglement, Transformer Neural Networks, Inflationary Economics"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>
            <Button
              variant="primary"
              onClick={handleGenerate}
              isLoading={isLoading}
              disabled={!topic.trim()}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Generate Study Guide
            </Button>
          </div>
        </Card>

        {/* Output Render */}
        {guide && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button size="sm" variant="secondary" onClick={handleSave} leftIcon={<Bookmark className="w-4 h-4 text-purple-400" />}>
                Save Guide
              </Button>
            </div>

            {/* Explanation */}
            <Card className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Simple Overview & Explanation</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{guide.explanation}</p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Points */}
              <Card className="space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Key Points to Remember</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {guide.keyPoints?.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Example */}
              <Card className="space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Lightbulb className="w-4 h-4 text-purple-400" />
                  <span>Real-World Analogy</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed italic">“{guide.example}”</p>
              </Card>
            </div>

            {/* Quiz Questions */}
            {guide.quizQuestions && guide.quizQuestions.length > 0 && (
              <Card className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  <span>Self-Assessment Quiz</span>
                </h3>
                <div className="space-y-4">
                  {guide.quizQuestions.map((q, i) => (
                    <div key={i} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
                      <p className="text-xs font-bold text-white">Q{i + 1}: {q.question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.options?.map((opt, optIdx) => (
                          <div key={optIdx} className="p-2 text-xs bg-slate-900 rounded-lg text-slate-300 border border-slate-800">
                            {opt}
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-emerald-400 font-medium pt-1">Answer: {q.answer}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
