# 天赐材料日化知识库 — 技术维基（CODE_WIKI）

> 版本：v3.1（2026-08-02）· **技术维基（★ 推荐阅读）**：架构 / 目录 / 工具链 / 命令细节，供任何 AI 查技术实现
> 规则见《知识库维护规范.md》——本文档只承接"怎么做"的技术细节，不重复规则
>
> **文档关系**：总规则 → 知识库维护规范.md（★★★ 必读）｜ 项目背景 → PROJECT_CONTEXT.md（★★）｜ 修改追溯 → CHANGELOG.md（☆）｜ 历史经验 → 知识库"与 AI 的交流经验"页（会话记录域）｜ 本文档 = 技术维基（★ 推荐）

---

## 0. 快速索引

| 我要做什么 | 看哪一节 |
|---|---|
| 部署/验证本次修改 | §4.2 deploy.js、§5 部署 |
| 新增/修改内容页 | §6 更新工作流 |
| 加导航入口 | §3.1 nav.js（只改链接清单） |
| 手机版生成逻辑 | §4.1 build_mobile.js |
| 页面/索引数据结构 | §3.2 registry.json、§3.3 双格式 |
| 部署后看不到更新 | §5 缓存处理、§7 坑 3/6 |
| 出问题排查 | §7 常见坑速查 |

---

## 1. 项目总览

| 属性 | 说明 |
|------|------|
| **项目名称** | 天赐材料日化知识库 |
| **项目类型** | 静态 HTML 知识库（多页面 + 手机版单文件） |
| **技术栈** | HTML5 + CSS3 + 原生 JS；Node.js（≥18，内置 fetch）用于构建/部署脚本 |
| **内容规模** | 7 个内容域 · 29 个页面 · HTML/MD 双格式成对 |
| **托管** | GitHub Pages（shenlang1111/tinci-knowledge-base，branch=main） |
| **部署通道** | GitHub API（api.github.com）Contents 上传 + POST /pages/builds |
| **线上地址** | https://shenlang1111.github.io/tinci-knowledge-base/ |
| **最后更新** | 2026-08-02 |

---

## 2. 目录结构

### 2.1 根目录

```
学习公司产品知识树/
├── index.html               # 根入口：meta refresh + location.replace 双跳转 → knowledge-base/mobile.html?v=2
├── tools/
│   ├── build_mobile.js      # 生成 knowledge-base/mobile.html（deploy.js 绑定调用）
│   └── deploy.js            # 一键部署（成对校验 → 生成 mobile → 串行上传 → 构建 → 验证）
├── knowledge-base/          # ★ 知识库本体（详见 §2.2）
├── 知识库维护规范.md         # 总规则 v3.2（★★★ 必读）
├── PROJECT_CONTEXT.md       # 项目背景与交接（★★）
├── CHANGELOG.md             # 修改追溯（☆）
├── CODE_WIKI.md             # 本文档：技术维基（★）
├── .env                     # 部署 Token（gitignore，不入库、不进对话）
└── .gitignore
```

### 2.2 knowledge-base/

```
knowledge-base/
├── index.html               # 桌面首页（v2.0：home-hero + feature-grid 4 卡 + 5 分类 page-grid + last-updated）
├── mobile.html              # 手机版离线单文件（★ build_mobile.js 生成，勿手改）
├── registry.json            # 内容注册表（domains 数组 + pages 数组）
├── domains/                 # 内容页 HTML（5 域 19 页）
│   ├── 表面活性剂/          # fundamentals / anionic / cationic / amphoteric / nonionic / properties / synthesis / applications / products / advanced / troubleshooting（11 页）
│   ├── 日化原料与配方/      # formulation
│   ├── 销售与市场/          # market / sales
│   ├── 会话记录/            # session-20260801 / session-prompt / user-profile
│   └── 思考收件箱/          # inbox / inbox-20260802-agent-design
├── markdown/                # 与 domains 一一成对的 MD（AI 检索用，含元信息）
├── _shared/
│   ├── css/style.css        # 共享样式（青绿系，CSS 变量设计令牌）
│   └── js/nav.js            # 共享顶部导航（全站导航唯一维护点）
└── _preview_server.js       # 本地预览工具，deploy 明确排除（不上传）
```

---

## 3. 知识库模块

### 3.1 首页与导航（_shared/js/nav.js）

**机制**：内容页只放 `<div id="site-nav"></div>` 占位 + `<script src="../../_shared/js/nav.js" defer>`，导航由 nav.js 运行时动态渲染。

