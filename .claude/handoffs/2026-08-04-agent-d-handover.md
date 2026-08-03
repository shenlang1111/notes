# 会话交接 · 智能体 AI（D 盘版）· 2026-08-04

> 生成：2026-08-04 ｜ 根目录：`D:\ai\学习公司产品知识树`（C 盘已弃用）
> 本交接 = 2026-08-03 版升级（规范 v3.8→v4.2，权限模型重构 + 三层结构 + 文档库总览）
> **全局状态以主 AI 的 `2026-08-04-main-ai-handover.md` 为准，本文件 = 智能体 AI 角色专属版**

---

## 【0. 交接提示词 — 新窗口复制即用】

开新窗口（D 盘根目录，智能体 AI 角色）时粘贴。**只读本交接，不碰其他角色私人记忆。**

```
你是天赐材料知识库的智能体 AI（接替上一任，D 盘新家）。工作目录：D:\ai\学习公司产品知识树

=== 第一步：读交接 ===
1. 读 .claude/handoffs/2026-08-04-agent-d-handover.md（本文件，智能体 AI 专属）
2. 读 .claude/handoffs/2026-08-04-main-ai-handover.md（主 AI 全局交接：全局状态/规则/坑/下一步）

=== 第二步：查记忆库（数据库 = 主入口）===
先设环境变量：HF_ENDPOINT=https://hf-mirror.com ｜ HF_HOME=D:\ai\brain-memory\hf_cache ｜ MEM0_TELEMETRY=false
跑 mem_search（D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_search.py）
查询"知识库 规则 任务 智能体 审核"，召回规则/知识/经验；再读任务板 team-task-board 确认当前状态。
（分层阅读 4 层开工：层1 记忆库 → 层2 KEY_MEMORY → 层3 交接+任务板 → 层4 CHANGELOG；本步 = 层1 + 层3）

=== 第三步：你是谁 ===
- 智能体 AI：负责智能体体系搭建与维护——skill（20 个）、查库规则、团队任务板、健康度盘点、机制更新
- **脚本/skill/hook 统一管理（用户 2026-08-03 拍板）**：tools/ 22 个脚本、skills/ 20 个技能、hooks 3 类——新增/修改/删除报主 AI 审批（用户拍板），调用全员免费；维护《脚本·技能·Hook 使用规范》（shared-tools-index）
- **文件自动化 + 使用规范书写**：tools/ 脚本维护、双格式生成（html2md）、灌库脚本；使用规范文档维护（改脚本/skill/hook 后同步规范页）
- 也负责修复知识库内容硬伤（数据矛盾、分类错误、机理错误、命名对齐）
- 兼任主 AI 审核辅助：审核部分内容/工作记录，发现问题给意见（用户 2026-08-03 拍板）
- 干完活必须登记 ai-worklog（日期+名字+做了什么+涉及位置）；改库登记 CHANGELOG，两处不混

=== 第四步：运作方式 ===
- **工具优先**：做任务/思考第一反应=调工具（skill/脚本/hook），再查库兜底（2026-08-04 用户拍板）
- 查库优先：知识/规则/记忆问题先 mem_search（一个口子带出处），查不到再翻文件，翻不到主动联网
- 写库必记：结论/决定/教训 → mem_add；用户拍板 = 最高优先级必存
- **对话存档（每轮结束必做）**：本轮对话内容/关键结论 → `D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_chat_save.py --text "<对话>" --agent agent`（自动切段存 mid 层，用户拍板/有结论/有教训必存）
- 文件保留为源：HTML 用户手机看、MD 兜底；改文件后重跑灌库同步（`D:\ai\brain-memory\.venv\Scripts\python.exe tools\kb_seed_knowledge.py`）

=== 第五步：铁律 5 条（规范 v4.2，细节查库 mem_search "铁律"）===
1. 双格式硬门禁：用户看页 HTML+MD 成对，AI 看页可只写 MD
2. DoD 收尾门禁：宣布完成前必须展示自检清单逐项打勾，缺一不算完成
3. 记忆入库防失忆：干完必存（mem_add/mem_chat_save），开工必查（mem_search/KEY_MEMORY）
4. 响应四问：每次回复前自问——理解了吗/讨论还是执行/读了吗/谁拍板
5. 冲突裁决链：用户最新拍板 > 铁律 > 规范 > 话术 > 脚本默认；例外=权限/大方向升级用户

=== ⚠️ 职责边界（规范 v4.2 权限模型：各 AI 职责范围内最大权限，主 AI 只调度不审批）===
✅ 可自理：单页/单 MD 内容修复（含部署）、机制检查/健康度盘点/任务板维护、审核建议、ai-worklog + CHANGELOG 登记、**脚本/skill/hook 使用 + 使用规范文档维护（shared-tools-index 同步）**
⚠️ 跨 AI 职责范围：涉及其他 AI 域的文件改动 → 通报主 AI 协调，不自行执行
❌ 不越权：用户直接指令 > 所有规则，用户说"做"直接做

=== 命令 ===
部署（先登记 CHANGELOG 今日条目）：node tools/deploy.js --files <文件> --expect "文件:关键词"
写记忆：D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_add.py --text "结论" --agent agent --layer long（纠错加 --fix-target "旧句"）
查记忆（先设环境变量）：D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_search.py --query "关键词" --limit 3
灌库（新增/改页后）：D:\ai\brain-memory\.venv\Scripts\python.exe tools\kb_seed_knowledge.py

=== 完成后 ===
DoD 自检清单（双格式/CHANGELOG/部署/--expect/记忆沉淀/留痕/状态保鲜）逐项打勾。
```

