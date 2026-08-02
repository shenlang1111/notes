---
title: "AI 大脑技术验证报告（阶段 0）"
domain: "思考收件箱"
tags: ["AI协作", "大脑", "技术验证", "deep-memory", "mem0", "阶段0"]
description: "AI 大脑技术选型验证报告：5 个候选方案逐一实测 5 关 + 5 份独立审计复核；主选 deep-memory、备选 mem0；BYO-LLM-WIKI/RAGFlow/Dify 否掉"
source: "brain-tech-verification.html"
updated: 2026-08-03
---

# AI 大脑技术验证报告（阶段 0）

> 生成：2026-08-03 · 技术验证员窗口（Claude Code）
> 依据：5 个候选方案逐一实测 + 5 份独立对抗性审计复核（审计员独立重跑关键命令、比对原始留档证据）
> 报告为知识库正式内容页，双格式（HTML+MD）成对入库，由主大脑整理 registry/nav 登记。

---

## 一、一句话结论

**没有现成方案能"零改造直插"这个中文文件型知识库。主选 deep-memory（检索+自进化最贴合蓝图第 2/4 层，本地免 key 真混合检索是独一份），备选 mem0（记忆层底座，本地纯离线可跑，中文检索实测 6/6 命中为所有方案最佳）；但两者都需要"转换层/灌库层"才能接上现有 7 域多级目录。BYO-LLM-WIKI（重 LLM key）、RAGFlow/Dify（本机跑不动）明确否掉。**

## 二、五关打分表（全部经独立审核确认）

| 方案 | ① 可跑性 | ② 接入性 | ③ 检索质量 | ④ 接入复杂度 | ⑤ 自进化 | 定位 |
|---|---|---|---|---|---|---|
| **deep-memory** | ✅ 依赖全装，onnx 在 Windows 可装 | ❌ 格式硬编码：只读平铺+`## 🔧` 条目，现有多级目录索引 0 条 | ⚠️ 真混合检索（向量+BM25+重排），但整文件稀释致专有型号查询不稳 | ⚠️ skill 化步骤清晰，含"改全局配置+格式转换"两步重活 | ✅ cold→hot 自进化闭环真跑通 | **主选**（检索+进化层） |
| **mem0** | ✅ 本地免 key 可初始化（fastembed+qdrant） | ⚠️ 记忆层非文件读取器，须自建灌库管线 | ✅ 中文 6/6 Top-1 命中，混合检索（向量+BM25+实体） | ⚠️ 官方接入强制云 key+数据上云；本地须自写 MCP | ✅ 增量化 ADD/UPDATE/DELETE，依赖 LLM | **备选**（记忆层） |
| **BYO-LLM-WIKI** | ⚠️ 能装但 hnswlib/mcp 两坑 | ✅ 原生读 md/html | ⚠️ 混合检索但强依赖 key，中文兜底=0 | ⚠️ 多数工具无 key 报错 | ⚠️ 唯亮点：无 key 用已认证 CLI 生成 skill | 否掉（重 LLM 依赖） |
| **nmem** | ✅ CLI 全跑通（SQLite 降级） | ⚠️ 能导入 md，但本质记忆引擎非文档检索 | ⚠️ 产品码命中可靠、中文语义弱（审计发现检索表 3 处夸大） | ⚠️ setup 一键 MCP，但写死 Postgres URL | ⚠️ 无 key 时自进化哑火 | 边缘备选 |
| **agent-knowledge** | ⚠️ 能跑，中文路径 UI 404 | ⚠️ 读 md 可用、写分类不兼容 | ⚠️ 中文 tokenizer 退化，纯中文无排序 | ✅ 一条 MCP 配置即可 | ✅ promote 实测，离线蒸馏不触发 | 边缘备选 |
| **RAGFlow/Dify** | ❌ 本机 docker 未装、RAM 14GB<16GB | — | — | — | — | 否掉（本机跑不了） |

**审计附注**：
- mem0 / deep-memory / BYO-LLM-WIKI / agent-knowledge：**全部可采信**（独立重跑证实）。
- nmem：检索质量表有 **3 处串数/夸大**（审核员比对验证员留档 `*_results.txt` 发现：如"羟基磺基甜菜碱"实际正确条不在 top3，0.31 是无关联条分数）。核心结论方向对，但检索表细节需修正后再采信。

## 三、关键共性发现

1. **中文检索是所有方案的软肋**：agent-knowledge（BM25 丢弃中文）、deep-memory（整文件稀释）、BYO（中文兜底=0）、nmem（默认英文模型）——中文知识库对嵌入/分词模型有硬要求。
2. **本地免 key 是硬约束**：BYO/RAGFlow 依赖云 key；mem0/deep-memory/agent-knowledge/nmem 核心可用，但"自进化"大多依赖 LLM（本地 Ollama 或云 key）。
3. **"接现有库"普遍有鸿沟**：deep-memory 要改格式、mem0 要灌库、nmem 是记忆非文档、agent-knowledge 写分类不兼容——**没有一个能直接读现有 7 域多级目录做即查即用**。
4. **国内网络需镜像**：HF 模型下载必须 `HF_ENDPOINT=https://hf-mirror.com`（deep-memory/mem0/nmem 通用）。

## 四、主选方案接入步骤

### 路线 A：deep-memory（主选）——本地免 key 真混合检索 + 自进化