- **根路径推算**：`document.currentScript.src`（回退 `document.querySelector('script[src*="nav.js"]')`），用 `replace(/\/_shared\/js\/nav\.js[?#]?.*$/, '')` + `decodeURIComponent` 得到 knowledge-base 根路径——兼容 file:// 与 https://，**不依赖页面自身相对路径**。
- **链接清单**：脚本内 `items` 数组，每项 `[标题, 相对根路径]`，当前 29 项（如 `['基础概念', 'domains/表面活性剂/fundamentals.html']`）。**新增页面只需在此清单加一项**，全站导航自动同步。
- **渲染结构**：`<nav class="site-nav">` → 首页链接 `nav-home`（href = root + `/index.html`，含 `.nav-dot` 圆点 + 文案"天赐材料知识库"）+ `.nav-links` 内全部 `items` 链接。
- **当前页高亮**：`currentFile = decodeURIComponent(location.pathname.split('/').pop())`，逐个比较 `a.href.split('/').pop()` 文件名相等 → 加 `.active` 类。
- **挂载**：`document.getElementById('site-nav')`，找不到则静默（不报错）。

### 3.2 内容注册表（registry.json）

位于 `knowledge-base/registry.json`，顶层三字段：

```json
{
  "version": "1.0",
  "last_updated": "2026-08-01",
  "domains": [...],
  "pages": [...]
}
```

- **domains**：`[{ "name": "表面活性剂", "description": "..." }]`，当前 5 项：表面活性剂 / 日化原料与配方 / 销售与市场 / 思考收件箱 / 会话记录。新增分区必须在此登记（大改动，仅主 agent）。
- **pages**：每页一个对象，字段：
  | 字段 | 说明 | 示例 |
  |------|------|------|
  | `id` | 页 ID（= 文件名去 .html） | `fundamentals` |
  | `title` | 展示标题 | `基础概念与原理` |
  | `domain` | 所属域（须与 domains.name 一致） | `表面活性剂` |
  | `tags` | 标签数组（检索用） | `["基础","胶束","CPP","必读"]` |
  | `category` | 首页分类（基础理论/四大表面活性剂/实战应用/扩展阅读/AI 协作与日常） | `基础理论` |
  | `type` | 页面类型 | `article` |
  | `file` | 相对 knowledge-base/ 的路径 | `domains/表面活性剂/fundamentals.html` |
  | `updated` | 更新日期 | `2026-08-01` |
- 新增/删除页面必须同步 registry.json 的 pages（规范：内容类 DoD 含"registry 登记"）。

### 3.3 双格式（HTML 展示 / MD 检索）

- 成对关系：`domains/<域>/<页>.html` ↔ `markdown/<域>/<页>.md`，**必须同步维护，缺一告警**。
- 职责分工：HTML 给用户看；MD 给 AI 检索——MD 头部带元信息 `title` / `domain` / `tags` / `description`（以及 updated），AI 可据此定位内容。
- 成对校验：deploy.js 的 `checkPairs()` 双向扫描两个目录（HTML 无对应 MD / MD 无对应 HTML 都报），**警告不阻断部署**，但需确认。

### 3.4 mobile.html（手机版离线单文件）

- 位置：`knowledge-base/mobile.html`；**由 `tools/build_mobile.js` 自动生成，任何 AI 不得手改**（生成逻辑见 §4.1）。
- 定位：手机微信发送/直接打开即用、不依赖 WiFi 的离线单文件；根入口 index.html 跳转的就是它。
- 特征：内联全部 CSS、hash 导航（`#home` / `#<页id>`）、首页 + 全部内容页以 `div.page-panel` 平铺切换。

---

## 4. 工具链（tools/）

### 4.1 build_mobile.js（生成 mobile.html）

**输入 → 输出**：读 `_shared/css/style.css` 内联 + `knowledge-base/index.html`（首页） + `domains/**/*.html`（全部内容页） → 写 `knowledge-base/mobile.html`。

关键实现（理解即可，勿改逻辑）：

- **extractContainer(html)**：提取 `<div class="container">` 之间内容，用**配对计数**：depth 从 1 起，遇 `<div` 开标签 depth++、遇 `</div>` depth--，depth 归 0 即闭合点。
  > ⚠️ **不能用 `lastIndexOf('</div>')`**——container 外层还有 footer 等 div，直接找最后一个闭合会把 footer 截入面板。
