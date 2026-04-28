import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, ArrowRight, PlayCircle, Calendar, Globe, Download, Eye, ExternalLink, Maximize, MapPin, Building, Trees, Compass, BookOpen } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import MinCard from '../components/minCard';
import PdfModal from '../components/PdfModal';

export default function VTourPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [config, setConfig] = useState(null);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const carouselPhrases = [
    { main: "IMMERSIVE", highlight: "CAMPUS TOUR" },
    { main: "EXPLORE", highlight: "INFRASTRUCTURE" },
    { main: "DISCOVER", highlight: "FACILITIES" },
    { main: "360°", highlight: "VIRTUAL EXPERIENCE" }
  ];

  const resources = [
    { title: 'Campus Map', url: '/assets/pdfs/NSEC-Campus-Map.pdf', type: 'Map' },
    { title: 'Virtual Tour Guide', url: '/assets/pdfs/VTour-Guide.pdf', type: 'Guide' },
    { title: 'Infrastructure Brochure', url: '/assets/pdfs/Infrastructure-Brochure.pdf', type: 'Brochure' },
    { title: 'Hostel Facilities', url: '/assets/pdfs/Hostel-Facilities.pdf', type: 'Facilities' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselPhrases.length]);

  useEffect(() => {
    fetch('/config/page-vtour-config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config:", err));
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">Loading Tour...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── 01. HERO ── */}
      <PageHero 
        showParticles={false}
        maxHeight="33vh"
        titleStroke={config.hero.title.toUpperCase()}
        titleFill={config.hero.titleHighlight.toUpperCase()}
        statutoryLabel={<span className="text-[#fbbf24]">{config.hero.subtitle}</span>}
        policyLabel=""
        rightLabel={<span className="text-[#fbbf24]">Immersive.Experience</span>}
        useYellowAccents={true}
        rightContent={
          <div className="leading-snug">
            {/* Description Lines */}
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1 max-w-sm">
               {config.hero.description.split(' ').map((word, i) => (
                 <motion.span
                   key={i}
                   initial={{ opacity: 0, y: 12 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.4 + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                   className="text-white/70 text-[15px] font-body font-medium"
                 >
                   {word}
                 </motion.span>
               ))}
            </div>

            {/* Carousel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="h-8 relative w-full mt-4"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSentenceIdx}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center flex-wrap gap-2"
                >
                  <span
                    className="font-heading font-black italic uppercase tracking-tighter text-white"
                    style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}
                  >
                    {carouselPhrases[currentSentenceIdx].main}
                  </span>
                  <span
                    className="font-heading font-black italic uppercase tracking-tighter text-[var(--color-brand-accent)]"
                    style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}
                  >
                    {carouselPhrases[currentSentenceIdx].highlight}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        }
      />

      {/* Golden gradient separator below hero */}
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5) 30%, rgba(251,191,36,0.5) 70%, transparent)' }} />

      {/* ── 02. INTERACTIVE VIRTUAL TOUR ── */}
      <section className="relative pt-24 pb-16 px-8 lg:px-24 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="mb-12 relative z-10">
          <SectionHeading
            title="360° Campus Tour"
            tagline="Navigate through our world-class infrastructure."
          />
        </div>

        {/* 360 Tour Container (Premium Chrome Wrapper) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.08)] border border-slate-200/60 relative z-10"
        >
          {/* Premium browser chrome bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-brand-blue">
            <div className="flex items-center gap-5">
              <div className="flex gap-2">
                {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${c} opacity-60`} />
                ))}
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white/[0.06] rounded-lg border border-white/[0.08]">
                <Globe size={11} className="text-brand-accent/60" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  Live-Campus-View
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="hidden sm:inline-block text-[10px] font-mono text-white/50 uppercase tracking-widest mr-2">Status: Active</span>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
            </div>
          </div>

          <div className="w-full aspect-[16/9] lg:aspect-[21/9] bg-black relative group">
             {!isPlaying ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center cursor-pointer overflow-hidden" onClick={() => setIsPlaying(true)}>
                   <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px] group-hover:bg-slate-900/50 transition-all duration-700" />
                   
                   {/* Animated pulse rings */}
                   <div className="absolute w-32 h-32 border-2 border-brand-accent/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                   <div className="absolute w-48 h-48 border border-brand-accent/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />

                   <div className="z-10 flex flex-col items-center transform group-hover:scale-105 transition-transform duration-500">
                      <div className="w-24 h-24 bg-brand-accent text-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,139,139,0.4)] mb-6 group-hover:bg-brand-accent/90 transition-colors">
                         <PlayCircle className="w-12 h-12 ml-1" />
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-heading font-black italic text-white tracking-tighter drop-shadow-lg mb-2">Initiate Experience</h3>
                      <p className="text-brand-accent font-mono font-bold tracking-[0.2em] uppercase text-[11px] bg-brand-accent/10 px-4 py-1.5 rounded-full border border-brand-accent/20">High-Fidelity 360° Tour</p>
                   </div>
                </div>
             ) : (
                <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center">
                   <iframe 
                      width="100%" 
                      height="100%" 
                      className="w-full h-full min-h-[400px]"
                      src={config.embed} 
                      title="Virtual Tour" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                   ></iframe>
                </div>
             )}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#fbbf24', boxShadow: '0 0 6px rgba(251,191,36,0.5)' }} />
              <span className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-widest">
                Netaji Subhash Engineering College
              </span>
            </div>
            <span className="text-[9px] font-mono text-brand-accent uppercase tracking-widest">
              Interactive Viewport
            </span>
          </div>
        </motion.div>
      </section>

      {/* Gradient separator */}
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* ── 03. DOWNLOADS & ACTIONS ── */}
      <section className="relative pt-16 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">
          
          {/* Left Side: Actions */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Explore Campus</h2>
            <div className="grid grid-cols-1 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative p-8 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border border-slate-200 bg-slate-50 hover:border-brand-maroon/30"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(128, 0, 0, 0.03), rgba(251, 191, 36, 0.03))' }}></div>
                <div className="relative z-10 flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 bg-brand-maroon text-white group-hover:scale-110 shadow-lg shadow-brand-maroon/20">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-black italic uppercase tracking-tight text-slate-800 mb-2 group-hover:text-brand-maroon transition-colors">Physical Campus Visit</h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed font-body font-medium">Experience our campus firsthand. Book a guided tour with our admission counselors and explore our facilities in person.</p>
                    <button className="font-mono font-bold text-[11px] uppercase tracking-widest inline-flex items-center gap-2 text-brand-maroon group-hover:gap-3 transition-all duration-300">
                      Schedule a Visit <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative p-8 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border border-slate-200 bg-slate-50 hover:border-[#fbbf24]/50"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(128, 0, 0, 0.02))' }}></div>
                <div className="relative z-10 flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 bg-[#fbbf24] text-slate-900 group-hover:scale-110 shadow-lg shadow-[#fbbf24]/20">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-black italic uppercase tracking-tight text-slate-800 mb-2 group-hover:text-[#d97706] transition-colors">Interactive Map</h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed font-body font-medium">Navigate seamlessly through departments, smart classrooms, laboratories, and recreational areas.</p>
                    <button className="font-mono font-bold text-[11px] uppercase tracking-widest inline-flex items-center gap-2 text-[#d97706] group-hover:gap-3 transition-all duration-300">
                      Launch Navigator <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Campus Resources / PDFs (IQAC Style) */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-6">Campus Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resources.map((res, i) => (
                <MinCard
                  key={i}
                  icon={res.type === 'Map' ? Map : res.type === 'Guide' ? BookOpen : res.type === 'Brochure' ? Building : Trees}
                  title={res.title}
                  description="Campus resource PDF"
                  badge="Campus Resource"
                  meta="Open document"
                  variant={i % 2 === 0 ? 'accent' : 'slate'}
                  index={i}
                  center={false}
                  actionLabel="View PDF"
                  onClick={() => setSelectedPdf(res.url)}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* PDF Modal */}
      <PdfModal selectedPdf={selectedPdf} setSelectedPdf={setSelectedPdf} />
    </div>
  );
}
