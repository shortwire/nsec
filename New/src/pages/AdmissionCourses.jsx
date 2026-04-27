import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Users, Clock, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

function IntakeCard({ course, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.9), rgba(0,139,139,0.4), transparent)' }} />
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
          <GraduationCap size={24} />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono font-black text-brand-muted uppercase tracking-widest">Intake</span>
          <span className="text-2xl font-heading font-black italic text-brand-blue">{course.intake}</span>
        </div>
      </div>
      <h3 className="text-[15px] font-heading font-black italic uppercase tracking-tight text-slate-800 mb-4 min-h-[45px]">{course.name}</h3>
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-brand-accent" />
          <span className="text-[12px] font-body font-bold text-slate-500">{course.tenure}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AdmissionCourses() {
  const [config, setConfig] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const phrases = [
    { main: 'COURSES', highlight: 'OFFERED' },
    { main: 'ANNUAL', highlight: 'INTAKE' },
    { main: 'UG & PG', highlight: 'PROGRAMS' },
    { main: 'DIPLOMA', highlight: 'COURSES' },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentIdx(p => (p + 1) % phrases.length), 4000);
    return () => clearInterval(t);
  }, [phrases.length]);

  useEffect(() => {
    fetch('/config/admission-intake.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(console.error);
  }, []);

  if (!config) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <PageHero showParticles={false} maxHeight="33vh" titleStroke="COURSES" titleFill="OFFERED"
        useYellowAccents={true} statutoryLabel={<span className="text-[#fbbf24]">ADMISSION 2025-26</span>}
        policyLabel="" rightLabel={<span className="text-[#fbbf24]">Intake Details</span>}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Explore', 'our', 'diverse', 'range', 'of', 'academic'].map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }} className="text-white/70 text-[15px] font-body font-medium">{w}</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.88 }} className="relative inline-block">
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ textShadow: '0 0 25px rgba(0,139,139,0.5)' }}>programmes</span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 1.1 }} className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block" />
              </motion.span>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="h-8 relative w-full mt-2">
              <AnimatePresence mode="wait">
                <motion.div key={currentIdx} initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }} transition={{ duration: 0.8 }} className="absolute inset-0 flex items-center flex-wrap gap-2">
                  <span className="font-heading font-black italic uppercase tracking-tighter text-white" style={{ fontSize: 'clamp(0.9rem,1.8vw,1.5rem)' }}>{phrases[currentIdx].main}</span>
                  <span className="font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ fontSize: 'clamp(0.9rem,1.8vw,1.5rem)' }}>{phrases[currentIdx].highlight}</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        }
      />
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5) 30%, rgba(251,191,36,0.5) 70%, transparent)' }} />

      <section className="relative pt-16 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        {/* UG PROGRAMS */}
        <div className="max-w-7xl mx-auto mb-20">
          <SectionHeading title="Undergraduate" tagline="Bachelor of Technology & Management Programmes" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
            {config.courses.ug.map((course, i) => (
              <IntakeCard key={i} course={course} index={i} />
            ))}
          </div>
        </div>

        <div className="h-[1px] w-full my-16" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

        {/* PG PROGRAMS */}
        <div className="max-w-7xl mx-auto mb-20">
          <SectionHeading title="Postgraduate" tagline="M.Tech, MBA & MCA Programmes" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
            {config.courses.pg.map((course, i) => (
              <IntakeCard key={i} course={course} index={i} />
            ))}
          </div>
        </div>

        <div className="h-[1px] w-full my-16" style={{ background: 'linear-gradient(to right, transparent, rgba(0,139,139,0.12) 30%, rgba(0,139,139,0.12) 70%, transparent)' }} />

        {/* DIPLOMA PROGRAMS */}
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Diploma" tagline="Polytechnic Engineering Programmes" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
            {config.courses.diploma.map((course, i) => (
              <IntakeCard key={i} course={course} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
