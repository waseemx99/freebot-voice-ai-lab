# Freebot Twilio Voice Demo

A review-friendly **Twilio Programmable Voice + local AI** demonstration maintained by **Waseem Hassan (@waseemx99)**.

This repository documents a legitimate development/testing use case: inbound test calls from verified or explicitly consenting participants are routed to a Node.js webhook, speech is collected using TwiML, and an optional local Ollama model returns a short response.

> Independent integration demo. Not an official Twilio or FreebotAI product.

## Scope

- Development and learning only.
- Inbound test calls only.
- Verified or explicitly consenting testers only.
- No mass dialing, telemarketing, advertising, lead generation, or robocalling.
- No collection of passwords, OTPs, payment-card data, or authentication secrets.
- Secrets remain in `.env` and are excluded from Git.

## Architecture

```text
Verified / consenting tester
            |
            v
   Twilio Programmable Voice
            |
            v
   HTTPS Node.js webhook
            |
            v
   Local Ollama AI (optional)
            |
            v
      TwiML voice reply
```

## Run locally

```bash
cp .env.example .env
npm install
npm start
```

Open `http://127.0.0.1:3000`.

Run tests:

```bash
npm test
```

## Twilio webhook

After account approval and creation of a public HTTPS endpoint:

```text
https://YOUR-PUBLIC-URL/voice/incoming
```

## Documentation

- `docs/USE_CASE.md`
- `docs/CONSENT_AND_CALL_POLICY.md`
- `docs/SECURITY.md`
- `docs/TEST_PLAN.md`
- `docs/TWILIO_REVIEW_ANSWERS.md`

## Policy references

Prepared against Twilio documentation checked on 2026-09-19:

- https://www.twilio.com/docs/usage/trials
- https://www.twilio.com/docs/usage/trials/try-out-voice
- https://www.twilio.com/en-us/legal/aup
- https://www.twilio.com/en-us/legal/service-country-specific-terms/voice-sip

Twilio requirements can change; re-check before production use.
