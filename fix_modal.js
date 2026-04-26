const fs = require('fs');
const pages = ['Naac.jsx','Moocs.jsx','rd.jsx','uba.jsx','ariia.jsx','IdeaLab.jsx','IIC.jsx'];

// The inline PDF modal JSX to inject
const inlineModal = `      {/* PDF Modal */}
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
              className="w-full max-w-5xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
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
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="flex-1 relative">
                <iframe src={selectedPdf} className="absolute inset-0 w-full h-full border-0" title="PDF Preview" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>`;

pages.forEach(f => {
  let c = fs.readFileSync('New/src/pages/'+f, 'utf8');

  // 1. Remove PdfModal import line
  c = c.replace(/import PdfModal from ['"]\.\.\/components\/PdfModal['"];\n/g, '');

  // 2. Replace <PdfModal ... /> with inline modal (handles both prop styles)
  c = c.replace(/<PdfModal\s+selectedPdf=\{selectedPdf\}\s+setSelectedPdf=\{setSelectedPdf\}\s*\/>/g, inlineModal);

  // 3. Ensure BookOpen, ExternalLink, X are in lucide imports
  // Find the lucide import line and add missing icons
  c = c.replace(/import \{([^}]+)\} from 'lucide-react';/, (match, icons) => {
    const iconList = icons.split(',').map(i => i.trim()).filter(Boolean);
    const needed = ['BookOpen', 'ExternalLink', 'X'];
    needed.forEach(icon => {
      if (!iconList.includes(icon)) iconList.push(icon);
    });
    return `import { ${iconList.join(', ')} } from 'lucide-react';`;
  });

  // 4. Fix any remaining bg-slate-50 (except bg-slate-50/50 which is fine in modal header)
  // We don't want section backgrounds being slate-50, but bg-slate-50/50 in modal is ok
  // So we replace standalone bg-slate-50 but not bg-slate-50/...
  c = c.replace(/\bbg-slate-50\b(?!\/)/g, 'bg-white');

  // 5. Remove stray references that might remain
  c = c.replace(/\bimport PdfModal.*\n/g, '');

  fs.writeFileSync('New/src/pages/'+f, c);
  console.log('Fixed:', f);
});
