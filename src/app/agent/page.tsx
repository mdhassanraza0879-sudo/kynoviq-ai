'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  AlertCircle,
  Clock,
  Film,
  Mic,
  Captions,
  Share2,
  FileText,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Edit3,
  Sliders,
  Layers,
} from 'lucide-react';

interface StepState {
  key: string;
  name: string;
  icon: string;
  status: 'WAITING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'SKIPPED';
  duration?: string;
  output?: any;
}

const INITIAL_STEPS: StepState[] = [
  { key: 'IDEA', name: '1. Concept & Market Strategy', icon: '💡', status: 'WAITING' },
  { key: 'SCRIPT', name: '2. 4-Scene Script & Viral Hook', icon: '📝', status: 'WAITING' },
  { key: 'SCENES', name: '3. Scene & B-Roll Breakdown', icon: '🎬', status: 'WAITING' },
  { key: 'VISUALS', name: '4. 8K Visual Diffusion Prompts', icon: '🎨', status: 'WAITING' },
  { key: 'VIDEO', name: '5. HD Video Scene Synthesis', icon: '⚡', status: 'WAITING' },
  { key: 'VOICEOVER', name: '6. Neural Voiceover (Hindi/English)', icon: '🎙️', status: 'WAITING' },
  { key: 'CAPTIONS', name: '7. Subtitle Synchronization (Hormozi)', icon: '💬', status: 'WAITING' },
  { key: 'THUMBNAIL', name: '8. High-CTR Thumbnail Design', icon: '🖼️', status: 'WAITING' },
  { key: 'SOCIAL', name: '9. Multi-Platform Copy & Hashtags', icon: '📱', status: 'WAITING' },
  { key: 'EXPORT', name: '10. Production Package & Handoff', icon: '🚀', status: 'WAITING' },
];

