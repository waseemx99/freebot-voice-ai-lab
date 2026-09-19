# Screenshot Guide

This guide is for capturing clean, consistent screenshots of the real project.

## General style

- Use the same Windows desktop and browser theme across screenshots when practical.
- Capture at a readable resolution.
- Keep the browser zoom at 100%.
- Use a normal browser window rather than a heavily customized presentation.
- Keep the Windows clock visible only if useful; it is not required.
- Do not add decorative labels or fake UI overlays after capture.
- Do not alter success/failure output.

## 01 - Homepage

Start the application:

```powershell
npm start
```

Open:

```text
http://127.0.0.1:3000
```

Capture the top section showing:

- Freebot Voice AI Lab;
- "Local AI, over the phone";
- project stack;
- call-flow card.

Then scroll slightly and capture the overview if one screenshot cannot show enough context.

## 02 - Local status

On the same page, scroll to **Local status**.

Capture the full status card.

A local development screenshot may show webhook security as not configured if real Twilio credentials are intentionally not loaded. That is acceptable. Do not add fake credentials just to make the card green.

## 03 - Server startup

In PowerShell:

```powershell
npm start
```

Capture the terminal after this line appears:

```text
Freebot Voice AI Lab running at http://127.0.0.1:3000
```

Do not run `Get-Content .env` or display secret environment variables in the screenshot.

## 04 - Smoke tests

With the app running, use another terminal:

```powershell
npm test
```

The screenshot should show successful application checks.

## 05 - Security tests

For the signed webhook security test, use a non-production test configuration or the documented local test setup.

Run:

```powershell
npm run test:security
```

Capture these results:

```text
PASS valid Twilio signature -> accepted
PASS invalid Twilio signature -> rejected
PASS signed speech response -> accepted
```

Never expose a real Twilio Auth Token in the screenshot.

## 06 - Ollama

Show the local model installed/running using your normal Ollama workflow.

The useful evidence is the model name and the fact that the local model is available. Avoid showing unrelated local files, usernames, or private paths unless needed.

## 07 - Twilio Voice configuration

Only capture this after account access is available.

Show:

- Programmable Voice configuration;
- incoming call webhook;
- HTTPS URL ending in `/voice/incoming`;
- POST method if configured that way.

Hide or crop:

- Account SID;
- Auth Token;
- billing information;
- unrelated phone numbers;
- any private support-case information.

## 08 - Real test call

Only capture this after a genuine call succeeds.

The screenshot should demonstrate:

- a real call occurred;
- the expected Twilio Voice application handled it;
- the result is consistent with the repository's described flow.

If a number is shown, redact most digits unless the number itself is necessary for the technical evidence.

## File format

Use PNG when possible.

Recommended names:

```text
01-homepage.png
02-local-status.png
03-terminal-startup.png
04-smoke-tests.png
05-security-tests.png
06-ollama-model.png
07-twilio-voice-config.png
08-authorized-test-call.png
```
