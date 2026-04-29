import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, Phone, Mail, MapPin, ExternalLink, X, CheckCircle2, GraduationCap, Info } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import AccentDetailCard from '../components/AccentDetailCard';
import SectionItemCard from '../components/SectionItemCard';

const PROG_ICONS = [GraduationCap, BookOpen, Award, CheckCircle2, Info, ExternalLink];

export default function AdmissionInfo() {
  const [config, setConfig] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const phrases = [
    { main: 'GENERAL', highlight: 'INFORMATION' },
    { main: 'ESTD.', highlight: '1998' },
    { main: 'NAAC', highlight: 'ACCREDITED' },
    { main: 'NBA', highlight: 'ACCREDITED' },
  ];
  useEffect(() => { const t = setInterval(() => setCurrentIdx(p => (p + 1) % phrases.length), 4000); return () => clearInterval(t); }, [phrases.length]);
  useEffect(() => { fetch('/config/admission-general-information.json').then(r => r.json()).then(setConfig).catch(console.error); }, []);
  if (!config) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
  return (
    <div className="min-h-screen bg-white">
      <PageHero showParticles={false} maxHeight="33vh" titleStroke="GENERAL" titleFill="INFORMATION"
        useYellowAccents={true} statutoryLabel={<span className="text-[#fbbf24]">ADMISSION 2025-26</span>}
        policyLabel="" rightLabel={<span className="text-[#fbbf24]">NSEC.Estd.1998</span>}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['27+', 'years', 'of', 'engineering', 'excellence', 'at'].map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }} className="text-white/70 text-[15px] font-body font-medium">{w}</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.88 }} className="relative inline-block">
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ textShadow: '0 0 25px rgba(0,139,139,0.5)' }}>NSEC, Kolkata</span>
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

      {/* BASIC INFO + ACCREDITATION */}
      <section className="relative pt-16 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          {/* Basic Info */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-8">Institute</h2>
            <div className="space-y-4">
              {[
                { label: 'Name', value: config.basic_info.name },
                { label: 'Established', value: config.basic_info.established },
                { label: 'Affiliation', value: config.basic_info.affiliation },
                { label: 'NAAC Status', value: `${config.accreditation.naac.status} (Valid till ${config.accreditation.naac.valid_till})` },
                { label: 'NIRF Rank', value: `${config.ranking.nirf.band} (${config.ranking.nirf.year}, ${config.ranking.nirf.category})` },
              ].map((row, i) => (
                <AccentDetailCard
                  key={i}
                  index={i}
                  label={row.label}
                  value={row.value}
                  tone="accent"
                  size="md"
                  layout="pair"
                  showMarker={false}
                />
              ))}
            </div>
          </div>
          {/* NBA */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-8">NBA Accreditation</h2>
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm mb-6">
              <p className="text-[11px] font-mono font-black text-brand-accent uppercase tracking-widest mb-4">Validity: {config.accreditation.nba.validity}</p>
              <div className="grid grid-cols-1 gap-3">
                {config.accreditation.nba.programs.map((prog, i) => (
                  <SectionItemCard key={i} index={i} title={prog} tone="accent" size="sm" icon={CheckCircle2} />
                ))}
              </div>
            </div>
            <div className="p-6 bg-brand-blue rounded-2xl border border-white/10 shadow-xl">
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3">Contact</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-white/70"><MapPin size={14} className="shrink-0 mt-0.5" /><span className="text-sm font-body">{config.contact.address}</span></div>
                {config.contact.phone.map((ph, i) => <a key={i} href={'tel:' + ph} className="flex items-center gap-3 text-white/70 hover:text-brand-accent transition-colors"><Phone size={13} className="shrink-0" /><span className="font-mono text-sm">{ph}</span></a>)}
                <a href={'mailto:' + config.contact.email} className="flex items-center gap-3 text-white/70 hover:text-brand-accent transition-colors"><Mail size={13} className="shrink-0" /><span className="font-mono text-sm">{config.contact.email}</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* ALL PROGRAMS */}
      <section className="relative pt-8 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Programs Offered" tagline="Undergraduate, Postgraduate and Diploma programmes." />
        <div className="mb-10" />
        <div className="max-w-7xl mx-auto space-y-10">
          {[
            { label: 'B.Tech', items: config.programs.btech },
            { label: 'M.Tech', items: config.programs.mtech },
            { label: 'Masters', items: config.programs.masters },
            { label: 'Bachelor', items: config.programs.bachelor },
            { label: 'Diploma', items: config.programs.diploma },
          ].map((group, gi) => (
            <div key={gi}>
              <h3 className="text-lg font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-4 flex items-center gap-3">
                <span className="text-[10px] font-mono font-black px-3 py-1 bg-brand-maroon text-white rounded-full">{group.label}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {group.items.map((name, i) => (
                  <SectionItemCard key={i} index={i} title={name} tone="accent" size="sm" icon={PROG_ICONS[i % PROG_ICONS.length]} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
