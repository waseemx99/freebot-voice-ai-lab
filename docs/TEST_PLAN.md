# Testing

## Local smoke test

1. Install Node.js 18+.
2. Copy `.env.example` to `.env`.
3. Run `npm install`.
4. Start the app with `npm start`.
5. Open `http://127.0.0.1:3000`.
6. In another terminal, run `npm test`.

The smoke test checks:

- `/health`;
- `/api/status`;
- the project homepage;
- the website CSS and JavaScript assets.

Voice webhook routes do not have an unsigned development bypass. Run `npm run test:security` to generate Twilio-style signatures and verify that valid signed requests are accepted while an invalid signature is rejected with HTTP 403.

## Ollama test

Make sure Ollama is running and that the model configured in `OLLAMA_MODEL` is installed.

Then test the speech-response path before enabling the public Twilio configuration and confirm that the generated TwiML contains a model response.

## Live Twilio test

1. Expose the app through an HTTPS endpoint.
2. Set `PUBLIC_BASE_URL` to that exact public origin.
3. Set the real `TWILIO_AUTH_TOKEN` locally in `.env`.
4. Configure the Twilio number's incoming Voice webhook to `/voice/incoming`.
5. Place a test call from a number permitted by your Twilio account.
6. Confirm that speech is recognized and the response is spoken back correctly.
7. Confirm that an unsigned request to the public Voice webhook is rejected.

If your Twilio account is an eligible trial account, follow the current trial restrictions shown in the Twilio Console, including verified-recipient and geographic limits. Trial availability itself is country-dependent. For paid or previously established accounts, follow the restrictions and permissions shown for that account.
