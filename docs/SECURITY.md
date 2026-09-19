# Security

## Secrets

Real Twilio credentials belong only in a local `.env` file. The repository includes only placeholders in `.env.example`, and `.env` is ignored by Git.

## Data minimization

The demo does not intentionally store call recordings, passwords, OTPs, payment-card data, or authentication secrets.

## AI boundary

Twilio credentials are never sent to the local Ollama model. The AI receives only the caller's recognized speech text required to generate a reply.

## Deployment

Use HTTPS for any public webhook. Rotate credentials immediately if a secret is ever exposed.
