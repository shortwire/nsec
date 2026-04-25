import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FlaskConical, 
  Lightbulb, 
  Target, 
  CheckCircle2, 
  Users, 
  ExternalLink, 
  FileText, 
  Award, 
  Building2, 
  Handshake, 
  Globe, 
  Cpu, 
  BookOpen, 
  ChevronRight,
  Maximize,
  Microscope,
  Zap,
  Library
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

/* ═══════════════════════════════════════════════════════════
   HIGHLIGHT IMPORTANT WORDS
   ═══════════════════════════════════════════════════════════ */
const BOLD_KEYWORDS = [
  'R&D', 'Research', 'Development', 'Innovation', 'Ecosystem', 'MODROB',
  'MOU', 'Partnerships', 'Publication', 'Patent', 'IPR', 'Entrepreneurship',
  'Center of Excellence', 'Strategic', 'Advanced', 'Technology', 'Science'
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
   COMPONENT: VISION/MISSION CARD
   ═══════════════════════════════════════════════════════════ */
const VISION_ICONS = [Target, Zap, Globe, Cpu, Award, Microscope];

function VisionCard({ index, item }) {
  const Icon = VISION_ICONS[index % VISION_ICONS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[20px] bg-gradient-to-br from-brand-accent/[0.02] via-white to-white border border-brand-accent/10 border-l-[3px] border-l-brand-accent shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:-translate-y-[6px] hover:shadow-[0_12px_32px_rgba(0,139,139,0.1)] hover:border-brand-accent/30 transition-all duration-[250ms] ease-out mt-3 ml-3"
    >
      <div className="absolute -top-3 -left-4 w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center shadow-[0_2px_4px_rgba(0,139,139,0.2)] group-hover:scale-[1.05] group-hover:shadow-[0_4px_8px_rgba(0,139,139,0.3)] transition-all duration-[250ms] ease-out z-10 border-2 border-white text-white">
        <span className="text-[11px] font-mono font-black">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="p-6 pt-7 flex gap-4 items-start relative z-10">
        <div className="shrink-0 w-9 h-9 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent group-hover:scale-105 transition-all duration-300">
          <Icon size={18} />
        </div>
        <p className="text-[14px] font-body font-medium text-slate-700 leading-[1.7]">
          <HighlightText text={item} />
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT: INITIATIVE CARD
   ═══════════════════════════════════════════════════════════ */
function InitiativeCard({ item, index }) {
  return (
    <motion.a
      href={item.url ? (item.url.startsWith('http') ? item.url : `https://www.nsec.ac.in/${item.url}`) : '#'}
      target={item.url ? "_blank" : "_self"}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`group block relative p-6 rounded-2xl border transition-all duration-300 ${
        item.url 
          ? 'bg-white border-slate-100 hover:border-brand-accent/40 hover:shadow-xl hover:-translate-y-1' 
          : 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-brand-accent/5 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
          {index % 3 === 0 ? <FileText size={24} /> : index % 3 === 1 ? <BookOpen size={24} /> : <Zap size={24} />}
        </div>
        {item.url && (
          <ExternalLink size={16} className="text-slate-300 group-hover:text-brand-accent transition-colors" />
        )}
      </div>
      <h3 className="text-[16px] font-heading font-black italic uppercase tracking-tight text-slate-800 leading-tight">
        {item.title}
      </h3>
      <div className="mt-4 flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest group-hover:text-brand-accent transition-colors">
        <span>{item.url ? 'View Document' : 'Information Pending'}</span>
        {item.url && <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />}
      </div>
    </motion.a>
  );
}

export default function Rd() {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);

  const carouselPhrases = [
    { main: "INNOVATION &", highlight: "DEVELOPMENT" },
    { main: "STRATEGIC", highlight: "RESEARCH" },
    { main: "INDUSTRIAL", highlight: "CONSULTANCY" },
    { main: "PATENT &", highlight: "PUBLICATION" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const visionPoints = [
    "To emerge as a premier global hub for cutting-edge research, innovation, and technological excellence in the field of engineering and science.",
    "To foster a sustainable ecosystem that bridges the gap between academic research and industrial implementation for social impact."
  ];

  const missionPoints = [
    "To provide state-of-the-art infrastructure and resources that empower faculty and students to pursue advanced research projects.",
    "To facilitate high-impact publications, patents, and intellectual property rights (IPR) across various engineering disciplines.",
    "To establish strategic partnerships with world-renowned industries and research organizations for consultancy and knowledge transfer.",
    "To inculcate an entrepreneurial mindset and innovation culture through dedicated incubation and start-up support.",
    "To secure extramural funding from national and international agencies such as AICTE, DST, and CSIR.",
    "To organize international conferences, workshops, and seminars to disseminate research findings and latest technological trends."
  ];

  const objectives = [
    "Promote quality research among faculty members and students through continuous mentorship.",
    "Facilitate the submission of research proposals to various government and private funding agencies.",
    "Monitor and coordinate Research Activities including Ph.D. registrations and project progress.",
    "Encourage the faculty and students to publish papers in indexed journals (SCI/Scopus).",
    "Identify and explore thrust areas of research relevant to local and global industries.",
    "Manage the Institute's Intellectual Property Rights (IPR) and Patent filing process.",
    "Enhance Industry-Institute Interaction through MOUs and collaborative projects.",
    "Execute MODROB (Modernization and Removal of Obsolescence) projects for lab advancement."
  ];

  const initiatives = [
    { title: "R&D Projects and Awards", url: "impdoc/313_1.pdf" },
    { title: "Innovation Ecosystem", url: "impdoc/321.pdf" },
    { title: "R&D Guidelines", url: "impdoc/331.pdf" },
    { title: "Ph.D. Awarded", url: "impdoc/333.pdf" },
    { title: "Publications Archive", url: "impdoc/334.pdf" },
    { title: "Faculty Exchange Program", url: "impdoc/351.pdf" },
    { title: "MODROB Projects", url: null }
  ];

  const mous = [
    { organization: "Remedy Hospital", url: "impdoc/352_1.pdf", type: "Health-Tech" },
    { organization: "Electrixia Energy", url: "impdoc/352_2.pdf", type: "Renewable Energy" },
    { organization: "Orient Infotech", url: "impdoc/352_3.pdf", type: "IT Services" },
    { organization: "Photonix Solar", url: "impdoc/352_4.pdf", type: "Clean Tech" },
    { organization: "Suncraft Energy", url: "impdoc/352_5.pdf", type: "Power Systems" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* ── 01. HERO ── */}
      <PageHero
        showParticles={true}
        maxHeight="35vh"
        titleStroke="R & D"
        titleFill="CELL"
        statutoryLabel="INNOVATION CORE"
        policyLabel="Research & Development"
        rightLabel="Strategic.Insight.Node"
        useYellowAccents={true}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Pioneering', 'the', 'future', 'of', 'engineering', 'through'].map((word, i) => (
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
                  Industrial Synergy
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block"
                />
              </motion.span>
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

      {/* ── 02. VISION & MISSION ── */}
      <section className="relative pt-24 pb-16 px-8 lg:px-24 bg-white">
        <SectionHeading
          title="Vision & Mission"
          tagline="Driving the research agenda at Netaji Subhash Engineering College."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto mt-12">
          {/* Vision Column */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-slate-900">Research Vision</h3>
            </div>
            <div className="flex flex-col gap-6">
              {visionPoints.map((p, i) => (
                <VisionCard key={i} index={i} item={p} />
              ))}
            </div>
          </div>

          {/* Mission Column */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-brand-maroon/10 flex items-center justify-center text-brand-maroon">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-slate-900">Our Mandate</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {missionPoints.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 bg-slate-50 rounded-lg border-l-2 border-brand-maroon/30 text-[13px] font-body font-medium text-slate-600 leading-relaxed"
                >
                  {p}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. OBJECTIVES ── */}
      <section className="relative py-16 px-8 lg:px-24 bg-slate-50">
        <SectionHeading
          title="Key Objectives"
          tagline="Strategic focus areas for the R&D Cell."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-12">
          {objectives.map((obj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-brand-accent/40 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-4">
                <Zap size={16} />
              </div>
              <p className="text-[13px] font-body font-medium text-slate-700 leading-relaxed">
                {obj}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 04. INITIATIVES & ARCHIVE ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" />
        <SectionHeading
          title="Key Initiatives"
          tagline="Explore our research projects, guidelines, and faculty achievements."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto mt-12">
          {initiatives.map((item, i) => (
            <InitiativeCard key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── 05. MOUs & PARTNERSHIPS ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-white mb-2">Industry Partnerships</h2>
              <p className="text-white/50 font-mono text-[11px] uppercase tracking-[0.2em]">Strategic MOUs & Collaborations</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest">
                Active Alliances: {mous.length}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mous.map((mou, i) => (
              <motion.a
                key={i}
                href={mou.url ? `https://www.nsec.ac.in/${mou.url}` : '#'}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-brand-accent/20 hover:border-brand-accent/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
                    <Building2 size={24} />
                  </div>
                  <Handshake size={18} className="text-white/20 group-hover:text-brand-accent transition-colors" />
                </div>
                <h4 className="text-xl font-heading font-black italic uppercase tracking-tight text-white/90 group-hover:text-white mb-2">{mou.organization}</h4>
                <p className="text-[10px] font-mono font-bold text-brand-accent/60 uppercase tracking-widest mb-6">{mou.type}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Verification Status</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-green-500 font-bold uppercase tracking-widest">Active MOU</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>



      {/* ── 07. FLOATING CTA ── */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-10 right-10 z-50 hidden lg:block"
      >
        <a 
          href="https://www.nsec.ac.in/impdoc/331.pdf" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-3 px-6 py-4 bg-brand-accent text-white rounded-full shadow-[0_10px_30px_rgba(0,139,139,0.4)] hover:scale-105 hover:bg-brand-accent/90 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Award size={16} />
          </div>
          <span className="text-xs font-mono font-black uppercase tracking-widest">Download Guidelines</span>
        </a>
      </motion.div>
    </div>
  );
}
