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
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '64kb' }));
app.use(express.static(path.join(__dirname, 'public')));

function configured(name) {
  const value = process.env[name];
  return Boolean(value && value.trim() && !/replace_me|xxxxxxxx|YOUR-PUBLIC/i.test(value));
}

function cleanSpeech(text) {
  return String(text || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 1000);
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
            content: 'You are a concise demo customer-service assistant. This is a consent-based development test. Do not request passwords, payment card data, one-time passcodes, or authentication secrets. Keep replies under 3 short sentences.'
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
    mode: 'development-testing',
    scope: 'inbound consent-based voice demo',
    twilio: {
      accountSidConfigured: configured('TWILIO_ACCOUNT_SID'),
      authTokenConfigured: configured('TWILIO_AUTH_TOKEN'),
      phoneConfigured: configured('TWILIO_PHONE_NUMBER'),
      publicUrlConfigured: configured('PUBLIC_BASE_URL')
    },
    ai: {
      provider: 'Ollama (local, optional)',
      model: process.env.OLLAMA_MODEL || 'qwen3.5:9b-64k',
      enabled: String(process.env.ENABLE_OLLAMA || 'true').toLowerCase() === 'true'
    }
  });
});

app.all('/voice/incoming', (req, res) => {
  const vr = new twilio.twiml.VoiceResponse();
  const base = (process.env.PUBLIC_BASE_URL || '').replace(/\/$/, '');
  const action = base ? `${base}/voice/respond` : '/voice/respond';
  const gather = vr.gather({ input: 'speech', action, method: 'POST', speechTimeout: 'auto', timeout: 5 });
  gather.say({ voice: 'alice', language: 'en-US' },
    'Hello. This is the Freebot Voice AI development demo. This call is for authorized testing only. How can I help you?');
  vr.say({ voice: 'alice', language: 'en-US' }, 'I did not hear a response. Goodbye.');
  vr.hangup();
  res.type('text/xml').send(vr.toString());
});

app.post('/voice/respond', async (req, res) => {
  const vr = new twilio.twiml.VoiceResponse();
  const speech = cleanSpeech(req.body?.SpeechResult);
  if (!speech) {
    vr.say({ voice: 'alice', language: 'en-US' }, 'I could not understand that. Thank you for testing the demo. Goodbye.');
    vr.hangup();
    return res.type('text/xml').send(vr.toString());
  }
  const aiReply = await askLocalAI(speech);
  const reply = aiReply || `Thank you. I heard: ${speech}. The local AI service is not connected, so this is a safe fallback response.`;
  vr.say({ voice: 'alice', language: 'en-US' }, reply);
  vr.say({ voice: 'alice', language: 'en-US' }, 'Thank you for testing the Freebot Voice AI demo. Goodbye.');
  vr.hangup();
  res.type('text/xml').send(vr.toString());
});

app.get('/health', (_req, res) => res.json({ ok: true, timestamp: new Date().toISOString() }));
app.listen(port, '0.0.0.0', () => console.log(`Freebot Voice AI Lab running at http://127.0.0.1:${port}`));
