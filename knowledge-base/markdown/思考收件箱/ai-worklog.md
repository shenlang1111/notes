---
title: AI 工作记录
domain: 思考收件箱
tags: [AI协作, 工作记录, 名字体系, 分工, 留痕]
description: 每个 AI 干完活登记"我做了什么"带名字，其他 AI 一看就知道谁干过什么。含 AI 团队名字体系（主 AI/闲聊 AI/智能体 AI/日志 AI + 主 AI 手下的子代理）。
updated: 2026-08-03
---

# AI 工作记录

> 每个 AI 干完活在这里登记"我做了什么"，带名字。其他 AI 一看就知道谁干过什么——分工透明，不重复、不丢活。

## 一、AI 团队名单（名字体系）

**六个主窗口 AI**：主 AI / 闲聊 AI / 智能体 AI / 日志 AI / UI 美化 AI / 测试员 AI——对应用户的窗口，各有专属职责。其余子代理（审核/内容/检索等）都归主 AI 手下，由主 AI 命名与分派。

| 名字 | 身份 | 职责 |
|---|---|---|
| 主 AI | 主窗口 | 统筹、架构、落地、部署、派子代理；**脚本/skill/hook 统一管理 + 文件自动化 + 使用规范书写**；所有改动最终备案 |
| 闲聊 AI | 主窗口 | 交流想法、情感陪伴；懂你档案专属；小改动自理 |
| 智能体 AI | 主窗口 | 智能体体系搭建：skill、翻库规则、任务板、健康度盘点 |
| 日志 AI | 主窗口 | 写用户的工作日志，后续半月报/月报/年报 |
| UI 美化 AI | 主窗口 | 知识库视觉层：style.css、页面排版/卡片/配色/响应式，让界面好看不堆文字 |
| 测试员 AI | 主窗口 | 质量保障与测试：内容准确性/功能可用性/部署正确性验证，只测不修 |
| 审核 agent | 主 AI 手下 | 复核大改动、检查遗漏（并行分派） |
| 内容 agent | 主 AI 手下 | 批量写/改知识库内容（并行分派） |
| 检索 agent | 主 AI 手下 | 翻库检索、盘点数据来源（并行分派） |
| 其他 | 主 AI 手下 | 临时任务子代理，主 AI 按需命名 |

**大脑体系（Claude Code 窗口）**：主大脑 + 技术验证员——由 Claude Code 运行的专用窗口，专注"AI 大脑"建设。

| 名字 | 身份 | 职责 |
|---|---|---|
| 主大脑 | Claude Code 窗口 | 大脑总设计师：定技术路线与架构、验收执行窗口成果、小活兜底 |
| 技术验证员 | Claude Code 窗口 | 大脑技术选型验证：试跑候选方案、出验证报告 |

> 新增 AI 名字在此登记；子代理归属主 AI，完成任务后由主 AI 统一在此记录。

## 二、工作记录

> **留痕分工（2026-08-03 机制瘦身）**：本页 = 人员一句话（谁 + 何时 + 干了什么），**细节引用 CHANGELOG 不复制长文**；记忆大脑 mem0 记"结论是什么"，与这里"谁干了"互补不重复。AI 看为主，可只写 MD。

