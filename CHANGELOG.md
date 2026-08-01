# 变更日志（CHANGELOG）

> 记录每次与 AI 交流中对知识库的修改，供多会话协作追溯。变更日志规则见《知识库维护规范》（七 DoD / 九 主动复盘）。
>
> **文档关系**：本文档 = 修改追溯（☆ 按需）；总规则 →《知识库维护规范》（★★★ 必读）；项目背景 → PROJECT_CONTEXT.md；技术细节 → CODE_WIKI.md。

> **归档规则**：当本月记录超过 30 条时，把上月记录拆分到 `CHANGELOG-YYYY-MM.md`（如 `CHANGELOG-2026-08.md`），主文件只保留最近一个月的记录。

| 日期 | 主题 | 修改内容 | 涉及文件 |
|---|---|---|---|
| 2026-08-01 | 部署通道打通 | git push 国内超时 → 改用 GitHub API（Contents API 上传 + POST /pages/builds 触发构建） | —（线上操作） |
| 2026-08-01 | mobile.html 修复 | 修复 footer 文案被截入每个面板：extractContainer 由 lastIndexOf 改为配对计数匹配 | tools/build_mobile.js |
| 2026-08-01 | 缓存处理 | 入口跳转加版本参数 ?v=2 绕过手机/微信缓存 | index.html |
| 2026-08-01 | 维护规范建立 | 《知识库维护规范》v1.0→v1.3：内容架构、部署、手机版、会话协作、主 agent 规则、变更日志、经验提炼方法论 | 知识库维护规范.md |
| 2026-08-01 | 一键部署脚本 | 新增 deploy.js：双格式校验 → 生成 mobile.html → 串行上传（sha 冲突检测）→ 构建 → 服务器端验证 | tools/deploy.js |
| 2026-08-01 | 一键部署脚本审核 | 审核 agent 发现 6 处问题并全部修复（--files 附带 mobile.html、构建轮询竞态、409 排队、footer 检查词等） | tools/deploy.js |
| 2026-08-01 | Token 管理 | Token 移至本地 .env（.gitignore 忽略），脚本统一读取，不再在对话/仓库传递 | .env、.gitignore |
| 2026-08-01 | 会话记录分区 | 新增"会话记录"域，页面定位为"与 AI 的交流经验"（可复用经验，非流水账），含相关页面串联 | domains/会话记录/、markdown/会话记录/ |
| 2026-08-01 | 索引与导航 | registry.json 新增域与页面条目；首页导航三处（nav/快捷栏/卡片）加入口 | registry.json、knowledge-base/index.html |
| 2026-08-01 | 多 Agent 协作实践 | 首次使用部署（主 agent）+ 审核（子代理）并行模式；确立改动分级与大改动配审核机制 | 规范第六节 |
| 2026-08-01 | 经验页重构 | "会话记录"重构为"与 AI 的交流经验"：七大块可复用经验（部署/手机版/缓存/安全/内容/多 Agent/高效提问） | domains/会话记录/session-20260801.html、.md |
| 2026-08-01 | 主动复盘机制 | 用户指出主 agent 缺乏主动学习（每次都是用户提出才改规范）→ 规范新增"十、主动复盘与自我改进"：触发时机、复盘四问、主动提交规范修订纪律 | 知识库维护规范.md |
| 2026-08-01 | 页面写作标准 | 规范新增"二-6 页面写作标准"：每页结构模板（hero/正文分区/数据表/相关页面/元数据）+ 质量检查清单 | 知识库维护规范.md（v1.5） |
| 2026-08-01 | 经验页防膨胀 | "与 AI 的交流经验"页新增"经验速查索引"表（15 条：场景→做法），约定超 30 条按子主题拆分 | domains/会话记录/session-20260801.html、.md |
| 2026-08-01 | 首页分类 | "与 AI 的交流经验"从"扩展阅读"独立为"AI 协作与日常"大类（日化知识之外的内容统一归此类） | knowledge-base/index.html、registry.json |
| 2026-08-01 | 部署验证加强 | 用户指出未验证本次修改内容 → deploy.js 新增 --expect "文件:关键词" 验证；规范三-3 补充"每次部署必须验证本次修改内容" | tools/deploy.js、知识库维护规范.md（v1.6） |
| 2026-08-01 | 任务完成定义 DoD | 用户质疑"写了规范不用" → 规范新增"十一、任务完成定义"：通用/内容/部署三类 DoD + 行为铁律（回复"完成"前必须展示自检清单，未通过不宣布完成） | 知识库维护规范.md（v1.7） |
| 2026-08-01 | 全面整理 | 14 个内容页导航补"AI 经验"入口（此前只有首页有）；首页"14 个页面"→"15 个"、版本 v1.0→v2.0；--expect 验证本次修改上线 | 14 个内容页 html、knowledge-base/index.html |
| 2026-08-01 | 共享导航重构 | 新建 _shared/js/nav.js 统一渲染顶部导航（自动算根路径+当前页高亮）；15 个内容页+首页导航改为引用脚本（多 Agent 并行：3 执行 + 1 审核）；首页删除冗余 quick-bar；deploy.js 支持 .js 上传、排除 _preview_server.js；CHANGELOG 归档规则；规范 v1.8 新增"导航统一维护" | nav.js、15 内容页、index.html、deploy.js、CHANGELOG.md、规范 v1.8 |
| 2026-08-01 | 主要文档索引 | 规范新增"〇、主要文档索引"（知识库维护规范/CHANGELOG/PROJECT_CONTEXT/CODE_WIKI/knowledge-base 一览与状态标记） | 知识库维护规范.md（v1.9） |
| 2026-08-01 | 交接文档更新 | PROJECT_CONTEXT.md 与 CODE_WIKI.md 重写为 v2.0（去除旧路径/旧样式/已删子项目/旧导航描述，改为当前状态：15 页 5 分类、nav.js、deploy.js、双格式、DoD 工作流） | PROJECT_CONTEXT.md、CODE_WIKI.md、规范〇节状态 |
| 2026-08-01 | 文档串联与必读标注 | 4 个核心文档互相交叉引用（各头部加"文档关系"块）；规范〇节加阅读顺序与优先级（规范★★★/PROJECT_CONTEXT★★/CODE_WIKI★/CHANGELOG☆）；规范升 v2.0 | 4 个文档 |
| 2026-08-01 | 经验整理收尾 | 经验页索引表扩至 21 条（--expect/DoD/nav.js/多 Agent 并行/文档体系/分类意识）；部署/内容/多 Agent 经验补充；新增"八、文档管理与交接"章节；HTML/MD 同步并部署验证上线 | domains/会话记录/session-20260801.html、markdown/会话记录/session-20260801.md |
| 2026-08-01 | 新会话话术页 | 新增"新会话开场话术"独立页面（HTML+MD 双格式）：完整版开场话术/任务话术模板/极简版/使用要点；登记 registry.json、加 nav.js 导航、首页卡片；首页页面数 15→16 | session-prompt.html、.md、registry.json、nav.js、index.html |
| 2026-08-01 | AI 智能体构想记录 | 闲聊中讨论 AI 智能体构想（RAG 方案），追加到"与 AI 的交流经验"页第九节（HTML+MD 双格式），小改动直接部署 | session-20260801.html、.md |
| 2026-08-01 | 思考收件箱设计讨论 + 经验教训 | 讨论"思考收件箱"临时板块设计（定位/命名/结构/与现有域区分）；记录本次教训"部署必须紧跟文件创建，不能因大改动规则跳过部署"；追加到第十节并部署 | session-20260801.html、.md |
| 2026-08-01 | 仓库清理 | 清理 GitHub 仓库 83 个旧文件：7 个旧子项目（content-workbench/fine-chemical-tech-notes/surfactant-chapter3/tinci-* 等）、临时目录（.screenshots/.trae-html-share-packages/.uploads）、旧工具（bust_cache/check_mobile/fix_asset_paths/trigger_build/html2md）、旧版文档（CODE_WIKI/PROJECT_CONTEXT 线上旧版）、冗余 session-20260801-2 文件、启动手机访问.bat；触发 Pages 构建 | —（线上仓库清理） |
| 2026-08-01 | 主动复盘：唤醒识别+并行分派 | 用户指出两个失职：①第一次说"了解我和闲聊 AI 聊了什么"时未第一时间扫共享文件夹，等第二次提醒才查；②多步骤任务（话术页/仓库清理）未分派子代理并行 → 规范新增六-6 跨会话信息同步、六-5 强化"并行分派是默认动作"、第十节加复盘记录；经验页索引扩至 23 条 | 知识库维护规范.md、session-20260801.html、.md |
| 2026-08-01 | deploy.js 参数修复 | 用户转来闲聊 AI 反馈：--files/--expect 用 slice 收集会互相吞参数 → 新增 parseFlags 严格解析（遇 -- 停止）；派审核 agent 复核通过；经验页索引扩至 23 条 | tools/deploy.js |
| 2026-08-01 | 思考收件箱落地 | 把空的"笔记收件箱"域改造为"思考收件箱"（想法缓冲区）：建 inbox.html/.md（定位原料堆场 vs 成品仓库、怎么用、当前内容）、registry 新域+页面、nav.js 加"收件箱"、首页卡片；规范五-1 补"内容默认追加、新建页面有门槛、建页前先问用户" | inbox.html、.md、registry.json、nav.js、index.html、规范 |
| 2026-08-01 | 响应规范 | 用户反馈"很多时候需要我给你很多提示" → 规范新增"十二、响应规范"（响应四问：理解了吗/讨论还是执行/读了吗/谁拍板 + 行为细则：先复述后行动、讨论不执行、少用选项框、主动查证）；经验页索引扩至 25 条、第七节补"先复述再动手/讨论就只讨论"；复盘记录加一条 | 知识库维护规范.md、session-20260801.html、.md |
| 2026-08-01 | 规范精简 v3.0→v3.1 | 用户反馈规范太长、重点不突出 → 重写为分层精简版：顶部 8 条铁律速览（含正文节号）+ 分节规则，280 行压到 88 行；细节下沉 CODE_WIKI；派审核 agent 复核（通过），采纳 2 项中级别修复（大改动不豁免部署澄清、CHANGELOG 引用更新）+ 3 项低级别（分类意识/复盘标★★/铁律加节号）；CODE_WIKI 重写 v3.0（承接技术细节）、PROJECT_CONTEXT 重写 v3.0（17 页 5 域） | 知识库维护规范.md、CODE_WIKI.md、PROJECT_CONTEXT.md、CHANGELOG.md |
| 2026-08-01 | 主 agent 备注 + 清理缓存 | 新增 AGENT_NOTES.md（主 agent 私享速查：重要文件地图/响应四问/常见坑/常用命令/关键信息）；清理本地 .trae-html-share-packages 分享包缓存 19 个 zip（不影响线上） | AGENT_NOTES.md、—（本地缓存清理） |
| 2026-08-02 | Skill 安装 + 经验沉淀 | 调查 skill marketplace → 3 Agent 并行安装 16 个 skill（元技能/AI 智能体/协作流程/通用工具）→ 审核 Agent 复核通过 → 沉淀到经验页第十一节（HTML+MD 双格式） | session-20260801.html、.md |
