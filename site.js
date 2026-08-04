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
})();
