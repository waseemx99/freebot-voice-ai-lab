# Security

## Supported scope

This repository is an early prototype. Security fixes should target the current `main` branch.

## Reporting a security issue

If you find a security issue, do not include credentials, tokens, private phone numbers, or other sensitive data in a public issue.

If the problem does not require sensitive details, open a normal GitHub issue with clear reproduction steps. If sensitive information is involved, use a private GitHub security-reporting method if one is enabled for the repository.

## Secrets

Twilio credentials belong only in a local `.env` file.

- Never commit a real `TWILIO_AUTH_TOKEN`.
- Keep `.env` out of source control.
- Rotate any credential immediately if it is exposed.
- Do not place payment information, account verification details, or private phone numbers in the repository.

## Webhooks

Use HTTPS for internet-facing Twilio webhooks.

The public Voice routes validate Twilio's `X-Twilio-Signature` when `PUBLIC_BASE_URL` and `TWILIO_AUTH_TOKEN` are configured.

`PUBLIC_BASE_URL` must match the public URL Twilio uses to call the application. If a tunnel or reverse proxy changes that URL, update the environment value.

## Voice and speech data

Call audio is handled through Twilio Voice. When `<Gather input="speech">` is used, Twilio's speech-recognition path processes the caller's speech and sends the resulting `SpeechResult` transcript to this application.

The application sends only the recognized speech text needed for the reply to the local Ollama model. It does not send the Twilio Auth Token or other Twilio credentials to Ollama.

The assistant is instructed not to request passwords, payment-card details, one-time passcodes, or authentication secrets.

## Data storage

The current prototype does not include a database or call-recording feature, so it does not intentionally persist call audio or conversation transcripts.