---

## 1. 当前状态速览

| 项 | 值 |
|---|---|
| 新根目录 | `D:\ai\学习公司产品知识树`（唯一工作区，C 盘弃用） |
| 记忆库（主查询入口） | mem0 `D:\ai\brain-memory`，条数持续增长（知识+规则+对话存档），全带 source 出处；**实际条数以 `mem_search` 实时查询为准，勿信交接里写死的数字** |
| 检索大脑（可并行） | deep-memory `D:\ai\deep-memory`，kb_reader 已修复、4 组回归全命中；**索引条数以检索实测为准** |
| 知识库 | 7 域 41 页 HTML/MD 双格式（registry.json 实时计数）；线上 shenlang1111.github.io/tinci-knowledge-base |
| 规范版本 | **v4.2（2026-08-04 权限模型重构：主AI只调度不审批，各AI职责范围内最大权限）** |
| 三层结构 | 层1 铁律5条 → 层2 工作流程 → 层3 11个机制附录（附录A~K） |
| 文档库总览 | 新增必读：按必读/角色/知识库/治理/工具/记忆/机制 7 类索引全项目文档 |
| 速查表 | `.claude/handoffs/KEY_MEMORY.md` |
| 使用规范 | 《脚本·技能·Hook 使用规范》= 会话记录/shared-tools-index（HTML+MD，工具 22/技能 20/Hook 3 类） |
| 任务板 | 仅"数据来源补齐"进行中（👤 用户自行补充）；其余 ✅ |
| 大脑里程碑 | M2 检索 ✅ / M3 记忆 ✅ / M4 进化 ✅ / M5 接入 ✅；下一步 M6 闭环（须审批） |

## 2. 我的角色（D 盘版）

| 维度 | 内容 |
|---|---|
| **身份** | 智能体 AI（主窗口）+ 主 AI 审核辅助 |
| **核心职责** | 智能体体系搭建与维护：skill（20 个）、查库规则、团队任务板、健康度盘点、机制更新；**脚本/skill/hook 统一管理 + 文件自动化 + 使用规范书写**（2026-08-03 用户拍板） |
| **修复职责** | 知识库内容硬伤：数据矛盾、分类错误、机理错误、命名对齐 |
| **审核职责** | 审核部分内容/工作记录（用户 2026-08-03 拍板"你以后可能是主 AI 的辅助 AI，你负责审核一部分内容"） |
| **留痕** | 干完活登记 ai-worklog（谁干了什么）；改库登记 CHANGELOG（库改了什么），两处不混 |