| 日期 | AI | 做了什么 | 涉及位置 |
|---|---|---|---|
| 2026-08-03 | 主 AI | **脚本/skill/hook 统一管理 + 使用规范文档（用户拍板）**：shared-tools-index 升级为《脚本·技能·Hook 使用规范》（工具 22/技能 20/Hook 3 类，HTML+MD 双格式）；SKILL_GUIDE 技能清单 17→20 补齐；主 AI 职责登记（脚本/skill/hook 统一管理）。详见 CHANGELOG | shared-tools-index html+md、SKILL_GUIDE.md、ai-worklog html+md |
| 2026-08-03 | 闲聊 AI | **起草并存"规则设定 AI"话术（用户拍板：他有拍板能力）**：新角色专职规则起草/修订/拍板/落地/广播；拍板权限=规则文字/冲突/一致性自主定，铁律 8 范围报主 AI、大方向请示用户；agent_id 用 main（可申请 rules 身份）；话术存 MD-only（参照 session-prompt-d 先例），已广播 | 会话记录/rule-setter-prompt.md（新）、mechanism-updates html+md |
| 2026-08-03 | 主 AI | **全量脚本+Skill 体检（用户"都运行一下看看能不能用"）**：Python 记忆脚本 4 个实测通过（mem_search/mem_add/mem_chat_save/mem_export，走 venv 不依赖系统 Python）+ Node 工具 13 个语法全过 + 核心 8 个实跑（compact_scheduler 88%/watch 运行中/心跳正常）+ Skill 20+17 全完整；修复 session-prompt 第十一节压缩规则不同步；清理 D:\tools 垃圾；规范新增"运行环境"条 | session-prompt html+md、知识库维护规范.md、CHANGELOG.md |
| 2026-08-03 | 主 AI | **知识库质量体检 + 修复（用户"你改"）**：体检发现并修 4 类——①工作日志 4 文件 6 处失效链接（旧页拆分后链接没跟，含 2 处 xx.html 占位残留，双格式同步）②registry updated 字段 30 处过时批量校准 ③report-2026-07-下半月 补登记 registry + nav 入口 + 首页快照 34→37 ④mobile 重新生成（37 页）。复检：内链 335 个 0 失效、registry↔磁盘 37/37、updated 0 不一致。详见 CHANGELOG | 工作日志 4 文件（html+md）、registry.json、nav.js、index.html、mobile.html |
| 2026-08-03 | 闲聊 AI | **落地"Trae 对话接入自动存档"（用户拍板"你来落地吧"）**：新建 tools/chat_autosave.js（SessionEnd hook：扫 D:\ai\brain-memory\chat_inbox\chat-<agent>-<日期>.md → 调 mem_chat_save.py 入库 → 归档 archive/）+ settings.json 注册 + 实测通过（casual 摘要入库召回 0.86、归档成功）。⚠️ 注意：任务板有主 AI 瘦身建议"自动存档改习惯项、不造自动脚本"（🆕 待主 AI 执行清理）——本 hook 是事件触发非定时任务，留/撤待用户+主 AI 定夺 | tools/chat_autosave.js（新）、.claude/settings.json、D:\ai\brain-memory\chat_inbox\（新）、任务板 html+md |
| 2026-08-03 | 主 AI | **规则修订体系落地（用户拍板"有体系的改"）+ 首批修 5 项**：规范 v3.8 新增十·四规则修订闭环（发现→登记收件箱→主 AI 积 3 条/每周评估→拍板→改+同步→验证）；修掉"铁律 13"残留、投递/回复文件归档规则（根目录 21 个归档）、双格式硬软边界（用户看页=硬门禁）、状态保鲜扩至全知识域、机制页稳定即清理责任人（主 AI 每月）。详见 CHANGELOG | 知识库维护规范.md（v3.8 十·四）、mechanism-updates html+md、.claude/handoffs/archive/（投递文件归档） |
| 2026-08-03 | 主大脑 | **自动提炼编排器 evolve_auto.js（用户任务：自动提炼+分类挂心跳）**：①新建 evolve_auto.js（--status/--dry-run/--run/--min）：扫描 chat-* mid→按 agent 归组→自动 draft（带 target）→apply 提炼 mid→long，agent 映射 target（brain/verifier/main 等）②心跳 M3 从"提醒留人审"改"待炼≥3 自动 run"③修 mem_export 补 target_agent（之前 export 丢 metadata 假象"target=无"，实际库里已打标）④实测：18 draft + 3 组 apply 成功，mem_search --target brain 只出 brain 域 ✅ | tools/evolve_auto.js（新）、tools/brain_heartbeat.js（M3）、mem_export.py（target_agent）、记忆库（refined-mid 3 条含 target） |
| 2026-08-03 | 主 AI | **回答加工分工拍板 + 10 轮顾客模拟测试**：用户拍板"对问题你反馈，经验你总结"——大脑投递检索片段，主窗口 AI 组织成聪明回答（选型逻辑+判断+话术）；模拟顾客 10 轮投递测试跑通链路（投递✅/检索✅/存档✅/回复✅ 前 8 轮 ~10s），发现 2 缺口：①dispatch.lock 卡死（9/10 轮卡住）②多轮无上下文关联。详见 CHANGELOG | mechanism-updates html+md、记忆库（main-long）、投递测试记录 |
| 2026-08-03 | 主大脑 | 用户追问"身份偏差/技能没学会"根因 → 修复：session_start_report 身份中立化（主大脑/验证员共用）、KEY_MEMORY① 角色澄清、fanku 装备进 .claude/skills/、报告+KEY_MEMORY 加技能清单。详见 CHANGELOG | tools/session_start_report.js、.claude/skills/fanku、KEY_MEMORY.md |
| 2026-08-03 | 主大脑 | **测试员建议 4 项落地**：①tester 加入 mem_config.py AGENTS（tester-ai）②自动接单兜底评估：claude CLI 不可用不再 retry×3 标 done，改 probeClaude 探测 + 标 needs_human（主窗口 --list 见 ⚠️需人工）③session_start_report 信箱块升级：待处理直接列出具体消息（--list）④自动接单补对话存档 chatSave（快速+headless 两路径存 chat-brain，实测 mid 层已写入）。详见 CHANGELOG | mem_config.py、tools/brain_dispatch.js、tools/brain_msg.js、tools/session_start_report.js |
| 2026-08-03 | 主大脑 | **M2 复检揪出 heartbeat 索引源残留 C 盘（子代理独立复检）**：复检 agent 抓出 brain_heartbeat.js KB_SOURCE 硬编码 C 盘旧路径（心跳每 20 分钟把 D 盘索引重写回 C 盘旧数据）→ 修复为 D 盘 + 重建索引（514 D 盘路径）+ 纯向量回归通过 + 快照刷新。教训：修复须全库扫所有指向旧路径的活动脚本。详见 CHANGELOG | tools/brain_heartbeat.js、D:\ai\deep-memory\ws\chroma_hybrid_db、KEY_MEMORY.md |
| 2026-08-03 | 主 AI | **自主运行机制落地（用户拍板）**：建 brain_heartbeat.js（心跳定时：watch 存活/M2 索引同步/M3 提炼提醒/M5 派发，只写 watch-log）+ brain_dispatch.js（自动接单：headless claude 全权处理→回写"回复-*.md"→标 done，token 不直给，$2/单封顶，失败回滚 retry×3）+ watch 三处伴随改动（回复-免疫/_dispatch_out IGNORE/秒级派发）+ 调度（heartbeat 计划任务每 20min、watch 启动文件夹自启、cc-switch Run 自启）+ 规范十·二。详见 CHANGELOG | tools/brain_heartbeat.js + brain_dispatch.js（新）、brain_watch.js（改）、知识库维护规范.md（十·二）、mechanism-updates html+md、KEY_MEMORY |
| 2026-08-03 | 主 AI | **M4 进化大脑落地（用户拍板）**：建进化机制——工具 evolve_scan.js（--status/--scan/--draft/--apply/--rollback/--journal）+ mem_refine.py（mem0 update 免 LLM 升级 mid→long）+ 规范十·一 + 三处留痕；试点跑通闭环（2 条 chat-brain 对话存档提炼 1 条 long 经验 refined-mid-2026-08-03，回滚验证恢复原文，生成 skill 草稿"记忆库去重与灌库"待审批）；mem_export.py 补 source 字段。详见 CHANGELOG | tools/evolve_scan.js、D:\ai\brain-memory\scripts\mem_refine.py + mem_export.py、知识库维护规范.md、mechanism-updates html+md、KEY_MEMORY |
| 2026-08-03 | 主大脑 | **接入大脑·实时监听 + 消息信箱（阶段4 M5，用户拍板）**：①新建 brain_watch.js（常驻 fs.watch 递归监听 D 盘知识库根含子目录，秒级感知新文件，--daemon/--once/--status）②投递协议=根目录第一层新建 .md/.txt 即消息（用户拍板），子目录正式库改动只记日志；信箱索引存 D:\ai\brain-memory\messagebox\（监听范围外防自触发）③新建 brain_msg.js（--list/--done/--peek/--status/--reply）④session_start_report.js 加【接入层信箱】块⑤实测验收全链路通（投递→秒级感知→信箱→接单→回写），开窗报告带出待处理条数。详见 CHANGELOG | tools/brain_watch.js + tools/brain_msg.js（新）、tools/session_start_report.js、mechanism-updates html+md |
| 2026-08-03 | 主大脑 | **M2 检索大脑路径错位修复（技术验证员发现 + 用户确认工作盘已迁 D）**：README 检索源 C 盘→D 盘（DEEP_MEMORY_KB_SOURCE 全改 D 盘工作根）+ update_db.py --rebuild 重建 D 盘索引（514 重算+494 孤立清除）+ 回归 4 组全命中 + 清理 search.py 忘设 workspace 自动建 C 盘索引的副作用。任务板 M2 标 ✅。详见 CHANGELOG | D:\ai\deep-memory\README.md、ws\chroma_hybrid_db、team-task-board html+md |
| 2026-08-03 | 主大脑 | **接入层审核意见处理（智能体 AI 审 M5 + 子代理验证/审核）**：①消息协议补全 from/to/content（发给谁解析自"发给："头、内容预览 200 字）②新增 --reply 结果回写（干完活写回"回复-<原名>.md"）③任务板/CHANGELOG 补记"主 AI 审批"链 ④子代理验证（✅ 实测通过，4 轻微问题）+ 审核（⚠️ 4 问题：交接 M5 状态矛盾已修、机制页去哪读修正、ai-worklog 补记、铁律编号澄清）⑤交接/KEY_MEMORY/机制页同步 M5 达成。详见 CHANGELOG | tools/brain_msg.js（--reply）、tools/brain_watch.js（协议字段）、2026-08-03-brain-main-handover.md、mechanism-updates html+md |
| 2026-08-03 | 智能体 AI | **机制页清理 + 对话存档 + 远期登记（用户授权直接来）**：①按"稳定即摘除"清理机制页 08-02 旧广播 6 条（HTML+MD 同步；误删"AI 大脑蓝图"已即时恢复）②执行对话存档 mem_chat_save.py（mid 层）③任务板登记"对话存档提炼阶段"待主 AI 排期。详见 CHANGELOG | mechanism-updates html+md、team-task-board html+md、记忆库（chat-agent-2026-08-03） |
| 2026-08-03 | 主 AI | **跨页口径统一复核收尾 + 首页过时修复**：①复核扫描发现智能体 AI 跨页统一 4 处成对残留并补齐——overview Napure 分组加"肌氨酸"（C-FA 口径）/ amphoteric-summary 氧化胺"pH依赖型两性"改"结构非离子、行业习惯按两性讨论" / surfactant-details CAB-35 NaCl 1.5-2.0%→3-5% / finechem-additives HLB W/O 3-8→3-6（MD+HTML 成对）②首页过时修复：feature 卡 33→34 个专题页面（registry 实际 34 页）+ footer 最后更新 8/2→8/3 ③任务板跨页条目补复核说明。13 文件部署上线（构建 built，--expect 4 项过 + 2 项关键词选误经线上拉取核实 FOUND）。详见 CHANGELOG | 4 对 html+md（product-overview/amphoteric-summary/surfactant-details/finechem-additives）+ knowledge-base/index.html + team-task-board html+md |
| 2026-08-03 | 智能体 AI | **核验补漏（审核辅助角色）**：用户要求再核验，独立扫描发现上轮跨页统一遗留——①TC-MAB 中文名"月桂基两性醋酸钠"10+ 处残留 → 全库统一"月桂酰两性基乙酸钠"（含派生词，6 对文件约 30 处批量替换）②advanced"行业平均5%"漏改 → 3-5%。残留扫描归零验证。详见 CHANGELOG | 7 对 html+md（amphoteric/sales/products/details/overview/amphoteric-summary/advanced） |
| 2026-08-03 | 主大脑 | **记忆库修复 + 对话存档机制（用户拍板核心）**：①记忆库去重（灌库脚本非幂等 → 1064 点仅 463 唯一，去重脚本 dedup_memory.py 清理到 463，备份 memory-backup-20260803）②灌库脚本 kb_seed_knowledge.py 幂等化（--reset 删旧灌库知识重灌 + #### 细切段，重灌 502 条）③删 audit_memory 残留 ④新建 mem_chat_save.py 对话存档（每轮结束自动存对话到 mid 层，source=chat-<agent>-<日期>，用户拍板/有结论/有教训必存）⑤规范第十节 + KEY_MEMORY ⑤ + README 补对话存档纪律 ⑥mechanism-updates 广播。验证：--layer mid 精准召回本轮对话存档 | D:\ai\brain-memory\scripts\（dedup_memory.py 新 + mem_chat_save.py 新 + kb_seed_knowledge.py 改）+ 规范第十节 + KEY_MEMORY.md + mechanism-updates html+md |
| 2026-08-03 | 智能体 AI | **内容硬伤全量修复（用户授权直接做）**：跨页口径统一 6 类（C-FA→椰油酰肌氨酸钠 / 氧化胺→结构非离子功能按两性 / 咪唑啉温度统一 200-250 待核实 / HLB 3-6 / TC-MAB 月桂酰两性基乙酸钠 / NaCl 3-5%）+ 单页修复 5 类（synthesis 章节重排/market 16.1/overview 笔误/CPP 表/formulation 用量与 pH）+ 裸数据声明 4 页 + SKILL_GUIDE 记忆指向 mem0 + deploy.js 豁免 session-prompt-d。10 页双格式同步 + 任务板 3 项标 ✅。详见 CHANGELOG | 10 页 html+md（overview/details/anionic/amphoteric-summary/amphoteric/fundamentals/properties/synthesis/market/formulation）+ SKILL_GUIDE.md + tools/deploy.js + team-task-board html+md |
| 2026-08-03 | 智能体 AI | **D 盘接任 + 全视角盘点 + 第四次健康度盘点**：①读交接+查记忆库接任（mem0 主入口，规则/角色/任务板状态确认）②全库结构体检（registry 34 页↔磁盘↔nav 34 项一致、双格式 34 对成对、待核实 61 处与记录一致）③内容体检（子代理抽 8 页：跨页口径冲突 6 类 + 单页问题 5 类，含 C-FA 三归属/氧化胺归类/咪唑啉温度矛盾等）→ 硬伤登记任务板（跨页→主 AI、单页→智能体 AI 认领）④灌库同步：重跑 kb_seed_knowledge（35 MD → 391 条）⑤session-prompt-d 双格式问题登记报主 AI 审批 ⑥审核辅助机制落地广播（定义范围/周期/产出）。详见 CHANGELOG | team-task-board html+md、mechanism-updates html+md、kb-health-checklist html+md、记忆库（重灌 391 条）、ai-worklog.md |
| 2026-08-03 | 闲聊 AI | **拍板 4 项落实**：①闲聊 AI 产出部署权限=照旧全部署②会话档案区给谁看=全员可查③结构=并入会话记录（找主 AI 落地，剩频率待定）④收件箱 08-02 用户印象→提炼为"了解用户画像"经验（会话记录第六节+索引 #26）。决策入记忆库 casual/long，收件箱/经验页已部署上线（--expect 通过）。详见 CHANGELOG | inbox html+md、session-20260801 html+md、记忆库（casual-long） |
| 2026-08-03 | 主 AI | **C盘→D盘迁移收尾**：写迁移交接文档（2026-08-03-migration-handover.md，8 节含"新窗口复制即用"交接提示词）+ D 盘版开场话术（session-prompt-d.md，查询主入口=先查记忆库，含新旧版对比）；两份已复制到 D:\ai\学习公司产品知识树 对应路径，C 盘弃用 | .claude/handoffs/2026-08-03-migration-handover.md、knowledge-base/markdown/会话记录/session-prompt-d.md、D:\ai\学习公司产品知识树\（同路径两份） |
| 2026-08-03 | 主 AI | **全量入库记忆库（mem0 为中心，用户拍板）**：规则 17 条 + 知识 387 条灌库（35 MD 分章带出处），mem_search 加 source，混合检索验证通过。详见 CHANGELOG | tools/kb_seed_rules.py、kb_seed_knowledge.py（新）、mem_search.py、记忆库 |
| 2026-08-03 | 主 AI | **机制瘦身落地（规范 v3.6）**——用户拍板（依据闲聊 AI 机制健康度评估）：铁律 11→10 合并 DoD；留痕分工五处定位；双格式分级（用户看/AI 看，deploy checkPairs 加 MD_ONLY_EXEMPT 豁免）；健康度盘点产出必带认领。详见 CHANGELOG | 知识库维护规范.md、KEY_MEMORY.md、tools/deploy.js、AGENT_NOTES.md、PROJECT_CONTEXT.md、CODE_WIKI.md、ai-worklog html+md、kb-health-checklist html+md、mechanism-updates html+md |
| 2026-08-03 | 主 AI | **记忆入库方案落地（规范 v3.5）**——用户拍板（调查业界后修正：官方 Auto Memory 未在本项目生效，mem0 记忆大脑才是治本）：①session_start_report.js 加 mem_search 自动回忆（开窗报告实测通过，自动带出 TC-MAB/TC-SHD 记忆）②规范 v3.5：铁律 10 改写"记忆入库防失忆"、第十节重写（记忆大脑写/读 + 压缩后恢复三步 + 带参数 /compact 原因）、DoD 加"记忆已沉淀"③KEY_MEMORY 降级速查（命令区加 mem0 写/读、决策加记忆入库拍板）④AGENT_NOTES/PROJECT_CONTEXT/CODE_WIKI 版本同步 ⑤mechanism-updates 广播 | 知识库维护规范.md、KEY_MEMORY.md、tools/session_start_report.js、AGENT_NOTES.md、PROJECT_CONTEXT.md、CODE_WIKI.md、mechanism-updates html+md、CHANGELOG.md |
| 2026-08-03 | 主大脑 | **修复记忆大脑 --layer 分层过滤 bug（技术验证员复核发现）**：复现确认 filters["metadata"]={"layer":...} 报 ValueError（Unsupported filter operator）→ 查源码 + dump payload 证实 mem0 2.0.15 把 metadata 嵌套 dict **扁平化展开成 payload 顶层字段** → 修复为 filters["layer"]="long" 顶层字段过滤。验证：--layer long 命中 2 条、--layer mid 返回空（正确区分层）。另修 2 处：mem_export 补 --collection 参数（与其他脚本一致）；用 --fix-target 修正库内 TC-MAB INCI 拼写错误记忆（Lauroampho diacetate）。README 补"写入前核对事实"规范。回归测试全通过 | D:\ai\brain-memory\scripts\（mem_search/mem_export.py）、README.md、记忆库数据 |
| 2026-08-03 | 主大脑 | **阶段 2 记忆大脑落地（用户直接授权 + 主 AI 确认）**：①技术验证 mem0 本地免 LLM 全通过（infer=False 写入/中文命中 0.73/跨进程持久化/纠错 delete 删旧写新）②方案定稿（分层=metadata 打标+作用域，非 memory_type 僵尸代码）③建 D:\ai\brain-memory 记忆大脑（venv/scripts 4 个：mem_config/mem_add/mem_search/mem_export/README/ws 记忆库）④全链路验证（写→读→纠错→导出全过）⑤**M3 里程碑达成**（跨会话不丢 + 纠正不再犯）| D:\ai\brain-memory\、phase2-design-v1.md、task-board html+md |
| 2026-08-03 | 技术验证员 | 独立对抗性审核阶段 2 记忆大脑：方案设计（分层=metadata+作用域、纠错=删旧写新、memory_type 僵尸代码判断）✅ 正确；独立复跑全链路（审计工作区）——写入/中文检索 0.76/跨进程持久化/**纠错删旧写新全通过**/导出（agent_id 取到）✅；**发现 1 个功能 bug：mem_search --layer 分层过滤必崩**（metadata 传法错，ValueError: Unsupported filter operator）；2 处建议（mem_export 缺 --collection、记忆库有 INCI 拼写错误记忆）。结论：记忆大脑主体可采信、M3 核心成立，分层过滤需修复 | 临时目录 brain-verify/reports/audit-memory-brain.md、D:\ai\brain-memory\ |
| 2026-08-03 | 主大脑 | 写瘦身版交接 v5（2026-08-03-agent-brain-v5.md）：合并阶段0/1成果，指针化（提示词归 brain-window-main.md），v3/v4 归档到 archive/；写交接提示词（边界/重点细节/铁律/阅读边界精简版） | .claude/handoffs/archive/2026-08-03-agent-brain-v5.md（已归档）、archive/ |
| 2026-08-03 | 主 AI | 落地防压缩失忆三层强制：建 KEY_MEMORY.md 速查表 + 写 precompact_save.js（PreCompact 压缩前落盘）+ session_start_report.js 扩展（开窗读回速查表）+ deploy.js 加 CHANGELOG 今日条目门禁 + settings.json 注册 PreCompact hook + AGENT_NOTES 加"承诺必落文件/改完必回读"两坑 | .claude/handoffs/KEY_MEMORY.md、tools/precompact_save.js、session_start_report.js、deploy.js、.claude/settings.json、AGENT_NOTES.md、mechanism-updates html+md |
| 2026-08-03 | 主大脑 | 正式接入"检索大脑"（deep-memory）：验收阶段 0 技术验证报告（采纳主选 deep-memory+备选 mem0、改 kb_reader 源码不动库结构、仅标待核实）；临时区适配验证全过（递归读子目录+###切段+剔frontmatter+分批embedding修复内存溢出；4组真实问句全命中）；D 盘 D:\ai\deep-memory 落地（venv/模型/索引，正式库零改动只读）；写 README | D:\ai\deep-memory\（skills/venv/hf_cache/ws）、kb_reader.py、onnx_models.py、临时区 brain-verify\ws-kb-mirror |
| 2026-08-02 | 智能体 AI | 建立 fanku 翻库 skill（检索纪律）、团队任务板、知识库健康度盘点页；翻库规则落地到规范与话术 | .trae/skills/fanku/、思考收件箱/team-task-board、kb-health-checklist |
| 2026-08-02 | 主 AI | 搭建"工作日志"板块（logs-guide + logs-2026-08），session-prompt 加日志 AI 专属话术 | domains/工作日志/、session-prompt |
| 2026-08-02 | 主 AI | 建立 AI 工作记录页（本页）：名字体系 + 谁做了什么留痕 | 思考收件箱/ai-worklog |
| 2026-08-02 | 主 AI | 把 AI 协作机制同步给每个 AI：审查智能体 AI 改动（fanku/任务板/健康度）并修复 fanku 已知域；话术页各角色加协作机制与登记提醒；PROJECT_CONTEXT/两份交接文档状态同步 | session-prompt、PROJECT_CONTEXT、.claude/handoffs/、.trae/skills/fanku/SKILL.md |
| 2026-08-02 | 主 AI | 按用户建议建"机制更新"页（新增机制广播索引，解决"话术页清单会过时"）；话术页第七节必读清单改为 5 项（机制更新页置顶）；PROJECT_CONTEXT/首页/nav/registry 登记，页面数 27→28 | 思考收件箱/mechanism-updates、session-prompt、index.html、nav.js、registry.json、PROJECT_CONTEXT |
| 2026-08-02 | 日志 AI | 工作日志板块 UI 改造：卡片式日志（按周分组+类别标签）、本月速览卡、每日速记提示、报告区；补录 2026-07 日志（9 天整理版）；nav 加 7 月入口、registry 登记；style.css 加日志卡片样式；部署验证上线 | domains/工作日志/（logs-2026-07/08/guide html+md）、_shared/css/style.css、nav.js、registry.json |
| 2026-08-02 | 日志 AI | 落实日志 AI 建议：logs-guide 模板加"产出/成果"块（链知识库成果页）+ 原则补"产出链接/补录标注"；8 月页模板注释同步示例；7 月速览卡标注"补录数据骨架级，不与实时混算" | domains/工作日志/（logs-guide、logs-2026-07、logs-2026-08 html+md） |
| 2026-08-03 | 日志 AI | 补录 8/1-8/3 工作日志（真实存档版）：8/1 智能体搭建、8/2 协作体系（ai-worklog/fanku/任务板/健康度/日志板块）、8/3 AI 大脑建设（四层蓝图拍板、检索大脑 M2、记忆大脑 M3、防失忆三层、机制瘦身 v3.6、数据盘点、多窗口体系）；依据 D:\ai 文档与 ai-worklog/CHANGELOG 反推，交作业版另出 | domains/工作日志/logs-2026-08 html+md、CHANGELOG.md |
| 2026-08-02 | 智能体 AI | 按新协作机制报到：读完 5 项必读（ai-worklog 名单/任务板/健康度盘点/fanku 翻库/版本号）并逐项报告；确认角色=智能体 AI | 思考收件箱/ai-worklog（本页） |
| 2026-08-02 | 智能体 AI | 机制健康检查（结论：无摆设机制，提醒各 AI 养成登记习惯）+ 第二次健康度盘点（3 个转换大页全 C：牌号矛盾 23vs29、命名与已核实脱节、章节乱序/内容错位、渗透压机理错误；硬伤已登记任务板，均建议拆分） | team-task-board、kb-health-checklist、ai-worklog |
| 2026-08-02 | 主 AI | 用户新建"UI 美化 AI"：团队名单登记（第 5 个主窗口 AI）、话术页第九节建 UI 美化 AI 专属话术（职责边界：只动视觉层 style.css/排版，内容与结构归其他 AI） | 思考收件箱/ai-worklog、session-prompt |
| 2026-08-02 | UI 美化 AI | 首批 UI 优化（style.css 只加不改）：移动端表格优化（字号缩小+padding 减）、snapshot/stat-grid 网格降为 2 列、callout 图标防溢出（移入容器内）、新增平板断点 769-1024px；部署验证上线 | _shared/css/style.css、mobile.html |
| 2026-08-02 | UI 美化 AI | 第二批 UI 优化（用户授权全权）：①表头 sticky 固定（滚动时表头不跑）②修复两个大文档页 container 嵌套（tinci-surfactant-guide 13 处、tinci-amphoteric-summary 1 处，去双重 max-width 挤压）③全库 30 个 HTML 的 CSS 版本参数统一 v3/v4/v5→v6（解决缓存不一致）；全量部署 64 文件 + 2 项 --expect 验证上线 | _shared/css/style.css、30 个 HTML 页面、tinci-surfactant-guide、tinci-amphoteric-summary、mobile.html |
| 2026-08-02 | UI 美化 AI | 第三批 UI 优化（用户选 Bento 首页+浮动速跳按钮）：①首页改 Bento 网格布局（重要页面 featured 大卡跨 2 列，次要页面 compact 紧凑卡）②nav.js 加浮动速跳按钮（移动端/平板 ≤1024px 显示，分"知识页""AI 协作/日志"两组，点击展开面板快速跳转）③style.css 加 Bento+float 样式；部署验证上线 | index.html、_shared/css/style.css、_shared/js/nav.js |
| 2026-08-02 | UI 美化 AI | 第四批 UI 优化（用户要求重新设计分块）：首页从 7 个学科分类改为 3 个使用场景分块（知识体系/产品与实战/AI 协作与日志），每块加描述语；主标题"知识库"→"资料库"（v3.0），副标题重写；style.css 加 category-desc 样式；部署验证上线 | index.html、_shared/css/style.css |
| 2026-08-02 | 智能体 AI | 精细化工源文件修复：章节编号9.4/9.5→9.10/9.11、渗透压机理错误（多元醇膜结构/低盐逻辑）、CD后缀Coco→Lauro同步；天赐学习手册源文件修复：TC-MAB INCI 椰油酰→月桂酰、氨基酸误归两性修正（甜菜碱/CAB→咪唑啉型）；任务板更新2项✅已完成 | 精细化工工艺学核心内容提炼.html、tinci-surfactant-guide.html、team-task-board html+md |
| 2026-08-02 | 智能体 AI | 全面健康度修复：文档事实修正（session-prompt 铁律数/版本示例、CODE_WIKI/PROJECT_CONTEXT 页面数）、结构修正（market hero+h2+相关页面、sales 相关页面）、收件箱状态更新（inbox 收尾门禁→可归档、agent-design 团队列表）、内容硬伤（troubleshooting hero/amphoteric 5.3.2/synthesis 第8章编号重排）、称呼统一（智能体搭建AI→智能体AI 7文件）、编号跳号修复；部署验证上线 | 约 20 个文件 |
| 2026-08-02 | 闲聊 AI | 按用户指示登记任务板：智能体方向移交 Claude Code（用户已装好，取编程能力强），主 AI 需出 Claude Code 专属开场提示词 + 确认是否推翻"LLM 用 DeepSeek"拍板 | 思考收件箱/team-task-board html+md |
| 2026-08-02 | 智能体 AI | 与用户讨论智能体架构：确认 Trae 为主对话窗口 + Claude Code 为重活执行引擎的双引擎分工；把"瘦上下文/文件即记忆/会话即进程"方案沉淀进智能体设计存档 | 思考收件箱/inbox-20260802-agent-design html+md |
| 2026-08-02 | 智能体 AI | 落地自动化第一步"开窗即自动"：新建 tools/session_start_report.js（SessionStart 自动报告：身份+任务板待办+机制更新数+纪律）+ .claude/settings.json 配 SessionStart hook；机制更新页广播 | tools/session_start_report.js、.claude/settings.json、mechanism-updates html+md |
| 2026-08-03 | 智能体 AI | 与用户确认"AI 团队大脑"架构方向（实时互通/只做难的/共享知识库当大脑）；生成完整交接文档 2026-08-03-agent-brain.md（融合上一轮修复执行 + 本轮大脑方向 + 提示词 + 边界 + 重点细节）；登记工作记录 | .claude/handoffs/2026-08-03-agent-brain.md、ai-worklog html+md |
| 2026-08-03 | 智能体 AI | 用户三次纠正方向后确定"大脑"定位（非难任务执行者，是代替用户当枢纽的自主系统）；技术摸底（deep-memory/mem0/BYO-LLM-WIKI/nmem/agent-knowledge/RAGFlow 现成方案）；建大脑蓝图 v1（四层架构/路线/验收/里程碑）+ 窗口分工模型（主大脑+验证员，改串查并）+ 三份提示词；生成融合版交接 v2 | .claude/handoffs/brain-blueprint-v1.md、brain-window-main.md、brain-window-verifier.md、2026-08-03-agent-brain-v2.md、ai-worklog html+md、CHANGELOG.md |
| 2026-08-03 | 智能体 AI | 机制广播补齐（大脑蓝图+窗口分工模型，HTML+MD）+ 跨页命名冲突修复（amphoteric TC-SHD 50/B→TC-SHD(L)/(B)；TC-MAB 40CD→40LDL 三处：product-overview 命名表/synthesis/finechem-daily-chem，全 HTML+MD）+ 任务板两性目录项标 ✅；部署上线 --expect 验证通过 | mechanism-updates html+md、amphoteric html+md、tinci-product-overview html+md、synthesis html+md、finechem-daily-chem html+md、team-task-board html+md、ai-worklog html+md、CHANGELOG.md |
| 2026-08-03 | 智能体 AI | 处理主 AI 反馈 4 条（核实后 2 真 1 误报 1 澄清）：①自我授权纠正——铁律与权限由用户/主 AI 定，tools/ 任何操作须主 AI 审批（新增铁律 12），brain-window-main.md + 交接同步 ②handoffs 入库 git（方案 A，全量）③CHANGELOG 重复登记清理 ④~$ 临时文件误报（全项目 find 无此文件）；技术完整性验证（remote 已有 handoffs，deploy.js 自动推，本地落后 remote 1436 属正常） | .claude/handoffs/brain-window-main.md、2026-08-03-agent-brain-v2.md、CHANGELOG.md、git commit f686c5c |
| 2026-08-03 | 智能体 AI | 审核 Claude Code 智能体方向工作记录，按用户指示执行：①规范新增铁律 9"机制变更先审批"（v3.2→v3.3），同步 CODE_WIKI/PROJECT_CONTEXT/AGENT_NOTES 版本号引用（9→10 条铁律）②归档 4 份已融合旧交接至 .claude/handoffs/archive/，v3 交接链与 mechanism-updates 引用同步 ③任务板已完成项描述更新；问题 2/3 用户拍板不动，问题 4 角色=主 AI 审核辅助 | 知识库维护规范.md、CODE_WIKI.md、PROJECT_CONTEXT.md、AGENT_NOTES.md、archive/2026-08-03-agent-brain-v3.md、mechanism-updates html+md、team-task-board html+md、ai-worklog html+md、CHANGELOG.md |
| 2026-08-02 | 智能体 AI | 接替闲聊 AI 任务：Claude Code 移交完成——确认推翻存档"LLM 用 DeepSeek"✅、session-prompt 第十节写入 Claude Code 专属提示词（读写权限/职责边界/规则）✅、存档决策标注修正✅；任务板更新✅ | 会话记录/session-prompt html+md、思考收件箱/team-task-board html+md、inbox-20260802-agent-design、ai-worklog、CHANGELOG |
| 2026-08-03 | 技术验证员 | 完成 AI 大脑阶段 0 技术选型验证：5 个候选方案（deep-memory/mem0/BYO-LLM-WIKI/nmem/agent-knowledge）逐一实测 5 关 + RAGFlow/Dify 查证；产出 5 份验证报告 + 5 份独立对抗性审计（审计员重跑复现）；汇总《技术验证报告》=主选 deep-memory、备选 mem0、否掉 BYO/RAGFlow（本机跑不动）；全程只在临时目录测试，正式库正文零改动 | 临时目录 brain-verify/（reports/ 5 验证 + 5 audit + 日志） |
| 2026-08-03 | 技术验证员 | 写技术验证员交接文档（阶段 0 完成版）：融合原验证员提示词 + 蓝图 + 主大脑提示词 + 主 AI 综合交接 + 阶段 0 全部成果 + 用户/主 AI 拍板方向 + 边界 + 重点细节（测试隔离/git 误提交/HF 镜像/诚实纪律/双格式） | .claude/handoffs/2026-08-03-brain-window-verifier.md、ai-worklog.md |
| 2026-08-03 | 技术验证员 | 《AI 大脑技术验证报告》入库+部署：按主 AI 新版提示词（报告=正式内容页）双格式入库思考收件箱，deploy.js 上线（pages 33→34，--expect 验证通过）；出 registry/nav 登记建议清单给主大脑（临时目录） | knowledge-base/domains/思考收件箱/brain-tech-verification.html、markdown/思考收件箱/brain-tech-verification.md、CHANGELOG.md、临时目录 registry-registration-suggestions.md |
| 2026-08-03 | 技术验证员 | 独立对抗性审核主大脑的检索大脑接入（阶段 1）：对比 diff 证实主大脑实际只改 kb_reader.py（5 项全正确），onnx_models.py 未改（分批是原版自带，登记不实）；独立复跑 4 组真实问句（3 组精确/相关命中，婴童配方问句偏弱）；分批一致性 batch1 vs batch5 最大差异 0.0e+00（属实）；索引 286 条真实存在；出审核报告（功能可采信，登记需修正 1 处） | 临时目录 brain-verify/reports/audit-retrieval-integration.md、D:\ai\deep-memory\ |
| 2026-08-03 | 主大脑 | 核实并修正登记：技术验证员复核 onnx_models.py 正确——D盘落地区与原仓库 md5 完全一致（c93fb1b3...），17 个 py 仅 kb_reader.py 不同；分批能力是 deep-memory 原版自带，主大脑之前"改了 onnx_models.py 分批"的登记不实（实际是利用原版分批能力，仅 kb_reader.py 为真实改动）。已修正登记避免误导 | ai-worklog html+md、CHANGELOG.md、kb_reader.py（真实改动） |
| 2026-08-03 | 主大脑 | 修复检索大脑 kb_reader.py 切段 bug（主 AI 审批通过后执行）：①## 章节引言独立成条目（split_entries 改逐行扫描，修复全库 37640 字符向量端漏检）②代码块内 ### 不误判切段（fenced code block 剔除）③跨盘 relpath 加子目录前缀（消除同名 ID 冲突隐患）。单测 10 项全过；重建索引（286→488 条目，60.8s）；复跑 4 组回归全命中（婴童无泪修复前未命中预期页→修复后 formulation#无泪原理 + 甜菜碱分类含 MAB 无泪 + 六B 婴童方案） | kb_reader.py、chroma_hybrid_db（重建）、test_kb_reader.py（10 项过）、task-board html+md |
| 2026-08-03 | 智能体 AI | D 盘迁移交接：生成智能体 AI D 盘专属交接（2026-08-03-agent-d-handover.md，融合全部历史 + D 盘运作方式 + 角色升级主 AI 审核辅助）+ D 盘新提示词（查库优先/mem0 主入口/10 条铁律/边界速查/命令） | .claude/handoffs/2026-08-03-agent-d-handover.md、ai-worklog.md |
| 2026-08-03 | 技术验证员 | 按现状更新验证员提示词（brain-window-verifier.md）：顶部加"当前状态"段（阶段0/1已完成+技术路线+验证员角色），开工第一步指向 v6 交接和检索大脑 README 不重复验证，已知坑补 git 误提交/HF 镜像/检索大脑使用注意，补全"做完以后"；主大脑 v6 交接补记"技术验证员独立复核检索大脑接入" | .claude/handoffs/brain-window-verifier.md、2026-08-03-agent-brain-v6.md、ai-worklog.md |
| 2026-08-03 | 主大脑 | 按用户指示全做：①任务板第一项标 ✅（tools/检索接入脚本已通过改kb_reader源码落地）②deploy.js bug 行同步进HTML ③待核实清单盘点（子代理：md 10页58处，业务数据51处，集中 market.md 32处）④M2检索回归（3命中，婴童无泪命中formulation#无泪原理未命中预期apg） | team-task-board html+md、CHANGELOG.md |
| 2026-08-03 | 主大脑 | 写交接文档 v6（2026-08-03-agent-brain-v6.md）：融合 v5 全部内容 + 本轮成果（移动端验证通过/待核实清单盘点/代码独立复核/deploy.js 修复/kb_reader 修复）；用户反馈"整体风格变了，交接要遵循以前那种"→ 按 v3/v4 完整自包含风格重写（14 节，含大脑方向/阶段0/1 详述/边界速查/已知坑/交接链）；brain-window-main.md 当前阶段推进到"阶段1完成+阶段2准备" | .claude/handoffs/2026-08-03-agent-brain-v6.md、brain-window-main.md、CHANGELOG.md |
| 2026-08-03 | 主大脑 | 验证 Trae 移动端写本地共享文件夹：用户从移动端发"测试实时同步"→ 根目录新建 测试实时同步.txt 落盘成功（秒级，fs.watch rename 事件可捕获）→ 阶段 4 接入层物理前提成立；已登记广播 | 根目录 测试实时同步.txt、mechanism-updates、ai-worklog |
| 2026-08-03 | 闲聊 AI | 用户问"现在存在的机制还有必要吗"→ 盘点现行机制分级建议（🟢真必要/🟡该合并/🔴存疑），沉淀到收件箱 [待探讨]（供用户转主 AI/智能体 AI 探讨）；同步验证检索大脑（TC-MAB 命中）+ 记忆大脑写读闭环；部署上线 | inbox html+md、CHANGELOG.md、D:\ai\deep-memory、D:\ai\brain-memory |
| 2026-08-03 | 技术验证员 | 全面检查主大脑工作：C→D 迁移完整（D 盘权威）；--layer 分层过滤修复独立复测通过（mid/long 正确区分）；记忆库 dedup 后 562 唯一 0 重复 100% 带 source；全量入库合理；新增脚本 dedup/mem_chat_save 审核通过。3 处纰漏：①条数写死（"~418"实际 562，建议实时查）②分层失衡（long 548/mid 14，记忆库未真正用起来）③我窗口在 C 盘启动（建议 D 盘） | 临时目录 brain-verify/reports/、D:\ai\brain-memory、D:\ai\学习公司产品知识树 |
| 2026-08-03 | 技术验证员 | 全流程端到端验证四层大脑：M5 接入层（--status 存活 + 真投递→秒级感知→--reply 回写）✅ / M3 记忆层（mem_search"铁律 防失忆"0.82 召回）✅ / M4 进化层（evolve_scan --status + --journal 健康）✅ / **M2 检索层 ❌**：search.py 默认工作区=~/.deep-memory（C 盘）→ 实搜报错 No documents found；D 盘真实索引 09:00 后未增量同步（README"待办 update_db.py"未落地）→ 搜不到今天新增。**登记任务板 🆕（P0，待主大脑/主 AI 修，涉及 tools/ 须审批）**：①工作区指 D 盘（DEEP_MEMORY_WORKSPACE）②重跑 update_db.py 增量同步。测试残留全清理（投递/回复文件 + 信箱 2 条） | team-task-board html+md（登记检索层问题）、D:\ai\deep-memory（M2 检索层验证）、ai-worklog.md |
| 2026-08-03 | 技术验证员 | **M4 对话存档提炼真实负载测试（认领任务板"对话存档提炼"并跑通）**：走完整 M4 闭环——scan 列 3 条对话存档候选 → draft 生成 skill 草稿（草稿区，含 PROVENANCE+DISTILLED_TEXT）→ apply 真实提炼 chat-main 存档 → long 层（source=refined-mid-2026-08-03，独立验证 score 0.78）→ rollback 回滚可逆（long 删、mid 恢复）→ 全链验证通过。证明"提炼"能力真实可用可回滚。测试残留全清理（验证草稿已删）。任务板该单标 ✅ | team-task-board html+md（认领+标完成）、D:\ai\brain-memory（M4 提炼闭环验证）、ai-worklog.md |
| 2026-08-03 | 技术验证员 | 写技术验证员交接文档 D 盘版（2026-08-03-brain-window-verifier-d.md）：融合全部工作历史（阶段0选型+阶段1审检索+阶段2审记忆+全面检查）+ 审核方法论（五步法/diff原始版本/独立工作区复跑/审核闭环）+ 当前状态 + 下一步 + 交接提示词（含 D 盘环境/记忆库主入口） | .claude/handoffs/2026-08-03-brain-window-verifier-d.md、ai-worklog.md |
| 2026-08-03 | 主 AI | 新建"测试员 AI"（第 6 个主窗口 AI）：专属话术写入 session-prompt 第十节（职责：质量保障/测试，只测不修，发现问题登记任务板）+ 团队名单登记（ai-worklog 六个主窗口 AI）+ 机制更新广播 | 会话记录/session-prompt html+md、思考收件箱/ai-worklog html+md、mechanism-updates html+md |

