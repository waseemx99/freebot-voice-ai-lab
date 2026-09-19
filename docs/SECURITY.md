# Security

## Environment secrets

Twilio credentials are loaded from a local `.env` file. The repository contains only placeholders in `.env.example`, and `.env` is excluded through `.gitignore`.

If a credential is accidentally committed or exposed, rotate it immediately.

## Webhook deployment

Use HTTPS for any webhook exposed to the internet.

The public Voice routes validate Twilio's `X-Twilio-Signature` with the Twilio SDK when `PUBLIC_BASE_URL` and `TWILIO_AUTH_TOKEN` are configured. Local loopback requests are allowed without a signature so the smoke test can run before Twilio is connected.

`PUBLIC_BASE_URL` must exactly match the public origin used by Twilio. If a proxy or tunnel changes the public URL, update this value so signature validation continues to work.

## AI data path

The local model receives the caller's recognized speech text so it can generate a reply. Twilio credentials are not passed to Ollama.

The system prompt also tells the demo assistant not to ask callers for passwords, payment-card details, one-time passcodes, or authentication secrets.

## Storage

The current prototype does not include a database or call-recording feature, so it does not intentionally persist conversation audio or transcripts.
