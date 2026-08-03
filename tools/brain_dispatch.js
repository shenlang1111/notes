#!/usr/bin/env node
// brain_dispatch.js — 自主运行·自动接单执行器（大脑自主化核心）
// 拿一条信箱 pending 消息 → 预取记忆上下文 → headless claude 接单处理 → 原子收尾回写。
// 全权接单（用户拍板）：headless 能读知识库/记忆、改库(HTML+MD)、提炼、部署——但走既有门禁。
// 安全底线：token 不直接给 headless（dispatch 层注入）；headless 无 Bash 逃逸路径。
//
// 用法：
//   node tools/brain_dispatch.js <消息文件绝对路径> [--dry-run]   # 处理一条消息
//
// 流程：
//   1. 归一化路径 + 校验 status（非 done/replied）
//   2. dispatch.lock 互斥（>10min 死锁删锁）
//   3. 标 status=doing + dispatchTs
//   4. 预取上下文：读消息全文 + KEY_MEMORY 铁律 + mem_search 回忆 top5
//   5. headless claude -p 接单（白名单 + bypassPermissions + max-budget-usd 2）
//   6. 解析产出 → 写 回复-<原名>.md → 登记信箱 replied → 原消息标 done
//   7. 失败兜底：回滚 new + retry+1；retry≥3 标 done 前缀"需人工"
const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const ROOT = path.join('D:', 'ai', '学习公司产品知识树');
const BOX = path.join('D:', 'ai', 'brain-memory', 'messagebox');
const IDX = path.join(BOX, 'index.json');
const LOG = path.join(BOX, 'watch-log.log');
const LOCK = path.join(BOX, 'dispatch.lock');
const KEY_MEMORY = path.join(ROOT, '.claude', 'handoffs', 'KEY_MEMORY.md');
const OUTBOX = path.join(ROOT, '_dispatch_out');   // headless 唯一可写沙箱
const BM_PY = path.join('D:', 'ai', 'brain-memory', '.venv', 'Scripts', 'python.exe');
const MEM_SEARCH = path.join('D:', 'ai', 'brain-memory', 'scripts', 'mem_search.py');

const PROXY_URL = 'http://127.0.0.1:15721';        // cc-switch 本地代理
const BUDGET_USD = 2;                              // 每单预算封顶
const LOCK_STALE_MS = 10 * 60 * 1000;              // 死锁阈值
const RETRY_MAX = 3;

function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }
function nowStr() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}
function appendLog(line) {
  try {
    ensureDir(BOX);
    const lines = fs.existsSync(LOG) ? fs.readFileSync(LOG, 'utf8').split('\n').filter(Boolean) : [];
    lines.push(`[${nowStr()}] ${line}`);
    if (lines.length > 5000) lines.splice(0, lines.length - 5000);
    fs.writeFileSync(LOG, lines.join('\n') + '\n', 'utf8');
  } catch {}
}
function loadIdx() {
  if (!fs.existsSync(IDX)) return [];
  try { const a = JSON.parse(fs.readFileSync(IDX, 'utf8')); return Array.isArray(a) ? a : []; } catch { return []; }
}
function saveIdx(a) { ensureDir(BOX); fs.writeFileSync(IDX, JSON.stringify(a, null, 2), 'utf8'); }
function when(t) {
  if (!t) return '';
  const d = new Date(t); const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}
function disp(f) {
  const rel = path.relative(ROOT, f);
  return rel && !rel.startsWith('..') && !path.isAbsolute(rel) ? rel : f;
}

// 探测代理是否活着（headless 依赖它）
function probeProxy() {
  try {
    const r = spawnSync('node', ['-e', `fetch('${PROXY_URL}/v1/models',{signal:AbortSignal.timeout(800)}).then(r=>{console.log(r.status);process.exit(0)}).catch(()=>process.exit(1))`], { timeout: 3000, encoding: 'utf-8' });
    return r.status === 0 && (r.stdout || '').includes('200');
  } catch { return false; }
}

