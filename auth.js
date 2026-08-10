// auth.js — 全站访问登录（哈希校验，不存明文）
// 密码不落明文：前端只存 SHA-256 哈希，用户输入时现场哈希比对。
(function () {
  // 改密码：node -e "console.log(require('crypto').createHash('sha256').update('新密码').digest('hex'))" 算新哈希，
  // 同步改本行 HASH + _运行/build_search_index.js 的 INDEX_KEY_HASH + _运行/encrypt_html.js 的 KEY_HASH（三处必须一致），改完重新部署
  var HASH = '97d6d48ca992c23d224e23f8b8dec5dc1e228192fc37618325c321f1eb6874bd';
  var FLAG = HASH.slice(0, 8); // 登录标志（哈希片段，F12 改成 '1' 无效）

  function hexToBytes(hex) {
    var u8 = new Uint8Array(hex.length / 2);
    for (var i = 0; i < u8.length; i++) u8[i] = parseInt(hex.substr(i * 2, 2), 16);
    return u8;
  }
  // 搜索索引解密密钥 = 密码哈希（仅登录后写入内存，不落 localStorage）
  var INDEX_KEY = hexToBytes(HASH);

  // 解密渲染正文：密文在 <main> 内 #tinci-content[data-enc]，格式 iv(12)+ciphertext+tag(16) base64
  function renderMain() {
    var box = document.getElementById('tinci-content');
    if (!box) return;
    var enc = box.getAttribute('data-enc');
    if (!enc) return;
    try {
      var bin = atob(enc);
      var u8 = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      crypto.subtle.decrypt({ name: 'AES-GCM', iv: u8.slice(0, 12) }, window.__TINCI_INDEX_KEY, u8.slice(12))
        .then(function (buf) { box.innerHTML = new TextDecoder().decode(buf); })
        .catch(function () {});
    } catch (e) {}
  }
  function renderMainWhenReady() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderMain);
    } else {
      renderMain();
    }
  }

  // 登录通过后：把密码哈希 importKey 成 CryptoKey 写入内存（WebCrypto 要求 key 必须是 CryptoKey，
  // site.js 搜索解密共用同一变量——2026-08-10 复核发现旧代码直接传 Uint8Array 导致解密必失败，一并修复）
  function unlockContent(after) {
    if (window.__TINCI_INDEX_KEY) { if (after) after(); return; }
    crypto.subtle.importKey('raw', INDEX_KEY, 'AES-GCM', false, ['decrypt']).then(function (k) {
      window.__TINCI_INDEX_KEY = k;
      if (after) after();
    }).catch(function () {});
  }

  if (sessionStorage.getItem('tinci_auth_ok') === FLAG) {
    unlockContent(renderMainWhenReady);
    return;
  }

  var CSS = '' +
    '#tinci-login-mask{position:fixed;inset:0;z-index:99999;background:rgba(10,20,35,.82);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;}' +
    '#tinci-login-box{width:min(88vw,360px);background:#fff;border-radius:16px;padding:32px 28px 26px;box-shadow:0 20px 60px rgba(0,0,0,.35);color:#1a2433;}' +
    '#tinci-login-box h2{margin:0 0 6px;font-size:20px;font-weight:700;}' +
    '#tinci-login-box p{margin:0 0 20px;font-size:13px;color:#6b7686;}' +
    '#tinci-pw{width:100%;box-sizing:border-box;padding:12px 14px;border:1.5px solid #d7dde6;border-radius:10px;font-size:15px;outline:none;transition:border-color .15s;}' +
    '#tinci-pw:focus{border-color:#0e7490;}' +
    '#tinci-btn{display:block;width:100%;margin-top:14px;padding:12px;border:none;border-radius:10px;background:#0e7490;color:#fff;font-size:15px;font-weight:600;cursor:pointer;}' +
    '#tinci-btn:hover{background:#155e75;}' +
    '#tinci-err{margin-top:10px;font-size:13px;color:#dc2626;min-height:18px;text-align:center;}' +
    '.dark #tinci-login-box{background:#0f172a;color:#e2e8f0;}' +
    '.dark #tinci-login-box p{color:#94a3b8;}' +
    '.dark #tinci-pw{background:#1e293b;border-color:#334155;color:#e2e8f0;}';

  function build() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var mask = document.createElement('div');
    mask.id = 'tinci-login-mask';
    mask.innerHTML =
      '<div id="tinci-login-box">' +
      '<h2>个人知识库</h2>' +
      '<p>请输入访问密码</p>' +
      '<input type="password" id="tinci-pw" placeholder="密码" autocomplete="off">' +
      '<button id="tinci-btn">进入</button>' +
      '<div id="tinci-err"></div>' +
      '</div>';
    document.body.appendChild(mask);

    var input = document.getElementById('tinci-pw');
    var err = document.getElementById('tinci-err');

    function check() {
      var v = input.value;
      if (!v) { err.textContent = '请输入密码'; return; }
      if (!window.crypto || !crypto.subtle) {
        err.textContent = '当前环境不支持加密校验，请用 HTTPS 打开';
        return;
      }
      crypto.subtle.digest('SHA-256', new TextEncoder().encode(v)).then(function (buf) {
        var hex = Array.prototype.map.call(new Uint8Array(buf), function (b) {
          return ('0' + b.toString(16)).slice(-2);
        }).join('');
        if (hex === HASH) {
          sessionStorage.setItem('tinci_auth_ok', FLAG); // 标志存哈希片段
          mask.remove();
          unlockContent(renderMain); // 生成 CryptoKey 后解密渲染正文
        } else {
          err.textContent = '密码不对，再试一次';
          input.value = '';
          input.focus();
        }
      }).catch(function () { err.textContent = '校验失败，请重试'; });
    }

    document.getElementById('tinci-btn').addEventListener('click', check);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
    setTimeout(function () { input.focus(); }, 50);
  }

  if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
})();
