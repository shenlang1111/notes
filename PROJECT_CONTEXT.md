# 项目上下文 · 天赐材料日化知识库

> 给下一个 AI 会话的交接文档。读完这个文件就能完全理解项目背景、用户需求、当前状态，无需重做任何工作。

---

## 用户画像

- **身份**：天赐材料（Tinci Materials）日化销售
- **目标**：系统学习表面活性剂及相关日化原料知识，从"知道产品叫什么"到"理解产品为什么这样"，最终能向客户讲清楚技术原理
- **学习方式**：通过和 AI 对话讨论概念，自动整理到知识库网页
- **知识起点**：有基础化学概念（认识羟基、羧基等），但对表活深层原理不熟
- **偏好**：喜欢通俗类比（漏斗、乐高零件、小触角、水外套）、表格、销售实战视角
- **痛点**：不希望每次更新都要说一大堆，希望说一句模糊想法就能自动整理

---

## 知识库结构

**位置**：`/workspace/knowledge-base/`

### 目录架构

```
knowledge-base/
├── index.html                  # 入口导航，分类展示所有页面
├── _shared/css/style.css       # 全局共享样式表
├── registry.json               # 内容注册表（AI 自动维护）
├── domains/                    # 按领域分文件夹
│   ├── 表面活性剂/              # 表面活性剂基础知识、分类、合成、性质、应用
│   │   ├── fundamentals.html    # 基础概念与原理
│   │   ├── anionic.html         # 阴离子表面活性剂
│   │   ├── cationic.html        # 阳离子表面活性剂
│   │   ├── amphoteric.html      # 两性表面活性剂
│   │   ├── nonionic.html        # 非离子表面活性剂
│   │   ├── properties.html      # 核心物化性质
│   │   ├── synthesis.html       # 合成工艺详解
│   │   ├── applications.html    # 应用原理深度
│   │   ├── products.html        # 天赐产品全对照
│   │   ├── advanced.html        # 新型表活与检测
│   │   └── troubleshooting.html # 客户问题诊断
│   ├── 日化原料与配方/           # 日化原料知识、配方设计、产品开发
│   │   └── formulation.html     # 配方设计
│   ├── 销售与市场/              # 市场趋势、竞争分析、销售话术
│   │   ├── market.html          # 市场趋势与竞争
│   │   └── sales.html           # 销售话术与附录
│   └── 笔记收件箱/              # 零散想法、读书笔记、待整理内容
│       (空，以后加)
└── 其他子项目（保持不变）
```

### registry.json 说明

`registry.json` 是自动维护的内容注册表，记录所有页面的元数据（标题、领域、标签、分类、文件路径）。AI 每次新增或更新页面时，同步更新此文件。导航、主页索引、知识树均可由此自动生成。

### 样式系统

所有页面共用 `_shared/css/style.css`，CSS 变量定义在 `:root`：

```css
--accent: #2563EB;    /* 蓝色主色 */
--accent2: #0D9488;   /* 青色辅色 */
--accent3: #8B5CF6;   /* 紫色 */
--accent4: #E11D48;   /* 红色 */
--warning: #D97706;   /* 橙色警告 */
```

**组件**：`.card`（带 `.accent`/`.accent2`/`.accent3`/`.accent4`/`.warning` 边框）、`.callout`、`.table-wrap`、`.concept-grid`、`.concept-card`、`.process-flow`、`.diagram`、`.formula-box`、`.reaction-box`、`.tag`（tag-blue/tag-green/tag-purple/tag-red/tag-teal/tag-orange）、`.site-nav`（顶部导航栏）

**新增页面时**：只需引用 `../_shared/css/style.css`，使用现有组件类名即可。同时在 `registry.json` 中添加记录。

---

## 用户深度掌握的核心概念

```
两亲结构 → 四大分类 → CMC/HLB/Krafft点 → 胶束形成(熵驱动,疏水效应,冰山结构)
                                                   ↓
                                        CPP = v/(a·lc) → 决定胶束形态
                                                   ↓
                             P≤1/3 球形 ← 头大(EO链/氨基酸/甜菜碱)
                             1/3<P≤1/2 棒状 ← 头小(加盐/加CAB中和电荷)
                             P>1/2 层状/囊泡/反胶束
```

