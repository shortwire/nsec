import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, ChevronRight, Eye, Download, ExternalLink, Phone, ArrowUpRight, MessageSquare, Frown, BookOpen, Briefcase, IndianRupee, ShieldAlert, Mail, Brain } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

/* ═══════════════════════════════════════════════════════════
   THREE.JS  —  RIPPLE WAVE PARTICLE FIELD
   A 3D grid of 4,800 points that ripple like a living ocean.
   Completely unique — never seen on any Indian institution site.
═══════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════
   HIGHLIGHT IMPORTANT WORDS in text
 ═══════════════════════════════════════════════════════════ */
const BOLD_KEYWORDS = [
  'punishable offence', 'physical abuse', 'sexual abuse', 'financial extortion',
  'mental health', 'FIR', 'expulsion', 'rustication', 'suspension',
  'Rs. 25,000/-', '25,000', 'cancellation of admission', 'hostel',
  'scholarship', 'fellowship', 'placement assistance', 'debarring',
  'imprisonment', 'teasing', 'rudeness', 'rowdy', 'in disciplined',
  'annoyance', 'hardship', 'physical or psychological harm', 'fear',
  'shame', 'torment', 'embarrassment', 'academic activity',
  'exploiting', 'financial extortion', 'forceful expenditure',
  'stripping', 'bodily harm', 'danger to health', 'public insults',
  'sadistic', 'self-confidence', 'authority', 'superiority',
  'withholding results', 'fine', 'consequent debarring'
];

