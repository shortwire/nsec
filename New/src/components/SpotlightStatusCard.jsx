import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

const VARIANT_STYLES = {
  teal: {
    hover: 'hover:shadow-[0_20px_40px_rgba(0,139,139,0.15)] hover:border-brand-accent/40',
    orb: 'bg-brand-accent/20 group-hover:bg-brand-accent/30',
    icon: 'text-brand-accent group-hover:bg-brand-accent group-hover:text-white group-hover:border-brand-accent group-hover:shadow-[0_0_24px_rgba(14,165,165,0.4)]',
    badge: 'text-brand-accent',
    cta: 'text-brand-accent',
  },
  maroon: {
    hover: 'hover:shadow-[0_20px_40px_rgba(128,0,0,0.15)] hover:border-brand-maroon/40',
    orb: 'bg-brand-maroon/20 group-hover:bg-brand-maroon/30',
    icon: 'text-[#fbbf24] border-[#fbbf24]/30 group-hover:bg-[#fbbf24] group-hover:text-slate-900 group-hover:border-[#fbbf24] group-hover:shadow-[0_0_24px_rgba(251,191,36,0.5)]',
    badge: 'text-[#fbbf24]',
    cta: 'text-[#fbbf24]',
  },
  gold: {
    hover: 'hover:shadow-[0_20px_40px_rgba(251,191,36,0.16)] hover:border-[#fbbf24]/50',
    orb: 'bg-[#fbbf24]/25 group-hover:bg-[#fbbf24]/35',
    icon: 'text-[#fbbf24] border-[#fbbf24]/30 group-hover:bg-[#fbbf24] group-hover:text-slate-900 group-hover:border-[#fbbf24] group-hover:shadow-[0_0_24px_rgba(251,191,36,0.45)]',
    badge: 'text-[#fbbf24]',
    cta: 'text-[#fbbf24]',
  },
};

export default function SpotlightStatusCard({
  href,
  onClick,
  target,
  rel,
  delay = 0,
  variant = 'teal',
  backgroundImage,
  icon: Icon,
  badge,
  title,
  value,
  description,
  meta,
  cta,
  titleClassName,
  valueClassName,
  descriptionClassName,
  className,
}) {
  const styles = VARIANT_STYLES[variant] ?? VARIANT_STYLES.teal;
  const MotionTag = href ? motion.a : motion.div;

  return (
    <MotionTag
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className={cn(
        'group relative p-10 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl flex flex-col gap-6 transition-all duration-500 overflow-hidden',
        styles.hover,
        href ? 'cursor-pointer' : '',
        className
      )}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0 opacity-100 pointer-events-none bg-center bg-cover rounded-2xl transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      )}
      <div className="absolute inset-0 z-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500 rounded-2xl" />

      <div className={cn('absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-[2] z-0 blur-xl', styles.orb)} />
      <div className="absolute bottom-0 left-0 right-0 h-[3px] z-0" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.6), rgba(251,191,36,0.2), transparent)' }} />

      <div className="flex items-center justify-between relative z-10">
        <div className="relative">
          <div className={cn('w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:scale-105 transition-all duration-300', styles.icon)}>
            {Icon && <Icon size={22} />}
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 animate-pulse" style={{ background: '#fbbf24', boxShadow: '0 0 8px rgba(251,191,36,0.8)' }} />
        </div>
        {badge ? <span className={cn('text-sm font-mono font-black uppercase tracking-[0.2em] drop-shadow-md', styles.badge)}>{badge}</span> : null}
      </div>

      <div className="relative z-10">
        <h4 className={cn('text-xl font-heading font-black italic uppercase tracking-tighter text-white mb-4 drop-shadow-md leading-snug break-words w-full', titleClassName)}>{title}</h4>
        {value ? <p className={cn('text-2xl font-mono font-black text-white/90 transition-colors duration-300 drop-shadow-md', valueClassName)}>{value}</p> : null}
        {description ? <p className={cn('text-sm font-body text-white/80 mt-2', descriptionClassName)}>{description}</p> : null}
      </div>

      {(meta || cta) && (
        <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between relative z-10">
          <span className="text-[9px] font-mono font-bold text-white/50 uppercase tracking-widest">{meta}</span>
          {cta ? (
            <div className={cn('flex items-center gap-2 font-mono font-black text-[10px] uppercase tracking-widest transition-all duration-300', styles.cta)}>
              {cta} <ChevronRight size={14} />
            </div>
          ) : null}
        </div>
      )}
    </MotionTag>
  );
}