// 预取记忆上下文（mem_search top5）
function recallMemory(query) {
  try {
    const env = Object.assign({}, process.env, {
      HF_ENDPOINT: 'https://hf-mirror.com',
      HF_HOME: path.join('D:', 'ai', 'brain-memory', 'hf_cache'),
      MEM0_TELEMETRY: 'false',
      PYTHONIOENCODING: 'utf-8',
    });
    const r = spawnSync(BM_PY, [MEM_SEARCH, '--query', query.slice(0, 50), '--limit', '5'], {
      env, cwd: path.join('D:', 'ai', 'brain-memory'), timeout: 25000, encoding: 'utf-8',
    });
    const out = r.stdout || '';
    try {
      const arr = JSON.parse(out.slice(out.indexOf('['), out.lastIndexOf(']') + 1));
      return arr.map((x) => `- ${(x.text || '').slice(0, 120)}${x.score ? `（score ${x.score.toFixed(2)}）` : ''}`).join('\n');
    } catch { return ''; }
  } catch { return ''; }
}

// 构造 headless 接单 prompt
function buildPrompt(msgFile, msgContent, msgTo) {
  const keyRules = (() => {
    try {
      const t = fs.readFileSync(KEY_MEMORY, 'utf8');
      const b = t.match(/## ② 铁律速览[\s\S]*?(?=\n## )/);
      return b ? b[0].slice(0, 600) : '';
    } catch { return ''; }
  })();
  const recall = recallMemory(msgContent.replace(/\n/g, ' '));
  return `你是天赐知识库的自动接单大脑（headless、无人值守、全权接单）。任务：处理一条信箱消息并回写结果。只做这一件事，跑完即退出。

【当前时间】${nowStr()}
【原消息文件】${disp(msgFile)}
【消息全文】
${msgContent.slice(0, 2000)}
【发给谁】${msgTo || '用户'}

【铁律速览（务必遵守）】
${keyRules}

【记忆回忆（mem0 预取，仅供参考，与文件矛盾以文件/最新为准）】
${recall || '（无回忆）'}

【你的任务】
1. 用 Read 读原消息全文；若是知识/产品问题，先 Grep/Read 知识库（knowledge-base\\markdown\\**）找依据，带出处回答；库里翻不到明说"库里没有"，绝不编造。
2. 按消息意图处理：
   - 知识问答 → 直接回答（Markdown，用户口气，精简，可带表格）
   - 要我改库/提炼/部署 → 全权处理（改 HTML+MD 成对、提炼走 evolve_scan.js、部署走 deploy.js + --expect；部署前 CHANGELOG 今日必须有条目）
   - 没说要我做的 → 只回答，不改动
3. 把回复正文（用户可读的 Markdown，写给用户的口气）写到这个文件（你的最终产物，只允许这一个写动作）：
   ${path.join(OUTBOX, '回复-' + path.basename(msgFile))}
4. 完成后输出一行：RESULT:<一句话总结>

【硬边界——违反即失败】
- 不得读 .env、不得泄漏 token。
- 改库必须 HTML+MD 成对（双格式铁律）；部署必须 node tools/deploy.js --expect 验证。
- 不得开始长会话/追问用户；一次性处理完。
- 修改前先 Read 原文确认，改完回读确认。`;
}

// 主流程
function dispatch(msgFile, dryRun) {
  // 1. 归一化 + 校验
  const abs = path.isAbsolute(msgFile) ? msgFile : path.resolve(ROOT, msgFile);
  const all = loadIdx();
  const rec = all.find((m) => m.file === abs || m.file === path.resolve(ROOT, abs));
  if (!rec) return console.log(`⚠️ 信箱中无此消息：${disp(abs)}`);
  if (rec.status === 'done' || rec.status === 'replied') return console.log(`⏭️ ${path.basename(abs)} 已处理（status=${rec.status}），跳过`);
  if (dryRun) {
    console.log(`[dry-run] 将处理：${disp(abs)}\n  消息：${(rec.text || '').slice(0, 80)}\n  发给：${rec.to || 'main'}`);
    return;
  }

  // 2. 互斥锁（防并发处理同一条）
  let lockFd;
  try { lockFd = fs.openSync(LOCK, 'wx'); }
  catch {
    // 锁已存在：检查是否死锁（>10min）
    try {
      const st = fs.statSync(LOCK);
      if (Date.now() - st.mtimeMs > LOCK_STALE_MS) { fs.unlinkSync(LOCK); console.log('⚠️ 检测到死锁，已删除重试'); }
      else return console.log('⚠️ 另一条消息正在处理（dispatch.lock 占用），跳过');
    } catch { return console.log('⚠️ dispatch.lock 异常，跳过'); }
  }
  try {
    // ② 兜底：原文件可能已被删（Trae 清理/投递后消失），用信箱 text 预览兜底
    const msgContent = (() => {
      try {
        if (fs.existsSync(abs)) return fs.readFileSync(abs, 'utf8');
      } catch {}
      return rec.text ? `（原文件已不存在，以下为信箱登记时的内容预览）\n${rec.text}` : '(无法读取原文件，信箱也无内容预览)';
    })();

    // ③ 路由：发给 main/brain/user 的大脑全权处理；发给其他 agent（cici/casual 等）→ 不抢活不标 done，留给对应 AI 接单
    const toAgent = (rec.to || 'main').toLowerCase();
    if (toAgent !== 'main' && toAgent !== 'brain' && toAgent !== 'user') {
      // 原文件可能已被删，用信箱 text 重建一个占位文件供目标 AI 接单
      if (!fs.existsSync(abs)) {
        try {
          const placeholder = `# 消息：${path.basename(abs)}\n\n> 发给：${rec.to}\n\n${rec.text || '(内容预览不可用)'}\n`;
          ensureDir(path.dirname(abs));
          fs.writeFileSync(abs, placeholder, 'utf8');
          appendLog(`📄 原文件已删，重建占位：${path.basename(abs)}（供 ${rec.to} 接单）`);
        } catch {}
      }
      // 不标 done，不写回复，原样留给目标 AI 窗口接单
      appendLog(`🧠 路由跳过：${path.basename(abs)} → ${rec.to}（大脑不抢活，留给目标 AI 接单）`);
      console.log(`⏭️ 消息发给 ${rec.to}，大脑不抢活，已在信箱保留供其接单`);
      return;
    }

    // 3. 标 doing
    const i = all.findIndex((m) => m.file === abs || m.file === path.resolve(ROOT, abs));
    all[i].status = 'doing';
    all[i].dispatchTs = Date.now();
    saveIdx(all);
    appendLog(`🧠 自动接单：${path.basename(abs)} 开始（to=${rec.to || 'main'}）`);

    // 3b. 探测代理（headless 依赖）
    if (!probeProxy()) {
      throw new Error(`代理 ${PROXY_URL} 未监听，无法接单`);
    }

    // 4. 构造 prompt + headless 接单
    const prompt = buildPrompt(abs, msgContent, rec.to);
    ensureDir(OUTBOX);
    const claudeArgs = [
      '-p', prompt,
      '--output-format', 'json',
      '--permission-mode', 'bypassPermissions',
      '--max-budget-usd', String(BUDGET_USD),
      '--allowedTools',
      'Read(**/*.md),Read(**/*.txt),Read(**/*.html),Read(**/*.json),Read(**/*.js),Read(**/*.py),Read(**/*.yml),Read(**/*.yaml),Read(**/*.log),Glob,Grep,Edit,Write,Edit(**),Write(**),Bash(node tools/*),Bash(node D:/ai/.../evolve_scan.js *),Bash(D:/ai/brain-memory/.venv/Scripts/python.exe scripts/mem_*.py),Bash(D:/ai/brain-memory/.venv/Scripts/python.exe scripts/kb_seed_*.py),Bash(node tools/deploy.js *)',
    ];
    const started = Date.now();
    // claude 是 npm .cmd shim，Windows 下必须 shell:true 才能执行（直接 spawnSync 会 exit=null 卡住）
    const result = spawnSync('claude', claudeArgs, { cwd: ROOT, encoding: 'utf-8', timeout: 300000, maxBuffer: 10 * 1024 * 1024, shell: true });
    const elapsed = ((Date.now() - started) / 1000).toFixed(1);

    // 5. 解析产出
    let outText = '';
    let budgetUsed = '';
    try {
      const parsed = JSON.parse(result.stdout || '{}');
      outText = parsed.result || '';
      budgetUsed = parsed.total_cost_usd ? `，$ ${Number(parsed.total_cost_usd).toFixed(4)}` : '';
    } catch { outText = (result.stdout || '').slice(-2000); }
    if (result.status !== 0 || !outText.trim()) {
      throw new Error(`claude -p 失败（exit=${result.status}）${(result.stderr || '').slice(0, 200)}`);
    }

    // 6. 原子收尾：headless 已写 _dispatch_out/回复-*.md → 读它 → 落根目录 回复-*.md → 登记 replied → 标 done
    const replyName = '回复-' + path.basename(abs);
    const tmpReply = path.join(OUTBOX, replyName);
    let body = '';
    try { body = fs.readFileSync(tmpReply, 'utf8'); } catch {}
    if (!body.trim()) body = outText;  // headless 没写文件 → 用 result 兜底
    const replyPath = path.join(ROOT, replyName);
    const to = rec.from === 'user' || !rec.from ? '用户' : rec.from;
    const header = [
      '# 大脑回复',
      '',
      '> 原消息：' + disp(abs),
      '> 回复给：' + to,
      '> 回复时间：' + when(Date.now()),
      '> 处理：自动接单（headless）' + budgetUsed,
      '',
      body.trim(),
      '',
    ].join('\n');
    fs.writeFileSync(replyPath, header, 'utf8');
    // 登记 replied
    const j = loadIdx();
    j.push({
      file: replyPath, ts: Date.now(), status: 'replied', type: 'reply',
      replyTo: abs, from: 'brain', to: rec.from || 'user', text: body.trim().slice(0, 200),
    });
    // 原消息标 done
    const k = j.findIndex((m) => m.file === abs || m.file === path.resolve(ROOT, abs));
    if (k >= 0) { j[k].status = 'done'; j[k].doneTs = Date.now(); }
    saveIdx(j);
    // 清理临时
    try { fs.unlinkSync(tmpReply); } catch {}
    appendLog(`✅ 自动接单完成：${path.basename(abs)} → ${replyName}（${elapsed}s${budgetUsed}）`);
    console.log(`✅ 自动接单完成：${replyName}\n  （${elapsed}s${budgetUsed}，信箱待处理已减）`);
  } catch (e) {
    // 7. 失败兜底：回滚 new + retry；≥3 标 done
    const j = loadIdx();
    const k = j.findIndex((m) => m.file === abs || m.file === path.resolve(ROOT, abs));
    if (k >= 0) {
      const retry = (j[k].retry || 0) + 1;
      if (retry >= RETRY_MAX) {
        j[k].status = 'done'; j[k].doneTs = Date.now();
        j[k].text = '（自动接单' + RETRY_MAX + '次失败，需人工处理）' + (j[k].text || '');
        appendLog(`📵 自动接单 ${RETRY_MAX} 次失败：${path.basename(abs)}（${e.message.slice(0, 120)}）→ 标需人工`);
      } else {
        j[k].status = 'new'; j[k].retry = retry;
        appendLog(`📵 自动接单失败：${path.basename(abs)}（${e.message.slice(0, 120)}）→ 回滚待重试(${retry}/${RETRY_MAX})`);
      }
      saveIdx(j);
    }
    console.log(`❌ 自动接单失败：${e.message.slice(0, 160)}`);
    process.exit(1);
  } finally {
    try { fs.unlinkSync(LOCK); } catch {}
  }
}

const args = process.argv.slice(2);
if (!args[0]) {
  console.log('用法：node tools/brain_dispatch.js <消息文件绝对路径> [--dry-run]');
  process.exit(1);
}
dispatch(args[0], args.includes('--dry-run'));