- **页内清理**：去掉 page-hero 的"← 返回首页"链接行（`<a href="../../index.html" class="page-hero-back">`）和 footer 的返回首页段落。
- **cleanSections(body)**：平衡 section 标签——多余的 `</section>`（count 为 0 时）跳过删除，末尾缺多少补多少 `</section>`，防止内容页失衡标签破坏合并结构。
- **面板用 `div.page-panel`**（`id="panel-<页id>"`、`data-panel="<页id>"`），**不用 section**（避免与内容里 section 语义/样式冲突）；首页面板默认显示，内容页 `style="display:none"`。
- **导航**：`mobile-nav` sticky 顶部，`nav-toggle` 按钮展开/收起 `.nav-links`（hash 链接 `#home` / `#<页id>`）。
- **切换逻辑 showPage(id)**：隐藏所有 `.page-panel` → 显示目标面板 → 同步 `[data-nav]` 的 `.active` → 收起导航 → `window.scrollTo(0,0)` → 用面板内 h1 更新 `document.title`。
- **每次打开强制回首页**：`if (location.hash) { history.replaceState(null, '', location.pathname); } showPage('home');`——避免浏览器恢复上次 hash 位置。
- **相对链接重写**：`href="(?:\.\./)*([^"]*\.html)"` → `index.html` 变 `#home`、命中页面变 `#<页id>`、其余保留原样。

### 4.2 deploy.js（一键部署）

**用法**（在项目根目录执行）：

```bash
node tools/deploy.js                                     # 全量部署（所有 html/md/json/css/js）
node tools/deploy.js --files domains/表面活性剂/a.html   # 增量：指定文件（自动附带 mobile.html）
node tools/deploy.js --expect "domains/表面活性剂/a.html:胶束"   # 部署后验证本次修改上线
node tools/deploy.js --files a.html --expect "a.html:关键词"    # 可组合，--expect 可多个
```

**Token 读取（loadToken）**：优先环境变量 `GH_TOKEN`；否则读项目根 `.env`，正则 `^\s*GH_TOKEN\s*=\s*(.+?)\s*$` 提取；都没有 → 报错退出。**Token 绝不硬编码、不入 git 跟踪文件**。

**硬编码常量**：`REPO = 'shenlang1111/tinci-knowledge-base'`、`BRANCH = 'main'`、`CONCURRENCY = 1`（串行上传——并发写同一仓库会触发 GitHub git 层 409 保护）。

**完整流程**（main 函数，7 步）：

1. **双格式成对校验**（checkPairs）：扫描 domains/markdown，缺对警告（不阻断）。
2. **重新生成 mobile.html**：`execSync('node tools/build_mobile.js')`——绑定执行，保证手机版与内容同步。
3. **收集文件**（collectFiles）：
   - 全量：根 `index.html` + 递归 knowledge-base/，扩展名限 `html|md|json|css|js`，**排除 `_preview_server.js`**；
   - `--files`：指定文件（相对根路径，自动去 `./` 前缀）+ **强制附带 `knowledge-base/mobile.html`**（防手机版不同步）。
4. **串行上传**（CONCURRENCY=1 逐批）：每文件先 `getSha`（GET contents API；404 = 线上不存在 → 新建；非 200 抛错）→ PUT contents API（body：`message:'deploy: update <rel>'`、`content` base64、`branch: main`，有 sha 则带 `sha`）；PUT 返回 **409 → 跳过并报告**（"线上可能被并发修改，需主 agent 协调"）；非 200/201 → 记失败；**有失败即 `process.exit(1)` 中止部署**（不触发构建）。
5. **触发构建**（triggerBuild）：`POST /repos/<repo>/pages/builds`；**409 = 已有构建排队/进行中** → 记日志并改为等待现有构建完成；201/200 = 排队成功。
6. **轮询构建**（waitBuild）：`GET /repos/<repo>/pages/builds/latest`，每 15s 一次，超时 360000ms（6 分钟）报错；**竞态防护**：latest 的 `created_at` 早于本次触发时间 → 说明还是旧构建记录，继续等；`status='built'` 完成、`'errored'` 抛错（含 error.message）。
7. **服务器端验证**（verify）——以线上抓取为准，不能只看构建状态：
   - 拉线上 `knowledge-base/mobile.html`（GET contents API，base64 解码、去空白）；
   - 检查 footer 旧文案 `天赐材料日化知识库 · 基于` 出现次数 **必须为 0**；
   - 统计 `class="page-panel"` 数量（首页 + 内容页）；
   - 输出线上文件 size；
   - **`--expect "文件路径:关键词"`**（可多个）：逐个 GET 线上文件，去空白后 `includes(关键词)`，逐条打印 ✅/❌；❌ 提示人工核实。

