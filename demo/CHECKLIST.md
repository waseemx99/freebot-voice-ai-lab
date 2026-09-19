# Demo Capture Checklist

Use this checklist when you are ready to collect the real screenshots.

## Local project

- [ ] Repository is public.
- [ ] Repository name is freebot-voice-ai-lab.
- [ ] Latest CI is passing.
- [ ] npm install completes.
- [ ] npm start launches the site.
- [ ] Homepage loads at http://127.0.0.1:3000.
- [ ] Local status section loads.

## Automated tests

- [ ] Run demo\RUN_DEMO_TESTS.ps1.
- [ ] demo/logs/smoke-test.txt contains successful results.
- [ ] demo/logs/security-test.txt contains successful signature results.
- [ ] Capture 04-smoke-tests.png.
- [ ] Capture 05-security-tests.png.

## Visual screenshots

- [ ] 01-homepage.png
- [ ] 02-local-status.png
- [ ] 03-terminal-startup.png
- [ ] 04-smoke-tests.png
- [ ] 05-security-tests.png
- [ ] 06-ollama-model.png

## Twilio screenshots

Complete these only after real Twilio account access and live testing are available.

- [ ] 07-twilio-voice-config.png
- [ ] 08-authorized-test-call.png
- [ ] Update LIVE_CALL.md with the actual result.

## Privacy check before commit

Before adding any screenshot:

- [ ] no Auth Token;
- [ ] no API key;
- [ ] no full private phone number unless necessary;
- [ ] no payment-card information;
- [ ] no billing address;
- [ ] no identity-document image;
- [ ] no OTP/verification code;
- [ ] no unrelated customer/private information.

## Final consistency check

The screenshots should match the current repository:

- Programmable Voice only;
- inbound test flow;
- Twilio speech recognition;
- local Ollama response generation;
- no SMS/Verify/WhatsApp;
- no outbound dialer;
- no recording feature;
- no transcript database.

Do not create or edit evidence to imply that an unperformed test has already succeeded.