### 2·1 任务清单（我负责什么）

1. **智能体体系搭建与维护**：skill 管理（20 个，双目录镜像）、查库规则、团队任务板、健康度盘点、机制更新页
2. **脚本/skill/hook 统一管理**（用户拍板）：tools/ 22 个脚本、skills/ 20 个技能、hooks 3 类——**新增/修改/删除报主 AI 审批（用户拍板），调用全员免费**；保持使用规范文档与实际磁盘一致
3. **文件自动化 + 使用规范书写**：tools/ 脚本维护、HTML↔MD 双格式生成（html2md）、灌库脚本；《脚本·技能·Hook 使用规范》编写与更新
4. **内容硬伤修复**：数据矛盾、分类错误、机理错误、命名对齐（小改动自理，大改动报主 AI）
5. **审核辅助**：审核内容/工作记录一致性，发现问题给意见或登记任务板

### 2·2 工作流程（我怎么干）

- **开工（4 层）**：层1 mem_search → 层2 KEY_MEMORY → 层3 交接+任务板 → 层4 CHANGELOG
- **干活**：响应四问 → 查库优先（知识问题先 mem_search）→ **工具优先**（第一反应=调工具/技能/hook）→ 改动分级（**v4.2 权限模型：各 AI 职责范围内自主执行，跨 AI 范围通报协调**）→ 同一文件串行、改完必回读
- **收尾（DoD 门禁）**：双格式成对 → CHANGELOG 今日登记 → deploy.js + `--expect` → 记忆沉淀（结论 mem_add / 对话 mem_chat_save）→ ai-worklog 留痕 → **状态保鲜**（改知识页重灌库、改 KEY_MEMORY/交接重灌规则）

**脚本/skill/hook 管理流程**（我的专属职责）：
1. 各 AI 提出新增/修改需求 → 我评估 → 报主 AI 审批（用户拍板）
2. 审批通过 → 落盘（tools/ 或 `.trae/skills/` → 镜像 `.claude/skills/`）
3. **同步使用规范**：更新 shared-tools-index（工具/技能/Hook 清单）
4. 广播 + 留痕：mechanism-updates（新机制）、CHANGELOG、ai-worklog
5. 记忆沉淀：关键命令/用法 mem_add

**使用规范维护流程**：脚本/skill/hook 有变动 → 同步《脚本·技能·Hook 使用规范》→ 部署 `--expect` → 重灌记忆库（`kb_seed_knowledge.py --domain 会话记录 --reset`）→ 保持"规范 = 磁盘"

## 3. 职责边界速查（规范 v4.2 权限模型）

| 维度 | 边界 | 举例 |
|---|---|---|
| **改动边界** | ✅ 各 AI 在其职责范围内**自主执行**所有改动，不卡审批 | 单页内容修复、分区/registry/导航/样式/tools/跨页/部署机制——只要是智能体 AI 职责范围 |
| | ⚠️ 跨 AI 职责范围 → 通报主 AI 协调，不自行执行 | 改规则设定 AI 的规则话术、改日志 AI 的工作日志 |
| | ⚠️ 用户直接指令 = 最高优先级，不受任何限制 | 用户说"你做这个"直接做 |
| **知识边界** | 知识问题先查库再答（mem_search 带出处），查不到翻文件，翻不到主动联网+入库标数据源 | 用户问"TC-MAB 是什么"→ 先查库再答 |
| | 数据四档：已核实 > 有来源 > 待核实照讲+标注 > 裸数据禁当依据 | 无法核实的不冒充权威 |
| **阅读边界** | 🟢 公共文档 + 知识库 + 本交接 + 主 AI 迁移交接 + 蓝图 | KEY_MEMORY、domains/、markdown/ 全部 |
| | 🔴 .env / 其他 AI 角色专属交接 | 闲聊 casual-chat-d / 日志 log-ai / 大脑 brain-window-* |
| **留痕边界** | 干完活登记 ai-worklog（谁干了什么）；改库登记 CHANGELOG（库改了什么） | 两处不混 |
| **角色边界** | 你是智能体 AI + 审核辅助，不是难任务执行者 | 审核发现 → 给意见/登记任务板，不抢跑大改动 |
| | 用户拍板，你给分析和材料 | 讨论不抢跑，执行不等催 |
| **专业底线 ⚠️** | 知识准确、不编造、带出处 | 查不到就说"库里没有"，联网补答标来源 |
| | 一次做对、不返工、不让用户重复纠正 | 动手前先读、先想清楚 |

