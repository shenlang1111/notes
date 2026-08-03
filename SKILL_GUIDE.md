# Skill 使用指南（SKILL_GUIDE）

> 版本：v1.0（2026-08-02）
>
> 给所有 AI（主 agent、闲聊 AI、其他对话框的协作 agent）：本项目具备可调用的 **skill 扩展能力**（类似插件），遇到匹配的任务**直接调用**，不用等用户指定。
>
> 文档关系：总规则 →《知识库维护规范》（★★★）｜ 技术细节 → CODE_WIKI.md（★）｜ 本文档 = 能力清单与调用方式（★ 推荐）

## 1. Skill 是什么

Skill 是可复用的能力包：一个带 `SKILL.md` 指令的文件夹，定义"遇到某类任务时按什么流程做、用什么工具"。AI 加载后按指令执行，相当于预装的标准作业程序。

## 2. 怎么调用

- **AI 主动调用（默认）**：任务匹配某个 skill 时，直接调用 Skill 工具加载（按名调用，不带参数），然后按 SKILL.md 的指令执行
- **用户指定**：用户说"用 xx skill"时，必须调用
- **禁止**：跳过加载直接凭记忆执行；或调用后不按指令走

## 3. 项目可用 Skill 清单（20 个，位于项目 `.trae/skills/`，已镜像 `.claude/skills/`）

| 分类 | Skill | 用途 |
|------|-------|------|
| **元技能** | `skill-creator` | 创建自定义 skill 的元技能 |
| **AI 智能体** | `unified-memory` | 跨会话统一记忆管理 |
| | `ck` | 持久化项目记忆与知识检索 |
| | `fanku` | **知识库翻库检索纪律**：知识类问题先翻库再答，渐进式检索、带出处、数据四档分级、不编造、翻不到明说（基于 rag-skill 适配） |
| | `autonomous-agent-harness` | 自主 Agent 运行框架 |
| | `brand-voice` | 品牌语调 / 风格控制 |
| | `自动接单-主大脑域` | 自动接单快速通道经验（主大脑专用，M5 提炼落盘） |
| | `记忆库去重与灌库` | mem0 去重 + 灌库（幂等，主大脑/主 AI 用） |
| | `身份与技能装备真相` | 压缩后先确认身份/技能装备（主大脑/验证员用） |
| | `agent-architecture-audit` | 架构审核与诊断 |
| **协作流程** | `writing-plans` | 写实施计划 |
| | `executing-plans` | 按计划执行 |
| | `dispatching-parallel-agents` | 并行派发多个 Agent |
| | `session-handoff` | 会话交接文档生成 |
| **通用工具** | `pdf` | PDF 读取 / 处理 |
| | `xlsx` | Excel 读取 / 处理 |
| | `docx` | Word 读取 / 处理 |
| | `brainstorming` | 头脑风暴 / 需求讨论 |
| | `firecrawl` | 网页抓取 / 搜索 |
| | `obsidian` | Obsidian 笔记库集成 |

> 另有 Trae 内置能力可直接使用（如 TRAE-product-knowledge 产品知识、动态 UI 渲染等），无需额外安装。

## 4. 本项目典型使用场景

| 场景 | 调用的 Skill |
|---|---|
| 用户给 PDF / Word / Excel 资料（培训材料、产品手册、数据表） | `pdf` / `docx` / `xlsx` |
| 多 Agent 并行分派任务 | `dispatching-parallel-agents` |
| 会话结束 / 换对话框交接 | `session-handoff` |
| 跨会话记忆、记得用户说过什么 | 记忆大脑 mem0（干完活 `mem_add` 写、开工 `mem_search` 读，见 KEY_MEMORY⑤）；`unified-memory` / `ck` 为通用备选 |
| 回答知识类问题前先翻知识库（产品/机理/配方/数据/市场） | `fanku` |
| 给知识库创建新的专属技能 | `skill-creator` |
| 用户说"我们讨论一下" | `brainstorming` |
| 抓取市场趋势 / 行业资料 | `firecrawl` |
| 大任务先写方案再执行 | `writing-plans` → `executing-plans` |

## 5. 注意事项

- **Skill 只是工具，不替代规则**：双格式、改动分级、DoD、部署验证等仍以《知识库维护规范》为准
- 关键产出（脚本、规范、大改动）仍要配审核 agent 独立复核（规范六-5）
- 安装了 skill 不代表自动生效——必须**主动调用**它才算用上
- skill 使用是"能力增强"，与"内容维护流程"无关；内容照常走 HTML/MD 双格式
