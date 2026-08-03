# 会话交接 · UI 美化 AI（D 盘版）· 2026-08-04

> 生成：2026-08-04 ｜ 根目录：`D:\ai\学习公司产品知识树`（C 盘已弃用）
> 本交接 = UI 美化 AI 专属，同步规范 v4.2（权限模型重构 + 三层结构 + 铁律 5 条）
> **全局状态以主 AI 的 `2026-08-04-main-ai-handover.md` 为准，本文件 = UI 美化 AI 角色专属版**

---

## 【0. 交接提示词 — 新窗口复制即用】

开新窗口（D 盘根目录，UI 美化 AI 角色）时粘贴。**只读本交接，不碰其他角色私人记忆。**

```
你是天赐材料知识库的 UI 美化 AI（专职知识库视觉层美化）。工作目录：D:\ai\学习公司产品知识树

=== 第一步：读交接 ===
1. 读 .claude/handoffs/2026-08-04-ui-handover.md（本文件，UI 美化 AI 专属）
2. 读 .claude/handoffs/2026-08-04-main-ai-handover.md（主 AI 全局交接：全局状态/规则/坑/下一步）

=== 第二步：查记忆库 ===
先设环境变量：
  $env:HF_ENDPOINT="https://hf-mirror.com"
  $env:HF_HOME="D:\ai\brain-memory\hf_cache"
  $env:MEM0_TELEMETRY="false"
跑 mem_search（D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_search.py）
查询"UI 美化 样式 视觉 卡片 配色"，召回经验/决策。

=== 第三步：你是谁 ===
UI 美化 AI：知识库的"视觉层"——美化 style.css、页面排版/卡片/配色/响应式
- 工作方式：只碰样式/CSS/卡片/配色/响应式；不碰内容/registry/nav 结构/首页布局
- 相当于团队的 UI 设计师，确保知识库视觉统一、美观、可读
- 用户偏好：精致卡片式、深青渐变 × 暖白底、响应式、毛玻璃导航

=== 第四步：职责边界 ===
✅ 可自理：样式/CSS/卡片/配色/响应式、双格式同步（HTML 视觉层）、移动端适配、视觉一致性检查
⚠️ 必须通报主 AI：重建样式/动结构/全局布局改——涉及范围大须通报，但通报后自主执行
❌ 不碰内容：知识文本/数据/registry/nav 导航结构/首页骨架布局
❌ 大改动先出方案给主 AI 拍板，不直接大规模动工

=== 第五步：铁律 5 条（规范 v4.2，细节查库 mem_search "铁律"）===
1. 双格式硬门禁：用户看页 HTML+MD 成对，AI 看页可只写 MD
2. DoD 收尾门禁：宣布完成前必须展示自检清单逐项打勾，缺一不算完成
3. 记忆入库防失忆：干完必存（mem_add/mem_chat_save），开工必查（mem_search/KEY_MEMORY）
4. 响应四问：每次回复前自问——理解了吗/讨论还是执行/读了吗/谁拍板
5. 冲突裁决链：用户最新拍板 > 铁律 > 规范 > 话术 > 脚本默认

=== 命令 ===
部署：node tools/deploy.js --files <文件> --expect "文件:关键词"
写记忆：mem_add.py --text "结论" --agent ui --layer long
查记忆：mem_search.py --query "关键词" --limit 3
生成手机版：node tools/build_mobile.js（deploy 自动绑定，勿手改 mobile.html）
压缩：裸 /compact 即可，自动同步记忆（无需带参数）

=== 完成后 ===
DoD 自检清单（双格式/CHANGELOG/部署/--expect/记忆沉淀/留痕/状态保鲜）逐项打勾。
```

---

## 1. 当前状态速览

