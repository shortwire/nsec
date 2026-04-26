import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, BookOpen, ExternalLink, Download, Globe, GraduationCap, Cpu, Laptop, Award, Info, Phone, ChevronRight, Maximize } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

/* ═══════════════════════════════════════════════════════════
   HIGHLIGHT IMPORTANT WORDS in text
 ═══════════════════════════════════════════════════════════ */
const BOLD_KEYWORDS = [
  'Honours', 'MOOCs', 'NPTEL', 'Swayam', 'Coursera', 'Edx', 'Udemy', 'Simpilearn', 
  'Prof. Anupam Ghosh', 'MAKAUT', 'AICTE', 'BBA', 'BCA', 'B.Sc', 'Gmail ID',
  'free courses', 'Honours Degree', 'Old MOOCs Basket', 'Online Portal',
  'Real Discount', 'SkillUp', 'SPoC-Coursera'
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
   PLATFORM CARD — Grid layout matching ConstitutesCard
 ═══════════════════════════════════════════════════════════ */
const PLATFORM_ICONS = [Globe, Laptop, GraduationCap, Cpu, Award, Info];

function PlatformCard({ index, platform }) {
  const Icon = PLATFORM_ICONS[index % PLATFORM_ICONS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[20px] bg-gradient-to-br from-brand-accent/[0.02] via-white to-white border border-brand-accent/10 border-l-[3px] border-l-brand-accent shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:-translate-y-[6px] hover:shadow-[0_12px_32px_rgba(0,139,139,0.1)] hover:border-brand-accent/30 transition-all duration-[250ms] ease-out mt-3 ml-3"
    >
      {/* Number Badge */}
      <div className="absolute -top-3 -left-4 w-11 h-11 rounded-full bg-brand-accent flex items-center justify-center shadow-[0_2px_4px_rgba(0,139,139,0.2)] group-hover:scale-[1.05] group-hover:shadow-[0_4px_8px_rgba(0,139,139,0.3)] transition-all duration-[250ms] ease-out z-10 border-2 border-white text-white">
        <span className="text-[12px] font-mono font-black">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="absolute top-1/2 left-full w-16 h-[2px] -translate-y-1/2 opacity-70 group-hover:opacity-100 group-hover:w-24 transition-all duration-[250ms] ease-out pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(0,139,139,0.8), rgba(0,139,139,0.1), transparent)' }} />
      </div>

      <div className="p-6 pt-8 min-h-[140px] flex gap-4 items-start relative z-10">
        <div className="shrink-0 w-10 h-10 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-[0_2px_8px_rgba(0,139,139,0.1)] group-hover:scale-105 transition-all duration-300">
          <Icon size={20} />
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-heading font-black italic uppercase tracking-tighter text-slate-800">{platform.name}</h4>
          <p className="text-[14px] font-body font-medium text-slate-600 leading-[1.6]">
            {platform.description}
          </p>
          <a href={platform.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-brand-accent font-mono text-[10px] uppercase tracking-widest font-black hover:gap-2 transition-all duration-200 mt-2">
            Visit Platform <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BASKET CARD — Grid layout matching PunishmentCard
 ═══════════════════════════════════════════════════════════ */
function BasketCard({ index, item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[20px] bg-gradient-to-br from-brand-maroon/[0.04] via-white to-white border border-brand-maroon/[0.12] border-l-[3px] border-l-brand-maroon shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:-translate-y-[6px] hover:shadow-[0_12px_32px_rgba(128,0,0,0.14)] hover:border-brand-maroon/[0.22] transition-all duration-[250ms] ease-out mt-3 ml-3"
    >
      <div className="absolute -top-3 -left-4 w-11 h-11 rounded-full bg-brand-maroon flex items-center justify-center shadow-[0_2px_4px_rgba(128,0,0,0.15)] group-hover:scale-[1.05] group-hover:shadow-[0_4px_8px_rgba(128,0,0,0.25)] transition-all duration-[250ms] ease-out z-10 border-2 border-brand-accent/80">
        <span className="text-[12px] font-mono font-black text-white">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="absolute top-1/2 left-full w-20 h-[2px] -translate-y-1/2 opacity-70 group-hover:opacity-100 group-hover:w-32 transition-all duration-[250ms] ease-out pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(128,0,0,0.5), rgba(128,0,0,0.1), transparent)' }} />
      </div>

      <div className="p-6 pl-10 pt-7 min-h-[140px] flex flex-col justify-center">
        <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-brand-maroon/[0.08] flex items-center justify-center group-hover:bg-brand-maroon/[0.14] transition-all duration-[250ms] ease-out">
          <BookOpen size={15} className="text-brand-maroon/80 group-hover:text-brand-maroon group-hover:scale-[1.05] transition-all duration-[250ms] ease-out" />
        </div>
        <p className="text-[16px] font-body font-medium text-slate-700 leading-[1.8] group-hover:text-slate-900 transition-colors duration-[250ms] ease-out pr-4">
          <HighlightText text={item.text} />
        </p>
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-brand-maroon font-mono text-[10px] uppercase tracking-widest font-black hover:gap-2 transition-all duration-200 mt-3">
            Download PDF <Download size={12} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Moocs() {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const PDF_SRC = 'https://www.nsec.ac.in/notice/GUIDELINES-FOR-MOOCS-Aug-2021.pdf';

  const carouselPhrases = [
    { main: "GLOBAL LEARNING", highlight: "VIA MOOCs" },
    { main: "ENHANCE YOUR DEGREE", highlight: "WITH HONOURS" },
    { main: "LEARN FROM THE BEST", highlight: "PLATFORMS" },
    { main: "NPTEL & SWAYAM", highlight: "CERTIFICATIONS" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const platforms = [
    { name: "Real Discount", description: "Access discounted and free courses across multiple domains.", url: "https://www.real.discount/" },
    { name: "Coursera Free", description: "Wide range of free courses from top universities worldwide.", url: "https://www.coursera.org/search?query=free" },
    { name: "Udemy Free", description: "Practical skills and professional development free courses.", url: "https://www.udemy.com/courses/free/" },
    { name: "edX Schools", description: "High-quality academic courses from leading global institutions.", url: "https://www.edx.org/school/edx" },
    { name: "Simplilearn SkillUp", description: "Free online courses for career advancement and new skills.", url: "https://www.simplilearn.com/skillup-free-online-courses" },
    { name: "NPTEL-Swayam", description: "Indian national portal for technical and engineering courses.", url: "https://swayam.gov.in/nc_details/NPTEL" }
  ];

  const baskets = [
    { text: "GUIDELINES FOR MOOCs [Updated on 05.08.21]: Latest rules for Honours credit transfer.", url: "https://www.nsec.ac.in/notice/GUIDELINES-FOR-MOOCS-Aug-2021.pdf" },
    { text: "Old MOOCs Basket for AICTE Course (Engineering): Reference list for engineering students.", url: "https://www.nsec.ac.in/circular/AICTE_AFFILIATED%20COLLEGES%20ODD%20SEM%202020_revised_24_09_2020.pdf" },
    { text: "Old MOOCs Basket for Non-AICTE Course (BBA, BCA, B.Sc): Reference list for management & application courses.", url: "https://www.nsec.ac.in/circular/Non-AICTE%20MOOCs%20Affiliated%20college%20ODD%20SEM%202020_revised_24_09_2020.pdf" },
    { text: "Coursera Invitation: Check your official email for free Coursera course invitations sent by the institution." }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ── 01. HERO ── */}
      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="MOOCs &"
        titleFill="NPTEL"
        statutoryLabel="E-LEARNING"
        policyLabel=""
        rightLabel="Digital.Education.Framework"
        useYellowAccents={true}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Empowering', 'students', 'with', 'access', 'to', 'global'].map((word, i) => (
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
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
                className="relative inline-block"
              >
                <span
                  className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent"
                  style={{ textShadow: '0 0 25px rgba(0,139,139,0.5), 0 0 50px rgba(0,139,139,0.3)' }}
                >
                  Honours Degrees
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block"
                  style={{ boxShadow: '0 0 8px rgba(0,139,139,0.8)' }}
                />
              </motion.span>
            </div>

            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['via', 'NPTEL,', 'Swayam,', 'Coursera', 'and', 'other', 'platforms.'].map((word, i) => (
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

      {/* Separator */}
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.5) 30%, rgba(0,139,139,0.5) 70%, transparent)' }} />

      {/* ── 02. PLATFORMS CONTENT ── */}
      <section className="relative pt-24 pb-0 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="mb-8 relative">
          <SectionHeading
            title="MOOC Platforms"
            tagline="Recommended digital learning nodes for students."
          />
          <div className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-7xl mx-auto relative pt-4">
            {platforms.map((p, i) => (
              <PlatformCard key={i} index={i} platform={p} />
            ))}
          </div>
        </div>

        <div className="h-[1px] mx-auto max-w-3xl my-12" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.2) 20%, rgba(128,0,0,0.1) 50%, rgba(0,139,139,0.2) 80%, transparent)' }} />

        {/* Section 02: Baskets & Guidelines */}
        <div className="relative -mx-8 lg:-mx-24 px-8 lg:px-24 pt-8 pb-12 border-t border-brand-accent/5 bg-white">
          <SectionHeading
            title="Baskets & Rules"
            tagline="Official course reference lists and academic guidelines."
          />
          <div className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-5xl mx-auto relative pt-4">
            {baskets.map((b, i) => (
              <BasketCard key={i} index={i} item={b} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 03. ENROLLMENT & SUPPORT ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading
          title="How to Enroll"
          tagline="Steps for registration and institutional support."
        />
        <div className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative p-10 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl flex flex-col gap-6 hover:shadow-[0_20px_40px_rgba(0,139,139,0.15)] hover:border-brand-accent/40 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 z-0 bg-slate-900/80 group-hover:bg-slate-900/60 transition-colors duration-500 rounded-2xl" />
            <div className="flex items-center justify-between relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                <GraduationCap size={22} />
              </div>
              <span className="text-sm font-mono font-black text-brand-accent uppercase tracking-[0.2em]">SPoC-Coursera</span>
            </div>
            <div className="relative z-10">
              <h4 className="text-xl font-heading font-black italic uppercase tracking-tighter text-white mb-2">Prof. Anupam Ghosh</h4>
              <p className="text-sm font-mono text-white/70 uppercase tracking-widest">Head of Department, CSE (AIML)</p>
              <p className="text-xs font-body text-white/50 mt-2">Contact for Coursera invitation and credit transfer assistance.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative p-10 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl flex flex-col gap-6 hover:shadow-[0_20px_40px_rgba(128,0,0,0.15)] hover:border-brand-maroon/40 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 z-0 bg-slate-900/80 group-hover:bg-slate-900/60 transition-colors duration-500 rounded-2xl" />
            <div className="flex items-center justify-between relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-brand-accent/30 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                <Info size={22} />
              </div>
              <span className="text-sm font-mono font-black text-brand-accent uppercase tracking-[0.2em]">NPTEL Steps</span>
            </div>
            <div className="relative z-10">
              <h4 className="text-xl font-heading font-black italic uppercase tracking-tighter text-white mb-2">NPTEL-Swayam Join</h4>
              <p className="text-[13px] font-body text-white/70">Visit Swayam portal → Search Catalog → Select Course → Join with <span className="text-brand-accent">Gmail ID</span>.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 04. PDF PREVIEW ── */}
      <section className="pt-16 pb-24 px-8 lg:px-24 bg-white relative overflow-hidden">
        <SectionHeading
          title="Guidelines (PDF)"
          tagline="Official academic norms for MOOCs integration."
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.08)] border border-slate-200/60 mt-12"
        >
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900">
            <div className="flex items-center gap-5">
              <div className="flex gap-2">
                {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${c} opacity-60`} />
                ))}
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white/[0.06] rounded-lg border border-white/[0.08]">
                <Shield size={11} className="text-brand-accent/60" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  MOOCs-Guidelines-NSEC.pdf
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <a href={PDF_SRC} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 rounded-lg hover:bg-brand-accent hover:text-white transition-all">
                <Maximize size={14} />
              </a>
              <a href={PDF_SRC} download className="px-4 py-2 bg-brand-maroon text-white rounded-lg font-mono font-black text-[10px] uppercase tracking-[0.15em] hover:bg-white hover:text-brand-maroon transition-all">
                Download
              </a>
            </div>
          </div>
          <div className="w-full h-[78vh] bg-white">
            <iframe src={`${PDF_SRC}#view=FitH`} className="w-full h-full" title="MOOCs Guidelines NSEC" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
