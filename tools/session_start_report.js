#!/usr/bin/env node
// SessionStart hook 报告：开窗即自动瘦启动
// 只读不改：输出"我是谁 + 任务板待办 + 机制更新"+ 纪律提醒。不自动改任何文件。
// 触发：.claude/settings.json 的 SessionStart hook
const fs = require('fs');
const path = require('path');

const KB = path.join(__dirname, '..', 'knowledge-base');
const INBOX = path.join(KB, 'domains', '思考收件箱');
const L = (p) => path.join(INBOX, p);

// 1) 身份
let identity = '智能体 AI（Claude Code）· 重活执行引擎';

// 2) 任务板待办：只认状态为"🆕 待认领"的完整行
let todo = [];
const boardFile = L('team-task-board.html');
if (fs.existsSync(boardFile)) {
  const txt = fs.readFileSync(boardFile, 'utf8');
  const rows = txt.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) || [];
  for (const r of rows) {
    if (r.includes('🆕 待认领') && !r.includes('✅ 已完成')) {
      const cells = r.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
      if (cells) todo.push(cells.replace(/^\s*待认领\s*/, ''));
    }
  }
}

// 3) 机制更新条数
let mechCount = '?';
const mechFile = L('mechanism-updates.html');
if (fs.existsSync(mechFile)) {
  const txt = fs.readFileSync(mechFile, 'utf8');
  const m = txt.match(/>2026-[\d-]+</g);
  mechCount = m ? String(m.length) : '0';
}

// 4) 关键记忆速查表读回（防压缩失忆：开窗强制喂回）
const KEY_MEMORY = path.join(__dirname, '..', '.claude', 'handoffs', 'KEY_MEMORY.md');
let kmLines = [];
if (fs.existsSync(KEY_MEMORY)) {
  const txt = fs.readFileSync(KEY_MEMORY, 'utf8');
  // 决策区（第五部分）前 2 条
  const dec = txt.match(/^- 2026-[\d-]+ .+$/gm) || [];
  dec.slice(0, 2).forEach((x) => kmLines.push('  · 决策: ' + x.replace(/^- /, '').slice(0, 80)));
  // 快照时间戳（第六部分标记区内首行）
  const snap = txt.match(/快照时间：[\s\S]*?(?=\n>)/);
  if (snap) kmLines.push('  快照: ' + snap[0].replace('> 快照时间：', ''));
}

const lines = [
  '=== 会话启动报告（自动） ===',
  '身份: ' + identity,
];
if (todo.length) {
  lines.push('任务板待认领 (' + todo.length + ' 项):');
  todo.slice(0, 3).forEach((t) => lines.push('  · ' + t.slice(0, 90)));
} else {
  lines.push('任务板: 暂无 🆕 待认领');
}
lines.push('机制更新: ' + mechCount + ' 条（读 mechanism-updates 页）');
lines.push('纪律: 知识问题先翻库（fanku）· 干完活登记 ai-worklog · 改库登记 CHANGELOG · 双格式成对 · 部署走 deploy.js');
if (kmLines.length) {
  lines.push('关键记忆速查表（KEY_MEMORY.md，压缩后必读全文）:');
  kmLines.forEach((l) => lines.push(l));
} else {
  lines.push('关键记忆速查表: 未找到（.claude/handoffs/KEY_MEMORY.md 缺失）');
}
lines.push('=== 报告结束 ===');
console.log(lines.join('\n'));
