const fs = require('fs');

const pagesDir = 'New/src/pages';
const pages = ['Nba.jsx', 'Naac.jsx', 'Moocs.jsx', 'rd.jsx', 'uba.jsx', 'ariia.jsx', 'IdeaLab.jsx', 'IIC.jsx'];

function processFile(filename) {
    let content = fs.readFileSync('New/src/pages/' + filename, 'utf8');

    // 1. Add PdfModal imports if not present
    if (!content.includes("import PdfModal")) {
        content = content.replace(/(import React.*?;\n)/, "$1import PdfModal from '../components/PdfModal';\n");
    }

    // 2. Add state for PDF modal
    const functionRegex = /export default function [A-Za-z0-9_]+\(\) \{\n/;
    if (content.match(functionRegex) && !content.includes("const [selectedPdf, setSelectedPdf] = useState(null);")) {
        content = content.replace(functionRegex, (match) => {
            return match + "  const [selectedPdf, setSelectedPdf] = useState(null);\n";
        });
    }

    if (content.includes('useState') && !content.includes('import { useState }') && !content.includes('import React, { useState')) {
        content = content.replace(/import React from 'react';/, "import React, { useState, useEffect } from 'react';");
        content = content.replace(/import React, \{ useEffect \} from 'react';/, "import React, { useEffect, useState } from 'react';");
    }

    // 3. Inject PdfModal
    if (!content.includes("<PdfModal")) {
        const lastDivIndex = content.lastIndexOf("</div>");
        if (lastDivIndex !== -1) {
            content = content.substring(0, lastDivIndex) + `\n      <PdfModal selectedPdf={selectedPdf} setSelectedPdf={setSelectedPdf} />\n    ` + content.substring(lastDivIndex);
        }
    }

    // 4. Backgrounds & padding
    content = content.replace(/bg-slate-50/g, 'bg-white');
    content = content.replace(/bg-slate-100/g, 'bg-white');
    content = content.replace(/bg-slate-900/g, 'bg-white');
    // For text colors inside PageHero, they should stay white if there's an image bg, but here we don't have images bg, we have white bg!
    // But PageHero handles its own colors. The user changed text-white to text-slate-800 where necessary.
    // I will only replace text-white with text-slate-800 outside of PageHero components if possible, but actually user already replaced them mostly.
    content = content.replace(/text-white mb-6">/g, 'text-slate-800 mb-6">');
    content = content.replace(/text-slate-800\/[0-9]+/g, 'text-slate-600');
    content = content.replace(/text-slate-800\/50/g, 'text-slate-500');

    content = content.replace(/py-24/g, 'pt-16 pb-8');
    content = content.replace(/py-16/g, 'pt-16 pb-8');
    content = content.replace(/py-32/g, 'pt-16 pb-8');

    if (filename === 'IdeaLab.jsx') {
        content = content.replace(/showParticles=\{true\}/g, 'showParticles={false}');
    }

    if (filename === 'Nba.jsx') {
        content = content.replace(/<div className="max-w-5xl mx-auto mt-24 relative">[\s\S]*?{historicalCycles.map\(\(cycle, i\) => \(/m, 
`<div className="max-w-7xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historicalCycles.map((cycle, i) => (`
        );

        content = content.replace(/<motion\.div\s*key=\{i\}[\s\S]*?className={`relative flex flex-col md:flex-row items-center gap-8.*?`}[\s\S]*?{cycle.programs}[\s\S]*?Quality Assurance Audit Passed<\/span>\s*<\/div>\s*<\/div>\s*<\/div>[\s\S]*?<\/motion\.div>/m,
`<motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[20px] bg-white border border-slate-200 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,139,139,0.12)] hover:border-brand-accent/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 text-[120px] font-heading font-black italic text-slate-50 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-accent/5 border border-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform duration-500">
                      <History size={28} />
                    </div>
                    <div className="px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full">
                      <span className="text-[9px] font-mono font-black text-brand-accent uppercase tracking-widest">{cycle.status}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-2 leading-tight">
                    {cycle.period}
                  </h3>
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Programmes</h4>
                      <p className="text-sm font-heading font-black italic text-brand-accent">{cycle.programs}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[3px] bg-brand-accent w-0 group-hover:w-full transition-all duration-700" />
              </motion.div>`
        );

        content = content.replace(/\{\/\* ── 04\. ACCREDITATION TIMELINE ── \*\/\}[\s\S]*?\{\/\* ── 05\. ACCREDITATION NODE ── \*\/\}/m, '{/* ── 05. ACCREDITATION NODE ── */}');
    }

    // Safe <a> tag modification for PDFs
    content = content.replace(/<a([^>]*?)href=\{([^\}]+)\}([^>]*?)>/g, (match, p1, p2, p3) => {
        if (p2.includes('.url') || p2.includes('.pdf') || match.includes('.pdf')) {
            if(match.includes('download')) return match; // Keep actual download links untouched
            let newP3 = p3.replace(/target="_blank"/g, '').replace(/rel="[^"]+"/g, '');
            return `<a${p1}href="#" onClick={(e) => { e.preventDefault(); setSelectedPdf(${p2}); }}${newP3}>`;
        }
        return match;
    });

    content = content.replace(/<a([^>]*?)href="([^"]+\.pdf)"([^>]*?)>/gi, (match, p1, p2, p3) => {
        if(match.includes('download')) return match;
        let newP3 = p3.replace(/target="_blank"/g, '').replace(/rel="[^"]+"/g, '');
        return `<a${p1}href="#" onClick={(e) => { e.preventDefault(); setSelectedPdf("${p2}"); }}${newP3}>`;
    });

    fs.writeFileSync('New/src/pages/' + filename, content);
}

pages.forEach(processFile);