**parseFlags 严格解析**：`--files` 与 `--expect` 各自收集参数，**遇到下一个 `--` 开头的参数立即停止**——避免 `--files` 把 `--expect` 的参数吞掉、或反之。

---

## 5. 部署与发布

- **线上地址**：https://shenlang1111.github.io/tinci-knowledge-base/
- **部署入口**：统一 `node tools/deploy.js`；完整流程与参数见 §4.2，部署验证规则见规范三。
- **缓存处理**：改版加版本参数 `?v=`（如 `_shared/css/style.css?v=3`、`knowledge-base/mobile.html?v=2`）；仍不见效 → 让用户清缓存/无痕窗口。

---

## 6. 更新工作流

### 6.1 内容更新流程（改已有页）

```
写/改内容 → 更新 domains/<域>/<页>.html → 同步 markdown/<域>/<页>.md → 更新 registry.json（title/tags/updated 等）
→ 部署 node tools/deploy.js --expect "文件:关键词"（mobile.html 由 deploy.js 绑定重新生成，无需手动跑 build_mobile）
→ 记 CHANGELOG → DoD 自检 → 通知用户
```

### 6.2 新增页面流程

1. 建 `domains/<域>/<页>.html`（按页面写作标准，见规范二-4/二-5）；
2. 建 `markdown/<域>/<页>.md`（成对，头部元信息 title/domain/tags/description）；
3. 登记 `registry.json` 的 pages 数组（id/title/domain/tags/category/type/file/updated）；
4. **在 `nav.js` 链接清单加一项**（全站导航自动同步）；
5. 首页 `knowledge-base/index.html` 加分类卡片（新分类则新增 category-title）；
6. **立即部署（不得跳过）**：`node tools/deploy.js --files <新页面及其登记文件> --expect "<新页面:关键词>"` 验证本次建页上线，再 + CHANGELOG + DoD。
   > ⚠️ 教训（2026-08-02）：用户画像页建好后漏了部署 → 线上 404 直到用户发现。**建页完成 ≠ 完成，部署验证上线才算完成**（铁律 3）。

### 6.3 DoD 驱动

DoD 详见《知识库维护规范》七（含用户检查手段）；此处不再重复。

---

## 7. 常见坑速查（技术类）

| # | 现象 | 根因 / 对策 |
|---|------|-------------|
| 1 | mobile.html 里面板混入 footer 内容 | container 闭合必须**配对计数**（extractContainer），不能用 `lastIndexOf('</div>')`（§4.1） |
| 2 | 手机版面板错乱/结构破坏 | 内容页 section 标签失衡 → cleanSections 兜底；面板一律用 `div.page-panel` 不用 section；写作时尽量保持标签闭合规范 |
| 3 | 部署后线上看不到更新 | 浏览器缓存 → 版本参数 `?v=` 递增；以**服务器端抓取**（deploy verify + --expect）为准，不能只看 built |
| 4 | 上传返回 409 | 并发写同一仓库触发 GitHub git 层 409 → deploy.js 固定 CONCURRENCY=1 串行上传；若仍 409 = 线上被其他会话并发修改，文件被跳过，需**主 agent 协调**后重跑 |
| 5 | Token 失效/被吊销 | Token 硬编码进仓库/对话会被 GitHub 自动吊销 → 只存项目根 `.env`（gitignore），`GH_TOKEN=xxx`，部署时由 deploy.js 读取 |
| 6 | PowerShell `Invoke-WebRequest` 抓 GitHub Pages 报 404 误判 | PowerShell 对 GitHub Pages 响应解析不稳（可能把页面内容当错误）→ 用 **Node `fetch`**（deploy.js verify 即 Node fetch 走 GitHub API，服务器端验证一律以此为准） |
| 7 | 构建状态 built 但内容没上线 | Pages 构建有排队/竞态 → deploy.js waitBuild 有 `created_at` 竞态防护；验证必须服务器端抓取 + `--expect` |
| 8 | 导航多处不同步 | 顶部导航只维护 `nav.js` 的 items 清单，内容页只放 `#site-nav` 占位，禁止在各页硬编码导航 |
| 9 | mobile.html 被手改后丢失 | mobile.html 是生成产物，手改会在下次部署被覆盖 → 任何修改走内容页 + 重新生成，勿手改 mobile.html |

---

> 文档版本：v3.1 | 最后更新：2026-08-02 | 规则以《知识库维护规范.md》为准；历史经验见知识库"与 AI 的交流经验"页
