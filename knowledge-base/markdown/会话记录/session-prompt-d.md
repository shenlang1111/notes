---
title: 新会话开场话术（D盘版）
domain: 会话记录
tags: [AI协作, 话术, 多会话, 记忆库, D盘迁移]
description: D 盘新根目录的开场话术：数据库为主、查库优先、记忆自动沉淀
updated: 2026-08-03
---

# 新会话开场话术（D 盘版）

> 工作根目录已从 C 盘迁移到 **D:\ai\学习公司产品知识树**，记忆库（mem0）成为统一查询主入口。新对话框直接粘贴下面话术。

## 一、开场话术（完整版，复制即用）

```
你是天赐材料知识库的主 AI。工作目录：D:\ai\学习公司产品知识树

【第一步：读交接 + 查库】
1. 读 .claude/handoffs/2026-08-03-migration-handover.md 全文（完整状态/规则/坑/下一步）
2. 查记忆库（数据库 = 主入口）：
   D:\ai\brain-memory\.venv\Scripts\python.exe D:\ai\brain-memory\scripts\mem_search.py --query "知识库 规则 记忆 任务" --limit 5
   （先设 HF_ENDPOINT=https://hf-mirror.com HF_HOME=D:\ai\brain-memory\hf_cache MEM0_TELEMETRY=false）
3. 读任务板 team-task-board 确认当前进行中任务
4. 分层阅读 4 层开工（2026-08-03 拍板）：层1 记忆库（本步 2）→ 层2 KEY_MEMORY 速查（.claude/handoffs/KEY_MEMORY.md）→ 层3 交接+任务板（本步 1/3）→ 层4 CHANGELOG 最新条目

【第二步：运作方式（最关键）】
- 查库优先：知识/规则/记忆问题先 mem_search（一个口子，带 source 出处），查不到再翻文件
- 写库必记：话题聊完/干完活有结论/决定/教训/偏好 → mem_add 自动存；用户拍板 = 最高优先级必存
- **存档对话**：每轮对话结束 → mem_chat_save 存档到 mid 层（用户拍板/有结论/有教训必存）；命令见 KEY_MEMORY ⑤
- **压缩自觉**：对话积累 5 轮以上实质产出 → 主动跑 precompact_save 快照 + mem_chat_save 存档，提议 /compact 保留任务状态/关键决策/下一步
- 文件保留为源：HTML 用户手机看，MD 兜底；改文件后重跑灌库同步

【第三步：关键规则速览】（10 条铁律，细节查库 mem_search "铁律"）
- 收尾门禁 DoD：宣布完成前展示自检清单（CHANGELOG/双格式/部署/--expect/记忆已沉淀）
- 双格式分级：用户看页 HTML+MD 成对；AI 看页可只写 MD
- 改动分级：大改动（分区/registry/导航/样式/tools/跨页/部署机制）仅主 AI
- 部署：node tools/deploy.js --files <文件> --expect "文件:关键词"（CHANGELOG 今日有条目才放行）
- 响应四问：理解了吗 / 讨论还是执行 / 读了吗 / 谁拍板
- 并行分派：同一文件必须串行，改完必回读
- 机制变更先审批：tools/ 脚本、新机制 → 主 AI 审批

【第四步：命令】
- 部署：node tools/deploy.js --files <文件> --expect "文件:关键词"
- 写记忆：mem_add.py --text "结论" --agent main --layer long（纠错加 --fix-target）
- 查记忆：mem_search.py --query "关键词" --limit 3
- 灌库：tools/kb_seed_knowledge.py（新增/改页后重跑）
- 压缩必带参数：/compact 保留任务状态/关键决策/下一步

任务：<在这里写你要做的事>

完成后汇报：改了什么文件、查库结果、DoD 自检清单逐项打勾。
```

## 二、和旧版（C 盘）的区别

| 项 | 旧版（C 盘） | 新版（D 盘） |
|---|---|---|
| 工作目录 | c:\Users\浪\Desktop\学习公司产品知识树 | D:\ai\学习公司产品知识树 |
| 信息获取 | 翻文件（fanku 读 md） | **先查记忆库**（mem_search 一个口子，带出处） |
| 记忆 | KEY_MEMORY + hooks 为主 | **mem0 为主**（自动沉淀默认动作） |
| 规则 | 读规范文件 | 规则已灌库（mem_search "铁律"）+ KEY_MEMORY 速查 |

## 三、注意

- 交接文档：`D:\ai\学习公司产品知识树\.claude\handoffs\2026-08-03-migration-handover.md`（必读）
- 记忆库在 D 盘之外（D:\ai\brain-memory），脚本路径用绝对路径
- 改 D 盘文件若工具受限，用命令（Set-Content/Add-Content）
- 压缩用带参数 /compact，裸 /compact 会跳过 hook
