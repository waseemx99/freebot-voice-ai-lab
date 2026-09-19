# Data Flow

This document describes the current data path in Freebot Voice AI Lab.

## 1. Caller to Twilio

A caller places an inbound call to the Twilio Voice number.

Twilio handles the telephony connection and call audio.

## 2. Speech recognition

The application returns TwiML with `<Gather input="speech">`.

Twilio's speech-recognition path processes the caller's speech and sends the recognized text to the application's `/voice/respond` endpoint as `SpeechResult`.

This means the language-model response can be local, but the voice and speech-recognition steps are not fully local.

## 3. Application to Ollama

The application extracts and sanitizes `SpeechResult`.

Only that recognized speech text is added to the Ollama chat request.

The application does not intentionally send these values to Ollama:

- `TWILIO_AUTH_TOKEN`;
- Twilio request signatures;
- payment or account-verification information;
- a contact database, because the current project does not contain one.

## 4. Ollama response

Ollama returns text to the Node.js application.

The application places that text inside a TwiML `<Say>` response.

## 5. Twilio to caller

Twilio receives the TwiML response and speaks it back to the caller.

## Storage

The current prototype does not include a database or call-recording feature and does not intentionally persist call audio or speech transcripts.

Standard application, hosting, tunnel, carrier, and Twilio operational logs may still exist depending on the environment used to run the project.
