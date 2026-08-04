/* ========================================
   天赐材料日化知识库 · 全站共享脚本
   1) 主题切换（light/dark，localStorage 记忆）
   2) 移动端导航（汉堡菜单）
   ======================================== */
(function () {
  /* ---------- 1) 主题切换 ---------- */
  var rootEl = document.documentElement;
  var themeBtn = null;

  function savedTheme() {
    try { return localStorage.getItem('tinci-theme'); } catch (e) { return null; }
  }
  function storeTheme(t) {
    try { localStorage.setItem('tinci-theme', t); } catch (e) {}
  }
  function applyTheme(t) {
    var theme = t === 'dark' ? 'dark' : 'light';
    rootEl.classList.remove('light', 'dark');
    rootEl.classList.add(theme);
    storeTheme(theme);
    if (themeBtn) {
      var dark = theme === 'dark';
      themeBtn.textContent = dark ? '☀️' : '🌙';
      themeBtn.setAttribute('aria-label', dark ? '切换到亮色模式' : '切换到暗色模式');
    }
  }
  function initTheme() {
    var nav = document.querySelector('.site-nav');
    var navLinks = document.querySelector('.nav-links');
    if (!nav) return;
    themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.className = 'theme-toggle';
    themeBtn.title = '切换主题';
    themeBtn.setAttribute('aria-label', '切换主题');
    themeBtn.addEventListener('click', function () {
      applyTheme(rootEl.classList.contains('dark') ? 'light' : 'dark');
    });
    if (navLinks) nav.insertBefore(themeBtn, navLinks);
    else nav.appendChild(themeBtn);
    applyTheme(savedTheme());
  }
  initTheme();

  /* ---------- 2) 移动端导航（汉堡菜单） ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  function close() {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  links.addEventListener('click', function (e) {
    if (e.target && e.target.tagName === 'A') close();
  });

  document.addEventListener('click', function (e) {
    if (!links.contains(e.target) && !toggle.contains(e.target)) close();
  });

  /* ---------- 3) 站内搜索（静态索引 search-index.json + 即时过滤） ---------- */
  var scriptEl2 = document.currentScript ||
    document.querySelector('script[src*="site.js"]');
  var base = '';
  if (scriptEl2 && scriptEl2.src) {
    base = decodeURIComponent(scriptEl2.src.replace(/site\.js[?#]?.*$/, ''));
  }

  var index = null;
  var searchBtn = document.createElement('button');
  searchBtn.type = 'button';
  searchBtn.className = 'search-btn';
  searchBtn.textContent = '🔍';
  searchBtn.setAttribute('aria-label', '搜索');
  searchBtn.title = '搜索（Ctrl+K）';

  var panel = document.createElement('div');
  panel.className = 'search-panel';
  var input = document.createElement('input');
  input.type = 'text';
  input.className = 'search-input';
  input.placeholder = '搜牌号 / 关键词 / 场景… 如：无盐、增稠、CAB';
  var results = document.createElement('div');
  results.className = 'search-results';
  panel.appendChild(input);
  panel.appendChild(results);
  document.body.appendChild(panel);

  var navEl = document.querySelector('.site-nav');
  if (navEl) navEl.appendChild(searchBtn);

  function ensureIndex(cb) {
    if (index) { cb(); return; }
    fetch(base + 'search-index.json', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; cb(); })
      .catch(function () { cb(); });
  }

  function render(q) {
    results.innerHTML = '';
    q = (q || '').trim().toLowerCase();
    if (!q || !index) return;
    var hits = [];
    for (var i = 0; i < index.length; i++) {
      var p = index[i];
      var tl = (p.title || '').toLowerCase();
      var dl = (p.desc || '').toLowerCase();
      var sl = (p.sections || []).join(' ').toLowerCase();
      var tl2 = (p.text || '').toLowerCase();
      var hay = tl + ' ' + dl + ' ' + sl + ' ' + tl2;
      if (hay.indexOf(q) >= 0) {
        var score = 0;
        if (tl.indexOf(q) >= 0) score += 4;
        if (dl.indexOf(q) >= 0) score += 2;
        if (sl.indexOf(q) >= 0) score += 2;
        if (tl2.indexOf(q) >= 0) score += 1;
        hits.push({ p: p, s: score });
      }
    }
    hits.sort(function (a, b) { return b.s - a.s; });
    if (hits.length === 0) {
      var e = document.createElement('div');
      e.className = 'search-empty';
      e.textContent = '没有找到「' + q + '」相关结果，换个词试试';
      results.appendChild(e);
      return;
    }
    var n = Math.min(hits.length, 8);
    for (var j = 0; j < n; j++) {
      var h = hits[j].p;
      var a = document.createElement('a');
      a.href = base + h.url;
      a.className = 'search-item';
      var t = document.createElement('div');
      t.className = 'search-item-title';
      t.textContent = h.title;
      var s = document.createElement('div');
      s.className = 'search-item-sections';
      var sec = (h.sections && h.sections.length) ? h.sections.slice(0, 2).join(' · ') : h.desc;
      s.textContent = sec;
      a.appendChild(t);
      a.appendChild(s);
      results.appendChild(a);
    }
  }

  function openSearch() {
    panel.classList.add('open');
    input.focus();
    ensureIndex(function () { render(input.value); });
  }
  function closeSearch() {
    panel.classList.remove('open');
    input.value = '';
    results.innerHTML = '';
  }

  searchBtn.addEventListener('click', function () {
    if (panel.classList.contains('open')) { closeSearch(); return; }
    openSearch();
  });
  input.addEventListener('input', function () {
    ensureIndex(function () { render(input.value); });
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var first = results.querySelector('.search-item');
      if (first) location.href = first.getAttribute('href');
    }
  });
  document.addEventListener('click', function (e) {
    if (!panel.contains(e.target) && e.target !== searchBtn) closeSearch();
  });
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') closeSearch();
  });
})();
