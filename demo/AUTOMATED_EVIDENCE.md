# Automated Evidence

These files were generated from the real Freebot Voice AI Lab application and test suite in GitHub Actions.

## Source

- Repository: `waseemx99/freebot-voice-ai-lab`
- Capture environment: GitHub Actions
- Capture date: 2026-09-19
- Workflow run: `35429926175`
- Node.js: 24
- Twilio SDK: 6.1.1

## Screenshots

- `screenshots/01-homepage.png` - the running application homepage.
- `screenshots/02-local-status.png` - the real runtime status card from the automated test environment.
- `screenshots/03-server-startup.png` - a rendered view of the real server startup output.
- `screenshots/04-smoke-tests.png` - a rendered view of the real passing smoke-test output.
- `screenshots/05-security-tests.png` - a rendered view of the real signed-webhook test output.

The output screenshots are clearly labeled "Automated verification - GitHub Actions" and are rendered directly from the files produced by the workflow.

## Important limits

The automated environment used a non-production test token and `PUBLIC_BASE_URL=http://127.0.0.1:3000` to verify Twilio request-signature behavior.

Therefore:

- the green "Webhook security: Configured" status proves the application's signature-validation configuration works in the test environment;
- it does **not** prove that a live Twilio account is active;
- local AI was disabled in this automated capture, so it does **not** prove that the maintainer's Ollama model is installed or running;
- no real phone call was placed;
- no real Twilio phone number, Account SID, Auth Token, billing information, or customer information appears in these files.

## Remaining real-world evidence

The following should only be added after they actually exist:

- `06-ollama-model.png` - maintainer's real local Ollama model.
- `07-twilio-voice-config.png` - real Twilio Voice webhook configuration after account access is available.
- `08-authorized-test-call.png` - real authorized test-call result after a successful call.

Do not replace those pending items with simulated or fabricated screenshots.
