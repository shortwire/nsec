import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, FileText, Download, CheckCircle2, ChevronRight, History, MessageSquare, CheckCircle, Building2, Globe, BookOpen, ExternalLink, X, Clock } from 'lucide-react';
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
      className="group relative rounded-[24px] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden min-h-[340px] flex flex-col justify-end border border-slate-800"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${program.bgImage})` }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/70 group-hover:bg-slate-900/50 transition-colors duration-500" />
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
      
      {/* Background Number */}
      <div className="absolute -top-4 -right-4 text-[120px] font-heading font-black italic text-white opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity z-10">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="relative z-20 flex-1 flex flex-col justify-between">
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform duration-500">
          <Award size={28} />
        </div>
        
        <div>
          <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-white mb-4 leading-tight drop-shadow-md">
            {program.name}
          </h3>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-[10px] font-mono font-black px-2 py-1 bg-brand-accent/20 text-brand-accent border border-brand-accent/30 rounded uppercase tracking-widest backdrop-blur-sm">B.TECH PROGRAM</span>
            <span className="text-[10px] font-mono font-black px-2 py-1 bg-brand-maroon/20 text-brand-maroon border border-brand-maroon/30 rounded uppercase tracking-widest backdrop-blur-sm">ACCREDITED</span>
          </div>
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">Validity</span>
              <span className="text-sm font-heading font-black italic text-[#fbbf24]">{program.validity}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-[4px] bg-brand-accent w-0 group-hover:w-full transition-all duration-700 z-20" />
    </motion.div>
  );
}

export default function Nba() {
  const [selectedPdf, setSelectedPdf] = useState(null);
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
    { name: "Computer Science & Engineering", validity: "2024-25 to 2026-27", bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" },
    { name: "Electronics & Communication Engineering", validity: "2024-25 to 2026-27", bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" },
    { name: "Electrical Engineering", validity: "2024-25 to 2026-27", bgImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80" },
    { name: "Biomedical Engineering", validity: "2024-25 to 2026-27", bgImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80" }
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
        showParticles={false}
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

          <SectionHeading title="Accreditation Status" tagline="National Board of Accreditation (NBA) approved programs at NSEC." />
        </div>
        <div className="max-w-7xl mx-auto mt-12">
          <div className="p-8 bg-white border border-slate-200 rounded-3xl mb-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <img 
              src="/assets/nba/nba_logo.png" 
              alt="NBA Logo" 
              className="h-20 w-auto object-contain shrink-0 cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => window.open('https://www.nbaind.org/', '_blank')}
            />
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

      <section className="relative pt-16 pb-0 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="mb-8 relative">
          <SectionHeading title="Historical Excellence" tagline="A consistent record of accreditation and quality since 2005." />
          <div className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 items-start max-w-5xl mx-auto relative pt-4 pb-16">
            {/* Central Timeline Stem */}
            <div className="absolute left-1/2 top-4 bottom-16 w-[2px] bg-gradient-to-b from-brand-accent/5 via-brand-accent/30 to-brand-accent/5 -translate-x-1/2 hidden md:block rounded-full" />

            {[...historicalCycles].reverse().map((cycle, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative rounded-[20px] bg-gradient-to-br from-brand-accent/[0.02] via-white to-white border border-brand-accent/10 border-l-[3px] border-l-[#fbbf24] shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:-translate-y-[6px] hover:shadow-[0_12px_32px_rgba(0,139,139,0.1)] hover:border-brand-accent/30 transition-all duration-[250ms] ease-out mt-3 ml-3 ${!isEven ? 'md:mt-28' : ''}`}
                >
                  {/* Branch line to center stem */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-[2px] bg-brand-accent/30 ${isEven ? '-right-8' : '-left-8'}`} />
                  {/* Node connecting to stem */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white bg-brand-accent z-20 shadow-[0_0_8px_rgba(0,139,139,0.8)] animate-pulse ${isEven ? '-right-[38px]' : '-left-[38px]'}`} />

                  {/* Number Badge */}
                  <div className="absolute -top-3 -left-4 w-11 h-11 rounded-full bg-[#fbbf24] flex items-center justify-center shadow-[0_2px_4px_rgba(251,191,36,0.2)] group-hover:scale-[1.05] group-hover:shadow-[0_4px_8px_rgba(251,191,36,0.3)] transition-all duration-[250ms] ease-out z-10 border-2 border-white">
                    <span className="text-[12px] font-mono font-black text-slate-900">{String(i + 1).padStart(2, '0')}</span>
                    <div className="absolute top-1/2 left-full w-16 h-[2px] -translate-y-1/2 opacity-70 group-hover:opacity-100 group-hover:w-24 transition-all duration-[250ms] ease-out pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.8), rgba(251,191,36,0.1), transparent)' }} />
                  </div>
                  <div className="p-6 pt-8 flex gap-4 items-start relative z-10">
                    <div className="shrink-0 w-10 h-10 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-[0_2px_8px_rgba(0,139,139,0.1)] group-hover:scale-105 transition-all duration-300">
                      <Clock size={20} />
                    </div>
                    <div className="pt-1 pr-2">
                      <h3 className="text-[18px] font-heading font-black italic uppercase tracking-tighter text-slate-900 group-hover:text-slate-800 transition-colors leading-tight">{cycle.period}</h3>
                      <p className="text-[12px] font-mono font-bold text-brand-accent uppercase tracking-widest mt-1">{cycle.status}</p>
                      <p className="text-[14px] font-body font-medium text-slate-600 mt-2 leading-relaxed">{cycle.programs}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 04. AICTE & MAKAUT ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none grayscale invert" style={{ backgroundImage: 'url("https://www.nsec.ac.in/images/nba-logo.png")', backgroundSize: '400px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* AICTE Section */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <img src="/assets/logo/aicte_logo.png" alt="AICTE Logo" className="h-12 w-auto object-contain" />
                <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-slate-900">AICTE Approvals</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Engg & MBA (2025-26)", url: "https://www.nsec.ac.in/circular/EOA-Report-25-26_%20E&T.PDF" },
                  { title: "MCA & BCA Program (2025-26)", url: "https://www.nsec.ac.in/circular/EOA-Report-25-26MCA.PDF" },
                  { title: "Engg & MBA (2024-25)", url: "https://www.nsec.ac.in/circular/EOA-Report-2024-25_BTech.PDF" },
                  { title: "MCA & BCA Program (2024-25)", url: "https://www.nsec.ac.in/circular/EOA-REPORT-2024-2025-MCA-BCA.PDF" }
                ].map((doc, i) => (
                  <a key={i} href="#" onClick={(e) => { e.preventDefault(); setSelectedPdf(doc.url); }} className="p-5 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-between hover:border-brand-accent/40 hover:shadow-lg transition-all group">
                    <span className="text-[13px] font-heading font-black italic uppercase tracking-tight text-slate-800">{doc.title}</span>
                    <Download size={16} className="text-slate-300 group-hover:text-brand-accent group-hover:translate-y-1 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* MAKAUT Section */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <img src="/assets/logo/makaut_logo.jpg" alt="MAKAUT Logo" className="h-12 w-auto object-contain rounded-md" />
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
                  <a key={i} href="#" onClick={(e) => { e.preventDefault(); setSelectedPdf(prog.url); }} className="flex items-center gap-3 p-3 bg-white border-2 border-slate-200 rounded-xl hover:border-brand-maroon/20 hover:bg-white transition-all group">
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
      {/* ── 05. ACCREDITATION NODE ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-6">Accreditation Node</h2>
            <div className="space-y-4">
              {[
                { title: "NBA Certificate (2024 - 2027)", url: "https://www.nsec.ac.in/impdoc/Netaji_Subhash_Engineering_College8_4_2024_16_32_35.pdf" },
                { title: "NBA Certificate (2019 - 2022)", url: "https://www.nsec.ac.in/impdoc/nba-nsec-2019-2022.pdf" },
                { title: "Historical Certificates (2005 - 2019)", url: "https://www.nsec.ac.in/impdoc/NBA_Accreditation_2005-2019_opt.pdf" }
              ].map((doc, i) => (
                <a key={i} href="#" onClick={(e) => { e.preventDefault(); setSelectedPdf(doc.url); }} className="group flex items-center justify-between p-6 bg-white border-2 border-slate-200 rounded-2xl hover:border-brand-accent/40 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent"><FileText size={20} /></div>
                    <span className="text-lg font-heading font-black italic uppercase tracking-tight text-slate-800 group-hover:text-brand-accent transition-colors">{doc.title}</span>
                  </div>
                  <Download size={20} className="text-slate-300 group-hover:text-brand-accent group-hover:translate-y-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 rounded-3xl p-10 border-2 border-slate-200 relative overflow-hidden">
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


      {/* PDF Modal */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPdf(null)}
            className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <BookOpen size={16} />
                  </div>
                  <h3 className="text-sm font-heading font-black italic uppercase tracking-widest text-slate-800">Document Preview</h3>
                </div>
                <div className="flex items-center gap-2">
                  <a href={selectedPdf} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors" title="Open in new tab">
                    <ExternalLink size={18} />
                  </a>
                  <button onClick={() => setSelectedPdf(null)} className="p-2 rounded-full hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors" title="Close">
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="flex-1 relative">
                <iframe src={selectedPdf} className="absolute inset-0 w-full h-full border-0" title="PDF Preview" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
