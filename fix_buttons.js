const fs = require('fs');
const pages = ['Iqac.jsx', 'Nba.jsx', 'Naac.jsx', 'Moocs.jsx', 'rd.jsx', 'uba.jsx', 'ariia.jsx', 'IdeaLab.jsx', 'IIC.jsx'];

pages.forEach(file => {
    let content = fs.readFileSync('New/src/pages/' + file, 'utf8');

    let count = 0;
    while(content.match(/<button([^>]*)>([\s\S]*?)<\/a>/)) {
        content = content.replace(/<button([^>]*)>([\s\S]*?)<\/a>/, '<button$1>$2</button>');
        count++;
    }
    
    fs.writeFileSync('New/src/pages/' + file, content);
    console.log(file, 'fixed', count, 'buttons');
});
