import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const VARIANTS = {
  accent: {
    border: 'border-brand-accent/10',
    hover: 'hover:border-brand-accent/30 hover:shadow-[0_12px_32px_rgba(0,139,139,0.1)]',
    icon: 'bg-brand-accent/10 text-brand-accent',
    title: 'text-slate-800',
    description: 'text-slate-600',
  },
  blue: {
    border: 'border-brand-blue/10',
    hover: 'hover:border-brand-blue/30 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]',
    icon: 'bg-brand-blue/10 text-brand-blue',
    title: 'text-slate-800',
    description: 'text-slate-600',
  },
  maroon: {
    border: 'border-brand-maroon/10',
    hover: 'hover:border-brand-maroon/30 hover:shadow-[0_12px_32px_rgba(128,0,0,0.08)]',
    icon: 'bg-brand-maroon/10 text-brand-maroon',
    title: 'text-slate-800',
    description: 'text-slate-600',
  },
  amber: {
    border: 'border-amber-200',
    hover: 'hover:border-amber-400/40 hover:shadow-[0_12px_32px_rgba(245,158,11,0.1)]',
    icon: 'bg-amber-50 text-amber-700',
    title: 'text-slate-800',
    description: 'text-slate-600',
  },
  slate: {
    border: 'border-slate-200',
    hover: 'hover:border-slate-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]',
    icon: 'bg-slate-100 text-slate-700',
    title: 'text-slate-800',
    description: 'text-slate-600',
  },
};

const SIZES = {
  sm: {
    card: 'p-3 rounded-xl border-2',
    gap: 'gap-3',
    iconBox: 'w-7 h-7 rounded-lg',
    iconSize: 13,
    title: 'text-[13px]',
    description: 'text-[11px]',
  },
  md: {
    card: 'p-4 rounded-2xl border-2',
    gap: 'gap-4',
    iconBox: 'w-9 h-9 rounded-xl',
    iconSize: 15,
    title: 'text-[14px]',
    description: 'text-[12px]',
  },
};

export default function SectionItemCard({
  index = 0,
  tone = 'accent',
  size = 'md',
  icon: Icon,
  title,
  description,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
}) {
  const variant = VARIANTS[tone] || VARIANTS.accent;
  const dimensions = SIZES[size] || SIZES.md;
  const hasDescription = Boolean(description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative bg-white shadow-sm hover:bg-brand-accent/5 transition-all duration-300',
        dimensions.card,
        variant.border,
        variant.hover,
        className
      )}
    >
      <div className={cn('flex items-start relative z-10', dimensions.gap)}>
        {Icon ? (
          <div className={cn('shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105', dimensions.iconBox, variant.icon)}>
            <Icon size={dimensions.iconSize} />
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          {title ? (
            <p className={cn('font-heading font-black italic uppercase tracking-tight leading-snug', variant.title, dimensions.title, titleClassName)}>
              {title}
            </p>
          ) : null}

          {hasDescription ? (
            <p className={cn('mt-1 font-body font-medium leading-relaxed', variant.description, dimensions.description, descriptionClassName)}>
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}