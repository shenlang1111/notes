/* ========================================
   天赐材料日化知识库 · 全站共享脚本
   1) 主题切换（light/dark，localStorage 记忆）
   2) 移动端导航（汉堡菜单）
   3) 站内搜索（小节级定位 + 多词 AND + 同义词联想 + 搜索历史 + 跳转高亮）
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
    var ods = links.querySelectorAll('.nav-dd.open');
    for (var oi = 0; oi < ods.length; oi++) ods[oi].classList.remove('open');
  }

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  links.addEventListener('click', function (e) {
    if (e.target && e.target.tagName === 'A') close();
  });

  /* 二级下拉：移动端点击展开/收起（桌面 hover 由 CSS 处理） */
  var dds = links.querySelectorAll('.nav-dd');
  for (var di = 0; di < dds.length; di++) {
    (function (dd) {
      var trig = dd.querySelector('.dd-trigger');
      if (!trig) return;
      trig.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation(); // 阻止冒泡到 .nav-links 委托（否则子菜单刚展开就被 close() 关闭）
          dd.classList.toggle('open');
        }
      });
    })(dds[di]);
  }

  document.addEventListener('click', function (e) {
    if (!links.contains(e.target) && !toggle.contains(e.target)) close();
  });

  /* ---------- 3) 站内搜索 ---------- */
  var scriptEl2 = document.currentScript ||
    document.querySelector('script[src*="site.js"]');
  var base = '';
  if (scriptEl2 && scriptEl2.src) {
    base = decodeURIComponent(scriptEl2.src.replace(/site\.js[?#]?.*$/, ''));
  }

  // 同义词联想表（销售场景常用说法 → 页面里出现的词）
  var SYNONYMS = {
    '温和': ['无盐', '低盐', '低刺激'],
    '无盐': ['低盐', '低刺激', '温和', '无氯'],
    '增稠': ['粘度', '高粘度', '凝胶'],
    '透明': ['清澈', '透光', '无沉淀'],
    '泡沫': ['起泡', '稳泡', '发泡'],
    '气味': ['低气味', '味道'],
    '防腐': ['无防腐', '清洁标签'],
    '婴童': ['婴儿', '儿童', '宝宝'],
    '成本': ['性价比', '便宜', '价格'],
    '进口': ['替代', '国产'],
    '绿色': ['RSPO', 'ESG', '可持续', '认证'],
    '认证': ['RSPO', 'ESG', '可持续']
  };

  var HISTORY_KEY = 'tinci-search-history';
  var index = null;
  var searchBtn = document.createElement('button');
  searchBtn.type = 'button';
  searchBtn.className = 'search-btn';
  searchBtn.textContent = '🔍';
  searchBtn.setAttribute('aria-label', '搜索');
  searchBtn.title = '搜索（Ctrl+K）';

  var panel = document.createElement('div');
  panel.className = 'search-panel';
  var box = document.createElement('div');
  box.className = 'search-box';
  var icon = document.createElement('span');
  icon.className = 'search-box-icon';
  icon.textContent = '🔍';
  var input = document.createElement('input');
  input.type = 'text';
  input.className = 'search-input';
  input.placeholder = '搜牌号 / 关键词 / 场景… 如：无盐、增稠、CAB';
  box.appendChild(icon);
  box.appendChild(input);
  var history = document.createElement('div');
  history.className = 'search-history';
  var results = document.createElement('div');
  results.className = 'search-results';
  panel.appendChild(box);
  panel.appendChild(history);
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

  function snippet(text, q) {
    if (!text) return '';
    var i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return text.slice(0, 40);
    var start = Math.max(0, i - 12);
    return (start > 0 ? '…' : '') + text.slice(start, i + q.length + 18) + '…';
  }

  /* ---------- 搜索历史 ---------- */
  function getHistory() {
    try {
      var h = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      return Array.isArray(h) ? h : [];
    } catch (e) { return []; }
  }
  function addHistory(w) {
    w = (w || '').trim();
    if (!w) return;
    var h = getHistory().filter(function (x) { return x !== w; });
    h.unshift(w);
    if (h.length > 10) h = h.slice(0, 10);
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h)); } catch (e) {}
  }
  function showHistory() {
    var h = getHistory();
    if (!h.length) return;
    history.innerHTML = '';
    var label = document.createElement('div');
    label.className = 'search-history-label';
    label.textContent = '搜索历史';
    var clear = document.createElement('button');
    clear.type = 'button';
    clear.className = 'search-history-clear';
    clear.textContent = '清空';
    clear.addEventListener('click', function () {
      try { localStorage.removeItem(HISTORY_KEY); } catch (e) {}
      history.innerHTML = '';
    });
    label.appendChild(clear);
    history.appendChild(label);
    for (var i = 0; i < h.length; i++) {
      (function (w) {
        var c = document.createElement('button');
        c.type = 'button';
        c.className = 'search-history-chip';
        c.textContent = w;
        c.addEventListener('click', function () {
          input.value = w;
          ensureIndex(function () { render(w); });
          input.focus();
        });
        history.appendChild(c);
      })(h[i]);
    }
  }

  /* ---------- 核心检索：多词 AND + 同义词联想 + 小节定位 ---------- */
  function partVariants(parts) {
    return parts.map(function (p) {
      var v = [p.toLowerCase()];
      var syn = SYNONYMS[p];
      if (syn) {
        for (var i = 0; i < syn.length; i++) {
          var s = syn[i].toLowerCase();
          if (v.indexOf(s) < 0) v.push(s);
        }
      }
      return v;
    });
  }
  function matchHay(hay, pv) {
    for (var pi = 0; pi < pv.length; pi++) {
      var ok = false;
      for (var vi = 0; vi < pv[pi].length; vi++) {
        if (hay.indexOf(pv[pi][vi]) >= 0) { ok = true; break; }
      }
      if (!ok) return false;
    }
    return true;
  }
  // 原始词命中加分（同义词命中不加分，保证原词优先）
  function scoreOrigin(hay, parts) {
    var s = 0;
    for (var i = 0; i < parts.length; i++) {
      if (hay.indexOf(parts[i].toLowerCase()) >= 0) s += 1;
    }
    return s;
  }

  function render(q) {
    results.innerHTML = '';
    q = (q || '').trim();
    if (!q) { showHistory(); return; }
    if (!index) return;
    var parts = q.split(/\s+/);
    var pv = partVariants(parts);
    var items = [];
    var seenUrl = {};
    for (var i = 0; i < index.length; i++) {
      var p = index[i];
      var tl = (p.title || '').toLowerCase();
      var dl = (p.desc || '').toLowerCase();
      var tl2 = (p.text || '').toLowerCase();
      // 页面级命中
      if (matchHay(tl, pv)) {
        items.push({ url: p.url, pageTitle: p.title, score: 6 + scoreOrigin(tl, parts) });
      } else if (matchHay(dl, pv)) {
        items.push({ url: p.url, pageTitle: p.title, score: 3 + scoreOrigin(dl, parts) });
      } else if (matchHay(tl2, pv)) {
        items.push({ url: p.url, pageTitle: p.title, score: 1 + scoreOrigin(tl2, parts) });
      }
      // 小节级命中（带锚点）
      var secs = p.sections || [];
      for (var j = 0; j < secs.length; j++) {
        var sec = secs[j];
        var st = (sec.title || '').toLowerCase();
        var haySec = (st + ' ' + (sec.text || '')).toLowerCase();
        if (!matchHay(haySec, pv)) continue;
        var score = matchHay(st, pv) ? 5 : 4;
        score += scoreOrigin(haySec, parts);
        if (matchHay(tl, pv)) score += 1;
        items.push({
          url: p.url + '#' + sec.id,
          pageTitle: p.title,
          secTitle: sec.title,
          snippet: snippet(sec.text, q),
          score: score
        });
      }
    }
    items.sort(function (a, b) { return b.score - a.score; });
    var finalItems = [];
    for (var k = 0; k < items.length; k++) {
      if (!seenUrl[items[k].url]) {
        seenUrl[items[k].url] = true;
        finalItems.push(items[k]);
      }
    }
    if (finalItems.length === 0) {
      var e = document.createElement('div');
      e.className = 'search-empty';
      e.textContent = '没有找到「' + q + '」相关结果，换个词试试';
      results.appendChild(e);
      return;
    }
    var n = Math.min(finalItems.length, 8);
    for (var t = 0; t < n; t++) {
      var h = finalItems[t];
      var a = document.createElement('a');
      a.href = base + h.url;
      a.className = 'search-item';
      var ti = document.createElement('div');
      ti.className = 'search-item-title';
      ti.textContent = h.secTitle ? h.secTitle : h.pageTitle;
      var sb = document.createElement('div');
      sb.className = 'search-item-sections';
      sb.textContent = h.secTitle
        ? ('在「' + h.pageTitle + '」中' + (h.snippet ? ' · ' + h.snippet : ''))
        : h.pageTitle;
      a.appendChild(ti);
      a.appendChild(sb);
      // 记住搜索词（跳转高亮）+ 记入历史
      (function (kw) {
        a.addEventListener('click', function () {
          try { sessionStorage.setItem('tinci-hl', kw); } catch (e) {}
          addHistory(kw);
        });
      })(q);
      results.appendChild(a);
    }
  }

  /* ---------- 4) 跳转后命中词短暂高亮（支持多词） ---------- */
  function applyHighlight() {
    var kw = null;
    try { kw = sessionStorage.getItem('tinci-hl'); sessionStorage.removeItem('tinci-hl'); } catch (e) {}
    if (!kw) return;
    var parts = kw.trim().split(/\s+/);
    if (!parts.length) return;
    var pl = parts.map(function (p) { return p.toLowerCase(); });
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var pending = [];
    var n;
    while ((n = walker.nextNode())) {
      if (!n.nodeValue || !n.nodeValue.trim()) continue;
      var pp = n.parentNode;
      if (pp && pp.closest && pp.closest('script,style,nav,footer,.search-panel')) continue;
      var lower = n.nodeValue.toLowerCase();
      for (var i = 0; i < pl.length; i++) {
        if (lower.indexOf(pl[i]) >= 0) { pending.push(n); break; }
      }
    }
    if (!pending.length) return;
    for (var j = 0; j < pending.length; j++) {
      var node = pending[j];
      var text = node.nodeValue;
      var lower2 = text.toLowerCase();
      var bestIdx = -1, bestLen = 0;
      for (var k = 0; k < pl.length; k++) {
        var ix = lower2.indexOf(pl[k]);
        if (ix >= 0 && (bestIdx < 0 || ix < bestIdx)) { bestIdx = ix; bestLen = parts[k].length; }
      }
      if (bestIdx < 0) continue;
      var mark = document.createElement('mark');
      mark.className = 'search-hl';
      mark.textContent = text.substr(bestIdx, bestLen);
      node.parentNode.insertBefore(document.createTextNode(text.substr(0, bestIdx)), node);
      node.parentNode.insertBefore(mark, node);
      node.parentNode.insertBefore(document.createTextNode(text.substr(bestIdx + bestLen)), node);
      node.parentNode.removeChild(node);
    }
    var marks = document.querySelectorAll('mark.search-hl');
    setTimeout(function () {
      for (var j2 = 0; j2 < marks.length; j2++) marks[j2].classList.add('fade');
    }, 3000);
  }
  applyHighlight();

  /* ---------- 面板开关 ---------- */
  function openSearch() {
    panel.classList.add('open');
    input.focus();
    ensureIndex(function () { render(input.value); });
  }
  function closeSearch() {
    panel.classList.remove('open');
    input.value = '';
    results.innerHTML = '';
    history.innerHTML = '';
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
      addHistory(input.value);
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
