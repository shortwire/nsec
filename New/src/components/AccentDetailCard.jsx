import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

const TONES = {
  accent: {
    border: 'border-brand-accent/10',
    hover: 'hover:border-brand-accent/30 hover:shadow-[0_12px_32px_rgba(0,139,139,0.1)]',
    icon: 'bg-brand-accent/10 text-brand-accent',
    marker: 'bg-[#fbbf24]',
    label: 'text-brand-accent',
  },
  blue: {
    border: 'border-slate-200',
    hover: 'hover:border-brand-blue/30 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]',
    icon: 'bg-brand-blue/10 text-brand-blue',
    marker: 'bg-brand-blue',
    label: 'text-brand-blue',
  },
  maroon: {
    border: 'border-slate-200',
    hover: 'hover:border-brand-maroon/30 hover:shadow-[0_12px_32px_rgba(128,0,0,0.08)]',
    icon: 'bg-brand-maroon/10 text-brand-maroon',
    marker: 'bg-brand-maroon',
    label: 'text-brand-maroon',
  },
  amber: {
    border: 'border-slate-200',
    hover: 'hover:border-amber-400/40 hover:shadow-[0_12px_32px_rgba(245,158,11,0.1)]',
    icon: 'bg-amber-50 text-amber-700',
    marker: 'bg-[#fbbf24]',
    label: 'text-amber-700',
  },
  slate: {
    border: 'border-slate-200',
    hover: 'hover:border-slate-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]',
    icon: 'bg-slate-100 text-slate-700',
    marker: 'bg-slate-400',
    label: 'text-slate-700',
  },
};

const SIZES = {
  sm: {
    card: 'p-3 rounded-xl border-2',
    gap: 'gap-3',
    iconBox: 'w-7 h-7 rounded-lg',
    iconSize: 13,
    value: 'text-[13px]',
    label: 'text-[10px] min-w-[92px]',
  },
  md: {
    card: 'p-4 rounded-2xl border-2',
    gap: 'gap-4',
    iconBox: 'w-8 h-8 rounded-xl',
    iconSize: 14,
    value: 'text-[14px]',
    label: 'text-[10px] min-w-[100px]',
  },
};

export default function AccentDetailCard({
  index = 0,
  tone = 'accent',
  size = 'md',
  layout = 'stack',
  title,
  value,
  label,
  icon: Icon,
  showMarker = true,
  className = '',
  labelClassName = '',
  valueClassName = '',
  children,
}) {
  const toneStyle = TONES[tone] || TONES.accent;
  const sizeStyle = SIZES[size] || SIZES.md;
  const hasLabel = Boolean(label);
  const hasValue = Boolean(value);
  const content = title || value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative bg-white border-slate-200 shadow-sm hover:bg-brand-accent/5 transition-all duration-300',
        sizeStyle.card,
        toneStyle.border,
        toneStyle.hover,
        className
      )}
    >
      <div className={cn('flex items-start relative z-10', sizeStyle.gap)}>
        {showMarker ? (
          <div className={cn('shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105', sizeStyle.iconBox, Icon ? toneStyle.icon : cn('border border-white shadow-sm', toneStyle.marker))}>
            {Icon ? <Icon size={sizeStyle.iconSize} /> : <span className="w-2 h-2 rounded-full bg-white/95" />}
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          {layout === 'pair' ? (
            <div className="flex items-start gap-4">
              {hasLabel ? (
                <span className={cn('font-mono font-black uppercase tracking-widest pt-0.5 shrink-0', toneStyle.label, sizeStyle.label, labelClassName)}>
                  {label}
                </span>
              ) : null}
              {hasValue ? (
                <span className={cn('font-body font-medium leading-relaxed', tone === 'accent' ? 'text-slate-700' : 'text-slate-700', sizeStyle.value, valueClassName)}>
                  {value}
                </span>
              ) : null}
            </div>
          ) : (
            <>
              {hasLabel ? (
                <p className={cn('font-mono font-black uppercase tracking-widest mb-1', toneStyle.label, sizeStyle.label, labelClassName)}>
                  {label}
                </p>
              ) : null}
              {hasValue ? (
                <p className={cn('font-body font-medium leading-relaxed', sizeStyle.value, 'text-slate-700', valueClassName)}>
                  {value}
                </p>
              ) : null}
              {content && !hasValue ? (
                <p className={cn('font-body font-medium leading-relaxed', sizeStyle.value, 'text-slate-700', valueClassName)}>
                  {content}
                </p>
              ) : null}
            </>
          )}

          {children}
        </div>
      </div>
    </motion.div>
  );
}