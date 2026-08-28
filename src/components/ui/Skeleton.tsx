import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, variant = 'text', ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-slate-800/80 rounded',
        variant === 'text' && 'h-4 w-full rounded-md',
        variant === 'rectangular' && 'h-24 w-full rounded-xl',
        variant === 'circular' && 'h-10 w-10 rounded-full',
        className
      )}
      {...props}
    />
  );
};
