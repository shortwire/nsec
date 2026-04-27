import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, BookOpen, ExternalLink, X, FileText } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

function PdfModal({ url, onClose }) {
  return (
    <AnimatePresence>
      {url && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
          className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()} className="w-full max-w-5xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent"><BookOpen size={16} /></div>
                <h3 className="text-sm font-heading font-black italic uppercase tracking-widest text-slate-800">Document Preview</h3>
              </div>
              <div className="flex items-center gap-2">
                <a href={url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"><ExternalLink size={18} /></a>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors"><X size={18} /></button>
              </div>
            </div>
            <div className="flex-1 relative"><iframe src={url} className="absolute inset-0 w-full h-full border-0" title="Document" /></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AdmissionBrochure() {
  const [config, setConfig] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const phrases = [
    { main: 'DOWNLOAD', highlight: 'BROCHURE' },
    { main: 'PROSPECTUS', highlight: '2026' },
    { main: 'NSEC', highlight: 'GUIDE' },
    { main: 'ADMISSION', highlight: 'OPEN' },
  ];
  useEffect(() => { const t = setInterval(() => setCurrentIdx(p => (p + 1) % phrases.length), 4000); return () => clearInterval(t); }, [phrases.length]);
  useEffect(() => { fetch('/config/admission-download-brochure.json').then(r => r.json()).then(setConfig).catch(console.error); }, []);
  if (!config) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" /></div>;
  return (
    <div className="min-h-screen bg-white">
      <PageHero showParticles={false} maxHeight="33vh" titleStroke="DOWNLOAD" titleFill="BROCHURE"
        useYellowAccents={true} statutoryLabel={<span className="text-[#fbbf24]">ADMISSION 2025-26</span>}
        policyLabel="" rightLabel={<span className="text-[#fbbf24]">Prospectus</span>}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Get', 'detailed', 'insights', 'into', 'our', 'courses', 'and'].map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }} className="text-white/70 text-[15px] font-body font-medium">{w}</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.88 }} className="relative inline-block">
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ textShadow: '0 0 25px rgba(0,139,139,0.5)' }}>campus life</span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 1.1 }} className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block" />
              </motion.span>
            </div>
          </div>
        }
      />
      <section className="py-24 px-8 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Admission Brochure" tagline="Download the official NSEC admission brochure for the session 2026." />
          <div className="mt-12 grid gap-6">
            {config.documents.map((doc, i) => (
              <motion.button key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedPdf('/assets/Notices/' + doc.file)}
                className="w-full text-left group flex items-center justify-between p-8 bg-white border border-slate-200 rounded-2xl hover:bg-brand-maroon/5 hover:border-brand-maroon/30 shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-maroon/10 flex items-center justify-center text-brand-maroon shrink-0 group-hover:bg-brand-maroon group-hover:text-white transition-all"><FileText size={24} /></div>
                  <div>
                    <h3 className="text-xl font-heading font-black italic uppercase tracking-tight text-slate-800 group-hover:text-brand-maroon">{doc.title}</h3>
                    <p className="text-sm font-mono text-slate-400 uppercase tracking-widest mt-1">Session: {doc.year} | PDF Document</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="px-4 py-2 rounded-full border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:border-brand-maroon/30 group-hover:text-brand-maroon transition-all">Preview</div>
                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-maroon group-hover:text-white transition-all"><Download size={18} /></div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      <PdfModal url={selectedPdf} onClose={() => setSelectedPdf(null)} />
    </div>
  );
}
