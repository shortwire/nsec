import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, BookOpen, ExternalLink, Download, Globe, GraduationCap, Cpu, Laptop, Award, Info, Users, Target, CheckCircle2, ChevronRight, Maximize, Landmark, MessageSquare } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

/* ═══════════════════════════════════════════════════════════
   HIGHLIGHT IMPORTANT WORDS
 ═══════════════════════════════════════════════════════════ */
const BOLD_KEYWORDS = [
  'IQAC', 'Internal Quality Assurance Cell', 'Vision', 'Mission', 'Quality Culture',
  'Continuous Improvement', 'NAAC', 'NBA', 'Outcome-based Education', 'Outcome-based',
  'Transparency', 'Accountability', 'Benchmark', 'Prof. (Dr.) Amal K Ghosh',
  'Dr. Sukumar Roy', 'Academic', 'Administrative', 'AQAR', 'Techno India Group'
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
const VISION_ICONS = [Target, Laptop, Globe, Cpu, Award, Info];

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
   COMPONENT: COMMITTEE MEMBER CARD
 ═══════════════════════════════════════════════════════════ */
function MemberCard({ index, member }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group p-4 bg-white border border-slate-100 rounded-xl hover:border-brand-accent/30 hover:shadow-md transition-all duration-300 flex items-center gap-4"
    >
      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-accent/10 group-hover:text-brand-accent transition-colors">
        <Users size={18} />
      </div>
      <div>
        <h5 className="text-[14px] font-heading font-black italic uppercase tracking-tight text-slate-800">{member.name}</h5>
        <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest">{member.role}</p>
      </div>
    </motion.div>
  );
}

