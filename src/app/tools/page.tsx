import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToolCard } from '@/components/ui/ToolCard';
import { AI_TOOLS } from '@/config/tools';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'AI Tools Catalog — Kynoviq AI',
  description: 'Explore the full suite of Kynoviq AI tools for productivity, learning, coding, writing, and idea generation.',
};

export default function ToolsCatalogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dedicated Tool Modules</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              Explore Our <span className="gradient-text">AI Tools Suite</span>
            </h1>
            <p className="text-slate-400 text-base">
              Select a specialized tool below to launch an optimized workspace environment.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AI_TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