---

## 用户偏好和沟通风格

1. **喜欢表格和可视化**：不喜欢纯文字段落
2. **喜欢通俗类比**：漏斗、乐高零件、小触角、水外套、面条缠绕
3. **要求销售视角**：每个概念都要落到"怎么跟客户讲"
4. **要求准确性**：产品分类、INCI名称、公司数据必须核实
5. **说中文**：所有输出用中文
6. **希望简洁交互**：说一句模糊想法 → AI 理解、研究、更新

---

## 重要产品信息（已核实）

- **TC-CAB**：椰油酰胺丙基甜菜碱，羧基甜菜碱
- **TC-LAB**：月桂酰胺丙基甜菜碱，C12短碳链
- **TC-MAB**：咪唑啉型，Disodium Lauroamphodiacetate（非甜菜碱）
- **TC-SHD**：磺基甜菜碱，Cocamidopropyl Hydroxysultaine（非咪唑啉/磷酸酯）
- **TC-CAO/TC-LAO**：氧化胺类，两性表活（非非离子烷醇酰胺）
- **GCK30P → AMIN GCK95U(P)**：椰油酰甘氨酸钾
- **CG30W → AMIN CG30**：椰油酰谷氨酸二钠
- **PQ-7 → POLYQUTA 550/550F**：聚季铵盐-7
- **销量数据**：2025年日化材料销量突破12万吨，全球第三大两性表活生产商（市占率10.6%）

---

## 更新工作流

### 新增内容
1. 用户说一句想法（如"补充磺基甜菜碱硬水稳定性数据"）
2. AI 理解、研究、回答
3. AI 同步更新对应 domains/ 下的页面
4. AI 同步更新 registry.json（如新增页面则添加记录）
5. 如涉及导航变化，同步更新 index.html

### 新增页面
1. 在 `domains/{领域}/` 下创建新 HTML 文件
2. 引用 `../_shared/css/style.css`
3. 使用和现有页面一致的模板结构（含 `.site-nav` 导航栏，导航链接使用相对路径）
4. 在 `registry.json` 中添加页面记录
5. 更新 `index.html` 添加导航链接
6. 更新本文件

### 新增领域
1. 在 `domains/` 下创建新文件夹
2. 在 `registry.json` 的 `domains` 数组中添加新领域
3. 后续页面创建时，导航链接自动计算跨域路径

---

## 已有文件清单

| 文件 | 说明 |
|------|------|
| `/workspace/knowledge-base/` | **主力知识库**（多页面站点，按领域分文件夹） |
| `/workspace/knowledge-base/registry.json` | **内容注册表**（自动维护） |
| `/workspace/surfactant-chapter3/surfactant-chapter3.html` | 旧版单文件（已拆分，保留作为备份） |
| `/workspace/content-workbench/content-workbench.html` | 内容管理工作台（辅助工具） |
| `/workspace/tinci-daily-chemical-knowledge/` | 天赐日化知识树 |
| `/workspace/tinci-product-guide/` | 天赐产品详细手册 |
| `/workspace/tinci-surfactant-guide/` | 天赐表面活性剂专题指南 |
| `/workspace/tinci-amphoteric-summary/` | 天赐两性表活产品目录分析 |
| `/workspace/fine-chemical-tech-notes/` | 《精细化工工艺学》整书提炼笔记 |

---

## 继续工作的建议

如果用户说"继续学习"或"补充内容"：
- 先确认想深入哪个方向（概念原理/产品对照/配方设计/销售话术/新主题）
- 如果是新主题（如卡波、流变改性剂），先判断属于哪个领域，在对应 `domains/` 下新建页面
- 如果是现有主题的补充，直接修改对应页面
- 所有修改后更新 `registry.json` 和 `index.html` 的导航
- 保持和现有风格一致：使用 `.card`、`.callout`、`.table-wrap` 等组件
- 新增内容时优先使用表格和可视化，减少纯文字段落