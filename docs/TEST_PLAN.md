# Testing

## Local smoke test

1. Install Node.js 18+.
2. Copy `.env.example` to `.env`.
3. Run `npm install`.
4. Start the app with `npm start`.
5. Open `http://127.0.0.1:3000`.
6. In another terminal, run `npm test`.

The smoke test checks:

- `/health`
- `/api/status`
- incoming-call TwiML from `/voice/incoming`
- speech-response TwiML from `/voice/respond`

## Ollama test

Make sure Ollama is running and that the model configured in `OLLAMA_MODEL` is installed.

Then call `/voice/respond` with a sample `SpeechResult` and verify that the generated TwiML contains a model response.

## Live Twilio test

1. Expose the local app through an HTTPS endpoint.
2. Set `PUBLIC_BASE_URL` in `.env`.
3. Configure the Twilio number's incoming Voice webhook to `/voice/incoming`.
4. Place a test call from a number you control.
5. Confirm that speech is recognized and the response is spoken back correctly.

Use real call testing only with people who have agreed to participate.