export default function CreativeAgentPage() {
  const [goalPrompt, setGoalPrompt] = useState('Launch a 30-second viral Instagram campaign for eco-friendly sneakers');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [steps, setSteps] = useState<StepState[]>(INITIAL_STEPS);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(-1);
  const [workflowOutput, setWorkflowOutput] = useState<any>(null);
  const [activeStepTab, setActiveStepTab] = useState<string>('SCRIPT');
  const [isCopied, setIsCopied] = useState(false);
  const [editingOutput, setEditingOutput] = useState(false);
  const [editedText, setEditedText] = useState('');

  const handleStartWorkflow = async () => {
    if (!goalPrompt.trim() || isExecuting) return;

    setIsExecuting(true);
    setIsPaused(false);
    setCurrentStepIdx(0);

    // Reset steps
    const newSteps = INITIAL_STEPS.map((s) => ({ ...s, status: 'WAITING' as const }));
    setSteps(newSteps);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: goalPrompt }),
      });
      const data = await res.json();

      if (data.workflow) {
        setWorkflowOutput(data.workflow);
      }
    } catch (e) {
      console.warn('API error, using fallback pipeline simulation', e);
    }

    // Progress through DAG simulation steps sequentially
    for (let i = 0; i < INITIAL_STEPS.length; i++) {
      setCurrentStepIdx(i);
      setSteps((prev) =>
        prev.map((step, idx) => (idx === i ? { ...step, status: 'PROCESSING' } : step))
      );

      await new Promise((r) => setTimeout(r, 450));

      setSteps((prev) =>
        prev.map((step, idx) =>
          idx === i ? { ...step, status: 'COMPLETED', duration: `${(0.4 + idx * 0.2).toFixed(1)}s` } : step
        )
      );
    }

    setIsExecuting(false);
  };

  const handleCopyScript = () => {
    if (!workflowOutput?.script?.fullScript) return;
    navigator.clipboard.writeText(workflowOutput.script.fullScript);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const completedCount = steps.filter((s) => s.status === 'COMPLETED').length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="AI Creative Agent Studio" subtitle="Autonomous Campaign & Multi-Step DAG Workflow Engine" />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Goal Input & Agent Configuration */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Autonomous Creative Prompt</h2>
                  <p className="text-xs text-slate-400">Define your campaign objective, target audience, and channel</p>
                </div>
              </div>

              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Cost: 25 Credits
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={goalPrompt}
                onChange={(e) => setGoalPrompt(e.target.value)}
                placeholder="e.g. 'Create a 30-second high-energy Instagram reel for my coffee brand'"
                className="flex-1 bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="md"
                  isLoading={isExecuting}
                  onClick={handleStartWorkflow}
                  className="px-6 text-xs font-bold glow-indigo"
                  leftIcon={<Play className="w-4 h-4 fill-current" />}
                >
                  {completedCount === 10 ? 'Re-run DAG' : 'Execute Campaign'}
                </Button>

                {isExecuting && (
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setIsPaused(!isPaused)}
                    className="text-xs"
                    leftIcon={isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-500 font-mono text-[11px]">Presets:</span>
              {[
                '30s Viral Instagram Reel for Eco Brand',
                'YouTube Shorts Coding Tutorial Hook',
                'High-ROAS TikTok Performance Ad',
                'Corporate Executive Thought Leadership',
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => setGoalPrompt(p)}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 text-[11px] font-mono transition-colors"
                >
                  “{p}”
                </button>
              ))}
            </div>
          </div>

          {/* Workflow DAG Graph + Output Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: 10-Step DAG Workflow Progress */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Execution Pipeline</h3>
                  <p className="text-[11px] text-slate-400 font-mono">10 Sequential Workflow Nodes</p>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-indigo-400 font-bold">{progressPercent}%</span>
                  <span className="text-slate-500 block text-[10px]">{completedCount}/10 Steps</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Step Nodes List */}
              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                {steps.map((step, idx) => {
                  const isCurrent = step.status === 'PROCESSING';
                  const isDone = step.status === 'COMPLETED';

                  return (
                    <div
                      key={step.key}
                      onClick={() => setActiveStepTab(step.key)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs font-mono ${
                        activeStepTab === step.key
                          ? 'bg-indigo-600/15 border-indigo-500 shadow-md'
                          : isDone
                          ? 'bg-white/[0.02] border-emerald-500/20 text-slate-200'
                          : isCurrent
                          ? 'bg-indigo-500/10 border-indigo-500/40 text-white animate-pulse'
                          : 'bg-white/[0.01] border-white/[0.04] text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{step.icon}</span>
                        <span className="font-semibold truncate max-w-[190px]">{step.name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        {isCurrent && <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />}
                        {step.duration && <span className="text-[10px] text-slate-400">{step.duration}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Step Output Inspector & Multi-Studio Handoff */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Header with quick actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                      Step Inspector: {activeStepTab}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyScript}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-mono flex items-center gap-1.5"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => setEditingOutput(!editingOutput)}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-mono flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                      <span>{editingOutput ? 'Preview' : 'Edit'}</span>
                    </button>
                  </div>
                </div>

                {/* Content based on Active Tab */}
                <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08] min-h-[320px] max-h-[380px] overflow-y-auto space-y-4 text-xs font-mono text-slate-300">
                  {completedCount === 0 && !isExecuting ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center space-y-2 text-slate-500">
                      <Sparkles className="w-8 h-8 text-indigo-400/50 animate-pulse" />
                      <p>Click "Execute Campaign" above to begin DAG orchestration.</p>
                    </div>
                  ) : activeStepTab === 'SCRIPT' || activeStepTab === 'SCENES' ? (
                    <div className="space-y-3 leading-relaxed">
                      <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                        <span className="font-bold">[Viral Hook (0-3s)]: </span>
                        “Did you know that 90% of creators struggle with {goalPrompt.slice(0, 30)}? Here is the 10-second fix.”
                      </div>
                      <div className="space-y-2">
                        <span className="text-white font-bold block">[Scene Breakdown]:</span>
                        <p><strong>Scene 1:</strong> Fast whip-pan zoom to subject holding product with high energy lighting.</p>
                        <p><strong>Scene 2:</strong> Problem demonstration with dynamic split screen and ticking clock.</p>
                        <p><strong>Scene 3:</strong> Hero product reveal with 3D particles and glowing callouts.</p>
                        <p><strong>Scene 4:</strong> CTA with animated swipe-up button and brand badge.</p>
                      </div>
                    </div>
                  ) : activeStepTab === 'VOICEOVER' ? (
                    <div className="space-y-3">
                      <span className="text-white font-bold block">Generated Voiceover Audio Track (Hindi / English):</span>
                      <div className="p-3 rounded-xl bg-slate-900 border border-white/[0.08] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mic className="w-4 h-4 text-indigo-400" />
                          <span>Voice: Hassan Deep (Authoritative Hindi / English)</span>
                        </div>
                        <span className="text-[10px] text-emerald-400">Duration: 28s</span>
                      </div>
                      <audio controls className="w-full mt-2" src="https://actions.google.com/sounds/v1/science_fiction/scifi_hum.ogg" />
                    </div>
                  ) : activeStepTab === 'SOCIAL' ? (
                    <div className="space-y-3">
                      <span className="text-white font-bold block">Instagram & TikTok Copy:</span>
                      <p className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        ✨ Ready to master {goalPrompt}? Stop wasting hours on manual editing. Try the 1-click creative pipeline on Kynoviq Studio today! 👇
                        <br /><br />
                        #KynoviqStudio #AICreator #ViralReels #CreatorEconomy
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <span className="text-white font-bold block">Output Parameters:</span>
                      <p>Aspect Ratio: 9:16 Vertical Video</p>
                      <p>Target Render: 1080x1920 @ 60fps</p>
                      <p>Estimated Reach Boost: +320% Retention</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Handoff Action Footer */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span>Handoff to Workspace:</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link href="/studio/editor">
                    <Button variant="secondary" size="sm" className="text-xs font-bold" leftIcon={<Film className="w-3.5 h-3.5 text-sky-400" />}>
                      Open in Video Editor
                    </Button>
                  </Link>

                  <Link href="/projects">
                    <Button variant="primary" size="sm" className="text-xs font-bold glow-indigo" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Save to Projects
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
