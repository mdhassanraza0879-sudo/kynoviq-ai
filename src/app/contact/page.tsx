'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/config/site';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>24/7 Creator & Enterprise Support</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Contact Kynoviq AI</h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Reach out for enterprise custom integrations, API keys, custom model fine-tuning, or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Founder Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-white">Direct Communication</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect directly with our team for priority customer inquiries.
              </p>

              <div className="space-y-3 pt-2 text-xs font-mono">
                <a
                  href={`mailto:${SITE_CONFIG.founder.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/30 transition-colors"
                >
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span className="text-slate-200">{SITE_CONFIG.founder.email}</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.founder.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-sky-500/30 transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span className="text-slate-200">+91 {SITE_CONFIG.founder.phone}</span>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-200">Response SLA: Under 2 Hours</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#07090e] border border-white/[0.08] space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Founder & Architect
              </h4>
              <p className="text-sm font-bold text-slate-200">{SITE_CONFIG.founder.name}</p>
              <p className="text-xs text-slate-400">{SITE_CONFIG.founder.role}</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] shadow-2xl">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Inquiry Received</h3>
                  <p className="text-xs text-slate-300">
                    Thank you for reaching out. We have logged your request and will follow up shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Jenkins"
                        className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-300 font-bold">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@agency.com"
                        className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold">Subject / Category</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Enterprise License">Enterprise & Team Licensing</option>
                      <option value="API & Webhooks">Custom AI API & Webhook Access</option>
                      <option value="Billing & Credits">Billing & Credit Top-ups</option>
                      <option value="Feedback">Feature Request / Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold">Message</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details regarding your inquiry..."
                      className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <Button variant="primary" size="md" type="submit" className="w-full text-xs font-bold glow-indigo">
                    Send Inquiry
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
