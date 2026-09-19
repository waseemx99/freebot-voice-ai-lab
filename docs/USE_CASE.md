# Use Case

Freebot Voice AI Lab is a small development prototype for connecting an inbound Twilio Programmable Voice call to a local Ollama model.

## Current product scope

The project currently uses **Twilio Programmable Voice only**.

It does not currently use:

- Twilio Messaging or SMS;
- Twilio Verify or one-time-passcode delivery;
- WhatsApp;
- an outbound calling API or bulk dialer;
- call recording;
- a contact database.

The intended live test flow is an inbound call from a number controlled by the developer or from a person who has agreed to participate in the test.

## Current flow

1. A caller places an inbound call to the Twilio Voice number.
2. Twilio sends the call webhook to `/voice/incoming`.
3. TwiML `<Gather input="speech">` collects the caller's speech.
4. Twilio's speech-recognition path produces a transcript and posts `SpeechResult` to `/voice/respond`.
5. The application sends only the recognized speech text to the configured local Ollama model.
6. Ollama generates a short text response.
7. The application returns TwiML and Twilio speaks the response to the caller.

See `DATA_FLOW.md` for the data boundary in more detail.

## Why local AI?

The Ollama path makes it possible to experiment with different local language models, prompts, and response latency without requiring a hosted LLM API for response generation.

"Local AI" refers to the language-model response step. Telephony and speech recognition are still handled through Twilio and the speech-recognition services used by Twilio.

## Current limitations

- one-turn conversation flow;
- no persistent conversation memory;
- no call recording;
- no outbound dialer;
- no contact database;
- no production monitoring yet.

## Planned improvements

- multi-turn call state;
- configurable assistant prompts;
- better error handling and logging;
- model selection from the dashboard;
- closer integration with the upstream Freebot project.
