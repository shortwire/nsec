import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export default function ContactSectionCard({ index, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group p-4 bg-white border-[3px] border-slate-200 rounded-[24px] hover:border-brand-accent/40 hover:shadow-lg transition-all duration-300 flex items-center gap-4"
    >
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-800 border-2 border-slate-800 group-hover:bg-slate-800 group-hover:text-white transition-colors shrink-0 shadow-sm">
        <Users size={18} />
      </div>
      <div>
        <h5 className="text-[14px] font-heading font-black italic uppercase tracking-tight text-slate-800">{title}</h5>
        <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest">{subtitle}</p>
      </div>
    </motion.div>
  );
}