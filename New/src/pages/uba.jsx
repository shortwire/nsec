import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  MapPin, 
  Users, 
  Globe, 
  Building2, 
  Leaf, 
  Heart,
  MessageSquare,
  FileText,
  Download,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Globe2,
  TreePine,
  Sprout
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

/* ═══════════════════════════════════════════════════════════
   HIGHLIGHT IMPORTANT WORDS
   ═══════════════════════════════════════════════════════════ */
const BOLD_KEYWORDS = [
  'Unnat Bharat Abhiyan', 'UBA', 'MHRD', 'Ministry of Human Resource Development',
  'Netaji Subhash Engineering College', 'NSEC', 'Participating Institute', 'PI',
  'IIT Kharagpur', 'Regional Coordinating Institute', 'RCI', 'Rural India',
  'Human development', 'Material development', 'Sustainable development'
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

export default function UbaPage() {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);

  const carouselPhrases = [
    { main: "RURAL", highlight: "TRANSFORMATION" },
    { main: "COMMUNITY", highlight: "EMPOWERMENT" },
    { main: "KNOWLEDGE", highlight: "BRIDGE" },
    { main: "SUSTAINABLE", highlight: "GROWTH" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Participating Institute", value: "NSEC Garia", icon: Building2 },
    { label: "Adopted Villages", value: "05 Clusters", icon: MapPin },
    { label: "Mentoring RCI", value: "IIT Kharagpur", icon: GraduationCap }
  ];

  const ubaData = {
    about: "Unnat Bharat Abhiyan (UBA) is a flagship programme of the Ministry of Human Resource Development (MHRD), Govt. of India, with the intention to enrich Rural India. This mission is targeted to use the knowledge base and resources available in the higher technical institutions to bring in transformational change in the rural development process. Institutions through faculty and students will carry out studies of living conditions in the adopted villages, assess the local problems and needs, and to improve the quality of rural life through innovative and affordable technological interventions.",
    nsecRole: "Netaji Subhash Engineering College (NSEC), Garia, Kolkata, WB, is one of the Participating Institute (PI) under Unnat Bharat Abhiyan mission and mentored by Indian Institute of Technology, Kharagpur (IITKgp) as a Regional Coordinating Institute (RCI). The institute has formed a UBA Cell comprising of an active working group consisting of motivated faculty and staff members, NSS unit and NSEC-Rotaract Club.",
    villages: [
      { name: "Ranabhutia", region: "Near NSEC Campus", district: "24 Parganas (South)", type: "Local" },
      { name: "Jagatipata", region: "Near NSEC Campus", district: "24 Parganas (South)", type: "Local" },
      { name: "Kantipota", region: "Near NSEC Campus", district: "24 Parganas (South)", type: "Local" },
      { name: "Kamdebpur", region: "Sundarban", district: "24 Parganas (South)", type: "Remote" },
      { name: "Paschim Sripatinagar", region: "Sundarban", district: "24 Parganas (South)", type: "Remote" }
    ],
    focus: [
      "To develop linkage with selective rural clusters and involve in the planning process.",
      "To promote the requisite Science and Technology interventions to improvise and expedite developmental efforts.",
      "To develop competency of the working group by appropriate orientation and training.",
      "To upgrade the capabilities of both public and private organizations in the society.",
      "To bring in transformational change in the rural developmental process."
    ],
    functions: [
      "Engage faculty and students in understanding rural realities and assessment of local problems.",
      "Identify and assess the local problems and needs in the adopted villages.",
      "Customize indigenous technology as per the local needs.",
      "Devise implementation methods for innovative solutions and sustainable development.",
      "Effective implementation of various government programmes."
    ],
    interventions: {
      human: [
        { title: "Health", icon: Heart },
        { title: "Education & Culture", icon: GraduationCap },
        { title: "Values", icon: ShieldCheck },
        { title: "Skills & Entrepreneurship", icon: Users }
      ],
      material: [
        { title: "Organic Agriculture", icon: Sprout },
        { title: "Water Management", icon: Leaf },
        { title: "Renewable Energy", icon: Globe2 },
        { title: "Artisans & Rural Industries", icon: Building2 },
        { title: "Local Natural Resources", icon: TreePine },
        { title: "Basic Amenities", icon: MapPin },
        { title: "E-support (IT-enabling)", icon: Globe }
      ]
    },
    coordinators: [
      {
        name: "Dr. Sukumar Roy",
        role: "Professor-Dept. of Biomedical Engineering",
        designation: "Coordinator-UBA Cell",
        email: "sroybme@gmail.com, sukumar.roy@nsec.ac.in",
        phone: "9433408287",
        desk: "Students joining this project can develop behavioral interactive skills and bring solution of real-life problems faced by the communities in a spirit of mutual benefit. Being the Coordinator of UBA Cell, I would like to invite all stakeholders to join in this novel initiative for imparting knowledge, technology and useful man-hours to the rural community."
      },
      {
        name: "Dr. Partha Sarathi Pal",
        role: "Professor-Electrical Engineering",
        designation: "Co-coordinator-UBA Cell",
        email: "pspal@nsec.ac.in",
        desk: "Our mission is to bridge the gap between theory and practice through community engagement, ensuring that technical education serves the real-world needs of rural India."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-accent/30">
      {/* ── HERO SECTION ── */}
      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="UNNAT"
        titleFill="BHARAT"
        statutoryLabel="Abhiyan"
        policyLabel=""
        rightLabel="UBA.Cell.NSEC"
        useYellowAccents={true}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Bridging', 'the', 'gap', 'between', 'institutional', 'knowledge', 'and'].map((word, i) => (
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
                  Rural Excellence
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
        <SectionHeading title="UBA Status" tagline="Participating Institute under the Ministry of Education." />
        
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[24px]  border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl hover:border-brand-accent/20 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-accent/5 border border-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-500">
                <stat.icon size={32} />
              </div>
              <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
              <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-slate-900 leading-none">{stat.value}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 02. OVERVIEW ── */}
      <section className="relative py-24 px-8 lg:px-24  overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">National Mission</span>
            <h2 className="text-5xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8 leading-none">
              Transforming <br/> <span className="text-brand-accent">Rural Life</span>
            </h2>
            <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-accent" />
              <p className="text-lg font-body font-medium text-slate-600 leading-relaxed italic">
                <HighlightText text={ubaData.about} />
              </p>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <div className="p-6 bg-white border border-slate-100 rounded-2xl flex-1 group hover:border-brand-accent/30 transition-all">
                <h4 className="text-sm font-heading font-black italic uppercase tracking-tight text-slate-800 mb-2">Mentoring RCI</h4>
                <p className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest leading-relaxed">IIT Kharagpur (IITKgp)</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-2xl flex-1 group hover:border-brand-accent/30 transition-all">
                <h4 className="text-sm font-heading font-black italic uppercase tracking-tight text-slate-800 mb-2">PI Institutional Code</h4>
                <p className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest leading-relaxed">NSEC Garia, PI</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-brand-accent/5 rounded-[40px] blur-2xl" />
            <div className="relative bg-white border border-slate-100 rounded-[40px] p-8 shadow-xl overflow-hidden">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-50">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent"><ShieldCheck size={24} /></div>
                <h3 className="text-xl font-heading font-black italic uppercase tracking-tight text-slate-800">The NSEC UBA Cell</h3>
              </div>
              <p className="text-[15px] font-body font-medium text-slate-500 leading-relaxed mb-8">
                <HighlightText text={ubaData.nsecRole} />
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['NSS Unit', 'Rotaract Club', 'Faculty Group', 'Motivated Staff'].map((tag, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2  rounded-lg text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest group hover:bg-brand-accent hover:text-white transition-all">
                    <CheckCircle2 size={12} className="text-brand-accent group-hover:text-white" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. ADOPTED VILLAGES ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-white">
        <SectionHeading title="Adopted Villages" tagline="Direct technological and knowledge support to rural clusters." />
        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {ubaData.villages.map((village, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-accent/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`px-2 py-1 rounded text-[9px] font-mono font-black uppercase tracking-widest ${village.type === 'Local' ? 'bg-brand-accent/10 text-brand-accent' : 'bg-brand-maroon/10 text-brand-maroon'}`}>{village.type} Node</div>
                <MapPin size={16} className="text-slate-200 group-hover:text-brand-accent transition-colors" />
              </div>
              <h4 className="text-lg font-heading font-black italic uppercase tracking-tight text-slate-800 mb-1 leading-tight group-hover:text-brand-accent transition-colors">{village.name}</h4>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">{village.region}</p>
              <div className="pt-4 border-t border-slate-50">
                <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest">District: {village.district}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 04. INTERVENTION DOMAINS ── */}
      <section className="relative py-24 px-8 lg:px-24  overflow-hidden border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Human Development */}
          <div className="bg-white rounded-[40px] p-12 border border-slate-100 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <Users size={160} />
            </div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Domain Alpha</span>
            <h3 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8 leading-none">
              Human <br/> <span className="text-brand-accent">Development</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {ubaData.interventions.human.map((item, i) => (
                <div key={i} className="flex gap-4 p-4  rounded-2xl border border-transparent hover:border-brand-accent/20 hover:bg-white transition-all group/item">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-300 group-hover/item:text-brand-accent group-hover/item:border-brand-accent/30 transition-all shrink-0">
                    <item.icon size={20} />
                  </div>
                  <span className="text-[13px] font-heading font-black italic uppercase tracking-tight text-slate-700 pt-1 leading-none">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Material Development */}
          <div className=" rounded-[40px] p-12 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Leaf size={160} />
            </div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Domain Beta</span>
            <h3 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-white mb-8 leading-none">
              Material <br/> <span className="text-brand-accent">Development</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {ubaData.interventions.material.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-brand-accent transition-all group/item">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/40 group-hover/item:text-brand-accent transition-all shrink-0">
                    <item.icon size={18} />
                  </div>
                  <span className="text-[11px] font-heading font-black italic uppercase tracking-tight text-white/70 pt-1 leading-none group-hover/item:text-white transition-colors">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 05. FOCUS & FUNCTIONS ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Strategic Focus</span>
            <h2 className="text-5xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8 leading-none">
              Cell Major <br/> <span className="text-brand-accent">Interventions</span>
            </h2>
            <div className="space-y-4">
              {ubaData.focus.map((f, i) => (
                <div key={i} className="flex gap-4 p-5  rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <p className="text-sm font-body font-medium text-slate-600 leading-relaxed italic">"{f}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-12  border border-brand-maroon/10 rounded-[48px] relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-maroon/5 rounded-full blur-3xl" />
            <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8 leading-none">Operational <span className="text-brand-maroon">Functions</span></h3>
            <div className="grid grid-cols-1 gap-6">
              {ubaData.functions.map((fn, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-maroon border border-brand-maroon/10 group-hover:bg-brand-maroon group-hover:text-white transition-all">
                    <span className="font-heading font-black italic text-xl">{i + 1}</span>
                  </div>
                  <p className="text-[15px] font-body font-medium text-slate-500 leading-relaxed pt-1 group-hover:text-slate-800 transition-colors">{fn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 06. COORDINATORS DESK ── */}
      <section className="relative py-24 px-8 lg:px-24  overflow-hidden border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {ubaData.coordinators.map((coord, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-xl overflow-hidden relative group"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-accent group-hover:w-2 transition-all" />
              <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                <div className="w-24 h-24 rounded-3xl  overflow-hidden border-2 border-brand-accent/20 shrink-0">
                  <img src={i === 0 ? "https://www.nsec.ac.in/images/dr-sukumar-roy.jpg" : "https://www.nsec.ac.in/images/faculty/psp.jpg"} alt={coord.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-black italic uppercase tracking-tight text-slate-900 leading-none mb-1">{coord.name}</h3>
                  <p className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-widest mb-1">{coord.designation}</p>
                  <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{coord.role}</p>
                </div>
              </div>
              <p className="text-[15px] font-body font-medium text-slate-500 leading-relaxed mb-8 border-l-2 border-slate-100 pl-6 italic">
                "{coord.desk}"
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">Official Email</p>
                  <p className="text-[11px] font-heading font-black italic text-slate-700">{coord.email.split(',')[0]}</p>
                </div>
                {coord.phone && (
                  <div className="text-right">
                    <p className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">Nodal Extension</p>
                    <p className="text-[11px] font-heading font-black italic text-slate-700">{coord.phone}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>


    </div>
  );
}
