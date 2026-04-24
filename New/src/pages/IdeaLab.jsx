import React, { useEffect, useState } from 'react';
import PageHero from '../components/PageHero';
import { motion } from 'framer-motion';

export default function IdeaLab() {
	const [config, setConfig] = useState(null);

	useEffect(() => {
		fetch('/config/page-idealab-config.json')
			.then((res) => res.json())
			.then((data) => setConfig(data))
			.catch((err) => console.error('Failed to load IDEA Lab config:', err));
	}, []);

	if (!config) {
		return (
			<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff', color: '#800000' }}>
				Loading IDEA Lab page...
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-brand-bg font-sans">
			{/* HERO SECTION */}
			<PageHero 
				titleStroke="IDEA"
				titleFill="LAB"
				statutoryLabel="AICTE"
				policyLabel="Innovation Lab"
				rightLabel="Maker.Space"
				rightContent={
					<div className="space-y-4">
						<p className="text-white/70 text-[15px] font-body font-medium leading-relaxed">
							A state-of-the-art <span className="text-brand-accent">prototyping facility</span> for students to transform ideas into reality.
						</p>
						<div className="relative mt-4 group">
							<img
								src="/assets/HeroFocus/nsec-idealab-fp01.jpg"
								alt="AICTE IDEA Lab"
								className="w-full h-48 object-cover rounded-lg border border-white/20 shadow-2xl opacity-80"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg pointer-events-none" />
						</div>
					</div>
				}
			/>

			<section className="max-w-7xl mx-auto px-6 lg:px-24 py-20">
				<div className="flex items-center gap-3 mb-10">
					<div className="w-12 h-[1.5px] bg-brand-accent" />
					<span className="text-xs font-mono font-black text-brand-accent uppercase tracking-[0.3em]">Prototyping Excellence</span>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
					<div className="lg:col-span-8 space-y-8">
						<h2 className="text-3xl font-black text-brand-blue uppercase tracking-tight italic">
							{config.subheading}
						</h2>
						<div className="space-y-6">
							{(config.content || []).map((paragraph, index) => (
								<p key={`idea-content-${index}`} className="text-lg leading-relaxed text-slate-700 font-medium border-l-4 border-brand-maroon/10 pl-6">
									{paragraph}
								</p>
							))}
						</div>
					</div>

					<div className="lg:col-span-4">
						<div className="bg-white p-8 border border-brand-blue/10 shadow-sm rounded-lg relative overflow-hidden">
							<div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-bl-full" />
							<h3 className="text-xl font-black text-brand-blue mb-4 uppercase tracking-tight">Lab Stats</h3>
							<div className="space-y-4">
								<div className="flex items-end justify-between border-b border-slate-100 pb-2">
									<span className="text-xs font-mono text-slate-400 uppercase">Equipment</span>
									<span className="font-black text-brand-maroon italic">30+ Units</span>
								</div>
								<div className="flex items-end justify-between border-b border-slate-100 pb-2">
									<span className="text-xs font-mono text-slate-400 uppercase">Area</span>
									<span className="font-black text-brand-maroon italic">5000 Sq.ft</span>
								</div>
								<div className="flex items-end justify-between border-b border-slate-100 pb-2">
									<span className="text-xs font-mono text-slate-400 uppercase">Capacity</span>
									<span className="font-black text-brand-maroon italic">60 Slots</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
