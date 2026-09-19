import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import twilio from 'twilio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3000);

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'"
  );
  next();
});

app.use(express.urlencoded({ extended: false, limit: '16kb', parameterLimit: 100 }));
app.use(express.json({ limit: '16kb' }));
app.use(express.static(path.join(__dirname, 'public')));

function configured(name) {
  const value = process.env[name];
  return Boolean(value && value.trim() && !/replace_me|xxxxxxxx|YOUR-PUBLIC/i.test(value));
}

function validateTwilioWebhook(req, res, next) {
  const tokenReady = configured('TWILIO_AUTH_TOKEN');
  const publicUrlReady = configured('PUBLIC_BASE_URL');

  if (!tokenReady || !publicUrlReady) {
    return res.status(503).send('Twilio webhook security is not configured.');
  }

  const signature = req.get('x-twilio-signature');
  const base = process.env.PUBLIC_BASE_URL.replace(/\/$/, '');
  const requestUrl = `${base}${req.originalUrl}`;
  const params = req.method === 'POST' ? req.body : {};

  const valid =
    Boolean(signature) &&
    twilio.validateRequest(
      process.env.TWILIO_AUTH_TOKEN,
      signature,
      requestUrl,
      params
    );

  if (!valid) {
    return res.status(403).send('Invalid Twilio signature.');
  }

  next();
}

function cleanSpeech(text) {
  return String(text || '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 1000);
}

async function askLocalAI(userText) {
  const enabled = String(process.env.ENABLE_OLLAMA || 'true').toLowerCase() === 'true';
  if (!enabled) return null;

  const base = (process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/$/, '');
  const model = process.env.OLLAMA_MODEL || 'qwen3.5:9b-64k';
  const maxChars = Number(process.env.MAX_REPLY_CHARS || 500);

  try {
    const response = await fetch(`${base}/api/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        model,
        stream: false,
        messages: [
          {
            role: 'system',
            content:
              'You are a concise customer-service demo assistant. Never ask for passwords, payment card details, one-time passcodes, or authentication secrets. Keep replies under 3 short sentences.'
          },
          { role: 'user', content: userText }
        ]
      }),
      signal: AbortSignal.timeout(8000)
    });

    if (!response.ok) return null;

    const data = await response.json();
    return String(data?.message?.content || '').trim().slice(0, maxChars) || null;
  } catch {
    return null;
  }
}

app.get('/api/status', (_req, res) => {
  res.json({
    app: process.env.DEMO_NAME || 'Freebot Voice AI Lab',
    mode: 'prototype',
    voice: 'Twilio Programmable Voice',
    ai: {
      provider: 'Ollama',
      model: process.env.OLLAMA_MODEL || 'qwen3.5:9b-64k',
      enabled: String(process.env.ENABLE_OLLAMA || 'true').toLowerCase() === 'true'
    },
    configuration: {
      webhookSecurityReady:
        configured('TWILIO_AUTH_TOKEN') && configured('PUBLIC_BASE_URL')
    }
  });
});

app.all('/voice/incoming', validateTwilioWebhook, (_req, res) => {
  const vr = new twilio.twiml.VoiceResponse();
  const base = (process.env.PUBLIC_BASE_URL || '').replace(/\/$/, '');
  const action = base ? `${base}/voice/respond` : '/voice/respond';

  const gather = vr.gather({
    input: 'speech',
    action,
    method: 'POST',
    speechTimeout: 'auto',
    timeout: 5
  });

  gather.say(
    { voice: 'alice', language: 'en-US' },
    'Hi. You have reached the Freebot Voice AI Lab, a development voice assistant demo. How can I help you?'
  );

  vr.say({ voice: 'alice', language: 'en-US' }, 'I did not hear a response. Goodbye.');
  vr.hangup();

  res.type('text/xml').send(vr.toString());
});

app.post('/voice/respond', validateTwilioWebhook, async (req, res) => {
  const vr = new twilio.twiml.VoiceResponse();
  const speech = cleanSpeech(req.body?.SpeechResult);

  if (!speech) {
    vr.say(
      { voice: 'alice', language: 'en-US' },
      'I could not understand that. Please try again another time. Goodbye.'
    );
    vr.hangup();
    return res.type('text/xml').send(vr.toString());
  }

  const aiReply = await askLocalAI(speech);
  const reply =
    aiReply ||
    `I heard: ${speech}. The local AI service is not connected right now, so I cannot generate a full answer.`;

  vr.say({ voice: 'alice', language: 'en-US' }, reply);
  vr.say({ voice: 'alice', language: 'en-US' }, 'Thanks for trying the demo. Goodbye.');
  vr.hangup();

  res.type('text/xml').send(vr.toString());
});

app.get('/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Freebot Voice AI Lab running at http://127.0.0.1:${port}`);
});
