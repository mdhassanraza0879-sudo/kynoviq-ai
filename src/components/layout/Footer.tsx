import React from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Phone, Globe, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070a12] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Founder Col */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-extrabold text-white">
                Kynoviq <span className="gradient-text">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Think smarter. Create faster. Founded by <strong className="text-slate-200">Mohammad Hassan Raza</strong> to deliver next-generation AI workspace tools.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400 pt-1">
              <a href="mailto:mdhassanraza0879@gmail.com" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">mdhassanraza0879@gmail.com</span>
              </a>
              <a href="tel:7307670879" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>+91 7307670879</span>
              </a>
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/chat" className="hover:text-indigo-400 transition-colors">AI Chat</Link></li>
              <li><Link href="/tools/summarizer" className="hover:text-indigo-400 transition-colors">Smart Summarizer</Link></li>
              <li><Link href="/tools/study" className="hover:text-indigo-400 transition-colors">Study Assistant</Link></li>
              <li><Link href="/tools/code" className="hover:text-indigo-400 transition-colors">Code Assistant</Link></li>
              <li><Link href="/tools/writing" className="hover:text-indigo-400 transition-colors">Writing Assistant</Link></li>
              <li><Link href="/tools/ideas" className="hover:text-indigo-400 transition-colors">Idea Generator</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Dashboard</Link></li>
              <li><Link href="/pricing" className="hover:text-indigo-400 transition-colors">Pricing Plans</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">About & Founder</Link></li>
              <li><Link href="/history" className="hover:text-indigo-400 transition-colors">Execution History</Link></li>
              <li><Link href="/saved" className="hover:text-indigo-400 transition-colors">Saved Snippets</Link></li>
            </ul>
          </div>

          {/* Legal / Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Security & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-indigo-400 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-indigo-400 cursor-pointer">Terms of Service</li>
              <li className="hover:text-indigo-400 cursor-pointer">Security Standards</li>
              <li className="hover:text-indigo-400 cursor-pointer">API Status</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Kynoviq AI Inc. Founded by Mohammad Hassan Raza. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Engineered with Next.js, Prisma, & OpenAI.</p>
        </div>
      </div>
    </footer>
  );
};
