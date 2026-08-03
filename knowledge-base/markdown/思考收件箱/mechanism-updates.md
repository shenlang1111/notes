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
| 2026-08-03 | **主 AI = 调度中枢（用户拍板"你负责调度各个 AI 做事"）**——主 AI 负责：①**派活**（任务板待认领项按职责派给对应 AI，跨会话靠任务板+信箱 brain_msg 投递，不靠口头）②**汇总进度**（开工/收尾扫任务板+ai-worklog+机制页，汇总各 AI 干了什么、卡在哪）③**推进卡点**（识别卡点→分派认领或升级用户拍板，不让任务悬挂）。**所有 AI 知悉**：任务板/信箱收到主 AI 派活 = 正式任务，接单推进并在任务板/ai-worklog 留痕；卡点需用户输入的，主 AI 会标"等谁" | 知识库维护规范.md（六·2 调度职责） | 主 AI |
| 2026-08-03 | **新角色：规则设定 AI（用户拍板，有拍板能力）**——专职规则起草/修订/**拍板**/落地/广播（用户明确"他要有拍板能力"）：规则文字修订、冲突裁定、一致性修复可**自主拍板执行**；铁律 8 范围（tools/脚本/机制/跨 AI 权限）仍报主 AI，大方向/涉及用户规则请示用户。**所有 AI 知悉**：新角色到岗，规则问题可直接找它，它改完会同步广播 | 会话记录/rule-setter-prompt.md（MD-only 话术，粘贴新窗口即用） | 闲聊 AI（代存） |
| 2026-08-03 | **mem 脚本运行环境固化（全量体检发现，主 AI 执行）**——所有 `mem_*.py` 一律用项目 venv 跑：`D:\ai\brain-memory\.venv\Scripts\python.exe`（或 `tools/py.cmd` 自动指向），**不依赖系统 Python**（系统 Python 有无/被卸载/中文路径乱码均不影响记忆库）。体检实测：mem_search/mem_add/mem_chat_save/mem_export 4 脚本全通过、13 个 tools/ Node 脚本语法全过 + 核心 8 个实跑正常、20+17 个 Skill 完整。**所有 AI 知悉**：调记忆脚本用 venv，别等系统 Python；Windows 终端传中文路径会乱码，先 cd 再传相对路径 | 知识库维护规范.md（十·运行环境）+ tools/py.cmd | 主 AI |
| 2026-08-03 | **对话存档自动化（闲聊 AI 落地，用户两次拍板：要全量、单独 MD 文件）**——`tools/chat_autosave.js`（SessionEnd 钩子）：扫 `D:\ai\brain-memory\chat_records\chat-<agent>-<日期>.md` → 调 mem_chat_save 入库（自动切段）→ 复制到 archive/ 作已处理标记。**所有 AI 知悉**：①**原始聊天记录单独存 MD 文件，不塞收件箱、不做知识库页面**（用户 2026-08-03 拍板"我们的聊天内容单独加一个 MD 文件就好了，总结完才存收件箱"）：每 5 轮/每次聊完/话题翻篇，把自上次存档以来的完整逐轮对话写进 `chat_records/`，原文永久保留（钩子入库后不删除，archive 同名前缀防重）②收件箱/会话记录页只放**总结提炼后**的产物 ③提炼交给大脑 evolve_auto（存=全量原文、炼=自动提炼） | tools/chat_autosave.js + .claude/settings.json + chat_records（新目录，原名 chat_inbox） | 闲聊 AI |
| 2026-08-03 | **规则修订体系（用户拍板"有体系的改"）**——规则文档发现问题有闭环：**发现**（任何 AI 撞到矛盾/用户指出/审核发现）→ **登记**（思考收件箱 `规则问题-<日期>.md`，一句话记完即完成，只登记不抢改）→ **评估**（主 AI 积满 3 条或每周统一处理）→ **拍板**（权限/大方向用户定，纯文字修正主 AI 直接改）→ **修改+同步**（CHANGELOG/部署/重灌记忆库/广播）→ **验证**（十·三抽查一致性）。首批 5 项已走通闭环：铁律 13 残留、投递文件归档规则、双格式硬软边界、状态保鲜范围、机制页清理责任。**所有 AI 知悉**：用规则时发现问题 → 一句话记收件箱即可，改权在主 AI | 知识库维护规范.md（十·四 + v3.8） | 主 AI |
| 2026-08-03 | **自动提炼编排器（主大脑任务：自动提炼+分类挂心跳）**——各 AI 负责"存"（mem_chat_save 存对话），大脑负责"炼"：①**新建 tools/evolve_auto.js**（--status 速览 / --dry-run 预演 / --run 自动执行 / --min N 每组最少条数）：扫描 chat-* mid → 按 agent 归组 → 自动 draft（带 target 受众）→ apply 提炼 mid→long；agent 映射 target（brain/verifier/main/casual/agent/log/ui/tester/all）②**心跳 M3 升级**：从"chat≥3 只提醒留人审"改为"待提炼≥3 自动跑 evolve_auto --run"——各 AI 存对话后大脑自动接住提炼分类，无需人工排期③**修 mem_export.py 补 target_agent**：之前 export 丢 metadata 导致"target=无"假象（实际库里已打标）。**所有 AI 知悉**：存对话（mem_chat_save）后，大脑会自动提炼成经验并按受众分类（mem_search --target <受众> 过滤），无需再人工排期提炼 | tools/evolve_auto.js（新）+ tools/brain_heartbeat.js（M3）+ D:\ai\brain-memory\scripts\mem_export.py（target_agent）+ KEY_MEMORY ⑤ | 主大脑 |
| 2026-08-03 | **工具与技能全员共享（用户拍板"改成都能用"）**——①**技能双目录镜像**：`.trae/skills/` 20 个技能全部镜像进 `.claude/skills/`（Claude Code 与 Trae 两边都认，fanku 已在），开窗报告技能块全列 20 个②**Python 封装 py.cmd**：系统 python 因 PATH 含中文用户名乱码失效 → 新建 `tools/py.cmd` 自动指向 venv（记忆库 brain-memory 优先，回退检索库 deep-memory），绕开中文③**共享索引页**：新建 `会话记录/shared-tools-index.html+md`（全项目工具/技能总索引：11 个 tools/ + 8 个常用技能 + Python 调用规范），registry 登记，话术页指向它。**所有 AI 知悉**：tools/*.js 与 skills/ 是**全员共享资产**，任何 AI 可直接调用（改 tools/ 才需审批铁律 8，调用无需审批）| tools/py.cmd（新）+ .claude/skills/（镜像）+ 会话记录/shared-tools-index html+md（新）+ session-prompt-d.md + registry.json | 主大脑 |
| 2026-08-03 | **压缩指令简化（裸 /compact 自动同步记忆）**——用户确认裸 `/compact` 已自动同步记忆，无需带参数。更新后直接打 `/compact` 即可，自动完成快照刷新 + 记忆同步 + 压缩。**所有 AI 知悉**：压缩指令已简化，裸 `/compact` 就是完整压缩流程，无需再记参数 | KEY_MEMORY.md + 知识库维护规范.md（第十节）+ 话术页（全部 AI） | 主 AI |
| 2026-08-03 | **身份与技能偏差修复（用户追问根因，主大脑执行）**——①**身份中立化**：session_start_report 身份模板从"智能体 AI·重活执行引擎"（08-02 第一代身份残留）改中立"Claude Code 窗口·大脑体系（主大脑/技术验证员，以 handoff 提示词为准）"——主大脑+技术验证员两窗口共用 hook 不能写死单一身份；KEY_MEMORY① 澄清本页为主 AI 视角、Claude Code 窗口身份以 brain-window-main/verifier 为准②**技能装备**：fanku 复制进 .claude/skills/（Claude Code 只认 .claude/skills/，.trae/skills/ 是 Trae 用——之前技能从未装备到主大脑）③**技能清单可视化**：开窗报告加【可用技能】块 + KEY_MEMORY 加 ⑤.5 技能清单节（含"用前先 Read SKILL.md"纪律）。**所有 AI 知悉**：Claude Code 窗口身份中立、开窗报告会列技能清单 | tools/session_start_report.js + .claude/skills/fanku（新）+ KEY_MEMORY.md（⑤.5） | 主大脑 |
| 2026-08-03 | **自动接单兜底升级（测试员建议落地，主大脑执行）**——①claude CLI 不可用时不再盲目 retry×3 标 done（同因失败浪费 + 隐藏"需人工"），改 **probeClaude 探测 + 直接标 `needs_human`**（保留消息，主窗口开窗 `brain_msg --list` 见 `⚠️需人工`，人工接单）②自动接单处理完补**对话存档**（chatSave，快速回复 + headless 两路径存 `chat-brain-<日期>`，符合记忆入库铁律）③**开窗自动查信箱升级**：session_start_report 待处理 >0 直接列出具体消息（发给谁+内容预览），不只条数 ④tester 加入 mem_config AGENTS（tester-ai）。**所有 AI 知悉**：开窗报告信箱块会列出可接单消息；`⚠️需人工` = claude CLI 不可用需主窗口人工处理 | tools/brain_dispatch.js + brain_msg.js + session_start_report.js + mem_config.py | 主大脑 |
| 2026-08-03 | **回答加工分工（用户拍板："对问题你反馈，经验你总结"）**——大脑/检索层负责投递**信息片段**，**主窗口 AI 负责加工**：①对问题→反馈（发现问题登记任务板/直接报告）②经验→总结（把片段组织成带逻辑带话术的完整答案，沉淀进记忆库）。**所有 AI 知悉**：拿到检索片段不能只转述，要组织成"选型逻辑 + 判断 + 配方落点 + 话术"式的聪明回答（实测演示：婴儿配方选型 CAB/MAB/SHD 分档回答） | 知识库维护规范.md（十二 工作流程总览）+ 记忆库 mem0 | 主 AI |
| 2026-08-03 | **验证/审核闭环机制（审核→发现→修复→回归，用户拍板固化）**——大改动/bug修复/迁移/里程碑达成宣布完成前，**派验证 agent + 审核 agent 独立复核**（不能自己验自己）：验证=实测跑通+找反例+对照验收；审核=记录一致性+文档数字+内容硬伤+审批合规。闭环五步：宣布完成→派双 agent→判定修复→回归复检→留痕。核心纪律：独立只读只报不修、修复须 grep 全项目旧路径引用（2026-08-03 复检揪出 heartbeat 残留 C 盘即典型）。**所有 AI 干活适用**：改完可主动提交验证/审核 | 知识库维护规范.md（十·三）+ 记忆库 mem0 | 主大脑 |
| 2026-08-03 | **自主运行机制·心跳 + 自动接单（用户拍板，主 AI 执行）**——大脑从"人工驱动"升级"自主运行"：①**心跳 brain_heartbeat.js**（计划任务 TinciBrainHeartbeat 每 20 分钟跑 --once）：确保 watch 存活 → M2 索引同步（update_db.py 显式传 DEEP_MEMORY_WORKSPACE 修复 P0 路径错位）→ M3 提炼提醒（chat-* ≥3 只提醒留人审）→ M5 信箱派发；只写 watch-log ②**自动接单 brain_dispatch.js**：消息投递进信箱 → 秒级+定时双路派发 → headless claude 全权接单（读库/改库 HTML+MD/提炼/部署，走既有门禁，预算 $2/单封顶）→ 回写"回复-<原名>.md" → 标 done；token 不直接给 headless，白名单无 Bash 逃逸 ③**watch 开机自启**：启动文件夹 brain_watch.vbs + cc-switch 代理 Run 自启 ④brain_watch.js 加"回复-"前缀免疫 + _dispatch_out IGNORE + 新登记触发秒级派发。**所有 AI 知悉**：根目录投消息 → 大脑自动接单回写；干完活登记 ai-worklog（工具不自动写） | tools/brain_heartbeat.js + brain_dispatch.js（新，头部注释含完整用法）+ 规范十·二 + KEY_MEMORY ⑤ | 主 AI |
| 2026-08-03 | **测试员 AI 加入团队（第 6 个主窗口 AI）**——专职质量保障与测试：内容准确性/功能可用性/部署正确性验证，**只测不修**——发现问题登记任务板，不直接改内容。开工流程：调 fanku 翻库获取信息 → 明确测试范围 → 执行测试 → 登记问题 → 修复后验证。**所有 AI 知悉**：团队新增测试员 AI，干完活可提交测试员验证 | 会话记录/session-prompt（第十节·测试员 AI 专属话术）+ 思考收件箱/ai-worklog（团队名单） | 主 AI |
| 2026-08-03 | **接入大脑·实时监听 + 消息信箱（阶段4 M5，主大脑执行）**——①**brain_watch.js 实时监听**：常驻 fs.watch 监听 D:\ai\学习公司产品知识树 整棵（含子目录），秒级感知新文件，不靠轮询（蓝图 M5 验收：移动端发 → 文件变 → 大脑感知）②**根目录新建文件即投递**：用户在根目录新建 .md/.txt 即投递一条消息（用户拍板），watch 自动登记进信箱；knowledge-base/ 等子目录改动只记日志不当消息③**信箱命令 brain_msg.js**：大脑 --list 看待处理 / --done 标记已处理 / --peek 预览 / --status 速览 / --reply 结果回写（大脑干完活把结果写回根目录"回复-<原名>.md"，Trae 端可见）④**开窗自动带出**：session_start_report.js 新增【接入层信箱】块，开窗报告显示待处理消息条数⑤信箱索引存 D:\ai\brain-memory\messagebox\（监听范围外防自触发死循环）。**所有 AI 开工必读**：开窗报告看到待处理消息 → brain_msg --list 查看接单 | tools/brain_watch.js + tools/brain_msg.js（新，头部注释含完整用法）+ KEY_MEMORY ⑤ | 主大脑 |
| 2026-08-03 | **进化大脑·M4（自动提炼 + skill 生成，主大脑执行）**——蓝图第 4 层"进化层"落地：①**进化编排器 evolve_scan.js**（node tools/evolve_scan.js --status/--scan/--draft/--apply/--rollback/--journal）：扫描 mid 候选题 → 生成 skill 草稿 → 执行提炼升级 ②**提炼执行器 mem_refine.py**（mem0 原生 update 免 LLM，保 id/agent_id/历史）：mid 层对话存档/经验提炼为 long 层可复用经验（source=refined-mid-<日期>，provenance 留痕）③**审批流（硬门槛）**：skill 草稿落 D:\ai\brain-memory\ws\skill-drafts\（不入库）→ 登记任务板"待审批" → 主 AI 结合 skill-creator 人审 → 通过才落盘 .trae/skills/，不通过留[驳回]标记 ④**回滚**：--rollback 从 mem0_history 恢复原文+layer+source ⑤**mem_export.py 补 source 字段**（之前导出丢 source，无法区分 chat-*/mid）。**触发条件**：干完一类活 / mid 攒够 ≥3 条同主题 / 用户要求固化。所有 AI 开工可用 --scan 看待提炼素材。**首个 skill「记忆库去重与灌库」已审批落盘 .trae/skills/（2026-08-03 主 AI 批）**。M4 里程碑达成，四层大脑闭环 | tools/evolve_scan.js + D:\ai\brain-memory\scripts\mem_refine.py（新，头部注释含完整用法）+ 规范十·一 + KEY_MEMORY ⑤ | 主大脑 |
| 2026-08-03 | **记忆库修复 + 对话存档机制（主大脑执行，用户拍板核心）**——①记忆库去重清理（1064→463 点，灌库脚本非幂等导致重复爆炸；去重脚本 dedup_memory.py + 灌库脚本 kb_seed_knowledge.py 加 --reset 幂等 + #### 细切段，重灌 502 条）②**对话存档 mem_chat_save.py**：每轮对话结束 AI 自动存档对话内容（自动切段存 mid 层，source=chat-<agent>-<日期>），用户拍板/有结论/有教训必存；**提炼是后面的阶段，先学会存**。③查对话用 `mem_search --layer mid`（对话=mid，知识=long，分层清晰）。**所有 AI 开工必读**：每轮结束用 mem_chat_save 存档对话 | D:\ai\brain-memory\scripts\mem_chat_save.py（新）+ 规范第十节 + KEY_MEMORY ⑤ | 主大脑 |
| 2026-08-03 | **压缩续命模式（用户决定）**——用户不再创建新窗口，上下文长了直接压缩，恢复靠记忆机制：mem0 主记忆（自动沉淀默认动作）+ KEY_MEMORY 速查（决策/下一步收尾即更新，不依赖 PreCompact hook）+ 快照保底；**压缩后恢复 = 读 KEY_MEMORY + mem_search + 任务板 + CHANGELOG 再干活**；交接文档降级为公共参考 | KEY_MEMORY.md + 记忆库 mem0 + 规范第十节 | 主 AI |
| 2026-08-03 | **分层阅读 4 层加固（状态保鲜 DoD 化）**——①DoD 记忆类加"状态保鲜"勾选项（改过 KEY_MEMORY/交接/机制页 → 已重灌库）②知识页改动后跑 kb_seed_knowledge.py --domain 思考收件箱（几秒级）③各 AI 交接/话术开工段统一 4 层说明（casual/agent/log/migration/session-prompt-d）④旧"三层"记忆已清理（删旧写新为 4 层） | 知识库维护规范.md（DoD + 第十节）+ 5 份交接/话术 | 主 AI |
| 2026-08-03 | **分层阅读 4 层开工（用户拍板）**——库优先/文件兜底：层1 记忆库 mem0（知识/规则/经验/决策，先查）→ 层2 KEY_MEMORY（命令/决策速查）→ 层3 交接+任务板（身份/当前状态）→ 层4 CHANGELOG（最近进展）；新 AI 开工只读 4 处；**状态保鲜** = KEY_MEMORY/交接改动后重灌库（kb_seed_rules.py --key-memory 删旧写新）；**会话档案区频率拍板** = 换话题自动提炼 | 知识库维护规范.md（第十节 + 五-1）+ KEY_MEMORY.md + tools/kb_seed_rules.py + session_start_report.js | 主 AI |
| 2026-08-03 | **部署权限澄清（规范 v3.7，用户拍板"只有专业报告可以部署上线，其他没权限"）**——该限制**仅限大脑体系子 AI**（Claude Code 主大脑/技术验证员：只有专业报告可部署上线，其余产出无权限、需上线先报主 AI 审批）；**主 AI 及各主窗口 AI（闲聊/智能体/日志/UI）本身有部署权**，正式内容照常部署 | 知识库维护规范.md（铁律 3 + 三-7 + 五-2）| 主 AI |
| 2026-08-03 | **审核辅助机制（用户 08-03 拍板"智能体 AI 兼任主 AI 审核辅助"）**——智能体 AI 定期审核：①工作记录一致性（ai-worklog/CHANGELOG/任务板/机制更新对照）②文档数字一致性（交接/规范/KEY_MEMORY 版本、页数同步）③随机抽 2-3 页内容核对（数据来源/硬伤）。触发=每周或攒够反馈；产出=审核意见进任务板（带认领人+期限）；发现大改动只建议不抢跑 | 智能体 AI 交接（.claude/handoffs/2026-08-03-agent-d-handover.md）+ 任务板 + 记忆库 | 智能体 AI |
| 2026-08-03 | **工作根目录迁移至 D 盘（C 盘弃用）**——用户拍板"以后主要在数据库里查"，新根目录 = D:\ai\学习公司产品知识树。所有 AI 开工必读新交接文档（迁移交接，含复制即用交接提示词）+ 新开场话术（D 盘版：查询主入口 = 先查记忆库 mem_search，查不到再翻文件） | D:\ai\学习公司产品知识树\.claude\handoffs\2026-08-03-migration-handover.md（交接）+ D:\ai\学习公司产品知识树\knowledge-base\markdown\会话记录\session-prompt-d.md（话术）+ 记忆库 mem0 | 主 AI |
| 2026-08-03 | **全量入库：记忆库 = 统一查询主入口（用户拍板"以后主要在数据库里查"）**——规则 17 条 + 知识 387 条全部灌入 mem0（metadata.source 带出处）；AI 任何知识/规则/记忆问题**先 mem_search 数据库**（一个口子查所有、带出处），查不到再翻文件；文件保留为源（用户手机看 + 兜底） | 记忆库 mem0（D:\ai\brain-memory）+ tools/kb_seed_rules.py + kb_seed_knowledge.py + 规范第十节 | 主 AI |
| 2026-08-03 | **AI 自动沉淀记忆 = 默认动作（用户拍板 B 方案，广播所有 AI）**——话题聊完/干完活有**结论/决定/教训/偏好**就 mem_add 自动存（不等用户提醒，攒 1-2 话题一条，不碎碎念）；**用户拍板决策 = 最高优先级必存**（闲聊 AI 漏存被用户抓出"这一条你没存？"的教训）；落地要低——先跑通"自动存"最小一步，不搞大蓝图；**会话档案区边界已拍板**：全员可查、并入会话记录、换话题自动提炼（规范五-1） | 知识库维护规范.md（第十节）+ 记忆库 mem0 | 主 AI |
| 2026-08-03 | **机制瘦身（规范 v3.6，用户拍板）**——砍"机制养机制"：①铁律 11→10 条（合并收尾门禁+DoD）②**留痕分工**五处定位：CHANGELOG=唯一全量追溯（AI 看）/ ai-worklog=人员一句话（AI 看，细节引用 CHANGELOG）/ mechanism-updates=新机制广播（用户看，稳定即清理）/ team-task-board=任务待办（用户看）/ mem0=结论沉淀 ③**双格式分级**：用户看页（知识/经验/日志/机制/任务板）HTML+MD 成对，AI 看页（ai-worklog 等）可只写 MD——deploy.js checkPairs 加 MD_ONLY_EXEMPT 豁免 ④健康度盘点**产出必带认领人+期限**（不挂灰）。依据：闲聊 AI 机制健康度评估（收件箱 [待探讨]） | 知识库维护规范.md（v3.6）+ KEY_MEMORY.md + tools/deploy.js + CODE_WIKI.md（v3.4）+ ai-worklog + kb-health-checklist | 主 AI |
| 2026-08-03 | **记忆入库方案落地（规范 v3.5）**——用户拍板（调查业界后修正）：记忆大脑（mem0）升级为**主记忆**（干完活 mem_add 写、开工/压缩后 mem_search 读，不依赖任何 hook 时机）；KEY_MEMORY 降级为速查一页纸，快照区退二线保底；session_start_report.js 开窗自动回忆最近记忆；压缩统一用**裸 `/compact` 即可**（2026-08-03 更新后裸 /compact 自动同步记忆，无需带参数。原始发现：旧版裸 /compact 走 session memory 分支会跳过 PreCompact hook，已被修复） | 知识库维护规范.md（v3.5 第十节）+ KEY_MEMORY.md + tools/session_start_report.js + CODE_WIKI.md（v3.3 §4.3） | 主 AI |
| 2026-08-03 | **记忆大脑正式接入（mem0）**——阶段 2 落地（用户直接授权 + 主 AI 确认）：本地免 key 分层记忆库，各 AI 干完活用 `mem_add.py` 沉淀记忆（--agent 区分 AI / --layer 分层 mid/long），开工/答疑前用 `mem_search.py` 先查记忆，纠正用 `--fix-target` 删旧写新（真不再犯）。M3 里程碑达成（跨会话不丢 + 纠正不再犯）。**所有 AI 开工必读**：先用 `mem_search` 查"与我相关的记忆"，干完活用 `mem_add` 沉淀 | D:\ai\brain-memory\README.md（使用说明）+ 本页广播 | 主大脑 |
| 2026-08-03 | **规范升 v3.4：新增铁律 10"防失忆强制"**——KEY_MEMORY.md 为压缩后第一读；承诺/决策/状态即时落文件；deploy 门禁强制 CHANGELOG 今日有条目；改完必回读。新增规范"十、防失忆与关键记忆"节（三层强制详述） | 知识库维护规范.md（v3.4）+ .claude/handoffs/KEY_MEMORY.md + CODE_WIKI.md（v3.2 §4.3） | 主 AI |
| 2026-08-03 | **防压缩失忆三层强制**——①PreCompact hook（tools/precompact_save.js）压缩前自动把任务板/CHANGELOG 状态落盘到 KEY_MEMORY.md 快照区 ②SessionStart 开窗自动读回速查表摘要 ③deploy.js 强制 CHANGELOG 今日有条目才放行。配套 KEY_MEMORY.md（.claude/handoffs/）为压缩后第一读 | .claude/handoffs/KEY_MEMORY.md + .claude/settings.json + tools/precompact_save.js + session_start_report.js + deploy.js | 主 AI |
| 2026-08-03 | **AI 大脑技术验证报告页入库**——技术验证员产出《AI 大脑技术验证报告》（5 方案实测 5 关 + 5 独立审计复核，主选 deep-memory、备选 mem0），正式页入库思考收件箱，已完成 registry/nav/首页登记 | domains/思考收件箱/brain-tech-verification.html（报告）+ brain-window-verifier.md（验证员提示词） | 主 AI |
| 2026-08-03 | **Trae 移动端写本地文件验证通过**——从移动端发消息 → 本地共享文件夹根目录即时新建文件（实测"测试实时同步"落盘成功，秒级）→ 阶段 4 接入大脑（fs.watch 实时监听）的物理前提成立。建监听时需监听整个知识库根目录（含子目录），不能只盯 inbox | 本页广播（待阶段 4 落地后补使用说明） | 主大脑 |
| 2026-08-03 | **检索大脑正式接入（deep-memory）**——本地混合检索工具（向量+BM25+重排），检索正式库（只读），替代手工 fanku 自动化；已适配 7 域多级目录+中文专有型号；环境 D 盘 D:\ai\deep-memory，检索走 search.py，结果带"待核实"标注 | D:\ai\deep-memory\README.md（使用说明）+ 本页广播 | 主大脑 |
| 2026-08-03 | **AI 大脑蓝图 v1 + 窗口分工模型**——大脑定位=代替用户当枢纽的自主系统（非难任务执行者）：四层架构（接入/检索/记忆/进化）+ 分阶段路线 + 验收标准 + 里程碑；窗口分工=主大脑统筹 + 技术验证员窗口试跑 + 用户临时传话（改串查并） | .claude/handoffs/brain-blueprint-v1.md（蓝图）+ brain-window-main.md（主大脑提示词）+ brain-window-verifier.md（验证员提示词）+ archive/2026-08-03-agent-brain-v2.md（交接） | 智能体 AI |
| 2026-08-03 | **大脑体系新成员登记：主大脑 + 技术验证员**——两个 Claude Code 窗口正式加入 AI 团队名单（大脑体系分组）；session-prompt 加第十一节（主大脑话术指引）和第十二节（技术验证员话术指引） | ai-worklog（团队名单）+ session-prompt（十一、十二节） | 主 AI |

## 三、维护规则

- **谁建谁记**：新建机制（页面/规则/skill/流程）后，建立者顺手在本页追加一行——并进 DoD 自检，防止"建了没人广播"
- **只索引不复制**：每条写"去哪读"指向具体页面，内容留在原页面，避免本页膨胀成第二个话术页
- **固定项不进本页**：ai-worklog/团队任务板/健康度/翻库这 4 样是"永久必读"，属于话术页固定项；本页只收增量
- **稳定即摘除（2026-08-03 细化）**：条目满足"已广播 ≥3 天 + 话术页/交接已有入口 + 各 AI 已普遍掌握"→ 由**主 AI 每月清理一次**摘除（摘除条目保留在 CHANGELOG 追溯），本页保持"最近新增"的短小形态

## 相关页面

- 新会话开场话术：domains/会话记录/session-prompt.html（各 AI 的开场与固定必读，本页是其增量入口）
- AI 工作记录：ai-worklog.html（谁做了什么，带名字留痕）
- 团队任务板：team-task-board.html（该做什么：登记、认领、追踪）
- 知识库健康度盘点：kb-health-checklist.html（定期体检清单）
