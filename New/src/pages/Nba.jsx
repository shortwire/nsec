import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, FileText, Download, CheckCircle2, ChevronRight, History, MessageSquare, CheckCircle, Building2, Globe } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

/* ═══════════════════════════════════════════════════════════
   HIGHLIGHT IMPORTANT WORDS
 ═══════════════════════════════════════════════════════════ */
const BOLD_KEYWORDS = [
  'NBA', 'National Board of Accreditation', 'Biomedical Engineering', 'Computer Science & Engineering',
  'Electronics & Communication Engineering', 'Electrical Engineering', '2024-25', '2026-27',
  'Accredited', 'Quality Assurance', 'Technical Education', 'B.Tech', 'Outcome-based'
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
   COMPONENT: PROGRAM CARD
 ═══════════════════════════════════════════════════════════ */
function ProgramCard({ index, program }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[20px] bg-white border border-slate-200 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,139,139,0.12)] hover:border-brand-accent/30 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute -top-4 -right-4 text-[120px] font-heading font-black italic text-slate-50 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-brand-accent/5 border border-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform duration-500">
          <Award size={28} />
        </div>
        <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-2 leading-tight">
          {program.name}
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-[10px] font-mono font-black px-2 py-1 bg-brand-accent/10 text-brand-accent rounded uppercase tracking-widest">B.TECH PROGRAM</span>
          <span className="text-[10px] font-mono font-black px-2 py-1 bg-brand-maroon/10 text-brand-maroon rounded uppercase tracking-widest">ACCREDITED</span>
        </div>
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Validity</span>
            <span className="text-sm font-heading font-black italic text-brand-accent">{program.validity}</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-[3px] bg-brand-accent w-0 group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
}

