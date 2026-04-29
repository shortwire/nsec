import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { cn } from '../utils/cn';

const VARIANTS = {
  accent: {
    border: 'border-brand-accent/30',
    bg: 'bg-white',
    hover: 'hover:border-brand-accent/60 hover:shadow-[0_8px_24px_rgba(0,139,139,0.15)]',
    icon: 'bg-brand-accent/10 text-brand-accent group-hover:bg-brand-accent group-hover:text-white'
  },
  slate: {
    border: 'border-slate-300/50',
    bg: 'bg-white',
    hover: 'hover:border-slate-400 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]',
    icon: 'bg-slate-100 text-slate-700 group-hover:bg-slate-700 group-hover:text-white'
  },
  danger: {
    border: 'border-red-300/40',
    bg: 'bg-white',
    hover: 'hover:border-red-400 hover:shadow-[0_8px_24px_rgba(239,68,68,0.15)]',
    icon: 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white'
  }
};

export default function PdfCard({ 
  href, 
  download = false,
  icon: Icon = FileText, 
  title, 
  label,
  meta,
  variant = 'accent',
  index = 0,
  onClick,
  size = 'default',
  className = ''
}) {
  const variantStyle = VARIANTS[variant] || VARIANTS.accent;
  const isCompact = size === 'compact';
  
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const isExternal = href && href.startsWith('http');
  const isDisabled = !href;

  return (
    <motion.a
      href={href || '#'}
      download={download}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : ''}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group block relative transition-all duration-300',
        isCompact ? 'p-3 rounded-xl border border-slate-200' : 'p-5 sm:p-6 rounded-[24px] border-[3px]',
        variantStyle.border,
        variantStyle.bg,
        variantStyle.hover,
        isDisabled && 'opacity-60 cursor-not-allowed hover:border-current hover:shadow-none',
        className
      )}
    >
      <div className={cn('flex items-start justify-between gap-4', isCompact && 'gap-3')}>
        <div className={cn('flex items-start gap-4 flex-1 min-w-0', isCompact && 'gap-3')}>
          <div className={cn(
            'shrink-0 rounded-[16px] flex items-center justify-center transition-all duration-300',
            isCompact ? 'w-8 h-8' : 'w-10 h-10 sm:w-12 sm:h-12',
            variantStyle.icon
          )}>
            <Icon size={isCompact ? 16 : 24} className="sm:size-28" />
          </div>
          <div className={cn('min-w-0 flex-1 pt-1', isCompact && 'pt-0.5')}>
            <h3 className={cn('font-heading font-black italic uppercase tracking-tight text-slate-900 leading-snug group-hover:text-brand-accent transition-colors duration-300', isCompact ? 'text-[12px]' : 'text-[13px] sm:text-[15px]')}>
              {title}
            </h3>
            {label && (
              <p className={cn('font-mono font-semibold text-slate-500 uppercase tracking-widest group-hover:text-slate-700 transition-colors', isCompact ? 'text-[9px] mt-1' : 'text-[11px] sm:text-[12px] mt-2')}>
                {label}
              </p>
            )}
            {meta && (
              <p className={cn('font-body text-slate-400 group-hover:text-slate-600 transition-colors', isCompact ? 'text-[9px] mt-1' : 'text-[10px] sm:text-[11px] mt-1.5')}>
                {meta}
              </p>
            )}
          </div>
        </div>
        {href && (
          <div className={cn('shrink-0 pt-1', isCompact && 'pt-0')}>
            {download ? (
              <Download size={isCompact ? 14 : 18} className="text-slate-300 group-hover:text-brand-accent group-hover:scale-110 transition-all duration-300" />
            ) : (
              <ExternalLink size={isCompact ? 14 : 18} className="text-slate-300 group-hover:text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            )}
          </div>
        )}
      </div>
    </motion.a>
  );
}
