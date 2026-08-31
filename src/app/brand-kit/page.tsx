'use client';

import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import { Palette, Sparkles, Check, CheckCircle2, Save, Upload, Sliders } from 'lucide-react';

export default function BrandKitPage() {
  const [brandName, setBrandName] = useState('Kynoviq Studio');
  const [tagline, setTagline] = useState('One Idea. Infinite Creation.');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [secondaryColor, setSecondaryColor] = useState('#38bdf8');
  const [accentColor, setAccentColor] = useState('#10b981');
  const [fontHeading, setFontHeading] = useState('Inter');
  const [toneOfVoice, setToneOfVoice] = useState('Futuristic, Authoritative, High-Converting & Clean');
  const [targetAudience, setTargetAudience] = useState('Digital creators, freelancers, founders, agencies and modern brands');
  const [autoInject, setAutoInject] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/brand-kit')
      .then((res) => res.json())
      .then((data) => {
        if (data.brandKit) {
          setBrandName(data.brandKit.brandName || 'Kynoviq Studio');
          setTagline(data.brandKit.tagline || '');
          setPrimaryColor(data.brandKit.primaryColor || '#6366f1');
          setSecondaryColor(data.brandKit.secondaryColor || '#38bdf8');
          setAccentColor(data.brandKit.accentColor || '#10b981');
          setFontHeading(data.brandKit.fontHeading || 'Inter');
          setToneOfVoice(data.brandKit.toneOfVoice || '');
          setTargetAudience(data.brandKit.targetAudience || '');
          setAutoInject(data.brandKit.autoInject ?? true);
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/brand-kit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          tagline,
          primaryColor,
          secondaryColor,
          accentColor,
          fontHeading,
          toneOfVoice,
          targetAudience,
          autoInject,
        }),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.warn('Brand kit save error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="AI Brand Kit Studio" subtitle="Centralized Visual Identity & Automated Generation Injection" />

        <main className="flex-1 p-6 sm:p-8 max-w-5xl w-full mx-auto space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Brand DNA Configuration</h2>
                  <p className="text-xs text-slate-400">Auto-injected into scripts, videos, images, and ads</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoInject}
                    onChange={(e) => setAutoInject(e.target.checked)}
                    className="w-4 h-4 rounded accent-indigo-600"
                  />
                  <span className="text-slate-300">Auto-Inject into AI Prompts</span>
                </label>
              </div>
            </div>

            {/* Core Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Brand / Company Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Tagline / Mission</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Color Palette */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 block">Brand Colors</label>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-2xl bg-[#07090e] border border-white/[0.08] space-y-2">
                  <span className="text-[10px] font-mono text-slate-400">Primary Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono text-white font-bold">{primaryColor}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#07090e] border border-white/[0.08] space-y-2">
                  <span className="text-[10px] font-mono text-slate-400">Secondary Accent</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono text-white font-bold">{secondaryColor}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#07090e] border border-white/[0.08] space-y-2">
                  <span className="text-[10px] font-mono text-slate-400">Highlight Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono text-white font-bold">{accentColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tone of Voice & Audience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Tone of Voice</label>
                <textarea
                  rows={3}
                  value={toneOfVoice}
                  onChange={(e) => setToneOfVoice(e.target.value)}
                  className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Target Audience</label>
                <textarea
                  rows={3}
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
              {saveSuccess ? (
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Brand Kit Saved & Active in All Studios!</span>
                </span>
              ) : (
                <span className="text-xs font-mono text-slate-400">Rules applied to next generations</span>
              )}

              <Button
                variant="primary"
                size="md"
                isLoading={isSaving}
                onClick={handleSave}
                className="text-xs font-bold px-6 glow-indigo"
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Brand Kit
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