export default function Nba() {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);

  const carouselPhrases = [
    { main: "NBA", highlight: "ACCREDITED" },
    { main: "QUALITY", highlight: "ASSURANCE" },
    { main: "TECHNICAL", highlight: "EXCELLENCE" },
    { main: "GLOBAL", highlight: "STANDARDS" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const accreditedPrograms = [
    { name: "Computer Science & Engineering", validity: "2024-25 to 2026-27" },
    { name: "Electronics & Communication Engineering", validity: "2024-25 to 2026-27" },
    { name: "Electrical Engineering", validity: "2024-25 to 2026-27" },
    { name: "Biomedical Engineering", validity: "2024-25 to 2026-27" }
  ];

  const historicalCycles = [
    { period: "2024 - 2027", programs: "CSE, ECE, EE, BME", status: "Accredited" },
    { period: "2019 - 2022", programs: "EE, ECE, CSE, BME", status: "Accredited" },
    { period: "2016 - 2019", programs: "EE, ECE, CSE, BME", status: "Accredited" },
    { period: "2009 - 2012", programs: "EE, ECE", status: "Accredited" },
    { period: "2007 - 2010", programs: "IT", status: "Accredited" },
    { period: "2006 - 2009", programs: "EE, ECE, CSE", status: "Accredited" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        showParticles={true}
        maxHeight="33vh"
        titleStroke="NBA"
        titleFill="PROG"
        statutoryLabel="OUTCOME BASED EDUCATION"
        policyLabel=""
        rightLabel="Quality.Node.System"
        useYellowAccents={true}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Committed', 'to', 'maintaining', 'the', 'highest', 'benchmarks', 'in'].map((word, i) => (
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
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ textShadow: '0 0 25px rgba(0,139,139,0.5), 0 0 50px rgba(0,139,139,0.3)' }}>
                  Technical Excellence
                </span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }} className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block" />
              </motion.span>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.8 }} className="h-8 relative w-full mt-2">
              <AnimatePresence mode="wait">
                <motion.div key={currentSentenceIdx} initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }} transition={{ duration: 0.8, ease: "easeInOut" }} className="absolute inset-0 flex items-center flex-wrap gap-2">
                  <span className="font-heading font-black italic uppercase tracking-tighter text-white" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}>{carouselPhrases[currentSentenceIdx].main}</span>
                  <span className="font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}>{carouselPhrases[currentSentenceIdx].highlight}</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        }
      />

      <section className="relative pt-24 pb-16 px-8 lg:px-24 bg-white">
        <div className="flex flex-col items-center mb-12">
          <motion.img 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            src="https://www.nsec.ac.in/images/nba-logo.png" 
            alt="NBA Logo" 
            className="h-24 md:h-32 mb-8 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            onClick={() => window.open('https://www.nbaind.org/', '_blank')}
          />
          <SectionHeading title="Accreditation Status" tagline="National Board of Accreditation (NBA) approved programs at NSEC." />
        </div>
        <div className="max-w-7xl mx-auto mt-12">
          <div className="p-8 bg-slate-50 border border-slate-200 rounded-3xl mb-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="w-20 h-20 shrink-0 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent">
              <ShieldCheck size={40} />
            </div>
            <div>
              <p className="text-lg font-body font-medium text-slate-600 leading-relaxed italic">
                "National Board of Accreditation (NBA) has approved the accreditation status (2024-25 to 2026-27) to the following B.Tech programmes, recognizing the quality and standards of technical education provided at NSEC."
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accreditedPrograms.map((p, i) => (
              <ProgramCard key={i} index={i} program={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-grid" />
        
        {/* Decorative background logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none grayscale flex items-center justify-center">
          <img src="https://www.nsec.ac.in/images/nba-logo.png" alt="" className="w-1/2 h-auto" />
        </div>

        <SectionHeading title="Historical Excellence" tagline="A consistent record of accreditation and quality since 2005." />
        
        <div className="max-w-5xl mx-auto mt-24 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[21px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-accent/0 via-brand-accent/20 to-brand-accent/0 md:-translate-x-1/2" />

          <div className="space-y-16">
            {historicalCycles.map((cycle, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }} 
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} 
                className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 w-11 h-11 rounded-full bg-white border-2 border-brand-accent flex items-center justify-center z-10 md:-translate-x-1/2 shadow-[0_4px_12px_rgba(0,139,139,0.15)]">
                  <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] p-8 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-brand-accent/30 hover:shadow-xl transition-all duration-500 group`}>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-heading font-black italic uppercase tracking-tighter text-brand-accent group-hover:scale-110 transition-transform origin-left">
                        {cycle.period}
                      </span>
                      <div className="px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full">
                        <span className="text-[9px] font-mono font-black text-brand-accent uppercase tracking-widest">{cycle.status}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Programmes Covered</h4>
                      <p className="text-lg font-heading font-black italic uppercase tracking-tight text-slate-800 group-hover:text-slate-900 transition-colors leading-tight">
                        {cycle.programs}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-accent/5 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/10 transition-colors">
                        <ShieldCheck size={16} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-widest">Quality Assurance Audit Passed</span>
                    </div>
                  </div>
                </div>

                {/* Empty spacer for desktop layout */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing decorative element */}
        <div className="mt-24 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl"
          >
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-[0.3em]">Timeline Baseline: Established 2005</span>
          </motion.div>
        </div>
      </section>

      {/* ── 04. AICTE & MAKAUT ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none grayscale invert" style={{ backgroundImage: 'url("https://www.nsec.ac.in/images/nba-logo.png")', backgroundSize: '400px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* AICTE Section */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <Building2 size={24} />
                </div>
                <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-slate-900">AICTE Approvals</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Engg & MBA (2025-26)", url: "https://www.nsec.ac.in/circular/EOA-Report-25-26_%20E&T.PDF" },
                  { title: "MCA & BCA Program (2025-26)", url: "https://www.nsec.ac.in/circular/EOA-Report-25-26MCA.PDF" },
                  { title: "Engg & MBA (2024-25)", url: "https://www.nsec.ac.in/circular/EOA-Report-2024-25_BTech.PDF" },
                  { title: "MCA & BCA Program (2024-25)", url: "https://www.nsec.ac.in/circular/EOA-REPORT-2024-2025-MCA-BCA.PDF" }
                ].map((doc, i) => (
                  <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" className="p-5 bg-white border border-slate-100 rounded-2xl flex items-center justify-between hover:border-brand-accent/40 hover:shadow-lg transition-all group">
                    <span className="text-[13px] font-heading font-black italic uppercase tracking-tight text-slate-800">{doc.title}</span>
                    <Download size={16} className="text-slate-300 group-hover:text-brand-accent group-hover:translate-y-1 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* MAKAUT Section */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-xl bg-brand-maroon/10 flex items-center justify-center text-brand-maroon">
                  <Globe size={24} />
                </div>
                <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-slate-900">MAKAUT Affiliations</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "All B.Tech Programs", url: "https://www.nsec.ac.in/circular/109-BTECH-2025-26.pdf" },
                  { name: "All M.Tech Programs", url: "https://www.nsec.ac.in/circular/109-MTECH-2025-26.pdf" },
                  { name: "MCA Program", url: "https://www.nsec.ac.in/circular/291-MCA-2025-26.pdf" },
                  { name: "MBA Program", url: "https://www.nsec.ac.in/circular/109-MBA-2025-26.pdf" },
                  { name: "BCA Program", url: "https://www.nsec.ac.in/circular/291-BCA-2025-26.pdf" },
                  { name: "BBA Program", url: "https://www.nsec.ac.in/circular/109-BBA-2025.pdf" },
                  { name: "BBA (Hospital Mgmt)", url: "https://www.nsec.ac.in/circular/109%20-BBA%28Spl%29-2-25-26.pdf" },
                  { name: "BBA Digital Marketing", url: "https://www.nsec.ac.in/circular/109%20-BBA%28Spl%29-2-25-26.pdf" }
                ].map((prog, i) => (
                  <a key={i} href={prog.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white border border-slate-50 rounded-xl hover:border-brand-maroon/20 hover:bg-slate-50 transition-all group">
                    <CheckCircle2 size={14} className="text-brand-accent shrink-0 group-hover:scale-110" />
                    <span className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-tight leading-none">{prog.name} [2025-26]</span>
                  </a>
                ))}
              </div>
              <a href="https://www.nsec.ac.in/page.php?id=533" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.2em] hover:translate-x-2 transition-transform">
                View All Affiliation Letters <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* ── 04. ACCREDITATION TIMELINE ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-slate-50 overflow-hidden border-y border-slate-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <SectionHeading title="Accreditation Journey" tagline="Chronological milestones of institutional excellence." />
        
        <div className="max-w-5xl mx-auto mt-20 relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12 relative">
            {historicalCycles.map((cycle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`flex-1 w-full ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                    <div className={`absolute top-0 bottom-0 w-1.5 bg-brand-accent ${i % 2 === 0 ? 'right-0' : 'left-0'}`} />
                    <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-2 block">{cycle.status}</span>
                    <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-2 leading-none">{cycle.period}</h3>
                    <p className="text-lg font-heading font-black italic uppercase tracking-tight text-slate-500 mb-4">{cycle.programs}</p>
                    <div className="flex flex-wrap gap-2 justify-end md:justify-start">
                      {cycle.programs.split(', ').map((p, pi) => (
                        <span key={pi} className="px-3 py-1 bg-slate-50 rounded-lg text-[9px] font-mono font-bold text-slate-400 group-hover:bg-brand-accent/10 group-hover:text-brand-accent transition-colors">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dot */}
                <div className="relative z-10 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center text-brand-accent shadow-lg group-hover:scale-110 transition-transform">
                    <History size={20} />
                  </div>
                </div>

                {/* Spacer for reverse layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── 05. ACCREDITATION NODE ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-white overflow-hidden">

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-6">Accreditation Node</h2>
            <div className="space-y-4">
              {[
                { title: "NBA Certificate (2024 - 2027)", url: "https://www.nsec.ac.in/impdoc/Netaji_Subhash_Engineering_College8_4_2024_16_32_35.pdf" },
                { title: "NBA Certificate (2019 - 2022)", url: "https://www.nsec.ac.in/impdoc/nba-nsec-2019-2022.pdf" },
                { title: "Historical Certificates (2005 - 2019)", url: "https://www.nsec.ac.in/impdoc/NBA_Accreditation_2005-2019_opt.pdf" }
              ].map((doc, i) => (
                <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:border-brand-accent/40 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent"><FileText size={20} /></div>
                    <span className="text-lg font-heading font-black italic uppercase tracking-tight text-slate-800 group-hover:text-brand-accent transition-colors">{doc.title}</span>
                  </div>
                  <Download size={20} className="text-slate-300 group-hover:text-brand-accent group-hover:translate-y-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 bg-brand-accent/[0.03] rounded-3xl p-10 border border-brand-accent/10 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-6">Why NBA Matters?</h3>
              <div className="grid grid-cols-1 gap-6">
                {[
                  { icon: CheckCircle, text: "Global recognition of technical degrees under the Washington Accord." },
                  { icon: CheckCircle, text: "Assurance of quality education through outcome-based evaluation." },
                  { icon: CheckCircle, text: "Enhanced employability and preference by global industry leaders." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-accent"><item.icon size={20} /></div>
                    <p className="text-[15px] font-body font-medium text-slate-600 leading-relaxed pt-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
