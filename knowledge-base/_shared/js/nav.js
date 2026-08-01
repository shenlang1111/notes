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
    ['精细化工工艺', 'domains/精细化工与扩展/finechem-engineering.html'],
    ['天赐学习手册', 'domains/销售与市场/tinci-surfactant-guide.html'],
    ['两性表活目录', 'domains/销售与市场/tinci-amphoteric-summary.html'],
    ['工作日志', 'domains/工作日志/logs-2026-08.html'],
    ['7月日志', 'domains/工作日志/logs-2026-07.html'],
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
})();