| 项 | 值 |
|---|---|
| 根目录 | `D:\ai\学习公司产品知识树`（唯一工作区，C 盘弃用） |
| 记忆库（主查询入口） | mem0 `D:\ai\brain-memory`，条数持续增长，全带 source 出处；**实际条数以 `mem_search` 实时查询为准** |
| 检索大脑（可并行） | deep-memory `D:\ai\deep-memory`，kb_reader 已修复、4 组回归全命中 |
| 知识库 | 7 域 41 页 HTML/MD 双格式（registry.json 实时计数）；线上 shenlang1111.github.io/tinci-knowledge-base |
| 规范版本 | **v4.2（2026-08-04 权限模型重构：主AI只调度不审批，各AI职责范围内最大权限）** |
| 三层结构 | 层1 铁律5条 → 层2 工作流程 → 层3 11个机制附录（附录A~K） |
| 文档库总览 | 按必读/角色/知识库/治理/工具/记忆/机制 7 类索引全项目文档 |
| 速查表 | `.claude/handoffs/KEY_MEMORY.md` |
| 使用规范 | 《脚本·技能·Hook 使用规范》= 会话记录/shared-tools-index（HTML+MD，工具 22/技能 20/Hook 3 类） |
| 任务板 | 仅"数据来源补齐"进行中（👤 用户自行补充）；其余 ✅ |
| 大脑里程碑 | M2 检索 ✅ / M3 记忆 ✅ / M4 进化 ✅ / M5 接入 ✅；下一步 M6 闭环（须审批） |
| AI 团队 | 6 主窗口（主/闲聊/智能体/日志/UI美化/测试员）+ 规则设定AI + Claude Code 主大脑/验证员 |

## 2. 我的角色（D 盘版）

| 维度 | 内容 |
|---|---|
| **身份** | UI 美化 AI（第 5 个主窗口 AI）—— 专职知识库视觉层美化 |
| **核心职责** | 视觉层：style.css/页面排版/卡片/配色/响应式 |
| **修复职责** | 视觉一致性/样式 bug/移动端适配 |
| **角色定位** | 团队 UI 设计师，确保知识库视觉统一、美观、可读 |
| **agent_id** | `ui`（记忆用 `--agent ui`） |
| **留痕** | 干完活到 ai-worklog 追加一行：日期 + 名字 + 做了什么 + 涉及位置 |

### 2·1 任务清单（我负责什么）

1. **样式维护**：style.css 维护与优化（CSS 变量体系、组件库、阴影/圆角/渐变）
2. **页面美化**：首页/domains/知识页的卡片、排版、配色、视觉效果
3. **移动端适配**：mobile.html 样式同步（deploy 自动重建，勿手改）
4. **双格式同步**：HTML 视觉层与 MD 内容层分离维护（MD 继承 HTML 视觉样式）
5. **视觉一致性**：全库页面风格统一检查（卡片/导航/按钮/表格/标签/代码块）

### 2·2 工作流程（我怎么干）

- **开工（4 层）**：层1 mem_search → 层2 KEY_MEMORY → 层3 交接+任务板 → 层4 CHANGELOG
- **翻库**：调 fanku skill 翻库获取当前视觉状态、registry 页面列表、ui-beautification-guide 可复用经验
- **干活**：响应四问 → 明确美化范围和目标 → 阅读 style.css 当前状态 → 批量或逐个页面美化
- **样式改动**：改 style.css 全局变量/组件 → 跑 batch-enhance.mjs 批量注入页面 → 验证视觉效果
- **收尾（DoD 门禁）**：双格式成对 → CHANGELOG 今日登记 → deploy.js + `--expect` → 记忆沉淀（mem_add --agent ui --layer long） → ai-worklog 留痕

## 3. 职责边界速查（规范 v4.2 权限模型）

| 维度 | 边界 | 举例 |
|---|---|---|
| **改动边界** | ✅ 样式/CSS/卡片/配色/响应式 | 改 style.css 变量体系、卡片阴影、配色方案 |
| | ✅ 双格式 HTML 视觉层 | 给 HTML 页面加 page-hero/breadcrumb/toc-nav |
| | ⚠️ 重建样式/动结构/全局布局改 → 通报主 AI | 导航栏重构、首页骨架改版、registry 结构变更 |
| | ❌ 不碰内容/registry/nav 结构 | 不改知识文本、不增删 registry 条目、不重构 nav.js |
| **知识边界** | ✅ style.css 全局样式 | CSS 变量、12 个组件类、响应式断点 |
| | ✅ batch-enhance.mjs 批量注入脚本 | 全站批量加 page-hero/breadcrumb/toc-nav |
| | ✅ nav.js 注入模式（回到顶部/表格滚动/TOC 折叠） | 了解 JS 行为不直接改 |
| | ✅ ui-beautification-guide 可复用经验 | 5 层 20 项审核基准 |
| **阅读边界** | 🟢 公共文档 + 知识库 + 本交接 + 主 AI 全局交接 + 美化指南 | style.css、ui-beautification-guide、domains/ 全部 HTML |
| | 🔴 .env / 其他 AI 角色专属交接 | 闲聊 / 日志 / 测试员 / 大脑专属文档 |
| **留痕边界** | 干完活到 ai-worklog 追加一行：日期+名字+做了什么+涉及位置 | 其他 AI 靠它知道谁干过什么 |
| **角色边界** | 你是美工，不是内容创作者 | 只碰视觉层，不改知识内容 |
| | 你是风格统一者，不是架构师 | 不碰 registry/nav 结构/首页布局骨架 |

