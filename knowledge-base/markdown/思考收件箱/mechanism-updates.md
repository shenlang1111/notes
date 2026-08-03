---
title: 机制更新
domain: 思考收件箱
tags: [AI协作, 机制更新, 广播, 增量必读, 新AI]
description: 新增协作机制的"更新广播"索引：谁建了新机制就往这追加一条，新 AI 到岗读这一页就知道"最近系统加了什么、去哪读"。与话术页固定必读分工：本页只收增量。
updated: 2026-08-03
---

# 机制更新

> 新增协作机制的"更新广播"：谁建了新机制就往这追加一条，新 AI 到岗读这一页，就知道"最近系统加了什么、去哪读"——不用改话术页，也不用我手把手教。

## 一、这是什么

一句话定位：**机制增量索引**——话术页负责"固定必读"（ai-worklog/任务板/健康度/翻库），本页负责"最近新增"。每建一个新机制，在下方追加一条；新 AI 到岗必读本页，按条找到对应页面去读。

- **建机制 → 追加**：谁建了新机制（新页面/新规则/新 skill），顺手在本页追加一行：日期 + 机制 + 去哪读 + 谁加的。只做索引，不复制内容。
- **新 AI → 必读**：新窗口到岗读本页（话术页第七节已列为本页入口之一），逐条找到对应页面读，读完报告看到了什么。
- **过时 → 清理**：机制稳定后可从本页摘除（保留在各自页面），本页只留"还没普遍掌握的新机制"，保持短小。

## 二、更新记录（新机制必读）

