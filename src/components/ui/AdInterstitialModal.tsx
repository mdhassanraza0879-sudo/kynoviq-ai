'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Sparkles, Crown, Zap, CheckCircle2, Play, Volume2, ArrowRight, X } from 'lucide-react';

interface AdInterstitialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdFinished: () => void;
  actionTitle?: string;
}

export function AdInterstitialModal({
  isOpen,
  onClose,
  onAdFinished,
  actionTitle = 'Saving & Rendering Asset',
}: AdInterstitialModalProps) {
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isOpen) {
      setCountdown(5);
      setCanSkip(false);

      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanSkip(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinue = () => {
    onClose();
    onAdFinished();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#090d16] border-2 border-indigo-500/40 shadow-2xl shadow-indigo-600/30 overflow-hidden flex flex-col justify-between">
        {/* Top Sponsor Bar */}
        <div className="h-12 bg-black/60 px-5 flex items-center justify-between border-b border-white/[0.08] text-xs font-mono">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sponsor Spotlight (Free Tier Generation)</span>
          </div>

          <div className="flex items-center gap-2">
            {canSkip ? (
              <button
                onClick={handleContinue}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition-all"
              >
                <span>Skip Ad & Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-slate-400 font-mono text-[11px] bg-white/[0.05] px-2 py-0.5 rounded">
                Reward Ad: {countdown}s
              </span>
            )}
          </div>
        </div>

        {/* Ad Body / Video Preview Box */}
        <div className="p-6 space-y-5">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-950 via-slate-900 to-purple-950 border border-white/[0.1] flex flex-col justify-between p-6 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold bg-amber-400 text-black px-2 py-0.5 rounded">
                FEATURED SPONSOR
              </span>
              <span className="text-xs font-mono text-indigo-300 flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>KYNOVIQ PRO</span>
              </span>
            </div>

            <div className="space-y-2 text-center">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Unlock Instant 4K 60FPS Video Rendering & Zero Wait Times
              </h3>
              <p className="text-xs text-slate-300">
                1,000 AI Credits/month • Unlimited Multi-Track Timelines • Remove All Sponsor Ads
              </p>
            </div>

            {/* Countdown Progress Bar */}
            <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-indigo-400 to-emerald-400 transition-all duration-1000"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Next: {actionTitle}</span>
              <span className="text-emerald-400 font-bold">100 Free Credits Active</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/billing" className="flex-1">
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full text-xs font-bold text-amber-300 border-amber-500/30 hover:bg-amber-500/10"
                  leftIcon={<Crown className="w-3.5 h-3.5 text-amber-400" />}
                >
                  Upgrade to Pro (No Ads)
                </Button>
              </Link>

              <Button
                variant="primary"
                size="md"
                disabled={!canSkip}
                onClick={handleContinue}
                className={`flex-1 text-xs font-bold ${
                  canSkip
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white glow-indigo'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
                rightIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
              >
                {canSkip ? 'Continue to Output' : `Wait ${countdown}s to Continue`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
