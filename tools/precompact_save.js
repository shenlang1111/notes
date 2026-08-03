#!/usr/bin/env node
// PreCompact hook 脚本：压缩前强制把"进行中状态"落盘到 KEY_MEMORY.md
// 触发：.claude/settings.json 的 PreCompact hook（也可手动运行 node tools/precompact_save.js）
// 原则：纯机械、无 AI 参与、只写 KEY_MEMORY.md 的 SNAPSHOT 标记区，不碰其他文件
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const KB = path.join(ROOT, 'knowledge-base');
const INBOX = path.join(KB, 'domains', '思考收件箱');
const KEY_MEMORY = path.join(ROOT, '.claude', 'handoffs', 'KEY_MEMORY.md');
const CHANGELOG = path.join(ROOT, 'CHANGELOG.md');

// 本地时间戳（CHANGELOG 用本地日期，勿用 toISOString 的 UTC）
const d = new Date();
const pad = (n) => String(n).padStart(2, '0');
const ts = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
const today = ts.slice(0, 10);

// 1) 任务板：待认领 + 进行中
const pending = [];
const boardFile = path.join(INBOX, 'team-task-board.html');
if (fs.existsSync(boardFile)) {
  const txt = fs.readFileSync(boardFile, 'utf8');
  const rows = txt.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) || [];
  for (const r of rows) {
    const status = r.includes('🆕 待认领') ? '待认领' : r.includes('🔧 进行中') ? '进行中' : null;
    if (!status) continue;
    const cells = r.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
    if (cells) pending.push(`[${status}] ` + cells.replace(/^\s*(待认领|进行中)\s*/, '').slice(0, 140));
  }
}

// 2) CHANGELOG 最新一条
let latestLog = '（无记录）';
if (fs.existsSync(CHANGELOG)) {
  const lines = fs.readFileSync(CHANGELOG, 'utf8').split('\n');
  const row = lines.find((l) => l.startsWith('| ' + today) || l.match(/^\|\s*20\d\d-\d\d-\d\d/));
  if (row) latestLog = row.split('|').map((s) => s.trim()).filter(Boolean).slice(1, 3).join(' | ').slice(0, 160);
}

// 3) 机制更新条数
let mechCount = '0';
const mechFile = path.join(INBOX, 'mechanism-updates.html');
if (fs.existsSync(mechFile)) {
  const m = fs.readFileSync(mechFile, 'utf8').match(/>2026-[\d-]+</g);
  mechCount = m ? String(m.length) : '0';
}

// 组装快照
const snapshot = [
  `> 快照时间：${ts}（PreCompact 自动生成，勿手改此区）`,
  `> 任务板进行中/待认领（${pending.length}）：`,
  ...(pending.length ? pending.map((p) => '>  · ' + p) : ['>  · （无）']),
  `> CHANGELOG 最新：${latestLog}`,
  `> 机制更新：${mechCount} 条`,
  `> 压缩后第一件事：读 KEY_MEMORY.md 全文 + 任务板确认最新状态，再答用户「你还记得什么」`,
].join('\n');

// 写入标记区（不存在则跳过，不报错）
if (fs.existsSync(KEY_MEMORY)) {
  let doc = fs.readFileSync(KEY_MEMORY, 'utf8');
  const re = /<!-- SNAPSHOT_BEGIN -->[\s\S]*?<!-- SNAPSHOT_END -->/;
  if (re.test(doc)) {
    doc = doc.replace(re, '<!-- SNAPSHOT_BEGIN -->\n' + snapshot + '\n<!-- SNAPSHOT_END -->');
    fs.writeFileSync(KEY_MEMORY, doc, 'utf8');
    console.log('✅ 压缩前快照已写入 KEY_MEMORY.md（' + ts + '）');
  } else {
    console.log('⚠️ KEY_MEMORY.md 缺少 SNAPSHOT 标记区，跳过（不影响部署）');
  }
} else {
  console.log('⚠️ 未找到 KEY_MEMORY.md，跳过（不影响部署）');
}