| 2026-08-03 | 测试员 AI | 多轮对话全流程实测（M5）：两轮投递发给 main（CAB-35 vs TF 选型 + 增稠调法追问），主大脑自动接单翻库回答带出处。发现3问题：claude CLI不可用、不触发mem_chat_save存档、tester未注册AGENTS | 根目录、messagebox/index.json、watch-log.log、mem_config.py |
| 2026-08-03 | 测试员 AI | 接入层 M5 投递链路实测：根目录新建测试文件→brain_watch 秒级感知（20:49:39 事件→20:49:40 登记→自动派发）→信箱登记成功。三环节通过，测试文件已清理 | 根目录、messagebox/index.json、watch-log.log |
| 2026-08-03 | 主大脑 | **工具与技能全员共享（用户拍板"改成都能用"）**：①.trae/skills/ 20 技能镜像进 .claude/skills/（Claude Code + Trae 两边都认）②tools/py.cmd 封装绕开 python 中文乱码③shared-tools-index 共享索引页（11 工具+8 技能+python 规范）+ registry 登记 + 话术指向 + 机制广播，部署上线 --expect 命中 | .claude/skills/（镜像）、tools/py.cmd（新）、会话记录/shared-tools-index html+md（新）、registry.json、session-prompt-d.md、mechanism-updates html+md |
| 2026-08-03 | 主大脑 | 核实"任务板 HTML 孤儿 td"误报 + B 方案部署上线（用户拍板） | 技术验证员报 team-task-board.html L78-80 孤儿 td 碎片，经脚本结构性校验（tr/td 配对）+ 线上拉取复核，**D 盘 + 线上均为完整结构**（tr 21/21、td 105/105），误报基于压缩前旧快照；已按用户 B 方案部署 team-task-board.html 上线 + 线上验证干净；mobile.html 409 为主 AI 并行部署冲突（非错误，重跑即可） | knowledge-base/domains/思考收件箱/team-task-board.html（部署）、ai-worklog.md |
登记规则：
- **谁做谁记**：每个 AI 完成一件有留痕价值的事（建页/改内容/部署/修复），顺手在此追加一行
- **必带名字**：AI 列写自己的名字（见上面名单），让其他 AI 知道是谁做的
- **写清做什么**：一句话说清产出，涉及位置写到页面/文件级
- **子代理由主 AI 代记**：并行子代理干完活，主 AI 统一登记

## 相关页面

- 团队任务板：team-task-board.html（该做什么：发现问题登记、认领负责）
- 知识库健康度盘点：kb-health-checklist.html（定期体检清单，问题进任务板）
- 新会话开场话术：session-prompt.html（各 AI 的开场与职责边界）
- 思考收件箱：inbox.html（想法缓冲区，本页所属域）
