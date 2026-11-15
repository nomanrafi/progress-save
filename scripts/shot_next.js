// Usage: node shot_next.js <outPrefix> <clicksOnNext comma list>  — hero shots of other products (site on :8123)
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2]; const clicks = (process.argv[3] || '2,3').split(',').map(Number);
  const b = await chromium.launch({ executablePath: '/usr/local/bin/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on('pageerror', (e) => console.log('PAGEERROR', e.message));
  await p.goto('http://localhost:8123/', { waitUntil: 'load' });
  await p.waitForFunction(() => window.__ready, null, { timeout: 90000 }).catch(() => console.log('NOT READY'));
  await p.waitForTimeout(2000); let done = 0;
  for (const c of clicks) { while (done < c) { await p.evaluate(() => document.getElementById('next').click()); done++; await p.waitForTimeout(700); }
    await p.waitForTimeout(2500); await p.screenshot({ path: `${out}_n${c}.png` });
    await p.evaluate(() => scrollTo(0, 2.5 * innerHeight)); await p.waitForTimeout(3000); await p.screenshot({ path: `${out}_n${c}_d.png` });
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(2500); console.log('shot', c); }
  await p.evaluate(() => scrollTo(0, 8.9 * innerHeight)); await p.waitForTimeout(3000); await p.screenshot({ path: `${out}_faq.png` });
  await b.close(); process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
