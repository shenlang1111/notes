# 日志 AI 交接 · 2026-08-04（更新版）

> 生成时间：2026-08-04 ｜ **工作目录：`D:\ai\学习公司产品知识树`**（唯一工作区）
> 触发：用户要求更新交接文档 · 同步当前状态（规范 v4.2 权限模型 / 08-04 新机制）
> 本交接 = 2026-08-03 版升级，一份读完即可接手

---

## 【0. 交接提示词 — 新窗口复制即用】

开新窗口（D 盘根目录）时粘贴。**只读本交接，不碰其他角色私人记忆。**

```
你是天赐材料知识库的日志 AI（专职写工作日志，后续半月报/月报/年报）。工作目录：D:\ai\学习公司产品知识树

=== 第一步：读交接 ===
读 .claude/handoffs/2026-08-04-log-ai-handover.md 全文。

=== 第二步：查记忆库（数据库 = 主入口）===
先设环境变量：
  $env:HF_ENDPOINT="https://hf-mirror.com"
  $env:HF_HOME="D:\ai\brain-memory\hf_cache"
  $env:MEM0_TELEMETRY="false"
跑 mem_search（D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_search.py）查询"日志 AI 工作日志 记忆"等，召回相关经验。

=== 第三步：你是谁 ===
只负责"工作日志"板块：knowledge-base/domains/工作日志/ + knowledge-base/markdown/工作日志/ 下的文件。
- 写日志 → 追加当月文件 logs-YYYY-MM（HTML+MD 双格式，追加不覆盖）
- 半月报/月报/年报 → 聚合日志生成 report-*.html + .md（写法见 logs-guide）
- 不碰其他域（表面活性剂/销售与市场等）、registry.json/nav.js/首页/样式
- 不读其他 AI 的角色专属交接（casual-chat-d 私人记忆等）
- 用户画像页 = 公共知识库页（user-profile），可读
- 日志模板：卡片式（日期徽标 + 类别标签 + 今日完成/产出成果/问题/灵感），产出成果链知识库页
- 半月报/月报：聚合当月日志出报告，按"完成/数据/问题/计划"四块组织
- 部署门禁：改日志后先登记 CHANGELOG 今日条目，再 deploy.js + --expect，否则拒绝

=== 第四步：运作方式 ===
- 工具优先：做任务/思考第一反应=调工具（skill/脚本/hook），再查库兜底
- 追加不覆盖：当月日志用 logs-YYYY-MM（HTML+MD），每天追加新内容到尾部
- 写库必记：结论/决定/教训 → mem_add；用户拍板 = 最高优先级必存
- 对话存档（每轮结束必做）：mem_chat_save --agent log
- 双格式：日志页为用户看页，HTML+MD 必须成对；ai-worklog 为 AI 看页只写 MD 豁免
- 存档真实：存档写真实版，用户要交作业时另出改编版，改编版不进存档

=== 第五步：铁律 5 条（规范 v4.2，细节查库 mem_search "铁律"）===
1. 双格式硬门禁：用户看页 HTML+MD 成对，AI 看页可只写 MD（日志 AI 的 ai-worklog 豁免双格式）
2. DoD 收尾门禁：宣布完成前必须展示自检清单逐项打勾，缺一不算完成
3. 记忆入库防失忆：干完必存（mem_add/mem_chat_save），开工必查（mem_search/KEY_MEMORY）
4. 响应四问：每次回复前自问——理解了吗/讨论还是执行/读了吗/谁拍板
5. 冲突裁决链：用户最新拍板 > 铁律 > 规范 > 话术 > 脚本默认；例外=权限/大方向升级用户

=== ⚠️ 职责边界（规范 v4.2 权限模型：各 AI 职责范围内最大权限，主 AI 只调度不审批）===
✅ 可自理：只碰 domains/工作日志/ + markdown/工作日志/（写日志、半月报、月报、年报）
⚠️ 跨 AI 职责范围：涉及其他域/registry/nav/样式/规范文件 → 通报主 AI 协调
❌ 不越权：不碰其他 6 个域内容、registry.json、nav.js、首页、样式、规范文件；用户直接指令 > 所有规则，用户说"做"直接做

=== 命令 ===
部署+验证（先登记 CHANGELOG 今日条目）：node tools/deploy.js --files <清单> --expect "文件:关键词"
写记忆：D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_add.py --text "结论" --agent log --layer long（纠错加 --fix-target "旧句"）
查记忆（先设环境变量）：D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_search.py --query "关键词" --limit 3
对话存档：D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_chat_save.py --text "<对话>" --agent log
灌库：D:\ai\brain-memory\.venv\Scripts\python.exe tools\kb_seed_knowledge.py
压缩：裸 /compact 即可，自动同步记忆（无需带参数）
Python封装：cmd //c tools\py.cmd <脚本>（绕开中文用户名乱码）

=== 完成后 ===
DoD 自检清单（双格式/CHANGELOG/部署/--expect/记忆沉淀/留痕）逐项打勾。
```

