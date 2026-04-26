import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, FileText, Download, CheckCircle2, ChevronRight, History, MessageSquare, ExternalLink, Lightbulb, Rocket, Search, Mail, Zap, Activity, BookOpen, X } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

/* ═══════════════════════════════════════════════════════════
   HIGHLIGHT IMPORTANT WORDS
   ═══════════════════════════════════════════════════════════ */
const BOLD_KEYWORDS = [
  'ARIIA', 'Atal Ranking of Institutions on Innovation Achievements', 'Innovation',
  'Entrepreneurship', 'Submitted Data', 'Transparency', 'Institutional Innovation'
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

export default function Ariia() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);

  const carouselPhrases = [
    { main: "INNOVATION", highlight: "RANKING" },
    { main: "ATAL", highlight: "ACHIEVEMENTS" },
    { main: "FUTURE", highlight: "PIONEERING" },
    { main: "RESEARCH", highlight: "EXCELLENCE" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const rankings = [
    {
      year: "2021",
      title: "ARIIA 2021 Report",
      status: "Final Submission",
      docs: [
        { label: "Full Report 2021", url: "https://www.nsec.ac.in/notice/ARIIA-2021.pdf", type: "pdf" }
      ]
    },
    {
      year: "2020",
      title: "ARIIA 2020 Data",
      status: "Submitted",
      docs: [
        { label: "Submitted Data 2020", url: "https://www.nsec.ac.in/notice/ARIIA_NSEC_2020.pdf", type: "pdf" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-accent/30">
      {/* ── HERO SECTION ── */}
      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="ARIIA"
        titleFill="PORTAL"
        statutoryLabel="ATAL RANKING OF INSTITUTIONS"
        policyLabel=""
        rightLabel="Innovation.Index"
        useYellowAccents={true}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['National', 'benchmark', 'for', 'Innovation', '&', 'Entrepreneurship', 'among'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.32, 1] }}
                  className="text-white/70 text-[15px] font-body font-medium"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.86, ease: [0.16, 1, 0.32, 1] }}
                className="relative inline-block"
              >
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ textShadow: '0 0 25px rgba(0,139,139,0.5), 0 0 50px rgba(0,139,139,0.3)' }}>
                  Pioneering Spirit
                </span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.32, 1] }} className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block" />
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

      {/* ── 01. QUICK STATS ── */}
      <section className="relative pt-24 pb-16 px-8 lg:px-24 bg-white">
        <SectionHeading title="ARIIA Node" tagline="Institutional metrics for innovation and startup ecosystem." />
        
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { label: "Focus Area", value: "Innovation", icon: Lightbulb, bgImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" },
            { label: "Metric Type", value: "National", icon: Search, bgImg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" },
            { label: "Status", value: "Verified", icon: ShieldCheck, bgImg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-10 bg-slate-900 rounded-[24px] border border-slate-800 shadow-xl flex flex-col items-center text-center
                         hover:shadow-[0_20px_40px_rgba(0,139,139,0.15)] hover:border-brand-accent/40
                         transition-all duration-500 overflow-hidden"
            >
              {/* Background Image Overlay */}
              <div className="absolute inset-0 z-0 opacity-80 pointer-events-none bg-center bg-cover rounded-[24px] transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]" style={{ backgroundImage: `url('${stat.bgImg}')` }} />
              <div className="absolute inset-0 z-0 bg-slate-900/80 group-hover:bg-slate-900/60 transition-colors duration-500 rounded-[24px]" />
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-[2] group-hover:bg-brand-accent/30 z-0 blur-xl" />
              <div className="absolute bottom-0 left-0 right-0 h-[3px] z-0 transition-all duration-500" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.8), rgba(251,191,36,0.2), transparent)' }} />

              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-[#fbbf24]/80 flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-white group-hover:scale-110 transition-all duration-500 relative z-10 shadow-[0_0_15px_rgba(0,139,139,0.2)]">
                <stat.icon size={32} />
              </div>
              <p className="text-[10px] font-mono font-black text-white/50 uppercase tracking-[0.3em] mb-2 relative z-10">{stat.label}</p>
              <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-white leading-none relative z-10 drop-shadow-md">{stat.value}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 02. DATA PORTAL ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden border-y border-slate-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {rankings.map((cycle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[40px] p-10 border-[3px] border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-accent/30 transition-all duration-500 group relative"
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                  <Activity size={160} />
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent font-heading font-black italic text-3xl">
                    {cycle.year.slice(2)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-1 block">{cycle.status}</span>
                    <h3 className="text-2xl font-heading font-black italic uppercase tracking-tight text-slate-900">{cycle.title}</h3>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  {cycle.docs.map((doc, di) => (
                    <a
                      key={di}
                      href="#" onClick={(e) => { e.preventDefault(); setSelectedPdf(doc.url); }}
                      
                      
                      className="flex items-center justify-between p-6 bg-white border-2 border-slate-200 rounded-2xl hover:border-brand-accent/40 hover:bg-slate-50 hover:shadow-lg transition-all duration-300 group/item"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-accent shadow-sm group-hover/item:bg-brand-accent group-hover/item: transition-all">
                          <FileText size={20} />
                        </div>
                        <span className="text-lg font-heading font-black italic uppercase tracking-tight text-slate-800 group-hover/item:text-brand-accent transition-colors">{doc.label}</span>
                      </div>
                      <Download size={20} className="text-slate-300 group-hover/item:text-brand-accent transition-all" />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03. TRANSPARENCY & VERIFICATION ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Institutional Ethics</span>
            <h2 className="text-5xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8 leading-none">
              Transparency & <br/> <span className="text-brand-accent">Accuracy</span>
            </h2>
            <div className="p-8 bg-white border border-slate-100 rounded-[32px] relative overflow-hidden">
              <p className="text-[17px] font-body font-medium text-slate-600 leading-relaxed italic">
                "The institution is also ensuring that the <span className="text-brand-accent font-bold">Submitted Data for ARIIA 2020</span>, reflecting on institution's website is correct. We pro-actively examine all comments and feedback to effect corrections, if so warranted."
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <div className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-lg text-[9px] font-mono font-black text-brand-accent uppercase tracking-widest">Data Integrity</div>
              <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">Verified Node</div>
            </div>
          </div>

          <div className="relative p-12 bg-white border-[3px] border-slate-200 rounded-[48px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-brand-accent/30 transition-all duration-500 overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-brand-accent group-hover:scale-110 transition-transform duration-700">
              <Mail size={160} />
            </div>
            <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8 leading-none">Feedback & <span className="text-brand-accent">Comments</span></h3>
            <p className="text-sm font-body font-medium text-slate-600 leading-relaxed mb-8 relative z-10">
              Institutions pro-actively examine comments and feedback related to Submitted Data. Please reach out to the nodal offices below:
            </p>
            <div className="space-y-4 relative z-10">
              {[
                { label: "Principal Office", email: "principal@nsec.ac.in" },
                { label: "Innovation Node", email: "bose.shilpi08@gmail.com" }
              ].map((node, i) => (
                <a
                  key={i}
                  href={`mailto:${node.email}`}
                  className="flex items-center justify-between p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl hover:border-brand-accent/40 hover:bg-white hover:shadow-lg transition-all duration-300 group/node"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shadow-sm group-hover/node:scale-110 transition-all">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest leading-none mb-1 group-hover/node:text-brand-accent transition-colors">{node.label}</p>
                      <p className="text-sm font-heading font-black italic tracking-wide text-slate-800 group-hover/node:text-brand-accent transition-colors">{node.email}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover/node:text-brand-accent group-hover/node:translate-x-1 transition-all" />
                </a>
              ))}
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