```bash
# 1) 装 skill 包：把 4 个 skill 放进项目 .claude/skills/ 或 ~/.claude/skills/
#    deep-memory / chroma-hybrid-search / memory-import / memory-backup

# 2) 建环境（Windows，Git Bash）
export HF_ENDPOINT=https://hf-mirror.com     # 国内必需，否则模型下载失败
python -m venv "$HOME\.deep-memory\.venv"
"$HOME\.deep-memory\.venv\Scripts\python" -m pip install -r skills/chroma-hybrid-search/requirements.txt

# 3) 关键：一次性格式转换（现有 7 域多级目录 → 平铺 + ## 🔧 条目）
#    ⚠️ 需写一个转换脚本（把 markdown/<域>/*.md 平铺进 knowledge-base/，### 改写为 ## 🔧）
#    ⚠️ 这会改动库文件结构——属大决策，须用户/主大脑拍板
#    （备选：改 kb_reader.py 源码支持递归子目录，不动库结构，成本低）

# 4) 初始化索引
"$HOME\.deep-memory\.venv\Scripts\python" skills/chroma-hybrid-search/scripts/update_db.py

# 5) 日常检索
"$HOME\.deep-memory\.venv\Scripts\python" skills/chroma-hybrid-search/scripts/search.py --query "TC-MAB 40LDL" --min-score 0.35
# 每轮结束 write_cold.py 写冷库；定期 refine_experience.py 提炼；backup.py 备份
```

**要点**：混合检索（语义 e5-small + BM25 + bge-reranker 重排）+ cold→hot 自进化闭环，均实测跑通、审计复现。检索概念型问句（如"CAB+AES 协同增稠"）质量高。

### 路线 B：mem0（备选）——记忆层底座，中文检索实测最佳

```bash
# 本地纯离线（免 key）：fastembed 中文模型 + qdrant + Ollama
export HF_ENDPOINT=https://hf-mirror.com
export HF_HUB_DISABLE_XET=1
uv venv .venv && uv pip install mem0ai fastembed
# 写灌库脚本：遍历 markdown/**/*.md → 分块 → m.add(块, infer=False)
# 自建 MCP server 包装 add/search → 注册进 Claude Code .mcp.json
# ⚠️ 官方云路径（claude plugin install mem0@mem0-plugins）强制 m0- key + 数据上云，不建议
```

**要点**：中文检索 6/6 Top-1 命中（实测最佳），但需自建灌库管线 + 自进化依赖 Ollama。

## 五、风险与替代

| 主选方案风险 | 替代时机 |
|---|---|
| **deep-memory 格式硬编码**：只读平铺+`## 🔧`，现有 7 域目录索引 0 条 | 采用"改 kb_reader 源码支持递归子目录"（不动库结构），或放弃走自研 |
| 整文件稀释致专有型号查询不稳（Q1/Q2 空结果） | 条目化（`## 🔧`）后 rerank 0.9994，或调低 min-score |
| 自动改写 `~/.claude/CLAUDE.md`（改全局配置） | 需用户知情；可手工配置避开 |
| 模型 1.6GB + 国内镜像依赖 | 一次性成本 |
| 模型缓存可能膨胀到 4GB | 用必要文件即可，不用 snapshot_download |
| **备选 mem0**：官方云 key + 本地自写 MCP 包装 | 若不想写转换脚本，记忆底座选 mem0 |

**明确否掉**：BYO-LLM-WIKI（重 key + 中文兜底=0）、RAGFlow/Dify（本机 docker/RAM 不达标）、agent-knowledge（git 误提交高危 + 中文退化）、nmem（中文弱 + SQLite 降级 + 检索表有夸大）。

## 六、给主大脑的决策建议 + 需用户拍板问题

### 建议技术路线（供主大脑评估、用户拍板）

1. **阶段 1 检索大脑**：主选 deep-memory 的混合检索组件（向量+BM25+重排，本地免 key），但需解决"接现有库"——**优先推荐改 kb_reader 源码支持递归子目录**（不动库结构、成本低、可复用现有 7 域目录），而非改库格式。
2. **阶段 2 记忆大脑**：备选 mem0（本地纯离线，中文检索实测最佳），自建灌库+MCP 包装。
3. **阶段 3 进化大脑**：deep-memory 的 cold→hot 闭环天然覆盖（干完活自动沉淀经验→skill）。
4. **阶段 4 接入大脑**：fs.watch 自研（与选型无关，蓝图已定）。

### 需用户/主大脑拍板的问题

| # | 问题 | 我的建议 |
|---|---|---|
| 1 | **技术路线**：主选 deep-memory + 备选 mem0，是否采纳？ | 采纳（理由见上） |
| 2 | **接入方式**：deep-memory 接现有库，是"改库结构（平铺+条目化）"还是"改 kb_reader 源码（不动库结构）"？ | 改 kb_reader 源码（不动库，成本低） |
| 3 | **是否引入 LLM**：自进化要 LLM（本地 Ollama 或云 key）。本地无 Ollama，要不要装？ | 建议先不装，检索大脑先跑纯本地（deep-memory 免 LLM 可用） |
| 4 | **接不接官方云**：mem0 官方插件要云 key+数据上云。接受吗？ | 不建议，走本地路径 |
| 5 | **大脑做到哪层先停**：M2（检索）还是 M5（闭环）？ | 按蓝图原计划，逐层推进 |

## 相关页面

- AI 工作记录：ai-worklog.html（技术验证员工作留痕）
- 团队任务板：team-task-board.html（待办/认领/状态）
- 知识库健康度盘点：kb-health-checklist.html（定期体检清单）
- 机制更新：mechanism-updates.html（新机制广播）

---

*验证方式：全部实际安装+实际运行+用知识库真实片段检索+独立审核员重跑复核；未使用任何 API key（唯一联网为已认证的 Claude Code CLI 和 hf-mirror 镜像下载）。测试全部在临时目录，正式库正文零改动。*
