const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const NAV_PATH = path.join(__dirname, '..', 'data', 'nav.json');
const ICON_DIR = path.join(__dirname, '..', 'icons');

function fetchImage(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout: 5000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchImage(res.headers.location).then(resolve).catch(reject);
        return;
      }
      if (!res.statusCode || res.statusCode >= 400) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const ct = res.headers['content-type'] || '';
      if (!ct.startsWith('image/')) { reject(new Error('not image')); return; }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ data: Buffer.concat(chunks), type: ct }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function hashUrl(url) {
  let h = 0;
  for (let i = 0; i < url.length; i++) {
    h = ((h << 5) - h + url.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

async function main() {
  if (!fs.existsSync(ICON_DIR)) fs.mkdirSync(ICON_DIR, { recursive: true });

  const nav = JSON.parse(fs.readFileSync(NAV_PATH, 'utf-8'));
  const allSites = nav.groups.flatMap(g => g.sites);
  const extMap = {
    'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif',
    'image/x-icon': 'ico', 'image/vnd.microsoft.icon': 'ico',
  };

  let cached = 0, skipped = 0;

  for (const site of allSites) {
    const hostname = new URL(site.url).hostname;
    const candidates = [
      `https://${hostname}/favicon.ico`,
      `https://${hostname}/favicon.png`,
      `https://${hostname}/apple-touch-icon.png`,
    ];

    let found = false;
    for (const url of candidates) {
      const hash = hashUrl(site.url);
      const existing = fs.readdirSync(ICON_DIR).find(f => f.startsWith(hash));
      if (existing) { skipped++; found = true; break; }

      try {
        const { data, type } = await fetchImage(url);
        const ext = extMap[type] || 'ico';
        fs.writeFileSync(path.join(ICON_DIR, `${hash}.${ext}`), data);
        console.log(`✅ ${site.title} → ${hash}.${ext} (${(data.length/1024).toFixed(1)}KB)`);
        cached++;
        found = true;
        break;
      } catch (e) { /* try next */ }
    }
    if (!found) console.log(`❌ ${site.title} → 无图标`);
  }

  console.log(`\n完成: ${cached} 新缓存, ${skipped} 已存在跳过`);
}

main().catch(console.error);
