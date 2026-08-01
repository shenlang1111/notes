const https = require('https');
const token = process.env.GH_TOKEN || process.argv[2];
if (!token) { console.error('Usage: GH_TOKEN=xxx node tools/trigger_build.js'); process.exit(1); }
const req = https.request({
  hostname: 'api.github.com',
  path: '/repos/shenlang1111/tinci-knowledge-base/pages/builds',
  method: 'POST',
  headers: {
    'Authorization': 'token ' + token,
    'User-Agent': 'node',
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
  }
}, res => {
  let b = '';
  res.on('data', d => b += d);
  res.on('end', () => {
    try {
      const j = JSON.parse(b);
      console.log(res.statusCode, 'status:', j.status, 'commit:', j.commit ? j.commit.slice(0, 7) : 'N/A');
    } catch (e) {
      console.log(res.statusCode, b.slice(0, 300));
    }
  });
});
req.end();
