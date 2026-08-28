import React from 'react';
import Link from 'next/link';
import { Card } from './Card';
import { Button } from './Button';
import { AIToolConfig } from '@/types';
import {
  MessageSquare,
  FileText,
  GraduationCap,
  Code2,
  PenTool,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare className="w-6 h-6 text-cyan-400" />,
  FileText: <FileText className="w-6 h-6 text-indigo-400" />,
  GraduationCap: <GraduationCap className="w-6 h-6 text-purple-400" />,
  Code2: <Code2 className="w-6 h-6 text-emerald-400" />,
  PenTool: <PenTool className="w-6 h-6 text-amber-400" />,
  Lightbulb: <Lightbulb className="w-6 h-6 text-pink-400" />,
};

export interface ToolCardProps {
  tool: AIToolConfig;
  showCategory?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, showCategory = true }) => {
  return (
    <Card hoverable glow className="flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-slate-800/90 border border-slate-700/60 rounded-xl group-hover:border-cyan-500/40 group-hover:scale-105 transition-all">
            {iconMap[tool.iconName] || <Sparkles className="w-6 h-6 text-cyan-400" />}
          </div>
          {tool.badge && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {tool.badge}
            </span>
          )}
        </div>
        {showCategory && (
          <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
            {tool.category}
          </span>
        )}
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mt-1 mb-2">
          {tool.name}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">{tool.description}</p>
      </div>

      <Link href={tool.href} className="w-full">
        <Button
          variant="secondary"
          className="w-full group-hover:border-cyan-500/50 group-hover:bg-slate-800 group-hover:text-cyan-300"
          rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
        >
          Open Tool
        </Button>
      </Link>
    </Card>
  );
};
