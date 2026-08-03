/**
 * deploy.js — 一键部署脚本（主 agent 维护，所有 agent 均可调用）
 *
 * 流程：
 *   1. 读取 Token（环境变量 GH_TOKEN → 项目根目录 .env）
 *   2. 校验 HTML / Markdown 成对（警告不阻断）
 *   3. 重新生成 mobile.html（绑定生成，确保手机版同步）
 *   4. 上传文件（默认全量，可用 --files 指定；带线上 sha，409 冲突即报告）
 *   5. 触发 GitHub Pages 构建
 *   6. 轮询直到 status = built
 *   7. 服务器端验证（线上 mobile.html 关键标记 + 大小）
 *
 * 用法：
 *   node tools/deploy.js                          # 全量部署
 *   node tools/deploy.js --files a.html b.html    # 指定文件（自动附带 mobile.html）
 *
 * 说明：
 *   - 部署前会先拉取每个文件的线上 sha；若线上已被其他会话修改（PUT 返回 409），
 *     该文件会被跳过并报告，由主 agent 协调，避免互相覆盖。
 *   - Token 不要写进任何被 git 跟踪的文件。
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const KB = path.join(ROOT, 'knowledge-base');
const REPO = 'shenlang1111/tinci-knowledge-base';
const BRANCH = 'main';
const CONCURRENCY = 1; // 串行上传：并发写同一仓库会触发 GitHub git 层 409 保护

// ---------- 1. Token ----------
function loadToken() {
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN.trim();
  const envFile = path.join(ROOT, '.env');
  if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*GH_TOKEN\s*=\s*(.+?)\s*$/);
      if (m && m[1]) return m[1].trim();
    }
  }
  console.error('❌ 未找到 GitHub Token：设置环境变量 GH_TOKEN，或在项目根目录创建 .env 文件（GH_TOKEN=xxx）');
  process.exit(1);
}

// ---------- 2. GitHub API ----------
async function api(method, urlPath, token, body) {
  const res = await fetch('https://api.github.com' + urlPath, {
    method,
    headers: {
      'Authorization': 'token ' + token,
      'User-Agent': 'trae-deploy',
      'Accept': 'application/vnd.github+json',
      ...(body ? { 'Content-Type': 'application/json' } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch (e) { /* 非 JSON */ }
  return { status: res.status, json, raw: text };
}

async function getSha(relPath, token) {
  const p = '/repos/' + REPO + '/contents/' + encodeURI(relPath);
  const r = await api('GET', p, token);
  if (r.status === 404) return null; // 线上不存在 → 将新建
  if (r.status !== 200) throw new Error('获取线上 sha 失败 ' + relPath + ' status=' + r.status);
  return r.json.sha;
}

async function putFile(relPath, localFile, token) {
  const content = fs.readFileSync(localFile).toString('base64');
  let sha;
  try { sha = await getSha(relPath, token); }
  catch (e) { return { file: relPath, ok: false, reason: e.message }; }
  const body = { message: 'deploy: update ' + relPath, content, branch: BRANCH };
  if (sha) body.sha = sha;
  const p = '/repos/' + REPO + '/contents/' + encodeURI(relPath);
  const r = await api('PUT', p, token, body);
  if (r.status === 409) {
    const msg = (r.json && r.json.message) || '';
    return { file: relPath, ok: false, reason: '409: ' + msg + '（线上可能被并发修改，跳过，需主 agent 协调）' };
  }
  if (r.status !== 200 && r.status !== 201) {
    return { file: relPath, ok: false, reason: 'status=' + r.status + ' ' + r.raw.slice(0, 200) };
  }
  return { file: relPath, ok: true, size: fs.statSync(localFile).size };
}

// ---------- 3. HTML/MD 成对校验 ----------
function checkPairs() {
  const warns = [];
  const domainsDir = path.join(KB, 'domains');
  const mdDir = path.join(KB, 'markdown');
  // AI 看页豁免：只写 MD 也允许（铁律 1 双格式分级，2026-08-03 机制瘦身）
  const MD_ONLY_EXEMPT = ['ai-worklog.md', 'session-prompt-d.md'];
  if (!fs.existsSync(domainsDir) || !fs.existsSync(mdDir)) return warns;
  for (const domain of fs.readdirSync(domainsDir)) {
    const d = path.join(domainsDir, domain);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d)) {
      if (!f.endsWith('.html')) continue;
      if (!fs.existsSync(path.join(mdDir, domain, f.replace('.html', '.md'))))
        warns.push('HTML 无对应 MD: ' + domain + '/' + f);
    }
  }
  for (const domain of fs.readdirSync(mdDir)) {
    const d = path.join(mdDir, domain);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d)) {
      if (!f.endsWith('.md')) continue;
      if (MD_ONLY_EXEMPT.includes(f)) continue;
      if (!fs.existsSync(path.join(domainsDir, domain, f.replace('.md', '.html'))))
        warns.push('MD 无对应 HTML: ' + domain + '/' + f);
    }
  }
  return warns;
}

