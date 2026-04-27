import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Play, Monitor } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

function VideoCard({ video, index }) {
  const embedId = video.embed.split('/').pop();
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-accent/30 transition-all duration-300 bg-white">
      <div className="relative aspect-video bg-slate-900">
        <iframe src={video.embed} title={"NSEC Media " + (index + 1)} className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
      <div className="p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0"><Play size={14} /></div>
        <span className="text-[12px] font-mono font-bold text-slate-600 uppercase tracking-widest">NSEC Media Center — Video {index + 1}</span>
      </div>
    </motion.div>
  );
}

export default function FacilitiesMediaCenter() {
  const [config, setConfig] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const carouselPhrases = [
    { main: 'NSEC', highlight: 'MEDIA CENTER' },
    { main: 'VIDEO', highlight: 'PRODUCTION HUB' },
    { main: 'CAMPUS', highlight: 'BROADCASTS' },
    { main: 'DIGITAL', highlight: 'STORYTELLING' },
  ];
  useEffect(() => {
    const t = setInterval(() => setCurrentIdx(p => (p + 1) % carouselPhrases.length), 4000);
    return () => clearInterval(t);
  }, [carouselPhrases.length]);
  useEffect(() => {
    fetch('/config/facilities-media-center.json').then(r => r.json()).then(setConfig).catch(console.error);
  }, []);
  if (!config) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">Loading...</span>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-white">
      <PageHero showParticles={false} maxHeight="33vh" titleStroke="MEDIA" titleFill="CENTER"
        useYellowAccents={true} statutoryLabel={<span className="text-[#fbbf24]">FACILITIES</span>}
        policyLabel="" rightLabel={<span className="text-[#fbbf24]">Campus.Video.Hub</span>}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['State-of-the-art', 'media', 'and', 'video', 'production'].map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
                  className="text-white/70 text-[15px] font-body font-medium">{w}</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.82 }} className="relative inline-block">
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent"
                  style={{ textShadow: '0 0 25px rgba(0,139,139,0.5)' }}>infrastructure</span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 1.1 }}
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block" />
              </motion.span>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
              className="h-8 relative w-full mt-2">
              <div className="absolute inset-0 flex items-center flex-wrap gap-2">
                <span className="font-heading font-black italic uppercase tracking-tighter text-white" style={{ fontSize: 'clamp(0.9rem,1.8vw,1.5rem)' }}>{carouselPhrases[currentIdx].main}</span>
                <span className="font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ fontSize: 'clamp(0.9rem,1.8vw,1.5rem)' }}>{carouselPhrases[currentIdx].highlight}</span>
              </div>
            </motion.div>
          </div>
        }
      />
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5) 30%, rgba(251,191,36,0.5) 70%, transparent)' }} />
      <section className="relative pt-16 pb-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <SectionHeading title="Media Center" tagline="Official NSEC campus video productions." />
        <div className="mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {(config.videos || []).map((video, i) => <VideoCard key={i} video={video} index={i} />)}
        </div>
      </section>
    </div>
  );
}
