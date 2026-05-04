import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight, ChevronDown, Info, Eye, Network, Award, MessageSquare, Users, Map, Image, Phone, ArrowRight, Building, UserCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import Breadcrumb from '../components/Breadcrumb';

/* ── NAV STRUCTURE ── */
const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'vision', label: 'Vision & Mission', icon: Eye },
  { id: 'distinctiveness', label: 'Distinctiveness', icon: Award },
  { id: 'org', label: 'Org Structure', icon: Network },
  { id: 'accreditation', label: 'Affiliation', icon: Award },
  {
    id: 'functionaries', label: 'Functionaries', icon: UserCheck,
    children: [
      { id: 'functionaries-bog', label: 'Board of Governors' },
      { id: 'functionaries-md', label: 'Managing Director' },
      { id: 'functionaries-principal', label: 'Principal' },
      { id: 'functionaries-dean', label: 'Dean' },
    ]
  },
  { id: 'campus', label: 'Campus Map', icon: Map },
  { id: 'gallery', label: 'Photo Gallery', icon: Image },
  { id: 'contact', label: 'Contact Us', icon: Phone },
];

/* ── STAT CARD ── */
function StatCard({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow">
      <span className="text-3xl font-black text-brand-maroon">{value}</span>
      <span className="text-sm font-medium text-slate-500 mt-1">{label}</span>
    </div>
  );
}

/* ── FEATURE CARD ── */
function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-lg hover:border-brand-accent/30 transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-4 group-hover:bg-brand-accent group-hover:text-white transition-colors">
        <Icon size={20} className="text-brand-accent group-hover:text-white transition-colors" />
      </div>
      <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}