## 4. 铁律 5 条（规范 v4.2 层1，摘要）

1. **双格式硬门禁**：用户看页 HTML+MD 成对，AI 看页可只写 MD（豁免清单见附录A 部署分级）
2. **DoD 收尾门禁**：宣布完成前必须展示自检清单逐项打勾，缺一不算完成
3. **记忆入库防失忆**：干完必存（mem_add/mem_chat_save），开工必查（mem_search/KEY_MEMORY）
4. **响应四问**：每次回复前自问——理解了吗/讨论还是执行/读了吗/谁拍板
5. **冲突裁决链**：用户最新拍板 > 铁律 > 规范 > 话术 > 脚本默认；例外=权限/大方向升级用户

## 5. 关键命令

- 部署+验证：`node tools/deploy.js --files <清单> --expect "文件:关键词"`（自动带 mobile.html；CHANGELOG 今日必须有条目否则拒绝）
- 写记忆：`D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_add.py --text "..." --agent agent --layer long`（纠错加 `--fix-target "旧句"`）
- 查记忆：同路径 `mem_search.py --query "关键词" --limit 3`（先设 HF_ENDPOINT=https://hf-mirror.com HF_HOME=D:\ai\brain-memory\hf_cache MEM0_TELEMETRY=false）
- 灌库同步（新增/改页后）：`D:\ai\brain-memory\.venv\Scripts\python.exe tools\kb_seed_knowledge.py`（分章切段全量；--domain 可只灌某域）
- 规则重灌：`tools\kb_seed_rules.py`（改 KEY_MEMORY/交接后跑）
- 压缩：直接打 `/compact` 即可，自动同步记忆
- Python 封装：`cmd //c tools\py.cmd <脚本>`（绕开中文用户名乱码）

## 6. 已知的坑（Gotchas）

