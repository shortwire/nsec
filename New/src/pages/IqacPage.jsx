'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Users, Target, CheckCircle2, Mail, BookOpen } from 'lucide-react';
import PageHero from '../components/PageHero';

const MotionDiv = motion.div;
const MotionH1 = motion.h1;

const iconMap = {
  'IQAC Links': FileText,
  'Annual Reports': BookOpen,
  'Major Focus': Target,
  'Functions': CheckCircle2,
  'Coordinator Message': Users,
  'Contact': Mail
};

function normalizeIqacConfig(source) {
  const linkItems = (source.links || []).flatMap((link) => {
    if (link.items && link.items.length) {
      return link.items.map((item) => ({
        title: item.title,
        url: item.url
      }));
    }

    return [{
      title: link.title,
      url: link.url
    }];
  });

  const annualReportItems = (source.annual_reports || []).map((report) => ({
    title: report.year,
    url: report.url
  }));

  const coordinatorMessageItems = [
    source.coordinator_message?.summary,
    source.coordinator_message?.invitation
  ].filter(Boolean);

  const contactItems = source.contact ? [
    source.contact.role,
    source.contact.designation,
    ...(source.contact.email || []),
    source.contact.phone
  ].filter(Boolean) : [];

  return {
    hero: {
      title: 'Internal Quality',
      titleHighlight: 'Assurance Cell.',
      subtitle: 'IQAC: NSEC'
    },
    summary: source.about,
    content: [
      {
        title: 'IQAC Links',
        desc: 'Committee composition, meeting records, and AQAR references.',
        items: linkItems,
        buttonLabel: 'Open Reference',
        icon: 'IQAC Links'
      },
      {
        title: 'Annual Reports',
        desc: 'Institutional annual reports by academic year.',
        items: annualReportItems,
        buttonLabel: 'View Annual Report',
        icon: 'Annual Reports'
      },
      {
        title: 'Major Focus',
        desc: 'Strategic priorities of the IQAC.',
        items: source.major_focus || [],
        icon: 'Major Focus'
      },
      {
        title: 'Functions',
        desc: 'Core responsibilities and quality assurance activities.',
        items: source.functions || [],
        icon: 'Functions'
      },
      {
        title: 'Coordinator Message',
        desc: source.coordinator_message?.summary,
        items: coordinatorMessageItems,
        icon: 'Coordinator Message'
      },
      {
        title: 'Contact',
        desc: source.contact?.name,
        items: contactItems,
        icon: 'Contact'
      }
    ]
  };
}

export default function IqacPage({ configPath }) {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch(configPath)
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config:", err));
  }, [configPath]);

  const pageConfig = config?.iqac ? normalizeIqacConfig(config.iqac) : config;

  if (!pageConfig) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-brand-bg">
      {/* Hero Section */}
      <PageHero 
        titleStroke="IQAC"
        titleFill="CELL"
        statutoryLabel="Internal Quality"
        policyLabel="Assurance Cell"
        rightLabel="Strategic.Quality"
        rightContent={
          <div className="space-y-4">
            <p className="text-white/70 text-[15px] font-body font-medium leading-relaxed">
              Ensuring <span className="text-brand-accent">continuous improvement</span> in the entire operations of the institution.
            </p>
            <p className="text-white/45 text-[13px] font-body italic border-l-2 border-brand-maroon pl-3">
              "Quality is not an act, it is a habit."
            </p>
          </div>
        }
      />

      <section className="relative px-6 lg:px-24 py-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-[1.5px] bg-brand-accent" />
          <span className="text-xs font-mono font-black text-brand-accent uppercase tracking-[0.3em]">Institutional Framework</span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageConfig.content.map((prog, i) => {
            const Icon = iconMap[prog.icon] || FileText;
            return (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border flex flex-col h-full"
                style={{ backgroundColor: '#fff9f5', borderColor: '#e8dfd5' }}
              >
                {/* Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: i % 2 === 0 ? '#008b8b' : '#800000' }} />

                <div className="flex-1">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: i % 2 === 0 ? '#e8f4f4' : '#f4e8e8', color: i % 2 === 0 ? '#008b8b' : '#800000' }}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3 transition-colors" style={{ color: '#2d2d2d' }}>
                    {prog.title}
                  </h2>
                  
                  <p className="font-medium mb-6 leading-relaxed text-sm" style={{ color: '#555' }}>
                    {prog.desc}
                  </p>
                  
                  {prog.items.length > 0 && (
                    <ul className="space-y-3 mb-8">
                      {prog.items.slice(0, 3).map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: i % 2 === 0 ? '#008b8b' : '#800000' }} />
                          <span className="text-sm font-medium" style={{ color: '#333' }}>
                            {typeof item === 'string' ? (
                              item
                            ) : (
                              <a 
                                href={item.url} 
                                className="hover:underline transition-colors" 
                                style={{ color: i % 2 === 0 ? '#008b8b' : '#800000' }}
                                target="_blank" 
                                rel="noreferrer"
                              >
                                {item.title}
                              </a>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {prog.buttonLabel ? (
                  <button className="w-full py-3 px-4 font-semibold rounded flex items-center justify-center gap-2 transition-all duration-300 transform group-hover:scale-105 mt-auto" style={{ backgroundColor: i % 2 === 0 ? '#008b8b' : '#800000', color: '#fff' }}>
                    {prog.buttonLabel} 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : null}
              </MotionDiv>
            );
          })}
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  );
}
