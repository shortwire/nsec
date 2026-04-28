import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ExternalLink, Download, Clock, Globe, ChevronRight, X, CheckCircle2, Mail, Phone } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SpotlightStatusCard from '../components/SpotlightStatusCard';

const ITEM_ICONS = [BookOpen, Globe, CheckCircle2, ExternalLink, Download, Clock, Mail, Phone];

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

function StatCard({ label, value, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="flex flex-col items-center justify-center p-6 bg-brand-blue rounded-2xl border border-white/10 shadow-xl">
      <p className="text-[9px] font-mono font-black text-white/40 uppercase tracking-[0.3em] mb-2">{label}</p>
      <h4 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-white leading-none">{value}</h4>
    </motion.div>
  );
}

function PdfModal({ url, onClose }) {
  return (
    <AnimatePresence>
      {url && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12">
          <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }} onClick={e => e.stopPropagation()}
            className="w-full max-w-5xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
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
            <div className="flex-1 relative"><iframe src={url} className="absolute inset-0 w-full h-full border-0" title="PDF Preview" /></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function FacilitiesLibrary() {
  const [config, setConfig] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const carouselPhrases = [
    { main: 'CENTRAL', highlight: 'LIBRARY' },
    { main: '104,556+', highlight: 'VOLUMES' },
    { main: 'DIGITAL', highlight: 'RESOURCES' },
    { main: 'LIBSYS', highlight: 'CLOUD SYSTEM' },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentIdx(p => (p + 1) % carouselPhrases.length), 4000);
    return () => clearInterval(t);
  }, [carouselPhrases.length]);

  useEffect(() => {
    fetch('/config/facilities-library.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(e => console.error('Library config error:', e));
  }, []);

  if (!config) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">Loading...</span>
      </div>
    </div>
  );

  const statsArr = [
    { label: 'Total Volumes', value: config.stats.volumes.toLocaleString() },
    { label: 'Titles', value: config.stats.titles.toLocaleString() },
    { label: 'E-Books', value: config.stats.ebooks.toLocaleString() },
    { label: 'E-Journals', value: config.stats.ejournals },
    { label: 'Reading Seats', value: config.stats.reading_seats },
  ];

  const timings = [
    { label: 'Library (Mon-Fri)', value: config.timings.library.monday_friday },
    { label: 'Library (Saturday)', value: config.timings.library.saturday },
    { label: 'Circulation (Mon-Fri)', value: config.timings.circulation.monday_friday },
    { label: 'Circulation (Saturday)', value: config.timings.circulation.saturday },
    { label: 'Membership', value: config.timings.other_services.membership },
    { label: 'Fine and Clearance', value: config.timings.other_services.fine_and_clearance },
  ];

  return (
    <div className="min-h-screen bg-white">

      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="CENTRAL"
        titleFill="LIBRARY"
        useYellowAccents={true}
        statutoryLabel={<span className="text-[#fbbf24]">FACILITIES</span>}
        policyLabel=""
        rightLabel={<span className="text-[#fbbf24]">Knowledge.Hub.NSEC</span>}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Over', '100,000', 'volumes', 'and', 'rich'].map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
                  className="text-white/70 text-[15px] font-body font-medium">{w}</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.79 }} className="relative inline-block">
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent"
                  style={{ textShadow: '0 0 25px rgba(0,139,139,0.5)' }}>digital resources</span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 1.1 }}
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

      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5) 30%, rgba(251,191,36,0.5) 70%, transparent)' }} />

      {/* STATS */}
      <section className="pt-16 pb-8 px-8 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {statsArr.map((s, i) => <StatCard key={i} index={i} label={s.label} value={s.value} />)}
        </div>
      </section>

      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* VISION + MISSION */}
      <section className="relative pt-16 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <SectionHeading title="Vision" tagline={config.vision} />
        <div className="mb-10" />
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-brand-maroon/10 flex items-center justify-center text-brand-maroon shrink-0"><CheckCircle2 size={24} /></div>
            <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon">Mission</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 pt-4">
            {(config.mission || []).map((item, i) => <ItemCard key={i} index={i} text={item} />)}
          </div>
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* ABOUT */}
      <section className="relative pt-8 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="About" tagline="History and operations of the NSEC Central Library." />
        <div className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto pt-4">
          {(config.about || []).map((item, i) => <ItemCard key={i} index={i} text={item} />)}
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* DIGITAL RESOURCES + FEATURES */}
      <section className="relative pt-8 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Digital Resources</h2>
            <div className="space-y-3">
              {(config.digital_resources || []).map((r, i) => (
                <SpotlightStatusCard
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  delay={i * 0.06}
                  backgroundImage={'/assets/images/helpline-bg.png'}
                  icon={Globe}
                  title={r.name}
                  cta="Visit"
                  variant="teal"
                />
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Key Features</h2>
            <div className="grid grid-cols-1 gap-3">
              {(config.features || []).map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl hover:bg-brand-accent/5 hover:border-brand-accent/20 transition-all">
                  <div className="w-2 h-2 rounded-full bg-[#fbbf24] shrink-0" />
                  <span className="text-[14px] font-body font-medium text-slate-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* SERVICES + TIMINGS */}
      <section className="relative pt-8 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Services</h2>
            <div className="grid grid-cols-1 gap-2">
              {(config.services || []).map((s, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl hover:bg-brand-accent/5 hover:border-brand-accent/20 transition-all">
                  <CheckCircle2 size={16} className="text-brand-accent shrink-0" />
                  <span className="text-[14px] font-body font-medium text-slate-700">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Timings</h2>
            <div className="space-y-3">
              {timings.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-brand-accent shrink-0" />
                    <span className="text-[13px] font-body font-medium text-slate-600">{t.label}</span>
                  </div>
                  <span className="text-[13px] font-mono font-bold text-slate-800">{t.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* DOCUMENTS */}
      <section className="relative pt-8 pb-4 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Documents" tagline="Official library brochures and publications." />
        <div className="mb-10" />
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(config.documents || []).map((doc, i) => (
            <button key={i} onClick={() => setSelectedPdf('/assets/pdfs/' + doc.url)}
              className="w-full text-left group flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:bg-brand-maroon/5 hover:border-brand-maroon/30 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-maroon/10 flex items-center justify-center text-brand-maroon shrink-0"><Download size={18} /></div>
                <span className="text-[15px] font-heading font-black italic uppercase tracking-tight text-slate-700 group-hover:text-brand-maroon">{doc.title}</span>
              </div>
              <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-maroon/60">PDF</span>
            </button>
          ))}
        </div>
      </section>

      <div className="h-[1px] w-full my-8" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* CONTACT */}
      <section className="relative pt-8 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Contact" tagline="Reach the NSEC Central Library." />
        <div className="mb-10" />
        <div className="max-w-3xl mx-auto p-8 bg-brand-blue rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Librarian</p>
              <p className="text-xl font-heading font-black italic uppercase text-white">{config.contact.name}</p>
              <p className="text-sm font-body text-white/60">{config.contact.designation}</p>
            </div>
            <div className="h-[1px] bg-white/10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(config.contact.phone || []).map((ph, i) => (
                <a key={i} href={'tel:' + ph} className="flex items-center gap-3 text-white/70 hover:text-brand-accent transition-colors">
                  <Phone size={14} className="shrink-0" /><span className="font-mono text-sm">{ph}</span>
                </a>
              ))}
              <a href={'mailto:' + config.contact.email} className="flex items-center gap-3 text-white/70 hover:text-brand-accent transition-colors">
                <Mail size={14} className="shrink-0" /><span className="font-mono text-sm">{config.contact.email}</span>
              </a>
            </div>
            <div className="h-[1px] bg-white/10" />
            <p className="text-[13px] font-body text-white/50">{config.contact.address}</p>
          </div>
        </div>
      </section>

      <PdfModal url={selectedPdf} onClose={() => setSelectedPdf(null)} />
    </div>
  );
}
