import React, { useEffect, useMemo, useState } from 'react';
import PageHero from '../components/PageHero';
import Table from '../components/Table';
import { motion } from 'framer-motion';

export default function IIC() {
	const [config, setConfig] = useState(null);
	const [visibleRows, setVisibleRows] = useState(10);

	useEffect(() => {
		fetch('/config/page-iic-config.json')
			.then((res) => res.json())
			.then((data) => setConfig(data.iic || null))
			.catch((err) => console.error('Failed to load IIC config:', err));
	}, []);

	const memberColumns = useMemo(
		() => [
			{ header: 'SL No', accessor: 'slNo' },
			{ header: 'Name', accessor: 'name' },
			{ header: 'Position/Designation', accessor: 'positionDesignation' }
		],
		[]
	);

	const memberData = useMemo(() => {
		if (!config?.members) return [];

		return config.members.map((member, index) => ({
			id: `${member.name}-${index}`,
			slNo: index + 1,
			name: member.name,
			positionDesignation: [member.role, member.designation].filter(Boolean).join(' / ')
		}));
	}, [config]);

	const visibleMemberData = useMemo(() => memberData.slice(0, visibleRows), [memberData, visibleRows]);
	const hasMoreRows = visibleRows < memberData.length;

	const handleLoadMore = () => {
		setVisibleRows((prev) => prev + 10);
	};

	if (!config) {
		return (
			<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff', color: '#800000' }}>
				Loading IIC page...
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-brand-bg font-sans">
			{/* HERO SECTION */}
			<PageHero 
				titleStroke="IIC"
				titleFill="COUNCIL"
				statutoryLabel="Institution's"
				policyLabel="Innovation Council"
				rightLabel="Creative.Engine"
				rightContent={
					<div className="space-y-4">
						<p className="text-white/70 text-[15px] font-body font-medium leading-relaxed">
							Establishing a vibrant <span className="text-brand-accent">innovation ecosystem</span> to foster entrepreneurship and startups.
						</p>
						<div className="mt-4 flex items-center gap-4">
							<div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
								<img 
									src="/assets/HeroFocus/25-years-nsec-logo-3.png" 
									alt="25 Years of NSEC" 
									className="h-20 w-auto object-contain brightness-0 invert opacity-80"
								/>
							</div>
							<p className="text-white/45 text-[11px] font-mono uppercase tracking-widest leading-tight">
								25 Years of <br /> Academic <br /> Excellence
							</p>
						</div>
					</div>
				}
			/>

			<section className="max-w-7xl mx-auto px-6 lg:px-24 py-20 relative">
				<div className="flex items-center gap-3 mb-10">
					<div className="w-12 h-[1.5px] bg-brand-accent" />
					<span className="text-xs font-mono font-black text-brand-accent uppercase tracking-[0.3em]">Institutional Innovation</span>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 mt-4 md:mt-0">
					<article className="rounded-xl border p-6" style={{ borderColor: '#008b8b' }}>
						<h2 className="text-2xl font-bold mb-3" style={{ color: '#800000' }}>Overview</h2>
						<p className="leading-relaxed" style={{ color: '#008b8b' }}>{config.about?.overview}</p>
					</article>

					<article className="rounded-xl border p-6" style={{ borderColor: '#008b8b' }}>
						<h2 className="text-2xl font-bold mb-3" style={{ color: '#800000' }}>Vision</h2>
						<p className="leading-relaxed" style={{ color: '#008b8b' }}>{config.about?.vision}</p>
					</article>
				</div>

				<article className="rounded-xl border p-6 mb-10" style={{ borderColor: '#008b8b' }}>
					<h2 className="text-2xl font-bold mb-3" style={{ color: '#800000' }}>Institution Context</h2>
					<p className="leading-relaxed" style={{ color: '#008b8b' }}>{config.about?.institution_context}</p>
				</article>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
					<article className="rounded-xl border p-6" style={{ borderColor: '#008b8b' }}>
						<h3 className="text-xl font-bold mb-4" style={{ color: '#800000' }}>Major Focus</h3>
						<ul className="space-y-2">
							{(config.major_focus || []).map((item, idx) => (
								<li key={`focus-${idx}`} className="flex items-start gap-2" style={{ color: '#008b8b' }}>
									<span className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: '#800000' }} />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</article>

					<article className="rounded-xl border p-6" style={{ borderColor: '#008b8b' }}>
						<h3 className="text-xl font-bold mb-4" style={{ color: '#800000' }}>Functions</h3>
						<ul className="space-y-2">
							{(config.functions || []).map((item, idx) => (
								<li key={`function-${idx}`} className="flex items-start gap-2" style={{ color: '#008b8b' }}>
									<span className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: '#800000' }} />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</article>
				</div>

				<div className="rounded-xl border p-4 md:p-6" style={{ borderColor: '#008b8b' }}>
					<h3 className="text-2xl font-bold mb-5" style={{ color: '#800000' }}>IIC Members</h3>
					<div className="iic-table-wrap">
						<Table columns={memberColumns} data={visibleMemberData} />
					</div>
					{hasMoreRows ? (
						<div className="mt-5 flex justify-center">
							<button
								type="button"
								onClick={handleLoadMore}
								className="px-6 py-2.5 rounded font-semibold transition-colors"
								style={{ backgroundColor: '#008b8b', color: '#ffffff' }}
							>
								Load More
							</button>
						</div>
					) : null}
				</div>
			</section>

			<style>{`
				.iic-table-wrap .table-head-cell {
					background: #008b8b;
					color: #ffffff;
					border-color: #800000;
				}

				.iic-table-wrap .table-cell {
					color: #800000;
					border-color: #008b8b;
				}

				.iic-table-wrap .table-row:nth-child(even) .table-cell {
					background: rgba(0, 139, 139, 0.08);
				}

				.iic-table-wrap .table-row:hover .table-cell {
					background: rgba(128, 0, 0, 0.08);
				}
			`}</style>
		</div>
	);
}
