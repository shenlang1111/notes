---
title: 脚本·技能·Hook 使用规范
domain: 会话记录
tags: [AI协作, 工具, 技能, Hook, 全员共享, 使用规范]
description: 全项目脚本（tools/ 23 个）+ 技能（skills/ 20 个）+ Hook（3 类）统一使用规范——谁用、怎么用、何时自动触发。脚本/skill/hook 由主 AI 统一管理，其他 AI 可直接调用，改需审批。
updated: 2026-08-04
---

# 脚本·技能·Hook 使用规范

> **2026-08-03 用户拍板**：脚本/skill/hook **统一由主 AI 管理**；本页是全项目使用规范总入口——谁要用工具/技能，先读本页找到调用方式。

## 一、管理权与使用权（先看）

1. **管理权在主 AI**：脚本（tools/）/ 技能（skills/）/ Hook（.claude/settings.json）统一由主 AI 管理——**新增/修改/删除需报主 AI 审批**（铁律 8），**调用无需审批**
2. **使用权全员共享**：所有 AI 可直接调用，不专属任何窗口；技能双目录镜像（`.claude/skills/` = `.trae/skills/`，两边都调得到）
3. **Python 走封装**：系统 python 因 PATH 含中文乱码失效，一律用 `py.cmd`（自动指向 venv）
4. **用前先读**：任何技能调用前先 Read 对应 SKILL.md 全文

## 二、脚本使用规范（tools/ 23 个）

### 日常核心（5）

| 脚本 | 用途 | 怎么用 |
|---|---|---|
| `deploy.js` | 一键部署上线（成对校验→重建 mobile→串行上传→构建→验证） | `node tools/deploy.js --files <清单> --expect "文件:关键词"` |
| `build_mobile.js` | 重新生成手机版 | `node tools/build_mobile.js`（deploy 已自动绑定） |
| `py.cmd` | Python 封装（绕开中文乱码） | `cmd //c tools\py.cmd <脚本>`（先 cd 再相对路径） |
| `html2md-new.js` | HTML→Markdown（双格式生成，过滤 hero/nav/footer） | `node tools/html2md-new.js` |
| `rule_check.js` | 规则工程化收尾自检（CHANGELOG/双格式/registry/记忆提醒） | `node tools/rule_check.js`（DoD 前跑） |

### 大脑体系（13）

| 脚本 | 用途 | 怎么用 |
|---|---|---|
| `session_start_report.js` | 开窗自动报告（身份/任务/技能/信箱） | hook 自动触发（SessionStart） |
| `precompact_save.js` | 压缩前快照落盘 KEY_MEMORY⑨ | hook 自动触发；手动 `node tools/precompact_save.js` |
| `compact_scheduler.js` | 压缩条件自动检测（已退二线，裸 /compact 替代） | `--rounds N` 检测 / `--force` 强制 / `--quiet` 静默 |
| `chat_autosave.js` | 对话摘要自动存档 | hook 自动触发（SessionEnd） |
| `brain_watch.js` | 接入层实时监听（秒级感知新文件） | `--daemon` 后台 / `--once` 快照 / `--status` 存活 |
| `brain_msg.js` | 消息信箱 | `--list` / `--peek` / `--done` / `--status` / `--reply` |
| `brain_heartbeat.js` | 自主运行心跳（watch 存活/M2 同步/M3 提醒/M5 派发） | `--once` 跑一轮 / `--status` 速览（计划任务每 20 分钟） |
| `brain_dispatch.js` | 自动接单执行器（headless 全权接单） | 由 watch/心跳自动派发 |
| `evolve_scan.js` | 进化层：mid→long 提炼 + skill 草稿 | `--status` / `--scan` / `--draft` / `--apply` / `--rollback` |
| `evolve_auto.js` | 自动提炼编排（挂心跳，scan→draft→apply→分类） | `--status` / `--dry-run` / `--run` / `--min N` |
| `kb_seed_rules.py` | 规则区灌库（规范/KEY_MEMORY→mem0） | `py.cmd tools\kb_seed_rules.py --fix` / `--key-memory` |
| `kb_seed_knowledge.py` | 知识区灌库（知识页→mem0） | `py.cmd tools\kb_seed_knowledge.py --domain <域> --reset` |
| `check_compress.js` | 旧版压缩检测 | 已废弃（被 compact_scheduler 取代），备用 |

