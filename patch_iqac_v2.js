const fs = require('fs');

let content = fs.readFileSync('New/src/pages/Iqac.jsx', 'utf8');

// The new ItemCard component
const itemCardComponent = `
const TIMELINE_ICONS = [MessageSquare, Target, CheckCircle2, Award, Shield, BookOpen, ExternalLink, Download, Globe, Cpu, Laptop, Info, Brain];

function ItemCard({ index, text }) {
  const Icon = TIMELINE_ICONS[index % TIMELINE_ICONS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[20px] bg-gradient-to-br from-brand-accent/[0.02] via-white to-white border border-brand-accent/10 border-l-[3px] border-l-[#fbbf24] shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:-translate-y-[6px] hover:shadow-[0_12px_32px_rgba(0,139,139,0.1)] hover:border-brand-accent/30 transition-all duration-[250ms] ease-out mt-3 ml-3"
    >
      <div className="absolute -top-3 -left-4 w-11 h-11 rounded-full bg-[#fbbf24] flex items-center justify-center shadow-[0_2px_4px_rgba(251,191,36,0.2)] group-hover:scale-[1.05] group-hover:shadow-[0_4px_8px_rgba(251,191,36,0.3)] transition-all duration-[250ms] ease-out z-10 border-2 border-white">
        <span className="text-[12px] font-mono font-black text-slate-900">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="absolute top-1/2 left-full w-16 h-[2px] -translate-y-1/2 opacity-70 group-hover:opacity-100 group-hover:w-24 transition-all duration-[250ms] ease-out pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.8), rgba(251,191,36,0.1), transparent)' }} />
      </div>

      <div className="p-6 pt-8 min-h-[140px] flex gap-4 items-start relative z-10">
        <div className="shrink-0 w-10 h-10 rounded-[30%] bg-brand-accent/[0.08] border border-brand-accent/40 flex items-center justify-center text-brand-accent shadow-[0_2px_8px_rgba(0,139,139,0.1)] group-hover:scale-105 transition-all duration-300">
          <Icon size={20} />
        </div>
        <p className="text-[16px] font-body font-medium text-slate-700 leading-[1.8] group-hover:text-slate-900 transition-colors duration-[250ms] ease-out pt-1 pr-2">
          <HighlightText text={text} />
        </p>
      </div>
    </motion.div>
  );
}
`;

// 1. User's manual fixes: showParticles=false, policyLabel=""
content = content.replace(/showParticles=\{true\}/g, 'showParticles={false}');
content = content.replace(/policyLabel=".*?"/g, 'policyLabel=""');

// 2. Remove VisionCard and replace with ItemCard
content = content.replace(/const VISION_ICONS[\s\S]*?function MemberCard/m, itemCardComponent + '\nfunction MemberCard');

// 3. Update mappings
content = content.replace(/<VisionCard key=\{i\} index=\{i\} item=\{p\} \/>/g, '<ItemCard key={i} index={i} text={p} />');

content = content.replace(/<motion\.div\s*key=\{i\}\s*initial=[\s\S]*?<\/motion\.div>/g, (match) => {
  if (match.includes('border-brand-maroon/30') || match.includes('bg-slate-50')) {
    return '<ItemCard key={i} index={i} text={p} />';
  }
  return match;
});

content = content.replace(/<motion\.div\s*key=\{i\}\s*initial=[\s\S]*?\{obj\}\s*<\/p>\s*<\/motion\.div>/g, (match) => {
  if (match.includes('{obj}') && match.includes('Award')) {
    return '<ItemCard key={i} index={i} text={obj} />';
  }
  return match;
});

// 4. Background and Section fixes
content = content.replace(/<section className="relative pt-24 pb-16 px-8 lg:px-24 bg-white">/, '<section className="relative pt-24 pb-0 px-8 lg:px-24 bg-white overflow-hidden">');
content = content.replace(/<section className="relative py-16 px-8 lg:px-24 bg-slate-50">/, '<section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">');
content = content.replace(/<section className="relative py-16 px-8 lg:px-24 ">/, '<section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">'); // Catch either
content = content.replace(/<section className="relative py-24 px-8 lg:px-24 bg-white overflow-hidden">/, '<section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">');
content = content.replace(/<section className="relative py-24 px-8 lg:px-24 bg-slate-900 overflow-hidden">/, '<section className="relative pt-16 pb-24 px-8 lg:px-24 bg-white overflow-hidden">');
content = content.replace(/<section className="relative py-24 px-8 lg:px-24 overflow-hidden">/, '<section className="relative pt-16 pb-24 px-8 lg:px-24 bg-white overflow-hidden">'); // Catch either

