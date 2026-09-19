const base = process.env.BASE_URL || 'http://127.0.0.1:3000';

async function check(path, options = {}, expected = 200) {
  const r = await fetch(base + path, options);
  const text = await r.text();

  if (r.status !== expected) {
    throw new Error(`${path}: expected ${expected}, got ${r.status}`);
  }

  console.log(`PASS ${path} -> ${r.status}`);
  return text;
}

await check('/health');

const statusText = await check('/api/status');
const status = JSON.parse(statusText);

if (!status?.app || !status?.voice || !status?.configuration) {
  throw new Error('Status response is missing expected fields');
}

const home = await check('/');
if (!home.includes('Freebot Voice AI Lab')) {
  throw new Error('Project website did not render expected content');
}

await check('/styles.css');
await check('/app.js');

console.log('All application smoke tests passed.');
console.log('Run npm run test:security for signed Twilio webhook verification.');
