import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, ExternalLink, Wifi, Server, BookOpen, GraduationCap } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

const RES_ICONS = [Server, BookOpen, Globe, Wifi, GraduationCap, ExternalLink, Globe, BookOpen];

function ResourceCard({ res, index }) {
  const Icon = RES_ICONS[index % RES_ICONS.length];
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.8), rgba(0,139,139,0.5), transparent)' }} />
      <div className="p-6 flex-1 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
            <Icon size={22} />
          </div>
          <span className="text-[9px] font-mono font-black uppercase tracking-widest px-2 py-1 rounded-full bg-slate-100 text-slate-500">e-Resource</span>
        </div>
        <h3 className="text-[15px] font-heading font-black italic uppercase tracking-tight text-slate-800 leading-snug">{res.title}</h3>
        <p className="text-[13px] font-body text-slate-600 leading-relaxed flex-1">{res.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {(res.links || []).map((link, li) => (
            <a key={li} href={link.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-xl text-[11px] font-mono font-black uppercase tracking-widest hover:bg-brand-accent transition-colors duration-200">
              <ExternalLink size={11} /> {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FacilitiesEResources() {
  const [config, setConfig] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const carouselPhrases = [
    { main: 'ONLINE', highlight: 'E-RESOURCES' },
    { main: 'IEEE', highlight: 'XPLORE' },
    { main: 'NPTEL', highlight: 'VIDEO LIBRARY' },
    { main: 'DIGITAL', highlight: 'LEARNING HUB' },
  ];
  useEffect(() => {
    const t = setInterval(() => setCurrentIdx(p => (p + 1) % carouselPhrases.length), 4000);
    return () => clearInterval(t);
  }, [carouselPhrases.length]);
  useEffect(() => {
    fetch('/config/facilities-e-resources.json').then(r => r.json()).then(setConfig).catch(console.error);
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
      <PageHero showParticles={false} maxHeight="33vh" titleStroke="ONLINE" titleFill="E-RESOURCES"
        useYellowAccents={true} statutoryLabel={<span className="text-[#fbbf24]">FACILITIES</span>}
        policyLabel="" rightLabel={<span className="text-[#fbbf24]">Digital.Learning.Hub</span>}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Access', 'world-class', 'digital', 'resources', 'for'].map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
                  className="text-white/70 text-[15px] font-body font-medium">{w}</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.79 }} className="relative inline-block">
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent"
                  style={{ textShadow: '0 0 25px rgba(0,139,139,0.5)' }}>research & learning</span>
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
      <section className="relative pt-16 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <SectionHeading title="e-Resources" tagline="Online databases, digital libraries and learning platforms." />
        <div className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {(config.resources || []).map((res, i) => <ResourceCard key={i} res={res} index={i} />)}
        </div>
      </section>
    </div>
  );
}