// 5. Replace state variables for PDF modal
if (!content.includes('selectedPdf')) {
  content = content.replace('const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);', 'const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);\n  const [selectedPdf, setSelectedPdf] = useState(null);');
}

// 6. Convert link buttons for PDF modal (safely)
// We will replace the entire map block for links and reports to avoid regex mishaps
const linksMapRegex = /\{\[\s*\{\s*title:\s*"Composition & Functions \(Order\)".*?\].map\(\(link, i\) => \([\s\S]*?<\/a>\s*\)\)\}/m;
const linksMapReplacement = `{[
                { title: "Composition & Functions (Order)", url: "https://www.nsec.ac.in/impdoc/230710_1_IQAC_Office%20Order.pdf" },
                { title: "Meeting & Action Taken Reports", url: "https://www.nsec.ac.in/page.php?id=514" },
                { title: "AQAR Submissions", url: "https://www.nsec.ac.in/page.php?id=512" }
              ].map((link, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPdf(link.url)}
                  className="w-full text-left focus:outline-none group flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:bg-brand-accent/5 hover:border-brand-accent/30 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                      <ExternalLink size={20} />
                    </div>
                    <span className="text-lg font-heading font-black italic uppercase tracking-tight text-slate-700 group-hover:text-brand-accent">{link.title}</span>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 group-hover:text-brand-accent transition-all" />
                </button>
              ))}`;
content = content.replace(linksMapRegex, linksMapReplacement);

const reportsMapRegex = /\{reports\.map\(\(report, i\) => \([\s\S]*?<\/a>\s*\)\)\}/m;
const reportsMapReplacement = `{reports.map((report, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPdf(report.url)}
                  className="w-full text-left focus:outline-none p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:bg-brand-maroon/5 hover:border-brand-maroon/30 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Download size={16} className="text-brand-maroon group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-mono font-bold text-slate-600 group-hover:text-brand-maroon">{report.year}</span>
                  </div>
                  <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-maroon/60">PDF</span>
                </button>
              ))}`;
content = content.replace(reportsMapRegex, reportsMapReplacement);

// Remove text-white / text-slate-900 anomalies in Headers
content = content.replace(/text-white mb-6">Important Links/g, 'text-slate-800 mb-6">Important Links');
content = content.replace(/text-white mb-6">Annual Reports/g, 'text-slate-800 mb-6">Annual Reports');

// Insert PDF Modal JSX before the last closing div
const modalJsx = `
      {/* PDF Modal Preview */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPdf(null)}
            className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col relative"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <BookOpen size={16} />
                  </div>
                  <h3 className="text-sm font-heading font-black italic uppercase tracking-widest text-slate-800">Document Preview</h3>
                </div>
                <div className="flex items-center gap-2">
                  <a href={selectedPdf} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors" title="Open in new tab">
                    <ExternalLink size={18} />
                  </a>
                  <button onClick={() => setSelectedPdf(null)} className="p-2 rounded-full hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors" title="Close">
                    <Shield size={18} className="rotate-45" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-slate-100 relative">
                <iframe src={selectedPdf} className="absolute inset-0 w-full h-full border-0" title="PDF Preview" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
`;

if (!content.includes('PDF Modal Preview')) {
  let lastIndex = content.lastIndexOf('</div>');
  if(lastIndex !== -1) {
    content = content.substring(0, lastIndex) + modalJsx + content.substring(lastIndex);
  }
}

// Ensure Brain and X are imported
if (!content.includes('Brain')) {
    content = content.replace(/import {([^}]+)} from 'lucide-react';/, "import { $1, Brain, X } from 'lucide-react';");
} else if (!content.includes('X }')) {
    content = content.replace(/import {([^}]+)} from 'lucide-react';/, "import { $1, X } from 'lucide-react';");
}

fs.writeFileSync('New/src/pages/Iqac.jsx', content);