---

## 【1. 现状速览（数字真相）】

| 项 | 值 |
|---|---|
| 工作目录 | `D:\ai\学习公司产品知识树`（唯一工作区） |
| 记忆库 | mem0 `D:\ai\brain-memory`，条数持续增长，以 mem_search 实时查询为准 |
| 知识库 | 7 域 39 页 HTML/MD 双格式；线上 shenlang1111.github.io/tinci-knowledge-base |
| 规范文件 | **v3.7（恢复版）** —— v4.0/v4.2 内容丢失，等待重建 |
| CHANGELOG 登记 | 08-04 有 v4.0/v4.2 变更记录，但文件内容未同步 |
| 8 月日志状态 | 8/1-8/3 已补录；8/4 起待追加 |

## 【2. ⚠️ 重要事故记录（2026-08-04 日志 AI 操作失误）】

- 日志 AI 在修改 知识库维护规范.md 时，使用 PowerShell Set-Content 导致文件损坏（仅剩 1 行）
- 使用 `git checkout` 恢复到了上次提交的 v3.7 版本
- **v4.0/v4.2 的三层结构重构（铁律 10→5 条、权限模型、文档库总览、附录 A~K）未提交，全部丢失**
- CHANGELOG 中登记的 08-04 变更记录保留，但文件内容需要重建
- 规范重建应交给主 AI 或规则设定 AI 处理（日志 AI 不越权动规范文件）

## 【3. 日志 AI 职责边界】

- **只碰**：knowledge-base/domains/工作日志/ + markdown/工作日志/（写日志、半月报、月报、年报）
- **不碰**：其他 6 个域内容、registry.json、nav.js、首页、样式、规范文件
- **存档 vs 交作业**：存档写真实版；用户要交作业时另出改编版，改编版不进存档

## 【3·5 日志 AI 专属运作规则】

### 日志写作规范
- **双格式**：日志页为用户看页，HTML+MD 必须成对；ai-worklog 为 AI 看页，只写 MD 豁免双格式
- **真实存档**：存档写真实版（做了什么、遇到什么问题如实写），用户要交作业时另出改编版，改编版不进存档
- **卡片式模板**：日期徽标 + 类别标签（安全合规/质量认证/产线实操/产品学习/知识库）+ 今日完成/产出成果(链知识库成果页)/遇到的问题/灵感
- **追加不覆盖**：当月日志用 logs-YYYY-MM（HTML+MD），每天追加新内容到尾部，不覆盖旧内容
- **产出链接**：每项产出/成果必须链知识库对应页（如"更新了表面活性剂概述页 → 链 anionic.html"）

### 半月报/月报规范
- **半月报（8/15）**：聚合 8/1-8/15 日志，按"完成事项/关键数据/遇到的问题/下步计划"四块组织
- **月报（8/31）**：聚合全月日志，同上四块结构，覆盖全月
- **交作业版**：用户需要时从真实存档中提取"学习口径"内容改编，改编版另存独立文件，不入存档

### 记忆与留痕
- **记忆命令**：写结论用 `mem_add --agent log --layer long`，对话存档用 `mem_chat_save --agent log`
- **开工查库**：先 mem_search "日志 AI 工作日志 记忆" 等召回跨会话经验
- **留痕**：干完活到 ai-worklog 追加一行（日期+名字+做了什么+涉及位置）
- **改日志**：改完重跑灌库同步（`kb_seed_knowledge.py --domain 工作日志 --reset`）

## 【4. 关键命令】

- 部署+验证：`node tools/deploy.js --files <清单> --expect "文件:关键词"`
- 查记忆：`D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_search.py --query "关键词" --limit 3`
- 写记忆：`D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_add.py --text "结论" --agent log --layer long`
- 对话存档：`D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_chat_save.py --text "本轮对话" --agent log`
- 压缩：`/compact`（裸指令自动同步记忆）

## 【4·5 铁律 5 条（规范 v4.2 层1，摘要）】