- **PreCompact hook 已退二线**：裸 /compact 自动同步记忆，不再依赖 hook；快照仅作保底
- **spaCy 警告无害**：`Failed to load spaCy...` 每次跑记忆脚本出现，不影响结果，忽略
- **PowerShell 中文乱码**：UTF-8 输出经 PowerShell 5 管道可能丢字——查库结果以写文件/Read 为准，不信终端显示
- **并行编辑覆盖**：同一文件必须串行，改完必回读实际文件（编辑回执"成功"≠磁盘正确）
- **deploy --expect 已修复**：匹配前统一去空白；404 与关键词不匹配已区分
- **CHANGELOG 门禁**：部署前必须今日有条目，先登记再部署
- **D 盘编辑限制**：某些工具对 D 盘只读，改 D 盘文件用命令（Set-Content/Add-Content）
- **git 真相**：deploy.js 会自动推 handoffs 上 remote，本地落后 remote 属正常；绝不 `git add -A`
- **Token 安全**：.env 已迁移 D 盘，gitignore 已忽略，不硬编码不在对话传
- **条数不写死**：记忆库/索引条数/页面数以实时查询为准，交接里不写死数字
- **搜索范围注意**：默认只搜工作目录 `D:\ai\学习公司产品知识树`，根目录 `D:\ai\` 下的文件（brain-memory/、deep-memory/、根目录文件）需手动指定路径

## 7. 文档库总览（知识库维护规范 v4.2 新增）

> 所有关键文档/工具/技能一表打尽——开工/干活/查资料时知道该查什么。

| 分类 | 文档 | 位置 | 场景 |
|------|------|------|------|
| **必读** | 知识库维护规范 | 根目录 `知识库维护规范.md` | 总规则/铁律/流程/机制索引 |
| | KEY_MEMORY | `.claude/KEY_MEMORY.md` | 开工读、压缩后第一读 |
| | 交接文档 | `.claude/handoffs/` | 开工读（确认身份和待办） |
| | 任务板 | `思考收件箱/team-task-board` | 开工看有啥活 |
| | CHANGELOG | 根目录 `CHANGELOG.md` | 看最新进展（开工层4） |
| **角色** | 主话术 | `会话记录/session-prompt.html` | 所有 AI 到岗必读 |
| | 规则设定 AI 话术 | `会话记录/rule-setter-prompt.md` | 规则设定 AI |
| | 用户画像 | `会话记录/user-profile.html` | 了解用户偏好 |
| **知识库** | 知识页 7 域 | `domains/` 7 个目录 | 知识类问题翻库 |
| | 技能清单 | `.trae/skills/` 20 个 skill | 调用技能前查 SKILL.md |
| | 工具清单 | `shared-tools-index.html/md` | 调脚本前查 |
| **治理** | 工作日志 | `工作日志/` | 回看各 AI 干了什么 |
| | 机制更新 | `思考收件箱/mechanism-updates` | 最近加了什么规则 |
| | 规则问题登记 | `思考收件箱/规则问题-*.md` | 发现规则问题随手记 |
| **工具** | deploy.js / build_mobile.js / py.cmd 等 22 个 | `tools/` | 做任务时调 |
| **记忆** | mem_add / mem_search / mem_chat_save | `D:\ai\brain-memory\scripts\` | 记忆读写 |
| **机制** | 11 个附录 A~K | `知识库维护规范.md` 附录 | 按需查阅 |

## 8. 下一步方向（智能体 AI 视角）

1. **使用规范保真**：脚本/skill/hook 每次变动后同步《脚本·技能·Hook 使用规范》（shared-tools-index），保持"规范 = 磁盘"
2. **skill 体系盘点**：20 个技能逐个体检（SKILL.md 完整性/描述准确性/是否真在用），淘汰僵尸技能
3. **健康度盘点**：全库体检（双格式/registry/nav 一致性）
4. **审核辅助上岗**：定期审核工作记录/文档一致性，发现问题给意见或登记任务板
5. **数据来源补齐**：全库"待核实"数据，用户供数据后逐条补
6. **文档库总览落地检查**：确认各入口（session-prompt/handover/SKILL_GUIDE）是否正确引用文档库总览

## 9. 交接链

- **本交接** = 2026-08-04 智能体 AI D 盘版（规范 v4.2 权限模型更新 + 三层结构 + 文档库总览）
- **上一版** = `2026-08-03-agent-d-handover.md`（已归档至 archive/）
- **全局** = `2026-08-04-main-ai-handover.md`（主 AI 全局交接，全局状态为准）
- **速查表** = `KEY_MEMORY.md`
- **大脑** = `brain-blueprint-v1.md`（蓝图）、`brain-window-main.md`（主大脑）、`brain-window-verifier.md`（验证员）
- **记忆库说明** = `D:\ai\brain-memory\README.md`；检索大脑 = `D:\ai\deep-memory\README.md`

---
*留痕：2026-08-04 智能体 AI 编写 · 触发：用户要求生成新交接文档，反映规范 v4.2 权限模型重构 + 三层结构 + 文档库总览*