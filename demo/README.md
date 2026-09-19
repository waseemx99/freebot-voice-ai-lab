# Project Demo

This folder keeps the visual and test evidence for Freebot Voice AI Lab in one place.

The goal is simple: make it easy for someone reviewing the project to see that the application exists, runs, and behaves as described.

Only real screenshots and real test output should be added here.

## Suggested contents

```text
demo/
├── README.md
├── SCREENSHOT_GUIDE.md
├── VERIFICATION.md
├── LIVE_CALL.md
├── screenshots/
│   └── README.md
└── logs/
    └── README.md
```

## Recommended screenshots

1. `01-homepage.png`
   - The Freebot Voice AI Lab homepage running locally.
   - Show the project title, overview, architecture, and runtime status.

2. `02-local-status.png`
   - The website status section.
   - Show the application name, Twilio Voice label, local AI model, and webhook-security status.

3. `03-terminal-startup.png`
   - A terminal running `npm start`.
   - Show the server startup line.
   - Do not show environment secrets.

4. `04-smoke-tests.png`
   - A terminal running `npm test`.
   - Show the successful health/status/homepage/asset checks.

5. `05-security-tests.png`
   - A terminal running `npm run test:security`.
   - Show:
     - valid Twilio signature accepted;
     - invalid Twilio signature rejected;
     - signed speech response accepted.

6. `06-ollama-model.png`
   - Ollama running with the configured local model.
   - Show only the model name/status needed to demonstrate local AI availability.

7. `07-twilio-voice-config.png`
   - Add only after Twilio access is available.
   - Show the Voice webhook configuration pointing to the real HTTPS `/voice/incoming` endpoint.
   - Hide Account SID, Auth Token, phone numbers if not needed, billing details, and other private account information.

8. `08-authorized-test-call.png`
   - Add only after a real authorized test call succeeds.
   - Show a genuine Twilio call log or development result.
   - Redact private phone numbers unless they are necessary.

## What not to include

Do not add:

- Twilio Auth Tokens;
- API keys;
- full private phone numbers;
- payment-card information;
- billing addresses;
- identity documents;
- OTPs or verification codes;
- fabricated screenshots;
- edited screenshots that change the meaning of test results.

Cropping a screenshot to remove unrelated desktop content is fine. Redacting private values is also fine as long as the screenshot remains truthful.

## Current automated verification

The project already runs automated checks in GitHub Actions. See `VERIFICATION.md` and `../docs/CI_VERIFICATION.md`.

A real Twilio call remains a separate live test and should not be represented as completed until it actually happens.
