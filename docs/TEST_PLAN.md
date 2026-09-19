# Test Plan

1. Install Node.js 18+.
2. Copy `.env.example` to `.env`.
3. Run `npm install`.
4. Run `npm start`.
5. Open `http://127.0.0.1:3000`.
6. Run `npm test` in another terminal.
7. Capture screenshots of the running dashboard and passing test output.
8. After Twilio access is restored, configure an HTTPS webhook and perform only an authorized test call.
9. Capture the Twilio Console configuration and successful test-call log for the compliance package.

Do not fabricate screenshots or call logs before the corresponding system is actually running.
