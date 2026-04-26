const fs = require('fs');
const pages = ['Iqac.jsx', 'Nba.jsx', 'Naac.jsx', 'Moocs.jsx', 'rd.jsx', 'uba.jsx', 'ariia.jsx', 'IdeaLab.jsx', 'IIC.jsx'];

pages.forEach(file => {
    let content = fs.readFileSync('New/src/pages/' + file, 'utf8');

    // Fix missing useState definitions
    if (!content.includes('const [selectedPdf, setSelectedPdf]')) {
        content = content.replace(/(export default function [a-zA-Z0-9_]+\(\) \{\s*)/, "$1  const [selectedPdf, setSelectedPdf] = useState(null);\n");
    }

    // Fix <button> not closing instead of </a>
    content = content.replace(/<span className="text-\[9px\] font-mono font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-maroon\/60">PDF<\/span>\s*<\/a>/g, '<span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-maroon/60">PDF</span>\n                </button>');
    content = content.replace(/<ChevronRight size=\{20\} className="text-slate-300 group-hover:translate-x-1 group-hover:text-brand-accent transition-all" \/>\s*<\/a>/g, '<ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 group-hover:text-brand-accent transition-all" />\n                </button>');
    content = content.replace(/<Download size=\{16\} className="text-slate-300 group-hover:text-brand-accent group-hover:translate-y-1 transition-all" \/>\s*<\/a>/g, '<Download size={16} className="text-slate-300 group-hover:text-brand-accent group-hover:translate-y-1 transition-all" />\n                </button>');
    content = content.replace(/<Download size=\{20\} className="text-slate-300 group-hover:text-brand-accent group-hover:translate-y-1 transition-all" \/>\s*<\/a>/g, '<Download size={20} className="text-slate-300 group-hover:text-brand-accent group-hover:translate-y-1 transition-all" />\n                </button>');

    fs.writeFileSync('New/src/pages/' + file, content);
});
