import { motion } from 'framer-motion';
import { ChevronRight, FileText } from 'lucide-react';
import { cn } from '../utils/cn';

const VARIANTS = {
  accent: {
    shell: 'bg-brand-blue border-white/10 shadow-2xl text-white',
    icon: 'bg-white/10 text-[#fbbf24] group-hover:bg-[#fbbf24] group-hover:text-brand-blue',
    accent: 'bg-gradient-to-r from-white/20 via-white/10 to-transparent',
  },
  slate: {
    shell: 'bg-slate-900 border-white/10 shadow-2xl text-white',
    icon: 'bg-white/10 text-[#fbbf24] group-hover:bg-[#fbbf24] group-hover:text-slate-900',
    accent: 'bg-gradient-to-r from-white/20 via-white/10 to-transparent',
  },
  danger: {
    shell: 'bg-brand-maroon border-white/10 shadow-2xl text-white',
    icon: 'bg-white/10 text-[#fbbf24] group-hover:bg-[#fbbf24] group-hover:text-brand-maroon',
    accent: 'bg-gradient-to-r from-white/20 via-white/10 to-transparent',
  },
};

export default function MinCard({
  index = 0,
  title,
  description,
  badge,
  meta,
  icon: Icon = FileText,
  href,
  onClick,
  target,
  rel,
  variant = 'accent',
  className = '',
  contentClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  badgeClassName = '',
  actionLabel,
  children,
  center = false,
  compact = false,
  disabled = false,
}) {
  const variantStyle = VARIANTS[variant] || VARIANTS.accent;
  const interactive = !disabled && (Boolean(href) || Boolean(onClick));
  const Component = href ? motion.a : interactive ? motion.button : motion.div;
  const resolvedTarget = target ?? (href && href.startsWith('http') ? '_blank' : undefined);
  const resolvedRel = rel ?? (resolvedTarget === '_blank' ? 'noopener noreferrer' : undefined);
  const clickableProps = href
    ? { href, target: resolvedTarget, rel: resolvedRel }
    : interactive
      ? { type: 'button', onClick }
      : {};

  const textTone = variant === 'danger' ? 'text-white/80' : 'text-white/75';
  const mutedTone = variant === 'danger' ? 'text-white/55' : 'text-white/60';

  return (
    <Component
      {...clickableProps}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={href && onClick ? onClick : undefined}
      className={cn(
        'group relative overflow-hidden rounded-[28px] border border-white/10 transition-all duration-300 ease-out',
        variantStyle.shell,
        interactive && 'hover:-translate-y-1.5 cursor-pointer',
        disabled && 'opacity-60 cursor-not-allowed hover:translate-y-0',
        compact ? 'p-4' : 'p-6',
        className
      )}
    >
      <div className={cn('absolute inset-x-0 top-0 h-[1px] opacity-90', variantStyle.accent)} />

      <div className={cn('relative z-10 flex flex-col gap-4', center && 'items-center text-center', contentClassName)}>
        <div className={cn('flex items-center justify-between gap-4', center && 'justify-center w-full')}>
          <div className={cn('shrink-0 w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center transition-all duration-300', variantStyle.icon)}>
            <Icon size={center ? 22 : 20} />
          </div>

          {!center && (href || onClick || actionLabel) && (
            <ChevronRight size={18} className={textTone} />
          )}
        </div>

        <div className={cn('min-w-0 flex-1', center && 'flex flex-col items-center')}>
          {badge && (
            <div className={cn('mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[9px] font-mono font-black uppercase tracking-widest', mutedTone, badgeClassName)}>
              {badge}
            </div>
          )}

          {title && (
            <h3 className={cn('text-[16px] sm:text-[18px] font-heading font-black italic uppercase tracking-tight leading-snug text-white transition-colors', titleClassName)}>
              {title}
            </h3>
          )}

          {description && (
            <p className={cn('mt-2 text-[12px] sm:text-[13px] font-body font-medium leading-relaxed transition-colors', textTone, descriptionClassName)}>
              {description}
            </p>
          )}

          {meta && (
            <p className={cn('mt-2 text-[10px] font-mono font-black uppercase tracking-[0.22em] transition-colors', mutedTone)}>
              {meta}
            </p>
          )}

          {children}

          {(actionLabel || href || onClick) && (
            <div className={cn('mt-4 flex items-center gap-2 text-[9px] font-mono font-black uppercase tracking-widest text-[#fbbf24] transition-colors', center && 'justify-center')}>
              <span>{actionLabel || (href ? 'Open Link' : 'View More')}</span>
              <ChevronRight size={12} className="transition-transform group-hover:translate-x-1" />
            </div>
          )}
        </div>
      </div>
    </Component>
  );
}