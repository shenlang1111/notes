const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'knowledge-base', 'domains');
const fix = (p) => {
  const files = fs.readdirSync(p);
  for (const f of files) {
    const fp = path.join(p, f);
    const st = fs.statSync(fp);
    if (st.isDirectory()) { fix(fp); continue; }
    if (!f.endsWith('.html')) continue;
    let c = fs.readFileSync(fp, 'utf8');
    const orig = c;
    // 内容页在 domains/xxx/ 下，需上两级才能到 knowledge-base 根
    c = c.replace(/href="\.\.\/_shared\/css\/style\.css"/g, 'href="../../_shared/css/style.css"');
    c = c.replace(/href="\.\.\/index\.html"/g, 'href="../../index.html"');
    if (c !== orig) { fs.writeFileSync(fp, c); console.log('FIXED', fp); }
  }
};
fix(root);
console.log('done');