/* ── MAIN PAGE ── */
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Sync hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) setActiveTab(hash);
  }, []);

  const handleSelect = (id) => {
    setActiveTab(id);
    window.location.hash = id;
    // Scroll to the top of the content section with offset for sticky header
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  const CONTENT = {
    overview: (
      <div className="space-y-10">
        <SectionHeading title="The NSEC" tagline="Shaping engineers and leaders since 1998." />
        <p className="text-[16px] text-slate-600 leading-[1.9] font-body">
          Netaji Subhash Engineering College (NSEC) is one of the premier engineering institutes of West Bengal, established in 1998 under the aegis of Techno India Group. Approved by <strong>AICTE</strong> and affiliated to <strong>MAKAUT</strong>, the institution offers a broad spectrum of undergraduate and postgraduate programmes in engineering, technology, management, and applied sciences.
        </p>
        <p className="text-[16px] text-slate-600 leading-[1.9] font-body">
          Accredited by <strong>NBA</strong> (multiple programmes) and <strong>NAAC</strong>, and consistently ranked under <strong>NIRF</strong> and <strong>ARIAA</strong>, NSEC stands as a beacon of quality technical education in Eastern India. The college has a sprawling campus equipped with state-of-the-art laboratories, a rich library, sports facilities, and vibrant student life.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '1998', label: 'Year Founded' },
            { value: '6000+', label: 'Students' },
            { value: '15+', label: 'Programmes' },
            { value: 'NBA & NAAC', label: 'Accredited' },
          ].map((s, i) => <StatCard key={i} {...s} />)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {[
            { icon: Award, title: 'NBA Accredited', desc: 'Multiple programmes accredited by National Board of Accreditation.' },
            { icon: Award, title: 'NAAC Accredited', desc: 'Institutionally accredited ensuring quality standards in education.' },
            { icon: Building, title: 'AICTE Approved', desc: 'Approved by All India Council for Technical Education.' },
            { icon: Network, title: 'MAKAUT Affiliated', desc: 'Affiliated to Maulana Abul Kalam Azad University of Technology.' },
            { icon: UserCheck, title: 'NIRF Ranked', desc: 'Recognized under National Institutional Ranking Framework.' },
            { icon: Award, title: 'ARIIA Ranked', desc: 'Ranked by Atal Ranking of Institutions on Innovation Achievements.' },
          ].map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </div>
    ),

    vision: (
      <div className="space-y-8">
        <SectionHeading title="Vision & Mission" tagline="Our guiding philosophy and institutional commitments." />
        <div className="bg-gradient-to-br from-brand-maroon/5 to-brand-accent/5 border border-brand-maroon/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-maroon flex items-center justify-center">
              <Eye size={16} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-brand-maroon">Vision</h3>
          </div>
          <p className="text-[16px] text-slate-700 leading-relaxed font-body">
            To be a premier institution of learning fostering innovative and globally competitive engineers and managers with strong ethical values, committed to the service of society and nation.
          </p>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center">
              <Award size={16} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Mission</h3>
          </div>
          <ul className="space-y-3">
            {[
              'To provide quality technical education through effective teaching-learning process and continuous improvement.',
              'To develop competent professionals with analytical and problem-solving skills through industry-academia interface.',
              'To inculcate ethical values, leadership qualities, and social responsibility among students.',
              'To promote research, innovation, and entrepreneurship for the advancement of society.',
              'To foster inclusive growth by providing equal opportunities to all sections of society.',
            ].map((m, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                <span className="text-[15px] text-slate-600 leading-relaxed">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),

    distinctiveness: (
      <div className="space-y-8">
        <SectionHeading title="Institutional Distinctiveness" tagline="What makes NSEC unique among engineering colleges." />
        <p className="text-[16px] text-slate-600 leading-[1.9]">
          NSEC distinguishes itself through a unique blend of academic rigor, industry collaboration, and student-centric initiatives that collectively create a holistic learning environment.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { title: 'Industry-Academia Integration', desc: 'Active MoUs with leading industries ensuring real-world exposure and internship opportunities for students.' },
            { title: 'Innovation & Entrepreneurship', desc: 'Dedicated IDEA Lab and IIC (Institution\'s Innovation Council) fostering a culture of innovation and start-up mindset.' },
            { title: 'Research Culture', desc: 'Faculty and students engaged in funded research projects across multiple disciplines with published outcomes.' },
            { title: 'Student Welfare', desc: 'Comprehensive mentoring system, counselling support, scholarships, and welfare measures for holistic student development.' },
            { title: 'Digital Learning', desc: 'MOOCs, e-resources, smart classrooms, and a well-equipped media center for technology-enabled education.' },
            { title: 'Community Engagement', desc: 'Active UBA (Unnat Bharat Abhiyan) unit and community outreach programmes connecting the institution with rural India.' },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-800 mb-2">{f.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),

    org: (
      <div className="space-y-8">
        <SectionHeading title="Organisational Structure" tagline="The governance framework of Netaji Subhash Engineering College." />
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <div className="space-y-4">
            {[
              { role: 'Board of Governors', desc: 'Apex body responsible for overall governance and policy formulation.' },
              { role: 'Managing Director', desc: 'Provides strategic leadership and administrative oversight.' },
              { role: 'Principal', desc: 'Academic head responsible for day-to-day operations and academic affairs.' },
              { role: 'Deans', desc: 'Academic, Student Affairs, and R&D — supporting the Principal in respective domains.' },
              { role: 'Heads of Departments', desc: 'Department-level leadership ensuring academic excellence and faculty development.' },
              { role: 'Faculty & Staff', desc: 'Core workforce driving teaching, research, and institutional functions.' },
            ].map((row, i, arr) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-brand-accent border-2 border-white shadow" />
                  {i < arr.length - 1 && <div className="w-0.5 h-8 bg-brand-accent/20 mt-1" />}
                </div>
                <div className="pb-4">
                  <p className="font-semibold text-slate-800">{row.role}</p>
                  <p className="text-sm text-slate-500">{row.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    accreditation: (
      <div className="space-y-8">
        <SectionHeading title="Approval & Affiliation" tagline="Institutional recognitions, accreditations, and affiliations." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: 'AICTE', sub: 'All India Council for Technical Education', status: 'Approved' },
            { label: 'MAKAUT', sub: 'Maulana Abul Kalam Azad University of Technology, WB', status: 'Affiliated' },
            { label: 'NBA', sub: 'National Board of Accreditation', status: 'Accredited (Multiple Programmes)' },
            { label: 'NAAC', sub: 'National Assessment & Accreditation Council', status: 'Accredited' },
            { label: 'NIRF', sub: 'National Institutional Ranking Framework', status: 'Ranked' },
            { label: 'ARIIA', sub: 'Atal Ranking of Institutions on Innovation Achievements', status: 'Ranked' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-maroon/10 flex items-center justify-center shrink-0">
                <Award size={22} className="text-brand-maroon" />
              </div>
              <div>
                <p className="font-bold text-slate-800">{item.label}</p>
                <p className="text-xs text-slate-400 leading-snug mb-1">{item.sub}</p>
                <span className="inline-block text-xs font-semibold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    'functionaries-bog': (
      <div className="space-y-8">
        <SectionHeading title="Board of Governors" tagline="The apex governing body of NSEC." />
        <p className="text-[15px] text-slate-600 leading-relaxed">
          The Board of Governors is the supreme governing body of Netaji Subhash Engineering College. It comprises distinguished academicians, industrialists, and administrators who provide strategic direction, policy formulation, and oversight for the institution's academic and administrative functioning.
        </p>
        <div className="bg-brand-maroon/5 border border-brand-maroon/10 rounded-2xl p-6">
          <p className="text-sm text-slate-500 italic">Detailed composition of the Board of Governors is updated periodically. Please contact the administration for the latest list.</p>
        </div>
      </div>
    ),

    'functionaries-md': (
      <div className="space-y-8">
        <SectionHeading title="Managing Director's Desk" tagline="A message from the leadership." />
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <p className="text-[16px] text-slate-600 leading-[1.9] font-body">
            Welcome to Netaji Subhash Engineering College. Our institution has been committed to providing world-class technical education since its founding in 1998. We believe in nurturing not just technical skills, but also character, innovation, and a sense of social responsibility. Our students go on to become leaders in industry, research, and society. I invite you to explore our programmes and join our vibrant community.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-maroon/10 flex items-center justify-center">
              <UserCheck size={20} className="text-brand-maroon" />
            </div>
            <div>
              <p className="font-bold text-slate-800">Managing Director</p>
              <p className="text-sm text-slate-400">Netaji Subhash Engineering College</p>
            </div>
          </div>
        </div>
      </div>
    ),

    'functionaries-principal': (
      <div className="space-y-8">
        <SectionHeading title="Principal's Desk" tagline="Academic leadership and vision." />
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <p className="text-[16px] text-slate-600 leading-[1.9] font-body">
            As Principal of NSEC, my focus is on creating an environment where learning is joyful, innovation is encouraged, and every student reaches their fullest potential. Our distinguished faculty, modern infrastructure, and industry partnerships ensure that our graduates are ready for the challenges of tomorrow. I warmly welcome students, parents, and stakeholders to our institution.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center">
              <UserCheck size={20} className="text-brand-accent" />
            </div>
            <div>
              <p className="font-bold text-slate-800">Principal</p>
              <p className="text-sm text-slate-400">Netaji Subhash Engineering College</p>
            </div>
          </div>
        </div>
      </div>
    ),

    'functionaries-dean': (
      <div className="space-y-8">
        <SectionHeading title="Dean's Desk" tagline="Academic affairs and student development." />
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <p className="text-[16px] text-slate-600 leading-[1.9] font-body">
            The Dean's office at NSEC plays a pivotal role in academic planning, student welfare, and research facilitation. We are committed to fostering interdisciplinary learning, supporting faculty development, and ensuring that every student's academic journey is enriching, fulfilling, and career-ready.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-maroon/10 flex items-center justify-center">
              <UserCheck size={20} className="text-brand-maroon" />
            </div>
            <div>
              <p className="font-bold text-slate-800">Dean</p>
              <p className="text-sm text-slate-400">Netaji Subhash Engineering College</p>
            </div>
          </div>
        </div>
      </div>
    ),

    functionaries: (
      <div className="space-y-8">
        <SectionHeading title="Functionaries" tagline="Key leadership of Netaji Subhash Engineering College." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {['Board of Governors', 'Managing Director', 'Principal', 'Dean'].map((role, i) => (
            <button
              key={i}
              onClick={() => handleSelect(`functionaries-${role.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`)}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-between hover:shadow-md hover:border-brand-accent/30 transition-all text-left"
            >
              <span className="font-semibold text-slate-700 group-hover:text-brand-maroon transition-colors">{role}</span>
              <ArrowRight size={16} className="text-brand-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    ),

    campus: (
      <div className="space-y-8">
        <SectionHeading title="Campus Map" tagline="Navigate the NSEC campus." />
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <iframe
            title="NSEC Campus Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.978!2d88.4281!3d22.6048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d7e5ab1a3c1%3A0xabc123!2sNetaji+Subhash+Engineering+College!5e0!3m2!1sen!2sin!4v1"
            className="w-full h-[450px] border-0"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <p className="font-semibold text-slate-700 mb-1">Netaji Subhash Engineering College</p>
          <p className="text-sm text-slate-500">Techno India Group, Garia, Kolkata – 700152, West Bengal, India</p>
        </div>
      </div>
    ),

    gallery: (
      <div className="space-y-8">
        <SectionHeading title="Photo Gallery" tagline="Glimpses of campus life at NSEC." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center overflow-hidden hover:shadow-lg transition-shadow">
              <Image size={32} className="text-slate-300" />
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-400 text-center">Official photo gallery coming soon. Visit campus to experience NSEC in person.</p>
      </div>
    ),

    contact: (
      <div className="space-y-8">
        <SectionHeading title="Contact Us" tagline="Get in touch with Netaji Subhash Engineering College." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { icon: Phone, label: 'Phone', value: '+91-9831817307' },
            { icon: MessageSquare, label: 'Email', value: 'info@nsec.ac.in' },
            { icon: Map, label: 'Address', value: 'Techno India Group, Garia, Kolkata – 700152' },
            { icon: Building, label: 'Website', value: 'www.nsec.ac.in' },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-brand-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{c.label}</p>
                  <p className="text-sm font-medium text-slate-700">{c.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
  };

  const currentContent = CONTENT[activeTab] || CONTENT['overview'];

  // Calculate breadcrumbs dynamically
  let currentItem = NAV_ITEMS.find(item => item.id === activeTab);
  let parentItem = null;

  if (!currentItem) {
    for (const item of NAV_ITEMS) {
      if (item.children) {
        const child = item.children.find(c => c.id === activeTab);
        if (child) {
          currentItem = child;
          parentItem = item;
          break;
        }
      }
    }
  }

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'About Us', link: '/about' },
  ];

  if (parentItem) {
    breadcrumbs.push({ label: parentItem.label, link: `/about#${parentItem.id}` });
  }
  if (currentItem && currentItem.id !== 'overview') {
    breadcrumbs.push({ label: currentItem.label, link: `/about#${currentItem.id}` });
  }

  const breadcrumbSubmenus = [
    {
      id: 'the-nsec',
      label: 'The NSEC',
      children: NAV_ITEMS.map(item => ({
        id: item.id,
        label: item.label,
        children: item.children ? item.children.map(child => ({
          id: child.id,
          label: child.label
        })) : null
      }))
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <PageHero
        showParticles={false}
        maxHeight="20vh"
        titleStroke="ABOUT"
        titleFill="NSEC"
        statutoryLabel={<span className="text-[#fbbf24]">OVERVIEW</span>}
        policyLabel=""
        rightLabel={<span className="text-[#fbbf24]">The.NSEC</span>}
        rightContent={
          <div className="space-y-2">
            <p className="text-white/70 text-[15px] font-body font-medium leading-relaxed">
              Approved by <span className="text-brand-accent">AICTE</span>, affiliated to <span className="text-brand-accent">MAKAUT</span>,
              accredited by <span className="text-brand-accent">NBA & NAAC</span>.
            </p>
            <div className="flex items-center gap-3 mt-3">
              <div className="h-px w-12 bg-brand-maroon" />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Est. 1998</span>
            </div>
          </div>
        }
      />

      {/* ── GOLDEN SEPARATOR ── */}
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5) 30%, rgba(251,191,36,0.5) 70%, transparent)' }} />

      {/* ── NEW BREADCRUMB ── */}
      <Breadcrumb 
        items={breadcrumbs} 
        submenus={breadcrumbSubmenus}
        activeSubmenu={activeTab}
        onSubmenuClick={handleSelect}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="px-8 lg:px-24 pb-20 flex justify-center w-full pt-12">
        <main className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {currentContent}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

    </div>
  );
}
