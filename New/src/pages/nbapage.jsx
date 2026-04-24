import React from 'react';
import PageHero from '../components/PageHero';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, CheckCircle2, FileText } from 'lucide-react';

export default function NbaPage() {
  return (
    <div className="min-h-screen bg-brand-bg font-sans pb-24">
      {/* HERO SECTION */}
      <PageHero 
        titleStroke="NBA"
        titleFill="ACCREDITED"
        statutoryLabel="National Board"
        policyLabel="of Accreditation"
        rightLabel="Quality.Assurance"
        rightContent={
          <div className="space-y-4">
            <p className="text-white/70 text-[15px] font-body font-medium leading-relaxed">
              Institutional commitment to <span className="text-brand-accent">academic quality</span> and global standards in technical education.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="p-2 bg-brand-accent/20 rounded-lg border border-brand-accent/30">
                <ShieldCheck size={20} className="text-brand-accent" />
              </div>
              <span className="text-xs font-mono font-black text-white/50 uppercase tracking-widest">Certified.Standards</span>
            </div>
          </div>
        }
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-24 py-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-[1.5px] bg-brand-accent" />
          <span className="text-xs font-mono font-black text-brand-accent uppercase tracking-[0.3em]">Accreditation Status</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-black text-brand-blue uppercase tracking-tighter italic leading-none">
                Excellence in <br /> 
                <span className="text-brand-maroon">Technical Education</span>
              </h2>
              <p className="text-lg leading-relaxed text-slate-700 font-medium border-l-4 border-brand-blue/5 pl-6">
                The National Board of Accreditation (NBA) is one of the two major bodies responsible for accreditation of higher education institutions in India, along with the National Assessment and Accreditation Council (NAAC).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'B.Tech CSE', status: 'Accredited', year: '2022-2025' },
                { title: 'B.Tech IT', status: 'Accredited', year: '2022-2025' },
                { title: 'B.Tech ECE', status: 'Accredited', year: '2022-2025' },
                { title: 'B.Tech EE', status: 'Accredited', year: '2022-2025' },
              ].map((dept, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 border border-brand-blue/10 rounded-xl relative group hover:shadow-xl transition-all duration-500"
                >
                  <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-brand-accent transition-all duration-500" />
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-black text-brand-blue uppercase tracking-tight">{dept.title}</h3>
                    <CheckCircle2 size={24} className="text-brand-accent" />
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-slate-400 uppercase tracking-widest">Status</span>
                    <span className="text-brand-maroon px-2 py-1 bg-brand-maroon/5 rounded">{dept.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold mt-2">
                    <span className="text-slate-400 uppercase tracking-widest">Validity</span>
                    <span className="text-brand-blue">{dept.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-brand-blue p-8 rounded-xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <Award size={32} className="text-brand-accent mb-6" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">NBA Benefits</h3>
                <ul className="space-y-4">
                  {[
                    'Global recognition of degrees',
                    'Quality assurance in education',
                    'Better employment opportunities',
                    'Fosters R&D environment'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 border border-brand-blue/10 rounded-xl group hover:border-brand-accent transition-colors">
              <h3 className="text-sm font-mono font-black text-brand-maroon uppercase tracking-[0.2em] mb-6">Documents Node</h3>
              <div className="space-y-3">
                {['Self Assessment Report', 'Accreditation Certificate', 'Evaluation Report'].map((doc, i) => (
                  <a key={i} href="#" className="flex items-center justify-between p-4 bg-slate-50 rounded-lg group/link hover:bg-brand-blue hover:text-white transition-all">
                    <span className="text-xs font-bold uppercase tracking-tight">{doc}</span>
                    <FileText size={16} className="text-brand-accent group-hover/link:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
