import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Clock, MapPin, CheckCircle2, GraduationCap, ArrowRight, MousePointerClick } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

export default function AdmissionCounselling() {
  const [config, setConfig] = useState(null);
  useEffect(() => { fetch('/config/admission-book-online-counselling.json').then(r => r.json()).then(setConfig).catch(console.error); }, []);
  if (!config) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" /></div>;
  return (
    <div className="min-h-screen bg-white">
      <PageHero showParticles={false} maxHeight="33vh" titleStroke="ONLINE" titleFill="COUNSELLING"
        useYellowAccents={true} statutoryLabel={<span className="text-[#fbbf24]">ADMISSION 2025-26</span>}
        policyLabel="" rightLabel={<span className="text-[#fbbf24]">Secure Your Seat</span>}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Get', 'expert', 'guidance', 'and', 'book', 'your'].map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }} className="text-white/70 text-[15px] font-body font-medium">{w}</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.88 }} className="relative inline-block">
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ textShadow: '0 0 25px rgba(0,139,139,0.5)' }}>counselling session</span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 1.1 }} className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block" />
              </motion.span>
            </div>
          </div>
        }
      />
      <section className="py-24 px-8 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <SectionHeading title="Join NSEC" tagline="Book an online counselling session to understand your career path." />
            <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 shadow-2xl group">
              <img src={config.image.src} alt={config.image.alt} className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center text-amber-700"><MousePointerClick size={24} /></div>
              <div>
                <p className="text-sm font-heading font-black italic uppercase text-amber-800">Ready to start?</p>
                <p className="text-[13px] font-body text-amber-700/80">Call our counsellors now to book your slot.</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-brand-maroon mb-8">Departments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
              {config.departments.map((dept, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:bg-brand-accent/5 transition-all group">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                  <span className="text-[11px] font-body font-medium text-slate-600 group-hover:text-slate-900">{dept}</span>
                </div>
              ))}
            </div>
            <div className="p-8 bg-brand-blue rounded-3xl border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-heading font-black italic uppercase text-white mb-6">Contact Admission Cell</h3>
              <div className="space-y-4">
                {config.contact.phones.map((ph, i) => (
                  <a key={i} href={'tel:' + ph} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all"><Phone size={18} /></div>
                      <span className="font-mono text-lg text-white/90">{ph}</span>
                    </div>
                    <ArrowRight size={18} className="text-white/20 group-hover:translate-x-1 group-hover:text-white transition-all" />
                  </a>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-[13px] font-body text-white/40 italic text-center">{config.contact.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
