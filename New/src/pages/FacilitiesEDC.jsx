import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Rocket, Award, Calendar, CheckCircle2, Target, Users, Briefcase } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import MinCard from '../components/minCard';

const ITEM_ICONS = [Lightbulb, Rocket, Award, Target, Users, Briefcase, CheckCircle2, Calendar];

function ItemCard({ index, text }) {
  const Icon = ITEM_ICONS[index % ITEM_ICONS.length];
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[20px] bg-gradient-to-br from-brand-accent/[0.02] via-white to-white border border-brand-accent/10 border-l-[3px] border-l-[#fbbf24] shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:-translate-y-[6px] hover:shadow-[0_12px_32px_rgba(0,139,139,0.1)] hover:border-brand-accent/30 transition-all duration-[250ms] ease-out mt-3 ml-3">
      <div className="absolute -top-3 -left-4 w-11 h-11 rounded-full bg-[#fbbf24] flex items-center justify-center z-10 border-2 border-white shadow-sm group-hover:scale-[1.05] transition-all">
        <span className="text-[12px] font-mono font-black text-slate-900">{String(index + 1).padStart(2, '0')}</span>
        <div className="absolute top-1/2 left-full w-16 h-[2px] -translate-y-1/2 opacity-70 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.8), transparent)' }} />
      </div>
      <div className="p-6 pt-8 min-h-[120px] flex gap-4 items-start relative z-10">
        <div className="shrink-0 w-10 h-10 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent group-hover:scale-105 transition-all">
          <Icon size={20} />
        </div>
        <p className="text-[15px] font-body font-medium text-slate-700 leading-[1.8] group-hover:text-slate-900 transition-colors pt-1 pr-2">{text}</p>
      </div>
    </motion.div>
  );
}

function ActivityRow({ activity, index }) {
  const isOnline = activity.mode === 'Online';
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="flex items-start gap-4 p-4 bg-white border border-slate-100 rounded-xl hover:bg-brand-accent/5 hover:border-brand-accent/20 transition-all group">
      <div className="shrink-0 text-right min-w-[110px]">
        <span className="text-[11px] font-mono font-bold text-slate-500">{activity.date}</span>
      </div>
      <div className="w-[2px] self-stretch bg-slate-200 group-hover:bg-brand-accent/40 transition-colors shrink-0" />
      <div className="flex-1 flex items-start justify-between gap-3">
        <p className="text-[14px] font-body font-medium text-slate-700">{activity.title}</p>
        <span className={`shrink-0 text-[9px] font-mono font-black uppercase tracking-widest px-2 py-1 rounded-full ${isOnline ? 'bg-brand-accent/10 text-brand-accent' : 'bg-[#fbbf24]/20 text-amber-700'}`}>{activity.mode}</span>
      </div>
    </motion.div>
  );
}

export default function FacilitiesEDC() {
  const [config, setConfig] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const carouselPhrases = [
    { main: 'ENTREPRENEURSHIP', highlight: 'DEVELOPMENT CELL' },
    { main: 'IDEA TO', highlight: 'STARTUP' },
    { main: 'INNOVATION', highlight: 'ECOSYSTEM' },
    { main: 'FUNDED BY', highlight: 'AICTE & CII' },
  ];
  useEffect(() => {
    const t = setInterval(() => setCurrentIdx(p => (p + 1) % carouselPhrases.length), 4000);
    return () => clearInterval(t);
  }, [carouselPhrases.length]);
  useEffect(() => {
    fetch('/config/facilities-entrepreneurship-development-cell.json').then(r => r.json()).then(setConfig).catch(console.error);
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
      <PageHero showParticles={false} maxHeight="33vh" titleStroke="EDC" titleFill="NSEC"
        useYellowAccents={true} statutoryLabel={<span className="text-[#fbbf24]">ESTD. 2009</span>}
        policyLabel="" rightLabel={<span className="text-[#fbbf24]">Ideas.Ventures.Impact</span>}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Nurturing', 'entrepreneurial', 'talent', 'and', 'building'].map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
                  className="text-white/70 text-[15px] font-body font-medium">{w}</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.82 }} className="relative inline-block">
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent"
                  style={{ textShadow: '0 0 25px rgba(0,139,139,0.5)' }}>startup ecosystems</span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 1.1 }}
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block" />
              </motion.span>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
              className="h-8 relative w-full mt-2">
              <div className="absolute inset-0 flex items-center flex-wrap gap-2">
                <span className="font-heading font-black italic uppercase tracking-tighter text-white" style={{ fontSize: 'clamp(0.9rem,1.8vw,1.5rem)' }}>{carouselPhrases[currentIdx].main}</span>
                <span className="font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ fontSize: 'clamp(0.9rem,1.8vw,1.5rem)' }}>{carouselPhrases[currentIdx].highlight}</span>
              </div>
            </motion.div>
          </div>
        }
      />
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5) 30%, rgba(251,191,36,0.5) 70%, transparent)' }} />

      {/* ABOUT */}
      <section className="relative pt-16 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <SectionHeading title="About EDC" tagline="Fostering an entrepreneurial culture at NSEC since 2009." />
        <div className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto pt-4">
          {(config.about || []).map((item, i) => <ItemCard key={i} index={i} text={item} />)}
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* INITIATIVES */}
      <section className="relative pt-8 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Initiatives" tagline="Key programs and collaborative efforts." />
        <div className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto pt-4">
          {(config.initiatives || []).map((item, i) => <ItemCard key={i} index={i} text={item} />)}
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* ACTIVITIES */}
      <section className="relative pt-8 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Activities" tagline="A track record of innovation events and achievements." />
        <div className="mb-10" />
        <div className="max-w-5xl mx-auto flex flex-col gap-3">
          {(config.activities || []).map((act, i) => <ActivityRow key={i} activity={act} index={i} />)}
        </div>
        {config.legacy_activities && config.legacy_activities.length > 0 && (
          <>
            <div className="h-[1px] max-w-5xl mx-auto my-10" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.3) 50%, transparent)' }} />
            <div className="max-w-5xl mx-auto">
              <h3 className="text-xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Legacy Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(config.legacy_activities || []).map((act, i) => (
                  <MinCard
                    key={i}
                    title={act.title}
                    description={act.date}
                    icon={Award}
                    badge="Legacy"
                    variant={i % 2 === 0 ? 'accent' : 'slate'}
                    index={i}
                    compact
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
