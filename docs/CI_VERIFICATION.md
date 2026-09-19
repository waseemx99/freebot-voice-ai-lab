# Automated Verification

The repository CI checks the current prototype on every pull request to `main`.

## Checks

- JavaScript syntax for the server and test scripts.
- Application startup on Node.js 24.
- Health and status endpoints.
- Application and website smoke tests, plus TwiML generation through signed webhook tests.
- Twilio-style request-signature validation.
- Acceptance of a valid signed webhook request.
- Rejection of an invalid webhook signature with HTTP 403.

These automated checks complement, but do not replace, a real Twilio test call through an HTTPS deployment.
