import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shield, Users, Award, BookOpen, Download, ExternalLink, X, Phone, Mail, CheckCircle2, GraduationCap, Bus, Wifi } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

const ICONS = [Heart, Shield, Users, Award, BookOpen, Bus, Wifi, CheckCircle2, GraduationCap, Phone];
function ItemCard({ index, text }) {
  const Icon = ICONS[index % ICONS.length];
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[20px] bg-gradient-to-br from-brand-accent/[0.02] via-white to-white border border-brand-accent/10 border-l-[3px] border-l-[#fbbf24] shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:-translate-y-[6px] hover:shadow-[0_12px_32px_rgba(0,139,139,0.1)] hover:border-brand-accent/30 transition-all duration-[250ms] ease-out mt-3 ml-3">
      <div className="absolute -top-3 -left-4 w-11 h-11 rounded-full bg-[#fbbf24] flex items-center justify-center z-10 border-2 border-white shadow-sm group-hover:scale-[1.05] transition-all">
        <span className="text-[12px] font-mono font-black text-slate-900">{String(index + 1).padStart(2, '0')}</span>
        <div className="absolute top-1/2 left-full w-16 h-[2px] -translate-y-1/2 opacity-70 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.8), transparent)' }} />
      </div>
      <div className="p-6 pt-8 min-h-[120px] flex gap-4 items-start relative z-10">
        <div className="shrink-0 w-10 h-10 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent group-hover:scale-105 transition-all"><Icon size={20} /></div>
        <p className="text-[15px] font-body font-medium text-slate-700 leading-[1.8] group-hover:text-slate-900 transition-colors pt-1 pr-2">{text}</p>
      </div>
    </motion.div>
  );
}

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

export default function FacilitiesWelfare() {
  const [config, setConfig] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const phrases = [
    { main: 'STUDENT', highlight: 'WELFARE' },
    { main: 'SCHOLARSHIPS', highlight: 'AND SUPPORT' },
    { main: 'SAFE', highlight: 'CAMPUS LIFE' },
    { main: 'HOLISTIC', highlight: 'DEVELOPMENT' },
  ];
  useEffect(() => { const t = setInterval(() => setCurrentIdx(p => (p + 1) % phrases.length), 4000); return () => clearInterval(t); }, [phrases.length]);
  useEffect(() => { fetch('/config/facilities-welfare-measures.json').then(r => r.json()).then(setConfig).catch(console.error); }, []);
  if (!config) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">Loading...</span>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-white">
      <PageHero showParticles={false} maxHeight="33vh" titleStroke="WELFARE" titleFill="MEASURES"
        useYellowAccents={true} statutoryLabel={<span className="text-[#fbbf24]">FACILITIES</span>}
        policyLabel="" rightLabel={<span className="text-[#fbbf24]">Students.First.Always</span>}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Comprehensive', 'support', 'for', 'every'].map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }} className="text-white/70 text-[15px] font-body font-medium">{w}</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.72 }} className="relative inline-block">
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ textShadow: '0 0 25px rgba(0,139,139,0.5)' }}>NSEC student</span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 1.1 }} className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block" />
              </motion.span>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="h-8 relative w-full mt-2">
              <AnimatePresence mode="wait">
                <motion.div key={currentIdx} initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }} transition={{ duration: 0.8 }} className="absolute inset-0 flex items-center flex-wrap gap-2">
                  <span className="font-heading font-black italic uppercase tracking-tighter text-white" style={{ fontSize: 'clamp(0.9rem,1.8vw,1.5rem)' }}>{phrases[currentIdx].main}</span>
                  <span className="font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ fontSize: 'clamp(0.9rem,1.8vw,1.5rem)' }}>{phrases[currentIdx].highlight}</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        }
      />
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5) 30%, rgba(251,191,36,0.5) 70%, transparent)' }} />

      {/* OVERVIEW */}
      <section className="relative pt-16 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <SectionHeading title="Overview" tagline={config.tagline} />
        <div className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto pt-4">
          {(config.overview || []).map((item, i) => <ItemCard key={i} index={i} text={item} />)}
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* SCHOLARSHIPS */}
      <section className="relative pt-8 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Scholarships" tagline="Financial assistance for every eligible student." />
        <div className="mb-10" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {(config.scholarships || []).map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.9), rgba(0,139,139,0.4), transparent)' }} />
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-[#fbbf24]/10 flex items-center justify-center text-amber-600 shrink-0 group-hover:bg-[#fbbf24] group-hover:text-slate-900 transition-all"><Award size={20} /></div>
                <span className="text-[9px] font-mono font-black uppercase tracking-widest px-2 py-1 rounded-full bg-brand-accent/10 text-brand-accent">Scholarship</span>
              </div>
              <h3 className="text-[15px] font-heading font-black italic uppercase tracking-tight text-slate-800 mb-2">{s.name}</h3>
              <p className="text-[13px] font-body text-slate-600 leading-relaxed mb-3">{s.description}</p>
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <CheckCircle2 size={13} className="text-brand-accent shrink-0" />
                <span className="text-[11px] font-mono font-bold text-slate-500">{s.eligibility}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* SUPPORT + COMMITTEES */}
      <section className="relative pt-8 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Support Measures</h2>
            <div className="flex flex-col gap-3">
              {(config.support_measures || []).map((s, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl hover:bg-brand-accent/5 hover:border-brand-accent/20 transition-all">
                  <div className="w-2 h-2 rounded-full bg-[#fbbf24] shrink-0" />
                  <span className="text-[14px] font-body font-medium text-slate-700">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Committees</h2>
            <div className="flex flex-col gap-3">
              {(config.committees || []).map((c, i) => (
                <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl hover:border-brand-accent/30 hover:shadow-md transition-all">
                  <p className="text-[14px] font-heading font-black italic uppercase tracking-tight text-slate-800">{c.name}</p>
                  <p className="text-[12px] font-body text-slate-500 mt-1">{c.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* DOCUMENTS + CONTACT */}
      <section className="relative pt-8 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Documents</h2>
            <div className="flex flex-col gap-4">
              {(config.documents || []).map((doc, i) => (
                <button key={i} onClick={() => setSelectedPdf('/' + doc.url)}
                  className="w-full text-left group flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:bg-brand-maroon/5 hover:border-brand-maroon/30 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-maroon/10 flex items-center justify-center text-brand-maroon shrink-0"><Download size={18} /></div>
                    <span className="text-[15px] font-heading font-black italic uppercase tracking-tight text-slate-700 group-hover:text-brand-maroon">{doc.title}</span>
                  </div>
                  <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-maroon/60">PDF</span>
                </button>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Contact</h2>
            <div className="p-8 bg-brand-blue rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-4">
              <div>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Office</p>
                <p className="text-xl font-heading font-black italic uppercase text-white">{config.contact.name}</p>
              </div>
              <div className="h-[1px] bg-white/10" />
              <a href={'tel:' + config.contact.phone} className="flex items-center gap-3 text-white/70 hover:text-brand-accent transition-colors"><Phone size={14} className="shrink-0" /><span className="font-mono text-sm">{config.contact.phone}</span></a>
              <a href={'mailto:' + config.contact.email} className="flex items-center gap-3 text-white/70 hover:text-brand-accent transition-colors"><Mail size={14} className="shrink-0" /><span className="font-mono text-sm">{config.contact.email}</span></a>
              <div className="h-[1px] bg-white/10" />
              <p className="text-[13px] font-body text-white/50">{config.contact.address}</p>
            </div>
          </div>
        </div>
      </section>

      <PdfModal url={selectedPdf} onClose={() => setSelectedPdf(null)} />
    </div>
  );
}
