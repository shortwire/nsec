const fs = require('fs');

let content = fs.readFileSync('New/src/pages/Iqac.jsx', 'utf8');

// 1. Replace MemberCard, VisionCard, and map them to a single ItemCard (ConstitutesCard)
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

// Replace VisionCard definition
content = content.replace(/const VISION_ICONS[\s\S]*?function MemberCard/m, itemCardComponent + '\nfunction MemberCard');

// Update Vision mapping
content = content.replace(/<VisionCard key=\{i\} index=\{i\} item=\{p\} \/>/g, '<ItemCard key={i} index={i} text={p} />');

// Update Mission mapping
content = content.replace(/<motion\.div\s*key=\{i\}\s*initial=[\s\S]*?<\/motion\.div>/g, (match) => {
  if (match.includes('border-brand-maroon/30') || match.includes('bg-slate-50')) {
    return '<ItemCard key={i} index={i} text={p} />';
  }
  return match;
});

// Update Objectives mapping
content = content.replace(/<motion\.div\s*key=\{i\}\s*initial=[\s\S]*?\{obj\}\s*<\/p>\s*<\/motion\.div>/g, (match) => {
  if (match.includes('{obj}') && match.includes('Award')) {
    return '<ItemCard key={i} index={i} text={obj} />';
  }
  return match;
});

// Remove slate backgrounds and adjust padding
// 02. VISION & MISSION
content = content.replace(/<section className="relative pt-24 pb-16 px-8 lg:px-24 bg-white">/, '<section className="relative pt-24 pb-0 px-8 lg:px-24 bg-white overflow-hidden">');
// 03. OBJECTIVES
content = content.replace(/<section className="relative py-16 px-8 lg:px-24 ">/, '<section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">');
// 04. COMPOSITION
content = content.replace(/<section className="relative py-24 px-8 lg:px-24 bg-white overflow-hidden">/, '<section className="relative pt-16 pb-8 px-8 lg:px-24 bg-white overflow-hidden">');
// 05. LINKS & REPORTS
content = content.replace(/<section className="relative py-24 px-8 lg:px-24 overflow-hidden">/, '<section className="relative pt-16 pb-24 px-8 lg:px-24 bg-white overflow-hidden">');

// Add PDF Modal state and JSX
content = content.replace('const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);', 'const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);\n  const [selectedPdf, setSelectedPdf] = useState(null);');

// Replace standard 'a' tags for PDF to trigger modal
content = content.replace(/<a\s+key=\{i\}\s+href=\{link\.url\}\s+target="_blank"\s+rel="noopener noreferrer"/g, '<button key={i} onClick={() => setSelectedPdf(link.url)}');
content = content.replace(/<\/a>\s+\}\)/g, '</button>\n              ))}');

content = content.replace(/<a\s+key=\{i\}\s+href=\{report\.url\}\s+target="_blank"\s+rel="noopener noreferrer"/g, '<button key={i} onClick={() => setSelectedPdf(report.url)}');
content = content.replace(/<span className="text-\[9px\] font-mono font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-maroon\/60">PDF<\/span>\s*<\/a>\s+\}\)/g, '<span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-maroon/60">PDF</span>\n                </button>\n              ))}');

// Replace link inside the map (closing tags specifically for Iqac links/reports)
content = content.replace(/<\/a>/g, (match, offset) => {
  // Simple heuristic: if it's after setSelectedPdf
  if (content.substring(offset - 500, offset).includes('setSelectedPdf')) {
    return '</button>';
  }
  return match;
});

// Remove unused a to button manually using better regex
content = content.replace(/<button([^>]*?)className="([^"]*?)"([^>]*?)>([\s\S]*?)<\/button>/g, (match, p1, p2, p3, p4) => {
  if (match.includes('setSelectedPdf')) {
    // If it was previously an <a>, we need to make sure the className has w-full text-left to act like a block link
    return `<button${p1}className="${p2} w-full text-left focus:outline-none"${p3}>${p4}</button>`;
  }
  return match;
});


// Insert PDF Modal JSX before last closing div
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

let lastIndex = content.lastIndexOf('</div>');
if(lastIndex !== -1) {
  content = content.substring(0, lastIndex) + modalJsx + content.substring(lastIndex);
}

// Add Brain to lucide imports if missing
if (!content.includes('Brain')) {
    content = content.replace(/import {([^}]+)} from 'lucide-react';/, "import { $1, Brain, X } from 'lucide-react';");
} else if (!content.includes('X }')) {
    content = content.replace(/import {([^}]+)} from 'lucide-react';/, "import { $1, X } from 'lucide-react';");
}

fs.writeFileSync('New/src/pages/Iqac.jsx', content);
