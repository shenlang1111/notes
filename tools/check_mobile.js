const fs = require('fs');
const c = fs.readFileSync('knowledge-base/mobile.html', 'utf8');
console.log('size KB:', (c.length / 1024).toFixed(1));
console.log('has <style>:', c.includes('<style>'));
console.log('has v3 css:', c.includes('Shared Styles v3'));
console.log('panels:', (c.match(/id="panel-/g) || []).length);
console.log('nav links:', (c.match(/data-nav=/g) || []).length);
