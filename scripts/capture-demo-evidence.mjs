import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('demo-generated');
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, bypassCSP: true });
const page = await context.newPage();

await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
await page.waitForFunction(() => document.getElementById('runtime-badge')?.textContent !== 'Checking');

await page.screenshot({
  path: path.join(outDir, '01-homepage.png'),
  fullPage: false,
  animations: 'disabled'
});

await page.locator('.status-section').screenshot({
  path: path.join(outDir, '02-local-status.png'),
  animations: 'disabled'
});

async function renderOutput(title, command, fileName, outputPath) {
  let output = '';
  try {
    output = await fs.readFile(fileName, 'utf8');
  } catch {
    output = 'Output file was not available.';
  }

  const safe = output
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

  const outputPage = await context.newPage();
  await outputPage.setContent(`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  *{box-sizing:border-box}
  body{margin:0;background:#0b0f18;color:#e8eef7;font-family:Inter,Segoe UI,Arial,sans-serif}
  .wrap{width:1200px;margin:55px auto}
  .meta{color:#7f8da4;font-size:13px;margin-bottom:14px}
  h1{font-size:25px;margin:0 0 20px;font-weight:650}
  .terminal{background:#090d14;border:1px solid #293246;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.35)}
  .bar{height:48px;display:flex;align-items:center;gap:8px;padding:0 16px;border-bottom:1px solid #222c3d;color:#8390a6;font-size:12px}
  .dot{width:9px;height:9px;border-radius:50%;background:#39465c}
  .cmd{padding:18px 22px 8px;color:#75dbc4;font-family:Consolas,monospace;font-size:14px}
  pre{margin:0;padding:8px 22px 24px;white-space:pre-wrap;word-break:break-word;color:#d7dfec;font:14px/1.55 Consolas,monospace}
  .note{margin-top:14px;color:#7f8da4;font-size:12px}
</style>
</head>
<body>
<div class="wrap">
  <div class="meta">Freebot Voice AI Lab • Automated verification • GitHub Actions</div>
  <h1>${title}</h1>
  <div class="terminal">
    <div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span> verification output</div>
    <div class="cmd">$ ${command}</div>
    <pre>${safe}</pre>
  </div>
  <div class="note">Rendered directly from the real verification output produced by this workflow run.</div>
</div>
</body>
</html>`, { waitUntil: 'load' });

  await outputPage.screenshot({ path: path.join(outDir, outputPath), fullPage: true, animations: 'disabled' });
  await outputPage.close();
}

await renderOutput('Application startup', 'npm start', 'server.log', '03-server-startup.png');
await renderOutput('Application smoke tests', 'npm test', path.join(outDir, 'smoke-test.txt'), '04-smoke-tests.png');
await renderOutput('Signed Twilio webhook tests', 'npm run test:security', path.join(outDir, 'security-test.txt'), '05-security-tests.png');

await browser.close();