// ---------- 4. 文件收集 ----------
function collectFiles(only) {
  const files = [];
  if (only) {
    for (const f of only) files.push({ rel: f.replace(/^\.?\//, ''), local: path.join(ROOT, f.replace(/^\.?\//, '')) });
    // 自动附带 mobile.html，防止指定文件部署时手机版不同步
    const mrel = 'knowledge-base/mobile.html';
    if (!files.some(f => f.rel === mrel)) files.push({ rel: mrel, local: path.join(KB, 'mobile.html') });
  } else {
    files.push({ rel: 'index.html', local: path.join(ROOT, 'index.html') });
    const walk = (dir, prefix) => {
      for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        const rel = prefix + f;
        if (fs.statSync(full).isDirectory()) walk(full, rel + '/');
        else if (f === '_preview_server.js') { /* 本地预览工具，不部署 */ }
        else if (/\.(html|md|json|css|js)$/.test(f)) files.push({ rel: rel, local: full });
      }
    };
    walk(KB, 'knowledge-base/');
  }
  return files;
}

// ---------- 5. 构建触发与轮询 ----------
async function triggerBuild(token) {
  const r = await api('POST', '/repos/' + REPO + '/pages/builds', token);
  if (r.status === 409) {
    console.log('⏳ 线上已有构建排队/进行中（409），改为等待现有构建完成 ...');
    return { created_at: new Date().toISOString() };
  }
  if (r.status !== 201 && r.status !== 200) throw new Error('触发构建失败 status=' + r.status + ' ' + r.raw.slice(0, 200));
  console.log('⏳ 构建已排队');
  return r.json;
}

async function waitBuild(token, triggeredAt, timeoutMs = 360000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const r = await api('GET', '/repos/' + REPO + '/pages/builds/latest', token);
    const b = r.json;
    const s = b && b.status;
    const created = b && b.created_at;
    // 竞态防护：latest 可能还是触发前的旧构建，等到新构建记录出现
    if (created && triggeredAt && created < triggeredAt) {
      await new Promise(res => setTimeout(res, 15000));
      continue;
    }
    if (s === 'built') return b;
    if (s === 'errored') throw new Error('构建出错: ' + ((b && b.error && b.error.message) || '未知'));
    await new Promise(res => setTimeout(res, 15000));
  }
  throw new Error('构建超时（' + Math.round(timeoutMs / 1000) + 's）');
}

// ---------- 6. 服务器端验证 ----------
async function verify(token, expectList) {
  console.log('🔍 服务器端验证 ...');
  const p = '/repos/' + REPO + '/contents/' + encodeURI('knowledge-base/mobile.html');
  const r = await api('GET', p, token);
  if (r.status !== 200) { console.error('⚠️ 无法拉取线上 mobile.html: status=' + r.status); return; }
  const txt = Buffer.from(r.json.content.replace(/\s/g, ''), 'base64').toString('utf8');
  const footerCnt = (txt.match(/天赐材料日化知识库 · 基于/g) || []).length; // 旧 footer 专有文案，正文不会出现
  const panelCnt = (txt.match(/class="page-panel"/g) || []).length;
  const size = r.json.size;
  console.log('  ✅ 线上 mobile.html 大小: ' + size + ' B');
  console.log('  ✅ footer 旧文案次数: ' + footerCnt + (footerCnt === 0 ? '（通过）' : '（异常！') + '）');
  console.log('  ✅ 面板数量: ' + panelCnt + '（首页+内容页）');
  if (footerCnt !== 0) console.error('  ❌ 验证失败：footer 旧文案仍存在，请检查');
  // 本次修改内容验证（--expect "文件路径:关键词"，可多个）
  if (expectList && expectList.length) {
    for (const e of expectList) {
      const sep = e.indexOf(':');
      if (sep < 0) { console.error('  ⚠️ --expect 格式应为 "文件路径:关键词"：' + e); continue; }
      const rel = e.slice(0, sep);
      const kw = e.slice(sep + 1);
      const rp = '/repos/' + REPO + '/contents/' + encodeURI(rel);
      const rr = await api('GET', rp, token);
      let ok = false;
      if (rr.status === 200) {
        const t = Buffer.from(rr.json.content.replace(/\s/g, ''), 'base64').toString('utf8');
        // 关键词匹配：双方统一去空白，避免换行/缩进不一致导致的误报
        const tNorm = t.replace(/\s+/g, '');
        const kwNorm = kw.replace(/\s+/g, '');
        ok = tNorm.includes(kwNorm);
      } else if (rr.status === 404) {
        console.error('  ⚠️ 路径不存在（404）：' + rel + '，请检查路径/大小写');
      }
      console.log((ok ? '  ✅' : '  ❌') + ' 本次修改已上线: ' + rel + ' 含「' + kw + '」');
      if (!ok) console.error('    ⚠️ 关键词未在线上匹配，请人工核实（可能为空白差异，已统一去空白）');
    }
  }
}

// ---------- 主流程 ----------
// 严格解析命令行 flag：--files <列表> 与 --expect <列表>，
// 遇到下一个 -- 开头的参数即停止收集，避免两个 flag 互相吞参数
function parseFlags(args) {
  const out = { files: null, expect: [] };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--files') {
      out.files = [];
      while (i + 1 < args.length && !args[i + 1].startsWith('--')) out.files.push(args[++i]);
    } else if (args[i] === '--expect') {
      while (i + 1 < args.length && !args[i + 1].startsWith('--')) out.expect.push(args[++i]);
    }
  }
  return out;
}