### 半月报（2）

| 脚本 | 用途 | 怎么用 |
|---|---|---|
| `build_半月报.py` | 生成半月报 Excel | `py.cmd tools\build_半月报.py` |
| `fill_半月报.js` | 填充实训半月报模板 | `node tools/fill_半月报.js` |

### 启动/调试（3）

| 脚本 | 用途 | 怎么用 |
|---|---|---|
| `brain_watch_start.cmd` | 开机自启 brain_watch --daemon | 启动文件夹自动运行 |
| `_idx_check.js` | 查看信箱最近消息状态 | `node tools/_idx_check.js`（调试） |
| `_quick_reply_test.js` | 快速通道检索实测 | 调试用 |

## 三、技能使用规范（skills/ 20 个，双目录镜像）

> 调用前先 Read 对应 SKILL.md；技能只是能力增强，不替代规则（双格式/改动分级/DoD 照常）。

| 技能 | 用途 | 谁常用 |
|---|---|---|
| `fanku` | 翻库检索纪律（知识问题先查库，带出处不编造） | 全员（必读） |
| `skill-creator` | 新建 skill 的方法论 | 主 AI |
| `unified-memory` | 统一记忆（mem0+deep-memory 混合） | 全员 |
| `ck` | 持久化项目记忆与知识检索 | 按需 |
| `记忆库去重与灌库` | mem0 去重 + 灌库 | 主大脑/主 AI |
| `身份与技能装备真相` | 压缩后先确认身份/装备 | 主大脑/验证员 |
| `自动接单-主大脑域` | 自动接单快速通道经验 | 主大脑 |
| `pdf` / `docx` / `xlsx` | 文档/表格处理 | 按需 |
| `brainstorming` | 头脑风暴 / 需求讨论 | 按需 |
| `firecrawl` | 网页抓取 / 搜索 | 按需 |
| `obsidian` | Obsidian 笔记库集成 | 按需 |
| `dispatching-parallel-agents` | 并行子代理分派 | 主 AI |
| `writing-plans` / `executing-plans` | 先写方案再执行 | 大任务 |
| `session-handoff` | 会话交接文档生成 | 交接时 |
| `autonomous-agent-harness` | 自主 Agent 运行框架 | 按需 |
| `brand-voice` | 品牌语调 / 风格控制 | 按需 |
| `agent-architecture-audit` | 架构审核与诊断 | 主 AI |

## 四、Hook 使用规范（.claude/settings.json，3 类自动触发）

| Hook | 触发时机 | 执行 | 作用 |
|---|---|---|---|
| SessionStart | 打开/恢复会话 | `session_start_report.js` | 自动报告身份/任务板/技能/信箱 + mem_search 回忆 |
| PreCompact | 压缩前 | `precompact_save.js` | 状态快照落盘 KEY_MEMORY⑨ |
| SessionEnd | 会话结束 | `precompact_save.js` + `compact_scheduler.js --quiet` + `chat_autosave.js` | 快照 + 压缩条件检测 + 对话摘要存档 |

> Hook 是自动机制，不需要手动调；**改 hook 配置 = 机制变更，报主 AI 审批**。

## 五、Python 调用规范（重要）

- **系统 `python` 不可用**：PATH 含中文用户名 `浪`，GBK 编码乱码 → 命令找不到。
- **一律用 `py.cmd`**：`cmd //c tools\py.cmd <脚本>` 自动指向 venv（记忆库 brain-memory 优先，回退检索库 deep-memory）。
- **中文路径规避**：传参含中文路径仍会乱码——先 `cd` 到目标目录再用**相对路径**调脚本。
- **示例**：`cd /d D:\ai\学习公司产品知识树 && py.cmd tools\kb_seed_rules.py --key-memory`。

## 六、提醒

- **调用无需审批，改需审批**：调用工具/技能直接来；改脚本/skill/hook 先报主 AI 审批（铁律 8）。
- **知识问题先 fanku 翻库**再答，带出处不编造。

## 相关页面

- 新会话开场话术：session-prompt.html（各 AI 的开场与职责边界）
- AI 工作记录：ai-worklog.html（谁做了什么留痕）
- 团队任务板：team-task-board.html（该做什么）
- Skill 使用指南：SKILL_GUIDE.md（根目录，技能清单）
