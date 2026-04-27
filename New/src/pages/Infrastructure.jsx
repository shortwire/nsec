import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Monitor,
  Network,
  Wifi,
  BookOpen,
  Library,
  ShieldCheck,
  Bus,
  Trophy,
  Camera,
  ChevronRight,
  Cpu,
  Database,
  HardDrive,
  Users
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import MinCard from '../components/minCard';

const BOLD_KEYWORDS = [
  'state-of-the-art',
  'quality education',
  'global professional challenges',
  'research',
  'industrial consultancy',
  'ICT',
  '1 Gbps LAN',
  'Wi-Fi',
  'Digital + Central + Departmental',
  'ILMS',
  'IEEE',
  'NPTEL',
  'CCTV surveillance'
];

function HighlightText({ text }) {
  if (!text) return null;
  const regex = new RegExp(`(${BOLD_KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    BOLD_KEYWORDS.some((k) => k.toLowerCase() === part.toLowerCase())
      ? <strong key={i} className="font-bold text-slate-800">{part}</strong>
      : <span key={i}>{part}</span>
  );
}

const CARD_ICONS = [Building2, BookOpen, ShieldCheck, Monitor, Library, Network, Wifi, Cpu, Database, HardDrive, Users];

function InfrastructureCard({ index, text }) {
  const Icon = CARD_ICONS[index % CARD_ICONS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[20px] bg-gradient-to-br from-brand-accent/[0.02] via-white to-white border border-brand-accent/10 border-l-[3px] border-l-[#fbbf24] shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:-translate-y-[6px] hover:shadow-[0_12px_32px_rgba(0,139,139,0.1)] hover:border-brand-accent/30 transition-all duration-[250ms] ease-out mt-3 ml-3"
    >
      <div className="absolute -top-3 -left-4 w-11 h-11 rounded-full bg-[#fbbf24] flex items-center justify-center shadow-[0_2px_4px_rgba(251,191,36,0.2)] group-hover:scale-[1.05] group-hover:shadow-[0_4px_8px_rgba(251,191,36,0.3)] transition-all duration-[250ms] ease-out z-10 border-2 border-white">
        <span className="text-[12px] font-mono font-black text-slate-900">{String(index + 1).padStart(2, '0')}</span>
        <div
          className="absolute top-1/2 left-full w-16 h-[2px] -translate-y-1/2 opacity-70 group-hover:opacity-100 group-hover:w-24 transition-all duration-[250ms] ease-out pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.8), rgba(251,191,36,0.1), transparent)' }}
        />
      </div>

      <div className="p-6 pt-8 min-h-[140px] flex gap-4 items-start relative z-10">
        <div className="shrink-0 w-10 h-10 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-[0_2px_8px_rgba(0,139,139,0.1)] group-hover:scale-105 transition-all duration-300">
          <Icon size={20} />
        </div>
        <p className="text-[16px] font-body font-medium text-slate-700 leading-[1.8] group-hover:text-slate-900 transition-colors duration-[250ms] ease-out pt-1 pr-2">
          <HighlightText text={text} />
        </p>
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
    >
      <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
      <h4 className="text-3xl font-heading font-black italic uppercase tracking-tight text-slate-900">{value}</h4>
    </motion.div>
  );
}

export default function FacilitiesInfrastructure() {
  const [config, setConfig] = useState(null);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);

  const carouselPhrases = [
    { main: 'COMMON', highlight: 'INFRASTRUCTURE' },
    { main: 'SMART', highlight: 'LEARNING SPACES' },
    { main: 'DIGITAL', highlight: 'LIBRARY SYSTEMS' },
    { main: 'CONNECTED', highlight: 'CAMPUS NETWORK' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselPhrases.length]);

  useEffect(() => {
    fetch('/config/page-facilities-infrastructure.json')
      .then((r) => r.json())
      .then(setConfig)
      .catch((err) => console.error('Failed to load facilities infrastructure config:', err));
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">Loading...</span>
        </div>
      </div>
    );
  }

  const libraryStats = [
    { label: 'Books', value: config.library.stats.books.toLocaleString() },
    { label: 'Print Journals', value: config.library.stats.print_journals },
    { label: 'E-Books & E-Journals', value: config.library.stats.ebooks_and_ejournals.toLocaleString() },
    { label: 'CD/DVD', value: config.library.stats.cd_dvd.toLocaleString() },
    { label: 'Reading Room Capacity', value: config.library.stats.reading_room_capacity }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="COMMON"
        titleFill="INFRASTRUCTURE"
        statutoryLabel={config.section.trim()}
        policyLabel=""
        rightLabel="Campus.Capability.Grid"
        useYellowAccents={true}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Designed', 'for', 'quality', 'education', 'and', 'innovation'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/70 text-[15px] font-body font-medium"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="h-8 relative w-full mt-2"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSentenceIdx}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="absolute inset-0 flex items-center flex-wrap gap-2"
                >
                  <span className="font-heading font-black italic uppercase tracking-tighter text-white" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}>
                    {carouselPhrases[currentSentenceIdx].main}
                  </span>
                  <span className="font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}>
                    {carouselPhrases[currentSentenceIdx].highlight}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        }
      />

      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title={config.title} tagline="Core institutional facilities and campus readiness." />
        <div className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto relative pt-4">
          {(config.overview || []).map((item, i) => (
            <InfrastructureCard key={`overview-${i}`} index={i} text={item} />
          ))}
        </div>
      </section>

      <section className="relative pt-12 pb-8 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Academic Facilities" tagline="Teaching-learning spaces and institutional support systems." />
        <div className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto relative pt-4">
          {(config.academic_facilities || []).map((item, i) => (
            <InfrastructureCard key={`academic-${i}`} index={i} text={item} />
          ))}
        </div>
      </section>

      <section className="relative pt-12 pb-8 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="IT Infrastructure" tagline="Digital backbone for connected learning and operations." />
        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <MinCard
            title="Computers"
            description={config.it_infrastructure.computers}
            icon={Monitor}
            variant="accent"
            index={0}
            center
          />
          {(config.it_infrastructure.network || []).map((item, i) => (
            <MinCard
              key={`network-${i}`}
              title="Network Node"
              description={item}
              icon={Network}
              badge="IT Infrastructure"
              variant="slate"
              index={i + 1}
              center
            />
          ))}
        </div>
      </section>

      <section className="relative pt-12 pb-8 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Library" tagline={config.library.type} />
        <div className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto relative pt-4">
          {(config.library.features || []).map((item, i) => (
            <InfrastructureCard key={`library-feature-${i}`} index={i} text={item} />
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {libraryStats.map((stat, i) => (
            <StatCard key={stat.label} index={i} label={stat.label} value={stat.value} />
          ))}
        </div>
      </section>

      <section className="relative pt-12 pb-20 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Campus Facilities" tagline="Daily-life support systems across the institution." />
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {(config.campus_facilities || []).map((item, i) => {
            const Icon = i === 0 ? Bus : i === 1 ? Trophy : Camera;
            return (
              <MinCard
                key={`campus-${i}`}
                title={item}
                description="Campus support facility"
                icon={Icon}
                badge="Enabled"
                variant="accent"
                index={i}
                center
                actionLabel="Open Details"
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}