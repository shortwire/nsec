import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lightbulb, 
  Users, 
  Rocket, 
  Building2, 
  FileText, 
  Download, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink,
  Zap,
  Target,
  Trophy,
  Cpu,
  Wrench,
  Calendar,
  Activity,
  Image as ImageIcon,
  Video,
  Mail,
  Hammer,
  Cog,
  Microscope
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

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
  }, []);



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
      <section className="relative py-24 px-8 lg:px-24 bg-slate-50 overflow-hidden">
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

          <div className="relative pt-12">
            <div className="bg-slate-900 rounded-[48px] p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Hammer size={120} />
              </div>
              <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter mb-8 text-brand-accent">Strategic Goals</h3>
              <div className="space-y-4">
                {[
                  { title: "Entrepreneurial Mindset", desc: "Cultivating the ability to commercialize innovative solutions." },
                  { title: "Academia-Industry Bridge", desc: "Creating a strong foundation for future technology leaders." },
                  { title: "Tangible Prototypes", desc: "Transforming concepts into products, or services." },
                  { title: "Global Challenges", desc: "Addressing real-world problems through design thinking." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0"><CheckCircle2 size={16} /></div>
                    <div>
                      <h4 className="text-[11px] font-mono font-black uppercase tracking-widest text-white/80">{item.title}</h4>
                      <p className="text-[12px] font-body text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. RESOURCE PORTALS ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-white border-y border-slate-200">
        <SectionHeading title="IDEA Hub" tagline="Resources, Committees, and Fabrication Portals." />
        
        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourceCards.map((card, i) => (
            <motion.a
              key={i}
              href={card.path}
              target={card.type === 'pdf' ? "_blank" : "_self"}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] hover:bg-white hover:shadow-xl hover:border-brand-accent/20 transition-all group flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:bg-brand-accent group-hover:text-white transition-all mb-6 shadow-sm">
                <card.icon size={24} />
              </div>
              <h4 className="text-[15px] font-heading font-black italic uppercase tracking-tight text-slate-800 mb-1 group-hover:text-brand-accent transition-colors leading-none">{card.title}</h4>
              <p className="text-[10px] font-body font-bold text-slate-400 leading-tight mb-6 italic">{card.desc}</p>
              <div className="mt-auto flex items-center gap-2 text-brand-accent/40 group-hover:text-brand-accent transition-colors">
                <span className="text-[9px] font-mono font-black uppercase tracking-widest">{card.type === 'pdf' ? 'Download' : 'Open Portal'}</span>
                <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── 04. FABRICATION FACILITIES ── */}
      <section id="facilities" className="relative py-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-accent/5 rounded-[48px] blur-3xl" />
            <div className="relative rounded-[48px] overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-brand-accent/10 group-hover:bg-brand-accent/0 transition-colors duration-700" />
              <img 
                src="/assets/HeroFocus/nsec-idealab-fp01.jpg" 
                alt="IDEA Lab Fabrication" 
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.target.src = '/assets/HeroFocus/Campus_Life1.webp'; }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-slate-900 to-transparent">
                <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.3em] mb-2 block">Laboratory Node</span>
                <h4 className="text-3xl font-heading font-black italic uppercase tracking-tight text-white leading-none">Advanced Maker Space</h4>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">State-of-the-Art</span>
            <h2 className="text-5xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8 leading-none">
              Fabrication <br/> <span className="text-brand-accent">& Prototyping</span>
            </h2>
            <div className="space-y-4">
              {[
                { title: "Design Thinking Area", icon: Lightbulb },
                { title: "Rapid Prototyping Unit", icon: Microscope },
                { title: "Fabrication Station", icon: Cog },
                { title: "Testing & Validation Node", icon: Activity }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-accent border border-slate-200 group-hover:bg-brand-accent group-hover:text-white transition-all shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-heading font-black italic uppercase tracking-tight text-slate-800 leading-none mb-1">{item.title}</h4>
                    <p className="text-[11px] font-body text-slate-400">Integrated workflow for conceptual to physical transformation.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
