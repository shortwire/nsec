import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, BookOpen, FileText, CheckCircle2, Info, ChevronDown } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

function AccordionSection({ title, children, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left group hover:bg-brand-accent/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
            <ShieldCheck size={20} />
          </div>
          <h3 className="text-lg font-heading font-black italic uppercase tracking-tight text-slate-800">{title}</h3>
        </div>
        <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8 pt-0 border-t border-slate-100 bg-slate-50/30">
              <div className="mt-6 space-y-8">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ListSection({ title, items, icon: Icon, color = "brand-accent" }) {
  return (
    <div>
      <h4 className={`text-xs font-mono font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2 text-${color}`}>
        <div className={`w-1.5 h-1.5 rounded-full bg-${color}`} />
        {title}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
            <div className={`mt-1 shrink-0 text-${color}`}>
              <CheckCircle2 size={14} />
            </div>
            <span className="text-[13px] font-body text-slate-600 leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdmissionEligibility() {
  const [config, setConfig] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [openSection, setOpenSection] = useState('btech');
  const phrases = [
    { main: 'ELIGIBILITY', highlight: 'CRITERIA' },
    { main: 'ADMISSION', highlight: 'PROCEDURE' },
    { main: 'ENTRANCE', highlight: 'EXAMS' },
    { main: 'SELECTIVE', highlight: 'PROCESS' },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentIdx(p => (p + 1) % phrases.length), 4000);
    return () => clearInterval(t);
  }, [phrases.length]);

  useEffect(() => {
    fetch('/config/admission-eligibility.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(console.error);
  }, []);

  if (!config) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <PageHero showParticles={false} maxHeight="33vh" titleStroke="ELIGIBILITY" titleFill="CRITERIA"
        useYellowAccents={true} statutoryLabel={<span className="text-[#fbbf24]">ADMISSION 2025-26</span>}
        policyLabel="" rightLabel={<span className="text-[#fbbf24]">Entry Requirements</span>}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Understand', 'the', 'prerequisites', 'for', 'securing', 'your'].map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }} className="text-white/70 text-[15px] font-body font-medium">{w}</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.88 }} className="relative inline-block">
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ textShadow: '0 0 25px rgba(0,139,139,0.5)' }}>future at NSEC</span>
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

      <section className="relative pt-16 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Admission Guide" tagline="Detailed criteria for all academic programmes." />
          <div className="mt-12">
            {Object.entries(config.programs).map(([key, data], i) => (
              <AccordionSection
                key={key}
                title={key === 'btech' ? 'B.Tech / B.E' : key === 'mtech' ? 'M.Tech' : key.toUpperCase()}
                isOpen={openSection === key}
                onToggle={() => setOpenSection(openSection === key ? null : key)}
                index={i}
              >
                {data.eligibility && (
                  <ListSection title="Eligibility Criteria" items={data.eligibility} color="brand-accent" />
                )}
                
                {data.entrance_exams && (
                  <ListSection title="Entrance Exams" items={data.entrance_exams} color="brand-blue" />
                )}

                {data.admission_procedure && (
                  <ListSection title="Admission Procedure" items={data.admission_procedure} color="brand-maroon" />
                )}

                {data.selection_process && (
                  <ListSection title="Selection Process" items={data.selection_process} color="amber-500" />
                )}

                {data.documents_required && (
                  <ListSection title="Documents Required" items={data.documents_required} color="brand-accent" />
                )}

                {data.direct_admission && (
                   <ListSection title="Direct Admission" items={data.direct_admission} color="brand-blue" />
                )}
              </AccordionSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