export default function Iqac() {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);

  const carouselPhrases = [
    { main: "INTERNAL QUALITY", highlight: "ASSURANCE CELL" },
    { main: "CONTINUOUS", highlight: "IMPROVEMENT" },
    { main: "OUTCOME BASED", highlight: "EDUCATION" },
    { main: "NAAC & NBA", highlight: "ACCREDITATION" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const visionPoints = [
    "To evolve and implement the measures for continuous enhancement of the academic environment intending an outcome-based education system through modern techniques.",
    "To ensure transparency, accountability and credibility in accordance with internationally acceptable quality assurance practice."
  ];

  const missionPoints = [
    "To nurture the creativity of the students by arranging several national level programs with proper coordination of various departments.",
    "To evaluate the annual progress in terms of academic and administrative activities through proper documentation.",
    "To establish a quality benchmark and institutionalized as well as internationalized the quality culture.",
    "To develop systematic strategies for continuous improvement of the academic and administrative performance of the institution to enhance and ensure the environment of quality culture.",
    "To stimulate the methods for institutionalization of best practices by proper coordination of various activities of documentation and communication through modern technologies.",
    "To promote the methodology of effective teaching-learning of the programs through real time visualization with the scholastic delivery system and implementation of the necessary remedies to reduce the curriculum gap.",
    "To inculcate a creative and innovative ecosystem within the institution and to encourage the social activities within the learners for holistic development.",
    "To become accredited by NAAC and NBA by the coming year to secure a suitable position among the best institutions of this country."
  ];

  const objectives = [
    "Formulate and apply the quality benchmarks/parameters for various academic and administrative activities of the institution.",
    "Instill quality culture in terms instructional delivery and assessment processes for quality sustenance and enhancement.",
    "Publish and disseminate information on various quality parameters of higher education.",
    "Create and facilitate learner-centric education through appropriate methodologies.",
    "Develop and arrange feedback responses from students, parents and other stakeholders on quality-related institutional processes.",
    "Monitor and document various academic activities leading to quality improvement.",
    "Develop and maintain institutional database for enhancing the institutional quality.",
    "Plan and organize training program, workshops, seminars, etc for continuous quality improvement.",
    "Prepare the Annual Quality Assurance report (AQAR) as per NAAC guidelines."
  ];

  const committee = [
    { name: "Prof. (Dr.) Amal K Ghosh", role: "Chairperson (Principal)" },
    { name: "Dr. Sukumar Roy", role: "Coordinator (Dean-Academic)" },
    { name: "Dr. Arindam Roy", role: "Management Representative (TIG)" },
    { name: "Mr. Soumava Goswami", role: "Senior Admin Officer" },
    { name: "Prof. Indranil Ghosh", role: "Teacher Rep (BESH)" },
    { name: "Prof. Anupam Ghosh", role: "Teacher Rep (CSE)" },
    { name: "Prof. Anupam Bera", role: "Teacher Rep (IT)" },
    { name: "Prof. Silpi Bose", role: "Teacher Rep (CSE)" },
    { name: "Prof. Tridibesh Nag", role: "Teacher Rep (EE)" },
    { name: "Prof. Krishnendu Bhattacharyya", role: "Teacher Rep (BESH)" },
    { name: "Prof. Koushik Dutta", role: "Teacher Rep (ECE)" },
    { name: "Mrs. Papiya Halder", role: "Local Society Nominee" },
    { name: "Mr. Aritra Bag", role: "Student Nominee" },
    { name: "Mr. Sumanta Chatterjee", role: "Alumni Nominee" },
    { name: "Mr. Manik Sarkar", role: "Employer Nominee (Lexmark)" },
    { name: "Mr. R.N. Ghosh", role: "Stakeholder Nominee" },
    { name: "Mr. Digbijoy Chakraborty", role: "Industrialist Nominee" }
  ];

  const reports = [
    { year: "2023-24", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2023-2024.pdf" },
    { year: "2022-23", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2022-2023.pdf" },
    { year: "2021-22", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2021-2022.pdf" },
    { year: "2020-21", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2020-2021.pdf" },
    { year: "2019-20", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2019-2020.pdf" },
    { year: "2018-19", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2018-2019.pdf" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ── 01. HERO ── */}
      <PageHero
        showParticles={false}
        maxHeight="33vh"
        titleStroke="IQAC"
        titleFill="CELL"
        useYellowAccents={true}
        statutoryLabel="ESTD. 2013"
        policyLabel=""
        rightLabel="Strategic.Quality.Node"
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Ensuring', 'high', 'standards', 'of', 'excellence', 'in'].map((word, i) => (
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
                  Institutional Operations
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
          tagline="The foundational quality benchmarks of NSEC."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto mt-12">
          {/* Vision Column */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-slate-900">Institutional Vision</h3>
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
              <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-slate-900">Core Mission</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {missionPoints.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4  rounded-lg border-l-2 border-brand-maroon/30 text-[13px] font-body font-medium text-slate-600 leading-relaxed"
                >
                  {p}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. OBJECTIVES ── */}
      <section className="relative py-16 px-8 lg:px-24 ">
        <SectionHeading
          title="Functions & Objectives"
          tagline="Strategic goals for quality sustenance and enhancement."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-12">
          {objectives.map((obj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-brand-accent/40 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-4">
                <Award size={16} />
              </div>
              <p className="text-[14px] font-body font-medium text-slate-700 leading-relaxed">
                {obj}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 04. COMPOSITION ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" />
        <SectionHeading
          title="IQAC Composition"
          tagline="The leadership and committee driving quality assurance."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto mt-12">
          {committee.map((m, i) => (
            <MemberCard key={i} index={i} member={m} />
          ))}
        </div>
      </section>

      {/* ── 05. LINKS & REPORTS ── */}
      <section className="relative py-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-slate-800 italic uppercase tracking-tighter text-maroon mb-6">Important Links</h2>
            <div className="space-y-4">
              {[
                { title: "Composition & Functions (Order)", url: "https://www.nsec.ac.in/impdoc/230710_1_IQAC_Office%20Order.pdf" },
                { title: "Meeting & Action Taken Reports", url: "https://www.nsec.ac.in/page.php?id=514" },
                { title: "AQAR Submissions", url: "https://www.nsec.ac.in/page.php?id=512" }
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:bg-brand-accent/5 hover:border-brand-accent/30 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                      <ExternalLink size={20} />
                    </div>
                    <span className="text-lg font-heading font-black italic uppercase tracking-tight text-slate-700 group-hover:text-brand-accent">{link.title}</span>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 group-hover:text-brand-accent transition-all" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-slate-800 mb-6">Annual Reports</h2>
            <div className="grid grid-cols-2 gap-4">
              {reports.map((report, i) => (
                <a
                  key={i}
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:bg-brand-maroon/5 hover:border-brand-maroon/30 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Download size={16} className="text-brand-maroon group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-mono font-bold text-slate-600 group-hover:text-brand-maroon">{report.year}</span>
                  </div>
                  <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-maroon/60">PDF</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