| 日期 | 新增机制 | 去哪读 | 谁加的 |
|---|---|---|---|
| 2026-08-03 | **分层阅读 4 层加固（状态保鲜 DoD 化）**——①DoD 记忆类加"状态保鲜"勾选项（改过 KEY_MEMORY/交接/机制页 → 已重灌库）②知识页改动后跑 kb_seed_knowledge.py --domain 思考收件箱（几秒级）③各 AI 交接/话术开工段统一 4 层说明（casual/agent/log/migration/session-prompt-d）④旧"三层"记忆已清理（删旧写新为 4 层） | 知识库维护规范.md（DoD + 第十节）+ 5 份交接/话术 | 主 AI |
| 2026-08-03 | **分层阅读 4 层开工（用户拍板）**——库优先/文件兜底：层1 记忆库 mem0（知识/规则/经验/决策，先查）→ 层2 KEY_MEMORY（命令/决策速查）→ 层3 交接+任务板（身份/当前状态）→ 层4 CHANGELOG（最近进展）；新 AI 开工只读 4 处；**状态保鲜** = KEY_MEMORY/交接改动后重灌库（kb_seed_rules.py --key-memory 删旧写新）；**会话档案区频率拍板** = 换话题自动提炼 | 知识库维护规范.md（第十节 + 五-1）+ KEY_MEMORY.md + tools/kb_seed_rules.py + session_start_report.js | 主 AI |
| 2026-08-03 | **部署权限澄清（规范 v3.7，用户拍板"只有专业报告可以部署上线，其他没权限"）**——该限制**仅限大脑体系子 AI**（Claude Code 主大脑/技术验证员：只有专业报告可部署上线，其余产出无权限、需上线先报主 AI 审批）；**主 AI 及各主窗口 AI（闲聊/智能体/日志/UI）本身有部署权**，正式内容照常部署 | 知识库维护规范.md（铁律 3 + 三-7 + 五-2）| 主 AI |
| 2026-08-03 | **审核辅助机制（用户 08-03 拍板"智能体 AI 兼任主 AI 审核辅助"）**——智能体 AI 定期审核：①工作记录一致性（ai-worklog/CHANGELOG/任务板/机制更新对照）②文档数字一致性（交接/规范/KEY_MEMORY 版本、页数同步）③随机抽 2-3 页内容核对（数据来源/硬伤）。触发=每周或攒够反馈；产出=审核意见进任务板（带认领人+期限）；发现大改动只建议不抢跑 | 智能体 AI 交接（.claude/handoffs/2026-08-03-agent-d-handover.md）+ 任务板 + 记忆库 | 智能体 AI |
| 2026-08-03 | **工作根目录迁移至 D 盘（C 盘弃用）**——用户拍板"以后主要在数据库里查"，新根目录 = D:\ai\学习公司产品知识树。所有 AI 开工必读新交接文档（迁移交接，含复制即用交接提示词）+ 新开场话术（D 盘版：查询主入口 = 先查记忆库 mem_search，查不到再翻文件） | D:\ai\学习公司产品知识树\.claude\handoffs\2026-08-03-migration-handover.md（交接）+ D:\ai\学习公司产品知识树\knowledge-base\markdown\会话记录\session-prompt-d.md（话术）+ 记忆库 mem0 | 主 AI |
| 2026-08-03 | **全量入库：记忆库 = 统一查询主入口（用户拍板"以后主要在数据库里查"）**——规则 17 条 + 知识 387 条全部灌入 mem0（metadata.source 带出处）；AI 任何知识/规则/记忆问题**先 mem_search 数据库**（一个口子查所有、带出处），查不到再翻文件；文件保留为源（用户手机看 + 兜底） | 记忆库 mem0（D:\ai\brain-memory）+ tools/kb_seed_rules.py + kb_seed_knowledge.py + 规范第十节 | 主 AI |
| 2026-08-03 | **AI 自动沉淀记忆 = 默认动作（用户拍板 B 方案，广播所有 AI）**——话题聊完/干完活有**结论/决定/教训/偏好**就 mem_add 自动存（不等用户提醒，攒 1-2 话题一条，不碎碎念）；**用户拍板决策 = 最高优先级必存**（闲聊 AI 漏存被用户抓出"这一条你没存？"的教训）；落地要低——先跑通"自动存"最小一步，不搞大蓝图；远期"会话档案区"边界待确认暂不落地 | 知识库维护规范.md（第十节）+ 记忆库 mem0 | 主 AI |
| 2026-08-03 | **机制瘦身（规范 v3.6，用户拍板）**——砍"机制养机制"：①铁律 11→10 条（合并收尾门禁+DoD）②**留痕分工**五处定位：CHANGELOG=唯一全量追溯（AI 看）/ ai-worklog=人员一句话（AI 看，细节引用 CHANGELOG）/ mechanism-updates=新机制广播（用户看，稳定即清理）/ team-task-board=任务待办（用户看）/ mem0=结论沉淀 ③**双格式分级**：用户看页（知识/经验/日志/机制/任务板）HTML+MD 成对，AI 看页（ai-worklog 等）可只写 MD——deploy.js checkPairs 加 MD_ONLY_EXEMPT 豁免 ④健康度盘点**产出必带认领人+期限**（不挂灰）。依据：闲聊 AI 机制健康度评估（收件箱 [待探讨]） | 知识库维护规范.md（v3.6）+ KEY_MEMORY.md + tools/deploy.js + CODE_WIKI.md（v3.4）+ ai-worklog + kb-health-checklist | 主 AI |
| 2026-08-03 | **记忆入库方案落地（规范 v3.5）**——用户拍板（调查业界后修正）：记忆大脑（mem0）升级为**主记忆**（干完活 mem_add 写、开工/压缩后 mem_search 读，不依赖任何 hook 时机）；KEY_MEMORY 降级为速查一页纸，快照区退二线保底；session_start_report.js 开窗自动回忆最近记忆；压缩统一用**带参数** `/compact 保留任务状态/关键决策/下一步`（裸 /compact 走 session memory 分支会跳过 PreCompact hook——本次压缩实锤，快照未更新） | 知识库维护规范.md（v3.5 第十节）+ KEY_MEMORY.md + tools/session_start_report.js + CODE_WIKI.md（v3.3 §4.3） | 主 AI |
| 2026-08-03 | **记忆大脑正式接入（mem0）**——阶段 2 落地（用户直接授权 + 主 AI 确认）：本地免 key 分层记忆库，各 AI 干完活用 `mem_add.py` 沉淀记忆（--agent 区分 AI / --layer 分层 mid/long），开工/答疑前用 `mem_search.py` 先查记忆，纠正用 `--fix-target` 删旧写新（真不再犯）。M3 里程碑达成（跨会话不丢 + 纠正不再犯）。**所有 AI 开工必读**：先用 `mem_search` 查"与我相关的记忆"，干完活用 `mem_add` 沉淀 | D:\ai\brain-memory\README.md（使用说明）+ 本页广播 | 主大脑 |
| 2026-08-03 | **规范升 v3.4：新增铁律 10"防失忆强制"**——KEY_MEMORY.md 为压缩后第一读；承诺/决策/状态即时落文件；deploy 门禁强制 CHANGELOG 今日有条目；改完必回读。新增规范"十、防失忆与关键记忆"节（三层强制详述） | 知识库维护规范.md（v3.4）+ .claude/handoffs/KEY_MEMORY.md + CODE_WIKI.md（v3.2 §4.3） | 主 AI |
| 2026-08-03 | **防压缩失忆三层强制**——①PreCompact hook（tools/precompact_save.js）压缩前自动把任务板/CHANGELOG 状态落盘到 KEY_MEMORY.md 快照区 ②SessionStart 开窗自动读回速查表摘要 ③deploy.js 强制 CHANGELOG 今日有条目才放行。配套 KEY_MEMORY.md（.claude/handoffs/）为压缩后第一读 | .claude/handoffs/KEY_MEMORY.md + .claude/settings.json + tools/precompact_save.js + session_start_report.js + deploy.js | 主 AI |
| 2026-08-03 | **AI 大脑技术验证报告页入库**——技术验证员产出《AI 大脑技术验证报告》（5 方案实测 5 关 + 5 独立审计复核，主选 deep-memory、备选 mem0），正式页入库思考收件箱，已完成 registry/nav/首页登记 | domains/思考收件箱/brain-tech-verification.html（报告）+ brain-window-verifier.md（验证员提示词） | 主 AI |
| 2026-08-03 | **Trae 移动端写本地文件验证通过**——从移动端发消息 → 本地共享文件夹根目录即时新建文件（实测"测试实时同步"落盘成功，秒级）→ 阶段 4 接入大脑（fs.watch 实时监听）的物理前提成立。建监听时需监听整个知识库根目录（含子目录），不能只盯 inbox | 本页广播（待阶段 4 落地后补使用说明） | 主大脑 |
| 2026-08-03 | **检索大脑正式接入（deep-memory）**——本地混合检索工具（向量+BM25+重排），检索正式库（只读），替代手工 fanku 自动化；已适配 7 域多级目录+中文专有型号；环境 D 盘 D:\ai\deep-memory，检索走 search.py，结果带"待核实"标注 | D:\ai\deep-memory\README.md（使用说明）+ 本页广播 | 主大脑 |
| 2026-08-02 | **AI 工作记录（名字体系）**——每个 AI 干完活登记：日期+名字+做了什么+涉及位置 | domains/思考收件箱/ai-worklog.html | 主 AI |
| 2026-08-02 | **团队任务板**——多人协作任务的登记/认领/状态流转 | domains/思考收件箱/team-task-board.html | 智能体 AI |
| 2026-08-02 | **知识库健康度盘点**——五维体检清单，问题进任务板 | domains/思考收件箱/kb-health-checklist.html | 智能体 AI |
| 2026-08-02 | **翻库规则（fanku skill）**——知识问题必先查库：先翻库、再开口；带出处、不编造；翻不到、说没有 | .trae/skills/fanku/SKILL.md + 规范八 | 智能体 AI |
| 2026-08-02 | **本页（机制更新）建立**——所有新增机制的广播索引 | 本页 | 主 AI |
| 2026-08-02 | **会话启动自动报告（Claude Code 开窗即自动）**——智能体窗口一开，自动输出"我是谁 + 任务板待办 + 机制更新数 + 纪律"，不再手贴话术 | tools/session_start_report.js + .claude/settings.json | 智能体 AI |
| 2026-08-03 | **AI 大脑蓝图 v1 + 窗口分工模型**——大脑定位=代替用户当枢纽的自主系统（非难任务执行者）：四层架构（接入/检索/记忆/进化）+ 分阶段路线 + 验收标准 + 里程碑；窗口分工=主大脑统筹 + 技术验证员窗口试跑 + 用户临时传话（改串查并） | .claude/handoffs/brain-blueprint-v1.md（蓝图）+ brain-window-main.md（主大脑提示词）+ brain-window-verifier.md（验证员提示词）+ archive/2026-08-03-agent-brain-v2.md（交接） | 智能体 AI |
| 2026-08-03 | **大脑体系新成员登记：主大脑 + 技术验证员**——两个 Claude Code 窗口正式加入 AI 团队名单（大脑体系分组）；session-prompt 加第十一节（主大脑话术指引）和第十二节（技术验证员话术指引） | ai-worklog（团队名单）+ session-prompt（十一、十二节） | 主 AI |

## 三、维护规则

- **谁建谁记**：新建机制（页面/规则/skill/流程）后，建立者顺手在本页追加一行——并进 DoD 自检，防止"建了没人广播"
- **只索引不复制**：每条写"去哪读"指向具体页面，内容留在原页面，避免本页膨胀成第二个话术页
- **固定项不进本页**：ai-worklog/团队任务板/健康度/翻库这 4 样是"永久必读"，属于话术页固定项；本页只收增量
- **稳定即摘除**：机制被普遍掌握后，从本页摘除（各 AI 已知道、入口已在话术页），本页保持"最近新增"的短小形态

## 相关页面

- 新会话开场话术：domains/会话记录/session-prompt.html（各 AI 的开场与固定必读，本页是其增量入口）
- AI 工作记录：ai-worklog.html（谁做了什么，带名字留痕）
- 团队任务板：team-task-board.html（该做什么：登记、认领、追踪）
- 知识库健康度盘点：kb-health-checklist.html（定期体检清单）
