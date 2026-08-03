/* 共享顶部导航：由 knowledge-base/_shared/js/nav.js 动态渲染，
   内容页只需 <div id="site-nav"></div> + 引用本脚本即可。 */
(function () {
  'use strict';

  // 推算 knowledge-base 根路径：脚本位于 <根>/_shared/js/nav.js
  var scriptEl = document.currentScript ||
    document.querySelector('script[src*="nav.js"]');
  if (!scriptEl || !scriptEl.src) return;
  var root = decodeURIComponent(
    scriptEl.src.replace(/\/_shared\/js\/nav\.js[?#]?.*$/, '')
  );

  var items = [
    ['基础概念', 'domains/表面活性剂/fundamentals.html'],
    ['阴离子', 'domains/表面活性剂/anionic.html'],
    ['阳离子', 'domains/表面活性剂/cationic.html'],
    ['两性', 'domains/表面活性剂/amphoteric.html'],
    ['非离子', 'domains/表面活性剂/nonionic.html'],
    ['APG', 'domains/表面活性剂/apg.html'],
    ['物化性质', 'domains/表面活性剂/properties.html'],
    ['合成工艺', 'domains/表面活性剂/synthesis.html'],
    ['应用原理', 'domains/表面活性剂/applications.html'],
    ['产品对照', 'domains/表面活性剂/products.html'],
    ['新型表活', 'domains/表面活性剂/advanced.html'],
    ['配方设计', 'domains/日化原料与配方/formulation.html'],
    ['问题诊断', 'domains/表面活性剂/troubleshooting.html'],
    ['市场趋势', 'domains/销售与市场/market.html'],
    ['销售话术', 'domains/销售与市场/sales.html'],
    ['AI 经验', 'domains/会话记录/session-20260801.html'],
    ['新会话话术', 'domains/会话记录/session-prompt.html'],
    ['用户画像', 'domains/会话记录/user-profile.html'],
    ['收件箱', 'domains/思考收件箱/inbox.html'],
    ['智能体设计', 'domains/思考收件箱/inbox-20260802-agent-design.html'],
    ['AI 工作记录', 'domains/思考收件箱/ai-worklog.html'],
    ['机制更新', 'domains/思考收件箱/mechanism-updates.html'],
    ['团队任务板', 'domains/思考收件箱/team-task-board.html'],
    ['健康度盘点', 'domains/思考收件箱/kb-health-checklist.html'],
    ['技术验证', 'domains/思考收件箱/brain-tech-verification.html'],
    ['UI美化经验', 'domains/会话记录/ui-beautification-guide.html'],
    ['规则方法论', 'domains/会话记录/rule-making-methodology.html'],
    ['助剂与添加剂', 'domains/精细化工与扩展/finechem-additives.html'],
    ['日用化学品', 'domains/精细化工与扩展/finechem-daily-chem.html'],
    ['涂料与展望', 'domains/精细化工与扩展/finechem-surfaces.html'],
    ['产品总览', 'domains/销售与市场/tinci-product-overview.html'],
    ['产品详解', 'domains/销售与市场/tinci-surfactant-details.html'],
    ['市场话术', 'domains/销售与市场/tinci-market-sales.html'],
    ['两性表活目录', 'domains/销售与市场/tinci-amphoteric-summary.html'],
    ['工作日志', 'domains/工作日志/logs-2026-08.html'],
    ['7月日志', 'domains/工作日志/logs-2026-07.html'],
    ['7月复盘', 'domains/工作日志/report-2026-07-下半月.html'],
    ['日志说明', 'domains/工作日志/logs-guide.html']
  ];

  var nav = document.createElement('nav');
  nav.className = 'site-nav';

  var home = document.createElement('a');
  home.className = 'nav-home';
  home.href = root + '/index.html';
  var dot = document.createElement('span');
  dot.className = 'nav-dot';
  home.appendChild(dot);
  home.appendChild(document.createTextNode('天赐材料知识库'));
  nav.appendChild(home);

  var links = document.createElement('div');
  links.className = 'nav-links';

  // 当前页高亮：比较路径末尾的文件名
  var currentFile = decodeURIComponent(location.pathname.split('/').pop());

  items.forEach(function (item) {
    var a = document.createElement('a');
    a.href = root + '/' + item[1];
    a.textContent = item[0];
    if (a.href.split('/').pop() === currentFile) {
      a.classList.add('active');
    }
    links.appendChild(a);
  });

  nav.appendChild(links);

  var mount = document.getElementById('site-nav');
  if (mount) {
    mount.appendChild(nav);
  }

  // —— 浮动速跳按钮（UI 美化 AI）——
  var floatNav = document.createElement('div');
  floatNav.className = 'float-nav';
  var details = document.createElement('details');
  details.className = 'float-details';
  var summary = document.createElement('summary');
  summary.className = 'float-btn';
  summary.textContent = '☰';
  details.appendChild(summary);
  var panel = document.createElement('div');
  panel.className = 'float-panel';
  // 知识页分组
  var group1 = document.createElement('div');
  group1.className = 'float-group';
  var label1 = document.createElement('div');
  label1.className = 'float-label';
  label1.textContent = '知识页';
  group1.appendChild(label1);
  items.slice(0, 15).forEach(function (item) {
    var a = document.createElement('a');
    a.href = root + '/' + item[1];
    a.textContent = item[0];
    if (a.href.split('/').pop() === currentFile) a.classList.add('active');
    group1.appendChild(a);
  });
  panel.appendChild(group1);
  // AI/日志页分组
  var group2 = document.createElement('div');
  group2.className = 'float-group';
  var label2 = document.createElement('div');
  label2.className = 'float-label';
  label2.textContent = 'AI 协作 / 日志';
  group2.appendChild(label2);
  items.slice(15).forEach(function (item) {
    var a = document.createElement('a');
    a.href = root + '/' + item[1];
    a.textContent = item[0];
    if (a.href.split('/').pop() === currentFile) a.classList.add('active');
    group2.appendChild(a);
  });
  panel.appendChild(group2);
  details.appendChild(panel);
  floatNav.appendChild(details);
  document.body.appendChild(floatNav);

  // —— 回到顶部按钮（UI 美化 AI v4）——
  var backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '\u2191';
  backToTop.setAttribute('aria-label', '回到顶部');
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(backToTop);
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  // —— 表格滚动阴影检测（UI 美化 AI v4）——
  document.querySelectorAll('.table-wrap').forEach(function (wrap) {
    function checkScroll() {
      if (wrap.scrollWidth > wrap.clientWidth) {
        wrap.classList.add('scrollable');
      } else {
        wrap.classList.remove('scrollable');
      }
    }
    checkScroll();
    window.addEventListener('resize', checkScroll);
  });

  // —— TOC 移动端自动折叠（UI 美化 AI v4）——
  if (window.innerWidth <= 768) {
    var tocs = document.querySelectorAll('details.toc-nav');
    for (var i = 0; i < tocs.length; i++) {
      tocs[i].removeAttribute('open');
    }
  }
})();
