import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, ChevronRight, Phone, Mail, Clock, AlertCircle, CheckCircle2, Users, BookOpen } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import MinCard from '../components/minCard';
import AccentDetailCard from '../components/AccentDetailCard';

const ICONS = [AlertCircle, BookOpen, Shield, Users, Globe, CheckCircle2, Phone, Mail];
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

export default function FacilitiesGrievance() {
  const [config, setConfig] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const phrases = [
    { main: 'GRIEVANCE', highlight: 'REDRESSAL' },
    { main: 'FAIR', highlight: 'AND TRANSPARENT' },
    { main: 'YOUR VOICE', highlight: 'MATTERS' },
    { main: 'PROMPT', highlight: 'RESOLUTION' },
  ];
  useEffect(() => { const t = setInterval(() => setCurrentIdx(p => (p + 1) % phrases.length), 4000); return () => clearInterval(t); }, [phrases.length]);
  useEffect(() => { fetch('/config/facilities-grievance.json').then(r => r.json()).then(setConfig).catch(console.error); }, []);
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
      <PageHero showParticles={false} maxHeight="33vh" titleStroke="GRIEVANCE" titleFill="REDRESSAL"
        useYellowAccents={true} statutoryLabel={<span className="text-[#fbbf24]">FACILITIES</span>}
        policyLabel="" rightLabel={<span className="text-[#fbbf24]">Fair.Transparent.Prompt</span>}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['A', 'fair', 'and', 'transparent', 'system', 'for'].map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }} className="text-white/70 text-[15px] font-body font-medium">{w}</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.82 }} className="relative inline-block">
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ textShadow: '0 0 25px rgba(0,139,139,0.5)' }}>student concerns</span>
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

      {/* PROCESS STEPS */}
      <section className="relative pt-8 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Process" tagline="How to file and track your grievance." />
        <div className="mb-12" />
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {(config.process || []).map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex gap-6 items-start p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-brand-accent/30 transition-all duration-300">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-brand-blue flex items-center justify-center border border-white/10 group-hover:scale-105 transition-all">
                <span className="text-xl font-heading font-black italic text-[#fbbf24]">{step.step}</span>
              </div>
              <div>
                <h3 className="text-[16px] font-heading font-black italic uppercase tracking-tight text-brand-maroon mb-2">{step.title}</h3>
                <p className="text-[14px] font-body text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* CATEGORIES + COMMITTEE */}
      <section className="relative pt-8 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Grievance Types</h2>
            <div className="flex flex-col gap-2">
              {(config.categories || []).map((cat, i) => (
                <AccentDetailCard key={i} index={i} value={cat} tone="accent" size="md" />
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Committee</h2>
            <div className="flex flex-col gap-3">
              {(config.committee || []).map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="p-4 bg-white border border-slate-200 rounded-xl hover:border-brand-accent/30 hover:shadow-md transition-all flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                    <Users size={15} />
                  </div>
                  <div>
                    <p className="text-[14px] font-heading font-black italic uppercase tracking-tight text-slate-800">{m.name}</p>
                    <p className="text-[11px] font-mono text-slate-500">{m.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* ONLINE PORTALS + CONTACT */}
      <section className="relative pt-8 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Online Portals</h2>
            <div className="flex flex-col gap-4">
              {(config.online_portals || []).map((portal, i) => (
                <a key={i} href={portal.url} target="_blank" rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:bg-brand-accent/5 hover:border-brand-accent/30 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-all"><Globe size={18} /></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-heading font-black italic uppercase tracking-tight text-slate-800 group-hover:text-brand-accent">{portal.name}</span>
                      <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 group-hover:text-brand-accent transition-all shrink-0" />
                    </div>
                    <p className="text-[12px] font-body text-slate-500 mt-1">{portal.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Contact Cell</h2>
            <MinCard
              badge="Contact Cell"
              title={config.contact.name}
              description={config.contact.address}
              icon={Phone}
              variant="slate"
              className="bg-brand-blue border-white/10 shadow-2xl"
              titleClassName="text-white"
              descriptionClassName="text-white/60"
              badgeClassName="bg-white/10 text-white/60"
            >
              <div className="mt-5 flex flex-col gap-4">
                <a href={'tel:' + config.contact.phone} className="flex items-center gap-3 text-white/75 hover:text-brand-accent transition-colors"><Phone size={14} className="shrink-0" /><span className="font-mono text-sm">{config.contact.phone}</span></a>
                <a href={'mailto:' + config.contact.email} className="flex items-center gap-3 text-white/75 hover:text-brand-accent transition-colors"><Mail size={14} className="shrink-0" /><span className="font-mono text-sm">{config.contact.email}</span></a>
                <div className="flex items-center gap-3 text-white/75"><Clock size={14} className="shrink-0" /><span className="font-mono text-sm">{config.contact.timings}</span></div>
              </div>
            </MinCard>
          </div>
        </div>
      </section>
    </div>
  );
}
