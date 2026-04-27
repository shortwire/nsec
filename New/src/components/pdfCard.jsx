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
  className = ''
}) {
  const variantStyle = VARIANTS[variant] || VARIANTS.accent;
  
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
        'group block relative p-5 sm:p-6 rounded-[24px] border-[3px] transition-all duration-300',
        variantStyle.border,
        variantStyle.bg,
        variantStyle.hover,
        isDisabled && 'opacity-60 cursor-not-allowed hover:border-current hover:shadow-none',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className={cn(
            'shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-[16px] flex items-center justify-center transition-all duration-300',
            variantStyle.icon
          )}>
            <Icon size={24} className="sm:size-28" />
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <h3 className="text-[13px] sm:text-[15px] font-heading font-black italic uppercase tracking-tight text-slate-900 leading-snug group-hover:text-brand-accent transition-colors duration-300">
              {title}
            </h3>
            {label && (
              <p className="text-[11px] sm:text-[12px] font-mono font-semibold text-slate-500 uppercase tracking-widest mt-2 group-hover:text-slate-700 transition-colors">
                {label}
              </p>
            )}
            {meta && (
              <p className="text-[10px] sm:text-[11px] font-body text-slate-400 mt-1.5 group-hover:text-slate-600 transition-colors">
                {meta}
              </p>
            )}
          </div>
        </div>
        {href && (
          <div className="shrink-0 pt-1">
            {download ? (
              <Download size={18} className="text-slate-300 group-hover:text-brand-accent group-hover:scale-110 transition-all duration-300" />
            ) : (
              <ExternalLink size={18} className="text-slate-300 group-hover:text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            )}
          </div>
        )}
      </div>
    </motion.a>
  );
}
