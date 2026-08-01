# 天赐材料日化知识库 — Code Wiki

> 本文档是一个完整的结构化代码维基，涵盖项目架构、模块职责、关键组件、依赖关系与运行方式。

---

## 目录

1. [项目概述](#1-项目概述)
2. [项目架构](#2-项目架构)
3. [目录结构](#3-目录结构)
4. [主知识库模块 (knowledge-base)](#4-主知识库模块-knowledge-base)
   - [4.1 首页 (index.html)](#41-首页-indexhtml)
   - [4.2 内容注册表 (registry.json)](#42-内容注册表-registryjson)
   - [4.3 页面详情](#43-页面详情)
   - [4.4 共享样式系统 (style.css)](#44-共享样式系统-stylecss)
5. [独立子项目模块](#5-独立子项目模块)
6. [关键组件与类说明](#6-关键组件与类说明)
7. [依赖关系](#7-依赖关系)
8. [项目运行方式](#8-项目运行方式)
9. [更新工作流](#9-更新工作流)
10. [附录：产品信息速查](#10-附录产品信息速查)

---

## 1. 项目概述

| 属性 | 说明 |
|------|------|
| **项目名称** | 天赐材料日化知识库 |
| **项目类型** | 静态 HTML 知识库网站（按领域组织） |
| **目标用户** | 天赐材料（Tinci Materials）日化销售团队 |
| **核心目标** | 系统学习表面活性剂及相关日化原料知识，从理论到实战 |
| **技术栈** | HTML5 + CSS3 + JavaScript（Mermaid.js / ECharts） |
| **知识来源** | 《精细化工工艺学》（第四版）宋启煌主编 + 天赐材料产品目录 |
| **总代码量** | 约 4,500+ 行（主知识库 14 个页面 + 1 个共享样式表 + 6 个独立子项目） |
| **最后更新** | 2026年8月1日 |

---

## 2. 项目架构

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        天赐材料日化知识库 (Project Root)                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────┐  ┌────────────────────────────────────┐ │
│  │   主知识库 (knowledge-base)   │  │       独立子项目 (6个)              │ │
│  │   ★ 核心交付物               │  │   旧版备份 / 专题深入 / 辅助工具     │ │
│  │                             │  │                                    │ │
│  │  index.html  ← 首页导航      │  │  surfactant-chapter3/              │ │
│  │  registry.json ← 内容注册表  │  │    └─ 旧版第3章完整单文件（备份）     │ │
│  │  _shared/css/style.css      │  │                                    │ │
│  │  domains/                   │  │  tinci-daily-chemical-knowledge/    │ │
│  │    ├─ 表面活性剂/ (11页)     │  │    └─ 天赐日化知识树（可视化总览）    │ │
│  │    ├─ 日化原料与配方/ (1页)  │  │                                    │ │
│  │    ├─ 销售与市场/ (2页)     │  │  tinci-product-guide/               │ │
│  │    └─ 笔记收件箱/ (空)      │  │    └─ 天赐产品详细手册               │ │
│  │                             │  │                                    │ │
│  └─────────────────────────────┘  │  tinci-surfactant-guide/            │
│                                    │    └─ 天赐表面活性剂专题指南         │
│                                    │                                    │
│                                    │  tinci-amphoteric-summary/          │
│                                    │    └─ 天赐两性表活产品目录分析       │
│                                    │                                    │
│                                    │  fine-chemical-tech-notes/          │
│                                    │    └─ 《精细化工工艺学》整书笔记     │
│                                    │                                    │
│                                    │  content-workbench/                 │
│                                    │    └─ 内容管理工作台（辅助工具）     │
│                                    │                                    │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  PROJECT_CONTEXT.md  ← 项目交接文档（AI 上下文）                     │    │
│  │  .screenshots/        ← 页面截图（25+ 张 PNG）                       │    │
│  │  .trae-html-share-packages/ ← 打包归档（.zip）                       │    │
│  └──────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. 目录结构

```
学习公司产品知识树/
├── PROJECT_CONTEXT.md                    # 项目上下文交接文档
├── knowledge-base/                       # ★ 主知识库（核心交付物）
│   ├── index.html                        # 首页导航入口（167行）
│   ├── registry.json                     # 内容注册表（AI 自动维护）
│   ├── _shared/
│   │   ├── css/
│   │   │   └── style.css                 # 全局共享样式表（167行）
│   │   └── js/                           # JS库目录（按需复制）
│   └── domains/                          # 按领域分文件夹
│       ├── 表面活性剂/                    # 11个页面
│       │   ├── fundamentals.html         # 基础概念与原理（1284行，最大页面）
│       │   ├── anionic.html              # 阴离子表面活性剂（311行）
│       │   ├── cationic.html             # 阳离子表面活性剂（115行）
│       │   ├── amphoteric.html           # 两性表面活性剂（296行）
│       │   ├── nonionic.html             # 非离子表面活性剂（124行）
│       │   ├── properties.html           # 核心物化性质（206行）
│       │   ├── synthesis.html            # 合成工艺详解（340行）
│       │   ├── applications.html         # 应用原理深度（260行）
│       │   ├── products.html             # 天赐产品全对照（123行）
│       │   ├── advanced.html             # 新型表活与检测（329行）
│       │   └── troubleshooting.html      # 客户问题诊断（138行）
│       ├── 日化原料与配方/                # 1个页面
│       │   └── formulation.html          # 配方设计（404行）
│       ├── 销售与市场/                    # 2个页面
│       │   ├── market.html               # 市场趋势与竞争（118行）
│       │   └── sales.html                # 销售话术与附录（231行）
│       └── 笔记收件箱/                    # 空，待补充
├── surfactant-chapter3/                  # 旧版单文件备份
│   ├── surfactant-chapter3.html
│   └── _shared/js/mermaid.min.js
├── tinci-daily-chemical-knowledge/       # 知识树可视化
│   ├── tinci-daily-chemical-knowledge.html
│   └── _shared/js/{mermaid.min.js, echarts.min.js}
├── tinci-product-guide/                  # 产品手册
│   ├── tinci-product-guide.html
│   └── _shared/js/mermaid.min.js
├── tinci-surfactant-guide/               # 表活专题指南
│   ├── tinci-surfactant-guide.html
│   └── _shared/js/mermaid.min.js
├── tinci-amphoteric-summary/             # 两性表活目录分析
│   ├── tinci-amphoteric-summary.html
│   └── _shared/js/mermaid.min.js
├── fine-chemical-tech-notes/             # 精细化工工艺学笔记
│   ├── fine-chemical-tech-notes.html
│   └── (内嵌样式，无外部CSS)
├── content-workbench/                    # 内容管理工作台
│   └── content-workbench.html
├── .screenshots/                         # 页面截图（25+ PNG）
└── .trae-html-share-packages/            # 打包归档（.zip）
```

---

## 4. 主知识库模块 (knowledge-base)

主知识库是项目的核心交付物，采用**多页面静态站点**架构。所有页面通过统一导航栏（`.site-nav`）互连，共用同一套 CSS 样式系统。页面按领域分文件夹组织，通过 `registry.json` 统一管理。

### 页面模板结构

每个知识页面遵循统一的 HTML 模板：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{页面标题} · 天赐材料知识库</title>
  <link rel="stylesheet" href="../_shared/css/style.css">
</head>
<body>
  <!-- 顶部导航栏 -->
  <nav class="site-nav">
    <a href="../index.html" class="nav-home"><span class="nav-dot"></span>天赐材料知识库</a>
    <div class="nav-links">
      <!-- 14个页面链接，跨域用 ../{领域}/{页面}.html，同域直接用 {页面}.html -->
    </div>
  </nav>

  <div class="container">
    <!-- 内容区域：section > h2/h3 > card/callout/table-wrap/diagram 等 -->
  </div>
</body>
</html>
```

### 4.1 首页 (index.html)

**文件**: `knowledge-base/index.html` (167行)

**职责**: 知识库入口导航，提供分类浏览和快速访问。

**关键元素**:

| 元素 | CSS 类 | 说明 |
|------|--------|------|
| 英雄区 | `.home-hero` | 标题 + 副标题 + 快速访问栏 |
| 快速访问栏 | `.quick-bar` | 14个圆角链接按钮，直达各页面 |
| 特性网格 | `.feature-grid` / `.feature-item` | 4个特性卡片（14专题/教材+产品/持续更新/响应式） |
| 分类标题 | `.category-title` | 分类标签（基础理论/四大表活/实战应用/扩展阅读） |
| 页面卡片 | `.page-grid` / `.page-card` | 可点击的导航卡片，带图标和描述 |

**分类体系**:
- **基础理论**: fundamentals, properties, synthesis, applications
- **四大表活**: anionic, cationic, amphoteric, nonionic
- **实战应用**: products, formulation, troubleshooting, sales
- **扩展阅读**: advanced, market

### 4.2 内容注册表 (registry.json)

**文件**: `knowledge-base/registry.json`

**职责**: 自动维护的内容注册表，记录所有页面的元数据。AI 每次新增或更新页面时同步更新此文件。

**结构**:
```json
{
  "version": "1.0",
  "last_updated": "2026-08-01",
  "domains": [
    { "name": "表面活性剂", "description": "..." },
    { "name": "日化原料与配方", "description": "..." },
    { "name": "销售与市场", "description": "..." },
    { "name": "笔记收件箱", "description": "..." }
  ],
  "pages": [
    {
      "id": "fundamentals",
      "title": "基础概念与原理",
      "domain": "表面活性剂",
      "tags": ["基础", "胶束", "CPP", "必读"],
      "category": "基础理论",
      "type": "article",
      "file": "domains/表面活性剂/fundamentals.html",
      "updated": "2026-08-01"
    }
  ]
}
```

### 4.3 页面详情

| 序号 | 页面文件 | 领域 | 行数 | 核心内容 |
|------|----------|------|------|----------|
| 1 | `fundamentals.html` | 表面活性剂 | 1284 | 表面张力、Gibbs吸附、胶束理论（熵驱动/疏水效应/冰山结构）、CPP堆积参数、四大分类。含嵌入式 SVG 图表 |
| 2 | `anionic.html` | 表面活性剂 | 311 | 磺酸盐（LAS/AOS）、硫酸酯盐（K12/AES）、羧酸盐（氨基酸表活：甘氨酸/谷氨酸/丙氨酸/肌氨酸系列） |
| 3 | `cationic.html` | 表面活性剂 | 115 | 季铵盐（1231/1631/1831）、聚季铵盐（PQ-6/7/10）、PQ-7改性技术 |
| 4 | `amphoteric.html` | 表面活性剂 | 296 | 甜菜碱型（TC-CAB/LAB，天赐主力）、咪唑啉（TC-MAB）、氧化胺（TC-CAO/LAO）、磺基甜菜碱（TC-SHD） |
| 5 | `nonionic.html` | 表面活性剂 | 124 | AEO系列、Span/Tween、6501/CDEA、APG |
| 6 | `properties.html` | 表面活性剂 | 206 | CMC定义与测定、HLB值计算、Krafft点、浊点、含HLB可视化色条 |
| 7 | `synthesis.html` | 表面活性剂 | 340 | 10种合成路线：LAS磺化、AES乙氧基化+硫酸化、甜菜碱季铵化、氨基酸表活肖顿-鲍曼反应等 |
| 8 | `applications.html` | 表面活性剂 | 260 | 乳化（HLB法/PIT法）、增溶、洗涤去污（卷缩机理）、泡沫理论、复配协同（β参数）、消泡破乳 |
| 9 | `products.html` | 表面活性剂 | 123 | 教材知识点→天赐产品映射表、配方角色对照表、结构-性质-用途思维链总结 |
| 10 | `advanced.html` | 表面活性剂 | 329 | Gemini表活、生物表活（鼠李糖脂/槐糖脂）、氟/硅表活、GB/T分析检测标准 |
| 11 | `troubleshooting.html` | 表面活性剂 | 138 | 五大常见问题诊断：粘度不够/泡沫问题/浑浊沉淀/刺激性强/防腐失效。含根因→排查→方案→话术 |
| 12 | `formulation.html` | 日化原料与配方 | 404 | 五大相体系（水相/表活相/调理相/防腐相/香精相）、氨基酸洁面膏、透明产品、婴童配方 |
| 13 | `market.html` | 销售与市场 | 118 | 2025-2026市场数据、四大趋势（氨基酸爆发/绿色化/国产替代/定制化）、竞争格局 |
| 14 | `sales.html` | 销售与市场 | 231 | 六大核心话术（低盐/市占率/垂直整合/高纯度/生物降解/定制化）、选型指南、INCI命名规则、术语速查 |

### 4.4 共享样式系统 (style.css)

**文件**: `knowledge-base/_shared/css/style.css` (167行)

**职责**: 为所有知识页面提供统一的视觉风格和组件样式。

**设计令牌 (CSS 变量)**（v2 现代简约 · 青绿系）:

| 变量 | 值 | 用途 |
|------|-----|------|
| `--bg` | `#F5F8F7` | 页面背景色（微青绿） |
| `--bg2` | `#FFFFFF` | 卡片/组件背景色 |
| `--ink` | `#12302C` | 主文字颜色（深青绿黑） |
| `--muted` | `#5B7A75` | 次要文字颜色 |
| `--rule` | `#E3EDEA` | 边框/分割线 |
| `--accent` | `#0F766E` | 青绿主色 |
| `--accent2` | `#14B8A6` | 亮青辅色 |
| `--accent3` | `#059669` | 翠绿 |
| `--accent4` | `#F59E0B` | 琥珀强调色 |
| `--warning` | `#D97706` | 橙色警告 |
| `--success` | `#059669` | 绿色成功 |
| `--nav-grad` | `linear-gradient(135deg,#0F766E,#14B8A6)` | 导航/渐变元素 |
| `--shadow-sm/md/lg` | 青绿调柔和阴影 | 卡片层级阴影 |
| `--radius` | `12px` / `16px` | 圆角 |
| `--font-sans` | PingFang SC / Microsoft YaHei 等 | 中文字体栈 |
| `--font-mono` | JetBrains Mono / Consolas 等 | 等宽字体栈 |

**v2 视觉升级要点**:
- 主色调从蓝色系 → **青绿系**（呼应化工企业气质）
- 顶部导航 → **毛玻璃质感**（backdrop-filter + 半透明）
- 首页标题 → 青绿**渐变文字** + 径向光晕背景
- 卡片 → 柔和阴影、更大圆角、hover 上浮
- 表格 → 圆角容器包裹，表头青绿底
- 标签 → 胶囊圆角（100px）

**组件样式清单**:

| 组件 | CSS 选择器 | 说明 |
|------|-----------|------|
| 导航栏 | `.site-nav` | 顶部固定导航，56px高，含阴影 |
| 导航链接 | `.nav-links a` | 悬停时蓝色高亮 |
| 目录导航 | `.toc-nav` | 可折叠目录，grid布局 |
| 内容区 | `.section` | 章节容器，h2/h3/h4 层级标题 |
| 卡片 | `.card` | 基础卡片，支持 `.accent`/`.accent2`/`.accent3`/`.accent4`/`.warning` 边框变体 |
| 提示框 | `.callout` | 左侧彩色边框提示，支持 accent/accent2/accent3/accent4/warning 变体 |
| 表格 | `.table-wrap > table` | 响应式表格容器，斑马纹 + 悬停高亮 |
| 概念网格 | `.concept-grid` / `.concept-card` | 自适应卡片网格（min 260px） |
| 标签 | `.tag` | 小标签，支持 blue/green/purple/red/teal/orange 颜色 |
| 结构图 | `.struct-diagram` / `.struct-box` | 分子结构示意（油性/水性/中性） |
| 反应式 | `.reaction-box` | 等宽字体化学反应式 |
| HLB色条 | `.hlb-scale` / `.hlb-bar` / `.hlb-seg` | HLB值可视化 |
| 公式框 | `.formula-box` | 公式展示 |
| 流程图 | `.process-flow` / `.step` / `.step-num` | 编号步骤流程 |
| 图表容器 | `.diagram` | SVG 图表容器 |
| 高亮文本 | `mark.key` | 蓝色加粗关键词 |
| 页脚 | `footer` | 来源引用区 |
| 首页英雄区 | `.home-hero` | 首页标题区 |
| 页面卡片 | `.page-grid` / `.page-card` | 首页导航卡片，悬停上浮动效 |
| 分类标题 | `.category-title` | 首页分类标签 |

**响应式断点**: `@media(max-width: 768px)` 时隐藏导航链接、页面卡片改为单列。

---

## 5. 独立子项目模块

### 5.1 surfactant-chapter3（旧版备份）

**文件**: `surfactant-chapter3/surfactant-chapter3.html`

**职责**: 旧版第3章完整单文件页面，包含内嵌CSS（重复定义在 `style.css` 中的所有样式变量和组件）。已不再维护，保留作为内容备份。

**依赖**: `_shared/js/mermaid.min.js`（Mermaid 图表库）

### 5.2 tinci-daily-chemical-knowledge（知识树可视化）

**文件**: `tinci-daily-chemical-knowledge/tinci-daily-chemical-knowledge.html`

**职责**: 天赐日化业务知识树可视化总览，使用 ECharts 和 Mermaid 进行图表渲染。

**依赖**:
- `_shared/js/mermaid.min.js`
- `_shared/js/echarts.min.js`

### 5.3 tinci-product-guide（产品手册）

**文件**: `tinci-product-guide/tinci-product-guide.html`

**职责**: 天赐材料日化产品详细手册，内嵌CSS样式（独立的样式变量和组件定义）。

**依赖**: `_shared/js/mermaid.min.js`

### 5.4 tinci-surfactant-guide（表活专题指南）

**文件**: `tinci-surfactant-guide/tinci-surfactant-guide.html`

**职责**: 天赐材料表面活性剂专题学习指南，内嵌CSS样式。

**依赖**: `_shared/js/mermaid.min.js`

### 5.5 tinci-amphoteric-summary（两性表活目录分析）

**文件**: `tinci-amphoteric-summary/tinci-amphoteric-summary.html`

**职责**: 天赐温和两性表面活性剂产品目录归纳总结，内嵌CSS样式。

**依赖**: `_shared/js/mermaid.min.js`

### 5.6 fine-chemical-tech-notes（精细化工工艺学笔记）

**文件**: `fine-chemical-tech-notes/fine-chemical-tech-notes.html`

**职责**: 《精细化工工艺学》整书提炼笔记，内嵌CSS样式。无外部JS依赖。

### 5.7 content-workbench（内容管理工作台）

**文件**: `content-workbench/content-workbench.html`

**职责**: 内容管理辅助工具，提供独立的 UI 界面用于整理想法和内容。内嵌CSS样式，无外部依赖。

---

## 6. 关键组件与类说明

### 6.1 导航系统 (`.site-nav`)

```css
.site-nav {
  background: var(--bg2);
  border-bottom: 1px solid var(--rule);
  padding: 0 1.5rem;
  height: 56px;
  display: flex;
  align-items: center;
  position: sticky;      /* 粘性定位，滚动时始终可见 */
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
```

**功能**: 每个页面顶部固定导航栏，包含"首页"链接和全部14个页面的快捷导航。跨域导航使用 `../{领域}/{页面}.html` 相对路径，同域导航直接用 `{页面}.html`。

### 6.2 卡片系统 (`.card`)

```css
.card {
  background: var(--bg2);
  border: 1px solid var(--rule);
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  margin: 1rem 0;
}
.card.accent  { border-left: 4px solid var(--accent); }   /* 蓝色边框 */
.card.accent2 { border-left: 4px solid var(--accent2); }  /* 青色边框 */
.card.accent3 { border-left: 4px solid var(--accent3); }  /* 紫色边框 */
.card.accent4 { border-left: 4px solid var(--accent4); }  /* 红色边框 */
.card.warning { border-left: 4px solid var(--warning); background: var(--warning-soft); }
```

**用途**: 内容块容器，通过左侧彩色边框表达不同语义层级。

### 6.3 提示框系统 (`.callout`)

```css
.callout {
  background: var(--accent-soft);
  border-left: 4px solid var(--accent);
  border-radius: 0 8px 8px 0;
  padding: 0.85rem 1.1rem;
  margin: 1.25rem 0;
  font-size: 0.9rem;
}
/* 支持 accent2/accent3/accent4/warning 颜色变体 */
```

**用途**: 突出显示关键信息、注意事项、销售话术推荐等。

### 6.4 表格系统 (`.table-wrap`)

```css
.table-wrap { overflow-x: auto; margin: 1.25rem 0; }
table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
thead th { background: var(--accent-soft); color: var(--accent); ... }
tbody tr:nth-child(even) td { background: var(--bg); }  /* 斑马纹 */
tbody tr:hover td { background: var(--accent-soft); }    /* 悬停高亮 */
```

**用途**: 响应式数据表格，移动端可横向滚动。

### 6.5 标签系统 (`.tag`)

```css
.tag { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.1rem 0.45rem; border-radius: 4px; }
.tag-blue   { background: var(--accent-soft);   color: var(--accent); }
.tag-green  { background: var(--success-soft);  color: var(--success); }
.tag-purple { background: var(--accent3-soft);  color: var(--accent3); }
.tag-red    { background: var(--accent4-soft);  color: var(--accent4); }
.tag-teal   { background: var(--accent2-soft);  color: var(--accent2); }
.tag-orange { background: var(--warning-soft);  color: var(--warning); }
```

**用途**: 小型彩色标签，用于标记分类、等级、状态等。

### 6.6 图表系统 (`.diagram`)

```css
.diagram {
  background: var(--bg2);
  border: 1px solid var(--rule);
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1.25rem 0;
  text-align: center;
  overflow-x: auto;
}
.diagram svg { max-width: 100%; height: auto; }
```

**用途**: 内嵌 SVG 图表的容器，在 `fundamentals.html` 中大量使用。

### 6.7 流程图 (`.process-flow`)

```css
.process-flow { background: var(--bg2); border: 1px solid var(--rule); border-radius: 10px; padding: 1.25rem; }
.process-flow .step { display: flex; align-items: center; gap: 0.5rem; }
.process-flow .step-num { /* 圆形编号标记 */ }
```

**用途**: 展示合成工艺步骤、应用流程等。

### 6.8 概念网格 (`.concept-grid`)

```css
.concept-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
.concept-card { background: var(--bg2); border: 1px solid var(--rule); border-radius: 10px; padding: 1.1rem; }
```

**用途**: 自适应网格布局，用于并列展示多个概念卡片。

---

## 7. 依赖关系

### 7.1 依赖图

```
主知识库 (knowledge-base)
│
├── index.html ──────────────── registry.json (内容注册表，AI 维护)
│
├── domains/*.html ──────────── style.css (共享样式)
│                                 │
│                                 └── CSS 变量、组件样式、响应式规则
│
├── 独立子项目 (各自独立，无相互依赖)
│   ├── surfactant-chapter3/        ─── mermaid.min.js
│   ├── tinci-daily-chemical-knowledge/ ─── mermaid.min.js + echarts.min.js
│   ├── tinci-product-guide/        ─── mermaid.min.js
│   ├── tinci-surfactant-guide/     ─── mermaid.min.js
│   ├── tinci-amphoteric-summary/   ─── mermaid.min.js
│   ├── fine-chemical-tech-notes/   (无外部依赖)
│   └── content-workbench/           (无外部依赖)
│
├── PROJECT_CONTEXT.md ─── (AI 上下文文档，非代码依赖)
└── registry.json ──────── (内容注册表，非运行时依赖)
```

### 7.2 外部依赖

| 依赖 | 用途 | 使用位置 |
|------|------|----------|
| Mermaid.js | 流程图/图表渲染 | 6个子项目 `_shared/js/mermaid.min.js` |
| ECharts | 数据可视化图表 | 仅 `tinci-daily-chemical-knowledge` |

### 7.3 关键依赖规则

1. **主知识库 14 个页面**全部依赖 `../_shared/css/style.css`（从 domains/子目录引用），这是唯一的外部样式依赖
2. **独立子项目**各自内嵌 CSS 样式，互不依赖
3. **JS 库**（mermaid.min.js / echarts.min.js）仅独立子项目使用，主知识库页面不使用 JS
4. **registry.json** 是内容注册表，用于 AI 自动维护导航和索引，非运行时依赖
5. **PROJECT_CONTEXT.md** 是 AI 会话的交接文档，非运行时依赖

---

## 8. 项目运行方式

### 8.1 本地运行

本项目的所有页面都是**纯静态 HTML 文件**，无需任何构建工具或服务器，开箱即用。

**方式一：直接双击打开**
```
双击 knowledge-base/index.html 即可在浏览器中浏览
```

**方式二：本地 HTTP 服务器（推荐）**
```bash
# Python 3
python -m http.server 8080

# Node.js (需要安装 http-server)
npx http-server -p 8080

# 然后访问 http://localhost:8080/knowledge-base/
```

**方式三：VS Code Live Server**
```
安装 Live Server 插件 → 右键 index.html → "Open with Live Server"
```

### 8.2 浏览器兼容性

- 所有现代浏览器（Chrome / Edge / Firefox / Safari）均支持
- 响应式设计，支持移动端（手机/平板）
- 无 JavaScript 依赖（主知识库页面纯 HTML+CSS 即可完整渲染）

### 8.3 部署

项目为纯静态文件，可部署到任意静态托管服务：
- GitHub Pages
- Netlify / Vercel
- 公司内网文件服务器
- Nginx / Apache 静态目录

---

## 9. 更新工作流

### 9.1 内容更新流程

```
用户说一句模糊想法
       │
       ▼
  AI 理解意图、研究、回答
       │
       ├──→ 修改对应 domains/{领域}/*.html 文件
       │
       └──→ 同步更新 registry.json（如涉及元数据变化）
       │
       └──→ 如需更新导航，同时修改 index.html
       │
       ▼
  更新 PROJECT_CONTEXT.md（如涉及结构变化）
```

### 9.2 新增页面流程

1. 在 `domains/{领域}/` 下创建新 HTML 文件
2. 引用 `../_shared/css/style.css`
3. 复制现有页面的 `.site-nav` 导航栏模板（导航链接使用相对路径：跨域加 `../{领域}/`，同域直接用文件名）
4. 使用 `.card`、`.callout`、`.table-wrap` 等组件编写内容
5. 在 `registry.json` 的 `pages` 数组中添加页面记录
6. 更新 `index.html` 添加导航链接
7. 更新 `PROJECT_CONTEXT.md` 记录变更

### 9.3 新增领域流程

1. 在 `domains/` 下创建新文件夹
2. 在 `registry.json` 的 `domains` 数组中添加新领域
3. 后续页面创建时，导航链接自动计算跨域路径

### 9.4 样式规范

- 所有内容优先使用**表格和可视化**，减少纯文字段落
- 使用 `.card` 卡片组织模块化内容
- 使用 `.callout` 突出关键信息和销售话术
- 使用 `.tag` 进行快速分类标记
- 保持与现有页面风格一致，不引入新的全局样式变量

---

## 10. 附录：产品信息速查

### 10.1 天赐核心产品映射

| 产品代号 | 化学名称 | 分类 | 特点 |
|----------|----------|------|------|
| TC-CAB 35/35TF/30/97 | 椰油酰胺丙基甜菜碱 | 两性-羧基甜菜碱 | 增泡稳泡+协同增稠 |
| TC-LAB 35/35TF | 月桂酰胺丙基甜菜碱 | 两性-羧基甜菜碱 | C12短链，更温和 |
| TC-MAB 40LDL | 月桂基两性醋酸钠 | 两性-咪唑啉型 | 极温和，婴童适用 |
| TC-SHD 系列 | 椰油酰胺丙基羟基磺基甜菜碱 | 两性-磺基甜菜碱 | 耐硬水，pH宽域 |
| TC-CAO / TC-LAO | 椰油/月桂氧化胺 | 两性-氧化胺型 | 增泡增稠稳泡 |
| GCK30P → AMIN GCK95U(P) | 椰油酰甘氨酸钾 | 阴离子-氨基酸 | 温和清洁主表活 |
| CG30W → AMIN CG30 | 椰油酰谷氨酸二钠 | 阴离子-氨基酸 | 温和清洁 |
| PQ-7 → POLYQUTA 550/550F | 聚季铵盐-7 | 阳离子 | 护发调理 |

### 10.2 关键数据

- 2025年日化材料销量突破 **12万吨**
- 全球第三大两性表活生产商，市占率 **10.6%**
- 椰油酰谷氨酸二钠市占率 **31.8%** 行业第一
- 中国氨基酸洁面市场渗透率 **76-78%**

---

> **文档版本**: v1.1 | **生成日期**: 2026年8月1日 | **适用项目**: 天赐材料日化知识库