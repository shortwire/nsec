import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, ChevronRight, Eye, Download, ExternalLink, Phone, ArrowUpRight, MessageSquare, Frown, BookOpen, Briefcase, IndianRupee, ShieldAlert, Mail, Brain, Maximize } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import Card from '../components/card';
import SpotlightStatusCard from '../components/SpotlightStatusCard';

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

/* ═══════════════════════════════════════════════════════════
   CONSTITUTES CARD — Grid layout replacing vertical timeline
 ═══════════════════════════════════════════════════════════ */
function ConstitutesCard({ index, text }) {
  const Icon = TIMELINE_ICONS[index % TIMELINE_ICONS.length];
  return (
    <Card index={index} variant="accent">
      <div className="p-6 pt-8 min-h-[140px] flex gap-4 items-start relative z-10">
        <div className="shrink-0 w-10 h-10 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-[0_2px_8px_rgba(0,139,139,0.1)] group-hover:scale-105 transition-all duration-300">
          <Icon size={20} />
        </div>
        <p className="text-[16px] font-body font-medium text-slate-700 leading-[1.8] group-hover:text-slate-900 transition-colors duration-[250ms] ease-out pt-1 pr-2">
          <HighlightText text={text} />
        </p>
      </div>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════
   PUNISHMENT CARD — Strict, premium, and impactful
 ═══════════════════════════════════════════════════════════ */
function PunishmentCard({ index, text }) {
  return (
    <Card index={index} variant="danger">
      <div className="p-6 pl-10 pt-7 min-h-[140px] flex flex-col justify-center">
        <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-brand-maroon/[0.08] flex items-center justify-center group-hover:bg-brand-maroon/[0.14] transition-all duration-[250ms] ease-out">
          <AlertTriangle size={15} className="text-brand-maroon/80 group-hover:text-brand-maroon group-hover:scale-[1.05] transition-all duration-[250ms] ease-out" />
        </div>
        <p className="text-[16px] font-body font-medium text-slate-700 leading-[1.8] group-hover:text-slate-900 transition-colors duration-[250ms] ease-out pr-4">
          <HighlightText text={text} />
        </p>
      </div>
    </Card>
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
    { main: "ENSURING A SECURE", highlight: "CAMPUS ENVIRONMENT" },
    { main: "EVERY STUDENT DESERVES", highlight: "A SAFE CAMPUS" }
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
    <div className="min-h-screen bg-white">

      {/* ── 01. HERO ── */}
      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="ANTI-"
        titleFill="RAGGING"
        statutoryLabel={<span className="text-[#fbbf24]">POLICY</span>}
        policyLabel=""
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
      <section className="relative pt-24 pb-0 px-8 lg:px-24 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Section 01: What Constitutes Ragging — GRID LAYOUT */}
        <div className="mb-8 relative">
          <SectionHeading
            title="What Constitutes"
            tagline="Defining the boundaries of student conduct."
          />
          <div className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto relative pt-4">
            {(config.what_constitutes_ragging || []).map((item, i) => (
              <ConstitutesCard key={i} index={i} text={item} />
            ))}
          </div>
        </div>

        {/* Gradient separator between timeline and punishments */}
        <div className="h-[1px] mx-auto max-w-3xl my-4" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.2) 20%, rgba(128,0,0,0.1) 50%, rgba(251,191,36,0.2) 80%, transparent)' }} />

        {/* Section 02: Punishments — GRID CARDS */}
        <div className="relative -mx-8 lg:-mx-24 px-8 lg:px-24 pt-8 pb-12 border-t border-brand-maroon/5 bg-white">
          {/* Removed the background gradient and glow to keep it pure white */}

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
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/[0.025] rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-brand-accent/[0.015] rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />

        <SectionHeading
          title="How to Report"
          tagline="Emergency nodes for immediate assistance."
        />
        <div className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
          <SpotlightStatusCard
            href="tel:1800-180-5522"
            icon={Phone}
            badge="24/7 Toll-Free"
            title="UGC National Helpline"
            value="1800-180-5522"
            meta="Confidential Channel"
            cta="Call Now"
            backgroundImage="/assets/images/helpline-bg.png"
            variant="teal"
          />

          <SpotlightStatusCard
            href="https://antiragging.in"
            target="_blank"
            rel="noopener noreferrer"
            delay={0.1}
            icon={ExternalLink}
            badge="Online Portal"
            title="Anti-Ragging Web Portal"
            value="antiragging.in"
            valueClassName="text-[1.35rem] uppercase tracking-[0.2em] text-[#e05252] group-hover:text-white"
            meta="Digital Complaint"
            cta="Open Portal"
            backgroundImage="/assets/images/helpline-bg.png"
            variant="maroon"
          />
        </div>
      </section>

      {/* Gradient separator */}
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(128,0,0,0.08) 70%, transparent)' }} />

      {/* ── 04. PDF PREVIEW ── */}
      <section className="pt-16 pb-24 px-8 lg:px-24 bg-white relative overflow-hidden">
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
                title="Fullscreen"
                className="group/btn inline-flex items-center justify-center p-2.5 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 rounded-lg
                           hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300"
              >
                <Maximize size={14} className="group-hover/btn:scale-110 transition-transform duration-200" />
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