function HighlightText({ text }) {
  if (!text) return null;
  const regex = new RegExp(`(${BOLD_KEYWORDS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    BOLD_KEYWORDS.some(k => k.toLowerCase() === part.toLowerCase())
      ? <strong key={i} className="font-bold text-slate-800">{part}</strong>
      : <span key={i}>{part}</span>
  );
}

/* ═══════════════════════════════════════════════════════════
   TIMELINE NODE — Proper left/right zig-zag with glowing spine
 ═══════════════════════════════════════════════════════════ */
const TIMELINE_ICONS = [MessageSquare, AlertTriangle, Frown, BookOpen, Briefcase, IndianRupee, ShieldAlert, Mail, Brain];

function TimelineNode({ index, text, total }) {
  const isEven = index % 2 === 0;
  const Icon = TIMELINE_ICONS[index % TIMELINE_ICONS.length];
  return (
    <div className="relative flex items-stretch group">
      {/* Left side */}
      <div className="hidden lg:block lg:w-[calc(50%-2rem)] order-1">
        {isEven && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
            className="relative mr-6 p-6 rounded-[20px] bg-white border border-brand-accent/20 border-l-[3px] border-l-[#fbbf24] shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_0_1px_rgba(251,191,36,0.15)] hover:bg-slate-50 transition-all duration-300 cursor-default"
          >
            <div className="absolute top-1/2 -right-6 w-6 h-[2px] -translate-y-1/2" style={{ background: 'linear-gradient(to right, rgba(0,139,139,0.15), rgba(0,139,139,0.3))' }} />
            <div className="absolute inset-0 rounded-[20px] -z-10 translate-x-1 translate-y-1 bg-brand-accent/[0.02] border border-brand-accent/5" />
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-10 h-10 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-[0_2px_8px_rgba(0,139,139,0.1)] group-hover:scale-105 transition-all duration-300">
                <Icon size={20} />
              </div>
              <p className="text-[16px] font-body text-slate-700 leading-[1.8] tracking-wide pt-1"><HighlightText text={text} /></p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Center spine */}
      <div className="flex flex-col items-center shrink-0 w-12 lg:w-16 order-2 relative z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.07 }}
          className="relative w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center shadow-[0_0_0_2px_#fbbf24,0_0_0_5px_rgba(251,191,36,0.15),0_0_10px_rgba(251,191,36,0.25)] transition-all duration-300"
        >
          <span className="text-xs font-mono font-black text-white">{String(index + 1).padStart(2, '0')}</span>
          <div className="absolute inset-0 rounded-full border-2 animate-ping" style={{ animationDuration: '1.2s', borderColor: 'rgba(251,191,36,0.5)' }} />
          <div className="absolute inset-[1px] rounded-full border-2 animate-pulse" style={{ animationDuration: '0.8s', borderColor: 'rgba(251,191,36,0.25)' }} />
        </motion.div>
        {index < total - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07 + 0.15 }}
            className="w-[2px] flex-1 min-h-[32px] origin-top mt-1"
            style={{ background: 'linear-gradient(to bottom, rgba(0,139,139,0.35), rgba(0,139,139,0.05))' }}
          />
        )}
      </div>

      {/* Right side */}
      <div className="hidden lg:block lg:w-[calc(50%-2rem)] order-3">
        {!isEven && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
            className="relative ml-6 p-6 rounded-[20px] bg-white border border-brand-accent/20 border-l-[3px] border-l-[#fbbf24] shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_0_1px_rgba(251,191,36,0.15)] hover:bg-slate-50 transition-all duration-300 cursor-default"
          >
            <div className="absolute top-1/2 -left-6 w-6 h-[2px] -translate-y-1/2" style={{ background: 'linear-gradient(to left, rgba(0,139,139,0.15), rgba(0,139,139,0.3))' }} />
            <div className="absolute inset-0 rounded-[20px] -z-10 -translate-x-1 translate-y-1 bg-brand-accent/[0.02] border border-brand-accent/5" />
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-10 h-10 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-[0_2px_8px_rgba(0,139,139,0.1)] group-hover:scale-105 transition-all duration-300">
                <Icon size={20} />
              </div>
              <p className="text-[16px] font-body text-slate-700 leading-[1.8] tracking-wide pt-1"><HighlightText text={text} /></p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.07 }}
        whileHover={{ y: -3 }}
        className="lg:hidden flex-1 ml-3 mb-5 p-5 rounded-[20px] bg-white border border-brand-accent/20 border-l-[3px] border-l-[#fbbf24] shadow-[0_2px_12px_rgba(0,0,0,0.04),0_0_0_1px_rgba(251,191,36,0.15)] hover:bg-slate-50 transition-all duration-300 cursor-default order-3"
      >
        <div className="flex gap-4 items-start">
          <div className="shrink-0 w-10 h-10 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-[0_2px_8px_rgba(0,139,139,0.1)] transition-all duration-300">
            <Icon size={20} />
          </div>
          <p className="text-[16px] font-body text-slate-700 leading-[1.8] tracking-wide pt-1"><HighlightText text={text} /></p>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PUNISHMENT CARD — Strict, premium, and impactful
 ═══════════════════════════════════════════════════════════ */
function PunishmentCard({ index, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[20px] bg-gradient-to-br from-brand-maroon/[0.04] via-white to-white border border-brand-maroon/[0.12] border-l-[3px] border-l-brand-maroon shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:-translate-y-[6px] hover:shadow-[0_12px_32px_rgba(128,0,0,0.14)] hover:border-brand-maroon/[0.22] transition-all duration-[250ms] ease-out mt-3 ml-3"
    >
      {/* Number Badge (sharp, precise, connected with golden border) */}
      <div className="absolute -top-3 -left-4 w-11 h-11 rounded-full bg-brand-maroon flex items-center justify-center shadow-[0_2px_4px_rgba(128,0,0,0.15)] group-hover:scale-[1.05] group-hover:shadow-[0_4px_8px_rgba(128,0,0,0.25)] transition-all duration-[250ms] ease-out z-10 border-2 border-[#fbbf24]/80">
        <span className="text-[12px] font-mono font-black text-white">
          {String(index + 1).padStart(2, '0')}
        </span>
        {/* Crisp horizontal gradient connector line */}
        <div className="absolute top-1/2 left-full w-20 h-[2px] -translate-y-1/2 opacity-70 group-hover:opacity-100 group-hover:w-32 transition-all duration-[250ms] ease-out pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(128,0,0,0.5), rgba(128,0,0,0.1), transparent)' }} />
      </div>

      <div className="p-6 pl-10 pt-7 min-h-[140px] flex flex-col justify-center">
        <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-brand-maroon/[0.08] flex items-center justify-center group-hover:bg-brand-maroon/[0.14] transition-all duration-[250ms] ease-out">
          <AlertTriangle size={15} className="text-brand-maroon/80 group-hover:text-brand-maroon group-hover:scale-[1.05] transition-all duration-[250ms] ease-out" />
        </div>
        <p className="text-[16px] font-body font-medium text-slate-700 leading-[1.8] group-hover:text-slate-900 transition-colors duration-[250ms] ease-out pr-4">
          <HighlightText text={text} />
        </p>
      </div>
    </motion.div>
  );
}



/* ═══════════════════════════════════════════════════════════
   HERO BANNER  — ultra-thin, one-line ANTI-RAGGING
═══════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */
export default function AntiRagging() {
  const [config, setConfig] = useState(null);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const PDF_SRC = '/assets/pdfs/Anti-Ragging-Committee-NSEC-2024-2025.pdf';

  const carouselPhrases = [
    { main: "STRICT ZERO TOLERANCE", highlight: "AGAINST RAGGING" },
    { main: "REPORT ANY INCIDENT", highlight: "WITHOUT FEAR" },
    { main: "ENSURING A SECURE", highlight: "CAMPUS ENVIRONMENT" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselPhrases.length]);

  useEffect(() => {
    fetch('/config/page-antiragging-config.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(err => console.error('Failed to load Anti-Ragging config:', err));
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

  return (
    <div className="min-h-screen bg-brand-bg">

      {/* ── 01. HERO ── */}
      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="ANTI-"
        titleFill="RAGGING"
        statutoryLabel={<span className="text-[#fbbf24]">Statutory Committee</span>}
        policyLabel="POLICY"
        rightLabel={<span className="text-[#fbbf24]">Zero.Tolerance.Policy</span>}
        rightContent={
          <div className="leading-snug">
            {/* Line 1 */}
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Ragging', 'in', 'any', 'form', 'is', 'a'].map((word, i) => (
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

              {/* Glowing keyword — "punishable offence" */}
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
                className="relative inline-block"
              >
                <span
                  className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-[var(--color-brand-accent)]"
                  style={{ textShadow: '0 0 25px var(--color-brand-accent), 0 0 50px rgba(0,139,139,0.5)' }}
                >
                  punishable offence
                </span>
                {/* animated underline */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block"
                  style={{ boxShadow: '0 0 8px rgba(0,139,139,0.8)' }}
                />
              </motion.span>
            </div>

            {/* Line 2 */}
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['under', 'UGC', 'regulations', 'and', 'Indian', 'law.'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/70 text-[15px] font-body font-medium"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Line 3 — softer */}
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-6 mt-2">
              {['Every', 'student', 'deserves', 'a', 'safe', 'and', 'dignified', 'campus', 'experience.'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.36 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/45 text-[13px] font-body"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Carousel */}
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

      {/* ── 02. GUIDELINES CONTENT ── */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 bg-brand-bg overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Section 01: What Constitutes Ragging — VERTICAL TIMELINE */}
        <div className="mb-32 relative">
          <SectionHeading
            title="What Constitutes"
            tagline="Defining the boundaries of student conduct."
          />
          <div className="mb-12" />

          <div className="max-w-5xl mx-auto relative">
            {/* Persistent glowing timeline spine */}
            <div className="absolute left-6 lg:left-1/2 lg:-translate-x-[1px] top-0 bottom-0 w-[2px] pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,139,139,0.2) 15%, rgba(0,139,139,0.15) 85%, transparent)' }} />
            <div className="absolute left-6 lg:left-1/2 lg:-translate-x-[3px] top-[10%] bottom-[10%] w-[6px] pointer-events-none rounded-full blur-sm" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,139,139,0.08) 30%, rgba(0,139,139,0.06) 70%, transparent)' }} />

            {(config.what_constitutes_ragging || []).map((item, i, arr) => (
              <TimelineNode key={i} index={i} text={item} total={arr.length} />
            ))}
          </div>
        </div>

        {/* Gradient separator between timeline and punishments */}
        <div className="h-[1px] mx-auto max-w-3xl mb-8" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.2) 20%, rgba(128,0,0,0.1) 50%, rgba(251,191,36,0.2) 80%, transparent)' }} />

        {/* Section 02: Punishments — GRID CARDS with red-tinted strip */}
        <div className="relative -mx-8 lg:-mx-24 px-8 lg:px-24 py-24 border-y border-brand-maroon/5" style={{ background: 'linear-gradient(180deg, rgba(127,29,29,0.02) 0%, rgba(127,29,29,0.04) 50%, rgba(127,29,29,0.02) 100%)' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-maroon/[0.04] rounded-full blur-[100px] pointer-events-none" />

          <SectionHeading
            title="Punishments"
            tagline="Actions to be taken for abetting in ragging."
          />
          <div className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto relative pt-4">
            {(config.punishments || []).map((item, i) => (
              <PunishmentCard key={i} index={i} text={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Gradient separator */}
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

      {/* ── 03. REPORT & HELPLINE ── */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/[0.025] rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-brand-accent/[0.015] rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />

        <SectionHeading
          title="How to Report"
          tagline="Emergency nodes for immediate assistance."
        />
        <div className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
          {/* Phone Helpline Card */}
          <motion.a
            href="tel:1800-180-5522"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="group relative p-10 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl flex flex-col gap-6
                       hover:shadow-[0_20px_40px_rgba(0,139,139,0.15)] hover:border-brand-accent/40
                       transition-all duration-500 overflow-hidden cursor-pointer"
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 opacity-100 pointer-events-none bg-center bg-cover rounded-2xl transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]" style={{ backgroundImage: "url('/assets/images/helpline-bg.png')" }} />
            <div className="absolute inset-0 z-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500 rounded-2xl" />

            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-[2] group-hover:bg-brand-accent/30 z-0 blur-xl" />
            {/* Neon teal accent bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] z-0" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.6), rgba(251,191,36,0.2), transparent)' }} />

            <div className="flex items-center justify-between relative z-10">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white group-hover:border-brand-accent group-hover:shadow-[0_0_24px_rgba(14,165,165,0.4)] group-hover:scale-105 transition-all duration-300">
                  <Phone size={22} />
                </div>
                {/* Neon teal indicator dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 animate-pulse" style={{ background: '#fbbf24', boxShadow: '0 0 8px rgba(251,191,36,0.8)' }} />
              </div>
              <span className="text-sm font-mono font-black text-brand-accent uppercase tracking-[0.2em] drop-shadow-md">24/7 Toll-Free</span>
            </div>

            <div className="relative z-10">
              <h4 className="text-xl font-heading font-black italic uppercase tracking-tighter text-white mb-2 drop-shadow-md">UGC National Helpline</h4>
              <p className="text-3xl font-mono font-black text-white/90 group-hover:text-brand-accent transition-colors duration-300 drop-shadow-md">1800‑180‑5522</p>
            </div>

            <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between relative z-10">
              <span className="text-[9px] font-mono font-bold text-white/50 uppercase tracking-widest">Confidential Channel</span>
              <div className="flex items-center gap-2 text-brand-accent font-mono font-black text-[10px] uppercase tracking-widest transition-all duration-300">
                Call Now <ChevronRight size={14} />
              </div>
            </div>
          </motion.a>

          {/* Website Portal Card */}
          <motion.a
            href="https://antiragging.in"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative p-10 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl flex flex-col gap-6
                       hover:shadow-[0_20px_40px_rgba(128,0,0,0.15)] hover:border-brand-maroon/40
                       transition-all duration-500 overflow-hidden cursor-pointer"
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 opacity-100 pointer-events-none bg-center bg-cover rounded-2xl transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]" style={{ backgroundImage: "url('/assets/images/portal-bg.png')" }} />
            <div className="absolute inset-0 z-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500 rounded-2xl" />

            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-maroon/20 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-[2] group-hover:bg-brand-maroon/30 z-0 blur-xl" />
            {/* Gold accent bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] z-0" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.6), rgba(251,191,36,0.2), transparent)' }} />

            <div className="flex items-center justify-between relative z-10">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24] group-hover:bg-[#fbbf24] group-hover:text-slate-900 group-hover:border-[#fbbf24] group-hover:shadow-[0_0_24px_rgba(251,191,36,0.5)] group-hover:scale-105 transition-all duration-300">
                  <ExternalLink size={22} />
                </div>
                {/* Gold indicator dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 animate-pulse" style={{ background: '#fbbf24', boxShadow: '0 0 8px rgba(251,191,36,0.8)' }} />
              </div>
              <span className="text-sm font-mono font-black text-[#fbbf24] uppercase tracking-[0.2em] drop-shadow-md" style={{ textShadow: '0 0 12px rgba(251,191,36,0.4)' }}>Online Portal</span>
            </div>

            <div className="relative z-10">
              <h4 className="text-xl font-heading font-black italic uppercase tracking-tighter text-white mb-2 drop-shadow-md">Anti-Ragging Web Portal</h4>
              <p className="text-[1.35rem] font-mono font-black text-[#e05252] group-hover:text-white transition-colors duration-300 uppercase tracking-[0.2em] drop-shadow-md" style={{ textShadow: '0 0 18px rgba(224,82,82,0.55)' }}>antiragging.in</p>
            </div>

            <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between relative z-10">
              <span className="text-[9px] font-mono font-bold text-white/50 uppercase tracking-widest">Digital Complaint</span>
              <div className="flex items-center gap-2 text-[#fbbf24] font-mono font-black text-[10px] uppercase tracking-widest transition-all duration-300" style={{ textShadow: '0 0 10px rgba(251,191,36,0.4)' }}>
                Open Portal <ChevronRight size={14} />
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* Gradient separator */}
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(128,0,0,0.08) 70%, transparent)' }} />

      {/* ── 04. PDF PREVIEW ── */}
      <section className="py-20 px-8 lg:px-24 bg-brand-bg relative overflow-hidden">
        <SectionHeading
          title="Committee (ARC)"
          tagline="Official Anti-Ragging Committee & Squad"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.08)] border border-slate-200/60"
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
                <Shield size={11} className="text-brand-accent/60" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  Anti-Ragging-Committee-NSEC.pdf
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <a
                href={PDF_SRC}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-1.5 px-4 py-2 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 rounded-lg
                           font-mono font-black text-[10px] uppercase tracking-[0.15em]
                           hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300"
              >
                <Eye size={12} className="group-hover/btn:scale-110 transition-transform duration-200" /> View
              </a>
              <a
                href={PDF_SRC}
                download
                className="group/btn inline-flex items-center gap-1.5 px-4 py-2 bg-brand-maroon text-white rounded-lg
                           font-mono font-black text-[10px] uppercase tracking-[0.15em]
                           hover:bg-white hover:text-brand-maroon hover:shadow-lg transition-all duration-300"
              >
                <Download size={12} className="group-hover/btn:translate-y-[1px] transition-transform duration-200" /> Download
              </a>
            </div>
          </div>

          {/* Document viewer */}
          <div className="w-full h-[78vh] bg-white">
            <iframe
              src={`${PDF_SRC}#view=FitH`}
              className="w-full h-full"
              title="Anti-Ragging Committee NSEC"
            />
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
              Statutory Document
            </span>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
