# Verification

This file summarizes the checks that are already automated for the project.

## Automated CI

The repository CI currently verifies:

- dependency installation;
- JavaScript syntax;
- application startup;
- `/health`;
- `/api/status`;
- homepage rendering;
- website CSS and JavaScript assets;
- acceptance of a correctly signed Twilio-style webhook;
- rejection of an invalid Twilio signature;
- signed speech-response handling.

The latest verified project state passed these checks before being merged to `main`.

## Local commands

Application checks:

```powershell
npm test
```

Signed webhook checks:

```powershell
npm run test:security
```

## What CI does not prove

Automated CI does not prove:

- that a real Twilio phone number is currently active;
- that an external HTTPS tunnel or deployment is reachable;
- that a real phone call has completed;
- that a particular Twilio account is approved or active.

Those should only be added to the demo evidence after they are genuinely tested.
