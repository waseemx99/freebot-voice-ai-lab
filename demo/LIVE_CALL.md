# Live Call Test

This page is intentionally incomplete until a real Twilio Voice test can be performed.

## Prerequisites

Before testing:

- Twilio account access is available;
- the account has permission to use the required Voice features;
- the application is running;
- an HTTPS public URL reaches the application;
- `PUBLIC_BASE_URL` exactly matches that public URL;
- the real Twilio Auth Token is configured locally and is not committed;
- the Twilio incoming Voice webhook points to `/voice/incoming`;
- the caller/test participant is permitted for the account and has agreed to the test.

## Test flow

1. Start the application.
2. Confirm local status.
3. Confirm the public HTTPS webhook is reachable.
4. Place an inbound test call.
5. Listen for the Freebot Voice AI Lab introduction.
6. Speak a short test question.
7. Confirm a spoken response is returned.
8. Review the Twilio call result/log.
9. Capture only the minimum screenshot needed to document the successful test.

## Result

Status: **Not yet recorded**

Date:

Tester:

Result:

Notes:

Screenshot:

Do not change the status above until the live test has actually been completed.
