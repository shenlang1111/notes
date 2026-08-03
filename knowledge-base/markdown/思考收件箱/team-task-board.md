---
title: 团队任务板
domain: 思考收件箱
tags: [AI协作, 任务板, 任务管理, 团队协作]
description: AI 团队共享任务板：谁发现问题谁登记，谁认领谁负责，完成即更新状态。翻库/工作发现该做的事登记于此，有记录有去向。
updated: 2026-08-03
---

# 团队任务板

> 任务中转站——你或任何 AI 发现"该做但超出当前职责"的事，登记在这里；有人认领就推进，完成就标记。

## 一、这是什么

- **发现问题 → 登记**：AI 翻库/工作中发现库有错、有缺、有该做的事，登记任务（说清：页面+问题+建议）。不越权直接改，但保证不丢。
- **认领 → 负责**：认领即负责，谁认领谁跟进。小改动认领后自理并部署；大改动认领后找主 agent 执行。
- **完成 → 标记**：完成后更新状态 ✅ + 记录完成日期，按规范部署上线。历史任务保留 1 个月后清理。

## 二、当前任务

| 状态 | 任务 | 登记人 | 认领人 | 日期 |
|---|---|---|---|---|
| ✅ 已解决 | **全项目体检发现 2 个 P0 问题（技术验证员 2026-08-03，主 AI 核实已解决）**：①**页数三处不一致**——KEY_MEMORY ④ 说"7 域 34 页"、registry.json 实际 35 页、磁盘 md 实际 36 页；差的那页=session-prompt-d.md（磁盘有、registry 没登记）。建议：统一数字（35/36）+ registry 补登记 session-prompt-d ②**heartbeat 计划任务未真注册**——mechanism-updates 登记"计划任务 TinciBrainHeartbeat 每 20 分钟"，但 schtasks /Query 全量 399 个任务查不到 brain/heartbeat/Tinci；brain_heartbeat.js --status 上次心跳 21:10 是手动跑过的痕迹，非计划任务自动。若定时任务没真注册，心跳是"死"的（watch 死了不会自动拉起、索引不会自动同步）。建议：确认并补注册计划任务 | 技术验证员 | 待主大脑/主 AI | 2026-08-03 |
| ✅ 核实：①页数已修（KEY_MEMORY 34→35，35 内容页全成对；session-prompt-d 是 MD-only 话术页合规豁免，非不一致）②heartbeat 计划任务真实注册（PowerShell Ready + LastRunTime 21:10 exit 0 + NextRun 21:30，schtasks 查无是 schtasks 可见性问题非任务缺失） | 主 AI | 主 AI | 2026-08-03 |
| ✅ 已完成 | **自动接单打磨（自主运行机制遗留 2 项）**——①对"发给非 main agent"的消息路由不完善（投"发给：主大脑"被 headless 当普通消息接，未正确路由到对应 AI）→ 修复：非 main 消息不标 done、不抢活，原样保留信箱供目标 AI 接单；原文件被删时用信箱 text 重建占位文件 ②原投递文件被删时收尾不完整（标 done 但没生成回复文件）→ 修复：路由跳过时重建占位文件，确保目标 AI 可接单 | 主 AI | 主 AI | 2026-08-03 |
| ✅ 已落地 | **M4 进化大脑 skill 草稿审批 ✅ 通过已落盘**——evolve_scan.js 生成的草稿 `记忆库去重与灌库` 经主 AI 结合 skill-creator 人审通过（description 触发词/6 步骤/边界齐全），已落盘 `.trae/skills/记忆库去重与灌库/SKILL.md`。M4 进化机制完整闭环：工具（evolve_scan.js + mem_refine.py）+ 规范十·一 + 试点提炼（2 条 chat-brain 对话存档→1 条 long 经验）+ 代码审查修复（回滚排序/防重复提炼/失败留痕）+ skill 审批落盘。四层大脑全部达成 | 主 AI | 主 AI | 2026-08-03 |
| ✅ 已完成 | **阶段 4 接入大脑 M5（brain_watch 实时监听 + 消息信箱）**——**主 AI 审批（2026-08-03，工具类变更，机制变更先审批铁律）**：tools/ 新建 brain_watch.js + brain_msg.js 经主 AI 审批同意实施（用户口头拍板 + 主 AI 确认，程序上合规）。①brain_watch.js 常驻 fs.watch 监听 D 盘知识库根（含子目录，排除 node_modules/.git/.trae*/.claude/tools/构建产物），秒级感知新文件不靠轮询（蓝图 M5 验收标准）②投递协议（用户拍板）：根目录第一层新建 .md/.txt 即投递消息，watch 自动登记信箱（status=new）；子目录正式库改动只记 watch-log 不当消息。**消息协议字段（蓝图第1层：谁发/发给谁/内容/状态）**：from=user / to=解析消息头"发给："缺省 main / text=内容预览 / status=new/done/replied ③信箱命令 brain_msg.js：--list 看待处理 / --done 标记已处理 / --peek 预览 / --status 速览 / **--reply 结果回写**（大脑干完活把结果写回根目录"回复-<原名>.md"，Trae 端可见=结果出得去）④信箱索引存 D:\ai\brain-memory\messagebox\（监听范围外防自触发死循环）⑤session_start_report.js 开窗自动带出【接入层信箱】待处理条数。**实测验收全链路通**：投递→秒级登记→--list/--peek/--done/--reply 全通过。**智能体 AI 审核意见已处理**（协议补全 from/to/content + 结果回写 --reply 已落地）。M5 接入层达成，大脑闭环入口打通 | 主大脑 | 主大脑 | 2026-08-03 |
| ✅ 已完成 | **检索大脑工作区路径错位（M2 检索层）——技术验证员发现 + 主大脑修复 ✅ 2026-08-03**：①README `DEEP_MEMORY_KB_SOURCE` 仍指 C 盘旧路径 → 已改 D 盘工作根 `D:\ai\学习公司产品知识树\knowledge-base\markdown`（用户确认工作盘已迁 D）②D 盘索引自 09:00 后未增量同步（旧）→ 用 D 盘源 `update_db.py --rebuild` 重建索引（514 条重算 + 移除 494 条孤立旧向量）③回归 4 组真实问句全命中（TC-MAB/TC-SHD/CAB+AES/婴童无泪，rerank 0.95-0.99），今日新增内容（M5 广播等）已入索引④额外发现+清理：search.py 默认工作区 = ~/.deep-memory（C 盘），忘设 DEEP_MEMORY_WORKSPACE 会自动在 C 盘建索引——已清理副作用索引，README 补"索引源必须指 D 盘"注意。**复检（2026-08-03）揪出 heartbeat 索引源残留 C 盘**：brain_heartbeat.js KB_SOURCE 硬编码 C 盘旧路径（心跳每 20 分钟把 D 盘索引重写回 C 盘旧数据）→ 已修复 D 盘 + 重建索引 + 纯向量回归通过。**M2 检索大脑恢复可用** | 技术验证员 | 主大脑 | 2026-08-03 |
| ✅ 已完成 | **对话存档提炼阶段（技术验证员真实负载测试 2026-08-03）**——M4 提炼闭环真实跑通：①scan 列 3 条对话存档候选（chat-main/verifier/brain）②draft 生成 skill 草稿（草稿区 ws/skill-drafts/，含 PROVENANCE+DISTILLED_TEXT 溯源）③apply 真实提炼 chat-main 存档 → long 层（source=refined-mid-2026-08-03，mem_search 独立验证 score 0.78）④rollback 回滚可逆（long 删、mid 恢复）→ 全链验证通过。说明"提炼"能力真实可用可回滚。原"待主 AI 排期"已由技术验证员认领完成 | 技术验证员 | 技术验证员 | 2026-08-03 |
| ✅ 已完成 | **分层阅读 4 层验收实测——2026-08-03 用户压缩实测验收通过**：主 AI 压缩后按 4 层流程恢复（层1 mem_search 命中决策记忆 score 0.86 → 层2 KEY_MEMORY → 层3 交接+任务板 → 层4 CHANGELOG），30 秒内报出完整状态，恢复链路验证成功；机制已广播（压缩续命模式）。主 AI 代认领收尾 | 主 AI | 主 AI | 2026-08-03 |
| ✅ 已完成 | **分层阅读 4 层开工落地**（闲聊 AI 提出、用户拍板 2026-08-03：4 层 = 记忆库/KEY_MEMORY/交接+任务板/CHANGELOG；状态保鲜 = 改动后重灌库）——主 AI 已落地：规范第十节"分层阅读 4 层开工"（取代压缩后恢复三步）+ 五-1 会话档案区三边界拍板 + KEY_MEMORY 加分层阅读说明 + 灌库脚本 kb_seed_rules.py --key-memory（删旧写新）+ 开窗报告 session_start_report.js 加层4 CHANGELOG | 闲聊 AI | 主 AI | 2026-08-03 |
| ✅ 已完成 | **deploy.js --expect 验证误报 bug**（tools/ 改动，铁律 12）——**主 AI 审批通过 + 已修复**：匹配前双方统一去空白（tNorm.includes(kwNorm)）+ 区分 404 与关键词不匹配。修复已部署上线 ✅ | 主大脑 | 主 AI | 2026-08-03 |
| ✅ 已完成 | 修复检索大脑 kb_reader.py 切段 bug（D:\ai\deep-memory）——**主 AI 审批通过 + 已修复上线**：①## 章节引言独立成条目（逐行扫描，不再被吸进前一个 ###）②代码块内 ### 不误判切段（fenced code block 剔除）③跨盘 relpath 加子目录前缀（消除同名 ID 冲突隐患）。修复后重建索引（286→488 条目）+ 复跑 4 组回归全命中（TC-MAB/TC-SHD/CAB+AES/婴童无泪，婴童无泪修复前未命中预期页→修复后大幅改善）✅ | 主大脑 | 主大脑 | 2026-08-03 |
| ✅ 已完成 | tools/ 建"检索接入脚本"（deep-memory 接入，A 方案）——**主 AI 审批通过（2026-08-03 用户拍板）**：允许在 tools/ 建脚本（只读转换/索引）；**不动库结构**，采用备选方案（改 kb_reader.py 支持递归子目录）✅ 已落地：检索大脑正式接入（D:\ai\deep-memory），4 组真实问句全命中，M2 达成 | 主大脑 | 主大脑 | 2026-08-03 |
| ✅ 已完成 | **阶段 2 记忆大脑落地**（tools/ 性质，铁律 12）——用 mem0 建记忆底座（`D:\ai\brain-memory`）：分层记忆模型已定稿（metadata 打标+作用域，非 memory_type）、技术验证通过（infer=False 免 LLM / 中文命中 0.73 / 跨进程持久化 / 纠错不再犯）、方案定稿 `D:\ai\brain-phase2-verify\phase2-design-v1.md`。**✅ 用户已直接授权（2026-08-03）+ 主 AI 已确认**：已落地完成（建环境 + 写/读/导出脚本 + 灌库 + 验收）——**M3 里程碑达成**（跨会话不丢 + 纠正不再犯），广播 mechanism-updates + 登记 ai-worklog | 主大脑 | 主大脑 | 2026-08-03 |
| 🔧 进行中 | 数据来源补齐：全库 60+ 处"待核实"数值——**👤 用户自行补充（2026-08-03 用户指示：AI 不用动）**：数据由用户提供后逐条补来源或降级。已盘点分布：数据类 51 处（market.md 32 / tinci-market-sales.md 10 / tinci-surfactant-details.md 5 / 其他 4），描述性 9 处 | 智能体搭建 AI | 用户 | 2026-08-03 |
| ✅ 已完成 | 内容硬伤-跨页口径统一（健康度盘点 2026-08-03 发现）——**智能体 AI 统一口径 + 全库修复 ✅**：①C-FA 三种化学归属并存（牛磺酸/肌氨酸/谷氨酸）→统一=椰油酰肌氨酸钠（依据 synthesis 工艺页+formulation，改 overview/details/anionic）②氧化胺归类三页冲突→统一"结构非离子、功能按两性讨论"（amphoteric 标题正文+fundamentals 分类表+overview 注）③咪唑啉环化温度 200-250 vs 180-220→统一 200-250°C（参考值待核实）④HLB W/O 3-8→3-6（overview 对齐）⑤TC-MAB 中文名统一"月桂酰两性基乙酸钠"⑥NaCl 行业均值统一 3-5%（amphoteric-summary/formulation 对齐）；**主 AI 2026-08-03 复核补齐 4 处遗漏**（overview Napure 分组加肌氨酸 / amphoteric-summary 氧化胺口径 / surfactant-details NaCl 3-5% / finechem-additives HLB 3-6，MD+HTML 成对）| 智能体 AI | 智能体 AI | 2026-08-03 |
| ✅ 已完成 | 内容硬伤-单页可修（健康度盘点 2026-08-03 发现）——**智能体 AI 全部修复 ✅**：①synthesis 章节重排（8.3 归位 8.4 前）+LAB 双义加注+8.5.3 子节编号 ②market 16.1 移入章内+第二梯队降序（天赐5.1→皇马6→赞宇8）③overview"形态与形态"笔误→"字母与含义"+牌号数统一（两性 29 个，标注目录页）④fundamentals CPP 表概念重叠修正（1/2<P<1 截顶锥形/P≈1 圆柱形）+1.5 系列论证重复保留待后续精简 ⑤formulation 页内用量统一（AES 12-18%/CAB 3-8%/沐浴露 CAB 4-8%/甘氨酸钾 20-30%）+pH 两套注适用范围+NaCl 3-5%+12/14 章重复评估为互补角度不删 | 智能体 AI | 智能体 AI | 2026-08-03 |
| ✅ 已完成 | session-prompt-d.md 双格式豁免——**用户 2026-08-03 授权直接做，已修复 ✅**：deploy.js MD_ONLY_EXEMPT 加 session-prompt-d.md（AI 看页豁免，与 ai-worklog 同类），双格式告警消除 | 智能体 AI | 智能体 AI | 2026-08-03 |
| ✅ 已完成 | 精细化工页（finechem-engineering）修复：章节编号冲突（9.4/9.5→9.10/9.11）、渗透压机理错误（多元醇膜结构/低盐逻辑）、来源区块已有、实体残留清理；拆分已在知识库完成 | 智能体 AI | 智能体 AI | 2026-08-02 |
| ✅ 已完成 | 天赐学习手册（tinci-surfactant-guide）修复：市占率已统一（31.8%）、命名对齐（TC-MAB INCI 月桂酰）、氨基酸误归两性修正、章节重排/拆分已在知识库完成 | 智能体 AI | 智能体 AI | 2026-08-02 |
| ✅ 已完成 | 两性表活目录（tinci-amphoteric-summary）修复：牌号统计（23→29）✅、MD内容错位✅、TC-MAB INCI（Lauro-）✅、RSPO数量✅、与 amphoteric 页冲突对齐✅ | 智能体 AI | 智能体 AI | 2026-08-03 |
| ✅ 已完成 | 智能体方向移交 Claude Code（用户已装好，取其编程能力强、专注智能体实现）：确认推翻存档 LLM 用 DeepSeek 决策 ✅、Claude Code 专属提示词已建（session-prompt 十~十二节 + brain-window 三件套）✅、存档决策标注修正 ✅ | 闲聊 AI | 智能体 AI | 2026-08-02 |

## 三、运作规则

- **登记触发**：AI 翻库/工作发现"该修但不是我职责范围/超出小改动"→ 登记任务板，不静默绕过
- **用户入口**：你说"帮我做 X"——可口头直接做，也可进板追踪（长任务/跨会话建议进板）
- **认领边界**：小改动认领即自理（含部署）；分区/registry 结构/导航/样式/tools/批量 = 大改动，登记后找主 agent
- **状态流转**：🆕 待认领 → 🔧 进行中 → ✅ 已完成（完成需 DoD 自检通过）
- **清理**：已完成任务保留 1 个月后归档

## 相关页面

- 思考收件箱：inbox.html（本板所属域）
- 知识库健康度盘点：kb-health-checklist.html（定期体检，发现问题进任务板）
- 智能体设计存档：inbox-20260802-agent-design.html（团队愿景与分工）
