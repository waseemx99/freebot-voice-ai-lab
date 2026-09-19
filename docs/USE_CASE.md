# Use Case

This prototype explores a simple question: how can an inbound phone call become an AI conversation without sending the language-model workload to a cloud AI provider?

## Current flow

1. A caller reaches a Twilio Voice number.
2. Twilio sends the call to `/voice/incoming`.
3. TwiML asks the caller a question and collects speech.
4. Twilio posts the recognized text to `/voice/respond`.
5. The app sends that text to a local Ollama model when enabled.
6. The generated reply is returned to Twilio and spoken to the caller.

## Why local AI?

The Ollama path makes it possible to experiment with different local models, prompts, and latency without tying the prototype to a hosted LLM API.

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
