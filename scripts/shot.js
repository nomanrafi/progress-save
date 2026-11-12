// Usage: node scripts/shot.js <outPrefix> [scrollStopsInVh comma list]   (serve site on :8123 first)
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2] || '/tmp/s';
  const stops = (process.argv[3] || '0').split(',').map(Number);
  const b = await chromium.launch({ executablePath: process.env.CHROME || '/usr/local/bin/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on('console', (m) => m.type() === 'error' && console.log('CONSOLE', m.text()));
  p.on('pageerror', (e) => console.log('PAGEERROR', e.message));
  await p.goto('http://localhost:8123/', { waitUntil: 'load' });
  await p.waitForFunction(() => window.__ready, null, { timeout: 90000 }).catch(() => console.log('NOT READY'));
  await p.waitForTimeout(2500);
  for (const s of stops) {
    await p.evaluate((v) => scrollTo(0, v * innerHeight), s);
    await p.waitForTimeout(2500);
    await p.screenshot({ path: `${out}_${String(s).replace('.', '_')}.png` });
    console.log('shot', s);
  }
  await b.close(); process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