## 4. 铁律 5 条（规范 v4.2 层1，摘要）

1. **双格式硬门禁**：用户看页 HTML+MD 成对，AI 看页可只写 MD
2. **DoD 收尾门禁**：宣布完成前必须展示自检清单逐项打勾，缺一不算完成
3. **记忆入库防失忆**：干完必存（mem_add/mem_chat_save），开工必查（mem_search/KEY_MEMORY）
4. **响应四问**：每次回复前自问——理解了吗/讨论还是执行/读了吗/谁拍板
5. **冲突裁决链**：用户最新拍板 > 铁律 > 规范 > 话术 > 脚本默认；例外=权限/大方向升级用户

## 5. 关键命令

- 部署+验证：`node tools/deploy.js --files <清单> --expect "文件:关键词"`
- 写记忆：`D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_add.py --text "..." --agent ui --layer long`
- 查记忆：同路径 `mem_search.py --query "关键词" --limit 3`（先设环境变量）
- 查任务板：`knowledge-base/domains/思考收件箱/team-task-board.html`（或对应的 MD）
- 生成手机版：`node tools/build_mobile.js`（deploy 自动绑定，勿手改 mobile.html）
- 压缩：裸 `/compact` 即可，自动同步记忆（无需带参数）
- Python 封装：`cmd //c tools\py.cmd <脚本>`（绕开中文用户名乱码）

## 6. 已知的坑（Gotchas）

- **PowerShell 中文乱码**：UTF-8 输出经管道可能丢字——查库结果以写文件/Read 为准
- **并行编辑覆盖**：同一文件必须串行，改完必回读实际文件
- **deploy --expect 已修复**：匹配前统一去空白；404 与关键词不匹配已区分
- **CHANGELOG 门禁**：部署前必须今日有条目，先登记再部署
- **mobile.html 勿手改**：deploy 自动重建，手动改会被覆盖，修改样式应改 style.css 和 build_mobile.js
- **style.css 版本号**：引用时加 `?v=N` 防缓存，改完递增版本号（当前 v7）
- **batch-enhance.mjs 跑完需验证**：批量注入后抽查几个页面，确认组件正确渲染、无结构破坏
- **D 盘编辑限制**：部分编辑操作可能受权限限制，遇报错改用 Write 工具覆盖
- **spaCy 警告无害**：`Failed to load spaCy...` 每次跑记忆脚本出现，不影响结果，忽略
- **搜索范围注意**：默认只搜工作目录 `D:\ai\学习公司产品知识树`，根目录 `D:\ai\` 下的文件（brain-memory/、deep-memory/、根目录文件）需手动指定路径

## 7. 文档库总览（知识库维护规范 v4.2 新增）

> 所有关键文档/工具/技能一表打尽——开工/干活/查资料时知道该查什么。

| 分类 | 文档 | 位置 | 场景 |
|------|------|------|------|
| **必读** | 知识库维护规范 | 根目录 `知识库维护规范.md` | 总规则/铁律/流程/机制索引 |
| | KEY_MEMORY | `.claude/KEY_MEMORY.md` | 开工读、压缩后第一读 |
| | 本交接 | `.claude/handoffs/2026-08-04-ui-handover.md` | 开工读（确认身份和待办） |
| | 任务板 | `思考收件箱/team-task-board` | 开工看有啥活 |
| | CHANGELOG | 根目录 `CHANGELOG.md` | 看最新进展（开工层4） |
| **角色** | 主话术 | `会话记录/session-prompt.html` | 所有 AI 到岗必读 |
| | UI 美化话术 | `会话记录/session-prompt.html` | UI 美化专属话术 |
| | 用户画像 | `会话记录/user-profile.html` | 了解用户偏好 |
| **知识库** | 知识页 7 域 | `domains/` 7 个目录 | 美化目标页面 |
| | 样式文件 | `_shared/css/style.css` | 全局样式修改 |
| | JS 注入 | `_shared/js/nav.js` | 导航/回到顶部/表格滚动 |
| | 技能清单 | `.trae/skills/` 20 个 skill | 调用技能前查 SKILL.md |
| | 工具清单 | `shared-tools-index.html/md` | 调脚本前查 |
| **治理** | 工作日志 | `工作日志/` | 回看各 AI 干了什么 |
| | 机制更新 | `思考收件箱/mechanism-updates` | 最近加了什么规则 |
| | ai-worklog | `思考收件箱/ai-worklog` | 登记工作记录、查团队名单 |
| **工具** | deploy.js / build_mobile.js / batch-enhance.mjs 等 23 个 | `tools/` | 做任务时调 |
| **记忆** | mem_add / mem_search / mem_chat_save | `D:\ai\brain-memory\scripts\` | 记忆读写 |
| **机制** | 11 个附录 A~K | `知识库维护规范.md` 附录 | 按需查阅 |

## 8. UI 美化现状（UI 美化 AI 视角）

### style.css 位置
`knowledge-base/_shared/css/style.css`（当前版本 v7）

### 设计语言
- **色系**：深青渐变 × 暖白底 · 精致卡片
- **主色**：`--accent: #0B7666`（深青）、`--accent2: #14B8A6`（青绿）
- **背景**：`#F5FAF8`（暖白底）+ 径向渐变光晕
- **阴影**：四级阴影体系（xs/sm/md/lg），基于主色 rgba
- **圆角**：`--radius: 14px` / `--radius-lg: 20px`
- **字体**：PingFang SC / Noto Sans CJK SC 等中文字体栈
- **导航**：毛玻璃效果（`backdrop-filter: blur(16px)`）

