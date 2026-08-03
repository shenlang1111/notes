# -*- coding: utf-8 -*-
"""
灌库脚本（规则区 + KEY_MEMORY 速查）：把规范核心静态规则与 KEY_MEMORY 章节灌入 mem0（layer=long）
用法：D:\\ai\\brain-memory\\.venv\\Scripts\\python.exe tools/kb_seed_rules.py
      --dry 只预览不写入
      --fix 删旧写新（先按 source 清旧再写，状态保鲜用）
      --key-memory 只灌 KEY_MEMORY 章节（分层阅读层2 状态保鲜：改 KEY_MEMORY/交接后重跑，保持库=文件）
原则：一条规则一节记忆（语义检索精准）；默认追加式灌 RULES；--fix 可清旧重灌
"""
import argparse, sys
sys.path.insert(0, r"D:\ai\brain-memory\scripts")
from mem_config import get_memory

AGENT_ID = "main-ai"
KEY_MEMORY_PATH = r"D:\ai\学习公司产品知识树\.claude\handoffs\KEY_MEMORY.md"

RULES = [
    ("角色定位", "天赐日化知识库 AI 团队：主 AI（统筹/审批/大改动）+ 闲聊 AI + 智能体 AI + 日志 AI + UI 美化 AI + Claude Code 主大脑/技术验证员；用户是天赐日化销售，系统学表面活性剂，要专业不要'懂你'，说中文，数据必须核实标来源"),
    ("铁律0-收尾门禁DoD", "铁律 0：宣布'完成'前必须展示 DoD 自检清单（CHANGELOG/双格式/部署/--expect/记忆已沉淀），无清单=未完成，用户可直接判定"),
    ("铁律1-双格式分级", "铁律 1：双格式分级——用户看页（知识/经验/日志/机制/任务板）HTML+MD 成对（硬门禁，DoD 必过）；AI 看页（ai-worklog 等）可只写 MD，成对校验仅告警不阻断"),
    ("铁律2-改动分级", "铁律 2：改动分级——小改动各 AI 自理；大改动（分区/registry/导航/样式/tools/跨页/部署机制）仅主 AI"),
    ("铁律3-部署", "铁律 3：部署一律 node tools/deploy.js，必带 --expect '文件:关键词' 验证本次修改上线；主 AI 及各主窗口 AI 有部署权；大脑体系子 AI（Claude Code 主大脑/验证员）只有专业报告可部署上线，其余产出无部署权限（2026-08-03 用户拍板，见规范三-7）"),
    ("铁律4-内容去向", "铁律 4：内容去向——闲聊/半成品→思考收件箱；成经验→会话记录；默认追加不新建页；会话档案区：全员可查、并入会话记录、换话题自动提炼（2026-08-03 拍板）"),
    ("铁律5-响应四问", "铁律 5：响应四问——理解了吗/讨论还是执行/读了吗/谁拍板，每次回复前必答"),
    ("铁律6-并行分派", "铁律 6：并行分派——≥3 个独立文件默认拆子代理；同一文件必须串行（并行会互相覆盖，改完必回读）"),
    ("铁律7-唤醒识别", "铁律 7：唤醒识别——用户提'别处/其他 AI/最近修改'→先按 LastWriteTime 扫共享文件夹，不说看不到"),
    ("铁律8-机制变更先审批", "铁律 8：机制变更先审批——tools/ 脚本、新机制、工具类变更→报主 AI 审批获批再执行"),
    ("铁律9-记忆入库防失忆", "铁律 9：记忆入库防失忆——干完活必写库 mem_add、开工/压缩后必查库 mem_search + 读 KEY_MEMORY 一页纸；部署前 CHANGELOG 今日必须有条目；改完必回读实际文件"),
    ("分层阅读4层开工", "分层阅读 4 层开工（2026-08-03 用户拍板，库优先/文件兜底）：层1 记忆库 mem0=知识/规则/经验/决策默认先查；层2 KEY_MEMORY=命令/决策速查保确定性；层3 交接+任务板=身份/当前状态；层4 CHANGELOG=最近进展；新 AI 开工只读这 4 处"),
    ("关键命令-部署", "关键命令（部署）：node tools/deploy.js --files <文件清单> --expect '文件路径:关键词'；只部署 node tools/deploy.js --files 路径（自动带 mobile.html）；重新生成手机版 node tools/build_mobile.js"),
    ("关键命令-记忆", "关键命令（记忆）：写记忆 D:\\ai\\brain-memory\\.venv\\Scripts\\python.exe scripts/mem_add.py --text '一句结论' --agent main --layer long（纠错加 --fix-target）；读记忆 scripts/mem_search.py --query '关键词' --limit 3；压缩统一用带参数 /compact 保留任务状态/关键决策/下一步"),
    ("必记三清单", "记忆必记三清单（2026-08-03 用户拍板）：①用户拍板的决策/结论（最高优先级必存）②用户原话③纠错教训——话题聊完/干完活出现这三类就自动 mem_add，不等提醒，攒 1-2 个话题一条，不碎碎念"),
    ("双入口模型", "知识库运作双入口（2026-08-03 用户拍板）：静态规则读快照（确定性全文）+ mem0 记忆库回忆（跨会话经验）；知识/规则/记忆问题先 mem_search 数据库（带出处），查不到再翻文件；文件保留为源"),
    ("fanku 边界", "fanku 翻库边界：知识类问题（产品/机理/配方/数据/市场）必先查库再答；闲聊/讨论/治理类不翻；口诀：先翻库再开口、带出处不编造、翻不到说没有"),
    ("数字真相", "数字真相：知识库 7 域 35 页（HTML/MD 双格式，以 registry.json 实测为准）；线上站 shenlang1111.github.io/tinci-knowledge-base；部署走 GitHub API，Token 在 .env；检索大脑 D:\\ai\\deep-memory（索引条数以检索实测为准，勿写死）；记忆大脑 D:\\ai\\brain-memory（mem0）"),
    ("规则修订体系", "规则修订体系（规范十·四，2026-08-03 用户拍板）：规则文档发现问题有闭环——发现（任何 AI 撞到矛盾/用户指出/审核发现）→登记（思考收件箱 规则问题-<日期>.md，一句话记完即完成，只登记不抢改）→评估（主 AI 积满 3 条或每周统一处理）→拍板（权限/大方向用户定，纯文字修正主 AI 直接改）→修改+同步（CHANGELOG/部署/重灌记忆库/广播）→验证（十·三抽查一致性）；改权在主 AI"),
]


