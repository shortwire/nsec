import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const MotionCard = motion.div;

const VARIANTS = {
  accent: {
    root: 'bg-gradient-to-br from-brand-accent/[0.02] via-white to-white border border-brand-accent/10 border-l-[3px] border-l-[#fbbf24] shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,139,139,0.1)] hover:border-brand-accent/30',
    badge: 'bg-[#fbbf24] text-slate-900 shadow-[0_2px_4px_rgba(251,191,36,0.2)] group-hover:shadow-[0_4px_8px_rgba(251,191,36,0.3)]',
    connector: 'w-16 group-hover:w-24 bg-[linear-gradient(to_right,rgba(251,191,36,0.8),rgba(251,191,36,0.1),transparent)]',
    number: 'text-slate-900',
  },
  slate: {
    root: 'bg-gradient-to-br from-brand-accent/[0.03] via-white to-white border border-brand-accent/10 border-l-[3px] border-l-brand-accent shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,139,139,0.12)] hover:border-brand-accent/30',
    badge: 'bg-brand-accent text-white shadow-[0_2px_4px_rgba(0,139,139,0.18)] group-hover:shadow-[0_4px_8px_rgba(0,139,139,0.28)]',
    connector: 'w-16 group-hover:w-24 bg-[linear-gradient(to_right,rgba(0,139,139,0.8),rgba(0,139,139,0.16),transparent)]',
    number: 'text-white',
  },
  danger: {
    root: 'bg-gradient-to-br from-brand-maroon/[0.04] via-white to-white border border-brand-maroon/[0.12] border-l-[3px] border-l-brand-maroon shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(128,0,0,0.14)] hover:border-brand-maroon/[0.22]',
    badge: 'bg-brand-maroon text-white shadow-[0_2px_4px_rgba(128,0,0,0.15)] group-hover:shadow-[0_4px_8px_rgba(128,0,0,0.25)] border-[#fbbf24]/80',
    connector: 'w-20 group-hover:w-32 bg-[linear-gradient(to_right,rgba(128,0,0,0.5),rgba(128,0,0,0.1),transparent)]',
    number: 'text-white',
  },
};

export default function Card({
  index = 0,
  number,
  variant = 'accent',
  className,
  badgeClassName,
  connectorClassName,
  numberClassName,
  children,
}) {
  const styles = VARIANTS[variant] ?? VARIANTS.accent;
  const displayNumber = number ?? String(index + 1).padStart(2, '0');

  return (
    <MotionCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative rounded-[20px] transition-all duration-[250ms] ease-out mt-3 ml-3 hover:-translate-y-[6px]',
        styles.root,
        className
      )}
    >
      <div className={cn('absolute -top-3 -left-4 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-[250ms] ease-out z-10 border-2 border-white', styles.badge, badgeClassName)}>
        <span className={cn('text-[12px] font-mono font-black', styles.number, numberClassName)}>{displayNumber}</span>
        <div className={cn('absolute top-1/2 left-full h-[2px] -translate-y-1/2 opacity-70 group-hover:opacity-100 transition-all duration-[250ms] ease-out pointer-events-none', styles.connector, connectorClassName)} />
      </div>

      {children}
    </MotionCard>
  );
}