// ---------- 0.5 CHANGELOG 门禁（DoD 强制：改必登记，不登记拒绝部署） ----------
function checkChangelogToday() {
  const clPath = path.join(ROOT, 'CHANGELOG.md');
  if (!fs.existsSync(clPath)) {
    console.error('❌ CHANGELOG.md 不存在，拒绝部署（DoD：任何修改必须先登记再部署）');
    process.exit(1);
  }
  const txt = fs.readFileSync(clPath, 'utf8');
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const today = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  if (!txt.includes('| ' + today + ' |')) {
    console.error('❌ CHANGELOG 门禁未过：今日（' + today + '）无登记条目，拒绝部署。');
    console.error('   请在 CHANGELOG.md 顶部表格登记本次修改（日期 + 主题 + 修改内容 + 涉及文件），再重新部署。');
    process.exit(1);
  }
  console.log('✅ CHANGELOG 门禁通过（今日已登记）');
}

async function main() {
  const args = process.argv.slice(2);
  const parsed = parseFlags(args);
  const only = parsed.files;
  const expectList = parsed.expect;
  const token = loadToken();

  // 0. 成对校验
  const warns = checkPairs();
  if (warns.length) {
    console.warn('⚠️ 双格式成对校验警告（不阻断部署，请确认）：');
    warns.forEach(w => console.warn('  · ' + w));
  } else {
    console.log('✅ 双格式成对校验通过');
  }

  // 0.5 CHANGELOG 门禁（强制登记，不登记拒绝部署）
  checkChangelogToday();

  // 1. 重新生成 mobile.html
  console.log('🔄 重新生成 mobile.html ...');
  execSync('node tools/build_mobile.js', { cwd: ROOT, stdio: 'inherit' });

  // 2. 收集文件
  const files = collectFiles(only);
  console.log('📦 待上传 ' + files.length + ' 个文件');

  // 3. 串行上传（并发写同一仓库会触发 git 层 409）
  const results = [];
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    const rs = await Promise.all(batch.map(f => putFile(f.rel, f.local, token)));
    for (const r of rs) {
      results.push(r);
      console.log((r.ok ? '  ✅' : '  ❌') + ' ' + r.file + (r.ok ? ' (' + r.size + ' B)' : ' — ' + r.reason));
    }
  }
  const failed = results.filter(r => !r.ok);
  if (failed.length) {
    console.error('❌ ' + failed.length + ' 个文件上传失败，中止部署：');
    failed.forEach(f => console.error('  · ' + f.file + ' — ' + f.reason));
    process.exit(1);
  }

  // 4-5. 触发构建 + 轮询
  const build = await triggerBuild(token);
  const b = await waitBuild(token, build.created_at);
  console.log('✅ 构建完成: ' + b.status);

  // 6. 验证（通用检查 + 本次修改内容验证）
  await verify(token, expectList);
  console.log('🎉 部署完成，可通知用户验证。');
}

main().catch(e => { console.error('❌ 部署失败: ' + e.message); process.exit(1); });
