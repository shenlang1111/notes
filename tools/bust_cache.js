const fs = require('fs');
const path = require('path');

const targets = [
  path.join(__dirname, '..', 'knowledge-base', 'index.html'),
  path.join(__dirname, '..', 'knowledge-base', 'domains'),
];

const fixFile = (fp) => {
  if (!fp.endsWith('.html')) return;
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;
  c = c.replace(/(_shared\/css\/style\.css)(")/g, '$1?v=3$2');
  if (c !== orig) { fs.writeFileSync(fp, c); console.log('BUSTED', fp); }
};

const fixDir = (p) => {
  const files = fs.readdirSync(p);
  for (const f of files) {
    const fp = path.join(p, f);
    const st = fs.statSync(fp);
    if (st.isDirectory()) { fixDir(fp); continue; }
    fixFile(fp);
  }
};

fixFile(targets[0]);
fixDir(targets[1]);
console.log('done');
