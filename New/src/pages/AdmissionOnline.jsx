import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Globe, CheckCircle2, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import AccentDetailCard from '../components/AccentDetailCard';

export default function AdmissionOnline() {
  const [config, setConfig] = useState(null);
  useEffect(() => { fetch('/config/admission-online-admission.json').then(r => r.json()).then(setConfig).catch(console.error); }, []);
  if (!config) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" /></div>;
  return (
    <div className="min-h-screen bg-white">
      <PageHero showParticles={false} maxHeight="33vh" titleStroke="ONLINE" titleFill="ADMISSION"
        useYellowAccents={true} statutoryLabel={<span className="text-[#fbbf24]">ADMISSION 2025-26</span>}
        policyLabel="" rightLabel={<span className="text-[#fbbf24]">Digital Portal</span>}
        rightContent={
          <div className="leading-snug">
             <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Secure', 'your', 'seat', 'from', 'the', 'comfort', 'of', 'your'].map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }} className="text-white/70 text-[15px] font-body font-medium">{w}</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.88 }} className="relative inline-block">
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ textShadow: '0 0 25px rgba(0,139,139,0.5)' }}>home via digital portal</span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 1.1 }} className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block" />
              </motion.span>
            </div>
          </div>
        }
      />
      <section className="py-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-3/5">
             <SectionHeading title="Admission Portal" tagline={config.subheading} />
             <div className="mt-12 space-y-4">
                {config.steps.map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="flex gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:border-brand-accent/30 hover:bg-brand-accent/5 transition-all group">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center font-heading font-black italic text-sm">{i + 1}</div>
                    <p className="text-[15px] font-body font-medium text-slate-700 leading-relaxed group-hover:text-slate-900">{step}</p>
                  </motion.div>
                ))}
             </div>
             
             <div className="mt-12 p-8 bg-slate-900 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 flex flex-col items-center text-center">
                   <div className="w-16 h-16 rounded-2xl bg-brand-accent flex items-center justify-center text-white mb-6 shadow-[0_0_40px_rgba(0,139,139,0.5)]"><Globe size={32} /></div>
                   <h3 className="text-3xl font-heading font-black italic uppercase text-white mb-2">Access Portal</h3>
                   <p className="text-white/50 text-sm font-body mb-8">Start your application journey on our secure admission portal.</p>
                   <a href={config.portal.url} target="_blank" rel="noopener noreferrer" 
                     className="px-10 py-4 bg-white text-slate-900 rounded-xl font-heading font-black italic uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all shadow-xl flex items-center gap-3 group">
                     Register Now <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                   </a>
                </div>
             </div>
          </div>
          
          <div className="lg:w-2/5">
             <div className="sticky top-40 space-y-8">
                <div>
                   <h4 className="text-lg font-heading font-black italic uppercase tracking-tight text-brand-maroon mb-6 flex items-center gap-3">
                     <ShieldCheck className="text-brand-accent" size={24} /> Documents Required
                   </h4>
                   <div className="grid grid-cols-1 gap-2">
                      {config.required_documents.map((doc, i) => (
                        <AccentDetailCard key={i} index={i} value={doc} tone="accent" size="sm" icon={CheckCircle2} />
                      ))}
                   </div>
                </div>
                
                <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl">
                   <h5 className="text-[11px] font-mono font-black text-amber-800 uppercase tracking-widest mb-3">Guidelines</h5>
                   <ul className="space-y-2">
                      {config.document_guidelines.map((g, i) => (
                        <li key={i} className="text-[12px] font-body text-amber-700/80 leading-relaxed">• {g}</li>
                      ))}
                   </ul>
                </div>

                <div className="p-8 bg-brand-blue rounded-3xl border border-white/10 shadow-2xl">
                   <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3">Support</p>
                   <div className="space-y-4">
                      {config.contact.phones.map((ph, i) => (
                         <a key={i} href={'tel:' + ph} className="flex items-center gap-4 text-white/80 hover:text-brand-accent transition-colors">
                            <Phone size={14} />
                            <span className="font-mono text-sm">{ph}</span>
                         </a>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