def read_key_memory_sections(path=KEY_MEMORY_PATH):
    """读 KEY_MEMORY.md，按 ## 章节切分（跳过⑨快照区），返回 [(title, body)]"""
    with open(path, encoding="utf-8") as f:
        lines = f.read().splitlines()
    sections = []
    cur = None
    for ln in lines:
        if ln.startswith("## "):
            if cur and cur[1].strip():
                sections.append(cur)
            title = ln[3:].strip()
            cur = None if title.startswith("⑨") else [title, ""]
        elif cur is not None:
            s = ln.strip()
            if s and not s.startswith("<!--") and not s.startswith(">"):
                cur[1] += s + " "
    if cur and cur[1].strip():
        sections.append(cur)
    return sections


def delete_by_source(mem, source):
    """删旧：按 source 语义检索后精确匹配 metadata.source 删除"""
    r = mem.search(source, top_k=100, filters={"user_id": "tinci", "agent_id": AGENT_ID})
    results = r.get("results", []) if isinstance(r, dict) else r
    n = 0
    for it in results:
        if (it.get("metadata") or {}).get("source") == source:
            mem.delete(memory_id=it["id"])
            n += 1
    return n


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--dry", action="store_true", help="只预览不写入")
    p.add_argument("--fix", action="store_true", help="删旧写新（先按 source 清旧再写）")
    p.add_argument("--key-memory", action="store_true", help="只灌 KEY_MEMORY 章节（默认只灌 RULES）")
    a = p.parse_args()
    mem = get_memory("brain_memory")

    if a.key_memory:
        sections = read_key_memory_sections()
        if a.fix:
            n = delete_by_source(mem, "KEY_MEMORY")
            print("deleted old KEY_MEMORY:", n)
        for title, body in sections:
            full = "[KEY_MEMORY·" + title + "] " + body.strip()
            if a.dry:
                print(full[:80])
                continue
            mem.add(full, infer=False, user_id="tinci", agent_id=AGENT_ID,
                    metadata={"layer": "long", "source": "KEY_MEMORY"})
            print("added:", title)
        print("DONE KEY_MEMORY", len(sections), "节")
        return

    if a.fix:
        n = delete_by_source(mem, "main-rules")
        print("deleted old main-rules:", n)
    for title, text in RULES:
        full = "[规则] " + title + "：" + text
        if a.dry:
            print(full[:80])
            continue
        mem.add(full, infer=False, user_id="tinci", agent_id=AGENT_ID,
                metadata={"layer": "long", "source": "main-rules"})
        print("added:", title)
    print("DONE", len(RULES), "条")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
