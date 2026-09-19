# Contributing

Thanks for your interest in improving Freebot Voice AI Lab.

This is a small experimental project, so contributions should stay focused, easy to review, and aligned with the current scope.

## Before making changes

1. Fork the repository or create a branch.
2. Install dependencies with `npm install`.
3. Start the app with `npm start`.
4. Run `npm test` before submitting changes.

## Contribution guidelines

- Keep changes focused on one problem or feature.
- Do not commit API keys, Twilio credentials, tokens, phone numbers, or private `.env` files.
- Keep the inbound voice flow simple and understandable.
- Add or update tests when behavior changes.
- Use clear English commit messages and documentation.
- Avoid adding bulk dialing, unsolicited calling, contact harvesting, credential collection, or deceptive behavior.
- Keep local AI support optional so the basic voice flow can still run without Ollama.

## Pull requests

A useful pull request should include:

- a short explanation of the change;
- why the change is useful;
- any setup changes;
- how it was tested.

Please keep unrelated formatting or refactoring out of feature and bug-fix pull requests when possible.

## Security issues

Do not publish credentials or sensitive information in an issue or pull request. See `SECURITY.md` for security guidance.
