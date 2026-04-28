import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lightbulb, Users, Rocket, Building2, FileText, Download, CheckCircle2, ChevronRight, ExternalLink, Zap, Target, Trophy, Cpu, Wrench, Calendar, Activity, Image as ImageIcon, Video, Mail, Hammer, Cog, Microscope, BookOpen, X } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import MinCard from '../components/minCard';

void motion;

/* ═══════════════════════════════════════════════════════════
   HIGHLIGHT IMPORTANT WORDS
   ═══════════════════════════════════════════════════════════ */
const BOLD_KEYWORDS = [
  'AICTE', 'IDEA Lab', 'Idea Development, Evaluation and Application', 'NSEC',
  'Innovation', 'Entrepreneurship', 'Prototyping', 'Design Thinking', '2024-25',
  'Academic Excellence', 'Maker Space', 'Tender Document'
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

export default function IdeaLab() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);

  const carouselPhrases = [
    { main: "IDEA", highlight: "DEVELOPMENT" },
    { main: "PROTOTYPING", highlight: "EXCELLENCE" },
    { main: "MAKER", highlight: "SPACE" },
    { main: "FUTURE", highlight: "FABRICATION" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselPhrases.length]);



  const resourceCards = [
    { title: "Committee", icon: Users, path: "#committee", type: "anchor", desc: "Governance and leadership of the IDEA Lab." },
    { title: "Events & Activities", icon: Calendar, path: "#events", type: "anchor", desc: "Workshops, bootcamps, and innovation fests." },
    { title: "Projects", icon: Rocket, path: "#projects", type: "anchor", desc: "Real-world prototypes and student innovations." },
    { title: "Facilities Available", icon: Wrench, path: "#facilities", type: "anchor", desc: "High-end fabrication and testing equipment." },
    { title: "Photo Gallery", icon: ImageIcon, path: "#gallery", type: "anchor", desc: "Visual journey of innovation at NSEC." },
    { title: "Video Gallery", icon: Video, path: "#videos", type: "anchor", desc: "Demos and sessions from the lab." },
    { title: "Contact Us", icon: Mail, path: "#contact", type: "anchor", desc: "Connect with the lab administration." },
    { title: "Tender Document", icon: Download, path: "https://www.nsec.ac.in/notice/Tender-Document-for-AICTE-IDEA-LAB_03-09-2025.pdf", type: "pdf", desc: "Equipment procurement documentation." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-accent/30">
      {/* ── HERO SECTION ── */}
      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="IDEA"
        titleFill="LAB"
        statutoryLabel="AICTE NSEC INITIATIVE"
        policyLabel=""
        rightLabel="Maker.Space"
        useYellowAccents={true}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Transforming', 'raw', 'concepts', 'into', 'marketable', 'products', 'through'].map((word, i) => (
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
                  Advanced Fabrication
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



      {/* ── 02. ABOUT & MISSION ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Core Mandate</span>
            <h2 className="text-5xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8 leading-none">
              AICTE IDEA <br/> <span className="text-brand-accent">Innovation</span>
            </h2>
            <div className="space-y-6">
              <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-accent" />
                <p className="text-[15px] font-body font-medium text-slate-600 leading-relaxed italic">
                  <HighlightText text="Netaji Subhash Engineering College (NSEC) has established the AICTE IDEA (Idea Development, Evaluation and Application) Lab under the AICTE IDEA Scheme 2024-25. This state-of-the-art facility is a significant step in fostering innovation, creativity, and entrepreneurship among students and faculty members." />
                </p>
              </div>
              <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-maroon" />
                <p className="text-[15px] font-body font-medium text-slate-600 leading-relaxed italic">
                  <HighlightText text="The lab is designed to provide an ecosystem that promotes hands-on learning, research, and encourages students to bring their ideas to life, collaborate with industry professionals, and work on real-world projects." />
                </p>
              </div>
            </div>
          </div>

          <MinCard
            variant="accent"
            icon={Hammer}
            badge="Core Mandate"
            title="Strategic Goals"
            description="Goals shaping the innovation and prototyping ecosystem at the IDEA Lab."
            className="relative pt-12 h-full border border-slate-200"
            contentClassName="gap-5"
          >
            <div className="grid grid-cols-1 gap-3">
              {[
                { title: "Entrepreneurial Mindset", desc: "Cultivating the ability to commercialize innovative solutions." },
                { title: "Academia-Industry Bridge", desc: "Creating a strong foundation for future technology leaders." },
                { title: "Tangible Prototypes", desc: "Transforming concepts into products, or services." },
                { title: "Global Challenges", desc: "Addressing real-world problems through design thinking." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl border border-white/10 bg-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#fbbf24] flex items-center justify-center text-brand-blue shrink-0"><CheckCircle2 size={16} /></div>
                  <div>
                    <h4 className="text-[11px] font-mono font-black uppercase tracking-widest text-white">{item.title}</h4>
                    <p className="text-[12px] font-body text-white/80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </MinCard>
        </div>
      </section>

      {/* ── 03. RESOURCE PORTALS ── */}
      <section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white border-y border-slate-200">
        <SectionHeading title="IDEA Hub" tagline="Resources, Committees, and Fabrication Portals." />
        
        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourceCards.map((card, i) => (
            <MinCard
              key={i}
              href={card.path}
              target={card.type === 'pdf' ? "_blank" : "_self"}
              icon={card.icon}
              title={card.title}
              description={card.desc}
              variant={card.type === 'pdf' ? 'accent' : 'slate'}
              index={i}
              center
              actionLabel={card.type === 'pdf' ? 'Download' : 'Open Portal'}
            />
          ))}
        </div>
      </section>

      {/* ── 04. IDEA LAB SNAPSHOT ── */}
      <section id="facilities" className="pt-16 pb-24 px-8 lg:px-24 bg-white relative overflow-hidden">
        <SectionHeading
          title="IDEA Lab Snapshot"
          tagline="A visual look at the fabrication and prototyping space."
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.08)] border border-slate-200/60 mt-12"
        >
          <div className="flex items-center justify-between px-6 py-4 bg-white">
            <div className="flex items-center gap-5">
              <div className="flex gap-2">
                {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${c} opacity-60`} />
                ))}
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white/[0.06] rounded-lg border border-slate-200">
                <Building2 size={11} className="text-brand-accent/60" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  IDEA-Lab-Snapshot.jpg
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-[78vh] bg-white">
            <img
              src="/assets/HeroFocus/nsec-idealab-fp01.jpg"
              alt="IDEA Lab snapshot"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/assets/HeroFocus/Campus_Life1.webp'; }}
            />
          </div>
        </motion.div>
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