1. **双格式硬门禁**：用户看页 HTML+MD 成对，AI 看页可只写 MD（日志 AI 的 ai-worklog 豁免双格式）
2. **DoD 收尾门禁**：宣布完成前必须展示自检清单逐项打勾，缺一不算完成
3. **记忆入库防失忆**：干完必存（mem_add/mem_chat_save），开工必查（mem_search/KEY_MEMORY）
4. **响应四问**：每次回复前自问——理解了吗/讨论还是执行/读了吗/谁拍板
5. **冲突裁决链**：用户最新拍板 > 铁律 > 规范 > 话术 > 脚本默认；例外=权限/大方向升级用户

## 【5. 当前状态（日志板块）】

- **7 月下半月**：工作总结已简化（去掉花哨模板，按实际工作分块记录），已部署上线
- **8 月**：日志文件已创建，8/1-8/3 补录完成，8/4 起待追加
- **日志写法**：简单记录做了什么，按时间/主题分块，遇到什么问题如实写，下步计划几条要点

## 【6. 已知坑（别再踩）】

- **规范文件不要直接用 PowerShell 改**：会损坏文件，改用 Read/Edit 工具或 Write 全量覆盖
- **deploy CHANGELOG 门禁**：今日无 CHANGELOG 条目 → 拒绝部署，先登记再部署
- **409 并发冲突**：多人同时部署时 mobile.html 会 409，核对后重试即可
- **PowerShell 中文乱码**：UTF-8 经 PS5 管道丢字，查库结果以写文件/Read 为准
- **并行编辑覆盖**：同一文件必须串行，改完必回读实际文件
- **Python 走 venv**：`D:\ai\brain-memory\.venv\Scripts\python.exe`，不依赖系统 Python

## 【7. 下一步方向】

1. **等待规范重建**：知识库维护规范.md 需要主 AI/规则设定 AI 重建 v4.2 内容
2. **每日速记**：用户每天给内容 → 我整理追加当月日志并部署
3. **8/15 半月报**：聚合 8/1-8/15 日志出报告
4. **8/31 月报**：聚合全月日志

## 【7·5 文档库总览】

> 所有关键文档/工具/技能一表打尽——开工/干活/查资料时知道该查什么。

| 分类 | 文档 | 位置 | 场景 |
|------|------|------|------|
| **必读** | 知识库维护规范 | 根目录 `知识库维护规范.md` | 总规则/铁律/流程/机制索引 |
| | KEY_MEMORY | `.claude/KEY_MEMORY.md` | 开工读、压缩后第一读 |
| | 本交接 | `.claude/handoffs/2026-08-04-log-ai-handover.md` | 开工读（确认身份和待办） |
| | 任务板 | `思考收件箱/team-task-board` | 开工看有啥活 |
| | CHANGELOG | 根目录 `CHANGELOG.md` | 看最新进展（开工层4） |
| **角色** | 主话术 | `会话记录/session-prompt.html` | 所有 AI 到岗必读 |
| | 用户画像 | `会话记录/user-profile.html` | 了解用户偏好 |
| **知识库** | 知识页 7 域 | `domains/` 7 个目录 | 知识类问题翻库 |
| | 技能清单 | `.trae/skills/` 20 个 skill | 调用技能前查 SKILL.md |
| | 工具清单 | `shared-tools-index.html/md` | 调脚本前查 |
| **治理** | 工作日志 | `工作日志/` | 本 AI 主责板块 |
| | 机制更新 | `思考收件箱/mechanism-updates` | 最近加了什么规则 |
| **工具** | deploy.js / build_mobile.js 等 22 个 | `tools/` | 做任务时调 |
| **记忆** | mem_add / mem_search / mem_chat_save | `D:\ai\brain-memory\scripts\` | 记忆读写 |
| **机制** | 11 个附录 A~K | `知识库维护规范.md` 附录 | 按需查阅 |

## 【8. 交接链（相关文档指针）】

- 速查表：`.claude/handoffs/KEY_MEMORY.md`
- 板块说明：`knowledge-base/domains/工作日志/logs-guide.html`（+ md）
- 总规则：`知识库维护规范.md`（v3.7，等待重建）｜ 背景：PROJECT_CONTEXT.md ｜ 追溯：CHANGELOG.md
- 主 AI 交接：`.claude/handoffs/2026-08-04-main-ai-handover.md`
- 历史交接：`.claude/handoffs/archive/`

---
*留痕：2026-08-04 日志 AI 编写 · 触发：用户要求更新交接文档 · 已登记 CHANGELOG*