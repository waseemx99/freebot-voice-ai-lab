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
const signatureValidationActive =
  Boolean(status?.configuration?.authToken) &&
  Boolean(status?.configuration?.publicUrl);

if (signatureValidationActive) {
  console.log(
    'SKIP unsigned voice webhook checks: public Twilio signature validation is configured.'
  );
  console.log(
    'Use a real Twilio test call for the signed webhook path, or temporarily test with placeholder public credentials.'
  );
  process.exit(0);
}

const incoming = await check('/voice/incoming', { method: 'POST' });
if (!incoming.includes('<Response>') || !incoming.includes('<Gather')) {
  throw new Error('Incoming TwiML missing expected elements');
}

const body = new URLSearchParams({
  SpeechResult: 'What are your opening hours?'
});

const reply = await check('/voice/respond', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body
});

if (!reply.includes('<Response>')) {
  throw new Error('Response TwiML invalid');
}

console.log('All local smoke tests passed.');
