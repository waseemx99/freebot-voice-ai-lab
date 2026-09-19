# Freebot Voice AI Lab

A small **Twilio Programmable Voice + local Ollama** prototype for experimenting with AI-assisted phone interactions.

I built this while exploring how a voice channel could connect to a Freebot-style assistant. It is currently a standalone prototype rather than a full integration with the upstream Freebot application.

## What it does

- accepts an inbound Twilio Voice webhook;
- uses TwiML speech gathering to capture a caller's request;
- sends the recognized text to a local Ollama model when enabled;
- speaks the model's reply back to the caller;
- falls back gracefully when the local model is unavailable;
- exposes a simple status page for local development.

## Flow

```text
Caller
  |
  v
Twilio Programmable Voice
  |
  v
Node.js / Express webhook
  |
  +--> Ollama (optional)
  |
  v
TwiML voice response
```

## Requirements

- Node.js 18+
- a Twilio account with Voice access for live call testing
- an HTTPS-accessible webhook URL
- Ollama if you want local AI responses

Ollama is optional. The voice webhook still works without it.

## Setup

Clone the repository and install dependencies:

```bash
npm install
```

Create your local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell you can use:

```powershell
Copy-Item .env.example .env
```

Start the app:

```bash
npm start
```

Then open:

```text
http://127.0.0.1:3000
```

## Environment variables

The main settings are:

```env
PORT=3000
PUBLIC_BASE_URL=https://your-public-url.example

TWILIO_AUTH_TOKEN=replace_me

OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen3.5:9b-64k
ENABLE_OLLAMA=true
```

Never commit your real `.env` file. Public Voice webhooks also validate Twilio request signatures when the real `PUBLIC_BASE_URL` and `TWILIO_AUTH_TOKEN` are configured.

## Twilio webhook

Expose the app through HTTPS, then configure the incoming Voice webhook for your Twilio number as:

```text
https://YOUR-PUBLIC-URL/voice/incoming
```

The webhook accepts either GET or POST. Speech results are sent to:

```text
/voice/respond
```

## Local AI

By default the app expects Ollama at:

```text
http://127.0.0.1:11434
```

Change `OLLAMA_MODEL` in `.env` if you want to use another installed model.

## Tests

With the app already running:

```bash
npm test
```

The smoke test checks the health endpoint, status endpoint, incoming-call TwiML, and speech-response route.

## Project status

This is an early prototype. The next steps are better conversation state, configurable prompts, cleaner call logs, and tighter integration with the upstream Freebot project.

## Notes

- `docs/USE_CASE.md` - project behavior and boundaries
- `SECURITY.md` - credential and data-handling notes
- `docs/TEST_PLAN.md` - local and live-call testing
- `docs/RESPONSIBLE_USE.md` - basic usage expectations

## Upstream project

FreebotAI/Freebot: https://github.com/FreebotAI/Freebot

This repository is an independent experiment and is not an official Twilio or FreebotAI project.
