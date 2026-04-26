const fs = require('fs');
const pages = ['Naac.jsx','Moocs.jsx','rd.jsx','uba.jsx','ariia.jsx','IdeaLab.jsx','IIC.jsx'];
pages.forEach(f => {
  const c = fs.readFileSync('New/src/pages/'+f,'utf8');
  console.log(f, 
    '| PdfModal:', c.includes('PdfModal'), 
    '| selectedPdf state:', c.includes('const [selectedPdf'), 
    '| AnimatePresence:', c.includes('AnimatePresence'),
    '| slate-50 bg:', c.includes('bg-slate-50')
  );
});
