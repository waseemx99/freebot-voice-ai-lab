# Logs

This folder is for small, sanitized test-output files when they are useful for reproducing or documenting a result.

Good examples:

- smoke-test output;
- security-test output;
- a short application startup log.

Do not commit:

- `.env` contents;
- Twilio Auth Tokens;
- API keys;
- payment or identity information;
- private phone numbers;
- large raw production logs.

Screenshots are usually enough for visual evidence. Logs should be added only when they improve technical clarity.


## Current logs

- `smoke-test.txt` - real passing application smoke-test output from GitHub Actions.
- `security-test.txt` - real passing signed-webhook verification output from GitHub Actions.

See `../AUTOMATED_EVIDENCE.md` for the workflow provenance.
