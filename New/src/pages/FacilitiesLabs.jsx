import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Monitor, Zap, Settings, Building2, FlaskConical,
  Radio, Star, ShieldCheck, ChevronRight, Wifi, HardDrive,
  CheckCircle2, Award, Beaker, Layers
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

/* ── ICON MAP ── */
const ICON_MAP = { Cpu, Monitor, Zap, Settings, Building2, FlaskConical, Radio };
const FACILITY_ICONS = [Wifi, HardDrive, ShieldCheck, Cpu, Monitor, Settings, CheckCircle2, Award];

/* ── STAT CARD ── */
function StatCard({ label, value, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex flex-col items-center justify-center p-8 bg-brand-blue rounded-2xl border border-white/10 shadow-xl"
    >
      <p className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.3em] mb-2">{label}</p>
      <h4 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-white">{value}</h4>
    </motion.div>
  );
}

/* ── OVERVIEW CARD (mirrors ConstitutesCard from AntiRagging) ── */
function OverviewCard({ index, text }) {
  const Icon = FACILITY_ICONS[index % FACILITY_ICONS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[20px] bg-gradient-to-br from-brand-accent/[0.02] via-white to-white border border-brand-accent/10 border-l-[3px] border-l-[#fbbf24] shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:-translate-y-[6px] hover:shadow-[0_12px_32px_rgba(0,139,139,0.1)] hover:border-brand-accent/30 transition-all duration-[250ms] ease-out mt-3 ml-3"
    >
      <div className="absolute -top-3 -left-4 w-11 h-11 rounded-full bg-[#fbbf24] flex items-center justify-center shadow-[0_2px_4px_rgba(251,191,36,0.2)] group-hover:scale-[1.05] transition-all duration-[250ms] z-10 border-2 border-white">
        <span className="text-[12px] font-mono font-black text-slate-900">{String(index + 1).padStart(2, '0')}</span>
        <div className="absolute top-1/2 left-full w-16 h-[2px] -translate-y-1/2 opacity-70 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.8), transparent)' }} />
      </div>
      <div className="p-6 pt-8 min-h-[120px] flex gap-4 items-start relative z-10">
        <div className="shrink-0 w-10 h-10 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent group-hover:scale-105 transition-all duration-300">
          <Icon size={20} />
        </div>
        <p className="text-[15px] font-body font-medium text-slate-700 leading-[1.8] group-hover:text-slate-900 transition-colors pt-1 pr-2">{text}</p>
      </div>
    </motion.div>
  );
}

/* ── DEPARTMENT CARD ── */
function DeptCard({ dept, index }) {
  const [open, setOpen] = useState(false);
  const Icon = ICON_MAP[dept.icon] || Cpu;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-accent/30 transition-all duration-300 overflow-hidden"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
            <Icon size={22} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-maroon mb-0.5">{dept.id.toUpperCase()}</p>
            <h3 className="text-[15px] font-heading font-black italic uppercase tracking-tight text-slate-800">{dept.name}</h3>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline text-[10px] font-mono font-black uppercase tracking-widest text-slate-400">{dept.labs.length} Labs</span>
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronRight size={18} className="text-brand-accent" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-slate-100">
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dept.labs.map((lab, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-brand-accent/5 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] shrink-0" />
                    <span className="text-[13px] font-body font-medium text-slate-700">{lab}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── SPECIAL LAB CARD ── */
function SpecialLabCard({ lab, index }) {
  const tagColor = lab.tag === 'AICTE Funded' ? 'bg-[#fbbf24] text-slate-900' : 'bg-brand-maroon text-white';
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/[0.04] rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.8), rgba(0,139,139,0.4), transparent)' }} />
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 shrink-0">
          <Star size={22} />
        </div>
        <span className={`text-[9px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full ${tagColor}`}>{lab.tag}</span>
      </div>
      <h3 className="text-[17px] font-heading font-black italic uppercase tracking-tight text-slate-800 mb-3">{lab.name}</h3>
      <p className="text-[14px] font-body text-slate-600 leading-relaxed">{lab.description}</p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function FacilitiesLabs() {
  const [config, setConfig] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const carouselPhrases = [
    { main: 'HANDS-ON', highlight: 'LEARNING LABS' },
    { main: 'RESEARCH', highlight: 'INFRASTRUCTURE' },
    { main: 'AICTE IDEA', highlight: 'LAB HUB' },
    { main: '60+ LABS', highlight: 'ACROSS CAMPUS' },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentIdx(p => (p + 1) % carouselPhrases.length), 4000);
    return () => clearInterval(t);
  }, [carouselPhrases.length]);

  useEffect(() => {
    fetch('/config/facilities-labs.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(e => console.error('Labs config error:', e));
  }, []);

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

      {/* ── HERO ── */}
      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="LABS &"
        titleFill="RESEARCH"
        useYellowAccents={true}
        statutoryLabel={<span className="text-[#fbbf24]">FACILITIES</span>}
        policyLabel=""
        rightLabel={<span className="text-[#fbbf24]">Innovation.Infrastructure</span>}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['State-of-the-art', 'labs', 'powering', 'innovation', 'and'].map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
                  className="text-white/70 text-[15px] font-body font-medium">{w}</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.82 }} className="relative inline-block">
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent"
                  style={{ textShadow: '0 0 25px rgba(0,139,139,0.5)' }}>research excellence</span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block" />
              </motion.span>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
              className="h-8 relative w-full mt-2">
              <AnimatePresence mode="wait">
                <motion.div key={currentIdx}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 flex items-center flex-wrap gap-2">
                  <span className="font-heading font-black italic uppercase tracking-tighter text-white" style={{ fontSize: 'clamp(0.9rem,1.8vw,1.5rem)' }}>{carouselPhrases[currentIdx].main}</span>
                  <span className="font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ fontSize: 'clamp(0.9rem,1.8vw,1.5rem)' }}>{carouselPhrases[currentIdx].highlight}</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        }
      />

      {/* Gold separator */}
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5) 30%, rgba(251,191,36,0.5) 70%, transparent)' }} />

      {/* ── STATS ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(config.stats || []).map((s, i) => <StatCard key={i} index={i} label={s.label} value={s.value} />)}
        </div>
      </section>

      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* ── OVERVIEW ── */}
      <section className="relative pt-16 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <SectionHeading title="Overview" tagline="The laboratory ecosystem at NSEC." />
        <div className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto pt-4">
          {(config.overview || []).map((item, i) => <OverviewCard key={i} index={i} text={item} />)}
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* ── SPECIAL LABS ── */}
      <section className="relative pt-8 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Signature Labs" tagline="Landmark facilities shaping the future of learning." />
        <div className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {(config.special_labs || []).map((lab, i) => <SpecialLabCard key={i} index={i} lab={lab} />)}
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* ── DEPARTMENT LABS ── */}
      <section className="relative pt-8 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Department Labs" tagline="Explore labs across all engineering disciplines." />
        <div className="mb-12" />
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          {(config.departments || []).map((dept, i) => <DeptCard key={dept.id} dept={dept} index={i} />)}
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* ── COMMON FACILITIES ── */}
      <section className="relative pt-8 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Lab Facilities" tagline="Shared infrastructure across all laboratory spaces." />
        <div className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto pt-4">
          {(config.facilities || []).map((item, i) => <OverviewCard key={i} index={i} text={item} />)}
        </div>
      </section>

    </div>
  );
}
