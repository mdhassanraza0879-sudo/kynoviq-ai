'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Check, Sparkles, CreditCard, Zap } from 'lucide-react';

export default function PricingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const toast = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (plan: string) => {
    if (status !== 'authenticated') {
      router.push(`/login?callbackUrl=/pricing`);
      return;
    }

    setLoadingPlan(plan);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error('Checkout Error', data.error || 'Failed to initialize payment.');
      } else if (data.url) {
        toast.success('Redirecting to Checkout...', 'Opening secure Stripe payment portal.');
        window.location.href = data.url;
      }
    } catch (e) {
      toast.error('Error', 'An unexpected error occurred.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for exploring Kynoviq AI tools and basic usage.',
      features: [
        'Access to all 6 AI tools',
        '20 AI executions / day',
        'Basic execution history (3 days)',
        'Standard GPT-4o-mini speed',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro Creator',
      price: '$19',
      period: 'per month',
      description: 'Ideal for professionals, creators, and developers.',
      features: [
        'Unlimited AI tool executions',
        'Unlimited execution history & search',
        'Save unlimited snippets to library',
        'Priority GPT-4o response pipeline',
        'Advanced code refactoring & study guides',
        'Priority support',
      ],
      cta: 'Upgrade with Stripe',
      popular: true,
    },
    {
      id: 'team',
      name: 'Team / Enterprise',
      price: '$49',
      period: 'per user/month',
      description: 'For growing teams requiring collaborative AI workspaces.',
      features: [
        'Everything in Pro Creator',
        'Shared workspace & saved library',
        'Custom team system prompts',
        'Dedicated API quotas & SLAs',
        'Dedicated account manager',
      ],
      cta: 'Upgrade Team Plan',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Stripe Payment Integration</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              Simple, Predictable <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-slate-400 text-base">
              Choose the right plan to power your productivity and AI creation. Secure payments processed by Stripe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-slate-900/80 border rounded-2xl p-8 flex flex-col justify-between backdrop-blur-sm transition-all duration-200 ${
                  plan.popular
                    ? 'border-indigo-500/60 shadow-2xl shadow-indigo-500/15 ring-1 ring-indigo-500/50'
                    : 'border-slate-800'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-gradient-to-r from-indigo-500 to-sky-500 text-white text-[11px] font-black tracking-wider uppercase rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400 font-medium">/ {plan.period}</span>
                  </div>

                  <div className="space-y-3 border-t border-slate-800 pt-6">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  {plan.id === 'free' ? (
                    <Link href="/register" className="w-full block">
                      <Button variant="secondary" className="w-full">
                        {plan.cta}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant={plan.popular ? 'primary' : 'secondary'}
                      className="w-full"
                      isLoading={loadingPlan === plan.id}
                      onClick={() => handleSubscribe(plan.id)}
                      leftIcon={<CreditCard className="w-4 h-4" />}
                    >
                      {plan.cta}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center pt-8 border-t border-slate-800/60 max-w-xl mx-auto space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Encrypted Stripe Checkout • Cancel Subscription Anytime</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
