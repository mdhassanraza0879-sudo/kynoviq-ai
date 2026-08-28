'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { Sparkles, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast.success('Reset link dispatched', 'Check your inbox for password recovery instructions.');
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-[#090d16] text-slate-100 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10 space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-white">
              Kynoviq <span className="gradient-text">AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-white pt-2">Password Reset</h1>
          <p className="text-xs text-slate-400">Enter your email to receive recovery instructions.</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6 shadow-2xl">
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 inline-flex">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Reset Link Sent</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If an account exists for <span className="text-white font-medium">{email}</span>, password reset instructions have been dispatched.
              </p>
              <Link href="/login" className="inline-block pt-2">
                <Button variant="secondary" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Email"
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
                Send Recovery Instructions
              </Button>

              <div className="text-center pt-2">
                <Link href="/login" className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
