import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, children, glow = false, hoverable = false, ...props }) => {
  return (
    <div
      className={cn(
        'bg-slate-900/80 border border-slate-800/80 rounded-xl p-5 text-slate-100 backdrop-blur-sm relative overflow-hidden transition-all duration-250',
        glow && 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-gradient-to-r before:from-indigo-500/0 before:via-indigo-500/60 before:to-sky-500/0',
        hoverable && 'hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
