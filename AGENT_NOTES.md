# 主 Agent 备注（AGENT NOTES）

> 这是我（主 agent）自己的速查备忘——不是交接文档（那是 PROJECT_CONTEXT.md），是"我随时回看"的提醒。每次动手前、被用户批评后，先回来扫一眼。

## 重要文件地图

| 文件 | 作用 | 什么时候用 |
|---|---|---|
| 知识库维护规范.md | 总规则 v3.3（10 条铁律 + 分节） | 每次动手前、被用户指出问题后必读 |
| KEY_MEMORY.md（.claude/handoffs/） | 关键记忆速查表（铁律/命令/决策/压缩前快照） | 压缩/新会话后第一读；决策变化时即时更新 |
| PROJECT_CONTEXT.md | 项目背景 / 用户画像 / 当前状态 | 新会话接手、理解用户时 |
| CODE_WIKI.md | 技术实现细节 / 命令（v3.1） | 改脚本、查 deploy/build_mobile 细节 |
| CHANGELOG.md | 修改追溯 | 每次改动后记录（DoD 必过项） |
| knowledge-base/domains/ | 内容页 HTML（34 页） | 改/加内容 |
| knowledge-base/markdown/ | 内容页 MD（34 个，AI 检索） | 双格式同步 |
| knowledge-base/registry.json | 页面索引（domains + pages） | 新增/删除页面时 |
| knowledge-base/_shared/js/nav.js | 共享导航（链接清单） | 新增页面只改这里 |
| knowledge-base/mobile.html | 手机版（build_mobile 生成，勿手改） | 部署后服务器端验证 |
| tools/deploy.js | 一键部署（校验→生成→上传→构建→验证） | 每次内容变更后 |
| tools/build_mobile.js | 生成 mobile.html | 内容变更后（deploy.js 已自动绑定） |
| index.html（根） | 跳转到 mobile.html 的入口 | — |
| .env | GitHub Token（已 gitignore，勿泄露/硬编码） | 部署自动读取 |

## 我的响应四问（每次回复前必答）

1. **理解了吗**——模糊/讨论型先一句话复述请用户确认
2. **讨论还是执行**——用户说"讨论/完善/你觉得呢"= 只讨论不执行，决定权留给用户，不推销不催
3. **读了吗**——涉及用户或别的 AI 写的内容，先读完消化（核心观点/发现的问题/要用户定什么）
4. **谁拍板**——方案选择权在用户，我只给分析和材料

## 我的常见坑（别再犯）

- **★ 承诺必落文件**：口头承诺/用户拍板/进行中状态 → 即时写 KEY_MEMORY.md（决策区）或任务板/CHANGELOG；只在对话里的承诺 = 压缩即蒸发，等于没承诺（2026-08-03 用户拍板三层强制）
- **★ 改完必回读**：并行编辑同一文件会互相覆盖；编辑回执显示"成功" ≠ 磁盘正确，宣布完成前回读实际文件确认
- **★ 方案有明确建议就执行，别等逐条拍板**：用户说"先给方案再调整"= 给了建议就该落地；只有真二选一的决策才停下来问（2026-08-02 被点名"只说不做"）
- 用户说"在别处 / 和另一个 AI 聊过，你去看"→ 第一步按 LastWriteTime 扫共享文件夹，**不说"看不到"**
- ≥3 个独立步骤/文件的任务 → 默认拆子代理并行（各碰各的文件）；**同一文件编辑必须串行**（并行会互相覆盖）
- 关键产出（脚本/规范/大改动）→ 配审核 agent 独立复核后才部署
- 部署必带 `--expect "文件:关键词"` 验证**本次修改**上线，不只做通用检查
- 宣布"完成"前展示 DoD 自检清单逐项打勾；没通过不宣布
- 大改动规则不豁免部署：任何文件创建/修改后立即部署
- 内容去向：闲聊/半成品 → 思考收件箱；整理成经验 → 会话记录；默认追加不新建页（建页先问用户）
- 验证线上用 **Node fetch**（PowerShell 的 Invoke-WebRequest 对 GitHub Pages 会误报 404）

## 常用命令

- 部署 + 验证本次修改：`node tools/deploy.js --expect "文件路径:关键词"`
- 只部署指定文件：`node tools/deploy.js --files 文件路径`（自动附带 mobile.html）
- 重新生成手机版：`node tools/build_mobile.js`
- 线上站点：https://shenlang1111.github.io/tinci-knowledge-base/

## 关键信息

- 仓库：`shenlang1111/tinci-knowledge-base`（分支 main）
- Token：`.env` 里 `GH_TOKEN=`（GitHub API 通道，国内直连稳定）
- 部署通道：GitHub API（Contents 上传 + POST /pages/builds）；git push 仅备选
- 内容 7 域：表面活性剂 / 日化原料与配方 / 销售与市场 / 会话记录 / 思考收件箱 / 精细化工与扩展 / 工作日志
