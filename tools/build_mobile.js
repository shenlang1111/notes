/**
 * build_mobile.js — 生成手机版离线单文件
 * 合并首页 + 全部内容页为一个自包含 HTML（内联 CSS、hash 导航）
 * 输出: knowledge-base/mobile.html（手机微信发送/直接打开即用）
 */
const fs = require('fs');
const path = require('path');

const KB = path.join(__dirname, '..', 'knowledge-base');
const CSS_FILE = path.join(KB, '_shared', 'css', 'style.css');
const OUT = path.join(KB, 'mobile.html');

const css = fs.readFileSync(CSS_FILE, 'utf8');

// 扫描 domains 下所有内容页
const domainsDir = path.join(KB, 'domains');
const pages = []; // {id, title, file}
for (const domain of fs.readdirSync(domainsDir)) {
  const dpath = path.join(domainsDir, domain);
  if (!fs.statSync(dpath).isDirectory()) continue;
  for (const f of fs.readdirSync(dpath)) {
    if (!f.endsWith('.html')) continue;
    pages.push({ id: f.replace('.html', ''), title: f.replace('.html', ''), file: path.join(dpath, f) });
  }
}

// 提取 <div class="container">...</div> 之间的内容
function extractContainer(html) {
  const start = html.indexOf('<div class="container">');
  const end = html.lastIndexOf('</div>');
  if (start < 0 || end < 0) return '';
  return html.slice(start + '<div class="container">'.length, end).trim();
}

// 读取首页内容
const homeHtml = fs.readFileSync(path.join(KB, 'index.html'), 'utf8');
let homeBody = extractContainer(homeHtml);

// 读取每个内容页
const panels = {};
for (const p of pages) {
  const html = fs.readFileSync(p.file, 'utf8');
  let body = extractContainer(html);
  // 去掉 page-hero 里的"返回首页"链接行
  body = body.replace(/\n?\s*<a href="\.\.\/\.\.\/index\.html" class="page-hero-back">← 返回首页<\/a>\s*\n?/g, '\n');
  // 去掉 footer 里的返回首页段落（如果有）
  body = body.replace(/\s*<p><a href="\.\.\/\.\.\/index\.html">返回首页<\/a><\/p>\s*/g, '');
  panels[p.id] = body;
}

// 构建导航：首页 + 各页面
const navLinks = [
  `<a href="#home" class="active" data-nav="home">首页</a>`,
  ...pages.map(p => `<a href="#${p.id}" data-nav="${p.id}">${p.title}</a>`)
].join('');

// 构建面板
const homePanel = `<section class="page-panel" id="panel-home" data-panel="home">\n${homeBody}\n</section>`;
const pagePanels = pages.map(p =>
  `<section class="page-panel" id="panel-${p.id}" data-panel="${p.id}" style="display:none">\n${panels[p.id]}\n</section>`
).join('\n');

// 相对链接重写为 hash 导航（html 后缀链接 -> #id）
const linkRewrite = pages.map(p => p.id).join('|');
const re = new RegExp(`href="(?:\\.\\./)*([^"]*\\.html)"`, 'g');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>天赐材料日化知识库 · 手机版</title>
<style>
${css}
/* ===== 手机版专用 ===== */
.mobile-nav{
  position:sticky;top:0;z-index:200;background:rgba(255,255,255,0.92);
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  border-bottom:1px solid var(--rule);
}
.mobile-nav .nav-top{display:flex;align-items:center;justify-content:space-between;padding:0.6rem 1.1rem;}
.mobile-nav .nav-brand{font-weight:800;font-size:0.95rem;color:var(--ink);display:flex;align-items:center;gap:0.5rem;}
.mobile-nav .nav-brand .dot{width:10px;height:10px;background:var(--nav-grad);border-radius:50%;box-shadow:0 0 0 4px rgba(20,184,166,0.14);}
.mobile-nav .nav-toggle{
  background:var(--accent-soft);color:var(--accent);border:none;border-radius:8px;
  padding:0.3rem 0.75rem;font-size:0.8rem;font-weight:700;cursor:pointer;
}
.mobile-nav .nav-links{display:none;flex-wrap:wrap;gap:0.3rem;padding:0 1.1rem 0.8rem;}
.mobile-nav .nav-links.open{display:flex;}
.mobile-nav .nav-links a{
  font-size:0.78rem;color:var(--muted);text-decoration:none;padding:0.3rem 0.7rem;
  border-radius:100px;background:var(--bg);border:1px solid var(--rule);font-weight:500;
}
.mobile-nav .nav-links a.active{background:var(--accent-soft);color:var(--accent);border-color:rgba(20,184,166,0.4);font-weight:700;}
body{padding-bottom:3rem;}
</style>
</head>
<body>

<nav class="mobile-nav" id="mobileNav">
  <div class="nav-top">
    <span class="nav-brand"><span class="dot"></span>天赐材料知识库</span>
    <button class="nav-toggle" id="navToggle" onclick="toggleNav()">☰ 目录</button>
  </div>
  <div class="nav-links" id="navLinks">
    ${navLinks}
  </div>
</nav>

<div class="container mobile-body">
${homePanel}
${pagePanels}
</div>

<script>
function toggleNav(){document.getElementById('navLinks').classList.toggle('open');}
function showPage(id){
  document.querySelectorAll('.page-panel').forEach(p=>p.style.display='none');
  document.querySelectorAll('[data-nav]').forEach(a=>a.classList.remove('active'));
  var panel=document.getElementById('panel-'+id);
  if(panel){panel.style.display='block';var nav=document.querySelector('[data-nav="'+id+'"]');if(nav)nav.classList.add('active');}
  document.getElementById('navLinks').classList.remove('open');
  window.scrollTo(0,0);
  document.title=panel&&panel.querySelector('h1')?(panel.querySelector('h1').textContent+' · 天赐材料知识库'):'天赐材料知识库';
}
function route(){
  var h=location.hash.replace('#','');
  showPage(h||'home');
}
window.addEventListener('hashchange',route);
route();
</script>
</body>
</html>
`;

// 把页面间的相对链接改写为 hash 锚点
const finalHtml = html.replace(re, (m, target) => {
  const base = target.split('/').pop().replace('.html', '');
  if (base === 'index') return 'href="#home"';
  if (pages.some(p => p.id === base)) return `href="#${base}"`;
  return m;
});

fs.writeFileSync(OUT, finalHtml, 'utf8');
console.log('OK →', OUT);
console.log('pages:', pages.length);