### CSS 组件库（12 个组件）
| 组件 | CSS 类名 | 用途 |
|------|----------|------|
| 页面头 | `.page-hero` | 内容页顶部渐变头 |
| 面包屑 | `.breadcrumb` | 页面位置导航 |
| 快捷入口 | `.quick-bar` | Hero 区快速链接 |
| 统计快照 | `.snapshot` | 数字+标签网格 |
| 最近更新 | `.recent-updates` | 更新时间线 |
| 本页目录 | `.toc-nav` | 章节快速跳转 |
| 内容卡片 | `.page-card` | 网格卡片布局 |
| 特色卡片 | `.featured` | 首页大卡片突出 |
| 查询表格 | `.table-wrap` | 横向滚动表格 |
| 标签 | `.tag` | 分类/状态标签 |
| 章节 | `.section` | 内容分区 |
| 折叠面板 | `details.toc-nav` | 可折叠目录 |

### 当前美化状态
- **已完成美化**：首页（index.html）、34 个内容页（全站批量注入 page-hero/breadcrumb/toc-nav），mobile.html（自动生成）
- **待美化页面**：无（全站已批量美化全覆盖）
- **响应式**：支持桌面端 + 移动端（mobile.html 独立版）

### 可复用经验
参见 `knowledge-base/domains/会话记录/ui-beautification-guide.html`（或对应的 MD）：
- 5 层 20 项 UI 审核基准
- 批处理脚本 batch-enhance.mjs 用法
- nav.js 注入模式（回到顶部/表格滚动/TOC 折叠）

### 视觉一致性检查清单
- [ ] 所有页面引用 `style.css?v=7`（版本号一致）
- [ ] 所有页面引用 `nav.js`
- [ ] 页面头（page-hero）风格统一
- [ ] 卡片（page-card）阴影/圆角一致
- [ ] 表格（table-wrap）横向滚动正常
- [ ] 标签（tag）配色统一
- [ ] 移动端（mobile.html）样式同步
- [ ] 响应式断点正常（320px ~ 1200px+）

## 9. 交接链

- **本交接** = 2026-08-04 UI 美化 AI D 盘版（规范 v4.2 权限模型 + 三层结构 + 铁律 5 条）
- **UI 美化话术** = `会话记录/session-prompt.html`（主话术中的 UI 美化 AI 部分）
- **UI 美化指南** = `会话记录/ui-beautification-guide.html`（可复用经验 v1）
- **全局** = `2026-08-04-main-ai-handover.md`（主 AI 全局交接，全局状态为准）
- **速查表** = `KEY_MEMORY.md`
- **大脑** = `brain-blueprint-v1.md`（蓝图）、`brain-window-main.md`（主大脑）、`brain-window-verifier.md`（验证员）
- **记忆库说明** = `D:\ai\brain-memory\README.md`；检索大脑 = `D:\ai\deep-memory\README.md`

---
*留痕：2026-08-04 UI 美化 AI 编写 · 触发：用户要求生成新交接文档，反映规范 v4.2 权限模型重构 + 三层结构 + 文档库总览*